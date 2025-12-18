import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../../models/dto/player';
import {SearchResult} from '../../models/dto/search-result';
import {TrophyCount} from '../../models/dto/trophy-count';
import {Trophy} from '../../models/dto/trophy';
import {PlayerCollection} from '../../models/dto/player-collection';
import {PlayerSummary} from '../../models/dto/player-summary';
import {RecentPlayerResponse} from "../../models/dto/recent-player-response";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    private readonly API_URL = `${environment.apiUrl}/api/game`;

    constructor(private http: HttpClient) {
    }

    search(
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<PlayerSummary>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this.http.get<SearchResult<PlayerSummary>>(`${this.API_URL}/search`, {params});
    }

    /**
     * Fetches a player's details from the server using their ID.
     *
     * @param {string} playerId - The unique identifier of the player to be fetched.
     * @return {Observable<Player>} An Observable that emits the Player object containing the player's data.
     */
    retrieve(playerId: string): Observable<Player> {
        return this.http.get<Player>(`${this.API_URL}/${playerId}`);
    }

    /**
     * Fetches a paginated list of trophies earned by a specific player.
     *
     * @param {string} playerId - The unique identifier of the player whose earned trophies are to be fetched.
     * @param {number} pageNumber - The page number to retrieve in the paginated results.
     * @param {number} pageSize - The number of results to retrieve per page.
     * @return {Observable<SearchResult<Trophy>>} An observable containing the paginated result of the earned trophies.
     */
    searchEarnedTrophies(
        playerId: string,
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<Trophy>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this.http.get<SearchResult<Trophy>>(`${this.API_URL}/${playerId}/trophies`, {params});
    }

    /**
     * Searches player collections with pagination support.
     *
     * @param {string} playerId - The unique identifier of the player whose collections are being searched.
     * @param {number} pageNumber - The page number to retrieve.
     * @param {number} pageSize - The number of items per page.
     * @return {Observable<SearchResult<PlayerCollection>>} An observable that emits the search result containing player collections.
     */
    searchCollections(
        playerId: string,
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<PlayerCollection>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this.http.get<SearchResult<PlayerCollection>>(`${this.API_URL}/${playerId}/collection/search`, {params});
    }

    /**
     * Retrieves the list of trophies for a specific player's collection.
     *
     * @param {string} playerId - The unique identifier of the player.
     * @param {string} collectionId - The unique identifier of the collection.
     * @return {Observable<Trophy[]>} An observable that emits an array of trophies belonging to the specified collection.
     */
    retrieveCollectionTrophies(
        playerId: string,
        collectionId: string
    ): Observable<Trophy[]> {
        return this.http.get<Trophy[]>(`${this.API_URL}/${playerId}/collection/${collectionId}/trophies`);
    }

    /**
     * Retrieves the number of players registered in the system.
     *
     * @return {Observable<number>} An observable that emits the count of players registered in the system.
     */
    count(): Observable<number> {
        return this.http.get<number>(`${this.API_URL}/count`);
    }

    /**
     * Counts the total number of games played by a specific player.
     *
     * @param {string} playerId - The unique identifier of the player whose played games are to be counted.
     * @return {Observable<number>} An observable that emits the total number of games played by the specified player.
     */
    countPlayedGames(playerId: string): Observable<number> {
        return this.http.get<number>(`${this.API_URL}/${playerId}/game/count`);
    }

    /**
     * Retrieves the count of trophies earned by a specific player.
     *
     * @param {string} playerId - The unique identifier of the player.
     * @return {Observable<TrophyCount>} An observable that emits the trophy count for the specified player.
     */
    countEarnedTrophies(playerId: string): Observable<TrophyCount> {
        return this.http.get<TrophyCount>(`${this.API_URL}/${playerId}/trophy/count`);
    }

    fetchRecentPlayers(): Observable<RecentPlayerResponse[]> {
        return this.http.get<RecentPlayerResponse[]>(`${this.API_URL}/most-active`);
    }

}
