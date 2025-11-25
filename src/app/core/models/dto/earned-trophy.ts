export interface EarnedTrophy {
  id: string;
  trophyTitle: string;
  trophyDescription: string;
  trophyType: 'bronze' | 'silver' | 'gold' | 'platinum';
  iconUrl: string;
  gameTitle: string;
  earnedDate: string;
}
