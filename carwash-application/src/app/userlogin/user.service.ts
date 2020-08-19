import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUri: string = 'http://localhost:3000';
  user: User[];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {

    let url = `${this.baseUri}/users`;
    return this.http.get<User[]>(url).pipe(
        tap(data => data),
        catchError(this.handleError)
      );
  }

  getUser(id: string): Observable<User | undefined> {
    return this.getUsers()
      .pipe(
        map((users: User[]) => users.find(p => p.username === id))
      );
  }

  addUser(user : User[]): Observable<User[]> {
    let url = `${this.baseUri}/users/register`;
    return this.http.post<User[]>(url, user);
  }

 authentication(user: User): Observable<Object> {
  let url = `${this.baseUri}/users/authenticate`;
  return this.http.post<Object>(url, user);
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
