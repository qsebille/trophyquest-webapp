import {Player} from '../dto/player';
import {TrophyCount} from '../dto/trophy-count';
import {PlayerGameAchievements} from '../dto/player-game-achievements';
import {Trophy} from '../dto/trophy';
import {SearchState} from './search-state';

export interface ProfileState {
  playerId: string;
  player?: Player;
  games: SearchState<PlayerGameAchievements>;
  trophies: SearchState<Trophy>;
  trophyCount: TrophyCount;
}
