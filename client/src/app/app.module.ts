import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ViewDialogComponent } from './admin-profile/view-dialog/view-dialog.component';
import { DeleteDialogComponent } from './admin-profile/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from './admin-profile/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './admin-profile/add-dialog/add-dialog.component';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {CdkTableModule} from '@angular/cdk/table';


const appRoutes: Routes = ([
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]  },
  {path: 'admin-profile', component: AdminProfileComponent, canActivate: [AuthGuardService]  },
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminProfileComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ViewDialogComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),ToastrModule, HttpClientModule,
    ReactiveFormsModule, FormsModule, MatSelectModule,
    BrowserAnimationsModule, MatToolbarModule,MatSortModule,
    NoopAnimationsModule, MatInputModule, MatButtonModule,
    MatCardModule, MatDialogModule, MatProgressSpinnerModule,
    MatGridListModule, MatTableModule, MatPaginatorModule,
    CdkTableModule,
  ],
  exports:[RouterModule],
  entryComponents:[AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ViewDialogComponent,],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
