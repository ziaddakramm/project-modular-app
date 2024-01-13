import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movie } from "../catalog/movie/movie.model";
import {  map } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable(
    { providedIn: 'root' }
)
export class MoviesStorageService {


    apiKey=environment.tmdbApiKey;


    totalPagesNumber:number;

 


    constructor(
        private http: HttpClient) { }



    getTopRatedMovies(pageIndex:number) {
        return this.http.get<Movie[]>(
            environment.tmdbMoviesApiUrl,
            {
                params:new HttpParams().set('api_key',this.apiKey).set('page',pageIndex).set('language','en-US')
            }
        ).pipe(

            map((response: any) => 
            {

                
                this.totalPagesNumber=response['total_pages'];

                response.results as Movie[]
                return response.results;
            }),
        );
    }

    getMovieDetail(movieId:number) {
        return this.http.get<Movie>(
            `https://api.themoviedb.org/3/movie/${movieId}`,
            {
                params:new HttpParams().set('api_key',this.apiKey).set('language','en-US')
            }
        ).pipe(
            map((response: any) => 
            {
                let receivedMovie = new Movie(
                    response.adult,
                    response.backdrop_path,
                    response.genre_ids,
                    response.id,
                    response.original_language,
                    response.original_title,
                    response.overview,
                    response.popularity,
                    response.poster_path,
                    response.release_date,
                    response.title,
                    response.video,
                    response.vote_average,
                    response.vote_count
                )
                return receivedMovie;
            }),
        );
    }



}