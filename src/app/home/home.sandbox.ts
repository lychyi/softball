import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as store from '../shared/store/app.reducers';
import { Sandbox } from '../shared/sandbox/base.sandbox';

@Injectable()
export class HomeSandbox extends Sandbox {
  public teamName: String = 'GoldSchluggers';
  public teamColor: String = 'yellow';
  public league: String = 'Stripes';

  public currentStanding: Number = 1;

  constructor(protected appState$: Store<store.State>) { super(appState$); }
}
