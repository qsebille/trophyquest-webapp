import {computed, Injectable, signal} from '@angular/core';
import {LoadingStatus} from '../../models/loading-status.enum';
import {Collection} from '../../models/dto/collection';
import {CollectionService} from '../../services/http/collection.service';

@Injectable({
    providedIn: 'root',
})
export class CollectionStore {
    private readonly _collection = signal<Collection | null>(null);
    readonly collection = computed(() => this._collection());

    private readonly _loadingStatus = signal<LoadingStatus>(LoadingStatus.NONE);
    readonly isLoaded = computed(() => this._loadingStatus() === LoadingStatus.FULLY_LOADED);
    readonly isLoading = computed(() => this._loadingStatus() === LoadingStatus.LOADING);
    readonly isError = computed(() => this._loadingStatus() === LoadingStatus.ERROR);

    constructor(
        private readonly _collectionService: CollectionService,
    ) {
    }

    reset(): void {
        this._collection.set(null);
        this._loadingStatus.set(LoadingStatus.NONE);
    }

    retrieve(collectionId: string | null): void {
        if (null == collectionId) {
            console.error('Invalid collection id');
            this._loadingStatus.set(LoadingStatus.ERROR);
            return;
        }

        this._loadingStatus.set(LoadingStatus.LOADING);
        this._collectionService.retrieve(collectionId).subscribe({
            next: collection => {
                this._collection.set(collection);
                this._loadingStatus.set(LoadingStatus.FULLY_LOADED);
            },
            error: error => {
                console.error(error);
                this._collection.set(null);
                this._loadingStatus.set(LoadingStatus.ERROR);
            },
        });
    }
}
