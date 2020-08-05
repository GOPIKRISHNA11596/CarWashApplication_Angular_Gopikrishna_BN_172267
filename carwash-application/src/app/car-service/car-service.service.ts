import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { CarService } from './car-service';


@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  baseUri: string = 'http://localhost:3000';
  carService: CarService[];

  constructor(private http : HttpClient) { }


  getServices(): Observable<CarService[]> {
    let url = `${this.baseUri}/carservices`;
    return this.http.get<CarService[]>(url).pipe(
        // tap(data => console.log('All: ' + JSON.stringify(data))),
        tap(),
        catchError(this.handleError)
      );
  }

  getService(id: number): Observable<CarService | undefined> {
    return this.getServices()
      .pipe(
        map((service: CarService[]) => service.find(p => p.packageID === id))
      );
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
