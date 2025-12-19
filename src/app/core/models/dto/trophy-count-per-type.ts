export interface TrophyCountPerType {
    platinum: number;
    gold: number;
    silver: number;
    bronze: number;
}

export function getTotalTrophies(trophyCountPerType: TrophyCountPerType): number {
    return trophyCountPerType.platinum + trophyCountPerType.gold + trophyCountPerType.silver + trophyCountPerType.bronze;
}

export const EMPTY_TROPHY_COUNT_PER_TYPE: TrophyCountPerType = {platinum: 0, gold: 0, silver: 0, bronze: 0}