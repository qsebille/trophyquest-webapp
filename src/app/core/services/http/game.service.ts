import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchResult} from '../../models/dto/search-result';
import {Game} from '../../models/dto/game';
import {PopularGame} from "../../models/dto/popular-game";
import {environment} from "../../../../environments/environment";
import {GameSummary} from "../../models/dto/game-summary";
import {Trophy} from "../../models/dto/trophy";

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private readonly API_URL = `${environment.apiUrl}/api/game`;

    constructor(private readonly _http: HttpClient) {
    }

    searchGames(
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<Game>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<Game>>(this.API_URL, {params});
    }

    searchPopularGames(): Observable<PopularGame[]> {
        return this._http.get<PopularGame[]>(`${this.API_URL}/most-popular`);
    }

    count(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/count`);
    }

    getSummary(gameId: String): Observable<GameSummary> {
        return this._http.get<GameSummary>(`${this.API_URL}/${gameId}/summary`);
    }
    
    getTrophies(gameId: string): Observable<Trophy[]> {
        return this._http.get<Trophy[]>(`${this.API_URL}/${gameId}/trophies`);
    }

}
