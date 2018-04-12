import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router,
              private auth:AuthenticationService,
              private toastr:ToastrService) {}

passwordConfirming (group: FormGroup) {
let password = group.controls['pwd'].value;
let confirmPassword = group.controls['confirmPwd'].value;
if (password !== confirmPassword){
return {notSamePassword: true};
}
return null;
}

registerForm= new FormGroup ({
role: new FormControl ('user'),
username: new FormControl ('',Validators.required),
password: new FormGroup ({
pwd: new FormControl ('',[Validators.required]),
confirmPwd: new FormControl ('', [Validators.required])
},this.passwordConfirming),
firstname: new FormControl ('',Validators.required),
lastname: new FormControl ('',Validators.required),
mobile: new FormControl ('',Validators.required),
email: new FormControl ('',[Validators.required,Validators.email]),
gender: new FormControl ('Male'),
});

get username() { return this.registerForm.get('username'); };
get password() { return this.registerForm.get('password'); };
get firstname() { return this.registerForm.get('firstname'); };
get lastname() { return this.registerForm.get('lastname'); };
get mobile() { return this.registerForm.get('mobile'); };
get email() { return this.registerForm.get('email'); };
get gender() { return this.registerForm.get('gender'); };

ngOnInit() {
}

onSubmit(){

let form=this.registerForm.value;
let  credentials= { role:form.role,
username: form.username, password: form.password.pwd,
firstname: form.firstname, lastname: form.lastname,
email: form.email, mobile:form.mobile, gender: form.gender,    
};
// this.registerForm.reset();

  this.auth.register(credentials).subscribe((res) => {
  if(res){
  console.log(res);
  this.toastr.success('Register Successfully');
    this.router.navigateByUrl('/login');
  }
});
}
}
