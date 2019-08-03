import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZoneView } from 'src/app/entities';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(private httpClient: HttpClient) { }

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
