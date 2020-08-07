import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Washer } from './washer';

@Injectable({
  providedIn: 'root'
})
export class WasherService {

  baseUri:string = 'http://localhost:3000';
  washer: Washer[];

  constructor(private http: HttpClient) { }

  getWashers(): Observable<Washer[]> {

    let url = `${this.baseUri}/washers`;
    return this.http.get<Washer[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getWasher(id: string): Observable<Washer | undefined> {
    return this.getWashers()
      .pipe(
        map((washers: Washer[]) => washers.find(p => p.username === id))
      );
  }

  addWasher(washer : Washer[]): Observable<Washer[]> {
    let url = `${this.baseUri}/washers/register`;
    return this.http.post<Washer[]>(url, washer);
  }

  authentication(washer : Washer[]): Observable<Object> {
    let url = `${this.baseUri}/washers/authenticate`;
    return this.http.post<Object>(url, washer);
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
