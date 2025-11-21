import {User} from './user';
import {TrophyCount} from './trophy-count';
import {UserGame} from './user-game';

export interface ProfileState {
  user?: User;
  trophyCount: TrophyCount;
  gameList: UserGame[];
  error?: string;
}
