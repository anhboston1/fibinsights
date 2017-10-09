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
var forms_1 = require("@angular/forms");
var cashbuyer_service_1 = require("../core/services/cashbuyer.service");
var CashBuyerEditReactiveComponent = (function () {
    function CashBuyerEditReactiveComponent(router, route, dataService, formBuilder) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.cashbuyer = {
            name: '',
            phone: '',
            buyingin: '',
            cashavailable: '',
            buyingcriteria: ''
        };
        this.operationText = 'Insert';
    }
    CashBuyerEditReactiveComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getCashBuyer(id);
        }
        //this.getStates();
        this.buildForm();
    };
    CashBuyerEditReactiveComponent.prototype.getCashBuyer = function (id) {
        var _this = this;
        this.dataService.getCashBuyer(id)
            .subscribe(function (cashbuyer) {
            _this.cashbuyer = cashbuyer;
            _this.buildForm();
        }, function (err) { return console.log(err); });
    };
    CashBuyerEditReactiveComponent.prototype.buildForm = function () {
        this.cashbuyerForm = this.formBuilder.group({
            name: [this.cashbuyer.name, forms_1.Validators.required],
            phone: [this.cashbuyer.phone, forms_1.Validators.required],
            buyingin: [this.cashbuyer.buyingin, forms_1.Validators.required],
            buyingcriteria: [this.cashbuyer.buyingcriteria, [forms_1.Validators.required]],
            cashavailable: [this.cashbuyer.cashavailable, forms_1.Validators.required]
        });
    };
    CashBuyerEditReactiveComponent.prototype.submit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        value._id = this.cashbuyer._id;
        //value.zip = this.cashbuyer.zip || 0;
        // var customer: ICustomer = {
        //   _id: this.customer._id,
        // };
        if (value._id) {
            this.dataService.updateCashBuyer(value)
                .subscribe(function (customer) {
                if (customer) {
                    _this.router.navigate(['/customers']);
                }
                else {
                    _this.errorMessage = 'Unable to save customer';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertCashBuyer(value)
                .subscribe(function (customer) {
                if (customer) {
                    _this.router.navigate(['/cashbuyers']);
                }
                else {
                    _this.errorMessage = 'Unable to add cashbuyer';
                }
            }, function (err) { return console.log(err); });
        }
    };
    CashBuyerEditReactiveComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/cashbuyers']);
    };
    CashBuyerEditReactiveComponent.prototype.delete = function (event) {
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
    CashBuyerEditReactiveComponent = __decorate([
        core_1.Component({
            selector: 'cashbuyer-edit-reactive',
            templateUrl: './cashbuyer-edit-reactive.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            cashbuyer_service_1.CashBuyerService,
            forms_1.FormBuilder])
    ], CashBuyerEditReactiveComponent);
    return CashBuyerEditReactiveComponent;
}());
exports.CashBuyerEditReactiveComponent = CashBuyerEditReactiveComponent;
//# sourceMappingURL=cashbuyer-edit-reactive.component.js.map