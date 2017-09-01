import { Action } from '@ngrx/store';

import { type } from '../../utility/utility.helpers';

export const ActionTypes = {
  GENERATE: type('[Standings] Generate'),
  LOADED: type('[Standings] Loaded'),
};

export class GenerateAction implements Action {
  readonly type = ActionTypes.GENERATE;

  constructor(public payload: any = null) { }
}

export class LoadedAction implements Action {
  readonly type = ActionTypes.LOADED;

  constructor(public payload: any = {} ) { }
}

export type Actions
  = GenerateAction
  | LoadedAction;
