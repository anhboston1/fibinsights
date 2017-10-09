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
var privatelender_service_1 = require("../core/services/privatelender.service");
var PrivateLendersComponent = (function () {
    function PrivateLendersComponent(router, dataService, dataFilter) {
        this.router = router;
        this.dataService = dataService;
        this.dataFilter = dataFilter;
        this.privatelenders = [];
        this.filteredPrivatelenders = [];
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    PrivateLendersComponent.prototype.ngOnInit = function () {
        this.title = 'Private Lender';
        this.getPrivateLenderPage(1);
    };
    PrivateLendersComponent.prototype.filterChanged = function (filterText) {
        if (filterText && this.privatelenders) {
            var props = ['name', 'phone', 'fundsavailable', 'interestrate', 'lendingin'];
            this.filteredPrivatelenders = this.dataFilter.filter(this.privatelenders, props, filterText);
        }
        else {
            this.filteredPrivatelenders = this.privatelenders;
        }
        //alert("filteredCashbuyers = " + this.filteredCashbuyers)
    };
    PrivateLendersComponent.prototype.pageChanged = function (page) {
        this.getPrivateLenderPage(page);
        //alert("filteredCashbuyers = " + this.filteredCashbuyers)
    };
    PrivateLendersComponent.prototype.getPrivateLenderPage = function (page) {
        var _this = this;
        this.dataService.getPrivateLendersPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.privatelenders = _this.filteredPrivatelenders = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getPrivateLendersPage() retrieved cashbuyers = '); });
    };
    PrivateLendersComponent = __decorate([
        core_1.Component({
            selector: 'privatelenders',
            templateUrl: './privatelenders.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            privatelender_service_1.PrivateLenderService,
            data_filter_service_1.DataFilterService])
    ], PrivateLendersComponent);
    return PrivateLendersComponent;
}());
exports.PrivateLendersComponent = PrivateLendersComponent;
//# sourceMappingURL=privatelenders.component.js.map