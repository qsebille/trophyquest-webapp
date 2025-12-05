import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchResult} from '../models/dto/search-result';
import {ObtainedTrophy} from '../models/dto/obtained-trophy';

@Injectable({
  providedIn: 'root',
})
export class TrophyService {
  private readonly API_URL = "http://localhost:8080/api/trophy";

  constructor(private http: HttpClient) {
  }

  searchLastObtained(
    pageNumber: number,
    pageSize: number
  ): Observable<SearchResult<ObtainedTrophy>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.http.get<SearchResult<ObtainedTrophy>>(`${this.API_URL}/last`, {params});
  }

}
