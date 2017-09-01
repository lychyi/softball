import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Sandbox } from '../shared/sandbox/base.sandbox';
import { ScheduleService } from '../shared/async/schedule.service';


import { Game } from './game-model';

import * as store from '../shared/store/app.reducers';
import * as scheduleActions from '../shared/store/actions/schedule.actions';

@Injectable()
export class ScheduleSandboxService extends Sandbox {
  public schedule$ = this.appState$.select(store.selectSchedule);
  public scheduleFiltered$ = this.appState$.select(store.selectScheduleFiltered);
  public scheduleLoading$ = this.appState$.select(store.selectScheduleLoading);
  public scheduleLoaded$ = this.appState$.select(store.selectScheduleLoaded);
  public filterTerm$ = this.appState$.select(store.selectScheduleFilterTerm);

  constructor(
    protected appState$: Store<store.State>,
    private ss: ScheduleService
) {
    super(appState$);
  }

  public loadSchedule(): void {
    this.appState$.dispatch(new scheduleActions.LoadAction());
  }

  public filterSchedule(term) {
    this.appState$.dispatch(new scheduleActions.SetFilterTermAction(term));
  }
}
