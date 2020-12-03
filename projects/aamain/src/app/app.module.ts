import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// import { AalibModule } from 'projects/aalib/src';
import { AalibModule } from 'aalib';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    AalibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
