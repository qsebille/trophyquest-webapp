export interface TrophySet {
    id: string,
    title: string,
    platform: string,
    image: string
}

export const EMPTY_TROPHY_SET: TrophySet = {id: '', title: '', platform: '', image: ''};