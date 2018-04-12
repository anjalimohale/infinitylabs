import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser;
  constructor(private auth: AuthenticationService) { 
    let payLoad = window.localStorage.getItem('log-details');
    if(payLoad){
    console.log(JSON.parse(payLoad));
    }
  }

  ngOnInit() {
   
  }

}
