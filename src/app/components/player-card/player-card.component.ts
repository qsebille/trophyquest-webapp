import {Component, computed, input, output} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {TrophyCountDisplayerComponent} from '../trophy-count-displayer/trophy-count-displayer.component';
import {PlayerSummary} from '../../core/models/dto/player-summary';

@Component({
    selector: 'app-player-card',
    imports: [
        NgOptimizedImage,
        TrophyCountDisplayerComponent
    ],
    templateUrl: './player-card.component.html',
    styleUrl: './player-card.component.scss',
})
export class PlayerCardComponent {
    readonly playerSummary = input.required<PlayerSummary>();
    readonly clickOnPseudo = output();
    readonly clickOnGame = output();

    readonly player = computed(() => this.playerSummary().player);
    readonly trophyCount = computed(() => this.playerSummary().trophyCount);
    readonly totalPlayedGames = computed(() => this.playerSummary().totalGamesPlayed);
    readonly lastGamePlayedTitle = computed(() => this.playerSummary().lastPlayedGameTitle);
    readonly lastGamePlayedImageUrl = computed(() => this.playerSummary().lastPlayedGameImageUrl);
}
