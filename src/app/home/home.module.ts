import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule, MdToolbarModule } from '@angular/material';

import { HomeSandbox } from './home.sandbox';
import { HomeComponent } from './home.component';
import { TeamsService } from '../shared/async/teams.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MdToolbarModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeSandbox,
    TeamsService
  ]
})
export class HomeModule { }
