import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/Router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Booking } from '../booking/booking';
import { BookingService } from '../booking/booking.service';
import { Payment } from './payment';
import { PaymentService } from './payment.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  submitted = false;
  booking: Booking = new Booking();
  payment: Payment = new Payment();
  errorMessage = '';
  paymentForm: FormGroup;

  constructor(  private bookingService: BookingService,
                private paymentService: PaymentService,
                private router: Router,
                private formBuilder: FormBuilder) { }

  car_validation_messages = {
    cardHolderName : [{ type: 'required', message: 'Card Holder Name is required' }],
    cardNumber: [{ type: 'required', message: 'Card Number is required' },
                 { type: 'minlength', message: 'Card Number must be 16 numbers' },
                 { type: 'maxlength', message: 'Card Number cannot be more than 16 numbers' }],
    expyear : [{ type: 'required', message: 'Expiry year is required' }],
    expmon: [{ type: 'required', message: 'Expiry Month is required' } ],
    cvv: [{ type: 'required', message: 'CVV is required' } ],
    amount: [{ type: 'required', message: 'Amount is required' } ]
  };


  ngOnInit(): void {
    const username = localStorage.getItem('username');
    this.bookingService.getSchedule(username).subscribe({
      next : schedule => {
        this.booking = schedule;
      },
     error : err => this.errorMessage = err
    });
    this.readTotalAmount();
    this.paymentForm = this.formBuilder.group({
      username : [localStorage.getItem('username'), Validators.required],
      cardHolderName : ['', Validators.required],
      cardNumber : ['', [ Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      expyear : ['',  [ Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      expmon : ['', Validators.required],
      cvv : ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      amount : ['', Validators.required],
    });
  }

  // tslint:disable-next-line: typedef
  readTotalAmount(){
    const total = localStorage.getItem('totalAmount');
    return total;
  }

  // tslint:disable-next-line: typedef
  onSubmit(){
    this.submitted = true;
    this.payment.username = localStorage.getItem('username');
    console.log('Payment : ' + this.paymentForm.value);

    if (this.paymentForm.valid){
        this.paymentService.addPayment(this.paymentForm.value)
        .subscribe( data => {
        console.log(data);
        alert('Your Transaction Successful');
        this.router.navigate(['/success']);
        });
    }
    console.log(this.payment);
  }

}
