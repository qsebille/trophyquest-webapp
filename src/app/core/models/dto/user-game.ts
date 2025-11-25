import {TrophyCount} from './trophy-count';

export interface UserGame {
  id: string;
  title: string;
  imageUrl: string;
  earnedTrophies: TrophyCount;
  totalTrophies: TrophyCount;
}
