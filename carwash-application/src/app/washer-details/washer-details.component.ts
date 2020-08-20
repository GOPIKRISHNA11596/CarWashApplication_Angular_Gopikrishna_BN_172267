import { Washer } from './../washer/washer';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WasherService } from '../washer/washer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-washer-details',
  templateUrl: './washer-details.component.html',
  styleUrls: ['./washer-details.component.css']
})
export class WasherDetailsComponent implements OnInit {

  washers: Washer[];
  washerget: Washer = new Washer();
  editForm: FormGroup;
  submitted = false;
  check = false;

  errorMessage = '';
  pageTitle = 'Washer Details';

  @Output() aftterDelete: EventEmitter<any>  = new EventEmitter();

  account_validation_messages = {
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

  constructor(private washerService: WasherService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllWasherData();
    this.formValidating();
  }

  // tslint:disable-next-line: typedef
  formValidating(){
    this.editForm = this.formBuilder.group({
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
  getAllWasherData(){
    this.washerService.getWashers().subscribe({
      next : data => {
        this.washers = data;
      },
     error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  onDelete(username: string){
    const r = confirm('Do you want to delete user ' + username);
    if (r === true){
      this.washerService.deleteWasher(username)
        .subscribe( data => {
        console.log(data);
        this.getAllWasherData();
        });
      this.aftterDelete.emit();
    }
  }

  // tslint:disable-next-line: typedef
  onEditButtonPressed(username: string){
    this.washerService.getWasher(username)
    .subscribe(data => {
     this.washerget = data;
    });

  }

  // tslint:disable-next-line: typedef
  updateWasher(uname: string){
    console.log(uname);
    if (this.editForm.valid){
      console.log('Validated');
      this.washerService.editWasher(this.editForm.value, uname)
      .subscribe( data => {
      console.log(data);
      alert('Updated Successful');
      });
      this.check = true;
    }
  }

}
