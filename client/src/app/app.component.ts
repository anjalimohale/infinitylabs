import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn; loggedUser; token;

  constructor(private auth:AuthenticationService,
              private router:Router, private toastr:ToastrService){
      this.auth.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
     });
   this.loggedUser= this.auth.loggedUser;
  }

 public logout(): void {
  this.token = '';
  this.auth.loggedIn.next(false);
  this.auth.loggedUser='';
  window.localStorage.removeItem('log-token');
  window.localStorage.removeItem('log-details');
  this.router.navigateByUrl('/');
  this.toastr.success('Logout Successfully');
}
}