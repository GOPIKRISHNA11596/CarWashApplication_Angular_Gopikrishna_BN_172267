import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ServiceSelected } from './service-selected';

@Injectable({
  providedIn: 'root'
})
export class ServiceSelectedService {

  baseUri: string = 'http://localhost:3000';
  serviceSelected: ServiceSelected | undefined;

  constructor(private http: HttpClient) { }

  addServiceSelected(service: ServiceSelected): Observable<ServiceSelected[]> {
    const url = `${this.baseUri}/serviceselected/add`;
    return this.http.post<ServiceSelected[]>(url, service);
  }

  getServicesSelected(): Observable<ServiceSelected[]> {
    const url = `${this.baseUri}/serviceselected`;
    return this.http.get<ServiceSelected[]>(url).pipe(
        tap(),
        catchError(this.handleError)
      );
  }

  getServiceSelected(id: string): Observable<ServiceSelected | undefined> {
    return this.getServicesSelected()
      .pipe(
        map((service: ServiceSelected[]) => service.find(p => p.username === id))
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
