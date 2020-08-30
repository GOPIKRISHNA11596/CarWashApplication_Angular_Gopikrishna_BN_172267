import { Car } from './../car/car';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceRequest} from './service-request';
import { ServiceRequestService } from './service-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from '../car/car.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarServiceModel } from '../car-service/car-service';
import { CarServiceService } from '../car-service/car-service.service';
import { ServiceSelectedService } from '../carwashservice/service-selected.service';
import { ServiceSelected } from '../carwashservice/service-selected';
import { OrderAcceptedService } from './order-accepted.service';
import { OrderAccepted } from './order-accepted';




@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})

export class ServiceRequestComponent implements OnInit {

  pageTitle: string = 'Customer Requests';
  carServices: CarServiceModel[];
  carServiceModel: CarServiceModel = new CarServiceModel();
  serviceRequests: ServiceRequest[];
  serviceRequest: ServiceRequest = new ServiceRequest();
  errorMessage = '';
  car: Car = new Car();
  cars: Car;
  orderAccept: OrderAccepted = new OrderAccepted();
  serviceSelecteds: ServiceSelected;
  serviceSelected: ServiceSelected = new ServiceSelected();
  carForm: FormGroup;
  submitted = false;
  check: boolean = true;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  @Output() afterDelete: EventEmitter<any> = new EventEmitter();
  @Output() accept: EventEmitter<any> = new EventEmitter();


  car_validation_messages = {
    carBrand : [{ type: 'required', message: 'Car Brand is required' }],
    carType: [{ type: 'required', message: 'Car ype is required' } ],
    year: [{ type: 'required', message: 'Year is required' },
             { type: 'minlength', message: 'Yar must be 4 numbers' },
             { type: 'maxlength', message: 'Year cannot be more than 4 numbers' }],
    color : [{ type: 'required', message: 'Color is required' }]
  };

  constructor(private serviceRequestService: ServiceRequestService,
              private carService: CarService,
              private carServiceService: CarServiceService,
              private serviceSelectedService: ServiceSelectedService,
              private orderAcceptedService: OrderAcceptedService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log('readWasher() :' + this.readWasher());
    console.log('readUser() :' + this.readUser());
    console.log('readUsername() :' + this.readUserName());

    if (this.readWasher() === 'true'){
      console.log('getServiceRequest()');
      this.serviceRequestService.getServiceRequest().subscribe({
        next : data => {
          this.serviceRequests = data;
        }
      });
    }
    if (this.readUser() === 'true'){
      this.getAllServiceDataForUser();
    }
    const carID  = this.route.snapshot.paramMap.get('id');

    this.carFormValidating();
  }

  // tslint:disable-next-line: typedef
  carFormValidating(){
    this.carForm = this.formBuilder.group({
      username : [localStorage.getItem('username'), Validators.required],
      carBrand : ['', Validators.required],
      carType : ['', Validators.required],
      year : ['',  [ Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      color : ['', Validators.required],
      carImage : [null]
    });
  }
  // tslint:disable-next-line: typedef
  getAllServiceDataForUser(){
    console.log('getServiceRequestsByUsername()');
    this.serviceRequestService.getServiceRequestsByUsername(this.readUserName())
    .subscribe({
      next : data => {
        this.serviceRequests = data;
        }
    });
  }

  // tslint:disable-next-line: typedef
  onAccept(){
    alert('Customer Request Accepted.');
    this.afterAccept();
  }


  // tslint:disable-next-line: typedef
  afterAccept(){
    this.getLoggedInName.emit();
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
  readUserName(){
    return localStorage.getItem('username').toString();
  }

  // tslint:disable-next-line: typedef
  onDelete(bookingID: number){
    const r = confirm('Do you want to delete booking with ID ' + bookingID);
    if (r === true){
    this.serviceRequestService.deleteServiceRequest(bookingID)
      .subscribe( data => {
      console.log(data);
      this.getAllServiceDataForUser();
      });
    this.afterDelete.emit();
    }
  }

  // tslint:disable-next-line: typedef
  onEditButtonPressed(bookingID: number){
    this.serviceRequestService.getServiceRequestByBookingId(bookingID)
    .subscribe(data => {
     this.serviceRequest = data;
     console.log(this.serviceRequest.username);
    });
  }

  // tslint:disable-next-line: typedef
  updateServiceRequest(bookingID: number){
    console.log(bookingID);
    this.serviceRequestService.editServiceRequest(this.serviceRequest, bookingID)
    .subscribe( data => {
      console.log(data);
      alert('Updated Successful');
      });
    this.afterDelete.emit();
  }

  // tslint:disable-next-line: typedef
  onCarEditButtonPressed(carID){
    console.log(carID);
    this.carService.getCarByID(carID)
    .subscribe(data => {
     this.car = data;
     console.log(this.car);
    });
  }

  // tslint:disable-next-line: typedef
  updateCar(carID: number){
    console.log(carID);

    if (this.carForm.valid){
      this.carService.editCar(this.carForm.value, carID)
      .subscribe( data => {
      console.log(data);
      alert('Car details updated successfully');
      });

      console.log(this.carForm.get('carBrand').value);

      this.serviceRequestService.editServiceRequestByCarID(this.carForm.get('carBrand').value, carID)
      .subscribe( data => {
        console.log(data);
      });
    }
  }

  // tslint:disable-next-line: typedef
  onPackageEditButtonPressed(packageName: string){
    console.log(packageName);
    this.carServiceService.getServices().subscribe({
      next : services => {
        this.carServices = services;
      },
      error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  UpdateServiceForUser(packageID: number , carID: number){
    console.log('packageID : ' + packageID);
    this.serviceSelected.packageID = packageID;
    this.serviceSelected.carID = carID;
    this.serviceSelected.username = localStorage.getItem('username').toString();
    console.log('this.serviceSelected.packageID : ' + this.serviceSelected.packageID);
    console.log('carID : ' + carID);
    this.serviceSelectedService.editServiceSelected(this.serviceSelected, carID)
    .subscribe( data => {
      console.log(data);
      alert('Package updated successfully');
      });
    this.afterDelete.emit();

  }

  // tslint:disable-next-line: typedef
  orderAccepted(username: string, bookingID: number){

    this.orderAccept.bookingID = bookingID;
    this.orderAccept.username = username;
    this.orderAccept.isAccepted = true;

    this.orderAcceptedService.addOrderAccepted(this.orderAccept)
    .subscribe( data => {
      console.log(data);
      });
      
    // localStorage.setItem('orderAccepted', 'true');
    // localStorage.setItem('orderAcceptedForUsername', username);
    // localStorage.setItem('orderAcceptedForBookingID', bookingID.toString());
    // this.check = false;
    // this.accept.emit();
  }

}

