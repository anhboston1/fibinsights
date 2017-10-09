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
var privatelender_service_1 = require("../core/services/privatelender.service");
var PrivateLenderEditComponent = (function () {
    function PrivateLenderEditComponent(router, route, dataService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.privatelender = {
            name: '',
            phone: '',
            fundsavailable: '',
            interestrate: '',
            lendingin: ''
        };
        this.operationText = 'Insert';
    }
    PrivateLenderEditComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getCashBuyer(id);
        }
    };
    PrivateLenderEditComponent.prototype.getCashBuyer = function (id) {
        var _this = this;
        this.dataService.getPrivateLender(id)
            .subscribe(function (privatelender) {
            _this.privatelender = privatelender;
        }, function (err) { return console.log(err); });
    };
    PrivateLenderEditComponent.prototype.submit = function () {
        var _this = this;
        alert(this.privatelender.name);
        if (this.privatelender._id) {
            this.dataService.updatePrivateLender(this.privatelender)
                .subscribe(function (cashbuyer) {
                if (cashbuyer) {
                    _this.router.navigate(['/privatelenders']);
                }
                else {
                    _this.errorMessage = 'Unable to save cashbuyer';
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.insertPrivateLender(this.privatelender)
                .subscribe(function (cashbuyer) {
                if (cashbuyer) {
                    _this.router.navigate(['/privatelenders']);
                }
                else {
                    _this.errorMessage = 'Unable to add privatelenders';
                }
            }, function (err) { return console.log(err); });
        }
    };
    PrivateLenderEditComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/']);
    };
    PrivateLenderEditComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deletePrivateLender(this.privatelender._id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/privatelenders']);
            }
            else {
                _this.errorMessage = 'Unable to delete privatelenders';
            }
        }, function (err) { return console.log(err); });
    };
    PrivateLenderEditComponent = __decorate([
        core_1.Component({
            selector: 'privatelender-edit',
            templateUrl: './privatelender-edit.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            privatelender_service_1.PrivateLenderService])
    ], PrivateLenderEditComponent);
    return PrivateLenderEditComponent;
}());
exports.PrivateLenderEditComponent = PrivateLenderEditComponent;
//# sourceMappingURL=privatelender-edit.component.js.map