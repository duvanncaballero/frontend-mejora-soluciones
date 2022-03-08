import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from "../../shared/shared.module";
import {ComponentsModule} from "../../shared/components/components.module";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatCardModule,
    SharedModule,
    ComponentsModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class LoginModule { }
