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
    zone.statusDesc = "Waiting...";
    if (event.checked) {
      this.zoneService.switch(zone.endpoint, zone.pin, zone.name, true).subscribe(result => {
        zone.statusDesc = result;
        zone.status = true;
      });
    } else {
      this.zoneService.switch(zone.endpoint, zone.pin, zone.name, false).subscribe(result => {
        zone.statusDesc = result;
        zone.status = false;
      });
    }
  }

}
