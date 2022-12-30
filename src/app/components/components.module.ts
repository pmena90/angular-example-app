import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from "./login-form/login-form.component";
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from "./signup-form/signup.component";
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { WeatherDeleteConfirmComponent } from './weatherDeleteConfirm/weather-delete-confirm.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    SignupComponent,
    WeatherListComponent,
    WeatherFormComponent,
    WeatherDeleteConfirmComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    LoginFormComponent,
    SignupComponent,
    WeatherListComponent
  ]
})
export class ComponentsModule { }
