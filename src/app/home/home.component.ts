import { Component, OnInit } from '@angular/core';

import { HomeSandbox } from './home.sandbox';

import { TeamsService } from '../shared/async/teams.service';
import { Team, TeamMember } from '../teams/team.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public teams$;

  constructor(public HomeSandbox: HomeSandbox) { }

  ngOnInit() {}
}
