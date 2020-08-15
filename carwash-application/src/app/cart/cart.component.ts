import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { CarService } from '../car/car.service';
import { Car } from '../car/car';
import { ServiceSelectedService } from '../carwashservice/service-selected.service';
import { ServiceSelected } from '../carwashservice/service-selected';
import { CarServiceService } from '../car-service/car-service.service';
import { CarServiceModel } from '../car-service/car-service';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/booking';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  serviceTax: number;
  total: number;
  packageId: number;
  car: Car = new Car();
  serviceSelected: ServiceSelected = new ServiceSelected();
  carServiceModel: CarServiceModel = new CarServiceModel();
  booking: Booking = new Booking();
  errorMessage = '';

  constructor(private carService: CarService,
              private router: Router,
              private serviceSelectedService: ServiceSelectedService,
              private carServiceService: CarServiceService,
              private bookingService: BookingService) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    console.log('At Cart : ' + username);
    this.carInfo(username);
    this.selectedServiceInfo(username);
    this.bookingInfo(username);
  }

  // tslint:disable-next-line: typedef
  carInfo(username: string){
    this.carService.getCar(username).subscribe({
      next : carDetails => {
        this.car = carDetails;
      },
      error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  selectedServiceInfo(username: string){
    this.serviceSelectedService.getServiceSelected(username).subscribe({
      next : serviceDetails => {
       this.serviceSelected = serviceDetails;
       this.serviceInfo(this.serviceSelected.packageID);
      },
      error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  serviceInfo(id: number){
   this.carServiceService.getService(id).subscribe({
     next : service => {
       this.carServiceModel = service;
     },
     error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  bookingInfo(username: string){
    this.bookingService.getSchedule(username).subscribe({
      next : schedule => {
        this.booking = schedule;
      },
     error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  readServiceTax(){
    return ((this.carServiceModel.packageAmount) * 18) / 100;
  }

  // tslint:disable-next-line: typedef
  readTotal(): string{
    const total  = (this.readServiceTax()) + (this.carServiceModel.packageAmount);
    localStorage.setItem('totalAmount', total.toString());
    return total.toString();
  }

}
