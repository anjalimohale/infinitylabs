import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedIn;
  loggedUser;
  token;
  constructor(private auth:AuthenticationService,
              private router:Router){
    this.auth.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
  });
 this.loggedUser= this.auth.loggedUser;
 }

 public logout(): void {
  this.token = '';
  this.auth.loggedIn.next(false);
  window.localStorage.removeItem('log-token');
  window.localStorage.removeItem('log-details');
  this.router.navigateByUrl('/');
}
}