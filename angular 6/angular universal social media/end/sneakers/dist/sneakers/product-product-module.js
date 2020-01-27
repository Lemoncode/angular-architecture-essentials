(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["product-product-module"],{

/***/ "./src/app/product/components/product/product.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/product/components/product/product.component.ts ***!
  \*****************************************************************/
/*! exports provided: ProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductComponent", function() { return ProductComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/product */ "./src/app/product/models/product.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProductComponent = /** @class */ (function () {
    function ProductComponent() {
    }
    ProductComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", _models_product__WEBPACK_IMPORTED_MODULE_1__["Product"])
    ], ProductComponent.prototype, "product", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], ProductComponent.prototype, "details", void 0);
    ProductComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product',
            template: "\n    <div class=\"card\">\n      <div class=\"card-header\">\n        <h4>\n          <ng-container *ngIf=\"details; else link\">\n            {{product.name}}\n          </ng-container>\n          <ng-template #link>\n            <a [routerLink]=\"product.id\">{{product.name}}</a>\n          </ng-template>\n        </h4>\n      </div>\n      <img [src]=\"product.image\" [alt]=\"product.name\" class=\"card-img\">\n      <div class=\"card-body\" *ngIf=\"!details\">\n        <p class=\"my-2\">{{product.description}}</p>\n      </div>\n      <div class=\"card-footer\">\n        <h4 class=\"text-right my-2\">{{product.price}}</h4>\n      </div>\n    </div>\n  ",
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ProductComponent);
    return ProductComponent;
}());



/***/ }),

/***/ "./src/app/product/components/products/products.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/product/components/products/products.component.ts ***!
  \*******************************************************************/
/*! exports provided: ProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsComponent", function() { return ProductsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProductsComponent = /** @class */ (function () {
    function ProductsComponent() {
    }
    ProductsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], ProductsComponent.prototype, "products", void 0);
    ProductsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-products',
            template: "\n    <div class=\"row\">\n      <div class=\"col-md-6 col-lg-4 mb-3\" *ngFor=\"let product of products\">\n        <app-product [product]=\"product\" [details]=\"false\"></app-product>\n      </div>\n    </div>\n  ",
            styles: []
        }),
        __metadata("design:paramtypes", [])
    ], ProductsComponent);
    return ProductsComponent;
}());



/***/ }),

/***/ "./src/app/product/conatiners/product-details/product-details.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/product/conatiners/product-details/product-details.component.ts ***!
  \*********************************************************************************/
/*! exports provided: ProductDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductDetailsComponent", function() { return ProductDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _models_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/product */ "./src/app/product/models/product.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProductDetailsComponent = /** @class */ (function () {
    function ProductDetailsComponent(route) {
        this.route = route;
        this.product = new _models_product__WEBPACK_IMPORTED_MODULE_1__["Product"]();
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.service.getProduct(
        //   this.route.snapshot.paramMap.get('id')
        // ).subscribe(res => this.product = res);
        this.route.data.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) { return data['product']; })).subscribe(function (res) { return _this.product = res; });
    };
    ProductDetailsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-details',
            template: "\n    <app-product [product]=\"product\" [details]=\"true\"></app-product>\n  ",
            styles: []
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());



/***/ }),

/***/ "./src/app/product/conatiners/product-list/product-list.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/product/conatiners/product-list/product-list.component.ts ***!
  \***************************************************************************/
/*! exports provided: ProductListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductListComponent", function() { return ProductListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _ui_services_ui_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../ui/services/ui.service */ "./src/app/ui/services/ui.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { ProductService } from '../../services/product.service';

 // diff

var ProductListComponent = /** @class */ (function () {
    function ProductListComponent(route, uiService // diff
    ) {
        this.route = route;
        this.uiService = uiService; // diff
        this.products = [];
    }
    ProductListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.service.getProducts()
        //   .subscribe(res => this.products = res);
        this.route.data.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (data) { return data['products']; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])(function (products) { return _this.metaData(products); })).subscribe(function (res) { return _this.products = res; });
    };
    // diff
    ProductListComponent.prototype.metaData = function (products) {
        this.uiService.setMetaData({
            title: 'Products',
            description: 'Check out our sneakers'
        });
    };
    ProductListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-list',
            template: "\n    <app-products [products]=\"products\"></app-products>\n  ",
            styles: []
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _ui_services_ui_service__WEBPACK_IMPORTED_MODULE_3__["UiService"] // diff
        ])
    ], ProductListComponent);
    return ProductListComponent;
}());



/***/ }),

/***/ "./src/app/product/models/product.ts":
/*!*******************************************!*\
  !*** ./src/app/product/models/product.ts ***!
  \*******************************************/
/*! exports provided: Product */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Product", function() { return Product; });
var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());



/***/ }),

/***/ "./src/app/product/product-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/product/product-routing.module.ts ***!
  \***************************************************/
/*! exports provided: ProductRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductRoutingModule", function() { return ProductRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _conatiners_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conatiners/product-list/product-list.component */ "./src/app/product/conatiners/product-list/product-list.component.ts");
/* harmony import */ var _conatiners_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./conatiners/product-details/product-details.component */ "./src/app/product/conatiners/product-details/product-details.component.ts");
/* harmony import */ var _resolvers_products_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers/products.resolver */ "./src/app/product/resolvers/products.resolver.ts");
/* harmony import */ var _resolvers_product_resolver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./resolvers/product.resolver */ "./src/app/product/resolvers/product.resolver.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', component: _conatiners_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_2__["ProductListComponent"], resolve: { products: _resolvers_products_resolver__WEBPACK_IMPORTED_MODULE_4__["ProductsResolver"] } },
    { path: ':id', component: _conatiners_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_3__["ProductDetailsComponent"], resolve: { product: _resolvers_product_resolver__WEBPACK_IMPORTED_MODULE_5__["ProductResolver"] } }
];
var ProductRoutingModule = /** @class */ (function () {
    function ProductRoutingModule() {
    }
    ProductRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ProductRoutingModule);
    return ProductRoutingModule;
}());



/***/ }),

/***/ "./src/app/product/product.module.ts":
/*!*******************************************!*\
  !*** ./src/app/product/product.module.ts ***!
  \*******************************************/
/*! exports provided: ProductModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductModule", function() { return ProductModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _product_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-routing.module */ "./src/app/product/product-routing.module.ts");
/* harmony import */ var _conatiners_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./conatiners/product-list/product-list.component */ "./src/app/product/conatiners/product-list/product-list.component.ts");
/* harmony import */ var _conatiners_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./conatiners/product-details/product-details.component */ "./src/app/product/conatiners/product-details/product-details.component.ts");
/* harmony import */ var _components_product_product_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/product/product.component */ "./src/app/product/components/product/product.component.ts");
/* harmony import */ var _components_products_products_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/products/products.component */ "./src/app/product/components/products/products.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _product_routing_module__WEBPACK_IMPORTED_MODULE_2__["ProductRoutingModule"]
            ],
            declarations: [_conatiners_product_list_product_list_component__WEBPACK_IMPORTED_MODULE_3__["ProductListComponent"], _conatiners_product_details_product_details_component__WEBPACK_IMPORTED_MODULE_4__["ProductDetailsComponent"], _components_product_product_component__WEBPACK_IMPORTED_MODULE_5__["ProductComponent"], _components_products_products_component__WEBPACK_IMPORTED_MODULE_6__["ProductsComponent"]]
        })
    ], ProductModule);
    return ProductModule;
}());



/***/ }),

/***/ "./src/app/product/resolvers/product.resolver.ts":
/*!*******************************************************!*\
  !*** ./src/app/product/resolvers/product.resolver.ts ***!
  \*******************************************************/
/*! exports provided: ProductResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductResolver", function() { return ProductResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/product.service */ "./src/app/product/services/product.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProductResolver = /** @class */ (function () {
    function ProductResolver(service) {
        this.service = service;
    }
    ProductResolver.prototype.resolve = function (route) {
        return this.service.getProduct(route.paramMap.get('id'));
    };
    ProductResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"]])
    ], ProductResolver);
    return ProductResolver;
}());



/***/ }),

/***/ "./src/app/product/resolvers/products.resolver.ts":
/*!********************************************************!*\
  !*** ./src/app/product/resolvers/products.resolver.ts ***!
  \********************************************************/
/*! exports provided: ProductsResolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsResolver", function() { return ProductsResolver; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/product.service */ "./src/app/product/services/product.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProductsResolver = /** @class */ (function () {
    function ProductsResolver(service) {
        this.service = service;
    }
    ProductsResolver.prototype.resolve = function () {
        return this.service.getProducts();
    };
    ProductsResolver = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_services_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"]])
    ], ProductsResolver);
    return ProductsResolver;
}());



/***/ }),

/***/ "./src/app/product/services/product.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/product/services/product.service.ts ***!
  \*****************************************************/
/*! exports provided: ProductService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductService", function() { return ProductService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].apiUrl + "/products";
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
    }
    ProductService.prototype.getProducts = function () {
        return this.http.get(baseUrl);
    };
    ProductService.prototype.getProduct = function (id) {
        return this.http.get(baseUrl + "/" + id);
    };
    ProductService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ProductService);
    return ProductService;
}());



/***/ }),

/***/ "./src/app/ui/services/ui.service.ts":
/*!*******************************************!*\
  !*** ./src/app/ui/services/ui.service.ts ***!
  \*******************************************/
/*! exports provided: UiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UiService", function() { return UiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UiService = /** @class */ (function () {
    function UiService(meta, title) {
        this.meta = meta;
        this.title = title;
        this.appColor = '#343a40';
        this.appImage = 'logo'; //TODO: Save log in assets
        this.appTitle = 'Sneakers';
        this.appDescription = 'Online sneakers';
    }
    UiService.prototype.setMetaData = function (config) {
        var _this = this;
        var description = config.description || this.appDescription;
        var image = config.image || this.appImage;
        var title = config.title ? config.title + " - " + this.appTitle : this.appTitle;
        this.title.setTitle(title);
        var tags = [
            { name: 'description', content: description },
            { name: 'theme-color', content: this.appColor },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image', content: image },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            { name: 'apple-mobile-web-app-title', content: title },
            { name: 'apple-touch-startup-image', content: image },
            { poperty: 'og:title', content: title },
            { poperty: 'og:description', content: description },
            { poperty: 'og:image', content: image },
        ];
        tags.forEach(function (tag) { return _this.meta.updateTag(tag); });
    };
    UiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Meta"], _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["Title"]])
    ], UiService);
    return UiService;
}());



/***/ })

}]);
//# sourceMappingURL=product-product-module.js.map