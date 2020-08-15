import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'carwash-application';

  constructor(private router: Router){
  }


  // tslint:disable-next-line: typedef
  readUser(){
    return localStorage.getItem('isuserlogin');
  }
  // tslint:disable-next-line: typedef
  readWasher(){
    return localStorage.getItem('iswasherlogin');
  }


  // tslint:disable-next-line: typedef
  read(){
    if (localStorage.getItem('isuserlogin') == 'true'){
      return localStorage.getItem('isuserlogin');
    }else{
      return localStorage.getItem('iswasherlogin');
    }
  }

  // tslint:disable-next-line: typedef
  readWasherName(){
    return localStorage.getItem('washername');
  }

  // tslint:disable-next-line: typedef
  logout(){
    const r = confirm('Do you want to logout?');
    if (r === true){
    localStorage.setItem('iswasherlogin', 'false');
    localStorage.setItem('isuserlogin', 'false');
    console.log('After Logout');
    console.log('Washer Login Status : ' + localStorage.getItem('iswasherlogin'));
    console.log('User Login Status : ' + localStorage.getItem('isuserlogin'));
    this.router.navigate(['/home']);
    }
  }

}
