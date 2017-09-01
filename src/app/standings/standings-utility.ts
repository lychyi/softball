import { Game } from '../schedule/game-model';
import { GameResult } from '../schedule/game-result-model';
import { Team } from '../teams/team.model';

import { Observable } from 'rxjs/Rx';
import { groupBy, uniq, flatMap, isEmpty } from 'lodash';

export class StatsCache {
  // Metadata
  public team: Team;

  // Derived from schedule
  public wins: Game[] = [];
  public divisionWins: Game[] = [];
  public losses: Game[] = [];
  public divisionLosses: Game[] = [];
  public ties: Game[] = [];
  public divisionTies: Game[] = [];
  public gamesPlayed: Game[] = [];
  public runsScored = 0;
  public runsAllowed = 0;
  public headToHeadWinsAgainst: string[] = [];
  public headToHeadLossesTo: string[] = [];
  public opponents: string[] = [];

  // Calculated Stats
  public winPercentage: number;
  public streak: number;
  public runDifferential: number;
  public averageRunsScored: number;
  public averageRunsAllowed: number;
  public opponentsRecord: number;
  public opponentsOpponentsRecord: number;
  public strengthOfSchedule: number;
}
export class StandingsUtility {
  public teamNames: string[];
  public teamSchedules;
  public teams: Team[];

  public stats;

  constructor(private schedule: Game[]) {
    // Initialize
    this.teams = uniq(flatMap(schedule, game => [game.home, game.away]));
    this.teamNames = flatMap(this.teams, team => team.name);
    this.stats = {};

    // Create a schedule for each team
    // i.e. (k: teamName, v: Game[])
    this.teams.forEach(team => {
      // Create cache for each team
      this.stats[team.name] = new StatsCache;
      this.stats[team.name].team = team;
    });

    this.build();
  }

  private build() {
    this.calculateRecords();
    this.teamNames.forEach(name => {
      this.calcluateStreak(name);
      this.calculateRunDifferential(name);
      this.calculateWinPercentage(name);
      this.calculateAverageRunsScored(name);
      this.calculateAverageRunsAllowed(name);
    });

    // SOS requires all calculations to be complete
    this.calculateStrengthOfSchedule();
  }

  private calculateRecords(): void {
    if (isEmpty(this.schedule)) {
      return;
    }
    this.schedule.forEach(game => {
      const winner = game.result.winner();
      const homeName = game.home.name;
      const homeCache = this.stats[homeName];
      const awayName = game.away.name;
      const awayCache = this.stats[awayName];

      // Only calculate games that have been played (aka have a score in the result)
      if (!isNaN(game.result.homeScore) || !isNaN(game.result.awayScore)) {
        // Derived from schedule (push to default values of empty or 0)
        // Values agnostic from W/L
        homeCache.gamesPlayed.push(game);
        awayCache.gamesPlayed.push(game);
        homeCache.runsScored += game.result.homeScore;
        awayCache.runsScored += game.result.awayScore;
        homeCache.runsAllowed += game.result.awayScore;
        awayCache.runsAllowed += game.result.homeScore;
        homeCache.opponents.push(game.away.name);
        awayCache.opponents.push(game.home.name);

        // W/L specific values
        if (winner === 'home') {
          homeCache.wins.push(game);
          awayCache.losses.push(game);
          if (!game.result.isInterleague()) {
            homeCache.divisionWins.push(game);
            awayCache.divisionLosses.push(game);
          }
          homeCache.headToHeadWinsAgainst.push(game.away.name);
          awayCache.headToHeadLossesTo.push(game.home.name);
        }
        if (winner === 'away') {
          awayCache.wins.push(game);
          homeCache.losses.push(game);
          if (!game.result.isInterleague()) {
            awayCache.divisionWins.push(game);
            homeCache.divisionLosses.push(game);
          }
          awayCache.headToHeadWinsAgainst.push(game.home.name);
          homeCache.headToHeadLossesTo.push(game.away.name);
        }
        if (winner === 'tie') {
          homeCache.ties.push(game);
          awayCache.ties.push(game);
          if (!game.result.isInterleague()) {
            awayCache.divisionTies.push(game);
            homeCache.divisionTies.push(game);
          }
        }
        // Everything else is calculated

      }
    });
  }

  private calculateWinPercentage(teamName) {
    const cache = this.stats[teamName];

    // Return cached value, otherwise 'undefined' indicates that it has never been calculated before in this instance
    if (typeof cache.winPercentage !== 'undefined') { return cache.winPercentage; }

    const denominator = cache.gamesPlayed.length;
    const numerator = cache.wins.length + (cache.ties.length * 0.5);

    cache.winPercentage = (numerator / denominator);
  }

  // Returns either n or -n (win streak count or losing streak count)
  private calcluateStreak(teamName) {
    const cache = this.stats[teamName];
    let streak = 0;
    // Return cached value, otherwise 'undefined' indicates that it has never been calculated before in this instance
    if (typeof cache.streak !== 'undefined') { return cache.streak; }

    // Break down wins and losses by datetime and W or L (we ignore ties)
    // Datetime allows us to sort the games played
    const wins = cache.wins.map(game => ({date: game.datetime, result: 'W'}));
    const losses = cache.losses.map(game => ({ date: game.datetime, result: 'L' }));

    // Sort desc (most recent first)
    const gameResults = wins.concat(losses).sort((a, b) => {
      return b.date > a.date;
    }).map(game => game.result);

    // Now by iterating through the games (most recent first)
    // we can calculate the appropriate streak, breaking when we get a
    // change in game outcomes
    for (let i = 0; i < gameResults.length; i++) {
      gameResults[i] === 'W' ? streak++ : streak--;

      if (i === gameResults.length) { break; }

      if (gameResults[i] !== gameResults[i + 1]) {
        // We had a change in outcomes so the streak is just this current
        // iteration's game outcome
        break;
      }
    }

    cache.streak = streak;
  }

  private calculateRunDifferential(teamName) {
    const cache = this.stats[teamName];

    // Return cached value, otherwise 'undefined' indicates that it has never been calculated before in this instance
    if (typeof cache.runDifferential !== 'undefined') { return cache.runDifferential; }

    this.stats[teamName].runDifferential = cache.runsScored - cache.runsAllowed;
  }

  private calculateAverageRunsScored(teamName) {
    const cache = this.stats[teamName];

    // Return cached value, otherwise 'undefined' indicates that it has never been calculated before in this instance
    if (typeof cache.averageRunsScored !== 'undefined') { return cache.averageRunsScored; }

    cache.averageRunsScored = cache.runsScored / cache.gamesPlayed.length;
  }

  private calculateAverageRunsAllowed(teamName) {
    const cache = this.stats[teamName];

    // Return cached value, otherwise 'undefined' indicates that it has never been calculated before in this instance
    if (typeof cache.averageRunsAllowed !== 'undefined') { return cache.averageRunsAllowed; }

    cache.averageRunsAllowed = cache.runsAllowed / cache.gamesPlayed.length;
  }

  private calculateStrengthOfSchedule() {
    /**
     * Strength of Schedule is calculated by the BCS (Bowl Championship Series)
     * via the following formula:
     * [2(OR) + (OOR)] / 3
     * where
     * OR = Opponents' Record
     * OOR = Opponents' OR
     */

    if (typeof this.teamNames === 'undefined') {
      return;
    }

    this.teamNames.forEach(name => {
      this.stats[name].opponentsRecord = this.stats[name].opponents.map(opp => {
        return this.stats[opp].winPercentage;
      }).reduce((a, b) => a + b) / this.stats[name].opponents.length;
    });

    this.teamNames.forEach(name => {
      this.stats[name].opponentsOpponentsRecord = this.stats[name].opponents.map(opp => {
        return this.stats[opp].opponentsRecord;
      }).reduce((a, b) => a + b) / this.stats[name].opponents.length;
    });

    this.teamNames.forEach(name => {
      this.stats[name].strengthOfSchedule =
        ((2 * this.stats[name].opponentsRecord) + this.stats[name].opponentsOpponentsRecord) / 3;
    });
  }

}
