import { ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { CatalogComponent } from './catalog.component';

import { MoviesStorageService } from '../movies-service/movies-storage.service';
import { MockComponent } from 'ng-mocks';
import { Movie } from './movie/movie.model';
import { of } from 'rxjs';
import { MovieComponent } from './movie/movie.component';
import { By } from '@angular/platform-browser';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';


describe('CatalogComponent', () => {

    let component: CatalogComponent;
    let fixture: ComponentFixture<CatalogComponent>;
    let el: DebugElement;

    let moviesStorageService: jasmine.SpyObj<MoviesStorageService>;

    beforeEach(async () => {

        moviesStorageService = jasmine.createSpyObj('MoviesStorageService', ['getTopRatedMovies']);

        await TestBed.configureTestingModule({
            declarations: [
                CatalogComponent,
                MockComponent(MovieComponent),
                LoadingSpinnerComponent
            ],
            providers: [

                { provide: MoviesStorageService, useValue: moviesStorageService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CatalogComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;

        const mockMovies: Movie[] = [
            new Movie(
                false,
                "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
                [18, 80],
                278,
                "en",
                "The Shawshank Redemption"
                ,
                "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope."
                ,
                140.311,
                "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
                "1994-09-23",
                "The Shawshank Redemption",
                false,
                8.709,
                25236
            ),
            new Movie(
                false,
                "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
                [18, 80],
                278,
                "en",
                "The Godfather"
                ,
                "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope."
                ,
                140.311,
                "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
                "1994-09-23",
                "The Shawshank Redemption",
                false,
                8.709,
                25236
            ),
        ];

        moviesStorageService.getTopRatedMovies.and.returnValue(of(mockMovies)); 
        fixture.detectChanges(); 
    });


    it('should create the catalog component', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should load movies correctly',()=>{

        let movieElements=el.queryAll(By.css('.movie'));

        expect(movieElements.length).toBe(2);
        expect(movieElements[0].componentInstance.index).toBe(0)
        expect(movieElements[0].componentInstance.movie.original_title).toBe('The Shawshank Redemption')
        expect(movieElements[1].componentInstance.movie.original_title).toBe('The Godfather')
    })

    it('should disable previous button if on first page',()=>{
        component.currentPageIndex=1;
        fixture.detectChanges();
        

        let btnElements = el.queryAll(By.css('.previous'));
        expect(btnElements[0].nativeElement.disabled).toBeTrue();
    })

    it('should disable previous button if on last page',()=>{
        component.totalNumberOfPages=4;
        component.currentPageIndex=component.totalNumberOfPages;
        fixture.detectChanges();
        
        let btnElements = el.queryAll(By.css('.next'));
        expect(btnElements[0].nativeElement.disabled).toBeTrue();
    })


    afterEach(() => {
        if (fixture) {
            fixture.destroy();
        }
    });

});