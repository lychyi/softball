import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Path components
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { StandingsComponent } from './standings/standings.component';
import { TeamsComponent } from './teams/teams.component';

// Resolvers
import { TeamsResolver } from './teams/teams-resolver';

const appRoutes: Routes = [
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'schedule',
    component: ScheduleComponent,
    resolve: {
      teams: TeamsResolver
    }
  },
  { path: 'standings', component: StandingsComponent },
  { path: 'teams', component: TeamsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: [
    TeamsResolver
  ]
})

export class AppRoutingModule { }
