import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.readBookingSuccessful();

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
  }

}
