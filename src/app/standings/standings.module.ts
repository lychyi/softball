import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdIconModule } from '@angular/material';

import { SpinnerModule } from '../shared/components/spinner.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { StandingsComponent } from './standings.component';
import { StandingsSandboxService } from './standings-sandbox.service';
@NgModule({
  imports: [
    CommonModule,
    MdIconModule,
    SpinnerModule,
    NgxDatatableModule
  ],
  declarations: [
    StandingsComponent
  ],
  providers: [
    StandingsSandboxService
  ]
})
export class StandingsModule { }
