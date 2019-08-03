import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private socket: Socket) { }

  sensorValueChanged(){
    return this.socket.fromEvent('sensorValueChanged');
  }
}
