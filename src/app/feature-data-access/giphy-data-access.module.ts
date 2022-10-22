import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";
import { GiphyState } from "./store/states";

// It can be a library also

@NgModule({
  imports: [NgxsModule.forRoot([GiphyState])],
})
export class GiphyDataAccessModule {}