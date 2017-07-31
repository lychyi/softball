import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular Material
import {
  MaterialModule,
  MdToolbarModule,
  MdIconModule,
  MdButtonModule
} from '@angular/material';

// Router
import { AppRoutingModule } from './app-routing.module';

// ngrx
import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/store/app.reducers';

import { AsyncModule } from './shared/async/async.module';
import { HomeModule } from './home/home.module';
import { TeamsModule } from './teams/teams.module';

import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingsComponent } from './standings/standings.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    StandingsComponent
  ],
  imports: [
    AsyncModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    TeamsModule,
    StoreModule.forRoot(reducers),
    MaterialModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
