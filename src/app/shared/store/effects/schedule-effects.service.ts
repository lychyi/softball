import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Rx';

import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import * as scheduleActions from '../actions/schedule.actions';

import { ScheduleService } from '../../async/schedule.service';

@Injectable()
export class ScheduleEffects {

  @Effect()
  schedule$: Observable<Action> = this.actions$
    .ofType(scheduleActions.ActionTypes.LOAD)
    .switchMap(() => this.ss.getSchedule())
    .map(results => new scheduleActions.LoadSuccessAction(results));

  constructor(
    private http: Http,
    private actions$: Actions,
    private ss: ScheduleService) { }
}
