import { NgModule } from '@angular/core';

import { P404Component } from './404.component';
import { P500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    PagesRoutingModule,
    CommonModule
  ],
  declarations: [
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent
  ],
  providers: [  ]
})
export class PagesModule { }
