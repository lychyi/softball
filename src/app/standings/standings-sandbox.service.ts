import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { Game } from '../schedule/game-model';
import { StandingsUtility } from './standings-utility';

import * as store from '../shared/store/app.reducers';
import * as standingsActions from '../shared/store/actions/standings.actions';

@Injectable()
export class StandingsSandboxService {
  public stats$ = this.appState$.select(store.selectStandingsStats);
  public loading$ = this.appState$.select(store.selectStandingsLoading);
  public loaded$ = this.appState$.select(store.selectStandingsLoaded);

  constructor(
    protected appState$: Store<store.State>
  ) { }

  public generateStandings(): void {
    this.appState$.dispatch(new standingsActions.GenerateAction());
  }
}
