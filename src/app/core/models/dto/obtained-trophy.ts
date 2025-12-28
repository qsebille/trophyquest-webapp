export interface ObtainedTrophy {
    id: string;
    trophyTitle: string;
    trophyType: 'bronze' | 'silver' | 'gold' | 'platinum';
    trophyDescription: string;
    trophyIconUrl: string;
    gameId: string;
    gameTitle: string;
    obtainedDate: string;
}
