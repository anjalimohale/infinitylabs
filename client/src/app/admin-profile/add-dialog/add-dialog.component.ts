import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  id:string;
  fname:string;
  lname:string;
  file:any;

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              private httpClient:HttpClient) { }
              
	uploadForm = new FormGroup ({
    role: new FormControl ('user'),
    username: new FormControl ('',Validators.required),
    password: new FormControl ('',Validators.required),
    firstname: new FormControl ('',Validators.required),
    lastname: new FormControl (''),
    mobile: new FormControl ('',Validators.required),
    email: new FormControl ('',[Validators.required,Validators.email]),
    gender: new FormControl ('Male'),
  });
  

get username() { return this.uploadForm.get('username'); };
get password() { return this.uploadForm.get('password'); };
get firstname() { return this.uploadForm.get('firstname'); };
get lastname() { return this.uploadForm.get('lastname'); };
get mobile() { return this.uploadForm.get('mobile'); };
get email() { return this.uploadForm.get('email'); };
get gender() { return this.uploadForm.get('gender'); };

//   filesToUpload: Array<File> = [];
//   formData: any = new FormData();
   
//  upload() {
//     // let data={id:form.id,firstname:form.fname,lastname:form.lname,avatar:this.file}
//     const files: Array<File> = this.filesToUpload;
//     this.formData.append("uploads[]", files[0], files[0]['name']);
//   }

// filepath:any;
//   fileChangeEvent(fileInput: any) {
//     console.log(fileInput.target.files[0]);
//     this.filesToUpload = <Array<File>>fileInput.target.files;
//     this.file =this.data.id+'_'+fileInput.target.files[0]['name'];
//     this.upload();
//     console.log(this.file);
//   }

  onClick(){
    let form=this.uploadForm.value;
    // var obj = {
    //   id:form.id,
    //   firstname:form.fname,
    //   lastname:form.lname,
    //   avatar:this.file
    // };

    // this.formData.append("jsondata",JSON.stringify(obj));

    // this.httpClient.post('http://localhost:3000/upload',formData)
    //   .subscribe(files => console.log('files', files));

   this.dialogRef.close(form);
  }
  onClickClose(){
    this.dialogRef.close();
  }

}
