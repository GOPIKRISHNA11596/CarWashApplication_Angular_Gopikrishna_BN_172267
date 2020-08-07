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

  readWasher(){
    return localStorage.getItem('iswasherlogin');
  }

  // tslint:disable-next-line: typedef
  logout(){
    const r = confirm('Do you want to logout?');
    if (r === true){
    localStorage.setItem('isuserlogin', 'false');
    this.router.navigate(['/home']);
    }
  }

}
