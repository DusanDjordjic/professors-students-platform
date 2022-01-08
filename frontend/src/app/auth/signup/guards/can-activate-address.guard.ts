import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SignupService } from '../signup.service';
@Injectable()
export class CanActivateAddress implements CanActivate {
  constructor(private signupService: SignupService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.signupService.isContactInfoValid()) {
      return true;
    } else {
      this.router.navigate(['/auth', 'signup']);
      return false;
    }
  }
}
