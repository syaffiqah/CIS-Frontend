import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../customers.service';
import { first } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent implements OnInit {
  newCustForm : FormGroup;
  submitted = false;
  loading=false;
  value:any;
  extraInfo=false;
  age:any;
  gender:any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private custService: CustomersService
  ) {
    this.newCustForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      ic: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12), Validators.maxLength(12)]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.newCustForm.controls; }

  postData(newCustForm:any){
    this.submitted = true;
    // stop here if form is invalid
    if (this.newCustForm.invalid) {
      return;
    }
    else {
      this.loading=true;
      this.custService.addCust(
        this.newCustForm.value.name,
        this.newCustForm.value.ic,
        this.newCustForm.value.phone,
        this.newCustForm.value.email
      )
      .pipe(first()).subscribe( data => {
        this.route.navigate(['list-customer']);
      },
      error => {
      });

    }
  }

  forceNumber(e:any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(e.charCode);
    if (e.keyCode != 8 && !pattern.test(inputChar)) {
      e.preventDefault();
    }
  }

  checkIC(e:any){
    this.value = e.target.value;
    if( this.value.length == 12 ){
      /*get value from form*/
      var dob = this.value.substr(0, 6); 	 
      var icno =  this.value.substr(8, 13); 

      //arrange date from ic number
      var first = dob.substr(0, 2);  
      var second = dob.substr(2, 2); 
      var third = dob.substr(4,4);   

      //convert dateformat to yy-mm-dd
      var dateraw = first+'-'+second+'-'+third; 
      
      //calculate age by dateraw 
      var currentAge = moment().diff(dateraw, 'years'); 

      //check gender using ic number
      if (icno % 2 == 0){
        this.gender = "Female";
      }
      else{
        this.gender = "Male";
      }

      this.age = currentAge;
      this.extraInfo = true;
    }


  }
}

