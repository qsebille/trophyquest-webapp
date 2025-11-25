import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/dto/user';
import {SearchResult} from '../models/dto/search-result';
import {TrophyCount} from '../models/dto/trophy-count';
import {UserGame} from '../models/dto/user-game';
import {EarnedTrophy} from '../models/dto/earned-trophy';

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

  searchEarnedTrophies(userId: string, pageNumber: number, pageSize: number): Observable<SearchResult<EarnedTrophy>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<EarnedTrophy>>(`${this.API_URL}/${userId}/trophies`, {params});
  }

  searchGames(userId: string, pageNumber: number, pageSize: number): Observable<SearchResult<UserGame>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<UserGame>>(`${this.API_URL}/${userId}/games`, {params});
  }

}
