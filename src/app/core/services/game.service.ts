import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchResult} from '../models/dto/search-result';
import {Game} from '../models/dto/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly API_URL = "http://localhost:8080/api/games";

  constructor(private http: HttpClient) {
  }

  searchGames(pageNumber: number, pageSize: number): Observable<SearchResult<Game>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<Game>>(this.API_URL, {params});
  }

}
