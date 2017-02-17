import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { SortService } from '../Services/SortService';

import { SeatComponent } from './app.seat';

@NgModule({
  declarations: [
    AppComponent,
    SeatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
