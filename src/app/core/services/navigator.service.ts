import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class NavigatorService {

    constructor(private _router: Router) {
    }

    goToPlayersPage(): void {
        this._router.navigate(['/players'])
            .then(() => console.info('Navigated to players page'));
    }

    goToProfilePage(playerId: string): void {
        this._router.navigate(['/profile', playerId])
            .then(() => console.info(`Navigated to profile page: ${playerId}`));
    }

    goToPlayerTrophySetPage(trophySetId: string, playerId: string): void {
        this._router.navigate(['/trophy-set', trophySetId], {queryParams: {playerId}})
            .then(() => console.info(`Navigated to trophy set page: ${trophySetId} for player ${playerId}`));
    }

    goToTrophySetPage(trophySetId: string): void {
        this._router.navigate(['/trophy-set', trophySetId])
            .then(() => console.info(`Navigated to trophy set page: ${trophySetId}`));
    }
}
