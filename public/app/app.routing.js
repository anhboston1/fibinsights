"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var customers_component_1 = require("./customers/customers.component");
var customers_grid_component_1 = require("./customers/customers-grid.component");
var customer_edit_component_1 = require("./customers/customer-edit.component");
var customer_edit_reactive_component_1 = require("./customers/customer-edit-reactive.component");
var about_component_1 = require("./about/about.component");
var login_component_1 = require("./auth/login/login.component");
var signup_component_1 = require("./auth/signup/signup.component");
var cashbuyers_component_1 = require("./cashbuyers/cashbuyers.component");
var cashbuyers_grid_component_1 = require("./cashbuyers/cashbuyers-grid.component");
var cashbuyer_edit_component_1 = require("./cashbuyers/cashbuyer-edit.component");
var cashbuyer_edit_reactive_component_1 = require("./cashbuyers/cashbuyer-edit-reactive.component");
var privatelenders_component_1 = require("./privatelenders/privatelenders.component");
var privatelenders_grid_component_1 = require("./privatelenders/privatelenders-grid.component");
var privatelender_edit_component_1 = require("./privatelenders/privatelender-edit.component");
var privatelender_edit_reactive_component_1 = require("./privatelenders/privatelender-edit-reactive.component");
var routes = [
    { path: 'customers', component: customers_component_1.CustomersComponent },
    { path: 'customers/:id', component: customer_edit_component_1.CustomerEditComponent },
    { path: 'cashbuyers', component: cashbuyers_component_1.CashBuyersComponent },
    { path: 'cashbuyers/:id', component: cashbuyer_edit_component_1.CashBuyerEditComponent },
    { path: 'privatelenders', component: privatelenders_component_1.PrivateLendersComponent },
    { path: 'privatelenders/:id', component: privatelender_edit_component_1.PrivateLenderEditComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignUpComponent },
    //{ path: 'customers/:id', component: CustomerEditReactiveComponent },
    { path: '**', pathMatch: 'full', redirectTo: '/customers' } //catch any unfound routes and redirect to home page
];
exports.appRouting = {
    routes: router_1.RouterModule.forRoot(routes),
    components: [privatelenders_component_1.PrivateLendersComponent, privatelenders_grid_component_1.PrivateLendersGridComponent, privatelender_edit_component_1.PrivateLenderEditComponent, privatelender_edit_reactive_component_1.PrivateLenderEditReactiveComponent, cashbuyer_edit_component_1.CashBuyerEditComponent, cashbuyer_edit_reactive_component_1.CashBuyerEditReactiveComponent, cashbuyers_component_1.CashBuyersComponent, cashbuyers_grid_component_1.CashBuyersGridComponent, customers_component_1.CustomersComponent, customer_edit_component_1.CustomerEditComponent, customer_edit_reactive_component_1.CustomerEditReactiveComponent, customers_grid_component_1.CustomersGridComponent, about_component_1.AboutComponent, login_component_1.LoginComponent, signup_component_1.SignUpComponent]
};
//# sourceMappingURL=app.routing.js.map