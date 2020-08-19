import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ValidateEqualModule } from 'ng-validate-equal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { StorageServiceModule } from 'ngx-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserregistrationComponent } from './userlogin/userregistration.component';
import { CarServiceComponent } from './car-service/car-service.component';
import { CarComponent } from './car/car.component';
import { BookingComponent } from './booking/booking.component';
import { ProfileComponent } from './profile/profile.component';
import { WasherComponent } from './washer/washer.component';
import { WasherloginComponent } from './washer/washerlogin.component';
import { ServiceRequestComponent } from './service-request/service-request.component';
import { ServiceRequestDescriptionComponent } from './service-request-description/service-request-description.component';
import { CarwashserviceComponent } from './carwashservice/carwashservice.component';
import { PaymentComponent } from './payment/payment.component';
import { CartComponent } from './cart/cart.component';
import { SuccessfullComponent } from './successfull/successfull.component';
import { ServiceRequestAcceptedComponent } from './service-request-accepted/service-request-accepted.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AdminloginComponent } from './admin/adminlogin.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { WasherDetailsComponent } from './washer-details/washer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserloginComponent,
    UserregistrationComponent,
    CarServiceComponent,
    CarComponent,
    BookingComponent,
    ProfileComponent,
    WasherComponent,
    WasherloginComponent,
    ServiceRequestComponent,
    ServiceRequestDescriptionComponent,
    CarwashserviceComponent,
    PaymentComponent,
    CartComponent,
    SuccessfullComponent,
    ServiceRequestAcceptedComponent,
    InvoiceComponent,
    AdminloginComponent,
    UserDetailsComponent,
    WasherDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ValidateEqualModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
