import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  customers: any;
  spinner: any;
  loading=false;

  constructor(
    private custService: CustomersService,
    private route: Router) { }

  ngOnInit(): void {
    this.loading=true;
    this.custService.listCust()
    .subscribe((data:any) => {
      this.customers = data.Customers;
      this.loading=false;
    });
  }

  delCust(id:any): void{
    this.loading=true;

    this.custService.deleteCust(id)
    .subscribe(data => {
      setTimeout( () => {
        this.custService.listCust()
        .subscribe((data:any) => {
          this.customers = data.Customers;
          this.loading=false;
        });
      }, 1000);
    });
    
  }

  gotoAddCust() {
    this.route.navigateByUrl('/add-customer');
};

}
