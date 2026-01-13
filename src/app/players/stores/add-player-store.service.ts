import {computed, Injectable, signal} from '@angular/core';
import {PlayerHttpService} from "../../core/api/services/player-http.service";
import {AddPlayerStatus} from "../../core/models/add-player-status.enum";
import {PlayerAddResponse} from "../../core/api/dtos/player/player-add-response";
import {catchError, EMPTY, switchMap, tap} from "rxjs";
import {Player} from "../../core/api/dtos/player/player";

@Injectable({
    providedIn: 'root',
})
export class AddPlayerStore {
    private readonly _status = signal<AddPlayerStatus>(AddPlayerStatus.NONE);

    readonly status = computed(() => this._status());

    constructor(private _playerService: PlayerHttpService) {
    }

    addPlayer(pseudo: string): void {
        this._status.set(AddPlayerStatus.LOADING);

        this._playerService.fetchByPseudo(pseudo).pipe(
            switchMap((response: Player | null) => {
                if (response === null) {
                    console.info("Player not found in database, adding it to database...");
                    this._status.set(AddPlayerStatus.LOADING);
                    return this._playerService.addPlayer(pseudo);
                } else {
                    console.info("Player already in database, not adding it to database");
                    this._status.set(AddPlayerStatus.ALREADY_IN_DATABASE);
                    return EMPTY;
                }
            }),
            tap((lambdaResponse: PlayerAddResponse) => {
                switch (lambdaResponse.status) {
                    case 'OK':
                        this._status.set(AddPlayerStatus.ADDED);
                        break;
                    case 'ERROR':
                        this._status.set(AddPlayerStatus.ERROR_WHEN_ADDING);
                }
            }),
            catchError(() => {
                this._status.set(AddPlayerStatus.ERROR_WHEN_ADDING);
                return EMPTY;
            })
        ).subscribe();
    }
}
