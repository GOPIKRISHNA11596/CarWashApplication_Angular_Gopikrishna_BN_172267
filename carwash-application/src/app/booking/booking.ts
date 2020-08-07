export class Booking{

  bookingID: number;
  schedule: {
    date: Date,
    time: string
  };
  location: {
    doorNumber: number,
    street: string,
    landmark: string,
    city: string,
    district: string,
    state: string,
    pincode: number,
  };
}

