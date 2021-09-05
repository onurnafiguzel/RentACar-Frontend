import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userUpdateForm: FormGroup;
  email = this.localStorageService.get('email');
  password: FormControl;
  user: User;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.createUserUpdateForm();
  }

  getUser() {
    if (this.email) {
      this.userService.getByEmail(this.email).subscribe((response) => {
        this.user = response;
      });
    }
  }
  
  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id: this.user.id,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  update() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      userModel.id = this.user.id;
      this.userService.update(userModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Successfull');
        },
        (responseError) => {
          this.toastrService.error('Güncellenemedi');
        }
      );
    } else {
      this.toastrService.error('Your form is invalid');
    }
  }
}
