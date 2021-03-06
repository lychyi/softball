import * as actions from '../actions/teams.actions';
import { Team } from '../../../teams/team.model';

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  results: Team[];
}

const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  failed: false,
  results: []
};

export function reducer(state = INITIAL_STATE, action: actions.Actions): State {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case actions.ActionTypes.LOAD: {
      return {
        ...state,
        loading: true
      };
    }
    case actions.ActionTypes.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        failed: false,
        results: action.payload
      };
    }

    case actions.ActionTypes.LOAD_FAILED: {
      return {
        ...state,
        loaded: false,
        loading: false,
        failed: true,
        results: []
      };
    }
    default: {
      return state;
    }
  }
}

