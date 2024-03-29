import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Route, Router } from "@angular/router";
import { environment } from "../../environments/environment";





export interface AuthResponseData {
    access_token: string;
    email: string;
    expiration: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {

    private tokenExpirationTimer: any;


    user = new BehaviorSubject<User>(null);

    private token:string;

 

    constructor(private http: HttpClient, private router: Router) { }
    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            // "http://localhost:8080/api/auth/register",
            environment.fireBaseSignUpUrl,
            {
                email: email,
                password: password,
            }
        ).pipe(

            catchError(this.handleError),
            tap(
                resData => {
                    this.handleAuthentication(
                        resData.email,
                        null,
                        resData.access_token,
                        resData.expiration
                        );
                        this.token=resData.access_token;
                }

            )
        );
    }
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            // "http://localhost:8080/api/auth/authenticate",
            environment.fireBaseLogInUrl,
            {
                email: email,
                password: password,
            }

        ).pipe(
            catchError(this.handleError),
            tap(
                resData => {
                    this.handleAuthentication(
                        resData.email,
                        null,
                        resData.access_token,
                        resData.expiration);

                    this.token=resData.access_token;
                }
            ));
    }
    private handleError(errorRes) {

        let errorMessage: string = 'An unknown error occurred';
        errorMessage=errorRes["error"]['message'];

        if (!errorRes.error || !errorRes.error.error) {
            
            return throwError(() => errorMessage)
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email does not exist';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'invalid password or email';
                break;
        }
        return throwError(() => errorMessage)
    }


    private handleAuthentication(email: string, userId: string, token: string, expiresIn: string) {
        const expDate = new Date(new Date().getTime() + +expiresIn );

        const user = new User(
            email,
            userId,
            token,
            expDate)


        this.user.next(user)


        this.autoLogout(+expiresIn );


        localStorage.setItem('userData', JSON.stringify(user));

    }

    autoLogin() {


        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));




        if (!userData) {
            return;
        }


        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );



        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }

    }


    logout() {

        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
    }



    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {

            this.logout();
        }, expirationDuration)


    }


    public getToken()
    {
        return this.token;
    }

}