import { Component, OnInit, Input } from '@angular/core';
import { ZoneService } from '../zone.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IZone } from 'src/model/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zones: IZone[] = [];

  constructor(private zoneService: ZoneService) {
  }

  ngOnInit() {
    this.zoneService.getAllZones().subscribe(result => this.zones = result);
  }

  switchZone(event: MatSlideToggleChange, zone: IZone) {
    if (event.checked) {
      this.zoneService.switch(zone.endpoint, zone.pin, zone.name, true).subscribe(result => {
        zone.status = result.status;
        zone.startTime = result.startTime;
      });
    } else {
      this.zoneService.switch(zone.endpoint, zone.pin, zone.name, false).subscribe(result => {
        zone.status = result.status;
        zone.endTime = result.endTime;
      });
    }
  }

}
