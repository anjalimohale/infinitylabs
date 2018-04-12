import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import {ToastrService} from 'ngx-toastr';
import * as jwt from 'jsonwebtoken';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router,
    private toastr: ToastrService) { 
      this.auth.loggedIn.next(false);
    }

loginForm = new FormGroup ({
username: new FormControl('',Validators.required),
password: new FormControl('',Validators.required),
});

ngOnInit() {
}

private saveToken(token: string,payload: string): void {
  localStorage.setItem('log-token', token);
  localStorage.setItem('log-details', JSON.stringify(payload) );
  this.token = token;
}

token;
onSubmit(){
let form=this.loginForm.value;

 this.auth.login(form).subscribe((res) => {
    var resp=JSON.parse(JSON.stringify(res));
    this.auth.loggedIn.next(true);
    this.token = resp.token;
    var decoded = jwt.decode(this.token, {complete: true});
    // console.log(decoded.payload);
    this.saveToken(this.token,decoded.payload);
    this.toastr.success(resp && resp.user ? `Welcome ${resp.user.firstname} ${resp.user.lastname}` : 'Logged in!');
    // this.router.navigateByUrl('/profile');
    this.router.navigate(['/profile'])
    this.auth.loggedUser=resp.user;
    
  }, (errorResp) => {
    this.auth.loggedIn.next(undefined);
    errorResp.error ? this.toastr.error(errorResp.error.errorMessage) : this.toastr.error('An unknown error has occured.');
    this.router.navigateByUrl('/login') ;
});
}
}
