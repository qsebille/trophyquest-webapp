import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/dto/user';
import {SearchResult} from '../models/dto/search-result';
import {Game} from '../models/dto/game';
import {TrophyCount} from '../models/dto/trophy-count';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<SearchResult<User>> {
    return this.http.get<SearchResult<User>>(`${this.API_URL}/search`);
  }

  fetchUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${userId}`);
  }

  getTrophyCount(userId: string): Observable<TrophyCount> {
    return this.http.get<TrophyCount>(`${this.API_URL}/${userId}/trophy-count`);
  }

  searchUserGames(userId: string, pageNumber: number, pageSize: number): Observable<SearchResult<Game>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<Game>>(`${this.API_URL}/${userId}/games`, {params});
  }

}
