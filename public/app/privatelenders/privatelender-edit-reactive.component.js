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
var privatelender_service_1 = require("../core/services/privatelender.service");
var PrivateLenderEditReactiveComponent = (function () {
    function PrivateLenderEditReactiveComponent(router, route, dataService, formBuilder) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.privatelender = {
            name: '',
            phone: '',
            fundsavailable: '',
            interestrate: '',
            lendingin: ''
        };
        this.operationText = 'Insert';
    }
    PrivateLenderEditReactiveComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getPrivateLender(id);
        }
        //this.getStates();
        this.buildForm();
    };
    PrivateLenderEditReactiveComponent.prototype.getPrivateLender = function (id) {
        var _this = this;
        this.dataService.getPrivateLender(id)
            .subscribe(function (cashbuyer) {
            _this.privatelender = cashbuyer;
            _this.buildForm();
        }, function (err) { return console.log(err); });
    };
    PrivateLenderEditReactiveComponent.prototype.buildForm = function () {
        this.privatelenderForm = this.formBuilder.group({
            name: [this.privatelender.name, forms_1.Validators.required],
            phone: [this.privatelender.phone, forms_1.Validators.required],
            fundsavailable: [this.privatelender.fundsavailable, forms_1.Validators.required],
            interestrate: [this.privatelender.interestrate, [forms_1.Validators.required]],
            lendingin: [this.privatelender.lendingin, forms_1.Validators.required]
        });
    };
    PrivateLenderEditReactiveComponent.prototype.submit = function (_a) {
        var _this = this;
        var value = _a.value, valid = _a.valid;
        value._id = this.privatelender._id;
        //value.zip = this.cashbuyer.zip || 0;
        // var customer: ICustomer = {
        //   _id: this.customer._id,
        // };
        if (value._id) {
            this.dataService.updatePrivateLender(value)
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
            this.dataService.insertPrivateLender(value)
                .subscribe(function (customer) {
                if (customer) {
                    _this.router.navigate(['/privatelender']);
                }
                else {
                    _this.errorMessage = 'Unable to add cashbuyer';
                }
            }, function (err) { return console.log(err); });
        }
    };
    PrivateLenderEditReactiveComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/cashbuyers']);
    };
    PrivateLenderEditReactiveComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deletePrivateLender(this.privatelender._id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/cashbuyers']);
            }
            else {
                _this.errorMessage = 'Unable to delete cashbuyer';
            }
        }, function (err) { return console.log(err); });
    };
    PrivateLenderEditReactiveComponent = __decorate([
        core_1.Component({
            selector: 'privatelender-edit-reactive',
            templateUrl: './privatelender-edit-reactive.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            privatelender_service_1.PrivateLenderService,
            forms_1.FormBuilder])
    ], PrivateLenderEditReactiveComponent);
    return PrivateLenderEditReactiveComponent;
}());
exports.PrivateLenderEditReactiveComponent = PrivateLenderEditReactiveComponent;
//# sourceMappingURL=privatelender-edit-reactive.component.js.map