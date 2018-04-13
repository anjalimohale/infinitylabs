import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent, MatDialog } from '@angular/material';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { ViewDialogComponent } from './view-dialog/view-dialog.component';

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

  constructor(private auth:AuthenticationService,
              public dialog: MatDialog) {
   
    this.refresh();
    let payLoad = window.localStorage.getItem('log-details');
      if(payLoad){
      console.log(JSON.parse(payLoad));
      }
  }

  ngOnInit() {
  }
  refresh(){
    this.auth.getUsers().subscribe((users:any) => {
      // let users=JSON.stringify(data);
        console.log(users);
      this.page_size= 5
      this.length=users.data.length;
      this.dataSource.data=users.data;
      // console.log(this.dataSource);
      });
  }

  add(){
    console.log("Add called");
    const dialogRef = this.dialog.open(AddDialogComponent, {width: '400px', height: '530px'});
    dialogRef.afterClosed()
      .subscribe( selection => {
        if(selection){
        console.log(selection);
        this.auth.addUser(selection)
          .subscribe( res => {
            console.log(res);
            this.refresh();
          });
        }
    });
  }
     
  edit(user){
    console.log("Edit called",user);
    const dialogRef = this.dialog.open(EditDialogComponent, {width: '400px', height: '530px',data:user});
    dialogRef.afterClosed()
      .subscribe(selection => {
          if(selection){
          console.log(selection);
          this.auth.editUser(user._id,selection).subscribe(res => {
            console.log(res);
            this.refresh();
          });
        }
    });
  }
  
  delete(i,user){
    console.log("Delete called",user);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {width: '350px', height: '350px',data: user});
    dialogRef.afterClosed()
      .subscribe(selection => {
        if(selection){
        console.log(selection);
        this.auth.deleteUser(selection).subscribe(res => {
          console.log(res);
          this.dataSource.data.splice(i,1);
          this.refresh();
        });
      }
    });
  }
  
view(user){
  console.log("View called");
  const dialogRef = this.dialog.open(ViewDialogComponent, {width: '370px', height: '290px', data:user});
  dialogRef.afterClosed()
    .subscribe(selection => {
      if(selection){
        console.log(selection);
      }
    });
  }
}
