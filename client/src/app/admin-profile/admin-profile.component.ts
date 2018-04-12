import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, PageEvent, MatDialog} from '@angular/material';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  displayedColumns = ['id','firstname','lastname','username','password','email','mobile','gender','actions'];
  dataSource= new MatTableDataSource();
  currentPage:PageEvent;
  page_size;
  length;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private auth:AuthenticationService) {
   
    this.auth.getUsers().subscribe((users:any) => {
    // let users=JSON.stringify(data);
      console.log(users);
    this.page_size= 5
    this.length=users.data.length;
    this.dataSource.data=users.data;
    // console.log(this.dataSource);
    });
    let payLoad = window.localStorage.getItem('log-details');
      if(payLoad){
      console.log(JSON.parse(payLoad));
      }
  }

  ngOnInit() {
  }

}
