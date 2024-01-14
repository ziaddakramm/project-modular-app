import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription, catchError, exhaustMap, map, throwError } from 'rxjs';
import { MoviesStorageService } from '../movies-service/movies-storage.service';
import { environment } from '../../../environments/environment';
import { Movie } from '../catalog/movie/movie.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css'
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  movieId: number;
  movie: Movie;


  movieSubscription: Subscription;

  isLoading = true;

  imgBaseUrl = environment.imgBasePath;

  invalidMovieId: boolean;


  constructor(private moviesStorageService: MoviesStorageService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

    this.getMovieDetail();
  }


  getMovieDetail() {
    this.route.params.subscribe(
      (params: Params) => {
        this.invalidMovieId
        this.movieId = +params['id'];
        this.movieSubscription = this.subscribeToMovieDetail();
      },
    );
  }

  subscribeToMovieDetail() {

    return this.moviesStorageService.languageSubject.pipe(
      exhaustMap((language) => {
        return this.moviesStorageService.getMovieDetail(this.movieId, language).pipe(
          map((movie) => {
            this.movie = movie;
            this.isLoading = false;
          })
          ,
         
        );
      })
    ).subscribe({error:()=>{
      this.invalidMovieId = true;
      this.isLoading = false;
    }});
  }

  private handleError(errorRes: HttpErrorResponse) {
    this.invalidMovieId = true;
    this.isLoading = false;

    return throwError(() => 'invlalid id')
  }

  returnToCatalog() {
    this.router.navigate(['catalog'])
  }


  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }

}
