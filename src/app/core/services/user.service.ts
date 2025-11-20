import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/dto/user';
import {GameSearchResult} from '../models/dto/game-search-result';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = "http://localhost:8080/api/users";

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/all`);
  }

  fetchUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${userId}`);
  }

  searchUserGames(
    userId: string,
    pageNumber: number,
    pageSize: number
  ): Observable<GameSearchResult> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<GameSearchResult>(`${this.API_URL}/${userId}/games`, {params});
  }

}
