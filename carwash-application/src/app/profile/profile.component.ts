import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/Router';
import { UserService } from '../userlogin/user.service';
import { WasherService } from '../washer/washer.service';
import { AdminService } from '../admin/admin.service';
import { Washer } from '../washer/washer';
import { User } from './../userlogin/user';
import { Admin } from './../admin/admin';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User | undefined;
  washer: Washer | undefined;
  admin: Admin | undefined;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private washerService: WasherService,
              private adminService: AdminService) { }

  ngOnInit(): void {
    const uname =  localStorage.getItem('username');
    const wname =  localStorage.getItem('washername');
    const aname =  localStorage.getItem('adminname');

    const userlogin = localStorage.getItem('isuserlogin');
    const washerlogin = localStorage.getItem('iswasherlogin');
    const adminlogin = localStorage.getItem('isadminlogin');

    console.log('IsWasherLogin : ' + washerlogin);
    console.log('IsUserLogin : ' + userlogin);
    console.log('IsAdminLogin : ' + adminlogin);

    console.log('Username : ' + uname);
    console.log('Washername : ' + wname);
    console.log('Adminname : ' + aname);

    if (userlogin){
      this.getUser(uname);
    }
    if (washerlogin){
      this.getWasher(wname);
    }
    if (adminlogin){
      this.getAdmin(aname);
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
  readAdmin(){
    return localStorage.getItem('isadminlogin');
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

  // tslint:disable-next-line: typedef
  getAdmin(aname: string){
    this.adminService.getAdmin(aname).subscribe((data) => {
      this.admin = data;
    });
  }
}
