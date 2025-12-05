import {TrophyCount} from './trophy-count';
import {TrophyCollection} from './trophy-collection';

export interface PlayerGameAchievements {
  id: string;
  title: string;
  imageUrl: string;
  earnedTrophies: TrophyCount;
  totalTrophies: TrophyCount;
  trophyCollections: TrophyCollection[];
}
