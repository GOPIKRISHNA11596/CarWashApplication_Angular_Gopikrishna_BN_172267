import { CarServiceModel } from './../car-service/car-service';
import { Car } from './../car/car';
import { Booking } from './../booking/booking';
import { User } from './../userlogin/user';

export class ServiceRequest{

  username: User;
  bookingID: Booking;
  car: Car;
  carservice: CarServiceModel;
  location: string;
}
