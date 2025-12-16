import {Player} from "./player";
import {ObtainedTrophy} from "./obtained-trophy";

export interface RecentPlayerResponse {
    player: Player;
    recentTrophyCount: number;
    lastObtainedTrophies: ObtainedTrophy[]
}