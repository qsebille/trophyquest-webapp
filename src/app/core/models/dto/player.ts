export interface Player {
    id: string;
    pseudo: string;
    avatarUrl: string;
}

export const EMPTY_PLAYER: Player = {id: '', pseudo: '', avatarUrl: ''};
