import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MdCard } from '@angular/material';

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
  public schedule$: Observable<Game[]> = this.sandbox.schedule$;
  public scheduleDates$: Observable<any> = this.sandbox.scheduleDates$;
  public scheduleGroupByDates$: Observable<any> = this.sandbox.scheduleGroupByDates$;
  public scheduleLoading$: Observable<Boolean> = this.sandbox.scheduleLoading$;
  public scheduleLoaded$: Observable<Boolean> = this.sandbox.scheduleLoaded$;
  public filter$: Observable<String> = this.sandbox.filter$;
  public teams$: Observable<Team[]> = this.teamsSandbox.teams$;
  public nextGameDate$: Observable<string> = this.sandbox.nextGameDate$;

  public teamFilterFormGroup: FormGroup;

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
    // get rid of other sandboxes here, sandboxes should communicate in sandboxes
    this.teamsSandbox.loadTeams();

    // Initialize new form group
    this.teamFilterFormGroup = new FormGroup({
      filter: new FormControl('')
    });

    this.filter$.subscribe(filter => {
      if (filter.length) {
        this.teamFilterFormGroup.patchValue({filter: filter});
        this.filterSchedule(filter);
      }
    });
  }

  public filterSchedule(name) {
    this.sandbox.filterSchedule(name);
  }

  public scrollTo(): void {
    this.nextGameDate$.subscribe(date => {
      console.log(date.replace(/\//g, '-'));
      const pageScrollInstance: PageScrollInstance =
        PageScrollInstance.newInstance({
          document: this.document,
          scrollTarget: '#' + date.replace(/\//g, '-')
        });
      this.pss.start(pageScrollInstance);
    });
  }
}
