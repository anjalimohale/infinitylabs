import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) {}

  canActivate() {
      console.log(this.auth.loggedIn);
    if (!this.auth.loggedIn.value) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
