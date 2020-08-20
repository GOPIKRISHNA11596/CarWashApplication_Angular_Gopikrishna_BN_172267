import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/Router';
import { CarServiceModel } from '../car-service/car-service';
import { CarServiceService } from '../car-service/car-service.service';
import { ServiceSelected } from './service-selected';
import { ServiceSelectedService } from './service-selected.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-carwashservice',
  templateUrl: './carwashservice.component.html',
  styleUrls: ['./carwashservice.component.css']
})
export class CarwashserviceComponent implements OnInit {

  errorMessage: string;
  carServices: CarServiceModel[];
  carService: CarServiceModel = new CarServiceModel();
  selectedService: ServiceSelected[] | undefined;
  selectedSer: ServiceSelected = new ServiceSelected();

  serviceForm: FormGroup;
  submitted = false;

  @Output() execute: EventEmitter<any>  = new EventEmitter();


  constructor(private route: ActivatedRoute,
              private router: Router,
              private carServiceService: CarServiceService,
              private serviceSelectedService: ServiceSelectedService,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit(): void {
    this.getAllServiceData();
  }

  // tslint:disable-next-line: typedef
  getAllServiceData(){
    this.carServiceService.getServices().subscribe({
      next : services => {
        this.carServices = services;
      },
      error : err => this.errorMessage = err
    });
  }

  // tslint:disable-next-line: typedef
  readAdmin(){
    return localStorage.getItem('isadminlogin');
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

  // tslint:disable-next-line: typedef
  onAddService(){
    console.log(this.carService);
    this.carServiceService.addService(this.carService)
    .subscribe( data => {
      console.log(data);
      this.getAllServiceData();
    });
    this.execute.emit();
  }

  // tslint:disable-next-line: typedef
  onEditButonPressed(packageID: number){
    this.carServiceService.getService(packageID)
    .subscribe(data => {
     this.carService = data;
    });

  }

  // tslint:disable-next-line: typedef
  updateService(packageID: number){
    this.carServiceService.editService(this.carService, packageID)
    .subscribe( data => {
      console.log(data);
      this.getAllServiceData();
    });
    this.execute.emit();

  }

  // tslint:disable-next-line: typedef
  onDelete(packageID: number){
    const r = confirm('Do you want to delete Service ' + packageID);
    if (r === true){
      this.carServiceService.deleteService(packageID)
      .subscribe( data => {
      console.log(data);
      this.getAllServiceData();
      });
      this.execute.emit();
    }
  }


}


