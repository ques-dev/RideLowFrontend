import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../shared/notification-service/notification.service";
import {DriverService} from "../driver.service";
import {DriverUpdateRequest} from "../../shared/model/DriverUpdateRequest";
import {UserService} from "../../shared/user.service";

const defaultImage = "../../../assets/images/account.png";

@Component({
  selector: 'app-driver-account',
  templateUrl: './driver-account.component.html',
  styleUrls: ['../../passenger/passenger-account/passenger-account.component.css', './driver-account.component.css', '../../app.component.css']
})
export class DriverAccountComponent implements OnInit {
  updateDriverForm : FormGroup = new FormGroup({
    name: new FormControl( '',{nonNullable:true, validators: [Validators.required]}),
    surname: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    telephoneNumber: new FormControl('',{nonNullable:true, validators: [Validators.required]}),
    address: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable:true, validators: [Validators.required]}),
    password: new FormControl('placeholder_pass'),
  });

  updateMode  = false;

  userId = -1;
  updateButtonText = "Izmeni podatke";
  image = "../../../assets/images/account.png";

  constructor(public driverService : DriverService,
              private notificationService : NotificationService,
              private userService : UserService) { }
  ngOnInit() {
    this.updateDriverForm.disable();
    this.showDriver();
    this.userId = parseInt(<string>sessionStorage.getItem("user_id"));
  }

  openChangePassword() : void {
    this.driverService.setChangingPassword(true);
  }

  showDriver() {
    this.driverService.getDriver()
      .subscribe(driver => {
        this.updateDriverForm.patchValue(
          {
            name : driver.name,
            surname: driver.surname,
            telephoneNumber: driver.telephoneNumber,
            address: driver.address,
            email: driver.email,
          }
        )
        if (driver.profilePicture != null) {
          this.image = 'data:image/png;base64,' + driver.profilePicture;
        } else {
          this.image = String(defaultImage);
        }
      });
  }

  toggleUpdateMode()
  {
    if(this.updateMode) {
      if(this.updateDriverForm.valid) {
        this.updateDriver();
      } else {
        this.notificationService.createNotification("Morate popuniti sva polja!", 5000);
      }
    }
    else this.enableForm();
  }

  enableForm() {
    this.updateButtonText = "Potvrdi izmene";
    this.updateMode = true;
    this.updateDriverForm.enable();
  }

  disableForm() {
    this.updateButtonText = "Izmeni podatke";
    this.updateMode = false;
    this.updateDriverForm.disable();
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

  updateDriver() {
    const request : DriverUpdateRequest = {
      driverId : parseInt(sessionStorage.getItem("user_id")!),
      name: this.updateDriverForm.value.name,
      surname: this.updateDriverForm.value.surname,
      profilePicture: this.image === defaultImage ? null : this.userService.cutBase64ImageFormat(this.image),
      telephoneNumber: this.updateDriverForm.value.telephoneNumber,
      address: this.updateDriverForm.value.address,
      email: this.updateDriverForm.value.email
    }
    this.driverService.sendUpdateDriverRequest(request)
      .subscribe({
        next: () => {
          this.notificationService.createNotification('Uspešno poslat zahtev za izmenu podataka.', 5000);
          this.disableForm();
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
  }
}
