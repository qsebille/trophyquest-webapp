import {Component, Input} from '@angular/core';
import {Collection} from '../../core/models/dto/collection';
import {TrophyCountDisplayer} from "../trophy-count-displayer/trophy-count-displayer";
import {TrophyCount} from "../../core/models/dto/trophy-count";

@Component({
    selector: 'app-collection-summary',
    imports: [
        TrophyCountDisplayer
    ],
    templateUrl: './collection-summary.component.html',
    styleUrl: './collection-summary.component.scss',
})
export class CollectionSummaryComponent {
    @Input({required: true}) collection: Collection | null = null;

    get trophyCount(): TrophyCount {
        return this.collection?.trophyCount ?? {platinum: 0, gold: 0, silver: 0, bronze: 0};
    }
}
