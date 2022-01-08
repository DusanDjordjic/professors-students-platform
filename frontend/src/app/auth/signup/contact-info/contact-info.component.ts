import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from 'src/shared/types/user.type';
import { checkPasswordsValidator } from 'src/shared/validators/confirm-password.validator';
import { SignupContactInfoDetails } from '../../models/signup-contact-info-details.model';
import { SignupUserDetails } from '../../models/signup-user-details.model';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit {
  contactDetailsForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null),
      website: new FormControl(null),
    },
    { validators: checkPasswordsValidator }
  );
  constructor(private signupService: SignupService, private router: Router) {}

  getFormControl(name: string) {
    return this.contactDetailsForm.get(name) as FormControl;
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.contactDetailsForm.invalid) {
      return;
    }
    // Updateujemo podakte u servisu
    const contactInfoDetails = new SignupContactInfoDetails({
      ...this.contactDetailsForm.value,
    });
    this.signupService.updateContactInfo(contactInfoDetails);

    // Proveravamo za svaki slucaj da li su podaci tacni
    if (this.signupService.isContactInfoValid()) {
      this.signupService
        .serverValidateContactInfoDetails(contactInfoDetails)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/auth', 'signup', 'address']);
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
