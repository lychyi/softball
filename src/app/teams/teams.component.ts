import { Component, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as appReducers from '../shared/store/app.reducers';
import { TeamsSandboxService } from './teams-sandbox.service';

import { RosterDialogComponent } from './roster-dialog.component';
import { Team, TeamMember } from './team.model';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  public teams$: Observable<Team[]> = this.sandbox.teams$;
  public teamsLoading$: Observable<Boolean> = this.sandbox.teamsLoading$;

  constructor(public sandbox: TeamsSandboxService, public dialog: MdDialog) {}

  ngOnInit() {
    this.sandbox.loadTeams();
  }

  public openRosterDialog(teamName, e) {
    this.dialog.open(RosterDialogComponent, {
      data: {
        roster: e,
        teamName: teamName
      }
    });
  }
}
