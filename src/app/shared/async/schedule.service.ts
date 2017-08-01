import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';

import { FirebaseRestService } from './firebase-rest.service';
import { TeamsService } from './teams.service';
import { TeamTools } from '../utility/team-tools';

import { Game } from '../../schedule/game-model';
import { GameResult } from '../../schedule/game-result-model';

import { environment } from '../../../environments/environment';

@Injectable()
export class ScheduleService {

  constructor(private fb: FirebaseRestService, private ts: TeamsService) { }

  getSchedule(): Observable<any> {
    const schedule$ = this.fb.getEndpoint(environment.firebase.databaseURL, '/schedule.json')
      .map(res => res.json());
    const teams$ = this.ts.getTeams();

    // Build schedule
    return Observable.forkJoin([schedule$, teams$]).map(results => {
      const tt = new TeamTools(results[1]);
      const scheduleResults = results[0];

      const scheduleKeys = Object.keys(scheduleResults);
      const schedule = [];

      scheduleKeys.forEach(key => {
        const game = scheduleResults[key];
        schedule.push(new Game({
          home: tt.getTeamByName(game.home),
          away: tt.getTeamByName(game.away),
          datetime: new Date(game.date).setHours(game.time),
          location: game.field,
          result: new GameResult({
            home: tt.getTeamByName(game.home),
            homeScore: game.homeScore !== '' ? game.homeScore : undefined,
            away: tt.getTeamByName(game.away),
            awayScore: game.awayScore !== '' ? game.awayScore : undefined
          })
        }));
      });

      return schedule;
    });
  }
}
