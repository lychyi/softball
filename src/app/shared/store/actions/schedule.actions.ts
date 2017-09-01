import { Action } from '@ngrx/store';

import { Game } from '../../../schedule/game-model';

import { type } from '../../utility/utility.helpers';

export const ActionTypes = {
  LOAD: type('[Schedule] Load'),
  LOAD_SUCCESS: type('[Schedule] Load Success'),
  LOAD_FAILED: type('[Schedule] Load Failed'),
  SET_FILTER_TERM: type('[Schedule] Set Filter Term'),
  SET_FILTER_RESULTS: type('[Schedule] Set Filtered Results')
};

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: any = null) { }
}
export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Game[]) { }
}
export class LoadFailAction implements Action {
  readonly type = ActionTypes.LOAD_FAILED;

  constructor(public payload: any = null) { }
}

export class SetFilterTermAction implements Action {
  readonly type = ActionTypes.SET_FILTER_TERM;

  constructor(public payload: string = '') { }
}

export class SetFilterResultsAction implements Action {
  readonly type = ActionTypes.SET_FILTER_TERM;

  constructor(public payload: Game[]) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | SetFilterTermAction;
