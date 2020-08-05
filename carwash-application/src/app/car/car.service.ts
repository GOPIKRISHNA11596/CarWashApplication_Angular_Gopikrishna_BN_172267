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

  constructor(private http : HttpClient) { }

  getCars(): Observable<Car[]> {

    let url = `${this.baseUri}/users`;
    return this.http.get<Car[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getCar(id: number): Observable<Car | undefined> {
    return this.getCars()
      .pipe(
        map((cars: Car[]) => cars.find(p => p.carID === id))
      );
  }

  addCar(car : Car[]): Observable<Car[]> {
    let url = `${this.baseUri}/cars/add`;
    return this.http.post<Car[]>(url, car);

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
