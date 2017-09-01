import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { groupBy } from 'lodash';
import * as moment from 'moment';

import { Observable } from 'rxjs/Rx';

import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ng2-page-scroll';

import { ScheduleSandboxService } from './schedule-sandbox.service';
import { TeamsService } from '../shared/async/teams.service';
import { TeamsSandboxService } from '../teams/teams-sandbox.service';

import { Team } from '../teams/team.model';
import { Game } from './game-model';
import { GameResult } from './game-result-model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScheduleComponent implements OnInit {
  public scheduleLoading$: Observable<Boolean> = this.sandbox.scheduleLoading$;
  public scheduleLoaded$: Observable<Boolean> = this.sandbox.scheduleLoaded$;
  public scheduleFiltered$: Observable<Game[]> = this.sandbox.scheduleFiltered$;
  public filterTerm$: Observable<String> = this.sandbox.filterTerm$;
  public teams$: Observable<Team[]> = this.teamsSandbox.teams$;

  public displaySchedule$: Observable<Game[]>;
  public displayScheduleDates$: Observable<string[]>;

  public teamFilterFormGroup: FormGroup;
  public nextGameDate: string;

  constructor(
    public route: ActivatedRoute,
    public sandbox: ScheduleSandboxService,
    public ts: TeamsService,
    public teamsSandbox: TeamsSandboxService,
    public pss: PageScrollService,
    @Inject(DOCUMENT) private document: any
  ) {
    PageScrollConfig.defaultScrollOffset = 12;
    PageScrollConfig.defaultDuration = 500;
    PageScrollConfig.defaultEasingLogic = {
      ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) {return b; }
        if (t === d) {return b + c; }
        if ((t /= d / 2) < 1) {return c / 2 * Math.pow(2, 10 * (t - 1)) + b; }
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    };
  }

  ngOnInit() {
    this.sandbox.loadSchedule();
    this.teamsSandbox.loadTeams();

    this.displaySchedule$ = this.scheduleFiltered$.map(schedule => {
      return groupBy(schedule, (game) => {
        return moment(game.datetime).format('M/DD/YY');
      });
    });

    this.displayScheduleDates$ = this.scheduleFiltered$.map(schedule => {
      const today = new Date();
      const dates = Object.keys(groupBy(schedule, (game) => {
        return moment(game.datetime).format('M/DD/YY');
      }));

      // Calculate the next date that a game is on
      for (let i = 0; i < dates.length; i++) {
        if (today < new Date(dates[i])) {
          this.nextGameDate = dates[i];
          break;
        }
      }
      return dates;
    });

    this.teamFilterFormGroup = new FormGroup({
      filter: new FormControl('')
    });

    // Keeps the filter select mechanism in sync with the state's filter term
    this.filterTerm$.subscribe(term => {
      if (term.length) {
        this.teamFilterFormGroup.patchValue({filter: term});
        this.sandbox.filterSchedule(term);
      }
    });
  }

  public scrollToNextDate(): void {
    const pageScrollInstance: PageScrollInstance =
      PageScrollInstance.newInstance({
        document: this.document,
        scrollTarget: '#' + this.nextGameDate.replace(/\//g, '-')
      });
    this.pss.start(pageScrollInstance);
  }
}
