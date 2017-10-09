import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CashBuyerService } from '../core/services/cashbuyer.service';
import { ICashBuyer } from '../shared/interfaces';

@Component({
  selector: 'cashbuyer-edit',
  templateUrl: './cashbuyer-edit.component.html'
})
export class CashBuyerEditComponent implements OnInit {

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
              private dataService: CashBuyerService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCashBuyer(id);
    }
  }

  getCashBuyer(id: string) {
      this.dataService.getCashBuyer(id)
        .subscribe((cashbuyer: ICashBuyer) => {
          this.cashbuyer = cashbuyer;
        },
        (err: any) => console.log(err));
  }
    
  submit() {
        alert(this.cashbuyer.name);
      if (this.cashbuyer._id) {

        this.dataService.updateCashBuyer(this.cashbuyer)
          .subscribe((cashbuyer: ICashBuyer) => {
            if (cashbuyer) {
              this.router.navigate(['/cashbuyers']);
            } else {
              this.errorMessage = 'Unable to save cashbuyer';
            }
          },
          (err: any) => console.log(err));

      } else {

        this.dataService.insertCashBuyer(this.cashbuyer)
          .subscribe((cashbuyer: ICashBuyer) => {
            if (cashbuyer) {
              this.router.navigate(['/cashbuyers']);
            }
            else {
              this.errorMessage = 'Unable to add cashbuyer';
            }
          },
          (err: any) => console.log(err));
          
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
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