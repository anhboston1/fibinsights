import { Injectable } from '@angular/core';

import { ICustomer, ICashBuyer, IPrivateLender } from '../../shared/interfaces';


@Injectable()
export class TrackByService {
  
  customer(index: number, customer: ICustomer) {
    return customer._id;
  }

  cashbuyer(index: number, cashbuyer: ICashBuyer) {
    return cashbuyer._id;
  }

  privatelender(index: number, privatelender: IPrivateLender) {
    return privatelender._id;
  }
}