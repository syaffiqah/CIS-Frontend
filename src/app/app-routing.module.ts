import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomersComponent } from './add-customers/add-customers.component';
import { AppComponent } from './app.component';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';

const routes: Routes = [
  { path: '',   redirectTo: '/list-customer', pathMatch: 'full' }, // redirect to `list-component`
  { path: 'add-customer', component: AddCustomersComponent},
  { path: 'list-customer', component: ListCustomersComponent},
  { path: 'edit/:id', component: EditCustomersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
