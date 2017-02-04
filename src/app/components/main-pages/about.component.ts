import { Component } from '@angular/core';
import { TideHeight, TideStation } from '../../models/tide-station';

@Component({
  selector: 'about',
  template: require('./about.component.html')
})
export class AboutComponent {
  private station: TideStation;
  private date: Date = new Date('2017-01-31T00:00:00-08:00');
  private hours: TideHeight[];

  constructor() {
    this.station = TideStation.SAN_FRANCISCO();
    this.hours = this.station.heightsOnHours(this.date);
  }
}

