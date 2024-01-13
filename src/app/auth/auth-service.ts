import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Route, Router } from "@angular/router";
import { environment } from "../../environments/environment";



export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind: string;
    registered?: boolean;
}


@Injectable({ providedIn: 'root' })
export class AuthService {

    private tokenExpirationTimer: any;


    user = new BehaviorSubject<User>(null);


    constructor(private http: HttpClient, private router: Router) { }
    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBvOQI0Uexokqm8JdBVBOf6VEwdPM7C6ek',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(

            catchError(this.handleError),
            tap(
                resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        resData.expiresIn)
                }
            )
        );
    }
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBvOQI0Uexokqm8JdBVBOf6VEwdPM7C6ek'
            ,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }

        ).pipe(
            catchError(this.handleError),
            tap(
                resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        resData.expiresIn)
                }
            ));
    }
    private handleError(errorRes: HttpErrorResponse) {

        let errorMessage: string = 'An unknown error occurred';


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
        const expDate = new Date(new Date().getTime() + +expiresIn * 10000);

        const user = new User(
            email,
            userId,
            token,
            expDate)


        this.user.next(user)


        this.autoLogout(+expiresIn * 1000);


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
}