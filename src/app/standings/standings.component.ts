import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Team } from '../teams/team.model';
import { TeamTools } from '../shared/utility/team-tools';

import { map, isEmpty, groupBy, each, filter, flatMap } from 'lodash';
import { StandingsSandboxService } from './standings-sandbox.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  public loading$: Observable<boolean> = this.sandbox.loading$;
  public stats$: Observable<any[]> = this.sandbox.stats$;
  public leagues: string[];
  public teams: Team[];
  public teamNames: any;
  public teamsByLeagues: any;
  public statsGroupedByLeague;

  @ViewChild('streakTpl') streakTpl: TemplateRef<any>;
  @ViewChild('toFixedTpl') toFixedTpl: TemplateRef<any>;
  @ViewChild('toFixedPctTpl') toFixedPctTpl: TemplateRef<any>;
  @ViewChild('posNegTpl') posNegTpl: TemplateRef<any>;

  // Datatable
  columns: any[] = [];
  rows: any = {};

  constructor(public sandbox: StandingsSandboxService) { }

  ngOnInit() {
    this.sandbox.generateStandings();

    this.stats$.subscribe(stats => {
      if (!isEmpty(stats)) {
        this.teams = map(stats, stat => stat.team);
        this.leagues = Object.keys(groupBy(this.teams, (team) => team.league));
        this.statsGroupedByLeague = groupBy(stats, (stat) => stat.team.league);

        this.leagues.forEach(league => {
          const c = this.statsGroupedByLeague[league];
          console.log(Object.keys(groupBy(c, (stat) => stat.winPercentage)).sort());
        });
      }
    });

    // Build column definitions
    this.columns = [
      {
        name: 'Team',
        prop: 'team.name',
        width: 185,
        maxWidth: 400
      },
      {
        name: 'W',
        prop: 'wins.length',
        resizeable: false,
        width: 45,
      },
      {
        name: 'L',
        prop: 'losses.length',
        resizeable: false,
        width: 40,
      },
      {
        name: 'T',
        prop: 'ties.length',
        resizeable: false,
        width: 40,
      },
      {
        name: 'GP',
        prop: 'gamesPlayed.length',
        resizeable: false,
        width: 51,
      },
      {
        name: 'PCT',
        prop: 'winPercentage',
        resizeable: false,
        width: 60,
        cellTemplate: this.toFixedPctTpl
      },
      {
        name: 'STRK',
        prop: 'streak',
        resizeable: false,
        width: 80,
        cellTemplate: this.streakTpl
      },
      {
        name: 'RS',
        prop: 'runsScored',
        resizeable: false,
        width: 50,
      },
      {
        name: 'RA',
        prop: 'runsAllowed',
        resizeable: false,
        width: 50,
      },
      {
        name: 'DIFF',
        prop: 'runDifferential',
        resizeable: false,
        width: 60,
        cellTemplate: this.posNegTpl
      },
      {
        name: 'ARS',
        prop: 'averageRunsScored',
        resizeable: false,
        width: 60,
        cellTemplate: this.toFixedTpl
      },
      {
        name: 'ARA',
        prop: 'averageRunsAllowed',
        resizeable: false,
        width: 60,
        cellTemplate: this.toFixedTpl
      },
      {
        name: 'SOS',
        prop: 'strengthOfSchedule',
        resizeable: false,
        width: 70,
        maxWidth: 140,
        canAutoResize: true,
        cellTemplate: this.toFixedPctTpl
      },
    ];
  }

  public abs(value) {
    return Math.abs(value);
  }
}
