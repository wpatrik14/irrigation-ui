import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ZoneView, ScheduleView, ForecastView } from 'src/app/entities';

@Injectable({
  providedIn: 'root'
})
export class ForecastsService {

  constructor(private httpClient: HttpClient) { }

  addForecast(forecastView: ForecastView){
    return this.httpClient.post<ForecastView>(`/api/forecasts`, forecastView);
  }

  toogleForecast(forecastView: ForecastView) {
    return this.httpClient.put<ForecastView>(`/api/forecasts/${forecastView.id}`, {
      enabled: !forecastView.enabled,
    });
  }

  deleteForecast(forecastView: ForecastView){
    return this.httpClient.delete<ForecastView>(`/api/forecasts/${forecastView.id}`);
  }
}
