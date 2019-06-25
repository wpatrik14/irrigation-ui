import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IZone } from 'src/model/model';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private zoneApiUrl = "https://hmuxe3xutc.execute-api.eu-central-1.amazonaws.com/prod/switchZone";

  constructor(private httpClient: HttpClient) { }

  public switch(endpoint: string, pin: string, status: boolean): Observable<any> {
    return this.httpClient.post<IZone>(this.zoneApiUrl, {
      endpoint,
      pin,
      status
    });
  }

  public getAllZones() {
    return this.httpClient.get<IZone[]>(this.zoneApiUrl);
  }

  public getZoneStatus(endpoint: string, pin: string) {
    return this.httpClient.get<IZone>(this.zoneApiUrl, {
      params: {
        endpoint,
        pin
      }
    });
  }
}
