import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IPrivateLender } from '../shared/interfaces';
import { Sorter } from '../core/services/sorter';
import { TrackByService } from '../core/services/trackby.service';

@Component({ 
  selector: 'privatelenders-grid', 
  templateUrl: './privatelenders-grid.component.html',
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class PrivateLendersGridComponent implements OnInit {

  @Input() privatelenders: IPrivateLender[] = [];

  constructor(private sorter: Sorter, public trackby: TrackByService) { }
   
  ngOnInit() {

  }

  sort(prop: string) {
      this.sorter.sort(this.privatelenders, prop);
  }

}
