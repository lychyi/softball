import * as moment from 'moment';
import { groupBy } from 'lodash';

import * as actions from '../actions/schedule.actions';
import { Game } from '../../../schedule/game-model';

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  results: Game[];
  filter: string;
}

const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  failed: false,
  filter: '',
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
    case actions.ActionTypes.FILTER: {
      return {
        ...state,
        filter: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
