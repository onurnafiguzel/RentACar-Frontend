export interface Rental {
  id: number;
  carId:number;
  customerId: number;
  rentDate: Date;
  returnDate: Date;    
  nameOnTheCard: string;
  cardNumber: string;
  cvv: string;
  amountPay: number;

  brandName: string;
  userName: string;
}
