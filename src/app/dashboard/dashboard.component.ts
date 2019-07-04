import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../zone.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IZone } from 'src/model/model';
import { IZoneView, ZoneConverter } from 'src/view/view';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zones: IZoneView[] = [];

  constructor(private zoneService: ZoneService) {
  }

  ngOnInit() {
    this.zoneService.getAllZones().subscribe(result => this.zones = ZoneConverter.convertZones(result));
  }

  switchZone(event: MatSlideToggleChange, zone: IZoneView) {
    if (event.checked) {
      this.zoneService.switch(zone.endpoint, zone.pin, true).subscribe(result => {
        zone.status = result.status;
        zone.startTime = new Date(result.startTime).toLocaleString();
      });
    } else {
      this.zoneService.switch(zone.endpoint, zone.pin, false).subscribe(result => {
        zone.status = result.status;
        zone.endTime = new Date(result.endTime).toLocaleString();
        zone.duration = (zone.endTime>zone.startTime) ? (result.endTime-result.startTime) / 60000 : 0;
      });
    }
  }

}
