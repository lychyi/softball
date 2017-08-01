import { findIndex } from 'lodash';
import { Team, TeamMember } from '../../teams/team.model';

export class TeamTools {
  constructor(private teams: Team[]) { }

  public getTeamByName(name: string): Team {
    const index = findIndex(this.teams, (team) => {
      return team.name === name;
    });

    return this.teams[index];
  }

  public getTeamByCoach(name: string) { }
  public getTeamByAbbreviation(abbrev: string) { }
  public getTeamByPlayer(name: string) { }
}
