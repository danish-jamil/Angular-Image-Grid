import { createSelector, Selector } from "@ngxs/store";
import { GiphyState, GiphyStateModel } from "../states";

export class GiphySelectors {
  static state() {
    return createSelector([GiphyState], (state: GiphyStateModel) => {
      return state;
    });
  }

  @Selector([GiphyState])
  static criteria(state: GiphyStateModel) {
    return state.criteria;
  }

  @Selector([GiphyState])
  static images(state: GiphyStateModel) {
    return state.images;
  }
  
  @Selector([GiphyState])
  static meta(state: GiphyStateModel) {
    return state.meta;
  }
  
  @Selector([GiphyState])
  static pagination(state: GiphyStateModel) {
    return state.pagination;
  }
}