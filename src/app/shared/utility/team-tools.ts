import { find, findAll, groupBy } from 'lodash';
import { Team, TeamMember } from '../../teams/team.model';

export class TeamTools {
  constructor(private teams: Team[]) { }

  public getTeamByName(name: string): Team {
    return find(this.teams, (team: Team) => {
      return team.name === name;
    });
  }

  public getTeamByCoach(name: string) {
    return find(this.teams, (team: Team) => {
      return team.coach === name;
    });
  }

  public getTeamByAbbreviation(abbrev: string) {
    return find(this.teams, (team: Team) => {
      return team.abbreviation === name;
    });
  }

  public getTeamByPlayer(name: string) {
    return find(this.teams, (team: Team) => {
      return find(team.roster, (player: TeamMember) => {
        return player.name === name;
      });
    });
  }

  public getTeamsByLeague(league: string): Team[] {
    return findAll(this.teams, (team: Team) => {
      return team.league === league;
    });
  }

  public getLeagues(): string[] {
    return Object.keys(this.getTeamsGroupedByLeague()).sort();
  }

  public getTeamsGroupedByLeague(): Team[] {
    return groupBy(this.teams, (team) => {
      return team.league;
    });
  }
}
