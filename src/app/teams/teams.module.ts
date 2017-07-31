import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import {
  MdCardModule,
  MdButtonModule,
  MdIconModule,
  MdProgressSpinnerModule,
  MdListModule
} from '@angular/material';

import { TeamsSandboxService } from './teams-sandbox.service';
import { TeamsComponent } from './teams.component';
import { TeamCardComponent } from './team-card.component';
import { RosterDialogComponent } from './roster-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdListModule
  ],
  declarations: [
    TeamsComponent,
    TeamCardComponent,
    RosterDialogComponent
  ],
  providers: [
    TeamsSandboxService
  ],
  entryComponents: [
    RosterDialogComponent
  ]
})

export class TeamsModule { }
