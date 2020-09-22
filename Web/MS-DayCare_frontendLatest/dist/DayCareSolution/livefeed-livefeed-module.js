(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["livefeed-livefeed-module"],{

/***/ "./src/app/layout/livefeed/components/feed/feed.component.css":
/*!********************************************************************!*\
  !*** ./src/app/layout/livefeed/components/feed/feed.component.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9saXZlZmVlZC9jb21wb25lbnRzL2ZlZWQvZmVlZC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/livefeed/components/feed/feed.component.html":
/*!*********************************************************************!*\
  !*** ./src/app/layout/livefeed/components/feed/feed.component.html ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  feed works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/layout/livefeed/components/feed/feed.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/layout/livefeed/components/feed/feed.component.ts ***!
  \*******************************************************************/
/*! exports provided: FeedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedComponent", function() { return FeedComponent; });
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

var FeedComponent = /** @class */ (function () {
    function FeedComponent() {
    }
    FeedComponent.prototype.ngOnInit = function () {
    };
    FeedComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-feed',
            template: __webpack_require__(/*! ./feed.component.html */ "./src/app/layout/livefeed/components/feed/feed.component.html"),
            styles: [__webpack_require__(/*! ./feed.component.css */ "./src/app/layout/livefeed/components/feed/feed.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FeedComponent);
    return FeedComponent;
}());



/***/ }),

/***/ "./src/app/layout/livefeed/live-feed-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/livefeed/live-feed-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: LivefeedRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LivefeedRoutingModule", function() { return LivefeedRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_feed_feed_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/feed/feed.component */ "./src/app/layout/livefeed/components/feed/feed.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _components_feed_feed_component__WEBPACK_IMPORTED_MODULE_2__["FeedComponent"]
    }
];
var LivefeedRoutingModule = /** @class */ (function () {
    function LivefeedRoutingModule() {
    }
    LivefeedRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LivefeedRoutingModule);
    return LivefeedRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/livefeed/livefeed.module.ts":
/*!****************************************************!*\
  !*** ./src/app/layout/livefeed/livefeed.module.ts ***!
  \****************************************************/
/*! exports provided: LivefeedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LivefeedModule", function() { return LivefeedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _livefeed_live_feed_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../livefeed/live-feed-routing.module */ "./src/app/layout/livefeed/live-feed-routing.module.ts");
/* harmony import */ var _components_feed_feed_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/feed/feed.component */ "./src/app/layout/livefeed/components/feed/feed.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LivefeedModule = /** @class */ (function () {
    function LivefeedModule() {
    }
    LivefeedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _livefeed_live_feed_routing_module__WEBPACK_IMPORTED_MODULE_2__["LivefeedRoutingModule"]
            ],
            declarations: [_components_feed_feed_component__WEBPACK_IMPORTED_MODULE_3__["FeedComponent"]]
        })
    ], LivefeedModule);
    return LivefeedModule;
}());



/***/ })

}]);
//# sourceMappingURL=livefeed-livefeed-module.js.map