import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Rx';

import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import * as standingsActions from '../actions/standings.actions';

import { ScheduleService } from '../../async/schedule.service';
import { StandingsUtility } from '../../../standings/standings-utility';

@Injectable()
export class StandingsEffects {

  @Effect()
  standings$: Observable<Action> = this.actions$
    .ofType(standingsActions.ActionTypes.GENERATE)
    .switchMap(() => this.ss.getSchedule())
    .map(schedule => {
      const util = new StandingsUtility(schedule);
      return new standingsActions.LoadedAction(util.stats);
    });

  constructor(
    private http: Http,
    private actions$: Actions,
    private ss: ScheduleService) { }
}
