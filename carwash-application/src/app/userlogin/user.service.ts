import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUri = 'http://localhost:3000';
  // user: User[];
  user: User = new User();

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

  addUser(user: User[]): Observable<User[]> {
    const url = `${this.baseUri}/users/register`;
    return this.http.post<User[]>(url, user);
  }

  deleteUser(id: string): Observable<User> {
    console.log(id);
    const url = `${this.baseUri}/users/${id}`;
    return this.http.delete<User>(url);
  }

  editUser(user: User, uname: string): Observable<User>{
    console.log(uname);
    const url = `${this.baseUri}/users/${uname}`;
    return this.http.put<User>(url, user);
  }

  authentication(user: User): Observable<Object> {
  const url = `${this.baseUri}/users/authenticate`;
  return this.http.post<Object>(url, user);
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
