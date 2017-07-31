import { Store } from '@ngrx/store';
import * as store from '../store/app.reducers';

export abstract class Sandbox {
  constructor(protected appState$: Store<store.State>) {}
}
