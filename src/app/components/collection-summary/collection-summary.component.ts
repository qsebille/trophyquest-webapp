import {Component, input} from '@angular/core';
import {Collection} from '../../core/models/dto/collection';
import {TrophyCountDisplayerComponent} from "../trophy-count-displayer/trophy-count-displayer.component";
import {TrophyCount} from "../../core/models/dto/trophy-count";

@Component({
    selector: 'app-collection-summary',
    imports: [
        TrophyCountDisplayerComponent
    ],
    templateUrl: './collection-summary.component.html',
    styleUrl: './collection-summary.component.scss',
})
export class CollectionSummaryComponent {
    readonly collection = input<Collection | null>(null);

    get trophyCount(): TrophyCount {
        return this.collection()?.trophyCount ?? {platinum: 0, gold: 0, silver: 0, bronze: 0};
    }
}
