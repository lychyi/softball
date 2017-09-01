import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FirebaseRestService } from './firebase-rest.service';
import { ScheduleService } from './schedule.service';
import { TeamsService } from './teams.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  providers: [
    FirebaseRestService,
    ScheduleService,
    TeamsService
  ]
})
export class AsyncModule { }
