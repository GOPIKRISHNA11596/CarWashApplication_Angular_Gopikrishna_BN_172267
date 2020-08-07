import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { WasherService } from './washer.service';
import { Washer } from './washer';

@Component({
  selector: 'app-washerlogin',
  templateUrl: './washerlogin.component.html',
  styleUrls: ['./washerlogin.component.css']
})
export class WasherloginComponent implements OnInit {
  pageTitle = 'Login';

  loginForm: FormGroup;
  submitted: boolean = false;
  check = true;
  washer: Washer = new Washer();
  private isLogin: boolean = false;

  constructor(
    private washerService: WasherService,
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
      this.washerService.authentication(this.loginForm.value)
      .subscribe( data => {
        console.log(data);
        if (data === true){
          this.check = true;
          localStorage.setItem('iswasherlogin', 'true');
          localStorage.setItem('type', 'ForUser');
          localStorage.setItem('washername', this.washer.username);
          console.log(localStorage.getItem('washername'));
          alert('Your Washer Login successfull');
          this.router.navigate(['/home']);
        }else{
          this.check = false;
        }
      });
    }

}
