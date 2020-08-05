import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    isLogin = false;
    constructor(){}
    checkingstatus(): Observable<boolean>
    {
        return of(JSON.parse(localStorage.getItem('isLogin')));

    }
    logout(): void{
        localStorage.removeItem('isLogin');
        this.isLogin = false;
    }
    valid(): Observable<boolean>{
        localStorage.setItem('isLogin', JSON.stringify(true));
        this.isLogin = true;
        return of(true);
    }
}
