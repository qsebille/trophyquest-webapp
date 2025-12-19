import {Trophy} from '../dto/trophy';
import {SearchState} from './search-state';
import {Player} from '../dto/player';
import {TrophyCount} from '../dto/trophy-count';
import {PlayerGame} from '../dto/player-game';

export interface ProfileState {
    player: Player;
    games: SearchState<PlayerGame>;
    trophies: SearchState<Trophy>;
    gameCount: number;
    trophyCount: TrophyCount;
}
