import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Movie } from "../catalog/movie/movie.model";
import {  BehaviorSubject, Subscription, map } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/auth-service";

@Injectable(
    { providedIn: 'root' }
)
export class MoviesStorageService {

    apiKey=environment.tmdbApiKey;


    totalPagesNumber:number;

    languageSubject=new BehaviorSubject<string>('en-US');

    movieDetailSubscription:Subscription;
 
    pageSize=3;



    constructor(
        private http: HttpClient,private authService:AuthService) { }



    getTopRatedMovies(pageIndex:number,language:string) {
        
        return this.http.get<Movie[]>(
            // 'http://localhost:8081/tmdb/movies',
            environment.tmdbMoviesApiUrl,
            {
                headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))._token}`},
                params:new HttpParams().set('page',pageIndex-1).set('pageSize',this.pageSize),
            },
        ).pipe(

            map((response: any) => 
            {

          
                this.totalPagesNumber=response['totalPages'];
                response.content as Movie[]

                return response.content;

                
            }),
        );
    }

    getMovieDetail(movieId:number,language) {
        return this.http.get<Movie>(
            environment.tmdbMovieDetailUrl+movieId,
            // 'http://localhost:8081/tmdb/movies/'+movieId,
            {
                headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))._token}`},
            }
        ).pipe(
            map((response: any) => 
            {
                let receivedMovie = new Movie(
                    response.adult,
                    response.backdropPath,
                    null,
                    response.id,
                    response.originalLanguage,
                    response.originalTitle,
                    response.overview,
                    response.popularity,
                    response.posterPath,
                    response.releaseDate,
                    response.title,
                    response.video,
                    response.voteAverage,
                    response.voteCount
                )
            
                return receivedMovie;
            }),
        );
    }


    

}