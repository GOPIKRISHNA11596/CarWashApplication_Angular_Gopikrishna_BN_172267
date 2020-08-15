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
  url = '';

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
  };

  ngOnInit(): void {
    const formData = new FormData();
    this.carForm = this.formBuilder.group({
      username : [localStorage.getItem('username'), Validators.required],
      carBrand : ['', Validators.required],
      carType : ['', Validators.required],
      year : ['',  [ Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      color : ['', Validators.required],
      carImage : [null]
    });
  }

  selectedFiles: FileList;
  currentFileUpload : File;

  // // tslint:disable-next-line: typedef
  // selectFile(event){
  //   this.selectedFiles = event.target.files;
  // }

  selectFile(event){
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event : any) => {
        this.url = event.target.result;
      };
    }
  }


  // tslint:disable-next-line: typedef
  onSubmit(){
    // this.currentFileUpload = this.selectedFiles.item(0);
    this.submitted = true;
    this.car.carImage = this.url;
    this.car.username = localStorage.getItem('username');
    if (this.carForm.valid){
        this.carService.addCar(this.carForm.value)
        .subscribe( data => {
        console.log(data);
        alert('Car Details saved successfully');
        confirm('Choose th car service.');
        this.router.navigate(['/carwashservices']);
        });
    }
    console.log(this.car);
  }


}
