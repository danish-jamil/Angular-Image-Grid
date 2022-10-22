import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiphyApiResponse, GiphySearchCriteria } from '../../types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  URL = environment.giphySearchApiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  search(criteria: GiphySearchCriteria): Observable<GiphyApiResponse> {
    // In a perfect world we would use interceptor to set api key 😇
    const params = Object.entries(criteria)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    return this.httpClient.get<GiphyApiResponse>(
      `${this.URL}?${params}&api_key=${environment.giphyApiKey}`
    );
  }
}
