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
  @Output() onViewUpcoming = new EventEmitter<string>();

  constructor() { }

  displayRoster(roster: TeamMember[]) {
    this.onViewRoster.emit(roster);
  }

  viewUpcomingGamesForTeam(name: string) {
    this.onViewUpcoming.emit(name);
  }
}
