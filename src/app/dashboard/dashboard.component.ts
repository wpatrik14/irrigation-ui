import { Component, OnInit, Input } from '@angular/core';
import { ZoneService } from '../zone.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IotData } from 'aws-sdk';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zoneStatus1: string = "OFF";
  iotdata = new IotData({
    endpoint: "a3tayyh07tdfo0-ats.iot.eu-central-1.amazonaws.com",
    accessKeyId: "AKIA6JAJCONUPAPQUQS2",
    secretAccessKey: "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",
    region: "eu-central-1"
  });

  constructor(private zoneService: ZoneService) { }

  ngOnInit() {

  }

  async switchZone1(event: MatSlideToggleChange) {
    if (event.checked) {
      this.zoneStatus1 = "ON";
      of(this.iotdata.publish({payload: "ON", topic: "switch", qos: 0}).promise()).subscribe();
    } else {
      this.zoneStatus1 = "OFF";
      of(this.iotdata.publish({payload: "OFF", topic: "switch", qos: 0}).promise()).subscribe();
    }
  }

}
