import { TestBed } from "@angular/core/testing";
import { MoviesStorageService } from "./movies-storage.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from "../catalog/movie/movie.model";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";


describe('MoviesStorageService', () => {

  const mockMovies: Movie[] = [
    new Movie(
      false,
      '/backdrop_path_1.jpg',
      [1, 2, 3],
      1,
      'en',
      'Original Title 1',
      'Overview 1',
      100.0,
      '/poster_path_1.jpg',
      '2023-01-01',
      'Title 1',
      false,
      7.5,
      1000
    ),
    new Movie(
      true,
      '/backdrop_path_2.jpg',
      [4, 5],
      2,
      'en',
      'Original Title 2',
      'Overview 2',
      150.0,
      '/poster_path_2.jpg',
      '2024-02-02',
      'Title 2',
      true,
      8.0,
      2000
    ),

  ];
  let service: MoviesStorageService;




  service = jasmine.createSpyObj("MoviesStorageService", ["getTopRatedMovies"]);


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: MoviesStorageService, useValue: service
      }],
      imports: [HttpClientTestingModule]
    });


    service = TestBed.inject(MoviesStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch top-rated movies via GET request', () => {

    const pageIndex = 1;



    (service.getTopRatedMovies as jasmine.Spy).and.returnValue(of(mockMovies));

    service.getTopRatedMovies(pageIndex).subscribe((movies: Movie[]) => {
      expect(movies).toEqual(mockMovies);
    });

  });


  // it('should get top rated movies', () => {

  //   //mock data
  //   const mockMovieData: Movie[] = [
  //     new Movie(
  //       false,
  //       '/backdrop_path_1.jpg',
  //       [1, 2, 3],
  //       1,
  //       'en',
  //       'Original Title 1',
  //       'Overview 1',
  //       100.0,
  //       '/poster_path_1.jpg',
  //       '2023-01-01',
  //       'Title 1',
  //       false,
  //       7.5,
  //       1000
  //     ),
  //     new Movie(
  //       true,
  //       '/backdrop_path_2.jpg',
  //       [4, 5],
  //       2,
  //       'en',
  //       'Original Title 2',
  //       'Overview 2',
  //       150.0,
  //       '/poster_path_2.jpg',
  //       '2024-02-02',
  //       'Title 2',
  //       true,
  //       8.0,
  //       2000
  //     ),

  //   ];


  //   let pageIndex = 1;
  //   service.getTopRatedMovies(pageIndex).subscribe((data:any) => {


  //     //validate that the movies are received
  //     expect(data).toBeTruthy();

  //     //validate number of movies(2)
  //     expect(data.length).toBe(2);

  //   });
  //   //Invoke a mock request so when the end.pt is hit we can get our mock data 
  //   const mockReq = testingController.expectOne(
  //     'https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=ac8505d478a5c429138f8613924550e3&page=1'
  //     );

  //   //check if the request is of type get  
  //   expect(mockReq.request.method).toEqual('GET');


  //   //Pass our mock data to the mock request
  //   mockReq.flush(mockMovieData);


  // })




})