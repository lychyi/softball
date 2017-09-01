import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Rx';

import { Sandbox } from '../shared/sandbox/base.sandbox';

import { StandingsSandboxService } from '../standings/standings-sandbox.service';

import { CookieService } from 'angular2-cookie/core';

import * as store from '../shared/store/app.reducers';
import * as homeActions from '../shared/store/actions/home.actions';
import * as standingsActions from '../shared/store/actions/standings.actions';
import * as teamsActions from '../shared/store/actions/teams.actions';
import { TeamTools } from '../shared/utility/team-tools';
import { Team } from '../teams/team.model';

@Injectable()
export class HomeSandbox extends Sandbox {
  public loading$ =
    this.appState$.select(store.selectStandingsLoading) ||
    this.appState$.select(store.selectTeamsLoading);

  public loaded$ =
    this.appState$.select(store.selectStandingsLoaded) &&
    this.appState$.select(store.selectTeamsLoaded);

  public defaultTeam$ = this.appState$.select(store.selectHomeTeam);
  public teamsList$ = this.appState$.select(store.selectTeams);
  public teamTools$: Observable<TeamTools>;

  constructor(
    protected appState$: Store<store.State>,
    private standingsSandbox: StandingsSandboxService,
    private cookie: CookieService
  ) { super(appState$); }

  public loadHome(): void {
    // Load team from cookies if available
    const defaultTeam = <Team>this.cookie.getObject('defaultTeam');
    this.appState$.dispatch(new homeActions.SetTeamAction(defaultTeam));

    this.appState$.dispatch(new homeActions.LoadingAction());
    this.appState$.dispatch(new standingsActions.GenerateAction());
    this.appState$.dispatch(new teamsActions.LoadAction());

    this.teamTools$ = this.teamsList$.switchMap(teams => {
      return Observable.of(new TeamTools(teams));
    });
  }

  public getTeam(): Observable<Team> {
    return this.appState$.select(store.selectHomeTeam);
  }

  public setTeam(name): void {
    this.teamTools$.subscribe(tt => {
      const teamObj = tt.getTeamByName(name);
      
      this.cookie.putObject('defaultTeam', teamObj);
      this.appState$.dispatch(new homeActions.SetTeamAction(teamObj));
    });
  }
}
