import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../userlogin/user';
import { UserService } from '../userlogin/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {


  userget: User = new User();
  users: User[] | undefined;
  editForm: FormGroup;
  submitted = false;
  check = false;

  errorMessage = '';
  pageTitle = 'Customer Details';

  @Output() aftterDelete: EventEmitter<any>  = new EventEmitter();

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

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAllUserData();
    this.formValidating();
  }

  formValidating(){
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
  getAllUserData(){
    this.userService.getUsers().subscribe({
      next : data => {
         this.users = data;
      },
     error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  onDelete(username: string): void {
    const r = confirm('Do you want to delete user ' + username);
    if (r === true){
    this.userService.deleteUser(username)
      .subscribe( data => {
      console.log(data);
      this.getAllUserData();
      });
    this.aftterDelete.emit();
    }
  }

  // tslint:disable-next-line: typedef
  onEditButtonPressed(username: string){
    this.userService.getUser(username)
    .subscribe(data => {
     this.userget = data;
     console.log(this.userget.username);
    });
  }

  // tslint:disable-next-line: typedef
  updateUser(uname: string){
    console.log(uname);
    if (this.editForm.valid){
      console.log('Validated');
      this.userService.editUser(this.editForm.value, uname)
      .subscribe( data => {
      console.log(data);
      });
      this.check = true;
    }
  }

}
