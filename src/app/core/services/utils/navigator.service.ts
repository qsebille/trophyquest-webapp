import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class NavigatorService {

    constructor(private _router: Router) {
    }

    goToErrorPage(message: string): void {
        this._router.navigate(['/error']).then(() => console.error(message));
    }

    goToProfilePage(playerId: string): void {
        this._router.navigate(['/profile', playerId])
            .then(() => console.info(`Navigated to profile page: ${playerId}`));
    }

    goToPlayerGamePage(
        gameId: string,
        playerId: string
    ): void {
        this._router.navigate(['/game', gameId], {queryParams: {playerId}})
            .then(() => console.info(`Navigated to game page: ${gameId} for player ${playerId}`));
    }

    goToGamePage(gameId: string): void {
        this._router.navigate(['/game', gameId])
            .then(() => console.info(`Navigated to game page: ${gameId}`));
    }
}
