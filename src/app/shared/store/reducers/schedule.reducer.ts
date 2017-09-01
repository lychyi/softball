import * as moment from 'moment';
import { groupBy } from 'lodash';

import * as actions from '../actions/schedule.actions';
import { Game } from '../../../schedule/game-model';

export interface State {
  loading: boolean;
  loaded: boolean;
  failed: boolean;
  results: Game[];
  originalResults: Game[];
  filterTerm: string;
}

const INITIAL_STATE: State = {
  loading: false,
  loaded: false,
  failed: false,
  filterTerm: '',
  results: [],
  originalResults: []
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
    case actions.ActionTypes.SET_FILTER_TERM: {
      return {
        ...state,
        filterTerm: action.payload
      };
    }
    case actions.ActionTypes.SET_FILTER_RESULTS: {
      return {
        ...state,
        results: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
