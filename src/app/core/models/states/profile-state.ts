import {User} from '../dto/user';
import {TrophyCount} from '../dto/trophy-count';
import {UserGame} from '../dto/user-game';
import {Trophy} from '../dto/trophy';

export interface ProfileState {
  user?: User;
  trophyCount: TrophyCount;
  gameList: UserGame[];
  trophyList: Trophy[];
}
