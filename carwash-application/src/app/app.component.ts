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

  read()
  {
    return localStorage.getItem('islogin');
  }
  logout(){
    localStorage.setItem('islogin',"false");
    alert('Do you want to logout?');
    this.router.navigate(['/home']);

  }

}
