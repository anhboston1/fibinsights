import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy } from '@angular/http';

import { GrowlerModule } from './growler/growler.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DataService } from './services/data.service';
import { CashBuyerService } from './services/cashbuyer.service';
import { PrivateLenderService } from './services/privatelender.service';
import { DataFilterService } from './services/data-filter.service';
import { Sorter } from './services/sorter';
import { TrackByService } from './services/trackby.service';
import { EnsureModuleLoadedOnceGuard } from '../shared/ensureModuleLoadedOnceGuard';


import { ModalModule } from './modal/modal.module';

import { FilterService } from './services/filter.service';
import { SorterService } from './services/sorter.service';
import { DialogService } from './services/dialog.service';
import { ValidationService } from './services/validation.service';
import { AuthService } from'./services/auth.service';

@NgModule({
  imports: [ CommonModule, RouterModule, HttpModule, GrowlerModule, ModalModule ],
  exports: [ GrowlerModule, RouterModule, HttpModule, ModalModule, NavbarComponent ],
  declarations: [ NavbarComponent ],
  providers: [
    //Default XSRF provider setup (change cookie or header name if needed): 
    //{ provide: XSRFStrategy, useValue: new CookieXSRFStrategy('XSRF-TOKEN', 'X-XSRF-TOKEN') },
    DataService, DataFilterService, TrackByService, Sorter, PrivateLenderService,
    FilterService, SorterService, ValidationService, AuthService, DialogService, CashBuyerService
  ] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    //Ensure that CoreModule is only loaded into AppModule

  //Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }  

}



