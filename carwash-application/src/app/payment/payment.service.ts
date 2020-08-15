import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Payment } from './payment';
;
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUri: string = 'http://localhost:3000';
  payment: Payment[];

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    const url = `${this.baseUri}/payments`;
    return this.http.get<Payment[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getPayment(id: string): Observable<Payment | undefined> {
    return this.getPayments()
      .pipe(
        map((cars: Payment[]) => cars.find(p => p.username === id))
      );
  }

  addPayment(payment: Payment[]): Observable<Payment[]> {
    const url = `${this.baseUri}/payments/add`;
    return this.http.post<Payment[]>(url, payment);
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
