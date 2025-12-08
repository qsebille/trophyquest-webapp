import {TrophyCount} from './trophy-count';

export interface Collection {
  id: string;
  title: string;
  platform: string;
  imageUrl: string;
  gameId: string;
  gameTitle: string;
  gameImageUrl: string;
  trophyCount: TrophyCount;
}
