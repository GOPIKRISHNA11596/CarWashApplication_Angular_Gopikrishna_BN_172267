import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import {Car} from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUri: string = 'http://localhost:3000';
  car: Car[];

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    const url = `${this.baseUri}/cars`;
    return this.http.get<Car[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getCar(id: string): Observable<Car | undefined> {
    return this.getCars()
      .pipe(
        map((cars: Car[]) => cars.find(p => p.username === id))
      );
  }

  // addCar(car: Car[]): Observable<Car[]> {
  addCar(car: Car[]): Observable<Car[]> {
    const url = `${this.baseUri}/cars/add`;
    // const formdata: FormData = new FormData();
    // formdata.append('file', car);
    return this.http.post<Car[]>(url, car);
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
