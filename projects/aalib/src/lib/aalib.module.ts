import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { SearchboxComponent } from './searchbox/searchbox.component';



@NgModule({
  declarations: [
    SearchboxComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    SearchboxComponent,
  ]
})
export class AalibModule { }
