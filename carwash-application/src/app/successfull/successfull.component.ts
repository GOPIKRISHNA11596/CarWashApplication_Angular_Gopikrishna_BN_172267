import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment/payment.service';
import { Payment } from '../payment/payment';
import { Router } from '@angular/Router';

@Component({
  selector: 'app-successfull',
  templateUrl: './successfull.component.html',
  styleUrls: ['./successfull.component.css']
})
export class SuccessfullComponent implements OnInit {

  payment: Payment = new Payment();
  errorMessage = '';

  constructor(private paymentService: PaymentService,
              private router: Router) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.paymentService.getPayment(username).subscribe({
      next : data => {
        this.payment = data;
      },
     error : err => this.errorMessage = err
    });
  }

}
