import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/Router';
import { CarServiceModel } from '../car-service/car-service';
import { CarServiceService } from '../car-service/car-service.service';
import { ServiceSelected } from './service-selected';
import { ServiceSelectedService } from './service-selected.service';


@Component({
  selector: 'app-carwashservice',
  templateUrl: './carwashservice.component.html',
  styleUrls: ['./carwashservice.component.css']
})
export class CarwashserviceComponent implements OnInit {

  carServices: CarServiceModel[];
  errorMessage: string;
  carService: CarServiceModel = new CarServiceModel();
  selectedService: ServiceSelected[] | undefined;
  selectedSer: ServiceSelected = new ServiceSelected();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private carServiceService: CarServiceService,
              private serviceSelectedService: ServiceSelectedService,
              ) { }

  ngOnInit(): void {
    this.carServiceService.getServices().subscribe({
      next : services => {
        this.carServices = services;
      },
      error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  onSelect(){
    this.selectedSer.username = localStorage.getItem('username');
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      console.log('Service Package ID : ' + id);
      this.selectedSer.packageID = id;
      this.serviceSelectedService.addServiceSelected(this.selectedSer)
      .subscribe( data => {
        console.log(data);
        alert('Selected Service saved successfully');
        this.router.navigate(['/booking']);
        });
    }
  }



}


