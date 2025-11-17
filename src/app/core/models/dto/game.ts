import {GameTrophySet} from './game-trophy-set';

export interface Game {
  gameId: string;
  gameName: string;
  imageUrl: string;
  trophySets: GameTrophySet[];
}
