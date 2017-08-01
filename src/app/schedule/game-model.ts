import { Team } from '../teams/team.model';
import { GameResult } from './game-result-model';

export class Game {
  public home: Team;
  public away: Team;
  public location: string;
  public datetime: Date;
  public result: GameResult;

  constructor(game) {
    this.home = game ? game.home : undefined;
    this.away = game ? game.away : undefined;
    this.location = game ? game.location : undefined;
    this.datetime = game ? game.datetime : undefined;
    this.result = game ? game.result : undefined;
  }
}
