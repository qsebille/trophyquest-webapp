export interface PlayedTrophySetSearchElement {
    id: string;
    title: string;
    platform: string;
    image: string;
    lastPlayedAt: Date;
    totalTrophies: number;
    totalEarnedPlatinum: number;
    totalEarnedGold: number;
    totalEarnedSilver: number;
    totalEarnedBronze: number;
}