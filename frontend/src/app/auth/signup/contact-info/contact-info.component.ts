import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { checkPasswordsValidator } from 'src/shared/validators/confirm-password.validator';
import { SignupContactInfoDetails } from '../../models/signup-contact-info-details.model';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit {
  isEdit: boolean = false;
  contactDetailsForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(null),
      website: new FormControl(null),
    },
    { validators: checkPasswordsValidator }
  );
  constructor(
    private signupService: SignupService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  getFormControl(name: string) {
    return this.contactDetailsForm.get(name) as FormControl;
  }
  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.isEdit = true;
      this.contactDetailsForm.patchValue(
        this.signupService.userDetails.contactInfo
      );
    }
  }
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
            if (this.isEdit) {
              this.router.navigate(['/auth', 'signup', 'final']);
            } else {
              this.router.navigate(['/auth', 'signup', 'address']);
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
