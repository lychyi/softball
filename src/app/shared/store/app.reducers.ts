import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import * as fromTeams from './reducers/teams.reducer';

export interface State {
  teams: fromTeams.State;
}

export const reducers = {
  teams: fromTeams.reducer
};

// Selectors
export function selectTeams(state: State) {
  return state.teams.results;
}

export function selectTeamsLoading(state: State) {
  return state.teams.loading;
}
