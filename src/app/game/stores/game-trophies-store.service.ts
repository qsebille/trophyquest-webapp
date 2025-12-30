import {computed, Injectable, signal} from '@angular/core';
import {Trophy} from '../../core/models/dto/trophy';
import {LoadingStatus} from '../../core/models/loading-status.enum';
import {PlayerService} from '../../core/services/http/player.service';
import {GameService} from "../../core/services/http/game.service";

@Injectable({
    providedIn: 'root',
})
export class GameTrophiesStore {
    private readonly _trophies = signal<Trophy[]>([]);
    readonly trophies = computed(() => this._trophies());

    private readonly _status = signal<LoadingStatus>(LoadingStatus.NONE);
    readonly status = computed(() => this._status());

    constructor(
        private readonly _playerService: PlayerService,
        private readonly _gameService: GameService,
    ) {
    }

    reset(): void {
        this._trophies.set([]);
        this._status.set(LoadingStatus.NONE);
    }

    retrieveForGame(gameId: string | null): void {
        if (null == gameId) {
            console.error('Invalid game id');
            this._status.set(LoadingStatus.ERROR);
            return;
        }

        this._status.set(LoadingStatus.LOADING);
        this._gameService.getTrophies(gameId).subscribe({
            next: trophies => {
                this._trophies.set(trophies);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: () => {
                console.error(`Failed loading trophies for game ${gameId}`);
                this._status.set(LoadingStatus.ERROR);
            }
        })
    }

    retrieveForPlayer(
        gameId: string | null,
        playerId: string | null,
    ): void {
        if (null == playerId || null == gameId) {
            console.error('Invalid player id or game id');
            this._status.set(LoadingStatus.ERROR);
            return;
        }

        this._status.set(LoadingStatus.LOADING);
        this._playerService.fetchGameTrophies(playerId, gameId).subscribe({
            next: trophies => {
                this._trophies.set(trophies);
                this._status.set(LoadingStatus.FULLY_LOADED);
            },
            error: () => {
                console.error(`Failed loading trophies for game ${gameId} of player ${playerId}`);
                this._status.set(LoadingStatus.ERROR);
            }
        });
    }
}
