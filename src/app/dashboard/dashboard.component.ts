import { Component, OnInit, Input } from '@angular/core';
import { ZoneService } from '../zone.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zoneStatus1: string = "OFF";

  constructor(private zoneService: ZoneService) { }

  ngOnInit() {

  }

  async switchZone1(event: MatSlideToggleChange) {
    if (event.checked) {
      this.zoneStatus1 = "ON";
      this.zoneService.switchOn();
    } else {
      this.zoneStatus1 = "OFF";
      this.zoneService.switchOff();
      
    }
  }

}
