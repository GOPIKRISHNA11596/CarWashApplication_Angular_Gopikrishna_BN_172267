import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from './admin.service';
import { Admin } from './admin';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  check = true;
  private isLogin: boolean = false;
  admin: Admin = new Admin();

  constructor(
    private adminService: AdminService,
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
    this.adminService.authentication(this.loginForm.value)
    .subscribe( data => {
      console.log(data);
      if (data === true){
        this.check = true;
        localStorage.setItem('isadminlogin', 'true');
        localStorage.setItem('isuserlogin', 'false');
        localStorage.setItem('iswasherlogin', 'false');
        localStorage.setItem('type', 'ForAdmin');
        localStorage.setItem('adminname', this.admin.username);

        console.log('Admin Name : ' + localStorage.getItem('adminname'));
        console.log('Admin Login Status : ' + localStorage.getItem('isadminlogin'));
        console.log('Washer Login Status : ' + localStorage.getItem('iswasherlogin'));
        console.log('User Login Status : ' + localStorage.getItem('isuserlogin'));

        alert('Your Admin Login successfull');
        this.router.navigate(['/home']);
      }else{
        this.check = false;
      }
    });
  }

}
