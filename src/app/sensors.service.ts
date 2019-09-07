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

  getLatestValue(clientId: string, type: string) {
    return this.httpClient.get<any>(`http://wpatrik.ddns.net:3000/api/sensors/${clientId}/${type}/latest`);
  }

  getAllValues(clientId: string, type: string) {
    return this.httpClient.get<any>(`http://wpatrik.ddns.net:3000/api/sensors/${clientId}/${type}`);
  }
}
