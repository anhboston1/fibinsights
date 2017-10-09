import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { CustomersGridComponent } from './customers/customers-grid.component';
import { CustomerEditComponent } from './customers/customer-edit.component';
import { CustomerEditReactiveComponent } from './customers/customer-edit-reactive.component';
import { IRouting } from './shared/interfaces';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';

import { CashBuyersComponent } from './cashbuyers/cashbuyers.component';
import { CashBuyersGridComponent } from './cashbuyers/cashbuyers-grid.component';
import { CashBuyerEditComponent } from './cashbuyers/cashbuyer-edit.component';
import { CashBuyerEditReactiveComponent } from './cashbuyers/cashbuyer-edit-reactive.component';

import { PrivateLendersComponent } from './privatelenders/privatelenders.component';
import { PrivateLendersGridComponent } from './privatelenders/privatelenders-grid.component';
import { PrivateLenderEditComponent } from './privatelenders/privatelender-edit.component';
import { PrivateLenderEditReactiveComponent } from './privatelenders/privatelender-edit-reactive.component';

const routes: Routes = [
    { path: 'customers', component: CustomersComponent},
    { path: 'customers/:id', component: CustomerEditComponent},
    { path: 'cashbuyers', component: CashBuyersComponent},
    { path: 'cashbuyers/:id', component: CashBuyerEditComponent},
    { path: 'privatelenders', component: PrivateLendersComponent},
    { path: 'privatelenders/:id', component: PrivateLenderEditComponent},
    { path: 'about', component: AboutComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignUpComponent},
    //{ path: 'customers/:id', component: CustomerEditReactiveComponent },
    { path: '**', pathMatch:'full', redirectTo: '/customers' } //catch any unfound routes and redirect to home page
];

export const appRouting: IRouting = {
    routes: RouterModule.forRoot(routes),
    components: [ PrivateLendersComponent,PrivateLendersGridComponent, PrivateLenderEditComponent, PrivateLenderEditReactiveComponent, CashBuyerEditComponent, CashBuyerEditReactiveComponent, CashBuyersComponent, CashBuyersGridComponent, CustomersComponent, CustomerEditComponent, CustomerEditReactiveComponent, CustomersGridComponent, AboutComponent, LoginComponent, SignUpComponent]
};

