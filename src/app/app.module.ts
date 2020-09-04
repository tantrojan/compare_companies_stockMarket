import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { CompareCompanyComponent } from './compare-company/compare-company.component';

@NgModule({
  declarations: [
    AppComponent,
    CompareCompanyComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,
    ReactiveFormsModule,ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
