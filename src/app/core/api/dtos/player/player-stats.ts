export interface PlayerStats {
    totalTrophySetsPlayed: number;
    totalPlatinumTrophies: number;
    totalGoldTrophies: number;
    totalSilverTrophies: number;
    totalBronzeTrophies: number;
}

export const EMPTY_PLAYER_STATS: PlayerStats = {
    totalTrophySetsPlayed: 0,
    totalPlatinumTrophies: 0,
    totalGoldTrophies: 0,
    totalSilverTrophies: 0,
    totalBronzeTrophies: 0,
};