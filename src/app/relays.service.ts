import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RelayView } from 'src/app/entities';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RelaysService {

  constructor(private httpClient: HttpClient, private socket: Socket) { }

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

  relayStateChanged(){
    return this.socket.fromEvent('relayStateChanged');
  }
}
