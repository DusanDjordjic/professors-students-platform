import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupUserDetails } from '../models/signup-user-details.model';
import { SignupUser } from '../models/signup-user.model';
const validateUrl = 'http://localhost:3000/api/validate';

@Injectable()
export class SignupService {
  private currentSignupUserDetails = new SignupUser();
  constructor(private http: HttpClient) {
    console.log(this.currentSignupUserDetails);
  }
  updateUserDetails(userDetails: SignupUserDetails) {
    this.currentSignupUserDetails.username = userDetails.username;
    this.currentSignupUserDetails.firstname = userDetails.firstname;
    this.currentSignupUserDetails.lastname = userDetails.lastname;
    this.currentSignupUserDetails.type = userDetails.type;
    this.currentSignupUserDetails.password = userDetails.password;
  }
  serverValidateUserDetails(userDetails: SignupUserDetails): Observable<any> {
    return this.http.post(`${validateUrl}/user-details`, userDetails);
  }
  isUserDetailsValid(): boolean {
    let userDetailsValid = true;

    // Username
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(
        this.currentSignupUserDetails.username
      )
    ) {
      console.log('username');

      userDetailsValid = false;
    }
    // Password
    if (
      !/^(?=.*[A-Za-z])(?=.*[0123456789])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/.test(
        this.currentSignupUserDetails.password
      )
    ) {
      console.log('password');
      userDetailsValid = false;
    }
    // Type
    if (
      this.currentSignupUserDetails.type !== 'student' &&
      this.currentSignupUserDetails.type !== 'professor'
    ) {
      console.log('type');
      userDetailsValid = false;
    }
    // Firtsname
    if (this.currentSignupUserDetails.firstname.length <= 0) {
      console.log('firstname');
      userDetailsValid = false;
    }
    // Lastname
    if (this.currentSignupUserDetails.lastname.length <= 0) {
      console.log('lastname');
      userDetailsValid = false;
    }
    return userDetailsValid;
  }
}
