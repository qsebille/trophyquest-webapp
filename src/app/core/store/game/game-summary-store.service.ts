import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from '../../models/loading-status.enum';
import {GameSummary} from '../../models/dto/game-summary';
import {GameService} from "../../services/http/game.service";

@Injectable({
    providedIn: 'root',
})
export class GameSummaryStore {
    private readonly _gameSummary = signal<GameSummary | null>(null);
    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);

    readonly summary = computed(() => this._gameSummary());
    readonly isLoading = computed(() => this._status() === LoadingStatus.LOADING);
    readonly isError = computed(() => this._status() === LoadingStatus.ERROR);

    constructor(
        private readonly _gameService: GameService,
    ) {
    }

    reset(): void {
        this._gameSummary.set(null);
        this._status.set(LoadingStatus.NONE);
    }

    retrieve(gameId: string | null): void {
        if (null == gameId) {
            console.error('Invalid game id');
            this._status.set(LoadingStatus.ERROR);
            return;
        }

        this._status.set(LoadingStatus.LOADING);
        this._gameService.getSummary(gameId).subscribe({
            next: summary => {
                this._gameSummary.set(summary);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error(error);
                this._gameSummary.set(null);
                this._status.set(LoadingStatus.ERROR);
            },
        });
    }
}
