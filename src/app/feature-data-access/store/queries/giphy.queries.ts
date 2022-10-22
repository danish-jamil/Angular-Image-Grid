import { Injectable } from "@angular/core";
import { createSelector } from "@ngxs/store";
import { GiphyState, GiphyStateModel } from "../states";


@Injectable({
  providedIn: 'root',
})
export class GiphyQueries {
  images = createSelector([GiphyState], (state: GiphyStateModel) => {
    return state.images;
  });
}