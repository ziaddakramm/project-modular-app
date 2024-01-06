import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  {

  isAuthenticated=false;
  private userSubscription:Subscription;


  constructor(private authService:AuthService){}

  ngOnInit()
  {
      this.userSubscription=this.authService.user.subscribe(
          user => {
              this.isAuthenticated=!!user;
          }
      );
  
  }   

  onLogout()
  {
      this.authService.logout();
  }


  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();

 }

}
