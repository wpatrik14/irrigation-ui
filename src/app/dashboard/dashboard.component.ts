import { Component, OnInit, Inject} from '@angular/core';
import { ZoneService } from '../zone.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ZoneView } from 'src/app/entities';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

export interface DialogData {
  duration: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  zones: ZoneView[] = [];

  constructor(private zoneService: ZoneService, public dialog: MatDialog) {
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
      const dialogRef = this.dialog.open(SwitchDialog, {
        width: '350px',
        data: {}});
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const duration = parseInt(result);
          this.zoneService.switchOn(zone.relay, duration).subscribe(result => {
            zone.relay.status = result.status;
            zone.relay.lastStartOnUTC = result.lastStartOnUTC;
            zone.relay.lastEndOnUTC = result.lastEndOnUTC;
          });
          // const numbers = interval(1000);
          // numbers.pipe(take(duration*60)).subscribe(val => zone.relay.duration=val);
        } else {
          event.source.toggle();
        }
      });
    } else {
      this.zoneService.switchOff(zone.relay).subscribe(result => {
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

@Component({
  selector: 'switch-dialog',
  templateUrl: 'switch.dialog.html',
})
export class SwitchDialog {

  constructor(
    public dialogRef: MatDialogRef<SwitchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
