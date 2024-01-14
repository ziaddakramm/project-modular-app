import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth-service';
import { environment } from '../../../environments/environment';
import { MoviesStorageService } from '../movies-service/movies-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isAuthenticated = false;
  private userSubscription: Subscription;
  language= true;



  constructor(private authService: AuthService, private moviesService: MoviesStorageService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
      }
    );

  }

  onLogout() {
    this.authService.logout();
  }

  onToggleLanguage() {
    this.language=!this.language;
    if (this.language) {
      this.moviesService.languageSubject.next('en-Us');
    }
    else {
      this.moviesService.languageSubject.next('ar');
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();

  }

}
