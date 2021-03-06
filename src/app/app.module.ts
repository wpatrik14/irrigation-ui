import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SwitchDialog } from './dashboard/switch-dialog/switch.dialog';
import { ScheduleDialog } from './dashboard/schedule-dialog/schedule.dialog';
import { ForecastDialog } from './dashboard/forecast-dialog/forecast.dialog';
import { LoadingDialog } from './loading/loading.dialog';
import { LoadingService } from './loading/loading.service';
const config: SocketIoConfig = { url: 'http://wpatrik.ddns.net:3000', options: {}};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SwitchDialog,
    ScheduleDialog,
    ForecastDialog,
    LoadingDialog
  ],
  imports: [
    HttpClientModule,
    SocketIoModule.forRoot(config),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [LoadingService],
  bootstrap: [AppComponent],
  entryComponents: [SwitchDialog, ScheduleDialog, ForecastDialog, LoadingDialog]
})
export class AppModule { }
