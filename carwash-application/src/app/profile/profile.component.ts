import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/Router';
import { UserService } from '../userlogin/user.service';
import { WasherService } from '../washer/washer.service';
import { AdminService } from '../admin/admin.service';
import { Washer } from '../washer/washer';
import { User } from './../userlogin/user';
import { Admin } from './../admin/admin';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User | undefined;
  washer: Washer | undefined;
  admin: Admin | undefined;
  userget: User = new User();
  washerget: Washer = new Washer();
  editForm: FormGroup;
  editWasherForm: FormGroup;
  submitted = false;
  check = false;

  //Error Messages for validation
  account_validation_messages = {
    firstName: [
      { type: 'required', message: 'First Name is required' }
    ],
    lastName: [
      { type: 'required', message: 'Last Name is required' }
    ],
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 3 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    contactNo: [
      { type: 'required', message: 'Contact No is required' },
      { type: 'pattern', message: 'Mobile number should start with 9/8/7/6 and of 10 digits' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email (anything@domain.com)' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be atleast 8 characters long' },
      { type: 'maxlength', message: 'Password cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase and one number' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'minlength', message: 'Confirm password must be atleast 8 characters long' },
      { type: 'maxlength', message: 'Confirm password cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your Confirm password must contain at least one uppercase, one lowercase and one number' },
      { type: 'areEqual', message: 'Password and Confirm password mismatch' }
    ]
  };

  account_validation_messages_washer = {
    Name: [
      { type: 'required', message: 'Name is required' }
    ],
    company: [
      { type: 'required', message: 'Company Name is required' }
    ],
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 3 characters long' },
      { type: 'maxlength', message: 'Username cannot be more than 20 characters long' },
      { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    contactNo: [
      { type: 'required', message: 'Contact No is required' },
      { type: 'pattern', message: 'Mobile number should start with 9/8/7/6 and of 10 digits' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email (anything@domain.com)' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be atleast 8 characters long' },
      { type: 'maxlength', message: 'Password cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase and one number' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'minlength', message: 'Confirm password must be atleast 8 characters long' },
      { type: 'maxlength', message: 'Confirm password cannot be more than 20 characters long' },
      { type: 'pattern', message: 'Your Confirm password must contain at least one uppercase, one lowercase and one number' },
      { type: 'areEqual', message: 'Password and Confirm password mismatch' }
    ]
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
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
    this.formValidatingUser();
    this.formValidatingWasher();
  }

  // tslint:disable-next-line: typedef
  formValidatingUser(){
    this.editForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['',  [ Validators.required,
                      Validators.pattern('[a-zA-Z0-9_.+-]+@gmail.com+$')]],
      contactNo : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
                        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)] ],
      password : ['', [ Validators.required, Validators.maxLength(15),Validators.minLength(8),
                       Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')] ],
      confirmPassword: ['', [ Validators.required, Validators.maxLength(15),Validators.minLength(8),
                             Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')] ]
    });
  }

  // tslint:disable-next-line: typedef
  formValidatingWasher(){
    this.editWasherForm = this.formBuilder.group({
      Name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['',  [ Validators.required,
                      Validators.pattern('[a-zA-Z0-9_.+-]+@gmail.com+$')]],
      contactNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
                        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)] ],
      password: ['', [ Validators.required, Validators.maxLength(15), Validators.minLength(8),
                       Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')] ],
      confirmPassword: ['', [ Validators.required, Validators.maxLength(15), Validators.minLength(8),
                             Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')] ]
    });
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

  // tslint:disable-next-line: typedef
  onUserEditButtonPressed(username: string){
    console.log(username);
    this.userService.getUser(username)
    .subscribe(data => {
     this.userget = data;
    });
  }

  // tslint:disable-next-line: typedef
  updateUser(username: string){
    console.log(username);
    if (this.editForm.valid){
      console.log('Validated');
      this.userService.editUser(this.editForm.value, username)
      .subscribe( data => {
      console.log(data);
      });
      this.check = true;
    }
  }

  // tslint:disable-next-line: typedef
  onWasherEditButtonPressed(username: string){
    this.washerService.getWasher(username)
    .subscribe(data => {
     this.washerget = data;
    });

  }

  // tslint:disable-next-line: typedef
  updateWasher(uname: string){
    console.log(uname);
    if (this.editWasherForm.valid){
      console.log('Validated');
      this.washerService.editWasher(this.editWasherForm.value, uname)
      .subscribe( data => {
      console.log(data);
      alert('Updated Successful');
      });
      this.check = true;
    }
  }

}
