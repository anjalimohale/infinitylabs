import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   var payLoad= localStorage.getItem('log-details');
   var log= JSON.parse(log);
   console.log(JSON.parse(log));
  }

}
