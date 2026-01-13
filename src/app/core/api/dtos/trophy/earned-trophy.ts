export interface EarnedTrophy {
    id: string;
    rank: number;
    title: string;
    description: string;
    trophyType: 'bronze' | 'silver' | 'gold' | 'platinum';
    isHidden: boolean;
    icon: string;
    gameGroupId: string;
    trophySetId: string;
    trophySetTitle: string;
    earnedAt: Date;
}