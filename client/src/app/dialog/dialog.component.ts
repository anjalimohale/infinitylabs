import { Component, OnInit,Inject,Output,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent  {}
  
//   userForm = new FormGroup({
//     name: new FormControl(),
//     contact:new FormControl()
//  });

//   ngOnInit() { }
 
//   add(){
//     let form=this.userForm.value
//     console.log(form);
  
//   }
//   constructor(
//     public dialogRef: MatDialogRef<DialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any) { } 

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
