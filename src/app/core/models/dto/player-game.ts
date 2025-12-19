import {TrophyCount} from './trophy-count';

export interface PlayerGame {
    id: string;
    title: string;
    platform: string;
    imageUrl: string;
    totalTrophies: TrophyCount;
    earnedTrophies: TrophyCount;
}
