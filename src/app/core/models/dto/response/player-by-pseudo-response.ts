import {Player} from "../player";

export interface PlayerByPseudoResponse {
    status: 'FOUND' | 'NOT_FOUND';
    player: Player | null;
}