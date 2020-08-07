import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CarService } from './car.service';
import { Car } from './car';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {

  carForm: FormGroup;
  submitted = false;
  car: Car = new Car();

  constructor(private carService: CarService,
              private router: Router,
              private formBuilder: FormBuilder) { }

car_validation_messages = {
    carBrand : [{ type: 'required', message: 'Car Brand is required' }],
    carType: [{ type: 'required', message: 'Car ype is required' } ],
    year: [{ type: 'required', message: 'Year is required' },
             { type: 'minlength', message: 'Yar must be 4 numbers' },
             { type: 'maxlength', message: 'Year cannot be more than 4 numbers' }],
    color : [{ type: 'required', message: 'Color is required' }]
  }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      carBrand : ['', Validators.required],
      carType : ['', Validators.required],
      year : ['',  [ Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      color : ['', Validators.required],
    });
  }

  onSubmit(){
    this.submitted = true;
    this.car.username = localStorage.getItem('username');
    console.log(this.car);
    if (this.carForm.valid){
        this.carService.addCar(this.carForm.value)
        .subscribe( data => {
        console.log(data);
        alert('Car Details saved successfully');
        confirm('Choose th car service.');
        this.router.navigate(['/carservices']);
        });
    }
  }


}
