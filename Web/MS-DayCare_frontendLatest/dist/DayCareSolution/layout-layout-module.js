(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout-layout-module"],{

/***/ "./src/app/layout/component/footer/footer.component.css":
/*!**************************************************************!*\
  !*** ./src/app/layout/component/footer/footer.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* .an-footer{position: relative;\r\npadding: 10px 0;\r\nbackground: #fff;\r\n\r\nmargin-left: 220px;\r\n} */\r\n\r\n\r\n/* width: 100%; */\r\n\r\n\r\n/* bottom: 0; */\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbXBvbmVudC9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7OztBQUdILGlCQUFpQjs7O0FBQ2pCLGVBQWUiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvY29tcG9uZW50L2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC5hbi1mb290ZXJ7cG9zaXRpb246IHJlbGF0aXZlO1xyXG5wYWRkaW5nOiAxMHB4IDA7XHJcbmJhY2tncm91bmQ6ICNmZmY7XHJcblxyXG5tYXJnaW4tbGVmdDogMjIwcHg7XHJcbn0gKi9cclxuXHJcblxyXG4vKiB3aWR0aDogMTAwJTsgKi9cclxuLyogYm90dG9tOiAwOyAqLyJdfQ== */"

/***/ }),

/***/ "./src/app/layout/component/footer/footer.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/component/footer/footer.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"an-footer\" >\r\n  <p class=\"text-center\">\r\n    Copyright@2018\r\n  </p>\r\n  </div>\r\n  \r\n  "

/***/ }),

/***/ "./src/app/layout/component/footer/footer.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/component/footer/footer.component.ts ***!
  \*************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
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

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/layout/component/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/layout/component/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/layout/component/header/header.component.css":
/*!**************************************************************!*\
  !*** ./src/app/layout/component/header/header.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".an-logo-link img {\r\n    height: 50px;\r\n}\r\n.btn-group.an-notifications-dropown .dropdown-menu {\r\n    right: 10px;\r\n}\r\n.an-profile-settings .btn-group .an-arrow-nav {\r\n    margin-left: 0;\r\n}\r\n.bell-notif .btn-group.an-notifications-dropown .dropdown-menu {\r\n    right: -90px;\r\n    left: auto !important;\r\n    margin-top: 15px;\r\n}\r\n.an-profile-list a img {\r\n    height: 20px;\r\n    width: 20px;\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n@media (max-width:1400px) {\r\n    .algcenter .form-group {\r\n        padding: 10px 0;\r\n    }\r\n    .currntcls .title {padding: 10px;}\r\n}\r\n@media (min-width:768px) and (max-width:1024px) {\r\n    .bell-notif .btn-group.an-notifications-dropown .dropdown-menu {\r\n        right: -110px;\r\n        left: auto !important;\r\n        margin-top: 15px;\r\n    }\r\n    .btn-group.an-notifications-dropown.notifications .dropdown-menu .an-info-count:before {\r\n        right: 15px;\r\n    }\r\n}\r\n@media (max-width:767px) {\r\n    .bell-notif .btn-group.an-notifications-dropown .dropdown-menu {\r\n        right: auto;\r\n        left: -10px !important;\r\n        margin-top: 15px;\r\n    }\r\n    .btn-group.an-notifications-dropown.notifications {\r\n        left: 10px;\r\n    }\r\n    .btn-group.an-notifications-dropown.profile .dropdown-menu .an-info-count:before {\r\n        right: 10px;\r\n    }\r\n\r\n\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbXBvbmVudC9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxZQUFZO0FBQ2hCO0FBQ0E7SUFDSSxXQUFXO0FBQ2Y7QUFDQTtJQUNJLGNBQWM7QUFDbEI7QUFDQTtJQUNJLFlBQVk7SUFDWixxQkFBcUI7SUFDckIsZ0JBQWdCO0FBQ3BCO0FBQ0E7SUFDSSxZQUFZO0lBQ1osV0FBVztJQUNYLFdBQVc7SUFDWCxrQkFBa0I7QUFDdEI7QUFDQTtJQUNJO1FBQ0ksZUFBZTtJQUNuQjtJQUNBLG1CQUFtQixhQUFhLENBQUM7QUFDckM7QUFDQTtJQUNJO1FBQ0ksYUFBYTtRQUNiLHFCQUFxQjtRQUNyQixnQkFBZ0I7SUFDcEI7SUFDQTtRQUNJLFdBQVc7SUFDZjtBQUNKO0FBQ0E7SUFDSTtRQUNJLFdBQVc7UUFDWCxzQkFBc0I7UUFDdEIsZ0JBQWdCO0lBQ3BCO0lBQ0E7UUFDSSxVQUFVO0lBQ2Q7SUFDQTtRQUNJLFdBQVc7SUFDZjs7O0FBR0oiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvY29tcG9uZW50L2hlYWRlci9oZWFkZXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hbi1sb2dvLWxpbmsgaW1nIHtcclxuICAgIGhlaWdodDogNTBweDtcclxufVxyXG4uYnRuLWdyb3VwLmFuLW5vdGlmaWNhdGlvbnMtZHJvcG93biAuZHJvcGRvd24tbWVudSB7XHJcbiAgICByaWdodDogMTBweDtcclxufVxyXG4uYW4tcHJvZmlsZS1zZXR0aW5ncyAuYnRuLWdyb3VwIC5hbi1hcnJvdy1uYXYge1xyXG4gICAgbWFyZ2luLWxlZnQ6IDA7XHJcbn1cclxuLmJlbGwtbm90aWYgLmJ0bi1ncm91cC5hbi1ub3RpZmljYXRpb25zLWRyb3Bvd24gLmRyb3Bkb3duLW1lbnUge1xyXG4gICAgcmlnaHQ6IC05MHB4O1xyXG4gICAgbGVmdDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxufVxyXG4uYW4tcHJvZmlsZS1saXN0IGEgaW1nIHtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6MTQwMHB4KSB7XHJcbiAgICAuYWxnY2VudGVyIC5mb3JtLWdyb3VwIHtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4IDA7XHJcbiAgICB9XHJcbiAgICAuY3Vycm50Y2xzIC50aXRsZSB7cGFkZGluZzogMTBweDt9XHJcbn1cclxuQG1lZGlhIChtaW4td2lkdGg6NzY4cHgpIGFuZCAobWF4LXdpZHRoOjEwMjRweCkge1xyXG4gICAgLmJlbGwtbm90aWYgLmJ0bi1ncm91cC5hbi1ub3RpZmljYXRpb25zLWRyb3Bvd24gLmRyb3Bkb3duLW1lbnUge1xyXG4gICAgICAgIHJpZ2h0OiAtMTEwcHg7XHJcbiAgICAgICAgbGVmdDogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICB9XHJcbiAgICAuYnRuLWdyb3VwLmFuLW5vdGlmaWNhdGlvbnMtZHJvcG93bi5ub3RpZmljYXRpb25zIC5kcm9wZG93bi1tZW51IC5hbi1pbmZvLWNvdW50OmJlZm9yZSB7XHJcbiAgICAgICAgcmlnaHQ6IDE1cHg7XHJcbiAgICB9XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6NzY3cHgpIHtcclxuICAgIC5iZWxsLW5vdGlmIC5idG4tZ3JvdXAuYW4tbm90aWZpY2F0aW9ucy1kcm9wb3duIC5kcm9wZG93bi1tZW51IHtcclxuICAgICAgICByaWdodDogYXV0bztcclxuICAgICAgICBsZWZ0OiAtMTBweCAhaW1wb3J0YW50O1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XHJcbiAgICB9XHJcbiAgICAuYnRuLWdyb3VwLmFuLW5vdGlmaWNhdGlvbnMtZHJvcG93bi5ub3RpZmljYXRpb25zIHtcclxuICAgICAgICBsZWZ0OiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLmJ0bi1ncm91cC5hbi1ub3RpZmljYXRpb25zLWRyb3Bvd24ucHJvZmlsZSAuZHJvcGRvd24tbWVudSAuYW4taW5mby1jb3VudDpiZWZvcmUge1xyXG4gICAgICAgIHJpZ2h0OiAxMHB4O1xyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/component/header/header.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/component/header/header.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"an-header wow fadeInDown\">\r\n  <div class=\"an-topbar-left-part\">\r\n    <h3 class=\"an-logo-heading\">\r\n      <a class=\"an-logo-link\" href=\"index.html\">\r\n        <img src=\"assets/img/logo-new.png\" alt=\"\">\r\n      </a>\r\n    </h3>\r\n    <button class=\"an-btn an-btn-icon toggle-button js-toggle-sidebar \" id=\"toggleButtons\" (click)=\"toggleSidebar();\">\r\n      <i class=\"fa fa-bars\"></i>\r\n    </button>\r\n  </div>\r\n  <!-- end .AN-TOPBAR-LEFT-PART -->\r\n\r\n  <div class=\"an-topbar-right-part\">\r\n    <div class=\"an-notifications bell-notif\">\r\n      <div class=\"btn-group an-notifications-dropown notifications\">\r\n        <!-- <button type=\"button\" class=\"an-btn an-btn-icon dropdown-toggle js-has-new-notification\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\r\n          aria-expanded=\"false\">\r\n          <i class=\"fa fa-bell\"></i>\r\n        </button> -->\r\n        <div class=\"dropdown-menu\">\r\n          <p class=\"an-info-count\">Notifications\r\n            <span>3</span>\r\n          </p>\r\n          <div class=\"an-info-content notifications-info notifications-content\">\r\n            <div class=\"an-info-single unread\">\r\n              <a href=\"#\">\r\n                <span class=\"icon-container important\">\r\n                  <i class=\"icon-setting\"></i>\r\n                </span>\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">Settings updated</h5>\r\n                  <p class=\"content\">\r\n                    <i class=\"icon-clock\"></i> 30 min ago</p>\r\n                </div>\r\n              </a>\r\n            </div>\r\n\r\n            <div class=\"an-info-single unread\">\r\n              <a href=\"#\">\r\n                <!-- <span class=\"icon-container success\">\r\n                  <i class=\"fa fa-bell-o\"></i>\r\n                </span> -->\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">5 Orders placed</h5>\r\n                  <p class=\"content\">\r\n                    <i class=\"icon-clock\"></i> 1 hour ago</p>\r\n                </div>\r\n              </a>\r\n            </div>\r\n\r\n            <div class=\"an-info-single\">\r\n              <a href=\"#\">\r\n                <span class=\"icon-container warning\">\r\n                  <i class=\"icon-alerm\"></i>\r\n                </span>\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">This is warning notification</h5>\r\n                  <p class=\"content\">\r\n                    <i class=\"icon-clock\"></i> 1 hour ago</p>\r\n                </div>\r\n              </a>\r\n            </div>\r\n\r\n            <div class=\"an-info-single\">\r\n              <a href=\"#\">\r\n                <span class=\"icon-container danger\">\r\n                  <i class=\"icon-danger\"></i>\r\n                </span>\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">Server loaded by 98% please recover soon</h5>\r\n                  <p class=\"content\">\r\n                    <i class=\"icon-clock\"></i> 1 hour ago</p>\r\n                </div>\r\n              </a>\r\n            </div>\r\n          </div>\r\n          <div class=\"an-info-show-all-btn\">\r\n            <a class=\"an-btn an-btn-transparent fluid rounded uppercase small-font\" href=\"#\">Show all</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!-- end .AN-NOTIFICATION -->\r\n\r\n    <!-- <div class=\"an-messages\">\r\n      <div class=\"btn-group an-notifications-dropown messages\">\r\n        <button type=\"button\" class=\"an-btn an-btn-icon dropdown-toggle js-has-new-messages\"\r\n          data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n          <i class=\"ion-ios-email-outline\"></i>\r\n        </button>\r\n        <div class=\"dropdown-menu\">\r\n          <p class=\"an-info-count\">Messages <span>3</span></p>\r\n          <div class=\"an-info-content notifications-info\">\r\n            <div class=\"an-info-single unread\">\r\n              <a href=\"#\">\r\n                <span class=\"user-img\" style=\"background-image: url('./assets/img/users/user1.jpeg')\"></span>\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">Ana malik</h5>\r\n                  <p class=\"content\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>\r\n                  <span class=\"info-time\"><i class=\"icon-clock\"></i>15:28</span>\r\n                </div>\r\n              </a>\r\n            </div>\r\n\r\n            <div class=\"an-info-single unread\">\r\n              <a href=\"#\">\r\n                <span class=\"user-img\" style=\"background-image: url('./assets/img/users/user2.jpg')\"></span>\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">Jackson Fred</h5>\r\n                  <p class=\"content\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>\r\n                  <span class=\"info-time\"><i class=\"icon-clock\"></i>4:54</span>\r\n                </div>\r\n              </a>\r\n            </div>\r\n\r\n            <div class=\"an-info-single\">\r\n              <a href=\"#\">\r\n                <span class=\"user-img\" style=\"background-image: url('./assets/img/users/user3.jpeg')\"></span>\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">Emma Watson</h5>\r\n                  <p class=\"content\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>\r\n                  <span class=\"info-time\"><i class=\"icon-clock\"></i>28 Sep</span>\r\n                </div>\r\n              </a>\r\n            </div>\r\n\r\n            <div class=\"an-info-single\">\r\n              <a href=\"#\">\r\n                <span class=\"user-img\" style=\"background-image: url('./assets/img/users/user4.jpeg')\"></span>\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">Elina</h5>\r\n                  <p class=\"content\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>\r\n                  <span class=\"info-time\"><i class=\"icon-clock\"></i>28 Sep</span>\r\n                </div>\r\n              </a>\r\n            </div>\r\n\r\n            <div class=\"an-info-single\">\r\n              <a href=\"#\">\r\n                <span class=\"user-img\" style=\"background-image: url('./assets/img/users/user5.jpeg')\"></span>\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">Jack Elison</h5>\r\n                  <p class=\"content\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>\r\n                  <span class=\"info-time\"><i class=\"icon-clock\"></i>20 Sep</span>\r\n                </div>\r\n              </a>\r\n            </div>\r\n\r\n            <div class=\"an-info-single\">\r\n              <a href=\"#\">\r\n                <span class=\"user-img\" style=\"background-image: url('./assets/img/users/user6.jpeg')\"></span>\r\n                <div class=\"info-content\">\r\n                  <h5 class=\"user-name\">Lara Smith</h5>\r\n                  <p class=\"content\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>\r\n                  <span class=\"info-time\"><i class=\"icon-clock\"></i>10 Sep</span>\r\n                </div>\r\n              </a>\r\n            </div>\r\n          </div>\r\n           end .AN-INFO-CONTENT\r\n\r\n          <div class=\"an-info-show-all-btn\">\r\n            <a class=\"an-btn an-btn-transparent fluid rounded uppercase small-font\" href=\"#\">Show all</a>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div> \r\n    end .AN-MESSAGE -->\r\n\r\n    <div class=\"an-profile-settings\" *ngIf=\"kiosklogn != true\">\r\n      <div class=\"btn-group an-notifications-dropown  profile\">\r\n        <button type=\"button\" class=\"an-btn an-btn-icon dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\r\n          aria-expanded=\"false\">\r\n          <span class=\"an-user-name\">{{userName}}</span>\r\n          <!-- <span class=\"an-profile-img\" style=\"background-image: url('./assets/img/users/user5.jpg');\"></span> -->\r\n          <!-- <span class=\"an-profile-img\" [ngStyle]=\"{ 'background-image': 'url(' + profileImage + ')'}\" onError=\"this.src='assets/img/user.png'\"></span> -->\r\n          <span>\r\n            <img src=\"{{profileImage}}\" alt=\"\" srcset=\"\" class=\"an-profile-img\"\r\n              onError=\"this.src='assets/img/user.png'\">\r\n          </span>\r\n          <span class=\"an-arrow-nav\">\r\n            <i class=\"icon-arrow-down\"></i>\r\n          </span>\r\n        </button>\r\n        <div class=\"dropdown-menu\">\r\n          <p class=\"an-info-count\" *ngIf=\"kiosklogn != true\">Profile Settings</p>\r\n          <p class=\"an-info-count\" *ngIf=\"kiosklogn == true\">Logout</p>\r\n          <ul class=\"an-profile-list\">\r\n            <li>\r\n              <a *ngIf=\"(userType == 3 )\" [routerLink]=\"['/home/teacherdashboard/profile/',userRelaventId]\">\r\n                <!-- <img src=\"assets/img/calendar2.svg\" alt=\"\" width=\"15px\"> Calendar</a> -->\r\n                <!-- <i class=\"fa fa-user\" aria-hidden=\"true\"></i>Profile -->\r\n                <img src=\"assets/img/profile.png\">Profile\r\n              </a>\r\n              <a *ngIf=\"(userType == 4 && kiosklogn != true)\"\r\n                [routerLink]=\"['/home/parentdashboard/parentprofile/',userRelaventId]\">\r\n                <!-- <img src=\"assets/img/calendar2.svg\" alt=\"\" width=\"15px\"> Calendar</a> -->\r\n                <!-- <i class=\"fa fa-user\" aria-hidden=\"true\"></i>Profile -->\r\n                <img src=\"assets/img/profile.png\">Profile\r\n              </a>\r\n              <a *ngIf=\"(userType == 2 )\" [routerLink]=\"['/home/agencydashboard/profile/',userRelaventId]\">\r\n                <!-- <img src=\"assets/img/calendar2.svg\" alt=\"\" width=\"15px\"> Calendar</a> -->\r\n                <!-- <i class=\"fa fa-user\" aria-hidden=\"true\"></i>Profile -->\r\n                <img src=\"assets/img/profile.png\">Profile\r\n              </a>\r\n              <a [routerLink]=\"['/home/global']\" *ngIf=\"kiosklogn != true\">\r\n                <i class=\"fa fa-key\" aria-hidden=\"true\"></i>Reset Password\r\n              </a>\r\n            </li>\r\n            <!-- <li>\r\n                <a >\r\n                  <img src=\"assets/img/calendar-new.png\">Calendar\r\n                </a>\r\n              </li> -->\r\n            <li *ngIf=\"userType != 1 && kiosklogn != true\">\r\n              <a (click)=\"clearNotificationForm()\" data-toggle=\"modal\" data-toggle=\"modal\"\r\n                data-target=\"#notificationsound\">\r\n                <i class=\"fa fa-bell\" aria-hidden=\"true\"></i>Notifications Setting\r\n              </a>\r\n            </li>\r\n\r\n            <li *ngIf=\"(userType == 3 && (teacherBreakStatus == 0 || teacherBreakStatus == 2))\">\r\n              <a (click)=\"clearBreakReason()\" data-toggle=\"modal\" data-toggle=\"modal\" data-target=\"#breakout\">\r\n                <!-- <img src=\"assets/img/calendar2.svg\" alt=\"\" width=\"15px\"> Calendar</a> -->\r\n                <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i>Break Out\r\n              </a>\r\n            </li>\r\n\r\n            <!-- <li *ngIf=\"(userType == 3 && (teacherBreakStatus == 1))\">\r\n                  <a  data-toggle=\"modal\" data-toggle=\"modal\" data-target=\"#breakin\">\r\n                    <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i>Break In\r\n                  </a>\r\n                </li> -->\r\n\r\n            <li *ngIf=\"userType == 3\">\r\n              <a (click)=\"teacherClockOut(2)\">\r\n                <!-- <img src=\"assets/img/calendar2.svg\" alt=\"\" width=\"15px\"> Calendar</a> -->\r\n                <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i>Clock Out\r\n              </a>\r\n            </li>\r\n            <li role=\"separator\" class=\"divider\"></li>\r\n            <li *ngIf=\"kiosklogn == false\">\r\n              <a (click)=\"logOut()\">\r\n                <!-- <i class=\"fa fa-lock\" aria-hidden=\"true\"></i>Logout -->\r\n                <img src=\"assets/img/logout.png\">Logout\r\n              </a>\r\n            </li>\r\n            <li *ngIf=\"kiosklogn == true\">\r\n              <a (click)=\"kiosklogOut()\">\r\n                <!-- <i class=\"fa fa-lock\" aria-hidden=\"true\"></i>Logout -->\r\n                <img src=\"assets/img/logout.png\">Logout\r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"an-profile-settings\" *ngIf=\"kiosklogn == true\">\r\n      <div class=\"btn-group an-notifications-dropown  profile\">\r\n        <button type=\"button\" class=\"an-btn an-btn-icon\" aria-haspopup=\"true\"\r\n          aria-expanded=\"false\">\r\n          <span class=\"an-user-name\">{{userName}}</span>\r\n          <span>\r\n            <img src=\"{{profileImage}}\" alt=\"\" srcset=\"\" class=\"an-profile-img\"\r\n              onError=\"this.src='assets/img/user.png'\">\r\n          </span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <!-- end .AN-PROFILE-SETTINGS -->\r\n  </div>\r\n  <!-- end .AN-TOPBAR-RIGHT-PART -->\r\n\r\n  <!-- clock in modal -->\r\n\r\n\r\n</header>\r\n<div class=\"modal fade\" data-backdrop=\"static\" style=\"z-index: 1100;\" id=\"exampleModal\" role=\"dialog\"\r\n  aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Clock In</h5>\r\n        <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button> -->\r\n      </div>\r\n      <div class=\"modal-body\">\r\n\r\n        <button style=\"float:right\" type=\"button\" class=\"btn btn-primary\" (click)=\"teacherClockIn(1)\"> Clock In</button>\r\n      </div>\r\n      <!-- <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"teacherClockIn()\">Submit</button>\r\n        </div> -->\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<div class=\"modal fade\" data-backdrop=\"static\" style=\"z-index: 1100;\" id=\"breakout\" tabindex=\"-1\" role=\"dialog\"\r\n  aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Break Out</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"form-group\">\r\n          <label>Reason *</label>\r\n          <input type=\"text\" class=\"form-control\" placeholder=\"Reason\" [(ngModel)]=\"breakReason\">\r\n        </div>\r\n\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"verifyBreakOut()\">Break out</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"modal fade\" data-backdrop=\"static\" style=\"z-index: 1100;\" id=\"breakin\" role=\"dialog\"\r\n  aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Break In</h5>\r\n        <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button> -->\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <!-- <div class=\"form-group\">\r\n              <label>Reason *</label>\r\n             <input type=\"text\" class=\"form-control\" placeholder=\"Reason\" [(ngModel)]=\"breakReason\">\r\n            </div> -->\r\n        <label>Please break in to access the system</label>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <!-- <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button> -->\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"verifyBreakIn()\">Break In</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!-- Notification Sound -->\r\n<div class=\"modal fade notificationsound\" data-backdrop=\"static\" style=\"z-index: 1100;\" tabindex=\"-1\" role=\"dialog\"\r\n  id=\"notificationsound\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog\" role=\"document\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Message Sound</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"notificationForm\">\r\n          <div class=\"form-group\">\r\n            <label>Message Notification Sound*</label>\r\n            <select class=\"form-control\" placeholder=\"Notification Sound\" formControlName=\"sound\">\r\n              <option value=\"\">Select On/Off</option>\r\n              <option value=\"On\">On</option>\r\n              <option value=\"Off\">Off</option>\r\n            </select>\r\n            <div *ngIf=\"t.sound.invalid && (t.sound.dirty || t.sound.touched)\" class=\"text-left errormsg\">\r\n              <span *ngIf=\"t.sound.errors.required\">\r\n                <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select Sound On/Off</span>\r\n              </span>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveImageApprovalType()\">Save Changes</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<app-confirm-box></app-confirm-box>"

/***/ }),

/***/ "./src/app/layout/component/header/header.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/component/header/header.component.ts ***!
  \*************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_services_lauout_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/services/lauout-api-service */ "./src/app/shared/services/lauout-api-service.ts");
/* harmony import */ var _shared_services_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/services/constant */ "./src/app/shared/services/constant.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _teacher_shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../teacher/shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _aspnet_signalr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @aspnet/signalr */ "./node_modules/@aspnet/signalr/dist/esm/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/layout/parent/shared/constant */ "./src/app/layout/parent/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(router, commonService, layoutService, spinner, error, notification, confirmationService, fb, route) {
        this.router = router;
        this.commonService = commonService;
        this.layoutService = layoutService;
        this.spinner = spinner;
        this.error = error;
        this.notification = notification;
        this.confirmationService = confirmationService;
        this.fb = fb;
        this.route = route;
        this.reqData = [];
        this.breakReason = '';
        this.teacherBreakStatus = 0;
        this.teacherBreakSaveId = 0;
        this.userRelaventId = 0;
        this.notificationType = '';
        this.sound = true;
    }
    HeaderComponent.prototype.toggleSidebar = function () {
        document.getElementsByTagName('body')[0].classList.toggle('collapsedSidebar');
        document.getElementById('sidebarLinksParent').classList.toggle('collapse');
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.createNotificationForm();
        this.GetNotificationSetting();
        this.signalRConnectionToGetMsgNotifivation();
        this.userRelaventId = this.commonService.getReleventUserId('userdetails');
        this.userType = this.commonService.getUserRole('userdetails');
        if (this.userType === 3) {
            this.getTeacherCurrentBreakStatus();
        }
        if (this.commonService.getIsKioskLogin() === 'true') {
            this.kiosklogn = true;
        }
        else {
            this.kiosklogn = false;
        }
        if (this.commonService.getUserRole('userdetails') === 3 && localStorage.getItem('isteacherclockedin') === '0') {
            $('#exampleModal').modal('show');
        }
        this.commonService.getUserFullNameFromProfile().subscribe(function (name) {
            _this.userName = name;
            // console.log('nm', this.userName);
        });
        this.profileImage = localStorage.getItem('imagepath');
        this.commonService.getUserProfileImage().subscribe(function (image) {
            _this.profileImage = image;
        });
        this.userName = this.commonService.getUserFullName('userdetails');
    };
    HeaderComponent.prototype.getTeacherCurrentBreakStatus = function () {
        var _this = this;
        var reqdata = {
            'agencyID': this.commonService.getAgencyId(),
            'askingDate': new Date(),
            'teacherID': this.commonService.getReleventUserId('userdetails'),
            'teacherDailyAttendenceID': this.commonService.getTeacherTodayAttendenceId(),
        };
        this.layoutService.postData(_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_9__["TeacherAPIURLs"].GetTeacherCurrentBreakStatus, reqdata, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.data) {
                    _this.teacherBreakStatus = res.body.data.breakStatusID;
                    _this.teacherBreakSaveId = res.body.data.id;
                    if (_this.teacherBreakStatus === 1) {
                        $('#breakin').modal('show'); // show brek in modal if teacher is on break
                    }
                }
            }
            else {
                //  this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            // this.error.commonError(err);
        });
    };
    HeaderComponent.prototype.logOut = function () {
        this.deleteDeviceToken();
        localStorage.removeItem('isauthenticated');
        localStorage.removeItem('usertype');
        localStorage.removeItem('path');
        localStorage.removeItem('userdetails');
        localStorage.removeItem('imagepath');
        this.router.navigate(['/']);
    };
    HeaderComponent.prototype.kiosklogOut = function () {
        this.deleteDeviceToken();
        localStorage.removeItem('isauthenticated');
        localStorage.removeItem('usertype');
        localStorage.removeItem('path');
        localStorage.removeItem('userdetails');
        localStorage.removeItem('imagepath');
        localStorage.removeItem('iskiosklogin');
        this.router.navigate(['/kiosklogin']);
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        $.getScript('../../../../assets/js/custom.js', function () { });
        // $(window).on('load', function () {
        //   if (screen.width < 990) {
        //     $('.an-nav-item > a').click(function () {
        //       if ($(this).parent().find('ul').length > 0) {
        //       } else {
        //         alert('else called');
        //         $("#toggleButtons").click();
        //       }
        //     });
        //     $('#overlay-section, .an-nav-item > ul > li > a').click(function () {
        //       alert('this is called');
        //       $('.js-toggle-sidebar').click();
        //     });
        //   }
        // });
    };
    HeaderComponent.prototype.teacherClockOut = function (status) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you really want to clock out for today?',
            accept: function () {
                _this.teacherClockIn(status);
            }
        });
    };
    /**Get All class list */
    HeaderComponent.prototype.teacherClockIn = function (status) {
        var _this = this;
        this.spinner.show();
        if (status === 1) {
            this.reqData = {
                'id': 0,
                'agencyID': this.commonService.getAgencyId(),
                'teacherID': this.commonService.getReleventUserId('userdetails'),
                'attendenceStatusID': status,
                'classesID': 0,
                'clockIn': status === 1 ? new Date() : '',
                'attendanceDate': new Date(),
            };
        }
        else {
            this.reqData = {
                'id': localStorage.getItem('teacherTodayAttendenceId'),
                'agencyID': this.commonService.getAgencyId(),
                'teacherID': this.commonService.getReleventUserId('userdetails'),
                'attendenceStatusID': status,
                'classesID': 0,
                'clockOut': status === 2 ? new Date() : '',
                'attendanceDate': new Date(),
            };
        }
        this.spinner.hide();
        this.layoutService.postData(_shared_services_constant__WEBPACK_IMPORTED_MODULE_4__["LayoutAPIURLs"].TeacherClockInClockOut, this.reqData, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (status === 1) {
                    _this.notification.success({ message: 'Clocked in successfully', title: '' });
                    localStorage.setItem('isteacherclockedin', 'true');
                    localStorage.setItem('teacherTodayAttendenceId', res.body.saveId);
                }
                else {
                    _this.notification.success({ message: 'Clocked out successfully', title: '' });
                    localStorage.removeItem('teacherTodayAttendenceId');
                    localStorage.removeItem('isTeacherclockedout');
                    localStorage.removeItem('isteacherclockedin');
                    _this.logOut();
                }
                $('#exampleModal').modal('hide');
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    HeaderComponent.prototype.verifyBreakOut = function () {
        this.breakReason = this.breakReason.trim();
        if (this.breakReason !== '' && this.breakReason != null) {
            if (this.breakReason === '') {
                this.notification.warning({ message: 'Please add reason', title: '' });
            }
            else {
                this.spinner.show();
                var data = {
                    'id': 0,
                    'agencyID': this.commonService.getAgencyId(),
                    'breakOut': new Date(),
                    'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
                    'breakTypesID': 0,
                    'breakStatusID': 1,
                    'breakReason': this.breakReason
                };
                var msg = 'Break out successfully!';
                this.breakInBreakOut(data, msg, 1);
            }
        }
        else {
            this.notification.warning({ message: 'Please add reason', title: '' });
        }
    };
    HeaderComponent.prototype.verifyBreakIn = function () {
        this.spinner.show();
        var data = {
            'id': this.teacherBreakSaveId,
            'agencyID': this.commonService.getAgencyId(),
            'breakIn': new Date(),
            'teacherDailyAttendenceID': localStorage.getItem('teacherTodayAttendenceId'),
            'breakTypesID': 0,
            'breakStatusID': 2,
        };
        var msg = 'Break in successfully!';
        this.breakInBreakOut(data, msg, 2);
    };
    HeaderComponent.prototype.breakInBreakOut = function (reqdata, msg, type) {
        var _this = this;
        this.layoutService.postData(_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_9__["TeacherAPIURLs"].TeacherBreakInBreakOut, reqdata, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.teacherBreakSaveId = res.body.saveId;
                _this.teacherBreakStatus = res.body.data;
                if (type === 1) {
                    _this.notification.success({ message: msg, title: '' });
                    $('#breakout').modal('hide');
                    $('#breakin').modal('show');
                }
                else {
                    _this.notification.success({ message: msg, title: '' });
                    $('#breakin').modal('hide');
                }
                var myBreak = {
                    'break': true
                };
                _this.commonService.saveTeacherBreakLogAPI(myBreak);
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    HeaderComponent.prototype.clearBreakReason = function () {
        this.breakReason = '';
    };
    // For Notification
    HeaderComponent.prototype.clearNotificationForm = function () {
        this.createNotificationForm();
    };
    HeaderComponent.prototype.createNotificationForm = function () {
        this.notificationForm = this.fb.group({
            sound: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_12__["Validators"].required]
        });
    };
    Object.defineProperty(HeaderComponent.prototype, "t", {
        get: function () { return this.notificationForm.controls; },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.GetNotificationSetting = function () {
        var _this = this;
        var req = {
            'IsDeleted': false,
            'UserID': this.commonService.getLoggedInUserId(),
        };
        this.layoutService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_13__["ParentAPIURLs"].GetNotificationSetting, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.notificationType = res.body.notificationSetting;
                if (_this.notificationType === 'On') {
                    _this.sound = true;
                }
                else {
                    _this.sound = false;
                }
                console.log(_this.sound, 'tettttttttttttttttttttttt');
            }
            else {
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    HeaderComponent.prototype.saveImageApprovalType = function () {
        var _this = this;
        if (this.notificationForm.valid) {
            var data = {
                'id': 0,
                'UserID': this.commonService.getLoggedInUserId(),
                'OnOff': this.notificationForm.value.sound,
            };
            this.layoutService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_13__["ParentAPIURLs"].SaveNotificationSetting, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('.notificationsound').modal('hide');
                    _this.spinner.hide();
                    _this.notification.success({ message: 'Notification setting updated successfully', title: '' });
                    _this.GetNotificationSetting();
                }
                else {
                    _this.spinner.hide();
                    _this.error.unknownError();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.notificationForm);
        }
    };
    /**To delete device token for fcm */
    HeaderComponent.prototype.deleteDeviceToken = function () {
        var _this = this;
        var reqdata = {
            'BusinessToken': localStorage.getItem('fcmtkn')
        };
        this.layoutService.postData(_shared_services_constant__WEBPACK_IMPORTED_MODULE_4__["LayoutAPIURLs"].DeleteToken, reqdata, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
            }
            else {
                //  this.error.unknownError();
            }
        }, function (err) {
            _this.spinner.hide();
        });
    };
    // this method is use to show notification for chat messages
    HeaderComponent.prototype.signalRConnectionToGetMsgNotifivation = function () {
        var _this = this;
        var msgSenderId = 0;
        var loggedInUserID = this.commonService.getLoggedInUserId();
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_11__["environment"].baseUrl + '' + 'chat';
        this._hubConnection = new _aspnet_signalr__WEBPACK_IMPORTED_MODULE_10__["HubConnectionBuilder"]()
            .withUrl(url)
            .build();
        this._hubConnection
            .start()
            .then(function () {
            console.log('Connection started!');
            _this._hubConnection.invoke('getConnectionId', loggedInUserID)
                .then(function (connectionId) {
                // Send the connectionId to controller
                // this.token = connectionId;
            });
        })
            .catch(function (err) { return console.log('Error while establishing connection :(', _this.signalRConnectionToGetMsgNotifivation()); });
        this._hubConnection.on('messageReceived', function (nick, receivedMessage) {
            var text = nick + ": " + receivedMessage;
            var str = text.substring(text.indexOf(':') + 1);
            var Obj = JSON.parse(str);
            msgSenderId = Obj.sender;
            if (_this.kiosklogn !== true) {
                _this.notification.info({ message: Obj.message.substr(0, 25), title: 'Message from' + ' ' + Obj.senderName });
                if (_this.sound === true) {
                    _this.playAudio();
                }
            }
        });
    };
    // Play Notification
    HeaderComponent.prototype.playAudio = function () {
        var audio = new Audio();
        audio.src = 'assets/audio/juntos.mp3';
        audio.load();
        audio.play();
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/layout/component/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/layout/component/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _shared_services_lauout_api_service__WEBPACK_IMPORTED_MODULE_3__["LayoutApiService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__["ErrorHandlerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_7__["NotificationService"],
            primeng_api__WEBPACK_IMPORTED_MODULE_8__["ConfirmationService"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/layout/component/sidebar/sidebar.component.css":
/*!****************************************************************!*\
  !*** ./src/app/layout/component/sidebar/sidebar.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".an-nav-item img{width : 25px; margin-right: 8px }\r\n.nav-title{color:#fff}\r\n@media (min-width:768px) and (max-width:1024px) {\r\n    .an-sidebar-nav {padding: 20px 0 40px 0;}\r\n}\r\n.inbox_chat1 \r\n{ \r\n  height: 550px;\r\n  overflow-y: scroll;  \r\n  color: red;\r\n}\r\n\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbXBvbmVudC9zaWRlYmFyL3NpZGViYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxpQkFBaUIsWUFBWSxFQUFFLGtCQUFrQjtBQUNqRCxXQUFXLFVBQVU7QUFDckI7SUFDSSxpQkFBaUIsc0JBQXNCLENBQUM7QUFDNUM7QUFFQTs7RUFFRSxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9jb21wb25lbnQvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYW4tbmF2LWl0ZW0gaW1ne3dpZHRoIDogMjVweDsgbWFyZ2luLXJpZ2h0OiA4cHggfVxyXG4ubmF2LXRpdGxle2NvbG9yOiNmZmZ9XHJcbkBtZWRpYSAobWluLXdpZHRoOjc2OHB4KSBhbmQgKG1heC13aWR0aDoxMDI0cHgpIHtcclxuICAgIC5hbi1zaWRlYmFyLW5hdiB7cGFkZGluZzogMjBweCAwIDQwcHggMDt9XHJcbn1cclxuXHJcbi5pbmJveF9jaGF0MSBcclxueyBcclxuICBoZWlnaHQ6IDU1MHB4O1xyXG4gIG92ZXJmbG93LXk6IHNjcm9sbDsgIFxyXG4gIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/layout/component/sidebar/sidebar.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/component/sidebar/sidebar.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"overlay-div\" id=\"overlay-section\"></div>\r\n\r\n<div id=\"sidebarLinksParent\" class=\"an-sidebar-nav js-sidebar-toggle-with-click\" *ngIf=\"isSuperAdminHidden\">\r\n  <!--  Super Admin -->\r\n  <div class=\"logodiv\">\r\n    <a class=\"an-logo-link\" href=\"index.html\">\r\n      <img src=\"assets/img/logo-new.png\" alt=\"\">\r\n    </a>\r\n  </div>\r\n\r\n  <div class=\"an-sidebar-nav\">\r\n    <ng-scrollbar>\r\n      <ul class=\"an-main-nav\">\r\n        <li class=\"an-nav-item \">\r\n          <a class=\" js-show-child-nav\" [routerLinkActiveOptions]=\"{exact: true}\" [routerLink]=\"['superadmin']\"\r\n            [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/side4.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Dashboard\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['superadmin/agencylist']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/side4.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Agency List\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['superadmin/pricingplan']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/side4.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Pricing Plan\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['superadmin/planlist']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/side5.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Plan List</span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['superadmin/addstate']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/side5.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Add State</span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['superadmin/addcity']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/side5.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Add City</span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item \">\r\n          <a class=\" js-show-child-nav\" data-toggle=\"collapse\" data-target=\"#adddata\">\r\n            <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Add Data\">\r\n              <img src=\"assets/img/side5.svg\" alt=\"\">\r\n              <span class=\"nav-title\">Add Data\r\n                <span class=\"an-arrow-nav\">\r\n                  <i class=\"icon-arrow-down\"></i>\r\n                </span>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n          <ul class=\"collapse\" id=\"adddata\">\r\n\r\n            <li>\r\n              <a [routerLink]=\"['superadmin/addinfovideo']\" [routerLinkActive]=\"['link_active']\" data-toggle=\"tooltip\"\r\n                data-placement=\"right\" title=\"Add Information Video\">\r\n                <img src=\"assets/img/side5.svg\" alt=\"\">\r\n                <span>Add Information Video</span>\r\n              </a>\r\n            </li>\r\n\r\n            <li>\r\n              <a class=\"\" [routerLink]=\"['superadmin/addallergy']\" [routerLinkActive]=\"['link_active']\"\r\n                data-toggle=\"tooltip\" data-placement=\"right\" title=\"Add Allergy\">\r\n                <img src=\"assets/img/side5.svg\" alt=\"\">\r\n                <span class=\"nav-title\">Add Allergy</span>\r\n              </a>\r\n            </li>\r\n\r\n            <li>\r\n              <a class=\"\" [routerLink]=\"['superadmin/adddose']\" [routerLinkActive]=\"['link_active']\"\r\n                data-toggle=\"tooltip\" data-placement=\"right\" title=\"Add Dose Repeat\">\r\n                <img src=\"assets/img/side5.svg\" alt=\"\">\r\n                <span class=\"nav-title\">Add Dose Repeat</span>\r\n              </a>\r\n            </li>\r\n\r\n            <li>\r\n              <a class=\"\" [routerLink]=\"['superadmin/addcoupon']\" [routerLinkActive]=\"['link_active']\"\r\n                data-toggle=\"tooltip\" data-placement=\"right\" title=\"Add Coupon\">\r\n                <img src=\"assets/img/side5.svg\" alt=\"\">\r\n                <span class=\"nav-title\">Add Coupon</span>\r\n              </a>\r\n            </li>\r\n\r\n            <li>\r\n              <a class=\"\" [routerLink]=\"['superadmin/addreason']\" [routerLinkActive]=\"['link_active']\"\r\n                data-toggle=\"tooltip\" data-placement=\"right\" title=\"Add Deactivate Reason\">\r\n                <img src=\"assets/img/side5.svg\" alt=\"\">\r\n                <span class=\"nav-title\">Add Deactivate Reason</span>\r\n              </a>\r\n            </li>\r\n\r\n            <li>\r\n              <a class=\"\" [routerLink]=\"['superadmin/textplan']\" [routerLinkActive]=\"['link_active']\"\r\n                data-toggle=\"tooltip\" data-placement=\"right\" title=\"Text Messages Plan\">\r\n                <img src=\"assets/img/side5.svg\" alt=\"\">\r\n                <span class=\"nav-title\">Add Text Messages Plan</span>\r\n              </a>\r\n            </li>\r\n\r\n          </ul>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['superadmin/policyacceptagency']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/side4.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Policy Accept List\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['superadmin/joinclassroomparent']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/side4.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Parent List\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n\r\n\r\n      </ul>\r\n      <!-- end .AN-MAIN-NAV -->\r\n    </ng-scrollbar>\r\n  </div>\r\n  <!-- end .AN-SIDEBAR-NAV -->\r\n</div>\r\n\r\n<div id=\"sidebarLinksParent\" class=\"an-sidebar-nav js-sidebar-toggle-with-click\" *ngIf=\"isAgencyAdminHidden\">\r\n  <!--  Agency Admin -->\r\n  <div class=\"logodiv\">\r\n    <a class=\"an-logo-link\" href=\"index.html\">\r\n      <img src=\"assets/img/logo-new.png\" alt=\"\">\r\n    </a>\r\n  </div>\r\n  <div class=\"an-sidebar-nav\">\r\n    <ng-scrollbar>\r\n      <ul class=\"an-main-nav\">\r\n        <li class=\"an-nav-item  \">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['agencydashboard']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" [routerLinkActiveOptions]=\"{exact: true}\" data-toggle=\"tooltip\"\r\n            data-placement=\"right\" title=\"Dashboard\">\r\n            <img src=\"assets/img/side4.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Dashboard\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item \">\r\n          <a class=\" js-show-child-nav\" data-toggle=\"collapse\" data-target=\"#usermanage\">\r\n            <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"User Management\">\r\n              <img src=\"assets/img/usermang.svg\" alt=\"\">\r\n              <span class=\"nav-title\">User Management\r\n                <span class=\"an-arrow-nav\">\r\n                  <i class=\"icon-arrow-down\"></i>\r\n                </span>\r\n              </span>\r\n\r\n            </span>\r\n\r\n          </a>\r\n          <ul class=\"collapse\" id=\"usermanage\">\r\n            <li>\r\n              <a [routerLink]=\"['agencydashboard/parentlist']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Parent\"> <img\r\n                  src=\"assets/img/parent.svg\" alt=\"\"><span>Parent</span></a>\r\n            </li>\r\n            <li>\r\n              <a [routerLink]=\"['agencydashboard/studentlist']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Student\"> <img\r\n                  src=\"assets/img/study.svg\" alt=\"\"><span>Student</span></a>\r\n            </li>\r\n            <li>\r\n              <a [routerLink]=\"['agencydashboard/teacherlist']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Teacher\"> <img\r\n                  src=\"assets/img/teacher-pointing-blackboard.svg\" alt=\"\"><span>Teacher</span></a>\r\n            </li>\r\n            <li>\r\n              <a [routerLink]=\"['global/authorizedperson']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Authorize Person\"> <img\r\n                  src=\"assets/img/editor.svg\" alt=\"\"><span>Auth\r\n                  Person</span></a>\r\n            </li>\r\n\r\n            <li>\r\n              <a [routerLink]=\"['global/restrictedperson']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Restricted Person\"> <img\r\n                  src=\"assets/img/editor.svg\" alt=\"\"><span>Restricted\r\n                  Person</span></a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item \">\r\n          <a class=\" js-show-child-nav\" data-toggle=\"collapse\" data-target=\"#classmanage\"\r\n            [routerLinkActive]=\"['link_active']\">\r\n            <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Class Management\">\r\n              <img src=\"assets/img/class.svg\" alt=\"\">\r\n              <span class=\"nav-title\">Class Management\r\n                <span class=\"an-arrow-nav\">\r\n                  <i class=\"icon-arrow-down\"></i>\r\n                </span>\r\n              </span>\r\n\r\n            </span>\r\n\r\n          </a>\r\n          <ul class=\"collapse\" id=\"classmanage\">\r\n            <li>\r\n              <a [routerLink]=\"['agencydashboard/studentlist']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"EnrollStudent\"><img\r\n                  src=\"assets/img/study.svg\" alt=\"\"><span>Enrolled Student</span></a>\r\n            </li>\r\n            <li>\r\n              <a [routerLink]=\"['agencydashboard/adminclasses']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Classes\"><img\r\n                  src=\"assets/img/boss.svg\" alt=\"\"><span>Classes</span></a>\r\n            </li>\r\n            <li>\r\n              <a [routerLink]=\"['agencydashboard/classassignment']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Teacher Assignment\"><img\r\n                  src=\"assets/img/presentation.svg\" alt=\"\"><span>Teacher Assignment</span></a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['agencydashboard/buslist']\"\r\n            [routerLinkActive]=\"['link_active']\" (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/dailysheet.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Bus Management\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['agencydashboard/dailyactivity']\"\r\n            [routerLinkActive]=\"['link_active']\" (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/dailysheet.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Daily Sheets\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['agencydashboard/postactivity']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/post.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Post Activity</span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['agencydashboard/attendence']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/list.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Attendance</span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" data-toggle=\"collapse\" data-target=\"#agencycal\">\r\n            <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Calendar\">\r\n\r\n              <img src=\"assets/img/calendar.svg\" alt=\"\">\r\n              <span class=\"nav-title\">Calendar\r\n              </span>\r\n            </span>\r\n          </a>\r\n          <ul class=\"collapse\" id=\"agencycal\">\r\n            <li>\r\n              <a [routerLink]=\"['agencydashboard/eventplan']\" [routerLinkActive]=\"['link_active']\" data-toggle=\"tooltip\"\r\n                data-placement=\"right\" title=\"Event Planner\" (click)=\"unReadMessage()\">\r\n                <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"\r\n                  xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\"\r\n                  style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\r\n                  <g>\r\n                    <g>\r\n                      <path\r\n                        d=\"M452,40h-24V0h-40v40H124V0H84v40H60C26.916,40,0,66.916,0,100v352c0,33.084,26.916,60,60,60h392\r\n                   c33.084,0,60-26.916,60-60V100C512,66.916,485.084,40,452,40z M472,452c0,11.028-8.972,20-20,20H60c-11.028,0-20-8.972-20-20V188\r\n                   h432V452z M472,148H40v-48c0-11.028,8.972-20,20-20h24v40h40V80h264v40h40V80h24c11.028,0,20,8.972,20,20V148z\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"76\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"156\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"236\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"316\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"396\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"76\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"156\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"236\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"316\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"76\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"156\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"236\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"316\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"396\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                </svg>\r\n                <span>Event Planner</span></a>\r\n            </li>\r\n            <li>\r\n              <!--  mealplan (rout for old meal plan ) -->\r\n              <a [routerLink]=\"['agencydashboard/newmealplanner']\" [routerLinkActive]=\"['link_active']\"\r\n                data-toggle=\"tooltip\" data-placement=\"right\" title=\"Meal Planner\" (click)=\"unReadMessage()\">\r\n                <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"\r\n                  xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 58 58\"\r\n                  style=\"enable-background:new 0 0 58 58;\" xml:space=\"preserve\">\r\n                  <g>\r\n                    <path d=\"M46,34c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S52.617,34,46,34z M46,56c-5.514,0-10-4.486-10-10\r\n\t\ts4.486-10,10-10s10,4.486,10,10S51.514,56,46,56z\" />\r\n                    <path\r\n                      d=\"M52,45h-5v-5c0-0.553-0.447-1-1-1s-1,0.447-1,1v6c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1S52.553,45,52,45z\" />\r\n                    <path d=\"M27,21h-2h-7h-2H7v9v2v7v2v9h9h2h9v-9v-2v-7h7h2h9V21h-9h-2H27z M36,23h7v7h-7V23z M18,23h7v7h-7V23z M9,23h7v7H9V23z\r\n\t\t M9,32h7v7H9V32z M16,48H9v-7h7V48z M25,48h-7v-7h7V48z M25,39h-7v-7h7V39z M34,30h-7v-7h7V30z\" />\r\n                    <path d=\"M33,55H2V16h48v13c0,0.553,0.447,1,1,1s1-0.447,1-1V15V5c0-0.553-0.447-1-1-1h-5V1c0-0.553-0.447-1-1-1h-7\r\n\t\tc-0.553,0-1,0.447-1,1v3H15V1c0-0.553-0.447-1-1-1H7C6.447,0,6,0.447,6,1v3H1C0.447,4,0,4.447,0,5v10v41c0,0.553,0.447,1,1,1h32\r\n\t\tc0.553,0,1-0.447,1-1S33.553,55,33,55z M39,2h5v3v3h-5V5V2z M8,2h5v3v3H8V5V2z M2,6h4v3c0,0.553,0.447,1,1,1h7c0.553,0,1-0.447,1-1\r\n\t\tV6h22v3c0,0.553,0.447,1,1,1h7c0.553,0,1-0.447,1-1V6h4v8H2V6z\" />\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                </svg>\r\n\r\n                <span>Meal Planner</span></a>\r\n            </li>\r\n            <li class=\"an-nav-item\">\r\n              <a class=\" js-show-child-nav\" [routerLink]=\"['agencydashboard/foodlist']\"\r\n                [routerLinkActive]=\"['link_active']\" (click)=\"unReadMessage()\">\r\n                <img src=\"assets/img/dailysheet.svg\" alt=\"\">\r\n                <span class=\"nav-title\">Food List\r\n                  <span class=\"an-arrow-nav\">\r\n                    <i class=\"icon-arrow-down\"></i>\r\n                  </span>\r\n                </span>\r\n              </a>\r\n    \r\n            </li>\r\n\r\n          </ul>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['agencydashboard/message']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"readMessage()\">\r\n            <img src=\"assets/img/msg.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Message\r\n              <span class=\"an-arrow-nav count\" *ngIf=\"messageCount != 0\">{{messageCount}}</span>\r\n            </span>\r\n          </a>\r\n        </li>\r\n\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['agencydashboard/adminincidentreport']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/incident.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Incident\r\n              <span class=\"an-arrow-nav count\">{{incidentCont}}</span>\r\n            </span>\r\n          </a>\r\n        </li>\r\n\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['agencydashboard/setting']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/side5.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Settings</span>\r\n          </a>\r\n        </li>\r\n        <!-- <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['agencydashboard/account']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/childactivity.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Account</span>\r\n          </a>\r\n        </li> -->\r\n\r\n        <li class=\"an-nav-item \">\r\n          <a class=\" js-show-child-nav\" data-toggle=\"collapse\" data-target=\"#paymentmanage\"\r\n            [routerLinkActive]=\"['link_active']\">\r\n            <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Payment\">\r\n              <img src=\"assets/img/payment.svg\" alt=\"\">\r\n              <span class=\"nav-title\">Payment\r\n                <span class=\"an-arrow-nav\">\r\n                  <i class=\"icon-arrow-down\"></i>\r\n                </span>\r\n              </span>\r\n\r\n            </span>\r\n\r\n          </a>\r\n          <ul class=\"collapse\" id=\"paymentmanage\">\r\n            <!-- <li>\r\n              <a [routerLink]=\"['agencydashboard/payment']\" [routerLinkActive]=\"['link_active']\" data-toggle=\"tooltip\"\r\n                data-placement=\"right\" title=\"Payment\"> <img src=\"assets/img/credit-card.svg\"\r\n                  alt=\"\"><span>Payment</span></a>\r\n            </li> -->\r\n            <li>\r\n              <a [routerLink]=\"['agencydashboard/parentledger']\" [routerLinkActive]=\"['link_active']\"\r\n                data-toggle=\"tooltip\" data-placement=\"right\" title=\"Payment\" (click)=\"unReadMessage()\"> <img\r\n                  src=\"assets/img/credit-card.svg\" alt=\"\"><span>Payment</span></a>\r\n            </li>\r\n            <!-- <li>\r\n              <a [routerLink]=\"['agencydashboard/advancepayment']\" [routerLinkActive]=\"['link_active']\"\r\n                data-toggle=\"tooltip\" data-placement=\"right\" title=\"Advance Payment\"><img\r\n                  src=\"assets/img/payment-method (1).svg\" alt=\"\"><span>Advance\r\n                  Payment</span></a>\r\n            </li> -->\r\n          </ul>\r\n        </li>\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['agencydashboard/report']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/report.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Reports</span>\r\n          </a>\r\n        </li>\r\n        <!-- <li class=\"an-nav-item  \">\r\n          <a class=\"\" [routerLink]=\"['agencydashboard/newmealplanner']\" [routerLinkActive]=\"['link_active']\">\r\n            <img src=\"assets/img/report.svg\" alt=\"\">\r\n            <span class=\"nav-title\">New Mealplanner </span>\r\n          </a>\r\n        </li> -->\r\n\r\n        <!-- <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" data-toggle=\"collapse\" data-target=\"#agencyrepo\">\r\n            <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Reports\">\r\n\r\n              <img src=\"assets/img/report.svg\" alt=\"\">\r\n              <span class=\"nav-title\">Reports\r\n              </span>\r\n            </span>\r\n          </a>\r\n          <ul class=\"collapse\" id=\"agencyrepo\">\r\n            <li>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/birthreport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Birthday</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/attendancereport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Attendance</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/paymentreport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Due Payment</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/enrollmentreport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Enrollment</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/ledgerreport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Payment</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/accountledger']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Ledger</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/kioskereport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Kiosk Details</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/familyreport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Family Details</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/medicationreport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Medication</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/allergyreport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Allergy</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/givenmedicationreport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Given Medication</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/teacherattendancereport']\"\r\n                [routerLinkActive]=\"['link_active']\" (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Teacher Attendance</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/classtransferreport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Class Transfer Report</span>\r\n              </a>\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/teacherhours']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Teachers Total Hours</span>\r\n              </a>\r\n\r\n              <a class=\"\" [routerLink]=\"['agencydashboard/mealservereport']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\">\r\n                <i class=\"fa fa-arrow-right\" aria-hidden=\"true\"></i>\r\n                <span class=\"nav-title\">Meal Serve Report</span>\r\n              </a>\r\n\r\n            </li>\r\n          </ul>\r\n        </li> -->\r\n      </ul>\r\n      <!-- end .AN-MAIN-NAV -->\r\n    </ng-scrollbar>\r\n  </div>\r\n  <!-- end .AN-SIDEBAR-NAV -->\r\n\r\n</div>\r\n\r\n<div id=\"sidebarLinksParent\" class=\"an-sidebar-nav js-sidebar-toggle-with-click\" *ngIf=\"isTeacherHidden\">\r\n  <!--  Teacher -->\r\n\r\n  <div class=\"logodiv\">\r\n    <a class=\"an-logo-link\" href=\"index.html\">\r\n      <img src=\"assets/img/logo-new.png\" alt=\"\">\r\n    </a>\r\n  </div>\r\n  <div class=\"an-sidebar-nav\">\r\n    <ng-scrollbar>\r\n      <ul class=\"an-main-nav\">\r\n        <li class=\"an-nav-item \">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['teacherdashboard']\" [routerLinkActiveOptions]=\"{exact: true}\"\r\n            [routerLinkActive]=\"'link_active'\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Dashboard\"\r\n            (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/side4.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Dashboard\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['teacherdashboard/dailysheet']\"\r\n            [routerLinkActive]=\"'link_active'\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Daily sheets\"\r\n            (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/dailysheet.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Daily Sheets\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['teacherdashboard/studentlist']\"\r\n            [routerLinkActive]=\"['link_active']\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Student\"\r\n            (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/usermang.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Student\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['teacherdashboard/postactivity']\" data-toggle=\"tooltip\"\r\n            [routerLinkActive]=\"['link_active']\" data-placement=\"right\" title=\"Post Activity\" (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/post.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Post Activity</span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['teacherdashboard/attendence']\" [routerLinkActive]=\"['link_active']\"\r\n            data-toggle=\"tooltip\" data-placement=\"right\" title=\"Attendance\" (click)=\"unReadMessage()\">\r\n            <img src=\"assets/img/list.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Attendance</span>\r\n          </a>\r\n        </li>\r\n\r\n\r\n        <!-- <li class=\"an-nav-item\">\r\n        <a class=\" js-show-child-nav \">\r\n          <img src=\"assets/img/calendar.svg\" alt=\"\">\r\n          <span class=\"nav-title\">Calendar\r\n          </span>\r\n        </a>\r\n        <ul class=\"an-child-nav js-open-nav\">\r\n            <li><a [routerLink]=\"['teacherdashboard/eventplan']\">Event Planner</a></li>\r\n            <li><a [routerLink]=\"['teacherdashboard/mealplan']\">Meal Planner</a></li>\r\n          </ul>\r\n    \r\n      </li> -->\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" data-toggle=\"collapse\" data-target=\"#teachercal\" data-placement=\"right\"\r\n            title=\"Calendar\">\r\n            <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Calendar\">\r\n\r\n              <img src=\"assets/img/calendar.svg\" alt=\"\">\r\n              <span class=\"nav-title\">Calendar\r\n              </span>\r\n            </span>\r\n\r\n          </a>\r\n          <ul id=\"teachercal\" class=\"collapse\">\r\n            <li>\r\n              <a [routerLink]=\"['teacherdashboard/eventplan']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Event Planner\">\r\n                <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"\r\n                  xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\"\r\n                  style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\r\n                  <g>\r\n                    <g>\r\n                      <path\r\n                        d=\"M452,40h-24V0h-40v40H124V0H84v40H60C26.916,40,0,66.916,0,100v352c0,33.084,26.916,60,60,60h392\r\n                   c33.084,0,60-26.916,60-60V100C512,66.916,485.084,40,452,40z M472,452c0,11.028-8.972,20-20,20H60c-11.028,0-20-8.972-20-20V188\r\n                   h432V452z M472,148H40v-48c0-11.028,8.972-20,20-20h24v40h40V80h264v40h40V80h24c11.028,0,20,8.972,20,20V148z\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"76\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"156\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"236\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"316\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"396\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"76\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"156\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"236\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"316\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"76\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"156\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"236\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"316\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"396\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                </svg>\r\n                <span>Event Planner</span></a>\r\n            </li>\r\n            <li>\r\n\r\n              <a [routerLink]=\"['teacherdashboard/mealplan']\" [routerLinkActive]=\"['link_active']\" data-toggle=\"tooltip\"\r\n                (click)=\"unReadMessage()\" data-placement=\"right\" title=\"Meal Planner\">\r\n                <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"\r\n                  xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 58 58\"\r\n                  style=\"enable-background:new 0 0 58 58;\" xml:space=\"preserve\">\r\n                  <g>\r\n                    <path d=\"M46,34c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S52.617,34,46,34z M46,56c-5.514,0-10-4.486-10-10\r\n\t\ts4.486-10,10-10s10,4.486,10,10S51.514,56,46,56z\" />\r\n                    <path\r\n                      d=\"M52,45h-5v-5c0-0.553-0.447-1-1-1s-1,0.447-1,1v6c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1S52.553,45,52,45z\" />\r\n                    <path d=\"M27,21h-2h-7h-2H7v9v2v7v2v9h9h2h9v-9v-2v-7h7h2h9V21h-9h-2H27z M36,23h7v7h-7V23z M18,23h7v7h-7V23z M9,23h7v7H9V23z\r\n\t\t M9,32h7v7H9V32z M16,48H9v-7h7V48z M25,48h-7v-7h7V48z M25,39h-7v-7h7V39z M34,30h-7v-7h7V30z\" />\r\n                    <path d=\"M33,55H2V16h48v13c0,0.553,0.447,1,1,1s1-0.447,1-1V15V5c0-0.553-0.447-1-1-1h-5V1c0-0.553-0.447-1-1-1h-7\r\n\t\tc-0.553,0-1,0.447-1,1v3H15V1c0-0.553-0.447-1-1-1H7C6.447,0,6,0.447,6,1v3H1C0.447,4,0,4.447,0,5v10v41c0,0.553,0.447,1,1,1h32\r\n\t\tc0.553,0,1-0.447,1-1S33.553,55,33,55z M39,2h5v3v3h-5V5V2z M8,2h5v3v3H8V5V2z M2,6h4v3c0,0.553,0.447,1,1,1h7c0.553,0,1-0.447,1-1\r\n\t\tV6h22v3c0,0.553,0.447,1,1,1h7c0.553,0,1-0.447,1-1V6h4v8H2V6z\" />\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                </svg>\r\n\r\n                <span>Meal Planner</span></a>\r\n            </li>\r\n          </ul>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['teacherdashboard/message']\" [routerLinkActive]=\"['link_active']\"\r\n            data-toggle=\"tooltip\" data-placement=\"right\" title=\"Message\" (click)=\"readMessage()\">\r\n            <img src=\"assets/img/msg.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Message\r\n              <span class=\"an-arrow-nav count\" *ngIf=\"messageCount != 0\">{{messageCount}}</span>\r\n              <!-- <span class=\"an-arrow-nav count\">3</span> -->\r\n            </span>\r\n          </a>\r\n        </li>\r\n\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['teacherdashboard/teacherincidentlog']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Incident\">\r\n            <img src=\"assets/img/incident.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Incident\r\n              <span title=\"Count of incident on which action is not taken\"\r\n                class=\"an-arrow-nav count\">{{incidentCont}}</span>\r\n            </span>\r\n          </a>\r\n        </li>\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['teacherdashboard/teacherbreaks']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"My Breaks\">\r\n            <img src=\"assets/img/break.svg\" alt=\"\">\r\n            <span class=\"nav-title\">My Breaks</span>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n      <!-- end .AN-MAIN-NAV -->\r\n    </ng-scrollbar>\r\n  </div>\r\n  <!-- end .AN-SIDEBAR-NAV -->\r\n</div>\r\n\r\n\r\n<div id=\"sidebarLinksParent\" class=\"an-sidebar-nav js-sidebar-toggle-with-click parent_sidebar\" *ngIf=\"isParentHidden\">\r\n  <!--  parent -->\r\n  <div class=\"logodiv\">\r\n    <a class=\"an-logo-link\" href=\"index.html\">\r\n      <img src=\"assets/img/logo-new.png\" alt=\"\">\r\n    </a>\r\n  </div>\r\n  <div class=\"an-sidebar-nav\">\r\n    <ng-scrollbar>\r\n      <ul class=\"an-main-nav\">\r\n        <li class=\"an-nav-item \">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['parentdashboard']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" [routerLinkActiveOptions]=\"{exact: true}\" data-toggle=\"tooltip\"\r\n            data-placement=\"right\" title=\"Dashboard\">\r\n            <img src=\"assets/img/side4.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Dashboard\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" *ngIf=\"parentType != 'guardian'\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" [routerLink]=\"['parentdashboard/parentandguardian']\" data-toggle=\"tooltip\"\r\n            data-placement=\"right\" title=\"Parent\">\r\n            <img src=\"assets/img/usermang.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Parent\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"js-show-child-nav\" [routerLink]=\"['parentdashboard/parentattendancehistory']\"\r\n            (click)=\"unReadMessage()\" [routerLinkActive]=\"['link_active']\" data-toggle=\"tooltip\" data-placement=\"right\"\r\n            title=\"Attendance\">\r\n            <img src=\"assets/img/list.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Attendance</span>\r\n          </a>\r\n        </li>\r\n\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\" js-show-child-nav\" data-toggle=\"collapse\" data-target=\"#parentcal\" data-placement=\"right\"\r\n            title=\"Calendar\">\r\n            <span data-toggle=\"tooltip\" data-placement=\"right\" title=\"Calender\">\r\n\r\n              <img src=\"assets/img/calendar.svg\" alt=\"\">\r\n              <span class=\"nav-title\">Calendar\r\n              </span>\r\n            </span>\r\n\r\n          </a>\r\n          <ul id=\"parentcal\" class=\"collapse\">\r\n            <li>\r\n              <a [routerLink]=\"['parentdashboard/parenteventplanner']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Event Planner\">\r\n                <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"\r\n                  xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\"\r\n                  style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\r\n                  <g>\r\n                    <g>\r\n                      <path\r\n                        d=\"M452,40h-24V0h-40v40H124V0H84v40H60C26.916,40,0,66.916,0,100v352c0,33.084,26.916,60,60,60h392\r\n                   c33.084,0,60-26.916,60-60V100C512,66.916,485.084,40,452,40z M472,452c0,11.028-8.972,20-20,20H60c-11.028,0-20-8.972-20-20V188\r\n                   h432V452z M472,148H40v-48c0-11.028,8.972-20,20-20h24v40h40V80h264v40h40V80h24c11.028,0,20,8.972,20,20V148z\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"76\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"156\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"236\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"316\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"396\" y=\"230\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"76\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"156\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"236\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"316\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"76\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"156\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"236\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"316\" y=\"390\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                    <g>\r\n                      <rect x=\"396\" y=\"310\" width=\"40\" height=\"40\" />\r\n                    </g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                </svg>\r\n                <span>Event Planner</span></a>\r\n            </li>\r\n            <li>\r\n              <a [routerLink]=\"['parentdashboard/parentmealplanner']\" [routerLinkActive]=\"['link_active']\"\r\n                (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Meal Planner\">\r\n                <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\"\r\n                  xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 58 58\"\r\n                  style=\"enable-background:new 0 0 58 58;\" xml:space=\"preserve\">\r\n                  <g>\r\n                    <path d=\"M46,34c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S52.617,34,46,34z M46,56c-5.514,0-10-4.486-10-10\r\n\t\ts4.486-10,10-10s10,4.486,10,10S51.514,56,46,56z\" />\r\n                    <path\r\n                      d=\"M52,45h-5v-5c0-0.553-0.447-1-1-1s-1,0.447-1,1v6c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1S52.553,45,52,45z\" />\r\n                    <path d=\"M27,21h-2h-7h-2H7v9v2v7v2v9h9h2h9v-9v-2v-7h7h2h9V21h-9h-2H27z M36,23h7v7h-7V23z M18,23h7v7h-7V23z M9,23h7v7H9V23z\r\n\t\t M9,32h7v7H9V32z M16,48H9v-7h7V48z M25,48h-7v-7h7V48z M25,39h-7v-7h7V39z M34,30h-7v-7h7V30z\" />\r\n                    <path d=\"M33,55H2V16h48v13c0,0.553,0.447,1,1,1s1-0.447,1-1V15V5c0-0.553-0.447-1-1-1h-5V1c0-0.553-0.447-1-1-1h-7\r\n\t\tc-0.553,0-1,0.447-1,1v3H15V1c0-0.553-0.447-1-1-1H7C6.447,0,6,0.447,6,1v3H1C0.447,4,0,4.447,0,5v10v41c0,0.553,0.447,1,1,1h32\r\n\t\tc0.553,0,1-0.447,1-1S33.553,55,33,55z M39,2h5v3v3h-5V5V2z M8,2h5v3v3H8V5V2z M2,6h4v3c0,0.553,0.447,1,1,1h7c0.553,0,1-0.447,1-1\r\n\t\tV6h22v3c0,0.553,0.447,1,1,1h7c0.553,0,1-0.447,1-1V6h4v8H2V6z\" />\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                  <g>\r\n                  </g>\r\n                </svg>\r\n\r\n                <span>Meal Planner</span></a>\r\n            </li>\r\n          </ul>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['parentdashboard/parentmessage']\" [routerLinkActive]=\"['link_active']\"\r\n            data-toggle=\"tooltip\" data-placement=\"right\" title=\"Message\" (click)=\"readMessage()\">\r\n            <span>\r\n              <img src=\"assets/img/msg.svg\" alt=\"\">\r\n              <span class=\"nav-title\">Message\r\n                <span class=\"an-arrow-nav count\" *ngIf=\"messageCount != 0\">{{messageCount}}</span>\r\n                <!-- <span class=\"an-arrow-nav count\">3</span> -->\r\n              </span>\r\n            </span>\r\n          </a>\r\n        </li>\r\n\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['parentdashboard/parentincidentreport']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Incident\">\r\n            <img src=\"assets/img/incident.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Incident\r\n              <!-- <span class=\"an-arrow-nav count\">2</span> -->\r\n            </span>\r\n          </a>\r\n        </li>\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['parentdashboard/parentactivityreport']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Child's Activity\">\r\n            <img src=\"assets/img/childactivity.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Child's Activity</span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\">\r\n          <a class=\"\" [routerLink]=\"['parentdashboard/parentchildfillform']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Child's Form\">\r\n            <img src=\"assets/img/add.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Child's Form</span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\" *ngIf=\"parentType != 'guardian'\">\r\n          <a class=\"\" [routerLink]=\"['parentdashboard/parentpayment']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Payment\">\r\n            <img src=\"assets/img/payment.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Payment</span>\r\n          </a>\r\n        </li>\r\n\r\n        <li class=\"an-nav-item\" *ngIf=\"parentType != 'guardian'\">\r\n          <a class=\"\" [routerLink]=\"['parentdashboard/parentpaymentach']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"ACH Payment\">\r\n            <img src=\"assets/img/payment.svg\" alt=\"\">\r\n            <span class=\"nav-title\">ACH Payment</span>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n      <!-- end .AN-MAIN-NAV -->\r\n    </ng-scrollbar>\r\n  </div>\r\n  <!-- end .AN-SIDEBAR-NAV -->\r\n</div>\r\n\r\n<div id=\"sidebarLinksParent\" class=\"an-sidebar-nav js-sidebar-toggle-with-click parent_sidebar\"\r\n  *ngIf=\"isKioskParentHidden\">\r\n  <!--  parent -->\r\n  <div class=\"logodiv\">\r\n    <a class=\"an-logo-link\" href=\"index.html\">\r\n      <img src=\"assets/img/logo-new.png\" alt=\"\">\r\n    </a>\r\n  </div>\r\n  <div class=\"an-sidebar-nav\">\r\n    <ng-scrollbar>\r\n      <ul class=\"an-main-nav\">\r\n        <li class=\"an-nav-item \">\r\n          <a class=\" js-show-child-nav\" [routerLink]=\"['parentdashboard/kiosk']\" [routerLinkActive]=\"['link_active']\"\r\n            (click)=\"unReadMessage()\" [routerLinkActiveOptions]=\"{exact: true}\" data-toggle=\"tooltip\"\r\n            data-placement=\"right\" title=\"Dashboard\">\r\n            <img src=\"assets/img/side4.svg\" alt=\"\">\r\n            <span class=\"nav-title\">Dashboard\r\n              <span class=\"an-arrow-nav\">\r\n                <i class=\"icon-arrow-down\"></i>\r\n              </span>\r\n            </span>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n      <!-- end .AN-MAIN-NAV -->\r\n    </ng-scrollbar>\r\n  </div>\r\n  <!-- end .AN-SIDEBAR-NAV -->\r\n</div>"

/***/ }),

/***/ "./src/app/layout/component/sidebar/sidebar.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/component/sidebar/sidebar.component.ts ***!
  \***************************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _teacher_shared_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../teacher/shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _teacher_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../teacher/shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
/* harmony import */ var ngx_scrollbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-scrollbar */ "./node_modules/ngx-scrollbar/fesm5/ngx-scrollbar.js");
/* harmony import */ var _aspnet_signalr__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aspnet/signalr */ "./node_modules/@aspnet/signalr/dist/esm/index.js");
/* harmony import */ var src_app_shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(router, commonService, error, apiService, ngZone, notification) {
        this.router = router;
        this.commonService = commonService;
        this.error = error;
        this.apiService = apiService;
        this.ngZone = ngZone;
        this.notification = notification;
        this.messageCount = 0;
        this.IsMessageTabActive = false;
        this.isSuperAdminHidden = false;
        this.isTeacherHidden = false;
        this.isAgencyAdminHidden = false;
        this.isParentHidden = false;
        this.isKioskParentHidden = false;
        if (this.commonService.getUserRole('userdetails') === 1) {
            this.isSuperAdminHidden = true;
        }
        else if (this.commonService.getUserRole('userdetails') === 2) {
            this.isAgencyAdminHidden = true;
        }
        else if (this.commonService.getUserRole('userdetails') === 3) {
            this.isTeacherHidden = true;
        }
        else if (this.commonService.getUserRole('userdetails') === 4) {
            if (this.commonService.getIsKioskLogin() === 'true') {
                this.isKioskParentHidden = true;
            }
            else {
                this.isParentHidden = true;
            }
        }
        else {
            this.error.unknownError();
            this.commonService.logOut();
        }
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loggedInUserID = this.commonService.getLoggedInUserId();
        console.log('oarent', this.parentType = this.commonService.getParentType());
        if (this.commonService.isAuthenticate()) {
            this.getAllIncidents();
            this.getAllMessages();
        }
        this.commonService.getIncidentCount().subscribe(function (count) {
            _this.incidentCont = count;
        });
        this.eshtablishConnectionSignalR();
        this._hubConnection.on('messageReceived', function (nick, receivedMessage) {
            var text = nick + ": " + receivedMessage;
            var str = text.substring(text.indexOf(':') + 1);
            var Obj = JSON.parse(str);
            _this.msgSenderId = Obj.sender;
            console.log('signal', Obj);
            console.log('this.selectedId,this.receiverId', _this.msgSenderId, _this.receiverId);
            if (Obj.receiver === _this.loggedInUserID && _this.IsMessageTabActive === false) {
                _this.messageCount = _this.messageCount + 1;
            }
        });
    };
    SidebarComponent.prototype.ngAfterViewInit = function () {
        var currentWindowWidth = window.innerWidth;
        if (currentWindowWidth < 992) {
            document.getElementsByTagName('body')[0].classList.toggle('collapsedSidebar');
            document.getElementById('sidebarLinksParent').classList.toggle('collapse');
        }
        this.shown = 'always';
    };
    SidebarComponent.prototype.getAllIncidents = function () {
        var _this = this;
        var req = {
            'agencyID': this.commonService.getAgencyId(),
        };
        this.apiService.postData(_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_4__["TeacherAPIURLs"].GetAllIncidents, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                var count_1 = 0;
                if (res.body.data) {
                    res.body.data.forEach(function (element) {
                        if (element.actionTaken === '') {
                            count_1++;
                        }
                    });
                    _this.incidentCont = count_1;
                    console.log('sidebr incident', _this.incidentCont);
                }
                else {
                    _this.incidentCont = count_1;
                }
            }
            else {
            }
        }, function (err) {
        });
    };
    SidebarComponent.prototype.getAllMessages = function () {
        var _this = this;
        var req = {
            'ReceiverUserID': this.loggedInUserID,
        };
        this.apiService.postData(_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_4__["TeacherAPIURLs"].GetUnReadMessageCount, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.totalRows) {
                    _this.messageCount = res.body.totalRows;
                    console.log('Message Count', _this.messageCount);
                }
                else {
                    _this.messageCount = 0;
                }
            }
            else {
            }
        }, function (err) {
        });
    };
    SidebarComponent.prototype.inprogress = function () {
        this.notification.info({ message: 'Functionality in progress', title: 'Comming Soon!' });
    };
    SidebarComponent.prototype.readMessage = function () {
        this.messageCount = 0;
        this.IsMessageTabActive = true;
    };
    SidebarComponent.prototype.unReadMessage = function () {
        this.IsMessageTabActive = false;
    };
    SidebarComponent.prototype.eshtablishConnectionSignalR = function () {
        var _this = this;
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_9__["environment"].baseUrl + '' + 'chat';
        this._hubConnection = new _aspnet_signalr__WEBPACK_IMPORTED_MODULE_7__["HubConnectionBuilder"]()
            .withUrl(url)
            .build();
        this._hubConnection
            .start()
            .then(function () {
            _this._hubConnection.invoke('getConnectionId', _this.loggedInUserID)
                .then(function (connectionId) {
                // Send the connectionId to controller
                _this.token = connectionId;
            });
        })
            .catch(function (err) { return console.log('Error while establishing connection :(', _this.eshtablishConnectionSignalR()); });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ngx_scrollbar__WEBPACK_IMPORTED_MODULE_6__["NgScrollbar"]),
        __metadata("design:type", ngx_scrollbar__WEBPACK_IMPORTED_MODULE_6__["NgScrollbar"])
    ], SidebarComponent.prototype, "scrollRef", void 0);
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/layout/component/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.css */ "./src/app/layout/component/sidebar/sidebar.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"], _teacher_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_5__["TeacherApiService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], src_app_shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_8__["NotificationService"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/layout/layout-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/layout-routing.module.ts ***!
  \*************************************************/
/*! exports provided: LayoutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutRoutingModule", function() { return LayoutRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.component */ "./src/app/layout/layout.component.ts");
/* harmony import */ var _shared_services_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/guard */ "./src/app/shared/services/guard/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _layout_component__WEBPACK_IMPORTED_MODULE_2__["LayoutComponent"],
        children: [
            {
                path: 'agencydashboard', loadChildren: './agency-admin/agency-admin.module#AgencyAdminModule',
                canActivate: [_shared_services_guard__WEBPACK_IMPORTED_MODULE_3__["AdminAuthGuard"]]
            },
            {
                path: 'superadmin', loadChildren: './admin/admin.module#AdminModule',
                canActivate: [_shared_services_guard__WEBPACK_IMPORTED_MODULE_3__["SuperAdminAuthGuard"]]
            },
            {
                path: 'teacherdashboard', loadChildren: './teacher/teacher.module#TeacherModule',
                canActivate: [_shared_services_guard__WEBPACK_IMPORTED_MODULE_3__["TeacherAuthGuard"]]
            },
            {
                path: 'parentdashboard', loadChildren: './parent/parent.module#ParentModule',
                canActivate: [_shared_services_guard__WEBPACK_IMPORTED_MODULE_3__["ParentAuthGuard"]]
            },
            {
                path: 'livefeed', loadChildren: './livefeed/livefeed.module#LivefeedModule'
            },
            {
                path: 'global', loadChildren: './global/global.module#GlobalModule'
            },
            {
                path: 'kioskdashboard', loadChildren: './parent/parent.module#ParentModule',
                canActivate: [_shared_services_guard__WEBPACK_IMPORTED_MODULE_3__["ParentAuthGuard"]]
            },
        ]
    }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/layout.component.html":
/*!**********************************************!*\
  !*** ./src/app/layout/layout.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\r\n<app-sidebar></app-sidebar>\r\n<router-outlet></router-outlet>\r\n<app-footer></app-footer>\r\n    \r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/layout/layout.component.scss":
/*!**********************************************!*\
  !*** ./src/app/layout/layout.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sYXlvdXQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/layout.component.ts":
/*!********************************************!*\
  !*** ./src/app/layout/layout.component.ts ***!
  \********************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LayoutComponent = /** @class */ (function () {
    function LayoutComponent(router) {
        this.router = router;
    }
    LayoutComponent.prototype.ngOnInit = function () {
        // const path = localStorage.getItem('path');
        // const user = JSON.parse(localStorage.getItem('isauthenticated'));
        // if (this.router.url === '/home' && user === true ) {
        //     this.router.navigate([path]);
        // } else {
        //     this.router.navigate(['/']);
        // }
    };
    LayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-layout',
            template: __webpack_require__(/*! ./layout.component.html */ "./src/app/layout/layout.component.html"),
            styles: [__webpack_require__(/*! ./layout.component.scss */ "./src/app/layout/layout.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], LayoutComponent);
    return LayoutComponent;
}());



/***/ }),

/***/ "./src/app/layout/layout.module.ts":
/*!*****************************************!*\
  !*** ./src/app/layout/layout.module.ts ***!
  \*****************************************/
/*! exports provided: LayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _layout_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout-routing.module */ "./src/app/layout/layout-routing.module.ts");
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout.component */ "./src/app/layout/layout.component.ts");
/* harmony import */ var _component_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/sidebar/sidebar.component */ "./src/app/layout/component/sidebar/sidebar.component.ts");
/* harmony import */ var _component_header_header_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./component/header/header.component */ "./src/app/layout/component/header/header.component.ts");
/* harmony import */ var _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/footer/footer.component */ "./src/app/layout/component/footer/footer.component.ts");
/* harmony import */ var ngx_scrollbar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-scrollbar */ "./node_modules/ngx-scrollbar/fesm5/ngx-scrollbar.js");
/* harmony import */ var _shared_services_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/services/guard */ "./src/app/shared/services/guard/index.ts");
/* harmony import */ var _shared_services_lauout_api_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/services/lauout-api-service */ "./src/app/shared/services/lauout-api-service.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _layout_routing_module__WEBPACK_IMPORTED_MODULE_2__["LayoutRoutingModule"],
                ngx_scrollbar__WEBPACK_IMPORTED_MODULE_7__["NgScrollbarModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_12__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_12__["ReactiveFormsModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_11__["BsDatepickerModule"].forRoot(),
            ],
            declarations: [_layout_component__WEBPACK_IMPORTED_MODULE_3__["LayoutComponent"], _component_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__["SidebarComponent"], _component_header_header_component__WEBPACK_IMPORTED_MODULE_5__["HeaderComponent"], _component_footer_footer_component__WEBPACK_IMPORTED_MODULE_6__["FooterComponent"]],
            providers: [_shared_services_guard__WEBPACK_IMPORTED_MODULE_8__["AdminAuthGuard"],
                _shared_services_guard__WEBPACK_IMPORTED_MODULE_8__["SuperAdminAuthGuard"],
                _shared_services_guard__WEBPACK_IMPORTED_MODULE_8__["TeacherAuthGuard"],
                _shared_services_guard__WEBPACK_IMPORTED_MODULE_8__["ParentAuthGuard"],
                _shared_services_lauout_api_service__WEBPACK_IMPORTED_MODULE_9__["LayoutApiService"]
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());



/***/ })

}]);
//# sourceMappingURL=layout-layout-module.js.map