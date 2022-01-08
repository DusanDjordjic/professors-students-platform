import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignupAddressDetails } from '../models/signup-address-details.model';
import { SignupContactInfoDetails } from '../models/signup-contact-info-details.model';
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

  updateContactInfo(contactInfoDetails: SignupContactInfoDetails) {
    this.currentSignupUserDetails.contactInfo.email = contactInfoDetails.email;
    this.currentSignupUserDetails.contactInfo.phoneNumber =
      contactInfoDetails.phoneNumber;
    this.currentSignupUserDetails.contactInfo.website =
      contactInfoDetails.website;
  }

  updateAddress(addressDetails: SignupAddressDetails) {
    this.currentSignupUserDetails.address.city = addressDetails.city;
    this.currentSignupUserDetails.address.street = addressDetails.street;
    this.currentSignupUserDetails.address.streetNumber =
      addressDetails.streetNumber;
  }

  serverValidateUserDetails(userDetails: SignupUserDetails): Observable<any> {
    return this.http.post(`${validateUrl}/user-details`, userDetails);
  }

  serverValidateContactInfoDetails(
    contactInfoDetails: SignupContactInfoDetails
  ): Observable<any> {
    return this.http.post(`${validateUrl}/contact-info`, contactInfoDetails);
  }

  serverValidateAddressDetails(
    addressDetails: SignupAddressDetails
  ): Observable<any> {
    return this.http.post(`${validateUrl}/address`, addressDetails);
  }

  isUserDetailsValid(): boolean {
    let userDetailsValid = true;

    // Username
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/.test(
        this.currentSignupUserDetails.username
      )
    ) {
      // console.log('username');

      userDetailsValid = false;
    }
    // Password
    if (
      !/^(?=.*[A-Za-z])(?=.*[0123456789])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/.test(
        this.currentSignupUserDetails.password
      )
    ) {
      // console.log('password');
      userDetailsValid = false;
    }
    // Type
    if (
      this.currentSignupUserDetails.type !== 'student' &&
      this.currentSignupUserDetails.type !== 'professor'
    ) {
      // console.log('type');
      userDetailsValid = false;
    }
    // Firtsname
    if (
      !this.currentSignupUserDetails.firstname ||
      this.currentSignupUserDetails.firstname.length <= 0
    ) {
      // console.log('firstname');
      userDetailsValid = false;
    }
    // Lastname
    if (
      !this.currentSignupUserDetails.lastname ||
      this.currentSignupUserDetails.lastname.length <= 0
    ) {
      // console.log('lastname');
      userDetailsValid = false;
    }
    return userDetailsValid;
  }

  isContactInfoValid(): boolean {
    let contactInfoDetailsValid = true;
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        this.currentSignupUserDetails.contactInfo.email
      )
    ) {
      contactInfoDetailsValid = false;
    }
    if (this.currentSignupUserDetails.contactInfo.phoneNumber !== null) {
      if (
        typeof this.currentSignupUserDetails.contactInfo.phoneNumber ===
        'string'
      ) {
        if (this.currentSignupUserDetails.contactInfo.phoneNumber.length == 0)
          this.currentSignupUserDetails.contactInfo.phoneNumber = null;
      } else {
        contactInfoDetailsValid = false;
      }
    }

    if (this.currentSignupUserDetails.contactInfo.website !== null) {
      if (
        typeof this.currentSignupUserDetails.contactInfo.website === 'string'
      ) {
        if (this.currentSignupUserDetails.contactInfo.website.length == 0)
          this.currentSignupUserDetails.contactInfo.website = null;
      } else {
        contactInfoDetailsValid = false;
      }
    }
    return contactInfoDetailsValid;
  }

  isAddressValid(): boolean {
    let addressDetailsValid = true;
    if (this.currentSignupUserDetails.address.city) {
      if (typeof this.currentSignupUserDetails.address.city == 'string') {
        if (this.currentSignupUserDetails.address.city.length <= 0) {
          addressDetailsValid = false;
        }
      } else {
        addressDetailsValid = false;
      }
    } else {
      addressDetailsValid = false;
    }
    if (this.currentSignupUserDetails.address.street !== null) {
      if (typeof this.currentSignupUserDetails.address.street === 'string') {
        if (this.currentSignupUserDetails.address.street.length == 0)
          this.currentSignupUserDetails.address.street = null;
      } else {
        addressDetailsValid = false;
      }
    }

    if (this.currentSignupUserDetails.address.streetNumber !== null) {
      if (
        typeof this.currentSignupUserDetails.address.streetNumber === 'string'
      ) {
        if (this.currentSignupUserDetails.address.streetNumber.length == 0)
          this.currentSignupUserDetails.address.streetNumber = null;
      } else {
        addressDetailsValid = false;
      }
    }
    return addressDetailsValid;
  }
  log() {
    console.log(this.currentSignupUserDetails);
  }
}
