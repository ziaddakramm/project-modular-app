import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth-service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css'
})
export class AuthComponent {

    isLoginMode = true;


    isLoading = false;


    validEmail = true;


    error: string = '';




    constructor(private authService: AuthService, private router: Router) { }




    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {

        if (!form.valid) {
            return;
        }


        this.isLoading = true;


        const email = form.value.email;
        const password = form.value.password;


        let authObs: Observable<AuthResponseData>;



        if (!this.isLoginMode) {
            authObs = this.authService.signUp(email, password);
        }
        else {
            authObs = this.authService.login(email, password);
        }

        authObs.subscribe(
            {

                next: (response) => {



                    this.isLoading = false;


                    this.error = '';


                    this.router.navigate(['/catalog']);



                },

                error: (errorMessage) => {


                


                    this.error = errorMessage;

                    this.isLoading = false;
                }
            }
        );


        form.reset();
    }

}