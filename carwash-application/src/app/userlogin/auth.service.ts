import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  checkingstatus(): Observable<boolean>{
       if (localStorage.getItem('isuserlogin') === 'true'){
        return JSON.parse(localStorage.getItem('isuserlogin'));
       }else{
        return JSON.parse(localStorage.getItem('iswasherlogin'));
       }
    }



}
