import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdSelectModule, MdButtonModule } from '@angular/material';

import { SpinnerModule } from '../shared/components/spinner.module';

import { HomeSandbox } from './home.sandbox';
import { HomeComponent } from './home.component';

import { CookieService } from 'angular2-cookie/services/cookies.service';
@NgModule({
  imports: [
    CommonModule,
    SpinnerModule,
    MdSelectModule,
    MdButtonModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeSandbox,
    CookieService
  ]
})
export class HomeModule { }
