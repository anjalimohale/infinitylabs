import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  
import { FormsModule } from '@angular/forms'; 
import {MatDialogModule} from '@angular/material/dialog';

import { RouterModule, Routes } from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AddPropertyComponent } from './profile/add-property/add-property.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { DialogComponent } from './dialog/dialog.component';

const appRoutes: Routes = ([
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]  },
  { path: 'add-property', component: AddPropertyComponent },
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminProfileComponent,
    AddPropertyComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
   [RouterModule.forRoot(appRoutes) ],
   ToastrModule.forRoot(),
    HttpClientModule,BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,ToastrModule,
    MatGridListModule,MatSortModule,
    MatCardModule,MatFormFieldModule,
    MatListModule,MatIconModule,MatDialogModule

  ],
  entryComponents:[
    DialogComponent,
],
  exports:[RouterModule],
  providers: [AuthenticationService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
