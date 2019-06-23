import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private httpClient: HttpClient) { }

  public switchOn(): Observable<any> {
    return this.httpClient.get<any>('https://hmuxe3xutc.execute-api.eu-central-1.amazonaws.com/prod/switchZone', {
      params: { command: "ON" }
    });
  }

  public switchOff(): Observable<any> {
    return this.httpClient.get<any>('https://hmuxe3xutc.execute-api.eu-central-1.amazonaws.com/prod/switchZone', {
      params: { command: "OFF" }
    });
  }
}
