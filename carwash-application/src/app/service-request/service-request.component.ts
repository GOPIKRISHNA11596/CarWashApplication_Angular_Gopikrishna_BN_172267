import { Component, OnInit } from '@angular/core';
import { ServiceRequest} from './service-request';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {

  pageTitle: string = 'Customer Requests';
  serviceRequest: ServiceRequest[];
  constructor() { }

  ngOnInit(): void {
  }

}
