import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceRequest} from './service-request';
import { ServiceRequestService } from './service-request.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})

export class ServiceRequestComponent implements OnInit {

  pageTitle: string = 'Customer Requests';
  serviceRequests: ServiceRequest[];
  errorMessage = '';

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private serviceRequestService: ServiceRequestService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.serviceRequestService.getServiceRequest().subscribe({
      next : data => {
        this.serviceRequests = data;
      },
     error : err => this.errorMessage = err
    });

    const carID  = this.route.snapshot.paramMap.get('id');

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

}
