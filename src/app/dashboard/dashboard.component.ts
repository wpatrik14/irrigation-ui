import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../zone.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ZoneView } from 'src/api/entities';

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
    this.zoneService.getZones().subscribe(result => this.zones = result);
  }

  switchZone(event: MatSlideToggleChange, zone: ZoneView) {
    if (event.checked) {
      this.zoneService.updateRelay(1, true).subscribe(result => {
        zone.relay.status = result.status;
        zone.relay.updatedOnUTC = result.updatedOnUTC;
      });
    } else {
      this.zoneService.updateRelay(1, false).subscribe(result => {
        zone.relay.status = result.status;
        zone.relay.updatedOnUTC = result.updatedOnUTC;
      });
    }
  }

}
