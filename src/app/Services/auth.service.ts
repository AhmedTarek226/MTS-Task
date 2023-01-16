import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { UserLogin } from '../Models/user-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpOptions: {};
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization: 'my-auth-token',
      }),
    };
  }

  login(user: UserLogin): Observable<any> {
    return this.httpClient
      .post(
        `${environment.apiURL}/checklogin`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(
        retry(2),
        catchError(() => throwError(() => console.log('Error Occured')))
      );
  }
}
