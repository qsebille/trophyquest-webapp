export interface ObtainedTrophy {
  id: string;
  trophyTitle: string;
  trophyType: 'bronze' | 'silver' | 'gold' | 'platinum';
  trophyDescription: string;
  trophyIconUrl: string;
  gameTitle: string;
  playerId: string;
  playerPseudo: string;
  playerAvatarUrl: string;
  obtainedDate: string;
}
