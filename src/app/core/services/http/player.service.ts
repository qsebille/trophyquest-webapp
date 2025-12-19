import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../../models/dto/player';
import {SearchResult} from '../../models/dto/search-result';
import {TrophyCountPerType} from '../../models/dto/trophy-count-per-type';
import {Trophy} from '../../models/dto/trophy';
import {PlayerGame} from '../../models/dto/player-game';
import {PlayerSummary} from '../../models/dto/player-summary';
import {RecentPlayerResponse} from "../../models/dto/recent-player-response";
import {environment} from "../../../../environments/environment";
import {PlayerByPseudoResponse} from "../../models/dto/response/player-by-pseudo-response";

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    private readonly API_URL = `${environment.apiUrl}/api/player`;

    constructor(private readonly _http: HttpClient) {
    }

    search(
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<PlayerSummary>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<PlayerSummary>>(`${this.API_URL}/search`, {params});
    }

    /**
     * Fetches a player's details from the server using their ID.
     *
     * @param {string} playerId - The unique identifier of the player to be fetched.
     * @return {Observable<Player>} An Observable that emits the Player object containing the player's data.
     */
    retrieve(playerId: string): Observable<Player> {
        return this._http.get<Player>(`${this.API_URL}/${playerId}`);
    }

    fetchByPseudo(pseudo: string): Observable<PlayerByPseudoResponse> {
        return this._http.get<PlayerByPseudoResponse>(`${this.API_URL}/pseudo/${pseudo}`);
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
        return this._http.get<SearchResult<Trophy>>(`${this.API_URL}/${playerId}/trophies`, {params});
    }

    searchGames(
        playerId: string,
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<PlayerGame>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<PlayerGame>>(`${this.API_URL}/${playerId}/game/search`, {params});
    }

    fetchGameTrophies(
        playerId: string,
        gameId: string
    ): Observable<Trophy[]> {
        return this._http.get<Trophy[]>(`${this.API_URL}/${playerId}/game/${gameId}/trophies`);
    }

    count(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/count`);
    }

    countPlayedGames(playerId: string): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/${playerId}/game/count`);
    }

    getTrophyCountPerType(playerId: string): Observable<TrophyCountPerType> {
        return this._http.get<TrophyCountPerType>(`${this.API_URL}/${playerId}/trophy/count`);
    }

    fetchRecentPlayers(): Observable<RecentPlayerResponse[]> {
        return this._http.get<RecentPlayerResponse[]>(`${this.API_URL}/most-active`);
    }

}
