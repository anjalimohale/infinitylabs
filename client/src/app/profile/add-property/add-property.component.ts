import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent {  
  form: FormGroup;
  avatar:any;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,private http : HttpClient) {
    this.createForm();
  }
object:string;
  file:any;

  createForm() {
    this.form = this.fb.group({
      title: ['',Validators.required],
     price: ['',Validators.required],
     select:['Choose here',Validators.required],
     cityname:['',Validators.required],
     description:['',Validators.required],
     email:['', Validators.required],
   mobile:['',[Validators.required,Validators.minLength(10)]],
    });

  }
  
filename:any;
  onFileChange(event) {
   
    let reader = new FileReader();


    if(event.target.files && event.target.files.length > 0) {
    
      this.file = event.target.files[0];
      console.log('event:',this.file)
      reader.readAsDataURL(this.file);
      reader.onload = () => {
      
         let avatar= {filename: this.file.name,
          filetype: this.file.type,
          value: reader.result.split(',')[1]
          
         }
        
         console.log('avarta:',avatar.filename);
         this.filename=avatar.filename;
      };
    }
    
  }
  onSubmit():void {
    var formdata:FormData=new FormData();
    console.log('form:',formdata);
    formdata.append("avatar",this.file)
    console.log('dfile:',formdata);
    let form=this.form.value;
        // let object={
        //   title:form.title,
        //   price:form.price+' '+form.select,
        //   cityname:form.cityname,
        //  description:form.description,
        //   email:form.email,
        //   mobile: form.mobile
        //  };
        let title = form.title;
    formdata.append("title",form.title)
    formdata.append("price",form.price+' '+form.select)
    formdata.append("cityname",form.cityname)
    formdata.append("description",form.description)
    formdata.append("email",form.email)
    formdata.append("mobile",form.mobile)
        // console.log('d:',form);
         console.log('formdata:',formdata);
    this.http.post("http://localhost:3300/users/property-add",formdata ).subscribe(result => {
         console.log('Result',result);

      
  });
//   this.http.post("http://localhost:3300/users/add1",object).subscribe(result => {
//     console.log(result);    
// })
}
  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
    
  }
}

