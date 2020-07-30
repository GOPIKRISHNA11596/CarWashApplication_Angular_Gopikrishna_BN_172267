import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 // private userUrl = 'assets/api/books/books.json';
  baseUri:string = 'http://localhost:3000';

  constructor(private http : HttpClient) { }

  getUsers(): Observable<User[]> {
    let url = `${this.baseUri}/users`;
     //return this.http.get<Book[]>(this.userUrl).pipe(
    return this.http.get<User[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getUser(id: string): Observable<User | undefined> {
    return this.getUsers()
      .pipe(
        map((books: User[]) => books.find(p => p.username === id))
      );
  }

  addUser(user : User[]): Observable<User[]> {
    let url = `${this.baseUri}/users/register`;
    return this.http.post<User[]>(url, user);

 }

 authentication(user : User[]): Observable<User[]> {
  let url = `${this.baseUri}/users/authenticate`;
  return this.http.post<User[]>(url, user);
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
