export class Team {
  public id: number;
  public coach: string;
  public name: string;
  public color: string;
  public league: string;
  public abbreviation: string;
  public roster: TeamMember[];

  constructor(team: Team = null) {
    this.id = team ? team.id : null;
    this.coach = team ? team.coach : '';
    this.name = team ? team.name : '';
    this.color = team ? team.color : '';
    this.league = team ? team.league : '';
    this.abbreviation = team ? team.abbreviation : '';
    this.roster = team ? team.roster : [];
  }
}

export class TeamMember {
  public name: string;

  constructor(name: string) {
    this.name = name ? name : '';
  }
}
