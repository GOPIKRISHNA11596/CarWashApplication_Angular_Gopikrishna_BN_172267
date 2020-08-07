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
  user : User | undefined;
  washer : Washer | undefined;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private washerService: WasherService) { }


  ngOnInit(): void {
    const uname =  localStorage.getItem('username');
    const userlogin = localStorage.getItem('isuserlogin');
    const washerlogin = localStorage.getItem('iswasherlogin');
    console.log('Username : ' + uname);
    this.getUser(uname);

    // if(userlogin){
    //   this.getUser(uname);
    // }
    // if(washerlogin){
    //   this.getWasher(uname);
    // }

  }

  getUser(uname:string){
    this.userService.getUser(uname).subscribe((data)=>{
      this.user = data;
    })
  }

  getWasher(uname:string){
    this.washerService.getWasher(uname).subscribe((data)=>{
      this.washer = data;
    })
  }
}
