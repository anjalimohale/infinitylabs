import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService{
    loggedIn = new BehaviorSubject<boolean>(false);
    loggedUser:String;
    constructor(private http:HttpClient){}

    login(log){
    return this.http.post('http://localhost:3300/users/login',log)
    }

    register(credentials){
    return this.http.post('http://localhost:3300/users/register',credentials);

    }
}