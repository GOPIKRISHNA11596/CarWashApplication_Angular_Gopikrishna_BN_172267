import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/Router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { StarRating } from './star-rating';
import { StarRatingService } from './star-rating.service';


@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  rating: StarRating = new StarRating();
  track: StarRating = new StarRating();
  regForm: FormGroup;
  submitted = false;
  rate: boolean;


  constructor(private formBuilder: FormBuilder,
              private starRatingService: StarRatingService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.regForm = this.formBuilder.group({
      bookingID : [localStorage.getItem('bookingID'), Validators.required],
      username : [localStorage.getItem('username'), Validators.required],
      rating : ['', Validators.required],
      review : ['', Validators.required],
    });
    const boookingid = +this.route.snapshot.paramMap.get('id');
    this.getRating(boookingid);
  }

  // tslint:disable-next-line: typedef
  readUser(){
    return localStorage.getItem('isuserlogin');
  }


  // tslint:disable-next-line: typedef
  onSubmit(){
    this.submitted = true;
    if (this.regForm.valid){
        this.starRatingService.addRating(this.regForm.value)
        .subscribe( data => {
        console.log(data);
        this.rate = false;
        });
    }
  }

  // tslint:disable-next-line: typedef
  getRating(boookingid){
    console.log(boookingid);
    this.starRatingService.getRating(boookingid)
    .subscribe(data => {
      this.track = data;
      console.log(data);
      if (this.track.rating == null){
        this.rate = false;
      }else{
        this.rate = true;
      }
    });
  }



}
