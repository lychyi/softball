import { NgModule } from '@angular/core';
import { MdProgressSpinnerModule } from '@angular/material';

import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [
    MdProgressSpinnerModule
  ],
  declarations: [
    SpinnerComponent
  ],
  exports: [
    SpinnerComponent
  ]
})

export class SpinnerModule { }
