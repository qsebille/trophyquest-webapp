import {Trophy} from '../dto/trophy';
import {SearchState} from './search-state';
import {Player} from '../dto/player';
import {TrophyCount} from '../dto/trophy-count';
import {PlayerCollection} from '../dto/player-collection';

export interface ProfileState {
  player: Player;
  collections: SearchState<PlayerCollection>;
  trophies: SearchState<Trophy>;
  gameCount: number;
  trophyCount: TrophyCount;
}
