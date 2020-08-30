import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { StarRating } from './star-rating';


@Injectable({
  providedIn: 'root'
})
export class StarRatingService {

  baseUri: string = 'http://localhost:3000';
  starRating: StarRating[];

  constructor(private http: HttpClient) { }

  getRatings(): Observable<StarRating[]> {
    const url = `${this.baseUri}/ratings`;
    return this.http.get<StarRating[]>(url).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        // tap(),
        catchError(this.handleError)
      );
  }

  getRating(BookingID: number): Observable<StarRating | undefined> {
    return this.getRatings()
      .pipe(
        map((ratings: StarRating[]) => ratings.find(p => p.bookingID === BookingID))
      );
  }

  addRating(starRating: StarRating[]): Observable<StarRating[]> {
    const url = `${this.baseUri}/ratings/add`;
    return this.http.post<StarRating[]>(url, starRating);
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
