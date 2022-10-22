import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { GiphyQueries, GiphyState } from './feature-data-access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular-Image-Grid';

  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private readonly queries: GiphyQueries) {}
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatGridListModule,
    NgxsModule.forRoot([GiphyState]),
  ],
})
export class AppModule {}
