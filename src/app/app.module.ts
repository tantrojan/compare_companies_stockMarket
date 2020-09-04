import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CompareCompanyComponent } from './compare-company/compare-company.component';

@NgModule({
  declarations: [
    AppComponent,
    CompareCompanyComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,BsDatepickerModule.forRoot(),FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
