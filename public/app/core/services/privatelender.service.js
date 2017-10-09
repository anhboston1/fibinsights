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
/**
 * Created by phuongnguyen on 10/6/17.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
//Grab everything with import 'rxjs/Rx';
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var PrivateLenderService = (function () {
    function PrivateLenderService(http) {
        this.http = http;
        this.baseUrl = '/api/privatelenders';
    }
    PrivateLenderService.prototype.getPrivateLenders = function () {
        return this.http.get(this.baseUrl)
            .map(function (res) {
            var privatelenders = res.json();
            //this.calculateCustomersOrderTotal(customers);
            return privatelenders;
        })
            .catch(this.handleError);
    };
    PrivateLenderService.prototype.getPrivateLendersPage = function (page, pageSize) {
        return this.http.get(this.baseUrl + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            //alert("Entering getPrivateLendersPage");
            //console.log("Entering getPrivateLendersPage()...");
            var totalRecords = +res.headers.get('x-inlinecount');
            //alert("Entering getPrivateLendersPage 2");
            console.log("Entering getPrivateLendersPage()...2");
            var privatelenders = res.json();
            //alert(PrivateLenders );
            //alert(totalRecords );
            //this.calculateCustomersOrderTotal(customers);
            return {
                results: privatelenders,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    PrivateLenderService.prototype.getPrivateLender = function (id) {
        return this.http.get(this.baseUrl + '/' + id)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    PrivateLenderService.prototype.insertPrivateLender = function (privatelender) {
        return this.http.post(this.baseUrl, privatelender)
            .map(function (res) {
            var data = res.json();
            console.log('insertCustomer status: ' + data.status);
            return data.privatelender;
        })
            .catch(this.handleError);
    };
    PrivateLenderService.prototype.updatePrivateLender = function (privatelender) {
        return this.http.put(this.baseUrl + '/' + privatelender._id, privatelender)
            .map(function (res) {
            var data = res.json();
            console.log('updatePrivateLender status: ' + data.status);
            return data.cashbuyer;
        })
            .catch(this.handleError);
    };
    PrivateLenderService.prototype.deletePrivateLender = function (id) {
        return this.http.delete(this.baseUrl + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    PrivateLenderService.prototype.handleError = function (error) {
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
    PrivateLenderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], PrivateLenderService);
    return PrivateLenderService;
}());
exports.PrivateLenderService = PrivateLenderService;
//# sourceMappingURL=privatelender.service.js.map