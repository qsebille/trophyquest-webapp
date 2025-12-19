import {Player} from './player';
import {TrophyCount} from './trophy-count';

export interface PlayerSummary {
    player: Player;
    trophyCount: TrophyCount;
    totalGamesPlayed: number;
    lastPlayedGameId: string;
    lastPlayedGameTitle: string;
    lastPlayedGameImageUrl: string;
}
