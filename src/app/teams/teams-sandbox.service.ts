import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Sandbox } from '../shared/sandbox/base.sandbox';
import { TeamsService } from '../shared/async/teams.service';

import * as store from '../shared/store/app.reducers';
import * as teamActions from '../shared/store/actions/teams.actions';

import { Team, TeamMember } from './team.model';

@Injectable()
export class TeamsSandboxService extends Sandbox {
  public teams$ = this.appState$.select(store.selectTeams);
  public teamsGroupedByLeague$ = this.appState$.select(store.selectTeamsGroupedByLeague);
  public teamsLoading$ = this.appState$.select(store.selectTeamsLoading);
  public leagues$ = this.appState$.select(store.selectTeamLeagues);

  constructor(
    protected appState$: Store<store.State>,
    private ts: TeamsService
  ) {
    super(appState$);
  }

  // Loads teams into the store
  public loadTeams(): void {
    this.appState$.dispatch(new teamActions.LoadAction());
  }
}
