import {User} from './user';
import {TrophyCount} from './trophy-count';
import {UserGame} from './user-game';
import {EarnedTrophy} from './earned-trophy';

export interface ProfileState {
  user?: User;
  trophyCount: TrophyCount;
  gameList: UserGame[];
  trophyList: EarnedTrophy[];
  error?: string;
}
