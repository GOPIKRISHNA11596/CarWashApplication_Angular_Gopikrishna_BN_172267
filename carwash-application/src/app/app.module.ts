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



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserloginComponent,
    UserregistrationComponent,
    CarServiceComponent,
    CarComponent,
    BookingComponent
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
