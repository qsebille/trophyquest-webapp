import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PsnFetchResponse} from "../../models/dto/response/psn-fetch-response";

@Injectable({
    providedIn: 'root',
})
export class PsnService {
    private readonly API_URL = `${environment.apiUrl}/api/psn`;

    constructor(private readonly _http: HttpClient) {
    }

    addPlayer(pseudo: string): Observable<PsnFetchResponse> {
        return this._http.post<PsnFetchResponse>(`${this.API_URL}/${pseudo}`, {});
    }
}
