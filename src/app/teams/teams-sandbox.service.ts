import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

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

  public loadTeams(): void {
    this.appState$.dispatch(new teamActions.LoadAction());

    this.ts.getTeams()
      .subscribe((res) => {
        const teams: Team[] = [];

        res.json().forEach((team, index) => {
          teams.push(new Team({
            id: index,
            name: team.name,
            coach: team.coach,
            color: team.color,
            league: team.league,
            abbreviation: team.shortName,
            roster: this._parseRoster(team.roster)
          }));
        });

        this.appState$.dispatch(new teamActions.LoadSuccessAction(teams));
      },
      (err) => {
        this.appState$.dispatch(new teamActions.LoadFailAction());
      }
    );
  }

  // Parses the data back from the service and creates new TeamMember instances
  private _parseRoster(roster: any) {
    const keys = Object.keys(roster);

    return keys.map((key) => {
      return new TeamMember(roster[key]);
    });
  }
}
