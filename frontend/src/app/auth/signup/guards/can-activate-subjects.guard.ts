import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SignupService } from '../signup.service';
@Injectable()
export class CanActivateSubjects implements CanActivate {
  constructor(private signupService: SignupService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.signupService.isAddressValid()) {
      return true;
    } else {
      this.router.navigate(['/auth', 'signup']);
      return false;
    }
  }
}
