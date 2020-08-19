import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ServiceRequestAccepted } from './service-request-accepted';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestAcceptedService {

  baseUri: string = 'http://localhost:3000';
  serviceRequestAccepted: ServiceRequestAccepted[];

  constructor(private http: HttpClient) { }

  addServiceRequestAccepted(serviceRequestAccepted: ServiceRequestAccepted): Observable<ServiceRequestAccepted[]> {
    const url = `${this.baseUri}/servicerequestacc/add`;
    return this.http.post<ServiceRequestAccepted[]>(url, serviceRequestAccepted);
  }

  getServiceRequestAccepted(): Observable<ServiceRequestAccepted[]> {
    const url = `${this.baseUri}/servicerequestacc`;
    return this.http.get<ServiceRequestAccepted[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
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

