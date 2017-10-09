import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PrivateLenderService } from '../core/services/privatelender.service';
import { IPrivateLender } from '../shared/interfaces';

import { ValidationService } from '../shared/validation.service';

@Component({
  selector: 'privatelender-edit-reactive',
  templateUrl: './privatelender-edit-reactive.component.html'
})
export class PrivateLenderEditReactiveComponent implements OnInit {

    privatelenderForm: FormGroup;
    privatelender: IPrivateLender = {
        name: '',
        phone: '',
        fundsavailable: '',
        interestrate: '',
        lendingin: ''
    };
  //states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: PrivateLenderService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getPrivateLender(id);
    }

    //this.getStates();
    this.buildForm();
  }

  getPrivateLender(id: string) {
      this.dataService.getPrivateLender(id)
        .subscribe((cashbuyer: IPrivateLender) => {
          this.privatelender = cashbuyer;
          this.buildForm();
        },
        (err) => console.log(err));
  }

  buildForm() {
      this.privatelenderForm = this.formBuilder.group({
        name:  [this.privatelender.name, Validators.required],
        phone:   [this.privatelender.phone, Validators.required],
        fundsavailable:     [this.privatelender.fundsavailable, Validators.required],
          interestrate:      [this.privatelender.interestrate, [Validators.required]],
          lendingin:    [this.privatelender.lendingin, Validators.required]
      });
  }


  submit({ value, valid }: { value: IPrivateLender, valid: boolean }) {
      
      value._id = this.privatelender._id;
      //value.zip = this.cashbuyer.zip || 0;
      // var customer: ICustomer = {
      //   _id: this.customer._id,
      // };

      if (value._id) {

        this.dataService.updatePrivateLender(value)
          .subscribe((customer: IPrivateLender) => {
            if (customer) {
              this.router.navigate(['/customers']);
            }
            else {
              this.errorMessage = 'Unable to save customer';
            }
          },
          (err) => console.log(err));

      } else {

        this.dataService.insertPrivateLender(value)
          .subscribe((customer: IPrivateLender) => {
            if (customer) {
              this.router.navigate(['/privatelender']);
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
    this.dataService.deletePrivateLender(this.privatelender._id)
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