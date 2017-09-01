import * as homeActions from '../actions/home.actions';
import { Team } from '../../../teams/team.model';

export interface State {
  loaded: boolean;
  loading: boolean;
  stats: any[];
  defaultTeam: Team;
}

const INITIAL_STATE = {
  loaded: false,
  loading: false,
  stats: [],
  defaultTeam: null
};

export function reducer(state: State = INITIAL_STATE, action: homeActions.Actions): State {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case homeActions.ActionTypes.LOADING: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case homeActions.ActionTypes.LOADED: {
      return {
        ...state,
        loading: false,
        loaded: true,
        stats: action.payload
      };
    }
    case homeActions.ActionTypes.SET_TEAM: {
      return {
        ...state,
        defaultTeam: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
