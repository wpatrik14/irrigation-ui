import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ZoneView, RelayView } from 'src/app/entities';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private httpClient: HttpClient) { }

  public switchOff(relay: RelayView): Observable<RelayView> {
    return this.httpClient.post<RelayView>(`/api/relays/switch`, {
      endpoint: relay.endpoint,
      clientId: relay.clientId,
      gpio: relay.gpio,
      status: false
    });
  }

  public switchOn(relay: RelayView, duration: number): Observable<RelayView> {
    return this.httpClient.post<RelayView>(`/api/relays/switch`, {
      endpoint: relay.endpoint,
      clientId: relay.clientId,
      gpio: relay.gpio,
      duration,
      status: true    
    });
  }

  public getZones(area: number) {
    return this.httpClient.get<ZoneView[]>(`/api/zones`, {
      params: {
        filter: `area||eq||${area}`
      }
    });
  }

  public getZone(zoneId: number) {
    return this.httpClient.get<ZoneView>(`/api/zones/${zoneId}`);
  }
}
