import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly API_URL = "http://localhost:8080/api/games";

  public games: Game[] = [];

  constructor(private http: HttpClient) {
  }

  getGameList(): Observable<Game[]> {
    return this.http.get<Game[]>(this.API_URL, {});
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.API_URL}/${id}`);
  }
}
