import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})

export class BookingService {

  baseUri: string = 'http://localhost:3000';
  booking: Booking[];

  constructor(private http: HttpClient) { }

  getSchedules(): Observable<Booking[]> {
    const url = `${this.baseUri}/booking`;
    return this.http.get<Booking[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getSchedule(id: string): Observable<Booking | undefined> {
    return this.getSchedules()
      .pipe(
        map((bookings: Booking[]) => bookings.find(p => p.username === id))
      );
  }

  addSchedule(booking: Booking[]): Observable<Booking[]> {
    const url = `${this.baseUri}/booking/add`;
    return this.http.post<Booking[]>(url, booking);
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
