import {User} from '../dto/user';
import {TrophyCount} from '../dto/trophy-count';
import {UserGame} from '../dto/user-game';
import {Trophy} from '../dto/trophy';
import {SearchState} from './search-state';

export interface ProfileState {
  userProfileId: string;
  user?: User;
  games: SearchState<UserGame>;
  trophies: SearchState<Trophy>;
  trophyCount: TrophyCount;
}
