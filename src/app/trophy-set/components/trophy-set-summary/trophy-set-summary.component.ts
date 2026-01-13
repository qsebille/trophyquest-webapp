import {Component, computed, input} from '@angular/core';
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {
    TrophyCountDisplayerComponent
} from "../../../core/components/trophy-count-displayer/trophy-count-displayer.component";
import {TrophySet} from "../../../core/api/dtos/trophy-set/trophy-set";
import {EarnedTrophy} from "../../../core/api/dtos/trophy/earned-trophy";
import {TrophyCountPerType} from "../../../core/models/dto/trophy-count-per-type";

@Component({
    selector: 'tq-trophy-set-summary',
    imports: [
        PlatformLabelComponent,
        TrophyCountDisplayerComponent,
    ],
    templateUrl: './trophy-set-summary.component.html',
    styleUrl: './trophy-set-summary.component.scss',
})
export class TrophySetSummaryComponent {
    readonly trophySet = input.required<TrophySet>();
    readonly trophies = input<EarnedTrophy[]>([]);

    readonly trophyCount = computed(() => (
        {
            platinum: this.trophies().filter(t => t.trophyType === 'platinum').length,
            gold: this.trophies().filter(t => t.trophyType === 'gold').length,
            silver: this.trophies().filter(t => t.trophyType === 'silver').length,
            bronze: this.trophies().filter(t => t.trophyType === 'bronze').length,
        } as TrophyCountPerType
    ));
}
