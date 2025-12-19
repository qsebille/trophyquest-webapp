import {Player} from './player';
import {TrophyCountPerType} from './trophy-count-per-type';

export interface PlayerSummary {
    player: Player;
    trophyCount: TrophyCountPerType;
    totalGamesPlayed: number;
    lastPlayedGameId: string;
    lastPlayedGameTitle: string;
    lastPlayedGameImageUrl: string;
}
