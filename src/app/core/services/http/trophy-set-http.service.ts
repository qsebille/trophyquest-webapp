import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchResult} from "../../models/dto/search-result";
import {IgdbGame} from "../../models/dto/igdb-game";

@Injectable({
    providedIn: 'root',
})
export class TrophySetHttpService {
    private readonly API_URL = `${environment.apiUrl}/api/trophy-set`;

    constructor(private readonly _http: HttpClient) {
    }

    search(
        pageNumber: number,
        pageSize: number
    ): Observable<SearchResult<IgdbGame>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<IgdbGame>>(this.API_URL + "/search/igdb-candidates", {params});
    }
}
