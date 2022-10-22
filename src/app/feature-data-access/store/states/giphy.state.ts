import { Injectable } from "@angular/core";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { EMPTY, catchError, tap, Observable } from "rxjs";
import { GiphyImage, GiphySearchCriteria, Meta, Pagination } from "../../types";
import { GiphyActions } from "../actions";
import { GiphyService } from "../services";

export const DEFAULT_SEARCH_CRITERIA: GiphySearchCriteria = {
  limit: 9,
  q: 'funny cat',
}

export interface GiphyStateModel {
  criteria: GiphySearchCriteria;
  images: GiphyImage[];
  meta?: Meta;
  pagination?: Pagination;
}

const GIPHY_STATE_TOKEN = new StateToken<GiphyStateModel>('giphy');

@State<GiphyStateModel>({
  name: 'giphy',
  defaults: {
    criteria: DEFAULT_SEARCH_CRITERIA,
    images: [],
  }
})
@Injectable()
export class GiphyState {
  constructor(private readonly _service: GiphyService) {}

  @Action(GiphyActions.Search)
  private search(ctx: StateContext<GiphyStateModel>, { criteria }: GiphyActions.Search) {
    const existingCriteria = ctx.getState().criteria;
    return this._service.search({...existingCriteria, ...criteria}).pipe(
      tap(({ data: images, meta, pagination }) => {
        ctx.patchState({
          images,
          meta,
          pagination,
        })
      }),
      catchError((error) => {
        console.log(error);
        // Log error
        return EMPTY;
      })
    );
  }
}