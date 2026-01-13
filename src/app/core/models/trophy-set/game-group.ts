import {EarnedTrophy} from "../../api/dtos/trophy/earned-trophy";

export interface GameGroup {
    groupName: string;
    trophies: EarnedTrophy[];
}
