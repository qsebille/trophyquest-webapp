import {TrophyCount} from './trophy-count';

export interface GameSummary {
    id: string;
    title: string;
    platform: string;
    imageUrl: string;
    trophyCount: TrophyCount;
}
