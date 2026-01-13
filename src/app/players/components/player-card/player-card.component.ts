import {Component, computed, input, output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {
    TrophyCountDisplayerComponent
} from '../../../core/components/trophy-count-displayer/trophy-count-displayer.component';
import {PlatformLabelComponent} from "../../../core/components/platform-label/platform-label.component";
import {PlayerSearchItem} from "../../../core/api/dtos/player/player-search-item";
import {TrophyCountPerType} from "../../../core/models/dto/trophy-count-per-type";

@Component({
    selector: 'tq-player-card',
    imports: [
        NgOptimizedImage,
        TrophyCountDisplayerComponent,
        PlatformLabelComponent
    ],
    templateUrl: './player-card.component.html',
    styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent {
    readonly playerSearchItem = input.required<PlayerSearchItem>();
    readonly clickOnPseudo = output();
    readonly clickOnGame = output();

    readonly trophyCount = computed(() => (
        {
            platinum: this.playerSearchItem().totalEarnedPlatinum,
            gold: this.playerSearchItem().totalEarnedGold,
            silver: this.playerSearchItem().totalEarnedSilver,
            bronze: this.playerSearchItem().totalEarnedBronze,
        } as TrophyCountPerType
    ));
}
