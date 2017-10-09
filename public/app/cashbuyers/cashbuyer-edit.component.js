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
var cashbuyer_service_1 = require("../core/services/cashbuyer.service");
var CashBuyerEditComponent = (function () {
    function CashBuyerEditComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.cashbuyer = {
            name: '',
            phone: '',
            buyingin: '',
            cashavailable: '',
            buyingcriteria: ''
        };
        this.operationText = 'Insert';
    }
    CashBuyerEditComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getCashBuyer(id);
        }
    };
    CashBuyerEditComponent.prototype.getCashBuyer = function (id) {
        var _this = this;
        this.dataService.getCashBuyer(id)
            .subscribe(function (cashbuyer) {
            _this.cashbuyer = cashbuyer;
        }, function (err) { return console.log(err); });
    };
    CashBuyerEditComponent.prototype.submit = function () {
        var _this = this;
        alert(this.cashbuyer.name);
        if (this.cashbuyer._id) {
            this.dataService.updateCashBuyer(this.cashbuyer)
                .subscribe(function (cashbuyer) {
                if (cashbuyer) {
                    _this.router.navigate(['/cashbuyers']);
                }
                else {
                    _this.errorMessage = 'Unable to save cashbuyer';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertCashBuyer(this.cashbuyer)
                .subscribe(function (cashbuyer) {
                if (cashbuyer) {
                    _this.router.navigate(['/cashbuyers']);
                }
                else {
                    _this.errorMessage = 'Unable to add cashbuyer';
                }
            }, function (err) { return console.log(err); });
        }
    };
    CashBuyerEditComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/']);
    };
    CashBuyerEditComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteCashBuyer(this.cashbuyer._id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/cashbuyers']);
            }
            else {
                _this.errorMessage = 'Unable to delete cashbuyer';
            }
        }, function (err) { return console.log(err); });
    };
    CashBuyerEditComponent = __decorate([
        core_1.Component({
            selector: 'cashbuyer-edit',
            templateUrl: './cashbuyer-edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            cashbuyer_service_1.CashBuyerService])
    ], CashBuyerEditComponent);
    return CashBuyerEditComponent;
}());
exports.CashBuyerEditComponent = CashBuyerEditComponent;
//# sourceMappingURL=cashbuyer-edit.component.js.map