import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/services/data-filter.service';
import { CashBuyerService } from '../core/services/cashbuyer.service';
import { ICashBuyer, IPagedResults } from '../shared/interfaces';

@Component({ 
  selector: 'cashbuyers', 
  templateUrl: './cashbuyers.component.html'
})
export class CashBuyersComponent implements OnInit {

  title: string;
  cashbuyers: ICashBuyer[] = [];
  filteredCashbuyers: ICashBuyer[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: CashBuyerService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Cash Buyer';
    this.getCashBuyerPage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.cashbuyers) {
        let props = ['name', 'phone', 'buyingcriteria', 'buyingin', 'cashavailable'];
        this.filteredCashbuyers = this.dataFilter.filter(this.cashbuyers, props, filterText);
    }
    else {
      this.filteredCashbuyers = this.cashbuyers;
    }
    //alert("filteredCashbuyers = " + this.filteredCashbuyers)
  }

  pageChanged(page: number) {
    this.getCashBuyerPage(page);
    //alert("filteredCashbuyers = " + this.filteredCashbuyers)
  }

  getCashBuyerPage(page: number) {
    this.dataService.getCashBuyersPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<ICashBuyer[]>) => {
          
          this.cashbuyers = this.filteredCashbuyers = response.results;
          this.totalRecords = response.totalRecords;

        },
        (err: any) => console.log(err),
        () => console.log('getCashbuyersPage() retrieved cashbuyers = '));
  }

}