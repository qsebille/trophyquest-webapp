import {TrophyCountPerType} from './trophy-count-per-type';

export interface GameSummary {
    id: string;
    title: string;
    platform: string;
    imageUrl: string;
    trophyCount: TrophyCountPerType;
}
