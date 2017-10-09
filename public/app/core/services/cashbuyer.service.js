"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var CashBuyerService = (function () {
    function CashBuyerService(http) {
        this.http = http;
        this.baseUrl = '/api/cashbuyers';
    }
    CashBuyerService.prototype.getCashBuyers = function () {
        return this.http.get(this.baseUrl)
            .map(function (res) {
            var cashbuyers = res.json();
            //this.calculateCustomersOrderTotal(customers);
            return cashbuyers;
        })
            .catch(this.handleError);
    };
    CashBuyerService.prototype.getCashBuyersPage = function (page, pageSize) {
        return this.http.get(this.baseUrl + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            //alert("Entering getCashBuyersPage");
            //console.log("Entering getCashBuyersPage()...");
            var totalRecords = +res.headers.get('x-inlinecount');
            //alert("Entering getCashBuyersPage 2");
            console.log("Entering getCashBuyersPage()...2");
            var cashbuyers = res.json();
            //alert(cashbuyers );
            //alert(totalRecords );
            //this.calculateCustomersOrderTotal(customers);
            return {
                results: cashbuyers,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    CashBuyerService.prototype.getCashBuyer = function (id) {
        return this.http.get(this.baseUrl + '/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    CashBuyerService.prototype.insertCashBuyer = function (cashbuyer) {
        return this.http.post(this.baseUrl, cashbuyer)
            .map(function (res) {
            var data = res.json();
            console.log('insertCustomer status: ' + data.status);
            console.log('insertCustomer status: ' + data);
            return data.cashbuyer;
        })
            .catch(this.handleError);
    };
    CashBuyerService.prototype.updateCashBuyer = function (cashbuyer) {
        return this.http.put(this.baseUrl + '/' + cashbuyer._id, cashbuyer)
            .map(function (res) {
            var data = res.json();
            console.log('updateCashBuyer status: ' + data.status);
            return data.cashbuyer;
        })
            .catch(this.handleError);
    };
    CashBuyerService.prototype.deleteCashBuyer = function (id) {
        return this.http.delete(this.baseUrl + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    /*
     insertCustomer(customer: ICustomer) : Observable<ICustomer> {
     return this.http.post(this.baseUrl, customer)
     .map((res: Response) => {
     const data = res.json();
     console.log('insertCustomer status: ' + data.status);
     return data.customer;
     })
     .catch(this.handleError);
     }

     updateCustomer(customer: ICustomer) : Observable<ICustomer> {
     return this.http.put(this.baseUrl + '/' + customer._id, customer)
     .map((res: Response) => {
     const data = res.json();
     console.log('updateCustomer status: ' + data.status);
     return data.customer;
     })
     .catch(this.handleError);
     }

     deleteCustomer(id: string) : Observable<boolean> {
     return this.http.delete(this.baseUrl + '/' + id)
     .map((res: Response) => res.json().status)
     .catch(this.handleError);
     }

     //Not used but could be called to pass "options" (3rd parameter) to
     //appropriate POST/PUT/DELETE calls made with http
     getRequestOptions() {
     const csrfToken = ''; //would retrieve from cookie or from page
     const options = new RequestOptions({
     headers: new Headers({ 'x-xsrf-token': csrfToken })
     });
     return options;
     }

     getStates(): Observable<IState[]> {
     return this.http.get('/api/states')
     .map((res: Response) => res.json())
     .catch(this.handleError);
     }

     calculateCustomersOrderTotal(customers: ICustomer[]) {
     for (let customer of customers) {
     if (customer && customer.orders) {
     let total = 0;
     for (let order of customer.orders) {
     total += (order.price * order.quantity);
     }
     customer.orderTotal = total;
     }
     }
     }
     */
    CashBuyerService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
            // Use the following instead if using lite-server
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable_1.Observable.throw(error || 'Node.js server error');
    };
    CashBuyerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], CashBuyerService);
    return CashBuyerService;
}());
exports.CashBuyerService = CashBuyerService;
//# sourceMappingURL=cashbuyer.service.js.map