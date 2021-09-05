import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css'],
})
export class CardetailComponent implements OnInit {
  cars: Car; 
  carImages: CarImage[] = [];
  path: string = 'https://localhost:44367';
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCarImagesByCarId(params['carId']);
      }
    });
  }  

  getCarDetails(carId: number) {
    this.carService.getCarByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      console.log(this.cars);
    });
  }

  getCarImagesByCarId(carId: number) {
    this.carImageService.getCarImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
}
