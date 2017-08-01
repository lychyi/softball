import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { TeamsService } from '../shared/async/teams.service';

import { Team } from './team.model';

@Injectable()
export class TeamsResolver implements Resolve<Team[]> {
  constructor(private teamsService: TeamsService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Team[]> {
    return this.teamsService.getTeams();
  }
}
