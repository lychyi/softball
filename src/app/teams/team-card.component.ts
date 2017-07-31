import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Team, TeamMember } from './team.model';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent {
  @Input() team: Team;
  @Output() onViewRoster = new EventEmitter<TeamMember[]>();

  constructor() { }

  displayRoster(roster: TeamMember[]) {
    this.onViewRoster.emit(roster);
  }
}
