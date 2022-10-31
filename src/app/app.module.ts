import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCustomersComponent,
    ListCustomersComponent,
    EditCustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
