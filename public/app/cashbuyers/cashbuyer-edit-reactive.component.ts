import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CashBuyerService } from '../core/services/cashbuyer.service';
import { ICashBuyer } from '../shared/interfaces';
import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'cashbuyer-edit-reactive',
  templateUrl: './cashbuyer-edit-reactive.component.html'
})
export class CashBuyerEditReactiveComponent implements OnInit {

  cashbuyerForm: FormGroup;
    cashbuyer: ICashBuyer = {
        name: '',
        phone: '',
        buyingin: '',
        cashavailable: '',
        buyingcriteria: ''
    };
  //states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: CashBuyerService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCashBuyer(id);
    }

    //this.getStates();
    this.buildForm();
  }

  getCashBuyer(id: string) {
      this.dataService.getCashBuyer(id)
        .subscribe((cashbuyer: ICashBuyer) => {
          this.cashbuyer = cashbuyer;
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.cashbuyerForm = this.formBuilder.group({
        name:  [this.cashbuyer.name, Validators.required],
        phone:   [this.cashbuyer.phone, Validators.required],
        buyingin:     [this.cashbuyer.buyingin, Validators.required],
        buyingcriteria:      [this.cashbuyer.buyingcriteria, [Validators.required]],
        cashavailable:    [this.cashbuyer.cashavailable, Validators.required]
      });
  }


  submit({ value, valid }: { value: ICashBuyer, valid: boolean }) {
      
      value._id = this.cashbuyer._id;
      //value.zip = this.cashbuyer.zip || 0;
      // var customer: ICustomer = {
      //   _id: this.customer._id,
      // };

      if (value._id) {

        this.dataService.updateCashBuyer(value)
          .subscribe((customer: ICashBuyer) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to save customer';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertCashBuyer(value)
          .subscribe((customer: ICashBuyer) => {
            if (customer) {
              this.router.navigate(['/cashbuyers']);
            }
            else {
              this.errorMessage = 'Unable to add cashbuyer';
            }
          },
          (err) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/cashbuyers']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteCashBuyer(this.cashbuyer._id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/cashbuyers']);
          }
          else {
            this.errorMessage = 'Unable to delete cashbuyer';
          }
        },
        (err) => console.log(err));
  }

}