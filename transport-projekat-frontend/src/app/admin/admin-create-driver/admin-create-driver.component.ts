import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../shared/notification-service/notification.service";
import {AdminService} from "../admin.service";
import {DriverUpdateRequest} from "../../shared/model/DriverUpdateRequest";
import {VehicleCreateRequest} from "../../shared/model/VehicleCreateRequest"
import {UserService} from "../../shared/user.service";

const defaultImage = "../../../assets/images/account.png";

@Component({
  selector: 'app-admin-create-driver',
  templateUrl: './admin-create-driver.component.html',
  styleUrls: ['../../passenger/passenger-account/passenger-account.component.css', './admin-create-driver.component.css', '../../app.component.css']
})
export class AdminCreateDriverComponent implements OnInit {

  baby = false;
  pet = false;
  createDriverForm : FormGroup = new FormGroup({
    name: new FormControl( '',{nonNullable:true, validators: [Validators.required]}),
    surname: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    telephoneNumber: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    address: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    password: new FormControl('placeholder_pass'),

    model: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    licence: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    seats: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    babySeat: new FormControl(''),
    vehicleType: new FormControl('', {nonNullable:true, validators: [Validators.required]})
  });

  image = "../../../assets/images/account.png";

  constructor(public adminService : AdminService,
              private notificationService : NotificationService,
              private userService : UserService) { }

  ngOnInit() {
    this.createDriverForm.enable();
  }
  toggleUpdateMode()
  {
      if(this.createDriverForm.valid) {
        this.createDriverAndVehicle();
      } else {
        this.notificationService.createNotification("Morate popuniti sva polja!", 5000);
      }
  }

  onFileSelected(event: Event) {
    const maxFileSize = 5 * 1024 * 1024;
    if (event.target != null) {
      const inputElement: HTMLInputElement = event.target as HTMLInputElement;
      if (inputElement.files != null) {
        const file: File = inputElement.files[0];
        if (file) {
          if (file.type.startsWith('image/') && file.size < maxFileSize) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              this.image = fileReader.result as string;
            };
            fileReader.readAsDataURL(file);
          } else {
            this.notificationService.createNotification('Morate odabrati validnu sliku manju od 5MB.', 5000);
          }
        }
      }
    }
  }

  createDriverAndVehicle() {
    const request : DriverUpdateRequest = {
      driverId : 4,
      name: this.createDriverForm.value.name,
      surname: this.createDriverForm.value.surname,
      profilePicture: this.image === defaultImage ? null : this.userService.cutBase64ImageFormat(this.image),
      telephoneNumber: this.createDriverForm.value.telephoneNumber,
      address: this.createDriverForm.value.address,
      email: this.createDriverForm.value.email
    }
    this.adminService.sendCreateDriverRequest(request)
      .subscribe({
        next: () => {
          this.notificationService.createNotification('Uspešno kreiran vozač.', 5000);
        },
        error: (error) => {
          if (error.error.message.includes("email")) {
            this.notificationService.createNotification('Email adresa je zauzeta ili nevalidna.', 5000);
          } else if (error.error.message.includes("changes")) {
            this.notificationService.createNotification('Niste izmenili nijedan podatak.', 5000);
          } else if (error.error.message.toLowerCase().includes("file")) {
            this.notificationService.createNotification('Morate odabrati validnu sliku manju od 5MB.', 5000);
          } else if (error.error.message.includes("surname")) {
            this.notificationService.createNotification('Prezime ne sme biti duže od 100 slova.', 5000);
          } else if (error.error.message.includes("name")) {
            this.notificationService.createNotification('Ime ne sme biti duže od 100 slova.', 5000);
          } else if (error.error.message.includes("phone")) {
            this.notificationService.createNotification('Broj telefona mora biti validan.', 5000);
          } else if (error.error.message.includes("address")) {
            this.notificationService.createNotification('Adresa ne sme biti duže od 100 slova.', 5000);
          } else {
            this.notificationService.createNotification('Došlo je do sledeće greške: ' + error.error.message, 5000);
          }
        }
      });

    const request2 : VehicleCreateRequest = {
      driverId : 10,
      vehicleId: 10,
      vehicleType: this.createDriverForm.value.vehicleType,
      model: this.createDriverForm.value.model,
      licenseNumber: this.createDriverForm.value.licence,
      passengerSeats: this.createDriverForm.value.seats,
      babyTransport: this.baby,
      petTransport: this.pet
    }
    this.adminService.sendCreateVehicleRequest(request2)
      .subscribe({
        next: () => {
          this.notificationService.createNotification('Uspešno kreirano vozilo.', 5000);
        },
        error: (error) => {
          if (error.error.message.includes("email")) {
            this.notificationService.createNotification('Email adresa je zauzeta ili nevalidna.', 5000);
          }
        }
      });
  }

  togglePet() {
    this.pet = !this.pet;
  }

  toggleBaby() {
    this.baby = !this.baby;
  }
}
