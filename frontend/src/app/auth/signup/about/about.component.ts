import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  isEdit: boolean = false;
  aboutForm = new FormGroup({
    about: new FormControl(null, [
      Validators.required,
      Validators.minLength(100),
    ]),
  });
  constructor(private signupService: SignupService, private router: Router) {}

  getFormControl(name: string) {
    return this.aboutForm.get(name) as FormControl;
  }
  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.isEdit = true;
      this.aboutForm.patchValue(this.signupService.userDetails);
    }
  }
  onSubmit() {
    if (this.aboutForm.invalid) {
      return;
    }
    // Updateujemo podakte u servisu
    const aboutUser = this.aboutForm.value.about;
    this.signupService.updateAbout(aboutUser);

    // Proveravamo za svaki slucaj da li su podaci tacni
    if (this.signupService.isAboutValid()) {
      this.signupService.serverValidateAboutDetails(aboutUser).subscribe({
        next: (data) => {
          this.router.navigate(['/auth', 'signup', 'final']);
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
