import { Action } from '@ngrx/store';
import { Team } from '../../../teams/team.model';

import { type } from '../../utility/utility.helpers';

export const ActionTypes = {
  LOADING: type('[Home] LoadING home page'),
  LOADED: type('[Home] Home page loaded'),
  SET_TEAM: type('[Home] Set team'),
};

export class LoadingAction implements Action {
  readonly type = ActionTypes.LOADING;

  constructor(public payload: any = null) { }
}

export class LoadedAction implements Action {
  readonly type = ActionTypes.LOADED;

  constructor(public payload: any = null) { }
}

export class SetTeamAction implements Action {
  readonly type = ActionTypes.SET_TEAM;

  constructor(public payload: Team = null) { }
}

export type Actions
  = LoadingAction
  | LoadedAction
  | SetTeamAction;
