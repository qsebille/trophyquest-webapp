import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../models/dto/player';
import {SearchResult} from '../models/dto/search-result';
import {TrophyCount} from '../models/dto/trophy-count';
import {PlayerGameAchievements} from '../models/dto/player-game-achievements';
import {Trophy} from '../models/dto/trophy';
import {GameGroupTrophies} from '../models/dto/game-group-trophies';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly API_URL = "http://localhost:8080/api/player";

  constructor(private http: HttpClient) {
  }

  /**
   * Fetches a list of players based on the search criteria.
   *
   * @return {Observable<SearchResult<Player>>} An observable emitting the search result containing players.
   */
  search(): Observable<SearchResult<Player>> {
    return this.http.get<SearchResult<Player>>(`${this.API_URL}/search`);
  }

  /**
   * Fetches a player's details from the server using their ID.
   *
   * @param {string} playerId - The unique identifier of the player to be fetched.
   * @return {Observable<Player>} An Observable that emits the Player object containing the player's data.
   */
  fetch(playerId: string): Observable<Player> {
    return this.http.get<Player>(`${this.API_URL}/${playerId}`);
  }

  /**
   * Retrieves the trophy count for a specific player.
   *
   * @param {string} playerId - The unique identifier of the player whose trophy count is to be fetched.
   * @return {Observable<TrophyCount>} An observable containing the trophy count for the specified player.
   */
  getTrophyCount(playerId: string): Observable<TrophyCount> {
    return this.http.get<TrophyCount>(`${this.API_URL}/${playerId}/trophy-count`);
  }

  /**
   * Fetches a paginated list of trophies earned by a specific player.
   *
   * @param {string} playerId - The unique identifier of the player whose earned trophies are to be fetched.
   * @param {number} pageNumber - The page number to retrieve in the paginated results.
   * @param {number} pageSize - The number of results to retrieve per page.
   * @return {Observable<SearchResult<Trophy>>} An observable containing the paginated result of the earned trophies.
   */
  searchEarnedTrophies(
    playerId: string,
    pageNumber: number,
    pageSize: number
  ): Observable<SearchResult<Trophy>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<Trophy>>(`${this.API_URL}/${playerId}/trophies`, {params});
  }

  /**
   * Searches for games associated with a specific player.
   *
   * @param {string} playerId - The unique identifier of the player whose games are to be retrieved.
   * @param {number} pageNumber - The number of the page to retrieve in paginated results.
   * @param {number} pageSize - The number of games per page to retrieve in paginated results.
   * @return {Observable<SearchResult<PlayerGameAchievements>>} An Observable containing a SearchResult of PlayerGameAchievements objects.
   */
  searchGames(
    playerId: string,
    pageNumber: number,
    pageSize: number
  ): Observable<SearchResult<PlayerGameAchievements>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<PlayerGameAchievements>>(`${this.API_URL}/${playerId}/games`, {params});
  }

  /**
   * Fetches the list of trophies associated with a specific collection for a given player.
   *
   * @param {string} playerId - The unique identifier of the player.
   * @param {string} collectionId - The unique identifier of the collection.
   * @return {Observable<GameGroupTrophies[]>} An observable that emits the array of trophies belonging to the specified collection.
   */
  fetchCollectionTrophies(
    playerId: string,
    collectionId: string
  ): Observable<GameGroupTrophies[]> {
    return this.http.get<GameGroupTrophies[]>(`${this.API_URL}/${playerId}/collection/${collectionId}/trophies`);
  }

}
