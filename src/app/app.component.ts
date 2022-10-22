import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Select, Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  DEFAULT_SEARCH_CRITERIA,
  GiphyActions,
  GiphyImage,
  GiphySearchCriteria,
  GiphySelectors,
  GiphyState,
  Pagination,
} from './feature-data-access';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular-Image-Grid';
  searchControl = new FormControl();

  @Select(GiphySelectors.images) images$!: Observable<GiphyImage[]>;
  @Select(GiphySelectors.pagination) pagination$!: Observable<Pagination>;
  @Select(GiphySelectors.criteria) criteria$!: Observable<GiphySearchCriteria>;

  constructor(private readonly store: Store) {
    this.store.dispatch(new GiphyActions.Search(DEFAULT_SEARCH_CRITERIA));
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), untilDestroyed(this))
      .subscribe({
        next: (value) => {
          this.store.dispatch(new GiphyActions.Search({ ...DEFAULT_SEARCH_CRITERIA, q: value }));
        },
      });
  }

  onPageChange(event: any) {
    const criteria = this.store.selectSnapshot(GiphySelectors.criteria);
    this.store.dispatch(
      new GiphyActions.Search({
        q: criteria.q,
        offset: event.pageIndex * 9,
      })
    );
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,

    ReactiveFormsModule,

    HttpClientModule,

    MatGridListModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,

    NgxsModule.forRoot([GiphyState], {
      developmentMode: !environment.production,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
