import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../zone.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ZoneView } from 'src/app/entities';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zones: ZoneView[] = [];

  constructor(private zoneService: ZoneService) {
  }

  ngOnInit() {
    this.zoneService.getZones(1).subscribe(result => {
      this.zones = result;
      this.zones.forEach(zone => {
        zone.relay.duration = DashboardComponent.getDuration(zone.relay.lastStartOnUTC, zone.relay.lastEndOnUTC);
      })
    });
  }

  switchZone(event: MatSlideToggleChange, zone: ZoneView) {
    if (event.checked) {
      this.zoneService.switchRelay(zone.relay, true).subscribe(result => {
        zone.relay.status = result.status;
        zone.relay.lastStartOnUTC = result.lastStartOnUTC;
        zone.relay.lastEndOnUTC = result.lastEndOnUTC;
        zone.relay.duration = 0;
      });
    } else {
      this.zoneService.switchRelay(zone.relay, false).subscribe(result => {
        zone.relay.status = result.status;
        zone.relay.lastStartOnUTC = result.lastStartOnUTC;
        zone.relay.lastEndOnUTC = result.lastEndOnUTC;
        zone.relay.duration = DashboardComponent.getDuration(result.lastStartOnUTC, result.lastEndOnUTC);
      });
    }
  }

  static getDuration(startDate: string, endDate: string) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (end-start>0) {
      return (end-start) / 1000 / 60;
    } else {
      return 0;
    }
  }

}
