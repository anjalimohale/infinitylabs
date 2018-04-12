import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  userForm = new FormGroup ({
    image: new FormControl(),
    title: new FormControl(),
    price: new FormControl(),
    cityname:new FormControl(),
    description: new FormControl(),
     email: new FormControl(),
     mobile: new FormControl(),
  });
  constructor(private http : HttpClient) { }
  ngOnInit() { }
  
add(){
    let form=this.userForm.value
    console.log(form);
    this.http.post("http://localhost:4001/property/add",form).subscribe(result => {
      console.log(result);
     });
    }
  }