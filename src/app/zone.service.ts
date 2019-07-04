import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ZoneView } from 'src/api/entities';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private zoneApiUrl = "https://3abr666e43.execute-api.eu-central-1.amazonaws.com/dev";

  constructor(private httpClient: HttpClient) { }

  public updateRelay(relayId: number, status: boolean): Observable<any> {
    return this.httpClient.post<ZoneView>(`${this.zoneApiUrl}/areas/zones/relay/${relayId}/switch`, {
      status
    });
  }

  public getZones() {
    return this.httpClient.get<ZoneView[]>(`${this.zoneApiUrl}/areas/1/zones`);
  }

  public getZone() {
    return this.httpClient.get<ZoneView>(`${this.zoneApiUrl}/areas/zones/1`);
  }
}
