import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { CarServiceModel } from './car-service';


@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  baseUri: string = 'http://localhost:3000';
  carService: CarServiceModel[];

  constructor(private http: HttpClient) { }


  getServices(): Observable<CarServiceModel[]> {
    const url = `${this.baseUri}/carservices`;
    return this.http.get<CarServiceModel[]>(url).pipe(
        // tap(data => console.log('All: ' + JSON.stringify(data))),
        tap(),
        catchError(this.handleError)
      );
  }

  getService(id: number): Observable<CarServiceModel | undefined> {
    return this.getServices()
      .pipe(
        map((service: CarServiceModel[]) => service.find(p => p.packageID === id))
      );
  }


  getServiceByUserName(username: string): Observable<CarServiceModel | undefined> {
    return this.getServices()
      .pipe(
        map((service: CarServiceModel[]) => service.find(p => p.username === username))
      );
  }

  // tslint:disable-next-line: typedef
  addService(carServiceModel: CarServiceModel){
    const url = `${this.baseUri}/carservices/add`;
    return this.http.post<CarServiceModel>(url, carServiceModel);
  }

  editService(carServiceModel: CarServiceModel, packageID: number): Observable<CarServiceModel>{
    console.log(packageID);
    const url = `${this.baseUri}/carservices/${packageID}`;
    return this.http.put<CarServiceModel>(url, carServiceModel);
  }


  deleteService(id: number): Observable<CarServiceModel> {
    console.log(id);
    const url = `${this.baseUri}/carservices/${id}`;
    return this.http.delete<CarServiceModel>(url);
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
