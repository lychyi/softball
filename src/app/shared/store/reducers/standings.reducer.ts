import * as standingsActions from '../actions/standings.actions';

export interface State {
  loaded: boolean;
  loading: boolean;
  stats: any[];
}

const INITIAL_STATE = {
  loaded: false,
  loading: true,
  stats: []
};

export function reducer(state: State = INITIAL_STATE, action: standingsActions.Actions): State {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case standingsActions.ActionTypes.LOADED: {
      return {
        ...state,
        loading: false,
        loaded: true,
        stats: action.payload
      };
    }
    case standingsActions.ActionTypes.GENERATE: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    default: {
      return state;
    }
  }
}
