import {IgdbGame} from "./igdb-game";

export interface TrophySet {
    id: string;
    title: string;
    platform: string;
    imageUrl: string;
    igdbGameCandidates?: IgdbGame[];
}

export const DEFAULT_TROPHY_SET = {
    id: '',
    title: '',
    platform: '',
    imageUrl: '',
}