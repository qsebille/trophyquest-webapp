import {TrophyCount} from './trophy-count';
import {TrophyCollection} from './trophy-collection';

export interface UserGame {
  id: string;
  title: string;
  imageUrl: string;
  earnedTrophies: TrophyCount;
  totalTrophies: TrophyCount;
  trophyCollections: TrophyCollection[];
}
