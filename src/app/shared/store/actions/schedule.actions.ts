import { Action } from '@ngrx/store';

import { Game } from '../../../schedule/game-model';

import { type } from '../../utility/utility.helpers';

export const ActionTypes = {
  LOAD: type('[Schedule] Load'),
  LOAD_SUCCESS: type('[Schedule] Load Success'),
  LOAD_FAILED: type('[Schedule] Load Failed'),
  FILTER: type('[Schedule] Filter')
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

export class FilterScheduleAction implements Action {
  readonly type = ActionTypes.FILTER;

  constructor(public payload: string = '') { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | FilterScheduleAction;
