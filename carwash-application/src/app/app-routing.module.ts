import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregistrationComponent } from './userlogin/userregistration.component';
import { CarServiceComponent } from './car-service/car-service.component';
import { CarComponent } from './car/car.component';
import { BookingComponent } from './booking/booking.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'userlogin', component: UserloginComponent },
  { path: 'userregister', component: UserregistrationComponent },
  { path: 'car', component: CarComponent },
  { path: 'carservices', component: CarServiceComponent },
  { path: 'carservices/:id', component: CarServiceComponent },
  { path: 'booking', component: BookingComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
