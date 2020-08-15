import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregistrationComponent } from './userlogin/userregistration.component';
import { CarServiceComponent } from './car-service/car-service.component';
import { CarComponent } from './car/car.component';
import { BookingComponent } from './booking/booking.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './userlogin/auth.guard';
import { WasherComponent } from './washer/washer.component';
import { WasherloginComponent } from './washer/washerlogin.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { CarwashserviceComponent } from './carwashservice/carwashservice.component';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart/cart.component';
import { SuccessfullComponent } from './successfull/successfull.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'userlogin', component: UserloginComponent },
  { path: 'userregister', component: UserregistrationComponent },
  { path: 'washerregister', component: WasherComponent },
  { path: 'washerlogin', component: WasherloginComponent },
  { path: 'profile' , component: ProfileComponent , canActivate: [AuthGuard] },
  { path: 'car', component: CarComponent, canActivate: [AuthGuard] },
  { path: 'carservices', component: CarServiceComponent},
  { path: 'carwashservices', component: CarwashserviceComponent, canActivate: [AuthGuard]},
  { path: 'carwashservices/:id', component: CarwashserviceComponent, canActivate: [AuthGuard]},
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'servicerequest', component: ServiceRequestComponent},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'success', component: SuccessfullComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
