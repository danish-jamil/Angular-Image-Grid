import { Injectable } from "@angular/core";

import { HttpClient }  from '@angular/common/http';
import { Observable } from "rxjs";
import { GiphyApiResponse } from "../../types";

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  URL = ''
  
  constructor(private readonly httpClient: HttpClient) {}

  search(): Observable<GiphyApiResponse> {
    return this.httpClient.get<GiphyApiResponse>(`${this.URL}`, {
      params: {
        size: 9,
        q: ''
      }
    })
  }
}