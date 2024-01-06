import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { MoviesStorageService } from '../movies-service/movies-storage.service';
import { environment } from '../../../environments/environment';
import { Movie } from '../catalog/movie/movie.model';

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

    this.route.params.subscribe(
      (params: Params) => {
        this.invalidMovieId
        this.movieId = +params['id'];
        this.movieSubscription = this.moviesStorageService.getMovieDetail(this.movieId).subscribe({
          next: (movie) => {
            this.movie = movie;
            this.isLoading = false;
          },
          error: () => {
            this.invalidMovieId = true;
            this.isLoading = false;
          }
        });
      },


    );

  }



  returnToCatalog() {
    this.router.navigate(['catalog'])
  }


  ngOnDestroy(): void {
    this.movieSubscription.unsubscribe();
  }

}
