import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatSortModule } from '@angular/material/sort';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser;
  data1;

  constructor(private auth: AuthenticationService,private http : HttpClient) { 
    let payLoad = window.localStorage.getItem('log-details');
    if(payLoad){
    console.log(JSON.parse(payLoad));
    }
  }

  ngOnInit() {
    this.http.get("http://localhost:4001/getList").subscribe(result => {
      console.log(result);
      this.data1=result;
       });
   }


}
