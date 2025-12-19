import {computed, Injectable, signal} from '@angular/core';
import {Trophy} from '../../models/dto/trophy';
import {LoadingStatus} from '../../models/loading-status.enum';
import {PlayerService} from '../../services/http/player.service';
import {GameGroupTrophies} from '../../models/dto/game-group-trophies';
import {TrophyFilters} from '../../models/filters/trophy-filters';

@Injectable({
    providedIn: 'root',
})
export class GameTrophiesStore {
    private readonly _filters = signal<TrophyFilters>({earned: 'all'});
    readonly earnedFilter = computed(() => this._filters().earned);

    private readonly _trophies = signal<Trophy[]>([]);
    readonly displayedTrophies = computed(() => this._trophies().filter(t => this._filterTrophies(this._trophies(), this.earnedFilter()).includes(t)));
    readonly baseGameTrophies = computed(() => this.displayedTrophies().filter(t => t.gameGroup === 'default'));
    readonly dlcs = computed(() => this._computeDlcGroups());

    private readonly _loadingStatus = signal<LoadingStatus>(LoadingStatus.NONE);
    readonly isLoaded = computed(() => this._loadingStatus() === LoadingStatus.FULLY_LOADED);
    readonly isLoading = computed(() => this._loadingStatus() === LoadingStatus.LOADING);
    readonly isError = computed(() => this._loadingStatus() === LoadingStatus.ERROR);

    constructor(private readonly _playerService: PlayerService) {
    }

    reset(): void {
        this._trophies.set([]);
        this._loadingStatus.set(LoadingStatus.NONE);
    }

    retrieve(
        gameId: string | null,
        playerId: string | null,
    ): void {
        if (null == playerId || null == gameId) {
            console.error('Invalid player id or game id');
            this._loadingStatus.set(LoadingStatus.ERROR);
            return;
        }

        this._loadingStatus.set(LoadingStatus.LOADING);
        this._playerService.fetchGameTrophies(playerId, gameId).subscribe({
            next: trophies => {
                this._trophies.set(trophies);
                this._loadingStatus.set(LoadingStatus.FULLY_LOADED);
            },
            error: () => {
                console.error(`Failed loading trophies for game ${gameId} of player ${playerId}`);
                this._loadingStatus.set(LoadingStatus.ERROR);
            }
        });
    }

    changeEarnedFilter(filter: 'all' | 'earned' | 'notEarned') {
        this._filters.update(f => ({...f, earned: filter}));
    }

    private _computeDlcGroups(): GameGroupTrophies[] {
        const groups: GameGroupTrophies[] = [];
        this.displayedTrophies()
            .filter(t => t.gameGroup !== 'default')
            .forEach(t => {
                const group = groups.find(group => group.groupName === t.gameGroup)
                if (group === undefined) {
                    groups.push({groupName: t.gameGroup, trophies: [t]});
                }
                group?.trophies.push(t);
            });
        return groups;
    }

    private _filterTrophies(
        trophies: Trophy[],
        filter: 'all' | 'earned' | 'notEarned'
    ): Trophy[] {
        switch (filter) {
            case 'all':
                return trophies;
            case 'earned':
                return trophies.filter(t => t.earnedDate !== null);
            case 'notEarned':
                return trophies.filter(t => t.earnedDate === null);
        }
    }

}
