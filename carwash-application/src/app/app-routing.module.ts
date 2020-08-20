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
import { ServiceRequestDescriptionComponent } from './service-request-description/service-request-description.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AdminloginComponent} from './admin/adminlogin.component';
import { UserDetailsComponent} from './user-details/user-details.component';
import { WasherDetailsComponent} from './washer-details/washer-details.component';
import { CarDetailsComponent } from './car-details/car-details.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'adminlogin', component: AdminloginComponent},
  { path: 'userlogin', component: UserloginComponent },
  { path: 'userregister', component: UserregistrationComponent },
  { path: 'washerregister', component: WasherComponent },
  { path: 'washerlogin', component: WasherloginComponent },
  { path: 'userdetails', component: UserDetailsComponent },
  { path: 'washerdetails', component: WasherDetailsComponent },
  { path: 'profile' , component: ProfileComponent , canActivate: [AuthGuard] },
  { path: 'car', component: CarComponent, canActivate: [AuthGuard] },
  { path: 'cardetails', component: CarDetailsComponent, canActivate: [AuthGuard] },
  { path: 'cardetails/:id', component: CarDetailsComponent, canActivate: [AuthGuard] },
  { path: 'carservices', component: CarServiceComponent},
  { path: 'carwashservices', component: CarwashserviceComponent, canActivate: [AuthGuard]},
  { path: 'carwashservices/:id', component: CarwashserviceComponent, canActivate: [AuthGuard]},
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'servicerequest', component: ServiceRequestComponent},
  { path: 'servicerequest/:id', component: ServiceRequestComponent},
  { path: 'servicerequestdesc', component: ServiceRequestDescriptionComponent},
  { path: 'servicerequestdesc/:id', component: ServiceRequestDescriptionComponent, canActivate: [AuthGuard]},
  { path: 'servicerequestdesc/:user', component: ServiceRequestDescriptionComponent, canActivate: [AuthGuard]},
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
  { path: 'invoice/:id', component: InvoiceComponent, canActivate: [AuthGuard] },
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
