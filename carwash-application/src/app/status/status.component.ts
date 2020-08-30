import { Component, OnInit } from '@angular/core';
import { OrderAcceptedService } from '../service-request/order-accepted.service';
import { OrderAccepted } from '../service-request/order-accepted';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/booking';
import { Router } from '@angular/Router';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent implements OnInit {

  orderAccepted: OrderAccepted = new OrderAccepted();
  booking: Booking = new Booking();
  bookings: Booking[];
  bookingsForWasher: Booking[];



  constructor(private orderAcceptedService: OrderAcceptedService,
              private bookingService: BookingService,
              private router: Router) { }

  ngOnInit(): void {
    this.readBookingSuccessful();
    this.bookingService.getAllScheduleByUsername(localStorage.getItem('username'))
    .subscribe(data => {
      this.bookings = data;
    });

    this.bookingService.getSchedules()
    .subscribe(data => {
      this.bookingsForWasher = data;
    });
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
  readBookingSuccessful(){
    console.log(localStorage.getItem('BookingSuccessfull'));
    return localStorage.getItem('BookingSuccessfull');
  }

  // tslint:disable-next-line: typedef
  readOrderAccepted(){
    return localStorage.getItem('orderAccepted');
  }

  // tslint:disable-next-line: typedef
  setPickCar(){
    return localStorage.setItem('pickCar', 'true');
  }

  // tslint:disable-next-line: typedef
  readPickCar(){
    return localStorage.getItem('pickCar');
  }

  // tslint:disable-next-line: typedef
  setCarService(){
    return localStorage.setItem('carService', 'true');
  }

  // tslint:disable-next-line: typedef
  readCarService(){
    return localStorage.getItem('carService');
  }

  // tslint:disable-next-line: typedef
  setDropCar(){
    this.router.navigate(['/invoice']);
    return localStorage.setItem('dropcar', 'true');
  }

  // tslint:disable-next-line: typedef
  readDropCar(){
    return localStorage.getItem('dropcar');
  }

  // tslint:disable-next-line: typedef
  execute(){
    localStorage.setItem('dropcar', 'false');
    localStorage.setItem('carService', 'false');
    localStorage.setItem('pickCar', 'false');
    this.router.navigate(['/rating']);
  }

}
