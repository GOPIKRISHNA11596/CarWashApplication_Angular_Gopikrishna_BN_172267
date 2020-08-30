import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { OrderAccepted } from './order-accepted';

@Injectable({
  providedIn: 'root'
})
export class OrderAcceptedService {

  baseUri: string = 'http://localhost:3000';
  orderAccepted: OrderAccepted[];

  constructor(private http: HttpClient) { }

  addOrderAccepted(orderAccepted: OrderAccepted): Observable<OrderAccepted[]> {
    const url = `${this.baseUri}/orderaccepted/add`;
    return this.http.post<OrderAccepted[]>(url, orderAccepted);
  }

  getOrderAccepted(): Observable<OrderAccepted[]> {
    const url = `${this.baseUri}/orderaccepted`;
    return this.http.get<OrderAccepted[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getOrderAcceptedByBookingId(bookingID: number): Observable<OrderAccepted | undefined> {
    return this.getOrderAccepted()
      .pipe(
        map((data: OrderAccepted[]) => data.find(p => p.bookingID === bookingID))
      );
  }


    // tslint:disable-next-line: typedef
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
