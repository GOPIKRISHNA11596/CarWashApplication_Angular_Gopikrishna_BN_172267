import { Component, OnInit } from '@angular/core';
import { Booking } from './booking';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/Router';
import { BookingService } from './booking.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;
  submitted = false;
  booking: Booking = new Booking();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingForm = this.formBuilder.group({
      username : [localStorage.getItem('username'), Validators.required],
      date : ['', Validators.required],
      time : ['', Validators.required],
      doorNumber : ['', Validators.required],
      street : ['', Validators.required],
      landmark : ['', Validators.required],
      city : ['', Validators.required],
      district : ['', Validators.required],
      state : ['', Validators.required],
      pincode : ['', Validators.required],
    });
  }

  // tslint:disable-next-line: typedef
  onSubmit(){
    this.submitted = true;
    this.booking.username = localStorage.getItem('username');
    if (this.bookingForm.valid){
        console.log('Schedule : Iam inside Schedule submit');
        console.log(this.bookingForm.value);
        this.bookingService.addSchedule(this.bookingForm.value)
        .subscribe( data => {
        console.log(data);
        alert('Scheduled saved successfully');
        confirm('Do you want Proceed for payment');
        this.router.navigate(['/cart']);
        });
    }
  }

}
