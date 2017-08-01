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
  public teamsLoading$ = this.appState$.select(store.selectTeamsLoading);

  constructor(
    protected appState$: Store<store.State>,
    private ts: TeamsService
  ) {
    super(appState$);
  }

  // Loads teams into the store
  public loadTeams(): void {
    this.appState$.dispatch(new teamActions.LoadAction());

    // Refactor this to an ngrx effects service
    // Is this taken care of in effects?
    // this.ts.getTeams()
    //   .subscribe(teams => {
    //     this.appState$.dispatch(new teamActions.LoadSuccessAction(teams));
    //   },
    //   (err) => {
    //     this.appState$.dispatch(new teamActions.LoadFailAction());
    //   }
    // );
  }
}
