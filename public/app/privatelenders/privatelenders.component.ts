import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataFilterService } from '../core/services/data-filter.service';
import { PrivateLenderService } from '../core/services/privatelender.service';
import { IPrivateLender, IPagedResults } from '../shared/interfaces';

@Component({ 
  selector: 'privatelenders', 
  templateUrl: './privatelenders.component.html'
})
export class PrivateLendersComponent implements OnInit {

  title: string;
  privatelenders: IPrivateLender[] = [];
  filteredPrivatelenders: IPrivateLender[] = [];

  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private router: Router, 
              private dataService: PrivateLenderService,
              private dataFilter: DataFilterService) { }
  
  ngOnInit() {
    this.title = 'Private Lender';
    this.getPrivateLenderPage(1);
  }

  filterChanged(filterText: string) {
    if (filterText && this.privatelenders) {
        let props = ['name', 'phone', 'fundsavailable', 'interestrate', 'lendingin'];
        this.filteredPrivatelenders = this.dataFilter.filter(this.privatelenders, props, filterText);
    }
    else {
      this.filteredPrivatelenders = this.privatelenders;
    }
    //alert("filteredCashbuyers = " + this.filteredCashbuyers)
  }

  pageChanged(page: number) {
    this.getPrivateLenderPage(page);
    //alert("filteredCashbuyers = " + this.filteredCashbuyers)
  }

  getPrivateLenderPage(page: number) {
    this.dataService.getPrivateLendersPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IPrivateLender[]>) => {
          
          this.privatelenders = this.filteredPrivatelenders = response.results;
          this.totalRecords = response.totalRecords;

        },
        (err: any) => console.log(err),
        () => console.log('getPrivateLendersPage() retrieved cashbuyers = '));
  }

}