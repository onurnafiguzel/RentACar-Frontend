import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  filterText = '';
  cars: Car[]=[]
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId'] && params['colorId']) {
        this.getCarsByFilter(params['brandId'], params['colorId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
       }
        //else if (params['carId']) {
        //this.getCarByCarId(params['carId']); 
     // } 
      else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else {
        this.getCars();
      }
    });
  }

  getCarsByFilter(brandId: number, colorId: number) {
    this.carService
      .getCarsByBrandIdAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;            
      });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrand(id: number) {
    this.carService.getCarsByBrand(id).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByColor(id: number) {
    this.carService.getCarsByColor(id).subscribe((response) => {
      this.cars = response.data;
    });
  }

  //  getCarByCarId(carId: number) {
  //   this.carService.getCarByCarId(carId).subscribe((response) => {
  //     this.cars = response.data;
  //    });
  //  } 
}
