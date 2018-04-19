import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatSortModule } from '@angular/material/sort';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatDialog }  from '@angular/material';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser;
  data1;
  name:String;
  contact:String;


  constructor(private auth: AuthenticationService,private http : HttpClient,public dialog:MatDialog) { 
    let payLoad = window.localStorage.getItem('log-details');
    if(payLoad){
    console.log(JSON.parse(payLoad));
    }
  }
  // openDialog(post) {
  //   const dialogRef = this.dialog.open(DialogComponent,{
  //     height:'200px',
  //     data: { name:this.name,contact:this.contact }
  //   })
  
  //   dialogRef.afterClosed().subscribe((result)=>{
  //     console.log(`dialog result : ${result}`);
  //   });
  // }

  ngOnInit() { 
    this.http.get("http://localhost:3300/users/getlist").subscribe(result => {
      console.log('getlist:',result);
      this.data1=result;
       });
   
      }
}
