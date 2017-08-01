import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import * as moment from 'moment';
import { groupBy } from 'lodash';

import * as fromTeams from './reducers/teams.reducer';
import * as fromSchedule from './reducers/schedule.reducer';

export interface State {
  teams: fromTeams.State;
  schedule: fromSchedule.State;
}

export const reducers = {
  teams: fromTeams.reducer,
  schedule: fromSchedule.reducer
};

// [Teams] selectors
export function selectTeams(state: State) { return state.teams.results; }
export function selectTeamsLoading(state: State) { return state.teams.loading; }

// [Schedule] selectors
export function selectSchedule(state: State) { return state.schedule.results; }
export function selectScheduleDates(state: State) {
  return Object.keys(groupBy(state.schedule.results, (game) => {
    return moment(game.datetime).format('M/DD/YY');
  }));
}
export function selectScheduleGroupByDates(state: State) {
  return groupBy(state.schedule.results, (game) => {
    return moment(game.datetime).format('M/DD/YY');
  });
}
export function selectNextGameDate(state: State) {
  const today = new Date();
  let nextDate;
  const dates = selectScheduleDates(state);

  for (let i = 0; i < dates.length; i++) {
    if (today < new Date(dates[i])) {
      nextDate = dates[i];
      break;
    }
  }
  return nextDate;
}
export function selectScheduleLoading(state: State) { return state.schedule.loading; }
export function selectScheduleLoaded(state: State) { return state.schedule.loaded; }
export function selectScheduleFilter(state: State) { return state.schedule.filter; }
