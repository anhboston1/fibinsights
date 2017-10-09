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
var router_1 = require("@angular/router");
var data_filter_service_1 = require("../core/services/data-filter.service");
var cashbuyer_service_1 = require("../core/services/cashbuyer.service");
var CashBuyersComponent = (function () {
    function CashBuyersComponent(router, dataService, dataFilter) {
        this.router = router;
        this.dataService = dataService;
        this.dataFilter = dataFilter;
        this.cashbuyers = [];
        this.filteredCashbuyers = [];
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    CashBuyersComponent.prototype.ngOnInit = function () {
        this.title = 'Cash Buyer';
        this.getCashBuyerPage(1);
    };
    CashBuyersComponent.prototype.filterChanged = function (filterText) {
        if (filterText && this.cashbuyers) {
            var props = ['name', 'phone', 'buyingcriteria', 'buyingin', 'cashavailable'];
            this.filteredCashbuyers = this.dataFilter.filter(this.cashbuyers, props, filterText);
        }
        else {
            this.filteredCashbuyers = this.cashbuyers;
        }
        //alert("filteredCashbuyers = " + this.filteredCashbuyers)
    };
    CashBuyersComponent.prototype.pageChanged = function (page) {
        this.getCashBuyerPage(page);
        //alert("filteredCashbuyers = " + this.filteredCashbuyers)
    };
    CashBuyersComponent.prototype.getCashBuyerPage = function (page) {
        var _this = this;
        this.dataService.getCashBuyersPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.cashbuyers = _this.filteredCashbuyers = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getCashbuyersPage() retrieved cashbuyers = '); });
    };
    CashBuyersComponent = __decorate([
        core_1.Component({
            selector: 'cashbuyers',
            templateUrl: './cashbuyers.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            cashbuyer_service_1.CashBuyerService,
            data_filter_service_1.DataFilterService])
    ], CashBuyersComponent);
    return CashBuyersComponent;
}());
exports.CashBuyersComponent = CashBuyersComponent;
//# sourceMappingURL=cashbuyers.component.js.map