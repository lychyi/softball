import { Action } from '@ngrx/store';

import { Team } from '../../../teams/team.model';
import { type } from '../../utility/utility.helpers';

export const ActionTypes = {
  LOAD: type('[Teams] Load'),
  LOAD_SUCCESS: type('[Teams] Load Success'),
  LOAD_FAILED: type('[Teams] Load Failed')
};

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: any = null) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Array<Team>) { }
}

export class LoadFailAction implements Action {
  readonly type = ActionTypes.LOAD_FAILED;

  constructor(public payload: any = null) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction;
