import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/Router';
import { CarService } from '../car/car.service';
import { Car } from './../car/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  carget: Car = new Car();
  cars: Car;
  carForm: FormGroup;
  submitted = false;

  car_validation_messages = {
    username: [{ type: 'required', message: 'Username is required' },
                { type: 'minlength', message: 'Username must be at least 3 characters long' },
                { type: 'maxlength', message: 'Username cannot be more than 20 characters long' },
                { type: 'validUsername', message: 'Your username has already been taken' }],
    carBrand : [{ type: 'required', message: 'Car Brand is required' }],
    carType: [{ type: 'required', message: 'Car ype is required' } ],
    year: [{ type: 'required', message: 'Year is required' },
             { type: 'minlength', message: 'Yar must be 4 numbers' },
             { type: 'maxlength', message: 'Year cannot be more than 4 numbers' }],
    color : [{ type: 'required', message: 'Color is required' }]
  };

  constructor(private carService: CarService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('id');
    console.log(username);
      // tslint:disable-next-line: typedef
    this.carService.getCar(username).subscribe({
      next : carDetails => {
        this.carget = carDetails;
      }
    });
    this.formValidating();
  }

  // tslint:disable-next-line: typedef
  formValidating(){
    this.carForm = this.formBuilder.group({
      username : ['', Validators.required],
      carBrand : ['', Validators.required],
      carType : ['', Validators.required],
      year : ['',  [ Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      color : ['', Validators.required],
      carImage : [null]
    });

  }

  // tslint:disable-next-line: typedef
  onEditButtonPressed(carID: number){
    console.log(carID);
    this.carService.getCarByID(carID)
    .subscribe(data => {
     this.carget = data;
    });
  }

  // tslint:disable-next-line: typedef
  updateCar(carID: number){
    console.log(carID);
    console.log(this.carForm.value);
    if (this.carForm.valid){
      console.log('Validated');
      this.carService.editCar(this.carForm.value, carID)
      .subscribe( data => {
      console.log(data);
      });
    }
  }

  // tslint:disable-next-line: typedef
  addCar(username: string){
    console.log(this.carForm.value);
    if (this.carForm.valid){
      console.log('Validated');
      this.carService.addCar(this.carForm.value)
      .subscribe( data => {
      console.log(data);
      alert('Car added successfully to user ' + username );
      });
    }
  }


}
