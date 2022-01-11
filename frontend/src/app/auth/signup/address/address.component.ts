import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswordsValidator } from 'src/shared/validators/confirm-password.validator';
import { SignupAddressDetails } from '../../models/signup-address-details.model';

import { SignupService } from '../signup.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  isEdit: boolean = false;
  addressDetailsForm = new FormGroup(
    {
      city: new FormControl(null, [Validators.required]),
      street: new FormControl(null),
      streetNumber: new FormControl(null),
    },
    { validators: checkPasswordsValidator }
  );
  constructor(private signupService: SignupService, private router: Router) {}

  getFormControl(name: string) {
    return this.addressDetailsForm.get(name) as FormControl;
  }
  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.isEdit = true;
      this.addressDetailsForm.patchValue(
        this.signupService.userDetails.address
      );
    }
  }
  onSubmit() {
    if (this.addressDetailsForm.invalid) {
      return;
    }
    // Updateujemo podakte u servisu
    const addressDetails = new SignupAddressDetails({
      ...this.addressDetailsForm.value,
    });
    this.signupService.updateAddress(addressDetails);

    // Proveravamo za svaki slucaj da li su podaci tacni
    if (this.signupService.isAddressValid()) {
      this.signupService
        .serverValidateAddressDetails(addressDetails)
        .subscribe({
          next: (data) => {
            if (this.isEdit) {
              this.router.navigate(['/auth', 'signup', 'final']);
            } else {
              this.router.navigate(['/auth', 'signup', 'subjects']);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      console.log('Greska u podacima');
    }
  }
}
