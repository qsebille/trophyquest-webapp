export interface Trophy {
  id: string;
  trophyTitle: string;
  trophyDescription: string;
  trophyType: 'bronze' | 'silver' | 'gold' | 'platinum';
  isHidden: boolean;
  iconUrl: string;
  gameTitle: string;
  earnedDate: string;
}
