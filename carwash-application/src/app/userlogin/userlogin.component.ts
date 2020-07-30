import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
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
  submitted = false;


  constructor(
    private userService : UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
    //,private authenticationService: AuthenticationService,
    //private alertService: AlertService
  ) { }


  validationMessages = {
    'username': [
    { type: 'required', message: 'Username is required' }
    ],
    'password': [
    { type: 'required', message: 'Password is required' }
    ]
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required ]],
      password:['',[ Validators.required] ],
    });
  }

  // if(this.addForm.valid){
  //   console.log('Validated');
  //   this.userService.addUser(this.addForm.value)
  //   .subscribe( data => {
  //   console.log(data);
  //   });
  //   this.check=true;
  // }


  onSubmit(){
    console.log(this.loginForm.value);

    if(this.loginForm.valid){
       this.userService.authentication(this.loginForm.value)
        .subscribe( data => {
        console.log(data);
        this.router.navigate(['/home']);
        });
    }
  }

}
