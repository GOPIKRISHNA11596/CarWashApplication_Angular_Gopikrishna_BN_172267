import { User } from './../userlogin/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/Router';
import { UserService } from '../userlogin/user.service';
import { WasherService } from '../washer/washer.service';
import { Washer } from '../washer/washer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User | undefined;
  washer: Washer | undefined;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private washerService: WasherService) { }

  ngOnInit(): void {
    const uname =  localStorage.getItem('username');
    const wname =  localStorage.getItem('washername');
    const userlogin = localStorage.getItem('isuserlogin');
    const washerlogin = localStorage.getItem('iswasherlogin');
    console.log('IsWasherLogin : ' + washerlogin);
    console.log('IsUserLogin : ' + userlogin);
    console.log('Username : ' + uname);
    console.log('Washername : ' + wname);
    if (userlogin){
      this.getUser(uname);
    }
    if (washerlogin){
      this.getWasher(wname);
    }
  }

  // tslint:disable-next-line: typedef
  readWasher(){
    return localStorage.getItem('iswasherlogin');
  }

  // tslint:disable-next-line: typedef
  readUser(){
    return localStorage.getItem('isuserlogin');
  }

  // tslint:disable-next-line: typedef
  getUser(uname: string){
    this.userService.getUser(uname).subscribe((data) => {
      this.user = data;
    });
  }

  // tslint:disable-next-line: typedef
  getWasher(wname: string){
    this.washerService.getWasher(wname).subscribe((data) => {
      this.washer = data;
    });
  }

}
