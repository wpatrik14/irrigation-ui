import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZoneView, ScheduleView } from 'src/app/entities';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {

  constructor(private httpClient: HttpClient) { }

  addSchedule(zoneView: ZoneView, scheduleView: ScheduleView){
    scheduleView.zone = zoneView;
    return this.httpClient.post<ScheduleView>(`/api/schedules`, scheduleView);
  }

  toogleSchedule(schedule: ScheduleView){
    return this.httpClient.put<ScheduleView>(`/api/schedules/${schedule.id}`, {
      enabled: !schedule.enabled,
    });
  }

  deleteSchedule(schedule: ScheduleView){
    return this.httpClient.delete<ScheduleView>(`/api/schedules/${schedule.id}`);
  }

  getSchedules(zone: ZoneView) {
    return this.httpClient.get<ScheduleView[]>(`/api/schedules`, {
      params: {
        filter: `zone||eq||${zone.id}`
      }
    });
  }
}
