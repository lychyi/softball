import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import * as moment from 'moment';
import { groupBy } from 'lodash';

import { TeamTools } from '../utility/team-tools';

import * as fromTeams from './reducers/teams.reducer';
import * as fromSchedule from './reducers/schedule.reducer';
import * as fromStandings from './reducers/standings.reducer';
import * as fromHome from './reducers/home.reducer';

export interface State {
  teams: fromTeams.State;
  schedule: fromSchedule.State;
  standings: fromStandings.State;
  home: fromHome.State;
}

export const reducers = {
  teams: fromTeams.reducer,
  schedule: fromSchedule.reducer,
  standings: fromStandings.reducer,
  home: fromHome.reducer,
};

// [Teams] selectors
export function selectTeams(state: State) { return state.teams.results; }
export function selectTeamsGroupedByLeague(state: State) {
  const tt = new TeamTools(state.teams.results); // should probably be singleton
  return tt.getTeamsGroupedByLeague();
}
export function selectTeamLeagues(state: State) {
  const tt = new TeamTools(state.teams.results); // should probably be singleton
  return tt.getLeagues();
}
export function selectTeamsLoading(state: State) { return state.teams.loading; }
export function selectTeamsLoaded(state: State) { return state.teams.loaded; }

// [Schedule] selectors
export function selectSchedule(state: State) { return state.schedule.results; }
export function selectScheduleLoading(state: State) { return state.schedule.loading; }
export function selectScheduleLoaded(state: State) { return state.schedule.loaded; }
export function selectScheduleFilterTerm(state: State) { return state.schedule.filterTerm; }
export function selectScheduleFiltered(state: State) {
  if (state.schedule.filterTerm === '') { return state.schedule.results; }
  return state.schedule.results.filter(game => {
    return game.home.name === state.schedule.filterTerm
      || game.away.name === state.schedule.filterTerm;
  });
}

// [Standings] selectors
export function selectStandingsLoaded(state: State) { return state.standings.loaded; }
export function selectStandingsLoading(state: State) { return state.standings.loading; }
export function selectStandingsStats(state: State) { return state.standings.stats; }

// [Home] selectors
export function selectHomeLoading(state: State) { return state.home.loading; }
export function selectHomeLoaded(state: State) { return state.home.loaded; }
export function selectHomeTeam(state: State) { return state.home.defaultTeam; }
