import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PrivateLenderService } from '../core/services/privatelender.service';
import { IPrivateLender } from '../shared/interfaces';

@Component({
  selector: 'privatelender-edit',
  templateUrl: './privatelender-edit.component.html'
})
export class PrivateLenderEditComponent implements OnInit {

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
              private dataService: PrivateLenderService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCashBuyer(id);
    }
  }

  getCashBuyer(id: string) {
      this.dataService.getPrivateLender(id)
        .subscribe((privatelender: IPrivateLender) => {
          this.privatelender = privatelender;
        },
        (err: any) => console.log(err));
  }


  submit() {
        alert(this.privatelender.name);
      if (this.privatelender._id) {

        this.dataService.updatePrivateLender(this.privatelender)
          .subscribe((cashbuyer: IPrivateLender) => {
            if (cashbuyer) {
              this.router.navigate(['/privatelenders']);
            } else {
              this.errorMessage = 'Unable to save cashbuyer';
            }
          },
          (err: any) => console.log(err));

      } else {

        this.dataService.insertPrivateLender(this.privatelender)
          .subscribe((cashbuyer: IPrivateLender) => {
            if (cashbuyer) {
              this.router.navigate(['/privatelenders']);
            }
            else {
              this.errorMessage = 'Unable to add privatelenders';
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
    this.dataService.deletePrivateLender(this.privatelender._id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/privatelenders']);
          }
          else {
            this.errorMessage = 'Unable to delete privatelenders';
          }
        },
        (err) => console.log(err));
  }

}