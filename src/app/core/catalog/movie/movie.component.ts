import { Component, EventEmitter, Input } from '@angular/core';
import { Movie } from './movie.model';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  @Input() movie:Movie;
  @Input() index:number;
  imgBaseUrl=environment.imgBasePath;
  constructor(private router:Router){}
}
