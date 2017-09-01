import { Component, OnInit } from '@angular/core';

import { HomeSandbox } from './home.sandbox';

import { Team, TeamMember } from '../teams/team.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loading$ = this.sandbox.loading$;
  public loaded$ = this.sandbox.loaded$;
  public team$ = this.sandbox.defaultTeam$;
  public teams$ = this.sandbox.teamsList$;

  constructor(public sandbox: HomeSandbox) { }

  ngOnInit() {
    this.sandbox.loadHome();
  }

  setTeam(name) {
    this.sandbox.setTeam(name);
  }
}
