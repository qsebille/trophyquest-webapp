import {TrophyCountPerType} from './trophy-count-per-type';

export interface PlayerGame {
    id: string;
    title: string;
    platform: string;
    imageUrl: string;
    totalTrophies: TrophyCountPerType;
    earnedTrophies: TrophyCountPerType;
}
