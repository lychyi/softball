import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

import { Team } from '../../teams/team.model';

@Injectable()
export class TeamsService {

  constructor(private http: Http) { }

  getTeams(): Observable<any> {
    return this.http.get(environment.firebase.databaseURL + '/teams2.json');
  }
}
