import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Collection} from '../../models/dto/collection';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class CollectionService {
    private readonly API_URL = `${environment.apiUrl}/api/game`;

    constructor(private _http: HttpClient) {
    }

    retrieve(collectionId: String): Observable<Collection> {
        return this._http.get<Collection>(`${this.API_URL}/${collectionId}`);
    }
}
