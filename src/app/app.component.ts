import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <md-toolbar>
      <a md-button routerLink="home"><md-icon color="primary">home</md-icon></a>
      <a md-button routerLink="schedule"><md-icon color="primary">event</md-icon></a>
      <a md-button routerLink="standings"><md-icon color="primary">import_export</md-icon></a>
      <a md-button routerLink="teams"><md-icon color="primary">people</md-icon></a>
    </md-toolbar>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.scrollTop = 0;
    });
  }
}
