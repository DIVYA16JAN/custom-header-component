import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AgGridModule} from 'ag-grid-angular';
import { CheckboxHeaderComponent } from './checkbox-header/checkbox-header.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckboxHeaderComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([CheckboxHeaderComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
