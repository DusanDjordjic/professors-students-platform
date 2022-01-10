import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { checkPasswordsValidator } from 'src/shared/validators/confirm-password.validator';
import { SignupAboutDetails } from '../../models/signup-about.model';
import { SignupAddressDetails } from '../../models/signup-address-details.model';

import { SignupService } from '../signup.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  aboutForm = new FormGroup(
    {
      about: new FormControl(null, [
        Validators.required,
        Validators.minLength(100),
      ]),
    },
    { validators: checkPasswordsValidator }
  );
  constructor(private signupService: SignupService, private router: Router) {}

  getFormControl(name: string) {
    return this.aboutForm.get(name) as FormControl;
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.aboutForm.invalid) {
      return;
    }
    // Updateujemo podakte u servisu
    const aboutUser = new SignupAboutDetails({
      ...this.aboutForm.value,
    });
    this.signupService.updateAbout(aboutUser);

    // Proveravamo za svaki slucaj da li su podaci tacni
    if (this.signupService.isAboutValid()) {
      this.signupService.serverValidateAboutDetails(aboutUser).subscribe({
        next: (data) => {
          // console.log(data);
          this.router.navigate(['/auth', 'signup', 'subjects']);
          this.signupService.log();
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
