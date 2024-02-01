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

    languageSubject=new BehaviorSubject<string>('en-US')

    movieDetailSubscription:Subscription;
 



    constructor(
        private http: HttpClient,private authService:AuthService) { }



    getTopRatedMovies(pageIndex:number,language:string) {
        
        return this.http.get<Movie[]>(
            'http://localhost:8081/tmdb/movies',
            // environment.tmdbMoviesApiUrl,
            {
                headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))._token}`},
                // params:new HttpParams().set('api_key',this.apiKey).set('page',pageIndex).set('language',language)
                params:new HttpParams().set('page',pageIndex-1)
            },
        ).pipe(

            map((response: any) => 
            {

          
                this.totalPagesNumber=response['totalPages'];
                response.content as Movie[]
                console.log(response.content[0])
                return response.content;

                // this.totalPagesNumber=response['total_pages'];
                // response.results as Movie[]
                // console.log(response.results)
                // return response.results;
            }),
        );
    }

    getMovieDetail(movieId:number,language) {
        return this.http.get<Movie>(
            // environment.tmdbMovieDetailUrl+movieId,
            'http://localhost:8081/tmdb/movies/'+movieId,
            {
                headers:{Authorization:`Bearer ${JSON.parse(localStorage.getItem('userData'))._token}`},
                // params:new HttpParams().set('api_key',this.apiKey).set('language',language)
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
                console.log(receivedMovie)
                return receivedMovie;
            }),
        );
    }


    

}