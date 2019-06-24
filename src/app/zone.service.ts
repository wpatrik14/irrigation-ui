import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private zoneApiUrl = "https://hmuxe3xutc.execute-api.eu-central-1.amazonaws.com/prod/switchZone";

  constructor(private httpClient: HttpClient) { }

  public switch(endpoint: string, pin: string, name: string, status: boolean): Observable<any> {
    return this.httpClient.post<any>(this.zoneApiUrl, {
      endpoint,
      pin,
      status,
      lastStartTime: new Date().toISOString(),
      lastEndTime: new Date().toISOString()
    });
  }

  public getAllZones() {
    return this.httpClient.get<any>(this.zoneApiUrl);
  }

  public getZoneStatus(endpoint: string, pin: string) {
    return this.httpClient.get<any>(this.zoneApiUrl, {
      params: {
        endpoint,
        pin
      }
    });
  }
}
