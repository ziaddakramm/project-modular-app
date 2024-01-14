import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, exhaustMap, map } from 'rxjs';


import { Movie } from './movie/movie.model';
import { MoviesStorageService } from '../movies-service/movies-storage.service';

@Component({
  selector:  'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit, OnDestroy {

  moviesSubscription: Subscription;

  movies: Movie[];

  currentPageIndex: number;

  totalNumberOfPages: number;
  
  isLoading: boolean;

  constructor(private movieStorageService: MoviesStorageService) { }

  ngOnInit(): void {
    this.currentPageIndex = 1;
    this.isLoading = true;
    this.subscribeToGetMovies();
  }

  subscribeToGetMovies() {

    this.moviesSubscription=this.movieStorageService.languageSubject.pipe(
      exhaustMap((language) => {
        return this.movieStorageService.getTopRatedMovies(this.currentPageIndex,language).pipe(
          map((movies) => {
            this.movies = movies;
            this.totalNumberOfPages = this.movieStorageService.totalPagesNumber;
            this.isLoading = false;
          })
        );
      })
    ).subscribe();


  }

  onNextPage() {
    if (this.currentPageIndex < this.totalNumberOfPages) {
      this.currentPageIndex++;
      this.isLoading = true;
      this.moviesSubscription.unsubscribe();
      this.subscribeToGetMovies();
    }
  }

  onPreviousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex--;
      this.isLoading=true;
      this.moviesSubscription.unsubscribe();
      this.subscribeToGetMovies();
    }
  }




  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
  }



}
