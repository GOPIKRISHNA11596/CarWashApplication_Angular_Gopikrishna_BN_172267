import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  checkingstatus(): Observable<boolean>{
       return JSON.parse(localStorage.getItem('isuserlogin'));
    }



}
