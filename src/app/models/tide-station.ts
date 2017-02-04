import * as astro from './astro';

export interface HarmonicConstituent {
  num: number;
  name: string;
  amp: number;
  phaseDeg: number;
  speedDegPH: number;
  phaseRad?: number;
  speedRadPH?: number;
  desc?: string;
}

export interface TideHeight {
  time: Date;
  feet: number;
}

export class TideStation {
  public static SAN_FRANCISCO(): TideStation {
    let constituents = [
      {num: 0, name: 'Z0', amp: 0, phaseDeg:  0, speedDegPH: 0,
       desc: 'Offset to correct MSL to MLLW (Not part of published constituents.)'},
      {num: 1, name: 'M2', amp: 1.89, phaseDeg:  336.3, speedDegPH: 28.984104,
       desc: 'Principal lunar semidiurnal constituent'},
      {num: 2, name: 'S2', amp:   0.45, phaseDeg:  336.2, speedDegPH: 30.0,
       desc:  'Principal solar semidiurnal constituent'},
      {num: 3, name: 'N2', amp:   0.4, phaseDeg: 315.6, speedDegPH: 28.43973,
       desc:  'Larger lunar elliptic semidiurnal constituent'},
      {num: 4, name: 'K1', amp:   1.21, phaseDeg:  105.0, speedDegPH: 15.041069,
       desc: 'Lunar diurnal constituent'},
      {num: 5, name: 'M4', amp:   0.07, phaseDeg:  33.0, speedDegPH:  57.96821,
       desc:  'Shallow water overtides of principal lunar constituent'},
      {num: 6, name: 'O1', amp:   0.75, phaseDeg:  96.8, speedDegPH:  13.943035,
       desc: 'Lunar diurnal constituent'},
      {num: 7, name: 'M6', amp:   0.01, phaseDeg:  31.6, speedDegPH:  86.95232,
       desc:  'Shallow water overtides of principal lunar constituent'},
      {num: 8, name: 'MK3', amp:  0.06, phaseDeg:  131.9, speedDegPH: 44.025173,
       desc: 'Shallow water terdiurnal'},
      {num: 9, name: 'S4', amp:   0.0, phaseDeg: 0.0, speedDegPH: 60.0,
       desc:  'Shallow water overtides of principal solar constituent'},
      {num: 10, name:  'MN4', amp:  0.03, phaseDeg:  12.6, speedDegPH:  57.423832,
       desc: 'Shallow water quarter diurnal constituent'},
      {num: 11, name:  'NU2', amp:  0.09, phaseDeg:  321.8, speedDegPH: 28.512583,
       desc: 'Larger lunar evectional constituent'},
      {num: 12, name:  'S6', amp:   0.0, phaseDeg: 0.0, speedDegPH: 90.0,
       desc:  'Shallow water overtides of principal solar constituent'},
      {num: 13, name:  'MU2', amp:  0.02, phaseDeg:  236.4, speedDegPH: 27.968208,
       desc: 'Variational constituent'},
      {num: 14, name:  '2N2', amp:  0.04, phaseDeg:  290.0, speedDegPH: 27.895355,
       desc: 'Lunar elliptical semidiurnal second-order constituent'},
      {num: 15, name:  'OO1', amp:  0.04, phaseDeg:  130.8, speedDegPH: 16.139101,
       desc: 'Lunar diurnal'},
      {num: 16, name:  'LAM2', amp:   0.02, phaseDeg:  338.6, speedDegPH: 29.455626,
       desc: 'Smaller lunar evectional constituent'},
      {num: 17, name:  'S1', amp:   0.02, phaseDeg:  162.5, speedDegPH: 15.0,
       desc:  'Solar diurnal constituent'},
      {num: 18, name:  'M1', amp:   0.04, phaseDeg:  121.5, speedDegPH: 14.496694,
       desc: 'Smaller lunar elliptic diurnal constituent'},
      {num: 19, name:  'J1', amp:   0.06, phaseDeg:  119.5, speedDegPH: 15.5854435,
       desc:  'Smaller lunar elliptic diurnal constituent'},
      {num: 20, name:  'MM', amp:   0.0, phaseDeg: 0.0, speedDegPH: 0.5443747,
       desc: 'Lunar monthly constituent'},
      {num: 21, name:  'SSA', amp:  0.1, phaseDeg: 271.6, speedDegPH: 0.0821373,
       desc: 'Solar semiannual constituent'},
      {num: 22, name:  'SA', amp:   0.14, phaseDeg:  199.8, speedDegPH: 0.0410686,
       desc: 'Solar annual constituent'},
      {num: 23, name:  'MSF', amp:  0.0, phaseDeg: 0.0, speedDegPH: 1.0158958,
       desc: 'Lunisolar synodic fortnightly constituent'},
      {num: 24, name:  'MF', amp:   0.05, phaseDeg:  144.3, speedDegPH: 1.0980331,
       desc: 'Lunisolar fortnightly constituent'},
      {num: 25, name:  'RHO', amp:  0.03, phaseDeg:  92.2, speedDegPH:  13.471515,
       desc: 'Larger lunar evectional diurnal constituent'},
      {num: 26, name:  'Q1', amp:   0.13, phaseDeg:  95.1, speedDegPH:  13.398661,
       desc: 'Larger lunar elliptic diurnal constituent'},
      {num: 27, name:  'T2', amp:   0.03, phaseDeg:  324.9, speedDegPH: 29.958933,
       desc: 'Larger solar elliptic constituent'},
      {num: 28, name:  'R2', amp:   0.0, phaseDeg: 246.4, speedDegPH: 30.041067,
       desc: 'Smaller solar elliptic constituent'},
      {num: 29, name:  '2Q1', amp:  0.02, phaseDeg:  105.7, speedDegPH: 12.854286,
       desc: 'Larger elliptic diurnal'},
      {num: 30, name:  'P1', amp:   0.37, phaseDeg:  102.4, speedDegPH: 14.958931,
       desc: 'Solar diurnal constituent'},
      {num: 31, name:  '2SM2', amp:   0.01, phaseDeg:  149.1, speedDegPH: 31.015896,
       desc: 'Shallow water semidiurnal constituent'},
      {num: 32, name:  'M3', amp:   0.01, phaseDeg:  49.8, speedDegPH:  43.47616,
       desc:  'Lunar terdiurnal constituent'},
      {num: 33, name:  'L2', amp:   0.06, phaseDeg:  353.4, speedDegPH: 29.528479,
       desc: 'Smaller lunar elliptic semidiurnal constituent'},
      {num: 34, name:  '2MK3', amp:   0.05, phaseDeg:  108.7, speedDegPH: 42.92714,
       desc:  'Shallow water terdiurnal constituent'},
      {num: 35, name:  'K2', amp:   0.13, phaseDeg:  325.3, speedDegPH: 30.082138,
       desc: 'Lunisolar semidiurnal constituent'},
      {num: 36, name:  'M8', amp:   0.0, phaseDeg: 261.0, speedDegPH: 115.93642,
       desc: 'Shallow water eighth diurnal constituent'},
      {num: 37, name:  'MS4', amp:  0.03, phaseDeg:  37.0, speedDegPH:  58.984104,
       desc: 'Shallow water quarter diurnal constituent'}
    ];
    let msl = 9.10;
    let mllw = 5.98;
    constituents[0].amp = msl - mllw;

    return new TideStation(9414290, 'SAN FRANCISCO (Golden Gate)', constituents);
  }

  constructor(
    public id: number,
    public name: string,
    public constituents: HarmonicConstituent[],
    radians = false) {
    this.constituents = this.constituents.filter((c: HarmonicConstituent) => c.amp > 0.0);
    if (!radians) {
      this.constituents.forEach((c: HarmonicConstituent) => {
        c.phaseRad = c.phaseDeg * astro.D2R;
        c.speedRadPH = c.speedDegPH * astro.D2R;
      });
    }
  }

  public heightsOnHours(date: Date): TideHeight[] {
    return times(date, range(48))
      .map(time => {
        return {
          time: time,
          feet: this.tideAt(time)
        };
      });
  }

  public tideAt(time: Date): number {
    let hour: number = Math.round(time.getTime()) / 3600000;

    return this.constituents.reduce((sum: number, hc: HarmonicConstituent) => {
      let cosIn = hc.speedRadPH * hour + hc.phaseRad;
      return sum + hc.amp * Math.cos(cosIn);
    }, 0.0);
  }

}

function times(date: Date, offsets: number[]): Date[] {
  return offsets
    .map(hr => new Date(date.getTime() + (hr * 3600000)));
}

function range(to: number): number[];
function range(from: number, to?: number): number[] {
  if (to === undefined) {
    to = from;
    from = 0;
  }

  let ret: number[] = [];
  for (let i = from; i < to; i++) {
    ret[i] = i;
  }
  return ret;
}
