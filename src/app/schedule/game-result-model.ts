import { Team } from '../teams/team.model';

export type ResultTypes = 'home' | 'away' | 'tie';

export class GameResult {
  public home: Team;
  public away: Team;
  public homeScore: number;
  public awayScore: number;

  constructor(result) {
    this.home = result ? result.home : undefined;
    this.homeScore = result ? +result.homeScore : undefined;
    this.away = result ? result.away : undefined;
    this.awayScore = result ? +result.awayScore : undefined;
  }

  winner(): ResultTypes {
    if (isNaN(this.homeScore) || isNaN(this.homeScore)) {
      return undefined;
    } else {
      if (this.homeScore > this.awayScore) {
        return 'home';
      } else if (this.homeScore === this.awayScore) {
        return 'tie';
      } else {
        return 'away';
      }
    }
  }

  toString(): string {
    let output = '';
    let first;
    let second;

    if (typeof this.winner() === 'undefined') {
      return output;
    }

    if (this.winner() === 'home') {
      first = { abbrev: this.home.abbreviation, score: this.homeScore };
      second = { abbrev: this.away.abbreviation, score: this.awayScore };
    } else {
      first = { abbrev: this.away.abbreviation, score: this.awayScore };
      second = { abbrev: this.home.abbreviation, score: this.homeScore };
    }

    output += first.abbrev + ' ' + first.score + ', ' + second.abbrev + ' ' + second.score;

    return output;
  }
}
