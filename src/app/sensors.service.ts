import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private socket: Socket, private httpClient: HttpClient) { }

  sensorValueChanged(){
    return this.socket.fromEvent('sensorValueChanged');
  }

  getValues(clientId: string, type: string, limit?: number) {
    if (limit) {
      return this.httpClient.get<any>(`/api/sensors/${clientId}/${type}?limit=${limit}`);
    } else {
      return this.httpClient.get<any>(`/api/sensors/${clientId}/${type}`);
    }
  }

  getTypes(clientId: string) {
    return this.httpClient.get<any>(`/api/sensors/types?clientId=${clientId}`);
  }
}
