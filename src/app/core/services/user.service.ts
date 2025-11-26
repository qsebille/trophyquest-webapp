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

  /**
   * Fetches a list of users based on the search criteria.
   *
   * @return {Observable<SearchResult<User>>} An observable emitting the search result containing users.
   */
  search(): Observable<SearchResult<User>> {
    return this.http.get<SearchResult<User>>(`${this.API_URL}/search`);
  }

  /**
   * Fetches a user's details from the server using their user ID.
   *
   * @param {string} userId - The unique identifier of the user to be fetched.
   * @return {Observable<User>} An Observable that emits the User object containing the user's data.
   */
  fetchUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${userId}`);
  }

  /**
   * Retrieves the trophy count for a specific user.
   *
   * @param {string} userId - The unique identifier of the user whose trophy count is to be fetched.
   * @return {Observable<TrophyCount>} An observable containing the trophy count for the specified user.
   */
  getTrophyCount(userId: string): Observable<TrophyCount> {
    return this.http.get<TrophyCount>(`${this.API_URL}/${userId}/trophy-count`);
  }

  /**
   * Fetches a paginated list of trophies earned by a specific user.
   *
   * @param {string} userId - The unique identifier of the user whose earned trophies are to be fetched.
   * @param {number} pageNumber - The page number to retrieve in the paginated results.
   * @param {number} pageSize - The number of results to retrieve per page.
   * @return {Observable<SearchResult<EarnedTrophy>>} An observable containing the paginated result of the earned trophies.
   */
  searchEarnedTrophies(userId: string, pageNumber: number, pageSize: number): Observable<SearchResult<EarnedTrophy>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<EarnedTrophy>>(`${this.API_URL}/${userId}/trophies`, {params});
  }

  /**
   * Searches for games associated with a specific user.
   *
   * @param {string} userId - The unique identifier of the user whose games are to be retrieved.
   * @param {number} pageNumber - The number of the page to retrieve in paginated results.
   * @param {number} pageSize - The number of games per page to retrieve in paginated results.
   * @return {Observable<SearchResult<UserGame>>} An Observable containing a SearchResult of UserGame objects.
   */
  searchGames(userId: string, pageNumber: number, pageSize: number): Observable<SearchResult<UserGame>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<UserGame>>(`${this.API_URL}/${userId}/games`, {params});
  }

}
