import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  //rentals: Rental[] = [];
  rentalAddForm: FormGroup;
  carId: number;
  carDetails: Car
  customers: Customer[] = [];
  customerId: number;
  companyName: string;
  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private customerService: CustomerService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    //this.getRentals();
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.carId = parseInt(params['carId']);
      }
    });
    this.getCustomers();
    this.createRentalAddForm();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      console.log(response.data);
    });
  }

  getActivateCarDetail(carId: number) {    
    this.carService.getCarByCarId(carId).subscribe((params) => {
      this.carDetails=params.data;
     // console.log(this.carDetails);
    });
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      amountPay: ['', Validators.required],
      cvv: ['', Validators.required],
      expitationsDate: ['', Validators.required],
      cardNumber: ['', Validators.required],
      nameOnTheCard: ['', Validators.required],
    });
  }

  add(){
    if(this.rentalAddForm.valid){
      this.activatedRoute.params.subscribe(params => {
        if(params ["carId"]){
          this.carId = parseInt(params["carId"]);
        }
      })
      let rentalModel = Object.assign({}, this.rentalAddForm.value)     
      this.paymentService.pay(rentalModel, this.carId).subscribe(response=>{
        if(response.success==true){
          this.rentalService.add(rentalModel,this.carId).subscribe(response =>{
            this.toastrService.success(response.message);
            }, responseError => {
              this.toastrService.error(responseError.error.message);
          })
        }else{
          this.toastrService.error("The rental failed")
        }

      }, responseError=>{
        this.toastrService.error("Payment could not be made")
      });
    }else{
      this.toastrService.error("Formunuz eksik");      
    }
  }
}
