import { TeamsEffects } from './effects/teams-effects.service';
import { ScheduleEffects } from './effects/schedule-effects.service';
import { StandingsEffects } from './effects/standings-effects.service';

export const effects = [
  TeamsEffects,
  ScheduleEffects,
  StandingsEffects
];
