import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameSearchResult} from '../models/dto/game-search-result';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly API_URL = "http://localhost:8080/api/games";

  constructor(private http: HttpClient) {
  }

  searchGames(
    pageNumber: number,
    pageSize: number
  ): Observable<GameSearchResult> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<GameSearchResult>(this.API_URL, {params});
  }

}
