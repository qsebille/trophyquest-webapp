import {TrophyCount} from './trophy-count';

export interface PlayerCollection {
  collectionId: string;
  collectionTitle: string;
  collectionPlatform: string;
  collectionImageUrl: string;
  gameId: string;
  gameTitle: string;
  gameImageUrl: string;
  collectionTrophies: TrophyCount;
  earnedTrophies: TrophyCount;
}
