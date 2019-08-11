import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RelayView } from 'src/app/entities';
import { Socket } from 'ngx-socket-io';
import { LoadingService } from './loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class RelaysService {

  private spinnerRef;

  constructor(private httpClient: HttpClient, private socket: Socket, private loadingService: LoadingService) { }

  public switchOff(relay: RelayView): Observable<RelayView> {
    return this.httpClient.post<RelayView>(`/api/relays/switch`, {
      endpoint: relay.endpoint,
      clientId: relay.clientId,
      gpio: relay.gpio,
      status: false
    });
  }

  public switchOn(relay: RelayView, duration: number): Observable<RelayView> {
    this.spinnerRef = this.loadingService.start();
    setTimeout(() => {
      this.spinnerRef.close();
    }, 2000);
    
    return this.httpClient.post<RelayView>(`/api/relays/switch`, {
      endpoint: relay.endpoint,
      clientId: relay.clientId,
      gpio: relay.gpio,
      duration,
      status: true    
    });
  }

  relayStateChanged(){
    this.spinnerRef.close();
    return this.socket.fromEvent('relayStateChanged');
  }
}
