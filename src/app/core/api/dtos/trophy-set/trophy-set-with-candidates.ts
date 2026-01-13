import {TrophySet} from "./trophy-set";
import {IgdbCandidate} from "../candidate/igdb-candidate";

export interface TrophySetWithCandidates {
    trophySet: TrophySet,
    mappingCandidates: IgdbCandidate[]
}