import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/Router';
import { Car } from '../car/car';
import { CarService } from '../car/car.service';
import { UserService } from '../userlogin/user.service';
import { User } from './../userlogin/user';


@Component({
  selector: 'app-service-request-description',
  templateUrl: './service-request-description.component.html',
  styleUrls: ['./service-request-description.component.css']
})
export class ServiceRequestDescriptionComponent implements OnInit {

  user: User = new User();
  car: Car = new Car();
  errorMessage = '';
  check: string;

  constructor(private carService: CarService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    if (isNaN (+this.route.snapshot.paramMap.get('id'))){
      const username  = this.route.snapshot.paramMap.get('id');
      this.getUserData(username);
      this.check = 'true';
    }else{
      const carid: number = +this.route.snapshot.paramMap.get('id');
      this.getCarData(carid);
      this.check = 'false';
    }

    // console.log('carid ngonInit : ' + carid);
    // console.log('username ngonInit : ' + username);

    // if (this) {
    //   const id = +carid; //Converting String(carid) to number(id);
    //   this.getCarData(id);
    // }
    // if (username){
    //   this.getUserData(username);
    // }
  }

  // tslint:disable-next-line: typedef
  getCarData(id: number) {
    console.log('Car ID : ' + id);
    this.carService.getCarByID(id).subscribe({
      next : data => {
        console.log(data);
        this.car = data;
      },
     error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  getUserData(username: string){
    console.log('username : ' + username);
    this.userService.getUser(username).subscribe({
      next : data => {
        console.log(data);
        this.user = data;
      },
     error : err => this.errorMessage = err
    });
  }


}
