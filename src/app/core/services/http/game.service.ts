import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchResult} from '../../models/dto/search-result';
import {Game} from '../../models/dto/game';
import {RecentlyPlayedGame} from "../../models/dto/recently-played-game";
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class GameService {
    private readonly API_URL = `${environment.apiUrl}/api/game`;

    constructor(private http: HttpClient) {
    }

    searchGames(
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<Game>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this.http.get<SearchResult<Game>>(this.API_URL, {params});
    }

    searchRecentGames(): Observable<RecentlyPlayedGame[]> {
        return this.http.get<RecentlyPlayedGame[]>(`${this.API_URL}/recently-played`);
    }

    count(): Observable<number> {
        return this.http.get<number>(`${this.API_URL}/count`);
    }

}
