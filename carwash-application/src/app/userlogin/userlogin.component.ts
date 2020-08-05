import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from './user.service';
import { User } from './user';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  pageTitle = 'Login';

  loginForm: FormGroup;
  submitted : boolean = false;
  check = true;
  user: User = new User();
  private isLogin: boolean = false;



  constructor(
    private userService : UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) { }


  validationMessages = {
    'username' : [
    { type: 'required', message: 'Username is required' }
    ],
    'password' : [
    { type: 'required', message: 'Password is required' }
    ]
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required ]],
      password:['',[ Validators.required] ],
    });
  }

  login(){
    this.submitted = false;
    this.user = new User();
  }



  onLogin(user, pass){
    this.userService.authentication(this.loginForm.value)
    .subscribe( data => {
      console.log(data);
      // if(this.loginForm.value){
        if(data==true){
        this.check = true;
        localStorage.setItem('islogin', "true");
        localStorage.setItem('type', "ForUser");
        localStorage.setItem('username', user);
        alert('Your Login successfull');
        this.router.navigate(['/home']);
      }else{
        this.check = false;
      }
    });
    //this.check = false;
  }

  loginStatus(){
    this.authService.valid().subscribe((data) => {
      (console.log(data),error=>console.error(error));
       this.isLogin = data
    });

  }
}

  // onSubmit(){
  //   console.log(this.loginForm.value);
  //   if(this.loginForm.valid){
  //       this.check = true;
  //       this.userService.authentication(this.loginForm.value)
  //       .subscribe( data => {
  //       console.log(data);
  //       alert('Login Successfull');
  //       this.router.navigate(['/home']);
  //       });
  //   }else{
  //     this.check = false;
  //     alert('Invalid username or password');
  //     this.router.navigate(['/userlogin']);
  //   }
  // }

