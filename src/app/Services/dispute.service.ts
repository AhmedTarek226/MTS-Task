import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { IDispute } from '../Models/dispute';

@Injectable({
  providedIn: 'root',
})
export class DisputeService {
  // httpOptions: {};
  // token: string;
  constructor(private httpClient: HttpClient) {
    // this.token = JSON.parse(localStorage.getItem('token')!);
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: this.token,
    //   }),
    // };
  }
  getAllDisputes(rows: number, page: number): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.apiURL}/findDispute?page=${page}&size=${rows}`,
      {}
      // this.httpOptions
    );
  }

  getDisputeById(id: string): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.apiURL}/getDispute?disputeId=${id}`
      // this.httpOptions
    );
  }

  createDispute(newDispute: IDispute): Observable<any> {
    return this.httpClient
      .post<any>(
        `${environment.apiURL}/CreateDispute`,
        JSON.stringify(newDispute)
        // this.httpOptions
      )
      .pipe(
        retry(2),
        catchError(() => throwError(() => console.log('Error Occured')))
      );
  }
}
