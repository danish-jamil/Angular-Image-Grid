import { Injectable } from "@angular/core";
import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { EMPTY, catchError, tap, Observable } from "rxjs";
import { GiphyActions } from "../actions";
import { GiphyService } from "../services";


export interface GiphyStateModel {
  images: string[];
}

const GIPHY_STATE_TOKEN = new StateToken<GiphyStateModel>('giphy');

@State<GiphyStateModel>({
  name: 'giphy',
  defaults: {
    images: []
  }
})
@Injectable()
export class GiphyState {
  constructor(private readonly _service: GiphyService) {}

  @Action(GiphyActions.Search)
  private search(ctx: StateContext<GiphyStateModel>) {
    return this._service.search().pipe(
      tap(({ images }) => {
        ctx.patchState({
          images
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