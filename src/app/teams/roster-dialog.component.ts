import { Component, Inject } from '@angular/core';

import { MD_DIALOG_DATA} from '@angular/material';

import { TeamMember } from './team.model';

@Component({
  selector: 'app-roster-dialog',
  templateUrl: './roster-dialog.component.html',
  styleUrls: ['./roster-dialog.component.scss']
})
export class RosterDialogComponent {
  public roster: TeamMember[];
  public teamName: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.roster = this.data.roster;
    this.teamName = this.data.teamName;
  }
}
