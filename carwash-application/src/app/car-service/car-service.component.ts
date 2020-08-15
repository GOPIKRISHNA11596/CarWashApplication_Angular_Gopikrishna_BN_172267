import { Component, OnInit } from '@angular/core';
import { CarServiceModel } from './car-service';
import { ActivatedRoute, Router} from '@angular/Router';
import { CarServiceService } from './car-service.service';

@Component({
  selector: 'app-car-service',
  templateUrl: './car-service.component.html',
  styleUrls: ['./car-service.component.css']
})
export class CarServiceComponent implements OnInit {

  carServiceModel: CarServiceModel | undefined;
  errorMessage: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carServiceService: CarServiceService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    // if (param) {
    //   const id = +param;
    //   this.getService(id);
    // }
     const id = 6949934154;
     this.getService(id);
  }

  getService(id: number) {
    this.carServiceService.getService(id).
    subscribe((service) => {
       this.carServiceModel = service;
    });
  }

  read(){
    return localStorage.getItem('isuserlogin');
  }
}
