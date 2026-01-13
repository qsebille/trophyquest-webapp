import {Player} from "./player";
import {EarnedTrophy} from "../trophy/earned-trophy";

export interface RecentPlayerTrophies {
    player: Player;
    recentTrophyCount: number;
    lastTrophies: EarnedTrophy[];
}