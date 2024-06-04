import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpAngularService {
  private _headers: { [key: string]: string } = {};

  get headers() {
    return { ...this._headers};
  }

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}
  get<T>(url: string, params?: any): Observable<T> {
    const options = {headers: {}, params: params}
    return this.httpClient
    .get<T>(url, options)
      .pipe(
        catchError(error => { 
          console.log(error);
          return throwError(error); // Перенаправляем ошибку обратно в поток
        }),
      );
  }

  post<T>(url: string, body?: any, headers?: any): Observable<T> {
    return this.httpClient
      .post<T>(url, body, { headers: headers })
      .pipe(
        catchError(error => { 
        console.log(error);
        return throwError(error);
        }),
      );
  }

  put<T>(url: string, body?: any, headers?: any): Observable<T> {
    return this.httpClient.put<T>(url, body, { headers: headers }).pipe(
      catchError(error => { 
      console.log(error);
      return throwError(error);
      }),
    );
  }
  putFile<T>(url: string, body?: any, headers?: any): Observable<T> {
    return this.httpClient.put<T>(url, body, { headers: headers }).pipe(
      catchError(error => { 
      console.log(error);
      return throwError(error);
      }),
    );
  }
  delete<T>(url: string, params?: any): Observable<T> {
    const options = {headers: {}, params: params}
    return this.httpClient.delete<T>(url, options);
  }
}
