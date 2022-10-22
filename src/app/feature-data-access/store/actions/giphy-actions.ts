import { GiphySearchCriteria } from "../../types";


const ACTION_TYPE = '[Giphy Acions]';

export namespace GiphyActions {
  export class Search {
    static readonly type = `${ACTION_TYPE} Search`;

    constructor(public criteria?: GiphySearchCriteria) {}
  }
}