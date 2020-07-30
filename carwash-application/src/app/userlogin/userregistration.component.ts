import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from './user.service';
import { User } from './user';


@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})

export class UserregistrationComponent implements OnInit {

  pageTitle : string ='Register';

  constructor(private userService : UserService,
              private router : Router,
              private formBuilder: FormBuilder) { }

  addForm: FormGroup;
  submitted = false;
  check=false;
  register:User=new User();

  //Error Messages for validation
  account_validation_messages = {
    'firstName': [
		  { type: 'required', message: 'First Name is required' }
    ],
    'lastName': [
		  { type: 'required', message: 'Last Name is required' }
		],
		'username': [
		  { type: 'required', message: 'Username is required' },
		  { type: 'minlength', message: 'Username must be at least 3 characters long' },
		  { type: 'maxlength', message: 'Username cannot be more than 20 characters long' },
		  { type: 'validUsername', message: 'Your username has already been taken' }
    ],
    'contactNo': [
		  { type: 'required', message: 'Contact No is required' },
		  { type: 'pattern', message: 'Mobile number should start with 9/8/7/6 and of 10 digits' }
		],
		'email': [
		  { type: 'required', message: 'Email is required' },
		  { type: 'pattern', message: 'Enter a valid email (anything@domain.com)' }
    ],
    'password': [
		  { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be atleast 8 characters long' },
		  { type: 'maxlength', message: 'Password cannot be more than 20 characters long' },
		  { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase and one number' }
		],
		'confirmPassword': [
      { type: 'required', message: 'Confirm password is required' },
      { type: 'minlength', message: 'Confirm password must be atleast 8 characters long' },
		  { type: 'maxlength', message: 'Confirm password cannot be more than 20 characters long' },
		  { type: 'pattern', message: 'Your Confirm password must contain at least one uppercase, one lowercase and one number' },
		  { type: 'areEqual', message: 'Password and Confirm password mismatch' }
		]
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
        firstName : ['', Validators.required],
        lastName : ['', Validators.required],
        email : ['',  [ Validators.required,
                        Validators.pattern('[a-zA-Z0-9_.+-]+@gmail.com+$')]],
        contactNo : ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),
                          Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
        username:['', [Validators.required,Validators.maxLength(20),Validators.minLength(3)] ],
        password :['', [ Validators.required,Validators.maxLength(15),Validators.minLength(8),
                         Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')] ],
        confirmPassword:['', [ Validators.required, Validators.maxLength(15),Validators.minLength(8),
                               Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')] ]
      });
  }

  onSubmit(){
    //For My refernce
    console.log(this.addForm.value);
    this.submitted = true;

    if(this.addForm.valid === false){
        alert('Enter Valid Data')
    }
    if(this.addForm.valid === true){
      alert('Registration Successfull')
  }

    if(this.addForm.valid){
      console.log('Validated');
      this.userService.addUser(this.addForm.value)
      .subscribe( data => {
      console.log(data);
      this.router.navigate(['/userlogin']);
      });
      this.check=true;
    }
  }




}
