import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MdProgressSpinnerModule,
  MdToolbarModule,
  MdSelectModule,
  MdCardModule,
  MdIconModule,
  MdButtonModule
} from '@angular/material';

import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { ScheduleSandboxService } from './schedule-sandbox.service';
import { ScheduleService } from '../shared/async/schedule.service';
import { ScheduleComponent } from './schedule.component';

import { ReplacePipe } from '../shared/utility/replace.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdProgressSpinnerModule,
    MdToolbarModule,
    MdSelectModule,
    MdCardModule,
    MdIconModule,
    MdButtonModule,
    Ng2PageScrollModule.forRoot()
  ],
  declarations: [
    ScheduleComponent,
    ReplacePipe
  ],
  providers: [
    ScheduleSandboxService,
    ScheduleService
  ]
})
export class ScheduleModule { }
