import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ZoneView, RelayView } from 'src/app/entities';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private zoneApiUrl = "https://3abr666e43.execute-api.eu-central-1.amazonaws.com/dev";

  constructor(private httpClient: HttpClient) { }

  public switchRelay(relayId: number, status: boolean): Observable<RelayView> {
    return this.httpClient.post<RelayView>(`${this.zoneApiUrl}/areas/zones/relay/${relayId}/switch`, {
      status
    });
  }

  public getZones(area: number) {
    return this.httpClient.get<ZoneView[]>(`${this.zoneApiUrl}/areas/1/zones`);
  }

  public getZone(area: number) {
    return this.httpClient.get<ZoneView>(`${this.zoneApiUrl}/areas/zones/1`);
  }
}
