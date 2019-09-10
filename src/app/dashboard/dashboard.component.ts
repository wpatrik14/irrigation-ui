import { Component, OnInit} from '@angular/core';
import { ZonesService } from '../zones.service';
import { ZoneView, RelayView, SensorView, ScheduleView } from 'src/app/entities';
import {MatDialog} from '@angular/material/dialog';
import { RelaysService } from '../relays.service';
import { SensorsService } from '../sensors.service';
import { SchedulesService } from '../schedules.service';
import { SwitchDialog } from './switch-dialog/switch.dialog';
import { ScheduleDialog } from './schedule-dialog/schedule.dialog';
import { ForecastDialog } from './forecast-dialog/forecast.dialog';
import { ForecastsService } from '../forecasts.service';
import { LoadingService } from '../loading/loading.service';
import * as Highcharts from 'highcharts';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public zones: ZoneView[] = [];
  public spinnerRef;

  constructor(
    private zonesService: ZonesService, 
    private relaysService: RelaysService, 
    private sensorsService: SensorsService, 
    private schedulesService: SchedulesService,
    private forecastsService: ForecastsService, 
    public dialog: MatDialog,
    public loadingService: LoadingService) {
  }

  ngOnInit() {
    const temperatures = this.sensorsService.getValues('7c874a3a-aa00-11e9-a2a3-2a2ae2dbcce4','temperature');
    const humidity = this.sensorsService.getValues('7c874a3a-aa00-11e9-a2a3-2a2ae2dbcce4','humidity');
    
    forkJoin([temperatures, humidity]).subscribe(results => {
      const options: any = {
        chart: {
          type: 'line',
          height: 700,
        },
        title: {
          text: 'History'
        },
        credits: {
          enabled: false
        },
        tooltip: {
          formatter: function() {
            return `x: ${Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x)} y: ${this.y.toFixed(2)}`;
          }
        },
        plotOptions: {
          series: {
            step: 'center',
          }
        },
        xAxis: {
          type: 'datetime',
          labels: {
            formatter: function() {
              return Highcharts.dateFormat('%e %b %y', this.value);
            }
          }
        },
        yAxis: [{ // Primary yAxis
          labels: {
              format: '{value}°C',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          title: {
              text: 'Temperature',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          }
      }, { // Secondary yAxis
          title: {
              text: 'Humidity',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          labels: {
              format: '{value}%',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          opposite: true
      }],
        series: [
          {
            name: 'Temperature',
            type: 'line',
            data: results[0].Items.map(item => [item.insertedOnTimestamp, item.value])
          },
          {
            name: 'Humidity',
            type: 'spline',
            yAxis: 1,
            data: results[1].Items.map(item => [item.insertedOnTimestamp, item.value])
          }
        ]
      };
  
  
      Highcharts.chart('container', options);
    });
    
    
      
    this.zonesService.getZones(1).subscribe(result => {
      this.zones = result;
      this.zones.forEach(zone => {
        zone.relay.durationInfo = DashboardComponent.getDuration(zone.relay.lastStartOnUTC, zone.relay.lastEndOnUTC);
        zone.sensors.forEach(sensor => {
          sensor.values = [];
          this.sensorsService.getTypes(sensor.clientId).subscribe(types => {
            types.Items.forEach(type => {
              this.sensorsService.getValues(sensor.clientId, type.type, 1).subscribe(result => {
                console.log(result.Items[0].value);
                sensor.values.push({
                  type: result.Items[0].type,
                  value: result.Items[0].value,
                  unit: result.Items[0].unit,
                  insertedOnUTC: result.Items[0].insertedOnTimestamp,
                });
              });
            });
          });
        });
      })
    });

    this.relaysService.relayStateChanged().subscribe((relayView: RelayView) => {
      console.log(`Received socket ${JSON.stringify(relayView)}`);
      const zone = this.zones.find(zone => zone.relay.clientId===relayView.clientId && zone.relay.gpio===relayView.gpio);
      const relay = zone.relay;
      relay.status = relayView.status;
      relay.lastStartOnUTC = relayView.lastStartOnUTC;
      relay.lastEndOnUTC = relayView.lastEndOnUTC;
      relay.durationInfo = DashboardComponent.getDuration(relay.lastStartOnUTC, relay.lastEndOnUTC);
    });

    this.sensorsService.sensorValueChanged().subscribe((value: any) => {
      console.log(`Received socket ${JSON.stringify(value)}`);
      /* Not yet implemented */
    });
  }

  switch(zone: ZoneView) {
    if (!zone.relay.status) {
      // Turn ON
      const dialogRef = this.dialog.open(SwitchDialog, {
        width: '400px',
        data: {}});
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const duration = parseInt(result);
          this.relaysService.switchOn(zone.relay, duration).subscribe(result => {
           
          });
        }
      });
    } else {
      // Turn OFF
      this.relaysService.switchOff(zone.relay).subscribe(result => {
        zone.relay.lastStartOnUTC = result.lastStartOnUTC;
        zone.relay.lastEndOnUTC = result.lastEndOnUTC;
        zone.relay.durationInfo = DashboardComponent.getDuration(result.lastStartOnUTC, result.lastEndOnUTC);
      });
    }
  }

  async addForecast(zone: ZoneView) {
    const dialogRef = this.dialog.open(ForecastDialog, {
      width: '400px',
      data: zone.forecast
    });

    dialogRef.afterClosed().subscribe(forecast => {
      if (forecast) {
        forecast.zone = zone;
        forecast.enabled = true;
        this.forecastsService.addForecast(forecast).subscribe(result => {
          zone.forecast = forecast;
        });
      }
    });    
  }

  async addSchedule(zone: ZoneView) {
    const dialogRef = this.dialog.open(ScheduleDialog, {
      width: '400px',
      data: {}});

    dialogRef.afterClosed().subscribe(schedule => {
      if (schedule) {
        schedule.enabled=true;
        this.schedulesService.addSchedule(zone, schedule).subscribe(result => {
          zone.schedules.push(schedule);
        });
      }
    });    
  }

  async toogleForecast(zone: ZoneView) {
    this.forecastsService.toogleForecast(zone.forecast).subscribe(result => {
      zone.forecast.enabled=result.enabled;
    });
  }

  async toogleSchedule(zone: ZoneView, schedule: ScheduleView) {
    this.schedulesService.toogleSchedule(schedule).subscribe(result => {
      this.schedulesService.getSchedules(zone).subscribe(schedules => {
        zone.schedules = schedules;
      });
    });
  }

  async deleteSchedule(zone: ZoneView, schedule: ScheduleView) {
    this.schedulesService.deleteSchedule(schedule).subscribe(result => {
      zone.schedules.pop();
    });

  }

  static getDuration(startDate: string, endDate: string) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    if (end-start>0) {
      return `${Math.round(((end-start) / 1000 / 60) * 100) / 100} minutes`;
    } else {
      return "Irrigation in progress...";
    }
  }

}
