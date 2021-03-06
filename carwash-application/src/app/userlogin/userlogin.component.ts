import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { User } from './user';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  pageTitle = 'Login';

  loginForm: FormGroup;
  submitted: boolean = false;
  check = true;
  user: User = new User();
  private isLogin: boolean = false;


  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  validationMessages = {
    username : [
    { type: 'required', message: 'Username is required' }
    ],
    password : [
    { type: 'required', message: 'Password is required' }
    ]
  };

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required ]],
      password: ['', [Validators.required]],
    });
  }
  // tslint:disable-next-line: typedef
  onLogin(){
    this.userService.authentication(this.loginForm.value)
    .subscribe( data => {
      console.log(data);
      if (data === true){
        this.check = true;
        localStorage.setItem('isuserlogin', 'true');
        localStorage.setItem('iswasherlogin', 'false');
        localStorage.setItem('isadminlogin', 'false');
        localStorage.setItem('type', 'ForUser');
        localStorage.setItem('username', this.user.username);

        console.log('Username : ' + localStorage.getItem('username'));
        console.log('Is User login : ' + localStorage.getItem('isuserlogin'));
        console.log('Is Washer login : ' + localStorage.getItem('iswasherlogin'));
        console.log('Is Admin login : ' + localStorage.getItem('isadminlogin'));


        alert('Your Login successfull');
        this.router.navigate(['/home']);
      }else{
        this.check = false;
      }
    });
  }
}
