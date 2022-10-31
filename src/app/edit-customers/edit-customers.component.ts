import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css']
})
export class EditCustomersComponent implements OnInit {
  cust:any;
  error:any;
  editCustForm : FormGroup;
  subscription: any;
  id: any;
  success: any;
  submitted = false;
  loading=false;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private custService: CustomersService,
    private activeRoute: ActivatedRoute
  ) {
    this.editCustForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(5)]],
      ic: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12), Validators.maxLength(12)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.subscription = this.activeRoute.paramMap
    .subscribe(params => {
      this.id = params.get('id');
    })
  }

  ngOnInit(): void {
    this.getSingleCust(this.id);
  }

  // convenience getter for easy access to form fields
  get f() { return this.editCustForm.controls; }

  getSingleCust(id:any): void {
    this.loading=true;
    this.custService.getCust(id)
    .subscribe( (res: any) => {
      this.cust = res;
      this.editCustForm.patchValue(this.cust);
      this.loading=false;
    },
    (err) => {
      this.error = err;
    })
  }

  editData(editCustForm:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.editCustForm.invalid) {
      return;
    }
    else {
      
      this.loading=true;
      this.custService.updateCust(editCustForm.value)
      .subscribe( (res:any) => {
        this.cust = res;
        this.success = "update successfully";
        this.route.navigate(['list-customer']);
      },
      (err:any) => this.error = err
      )
    }
  }

  forceNumber(e:any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(e.charCode);
    if (e.keyCode != 8 && !pattern.test(inputChar)) {
      e.preventDefault();
    }
  }
}
