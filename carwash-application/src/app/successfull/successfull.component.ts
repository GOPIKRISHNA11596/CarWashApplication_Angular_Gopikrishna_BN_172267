import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment/payment.service';
import { Payment } from '../payment/payment';
import { Router } from '@angular/Router';
import { Booking } from '../booking/booking';
import { BookingService } from '../booking/booking.service';
import { Car } from '../car/car';
import { CarService } from '../car/car.service';
import { CarServiceService } from '../car-service/car-service.service';
import { CarServiceModel } from '../car-service/car-service';
import { ServiceSelected } from '../carwashservice/service-selected';
import { ServiceSelectedService } from '../carwashservice/service-selected.service'
import { ServiceRequestService } from '../service-request/service-request.service';
import { ServiceRequest } from '../service-request/service-request';



@Component({
  selector: 'app-successfull',
  templateUrl: './successfull.component.html',
  styleUrls: ['./successfull.component.css']
})
export class SuccessfullComponent implements OnInit {

  serviceSelected: ServiceSelected = new ServiceSelected();
  car: Car = new Car();
  booking: Booking = new Booking();
  payment: Payment = new Payment();
  carServiceModel: CarServiceModel = new CarServiceModel();
  serviceRequest: ServiceRequest = new ServiceRequest();
  errorMessage = '';


  constructor(private paymentService: PaymentService,
              private bookingService: BookingService,
              private carService: CarService,
              private serviceSelectedService: ServiceSelectedService,
              private serviceRequestService: ServiceRequestService,
              private carServiceService: CarServiceService,
              private router: Router) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.paymentService.getPayment(username).subscribe({
      next : data => {
        this.payment = data;
      },
     error : err => this.errorMessage = err
    });
    this.readMethod(username);
  }

  // tslint:disable-next-line: typedef
  readMethod(username: string){

    this.carService.getCar(username).subscribe({
      next : data => {
        this.serviceRequest.car = data.carBrand;
        this.serviceRequest.carID = data.carID;
      },
     error : err => this.errorMessage = err
    });

    this.paymentService.getPayment(username).subscribe({
      next : data => {
        this.serviceRequest.amount = data.amount;
        console.log(this.serviceRequest.amount);
      },
     error : err => this.errorMessage = err
    });

    this.bookingService.getSchedule(username).subscribe({
      next : data => {
        this.serviceRequest.bookingID = data.bookingID;
        this.serviceRequest.username = data.username;
        this.serviceRequest.date = data.date;
        this.serviceRequest.time = data.time;
        this.serviceRequest.doorNumber = data.doorNumber;
        this.serviceRequest.street = data.street;
        this.serviceRequest.city = data.city;
        this.serviceRequest.district = data.district;
        this.serviceRequest.state = data.state;
        this.serviceRequest.pincode = data.pincode;
        this.serviceRequest.landmark = data.landmark;
      },
     error : err => this.errorMessage = err
    });

    this.serviceSelectedService.getServiceSelected(username).subscribe({
      next : data => {
        this.serviceRequest.packageID = data.packageID;
        this.getPackageName(data.packageID);
      },
     error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  getPackageName(id: number){
    this.carServiceService.getService(id).subscribe({
      next : data => {
        this.serviceRequest.packageName = data.packageName;
      },
     error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  executeAddServiceRequest(){
    this.serviceRequestService.addServiceRequest(this.serviceRequest)
    .subscribe(data => {
        console.log('Service Request Data : ' + data );
    });
    this.router.navigate(['/home']);
  }

}
