import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from 'src/shared/types/user.type';
import { checkPasswordsValidator } from 'src/shared/validators/confirm-password.validator';
import { SignupUserDetails } from '../../models/signup-user-details.model';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  activeType: UserType = 'student';
  userDetailsForm = new FormGroup(
    {
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=.*[A-Za-z])(?=.*[0123456789])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}'
        ),
      ]),
      passwordRepeat: new FormControl(null, [Validators.required]),
    },
    { validators: checkPasswordsValidator }
  );
  constructor(private signupService: SignupService, private router: Router) {}

  getFormControl(name: string) {
    return this.userDetailsForm.get(name) as FormControl;
  }
  ngOnInit(): void {}
  onSubmit() {
    if (this.userDetailsForm.invalid) {
      return;
    }
    // Updateujemo podakte u servisu
    const signupUserDetails = new SignupUserDetails({
      ...this.userDetailsForm.value,
      type: this.activeType,
    });
    this.signupService.updateUserDetails(signupUserDetails);

    // Proveravamo za svaki slucaj da li su podaci tacni
    if (this.signupService.isUserDetailsValid()) {
      this.signupService
        .serverValidateUserDetails(signupUserDetails)
        .subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/auth', 'signup', 'contact-info']);
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
  changeType(newType: UserType) {
    this.activeType = newType;
  }
}
