export const D2R = Math.PI / 180.0;
export const R2D = 180.0 / Math.PI;

/**
 * Convert a sexagesimal angle into decimal degrees
 */
export function s2d(degrees: number,
                    arcmins: number = 0,
                    arcsecs: number = 0,
                    mas: number = 0,
                    muas: number = 0): number {
  return degrees
      + (arcmins /  60.0)
      + (arcsecs / (60.0 * 60.0))
      + (mas     / (60.0 * 60.0 * 1e3))
      + (muas    / (60.0 * 60.0 * 1e6));
}

/**
 * Evaluate a polynomial at argument
 */
function polynomial(coefficients: number[], argument: number): number {
  return coefficients.reduce((sum, c, i) => sum + c * (argument ** i), 0);
}

/**
 * Evaluate the first derivative of a polynomial at argument
 */
function d_polynomial(coefficients: number[], argument: number): number {
  return coefficients.reduce((sum, c, i) => sum + c * i * (argument ** (i - 1)), 0);
}

/**
 * Meeus formula 7.1
 */
export function JD(t: Date): number {
  let Y: number = t.getUTCFullYear();
  let M: number = t.getUTCMonth() + 1;
  let D =
    t.getUTCDate()
    + t.getUTCHours() / (24.0)
    + t.getUTCMinutes() / (24.0 * 60.0)
    + t.getUTCSeconds() / (24.0 * 60.0 * 60.0)
    + t.getUTCMilliseconds() / (24.0 * 60.0 * 60.0 * 1e3);

  if (M <= 2) {
    Y = Y - 1;
    M = M + 12;
  }

  let B = 0;
  // if date is after 1582-10-15
  if (t.getTime() > -12219292800000) {
    let A = Math.floor(Y / 100.0);
    B = 2 - A + Math.floor(A / 4.0);
  }
  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + D + B - 1524.5;
}

/**
 * Meeus formula 11.1
 */
function T(t: Date): number {
  return (JD(t) - 2451545.0) / 36525;
}

// Meeus formula 21.3
// Adjust these coefficients for parameter T rather than U
const terrestrialObliquityCoefficients = [
   s2d(23, 26, 21.448),
  -s2d(0, 0, 4680.93),
  -s2d(0, 0, 1.55),
   s2d(0, 0, 1999.25),
  -s2d(0, 0, 51.38),
  -s2d(0, 0, 249.67),
  -s2d(0, 0, 39.05),
   s2d(0, 0, 7.12),
   s2d(0, 0, 27.87),
   s2d(0, 0, 5.79),
   s2d(0, 0, 2.45)
].map((c, i) => c * (1e-2) ** i);

// Not entirely sure about this interpretation, but this is the difference
// between Meeus formulae 24.2 and 24.3 and seems to work
const solarPerigeeCoefficients = [
  280.46645 - 357.52910,
  36000.76932 - 35999.05030,
  0.0003032 + 0.0001559,
  0.00000048
];

// Meeus formula 24.2
const solarLongitudeCoefficients = [
  280.46645,
  36000.76983,
  0.0003032
];

// This value is taken from JPL Horizon and is essentially constant
const lunarInclinationCoefficients = [
  5.145
];

// Meeus formula 45.1
const lunarLongitudeCoefficients = [
  218.3164591,
  481267.88134236,
  -0.0013268,
  1 / 538841.0,
  -1 / 65194000.0
];

// Meeus formula 45.7
const lunarNodeCoefficients = [
  125.0445550,
  -1934.1361849,
  0.0020762,
  1 / 467410.0,
  -1 / 60616000.0
];

// Meeus, unnumbered formula directly preceded by 45.7
const lunarPerigeeCoefficients = [
  83.3532430,
  4069.0137111,
  -0.0103238,
  -1 / 80053.0,
  1 / 18999000.0
];

///////////////////////////////////////////////////////////////////////
// Now follow some useful auxiliary values, we won't need their speed.
// See notes on Table 6 in Schureman for I, nu, xi, nu', 2nu''
///////////////////////////////////////////////////////////////////////
function _I(N: number, i: number, omega: number): number {
  N = D2R * N;
  i = D2R * i;
  omega = D2R * omega;

  let cosI = Math.cos(i) * Math.cos(omega) - Math.sin(i) * Math.sin(omega) * Math.cos(N);
  return R2D * Math.acos(cosI);
}

function _xi(N: number, i: number, omega: number): number {
  N = D2R * N;
  i = D2R * i;
  omega = D2R * omega;

  let e1 = Math.cos(0.5 * (omega - i)) / Math.cos(0.5 * (omega + i)) * Math.tan(0.5 * N);
  let e2 = Math.sin(0.5 * (omega - i)) / Math.sin(0.5 * (omega + i)) * Math.tan(0.5 * N);
  e1 = Math.atan(e1);
  e2 = Math.atan(e2);
  e1 = e1 - 0.5 * N;
  e2 = e2 - 0.5 * N;
  return -(e1 + e2) * R2D;
}

function _nu(N: number, i: number, omega: number): number {
  N = D2R * N;
  i = D2R * i;
  omega = D2R * omega;

  let e1 = Math.cos(0.5 * (omega - i)) / Math.cos(0.5 * (omega + i)) * Math.tan(0.5 * N);
  let e2 = Math.sin(0.5 * (omega - i)) / Math.sin(0.5 * (omega + i)) * Math.tan(0.5 * N);
  e1 = Math.atan(e1);
  e2 = Math.atan(e2);
  e1 = e1 - 0.5 * N;
  e2 = e2 - 0.5 * N;
  return (e1 - e2) * R2D;
}

// Schureman equation 224
// Can we be more precise than B "the solar coefficient" = 0.1681?
function _nup(N: number, i: number, omega: number): number {
  let I = D2R * _I(N, i, omega);
  let nu = D2R * _nu(N, i, omega);
  return R2D * Math.atan(Math.sin(2 * I) * Math.sin(nu) /
                         (Math.sin(2 * I) * Math.cos(nu) + 0.3347));
}

// Schureman equation 232
function _nupp(N: number, i: number, omega: number): number {
  let I = D2R * _I(N, i, omega);
  let nu = D2R * _nu(N, i, omega);
  let tan2nupp = (Math.sin(I) ** 2 * Math.sin(2 * nu)) /
                  (Math.sin(I) ** 2 * Math.cos(2 * nu) + 0.0727);
  return R2D * 0.5 * Math.atan(tan2nupp);
}

export interface AstronomicalParameter {
  value: number;
  speed: number;
}
export class AstronomicalParameters {
  s: AstronomicalParameter;
  h: AstronomicalParameter;
  p: AstronomicalParameter;
  N: AstronomicalParameter;
  pp: AstronomicalParameter;
  ninety: AstronomicalParameter;
  omega: AstronomicalParameter;
  i: AstronomicalParameter;
  I: AstronomicalParameter;
  xi: AstronomicalParameter;
  nu: AstronomicalParameter;
  nup: AstronomicalParameter;
  nupp: AstronomicalParameter;
  ths: AstronomicalParameter;
  P: AstronomicalParameter;

  constructor(t: Date) {
    // We can use polynomial fits from Meeus to obtain good approximations to
    // some astronomical values (and therefore speeds).
    let polynomials = [
        {name: 's',      coeffs: lunarLongitudeCoefficients},
        {name: 'h',      coeffs: solarLongitudeCoefficients},
        {name: 'p',      coeffs: lunarPerigeeCoefficients},
        {name: 'N',      coeffs: lunarNodeCoefficients},
        {name: 'pp',     coeffs: solarPerigeeCoefficients},
        {name: 'ninety', coeffs: [90.0]},
        {name: 'omega',  coeffs: terrestrialObliquityCoefficients},
        {name: 'i',      coeffs: lunarInclinationCoefficients}
    ];
    // Polynomials are in T, that is Julian Centuries; we want our speeds to be
    // in the more convenient unit of degrees per hour.
    let dTdHour = 1 / (24 * 365.25 * 100);
    polynomials.forEach((p) => {
      this[p.name] = {
        value: (polynomial(p.coeffs, T(t)) % 360.0),
        speed: (d_polynomial(p.coeffs, T(t)) * dTdHour)
      };
    });

    // Some other parameters defined by Schureman which are dependent on the
    // parameters N, i, omega for use in node factor calculations. We don't need
    // their speeds.
    let args = ['N', 'i', 'omega']
                 .map(name => this[name])
                 .map(param => param.value);
    [
      {name: 'I',    func: _I},
      {name: 'xi',   func: _xi},
      {name: 'nu',   func: _nu},
      {name: 'nup',  func: _nup},
      {name: 'nupp', func: _nupp}
    ].forEach(item => {
      this[item.name] = {
        value: item.func(args[0], args[1], args[2]) % 360.0,
        speed: undefined
      };
    });

    // We don't work directly with the T (hours) parameter, instead our spanning
    // set for equilibrium arguments is given by Ths, s, h, p, N, pp, 90.
    // This is in line with convention.
    let hour = {
      value: (JD(t) - Math.floor(JD(t))) * 360.0,
      speed: 15.0
    };
    this.ths = {
      value: hour.value + this.h.value - this.s.value,
      speed: hour.speed + this.h.speed - this.s.speed
    };

    // It is convenient to calculate Schureman's P here since several node
    // factors need it, although it could be argued that these
    // (along with I, xi, nu etc) belong somewhere else.
    this.P = {
      value: (this.p.value - this.xi.value) % 360.0,
      speed: undefined
    };
  }
}
