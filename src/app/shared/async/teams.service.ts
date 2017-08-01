import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { FirebaseRestService } from './firebase-rest.service';

import { environment } from '../../../environments/environment';

import { Team, TeamMember } from '../../teams/team.model';

@Injectable()
export class TeamsService {

  constructor(private fbRest: FirebaseRestService) { }

  getTeams(): Observable<any> {
    return this.fbRest.getEndpoint(environment.firebase.databaseURL, '/teams2.json')
      .map(this._responseToTeams.bind(this));
  }

  private _responseToTeams(res) {
    const teams: Team[] = [];

      res.json().forEach((team, index) => {
        teams.push(new Team({
          id: index,
          name: team.name,
          coach: team.coach,
          color: team.color,
          league: team.league,
          abbreviation: team.shortName,
          roster: this._createRoster(team.roster)
        }));
      });

      return teams;
  }

  // Parses the data back from the service and creates new TeamMember instances
  private _createRoster(roster: any): TeamMember[] {
    const keys = Object.keys(roster);

    return keys.map((key) => {
      return new TeamMember(roster[key]);
    });
  }
}
