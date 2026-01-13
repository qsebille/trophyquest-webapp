export interface PlayerSearchItem {
    id: string;
    pseudo: string;
    avatar: string;
    lastPlayedTrophySetId: string;
    lastPlayedTrophySetTitle: string;
    lastPlayedTrophySetPlatform: string;
    lastPlayedTrophySetImage: string;
    lastPlayedTrophySetDate: Date;
    lastEarnedTrophyId: string;
    lastEarnedTrophyTitle: string;
    lastEarnedTrophyType: string;
    lastEarnedTrophyIcon: string;
    lastEarnedTrophyTrophySetId: string;
    lastEarnedTrophyTrophySetTitle: string;
    lastEarnedTrophyDate: Date;
    totalPlayedTrophySets: number;
    totalEarnedPlatinum: number;
    totalEarnedGold: number;
    totalEarnedSilver: number;
    totalEarnedBronze: number;
}
