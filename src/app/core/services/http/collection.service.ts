import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Collection} from '../../models/dto/collection';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private readonly API_URL = "http://localhost:8080/api/collection";

  constructor(private _http: HttpClient) {
  }

  retrieve(collectionId: String): Observable<Collection> {
    return this._http.get<Collection>(`${this.API_URL}/${collectionId}`);
  }
}
