import {PlayerGameAchievements} from '../dto/player-game-achievements';
import {Trophy} from '../dto/trophy';
import {SearchState} from './search-state';
import {Player} from '../dto/player';
import {TrophyCount} from '../dto/trophy-count';

export interface ProfileState {
  player: Player;
  games: SearchState<PlayerGameAchievements>;
  trophies: SearchState<Trophy>;
  trophyCount: TrophyCount;
}
