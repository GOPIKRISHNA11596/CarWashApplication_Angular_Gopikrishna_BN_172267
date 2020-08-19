import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Admin } from './admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUri: string = 'http://localhost:3000';
  admin: Admin[];

  constructor(private http: HttpClient) { }

  authentication(admin: Admin[]): Observable<Object> {
    let url = `${this.baseUri}/admins/authenticate`;
    return this.http.post<Object>(url, admin);
  }

  getAdmins(): Observable<Admin[]> {

    let url = `${this.baseUri}/admins`;
    return this.http.get<Admin[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getAdmin(id: string): Observable<Admin | undefined> {
    return this.getAdmins()
      .pipe(
        map((admins: Admin[]) => admins.find(p => p.username === id))
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
