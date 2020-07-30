import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageTitle : string = 'CAR CARE SERVICE - A DOCTOR FOR YOUR CAR';
  imageName : string = 'Car Wash Service';
  imageWidth : number = 50;
  imagHeight : number = 50;
    imageMargin : number = 2;

  constructor() { }

  ngOnInit(): void {
  }

}
