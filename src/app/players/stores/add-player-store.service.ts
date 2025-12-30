import {computed, Injectable, signal} from '@angular/core';
import {PlayerService} from "../../core/services/http/player.service";
import {AddPlayerStatus} from "../../core/models/add-player-status.enum";
import {PlayerByPseudoResponse} from "../../core/models/dto/response/player-by-pseudo-response";
import {PsnService} from "../../core/services/http/psn.service";
import {PsnFetchResponse} from "../../core/models/dto/response/psn-fetch-response";
import {catchError, EMPTY, switchMap, tap} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AddPlayerStore {
    private readonly _status = signal<AddPlayerStatus>(AddPlayerStatus.NONE);

    readonly status = computed(() => this._status());

    constructor(
        private _playerService: PlayerService,
        private _psnService: PsnService,
    ) {
    }

    addPlayer(pseudo: string): void {
        this._status.set(AddPlayerStatus.LOADING);

        this._playerService.fetchByPseudo(pseudo).pipe(
            switchMap((response: PlayerByPseudoResponse) => {
                switch (response.status) {
                    case 'FOUND':
                        this._status.set(AddPlayerStatus.ALREADY_IN_DATABASE);
                        return EMPTY;
                    case 'NOT_FOUND':
                        this._status.set(AddPlayerStatus.LOADING);
                        return this._psnService.addPlayer(pseudo);
                }
            }),
            tap((lambdaResponse: PsnFetchResponse) => {
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
