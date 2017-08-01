import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { Sandbox } from '../shared/sandbox/base.sandbox';
import { ScheduleService } from '../shared/async/schedule.service';


import { Game } from './game-model';
import { GameResult } from './game-result-model';

import * as store from '../shared/store/app.reducers';
import * as scheduleActions from '../shared/store/actions/schedule.actions';

@Injectable()
export class ScheduleSandboxService extends Sandbox {
  public schedule$ = this.appState$.select(store.selectSchedule);
  public scheduleDates$ = this.appState$.select(store.selectScheduleDates);
  public scheduleGroupByDates$ = this.appState$.select(store.selectScheduleGroupByDates);
  public scheduleLoading$ = this.appState$.select(store.selectScheduleLoading);
  public scheduleLoaded$ = this.appState$.select(store.selectScheduleLoaded);
  public filter$ = this.appState$.select(store.selectScheduleFilter);
  public nextGameDate$ = this.appState$.select(store.selectNextGameDate);

  public originalSchedule: Game[] = [];

  constructor(
    protected appState$: Store<store.State>,
    private ss: ScheduleService
) {
    super(appState$);
  }

  public loadSchedule(): void {
    this.appState$.dispatch(new scheduleActions.LoadAction());

    // Check do we have a filter set?
    this.filter$.subscribe(filter => {
      if (filter === '') {
        this._fetchSchedule();
      } else {
        this.filterSchedule(filter);
      }
    });
  }

  public filterSchedule(name) {
    let filtered: Game[];

    if (!this.originalSchedule.length) {
      this._fetchSchedule();
    }

    // Set filter name in the state
    this.setFilter(name);

    // Dispatch filtered set of games to state
    if (name === '') {
      this.appState$.dispatch(new scheduleActions.LoadSuccessAction(this.originalSchedule));
    } else {
      filtered = this.originalSchedule.filter(game => {
        return game.home.name === name || game.away.name === name;
      });

      this.appState$.dispatch(new scheduleActions.LoadSuccessAction(filtered));
    }
  }

  public setFilter(name) {
    this.appState$.dispatch(new scheduleActions.FilterScheduleAction(name));
  }

  // Check for existing schedule cache, or get new schedule and cache
  _fetchSchedule(): void {
    this.scheduleLoaded$.subscribe(loaded => {
      if (loaded) {
        this.appState$.dispatch(new scheduleActions.LoadSuccessAction(this.originalSchedule));
      } else {
        this.ss.getSchedule().subscribe(results => {
          // Save original schedule for things like filtering
          this.originalSchedule = results;
          this.appState$.dispatch(new scheduleActions.LoadSuccessAction(results));
        });
      }
    });
  }
}
