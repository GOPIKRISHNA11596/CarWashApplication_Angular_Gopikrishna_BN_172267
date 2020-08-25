import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ServiceRequest } from './service-request';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  baseUri: string = 'http://localhost:3000';
  serviceRequest: ServiceRequest[];

  constructor(private http: HttpClient) { }

  addServiceRequest(serviceRequest: ServiceRequest): Observable<ServiceRequest[]> {
    const url = `${this.baseUri}/servicerequests/add`;
    return this.http.post<ServiceRequest[]>(url, serviceRequest);
  }

  getServiceRequest(): Observable<ServiceRequest[]> {
    const url = `${this.baseUri}/servicerequests`;
    return this.http.get<ServiceRequest[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getServiceRequestsByUsername(username: string): Observable<ServiceRequest[]> {
    console.log('getServiceRequestsByUsername at service');
    const url = `${this.baseUri}/servicerequests/username/${username}`;
    return this.http.get<ServiceRequest[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getServiceRequestById(id: number): Observable<ServiceRequest | undefined> {
    return this.getServiceRequest()
      .pipe(
        map((data: ServiceRequest[]) => data.find(p => p.carID === id))
      );
  }

  getServiceRequestByBookingId(bookingID: number): Observable<ServiceRequest | undefined> {
    return this.getServiceRequest()
      .pipe(
        map((data: ServiceRequest[]) => data.find(p => p.bookingID === bookingID))
      );
  }

  getServiceRequestByName(username: string): Observable<ServiceRequest | undefined> {
    return this.getServiceRequest()
      .pipe(
        map((data: ServiceRequest[]) => data.find(p => p.username === username))
      );
  }

  editServiceRequest(serviceRequest: ServiceRequest, bookingID: number): Observable<ServiceRequest>{
    console.log(bookingID);
    const url = `${this.baseUri}/servicerequests/bookingID/${bookingID}`;
    return this.http.put<ServiceRequest>(url, serviceRequest);
  }

  // editServiceRequestByCarID(serviceRequest: ServiceRequest, carID: number): Observable<ServiceRequest>{
  //   console.log(carID);
  //   const url = `${this.baseUri}/servicerequests/${carID}`;
  //   return this.http.put<ServiceRequest>(url, serviceRequest);
  // }

  editServiceRequestByCarID(carBrand: ServiceRequest, carID: number): Observable<ServiceRequest>{
    console.log(carID);
    const url = `${this.baseUri}/servicerequests/carID/${carID}`;
    return this.http.put<ServiceRequest>(url, carBrand);
  }



  deleteServiceRequest(id: number): Observable<ServiceRequest> {
    console.log(id);
    const url = `${this.baseUri}/servicerequests/${id}`;
    return this.http.delete<ServiceRequest>(url);
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
