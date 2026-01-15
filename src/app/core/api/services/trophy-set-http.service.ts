import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SearchResult} from "../dtos/search-result";
import {TrophySetWithCandidates} from "../dtos/trophy-set/trophy-set-with-candidates";
import {EarnedTrophy} from "../dtos/trophy/earned-trophy";
import {TrophySet} from "../dtos/trophy-set/trophy-set";
import {RecentTrophySet} from "../dtos/trophy-set/recent-trophy-set";

@Injectable({
    providedIn: 'root',
})
export class TrophySetHttpService {
    private readonly API_URL = `${environment.apiUrl}/api/trophy-set`;

    constructor(private readonly _http: HttpClient) {
    }

    fetch(trophySetId: string): Observable<TrophySet> {
        return this._http.get<TrophySet>(`${this.API_URL}/${trophySetId}`);
    }

    searchWithCandidates(pageNumber: number, pageSize: number): Observable<SearchResult<TrophySetWithCandidates>> {
        const params = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);
        return this._http.get<SearchResult<TrophySetWithCandidates>>(this.API_URL + "/search/candidates", {params});
    }

    count(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/count`);
    }

    countRecent(): Observable<number> {
        return this._http.get<number>(`${this.API_URL}/recent/count`);
    }

    fetchRecent(): Observable<RecentTrophySet[]> {
        return this._http.get<RecentTrophySet[]>(`${this.API_URL}/top-recent`);
    }

    fetchTrophies(trophySetId: string, playerId: string | null): Observable<EarnedTrophy[]> {
        if (playerId == null) {
            return this._http.get<EarnedTrophy[]>(`${this.API_URL}/${trophySetId}/trophies`);
        } else {
            const params = new HttpParams().set('playerId', playerId);
            return this._http.get<EarnedTrophy[]>(`${this.API_URL}/${trophySetId}/trophies`, {params});
        }
    }

    validateCandidate(trophySetId: string, candidateId: number): Observable<boolean> {
        return this._http.post<boolean>(`${this.API_URL}/${trophySetId}/validate-candidate`, candidateId, {headers: {'Content-Type': 'application/json'}});
    }
}
