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
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './shared/store/app.reducers';
import { effects } from './shared/store/app.effects';

// Modules
import { AsyncModule } from './shared/async/async.module';
import { HomeModule } from './home/home.module';
import { TeamsModule } from './teams/teams.module';
import { ScheduleModule } from './schedule/schedule.module';
import { StandingsModule } from './standings/standings.module';
import { SpinnerModule } from './shared/components/spinner.module';

// Components
import { AppComponent } from './app.component';
import { SomeComponentComponent } from './some-component/some-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SomeComponentComponent
  ],
  imports: [
    AsyncModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    TeamsModule,
    StandingsModule,
    ScheduleModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    MaterialModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    SpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
