import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Rx';

import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import * as teamsActions from '../actions/teams.actions';

import { TeamsService } from '../../async/teams.service';

@Injectable()
export class TeamsEffects {

  @Effect()
  teams$: Observable<Action> = this.actions$
    .ofType(teamsActions.ActionTypes.LOAD)
    .switchMap(() => this.ts.getTeams())
    .map(results => new teamsActions.LoadSuccessAction(results));

  constructor(
    private http: Http,
    private actions$: Actions,
    private ts: TeamsService) { }
}
