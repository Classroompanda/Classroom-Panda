(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["auth-auth-module"],{

/***/ "./src/app/auth/auth-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/auth/auth-routing.module.ts ***!
  \*********************************************/
/*! exports provided: AuthRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthRoutingModule", function() { return AuthRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_auth_components_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth/components/login/login.component */ "./src/app/auth/components/login/login.component.ts");
/* harmony import */ var src_app_auth_components_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/auth/components/forgot-password/forgot-password.component */ "./src/app/auth/components/forgot-password/forgot-password.component.ts");
/* harmony import */ var src_app_auth_components_create_password_create_password_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/auth/components/create-password/create-password.component */ "./src/app/auth/components/create-password/create-password.component.ts");
/* harmony import */ var _components_parents_registration_parents_registration_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/parents-registration/parents-registration.component */ "./src/app/auth/components/parents-registration/parents-registration.component.ts");
/* harmony import */ var _components_agency_registration_agency_registration_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/agency-registration/agency-registration.component */ "./src/app/auth/components/agency-registration/agency-registration.component.ts");
/* harmony import */ var _components_kiosk_login_kiosk_login_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/kiosk-login/kiosk-login.component */ "./src/app/auth/components/kiosk-login/kiosk-login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var routes = [
    { path: '', component: src_app_auth_components_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    { path: 'forgotpassword', component: src_app_auth_components_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_3__["ForgotPasswordComponent"] },
    { path: 'createpassword/:id', component: src_app_auth_components_create_password_create_password_component__WEBPACK_IMPORTED_MODULE_4__["CreatePasswordComponent"] },
    { path: 'parentsregistration', component: _components_parents_registration_parents_registration_component__WEBPACK_IMPORTED_MODULE_5__["ParentsRegistrationComponent"] },
    { path: 'agencyregistration', component: _components_agency_registration_agency_registration_component__WEBPACK_IMPORTED_MODULE_6__["AgencyRegistrationComponent"] },
    { path: 'kiosklogin', component: _components_kiosk_login_kiosk_login_component__WEBPACK_IMPORTED_MODULE_7__["KioskLoginComponent"] }
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.component.html":
/*!******************************************!*\
  !*** ./src/app/auth/auth.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/auth/auth.component.ts":
/*!****************************************!*\
  !*** ./src/app/auth/auth.component.ts ***!
  \****************************************/
/*! exports provided: AuthComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthComponent", function() { return AuthComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AuthComponent = /** @class */ (function () {
    function AuthComponent() {
        this.title = 'DayCareSolution';
    }
    AuthComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-auth',
            template: __webpack_require__(/*! ./auth.component.html */ "./src/app/auth/auth.component.html")
        })
    ], AuthComponent);
    return AuthComponent;
}());



/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/*! exports provided: AuthModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthModule", function() { return AuthModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_auth_auth_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/auth/auth-routing.module */ "./src/app/auth/auth-routing.module.ts");
/* harmony import */ var _components_login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/login/login.component */ "./src/app/auth/components/login/login.component.ts");
/* harmony import */ var src_app_auth_auth_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/auth/auth.component */ "./src/app/auth/auth.component.ts");
/* harmony import */ var _components_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/forgot-password/forgot-password.component */ "./src/app/auth/components/forgot-password/forgot-password.component.ts");
/* harmony import */ var primeng_accordion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/accordion */ "./node_modules/primeng/accordion.js");
/* harmony import */ var primeng_accordion__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_accordion__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var primeng_components_common_shared__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/components/common/shared */ "./node_modules/primeng/components/common/shared.js");
/* harmony import */ var primeng_components_common_shared__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_components_common_shared__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./shared/services/auth-api-service/auth-api.service */ "./src/app/auth/shared/services/auth-api-service/auth-api.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _components_create_password_create_password_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/create-password/create-password.component */ "./src/app/auth/components/create-password/create-password.component.ts");
/* harmony import */ var _components_parents_registration_parents_registration_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/parents-registration/parents-registration.component */ "./src/app/auth/components/parents-registration/parents-registration.component.ts");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! primeng/dialog */ "./node_modules/primeng/dialog.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(primeng_dialog__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/confirmdialog */ "./node_modules/primeng/confirmdialog.js");
/* harmony import */ var primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _shared_confirm_box_confirm_box_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared/confirm-box/confirm-box.component */ "./src/app/auth/shared/confirm-box/confirm-box.component.ts");
/* harmony import */ var _components_agency_registration_agency_registration_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/agency-registration/agency-registration.component */ "./src/app/auth/components/agency-registration/agency-registration.component.ts");
/* harmony import */ var _components_kiosk_login_kiosk_login_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/kiosk-login/kiosk-login.component */ "./src/app/auth/components/kiosk-login/kiosk-login.component.ts");
/* harmony import */ var ng_otp_input__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng-otp-input */ "./node_modules/ng-otp-input/fesm5/ng-otp-input.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




















var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                src_app_auth_auth_routing_module__WEBPACK_IMPORTED_MODULE_2__["AuthRoutingModule"],
                primeng_accordion__WEBPACK_IMPORTED_MODULE_6__["AccordionModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                primeng_dialog__WEBPACK_IMPORTED_MODULE_13__["DialogModule"],
                primeng_components_common_shared__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_10__["NgxSpinnerModule"],
                primeng_confirmdialog__WEBPACK_IMPORTED_MODULE_15__["ConfirmDialogModule"],
                ng_otp_input__WEBPACK_IMPORTED_MODULE_19__["NgOtpInputModule"]
            ],
            declarations: [_components_login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"],
                src_app_auth_auth_component__WEBPACK_IMPORTED_MODULE_4__["AuthComponent"],
                _components_forgot_password_forgot_password_component__WEBPACK_IMPORTED_MODULE_5__["ForgotPasswordComponent"],
                _components_create_password_create_password_component__WEBPACK_IMPORTED_MODULE_11__["CreatePasswordComponent"],
                _components_parents_registration_parents_registration_component__WEBPACK_IMPORTED_MODULE_12__["ParentsRegistrationComponent"],
                _shared_confirm_box_confirm_box_component__WEBPACK_IMPORTED_MODULE_16__["ConfirmBoxComponent"],
                _components_agency_registration_agency_registration_component__WEBPACK_IMPORTED_MODULE_17__["AgencyRegistrationComponent"],
                _components_kiosk_login_kiosk_login_component__WEBPACK_IMPORTED_MODULE_18__["KioskLoginComponent"]],
            providers: [_shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_9__["AuthApiService"], primeng_api__WEBPACK_IMPORTED_MODULE_14__["ConfirmationService"]]
        })
    ], AuthModule);
    return AuthModule;
}());



/***/ }),

/***/ "./src/app/auth/components/agency-registration/agency-registration.component.css":
/*!***************************************************************************************!*\
  !*** ./src/app/auth/components/agency-registration/agency-registration.component.css ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* .bgblue{background: #58A7FE!important} */\r\nhtml, body{height: 100vh;}\r\n.pt-100{padding-top:30px }\r\n.bgblue h1{font-size: 30px;text-align: center;color: #FF6C6C;margin-bottom: 100px}\r\n.bgblue h1 span{color: #58A7FE;font-weight: 600}\r\n.bgblue {\r\n  background: #fffaf3;\r\n  height: auto;\r\n  /* display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center; */\r\n  padding-top: 20px;\r\n}\r\n.btn-success{\r\n    width: 100%;\r\n    padding: 12px 0;\r\n    border: 0;\r\n    background: #FF6C6C;\r\n    font-size: 18px;\r\n    border-radius: 0 0 10px 10px;\r\n}\r\n.login {\r\n  background: #FF6C6C;\r\n  font-size: 18px;\r\n  padding: 13px 35px;\r\n  color: #fff;\r\n}\r\n.forgot{font-size: 14px; color: #58A7FE;font-weight: 400}\r\n.m-30{margin: 30px 0;}\r\n.btn-success:not(:disabled):not(.disabled):active{background: #337ab7;border-color:#337ab7 }\r\n.an-header{top:0;height: 50px;padding: 0}\r\n.an-logo-heading{font-size: 15px;padding-left:30px }\r\n.btnfooter{    background: #FFFFFF;\r\n  padding: 14px;box-shadow: 0 0 20px 2px rgba(153, 153, 153, 0.4)}\r\n.btnfooter p{padding: 0;margin: 0}\r\n.loginbox { position: relative;\r\n    margin-top: -10%;\r\n  }\r\n.loginbox .checkboxcustom{padding-left:30px }\r\n.loginbox .topkid{position: absolute;\r\n    top: -70px;\r\n    text-align: center;\r\n    right: 0;\r\n    }\r\n.loginbox .bottomkid{position: absolute;\r\n      bottom: -40px;\r\n      text-align: center;\r\n      left: -70px;\r\n      }\r\n.loginbox .bottomkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.loginbox .topkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.form-fieldset{\r\n        padding: 20px;\r\n      }\r\n/* .form-card{background: url('../../../../assets/img/back.png'); */\r\n/* } */\r\n.login-head {\r\n  background: #fffaf3;\r\n  text-align: center;\r\n}\r\n.login-head img {\r\n  width: 210px;\r\n}\r\n@media (max-width:992px) {\r\n  .div12 img {\r\n    display: none;\r\n  }\r\n}\r\n@media (max-width: 640px)\r\n{\r\n.an-topbar-left-part {\r\n   background: #fff;\r\n   }\r\n.form-card{width: 90%}\r\n.an-header{flex-direction: row}\r\n.an-logo-heading{\r\n  padding: 0\r\n}\r\n}\r\n@media (max-width: 480px) {\r\n  .login-head img {\r\n    width: 80%;\r\n  }\r\n}\r\n.card-pricing {\r\n    z-index: 1;\r\n    border: 3px solid transparent;\r\n}\r\n.card-pricing .list-unstyled li {\r\n    padding: .5rem 0;\r\n    color: #6c757d;\r\n}\r\n.bg-primary{background:#58A7FE!important;font-size: 14px;}\r\n.card-pricing:hover {\r\n    z-index: 1;\r\n    border: 3px solid #58A7FE;\r\n    box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;\r\n}\r\n.upload-btn-wrapper{ top: 10px !important}\r\n.checkbox_address\r\n{\r\nheight: 34px;\r\nwidth: 20px;\r\nmargin-left: 0px;\r\nmargin-top: -8px;\r\n}\r\n.info-icon{\r\n    margin-left: 264px;\r\n    font-size: 20px; \r\n    color: #383333;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9jb21wb25lbnRzL2FnZW5jeS1yZWdpc3RyYXRpb24vYWdlbmN5LXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDJDQUEyQztBQUMzQyxXQUFXLGFBQWEsQ0FBQztBQUN6QixRQUFRLGlCQUFpQjtBQUN6QixXQUFXLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsb0JBQW9CO0FBQ2pGLGdCQUFnQixjQUFjLENBQUMsZ0JBQWdCO0FBQy9DO0VBQ0UsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWjs7OzRCQUcwQjtFQUMxQixpQkFBaUI7QUFDbkI7QUFDQTtJQUNJLFdBQVc7SUFDWCxlQUFlO0lBQ2YsU0FBUztJQUNULG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsNEJBQTRCO0FBQ2hDO0FBQ0E7RUFDRSxtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7QUFFQSxRQUFRLGVBQWUsRUFBRSxjQUFjLENBQUMsZ0JBQWdCO0FBQ3hELE1BQU0sY0FBYyxDQUFDO0FBRXJCLGtEQUFrRCxtQkFBbUIsQ0FBQyxxQkFBcUI7QUFDM0YsV0FBVyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVU7QUFDeEMsaUJBQWlCLGVBQWUsQ0FBQyxrQkFBa0I7QUFDbkQsZUFBZSxtQkFBbUI7RUFDaEMsYUFBYSxDQUFDLGlEQUFpRDtBQUMvRCxhQUFhLFVBQVUsQ0FBQyxTQUFTO0FBR2pDLFlBQVksa0JBQWtCO0lBQzVCLGdCQUFnQjtFQUNsQjtBQUNBLDBCQUEwQixrQkFBa0I7QUFDNUMsa0JBQWtCLGtCQUFrQjtJQUNsQyxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUjtBQUVBLHFCQUFxQixrQkFBa0I7TUFDckMsYUFBYTtNQUNiLGtCQUFrQjtNQUNsQixXQUFXO01BQ1g7QUFFRiw2QkFBNkIsYUFBYTtNQUN4QyxjQUFjLENBQUM7QUFFakIsMEJBQTBCLGFBQWE7TUFDckMsY0FBYyxDQUFDO0FBRWY7UUFDRSxhQUFhO01BQ2Y7QUFFTixtRUFBbUU7QUFFbkUsTUFBTTtBQUNOO0VBQ0UsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjtBQUNGO0FBQ0E7O0FBRUE7R0FDRyxnQkFBZ0I7R0FDaEI7QUFDSCxXQUFXLFVBQVU7QUFDckIsV0FBVyxtQkFBbUI7QUFDOUI7RUFDRTtBQUNGO0FBQ0E7QUFDQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0FBQ0Y7QUFFQTtJQUNJLFVBQVU7SUFDViw2QkFBNkI7QUFDakM7QUFDQTtJQUNJLGdCQUFnQjtJQUNoQixjQUFjO0FBQ2xCO0FBR0EsWUFBWSw0QkFBNEIsQ0FBQyxlQUFlLENBQUM7QUFFekQ7SUFDSSxVQUFVO0lBQ1YseUJBQXlCO0lBQ3pCLHVEQUF1RDtBQUMzRDtBQUVBLHFCQUFxQixvQkFBb0I7QUFFekM7O0FBRUEsWUFBWTtBQUNaLFdBQVc7QUFDWCxnQkFBZ0I7QUFDaEIsZ0JBQWdCO0FBQ2hCO0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGNBQWM7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9hdXRoL2NvbXBvbmVudHMvYWdlbmN5LXJlZ2lzdHJhdGlvbi9hZ2VuY3ktcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiAuYmdibHVle2JhY2tncm91bmQ6ICM1OEE3RkUhaW1wb3J0YW50fSAqL1xyXG5odG1sLCBib2R5e2hlaWdodDogMTAwdmg7fVxyXG4ucHQtMTAwe3BhZGRpbmctdG9wOjMwcHggfVxyXG4uYmdibHVlIGgxe2ZvbnQtc2l6ZTogMzBweDt0ZXh0LWFsaWduOiBjZW50ZXI7Y29sb3I6ICNGRjZDNkM7bWFyZ2luLWJvdHRvbTogMTAwcHh9XHJcbi5iZ2JsdWUgaDEgc3Bhbntjb2xvcjogIzU4QTdGRTtmb250LXdlaWdodDogNjAwfVxyXG4uYmdibHVlIHtcclxuICBiYWNrZ3JvdW5kOiAjZmZmYWYzO1xyXG4gIGhlaWdodDogYXV0bztcclxuICAvKiBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgKi9cclxuICBwYWRkaW5nLXRvcDogMjBweDtcclxufVxyXG4uYnRuLXN1Y2Nlc3N7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDEycHggMDtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGJhY2tncm91bmQ6ICNGRjZDNkM7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xyXG59XHJcbi5sb2dpbiB7XHJcbiAgYmFja2dyb3VuZDogI0ZGNkM2QztcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgcGFkZGluZzogMTNweCAzNXB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4uZm9yZ290e2ZvbnQtc2l6ZTogMTRweDsgY29sb3I6ICM1OEE3RkU7Zm9udC13ZWlnaHQ6IDQwMH1cclxuLm0tMzB7bWFyZ2luOiAzMHB4IDA7fVxyXG5cclxuLmJ0bi1zdWNjZXNzOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZXtiYWNrZ3JvdW5kOiAjMzM3YWI3O2JvcmRlci1jb2xvcjojMzM3YWI3IH1cclxuLmFuLWhlYWRlcnt0b3A6MDtoZWlnaHQ6IDUwcHg7cGFkZGluZzogMH1cclxuLmFuLWxvZ28taGVhZGluZ3tmb250LXNpemU6IDE1cHg7cGFkZGluZy1sZWZ0OjMwcHggfVxyXG4uYnRuZm9vdGVyeyAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGO1xyXG4gIHBhZGRpbmc6IDE0cHg7Ym94LXNoYWRvdzogMCAwIDIwcHggMnB4IHJnYmEoMTUzLCAxNTMsIDE1MywgMC40KX1cclxuICAuYnRuZm9vdGVyIHB7cGFkZGluZzogMDttYXJnaW46IDB9XHJcblxyXG5cclxuICAubG9naW5ib3ggeyBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBtYXJnaW4tdG9wOiAtMTAlO1xyXG4gIH1cclxuICAubG9naW5ib3ggLmNoZWNrYm94Y3VzdG9te3BhZGRpbmctbGVmdDozMHB4IH1cclxuICAubG9naW5ib3ggLnRvcGtpZHtwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IC03MHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLmxvZ2luYm94IC5ib3R0b21raWR7cG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBib3R0b206IC00MHB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGxlZnQ6IC03MHB4O1xyXG4gICAgICB9XHJcblxyXG4gICAgLmxvZ2luYm94IC5ib3R0b21raWQgaW1neyAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgICBtYXJnaW46IDAgYXV0bzt9XHJcblxyXG4gICAgLmxvZ2luYm94IC50b3BraWQgaW1neyAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgICBtYXJnaW46IDAgYXV0bzt9XHJcblxyXG4gICAgICAuZm9ybS1maWVsZHNldHtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgICB9XHJcblxyXG4vKiAuZm9ybS1jYXJke2JhY2tncm91bmQ6IHVybCgnLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9iYWNrLnBuZycpOyAqL1xyXG5cclxuLyogfSAqL1xyXG4ubG9naW4taGVhZCB7XHJcbiAgYmFja2dyb3VuZDogI2ZmZmFmMztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmxvZ2luLWhlYWQgaW1nIHtcclxuICB3aWR0aDogMjEwcHg7XHJcbn1cclxuIFxyXG5AbWVkaWEgKG1heC13aWR0aDo5OTJweCkge1xyXG4gIC5kaXYxMiBpbWcge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbn0gXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA2NDBweClcclxue1xyXG4uYW4tdG9wYmFyLWxlZnQtcGFydCB7XHJcbiAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgIH1cclxuLmZvcm0tY2FyZHt3aWR0aDogOTAlfVxyXG4uYW4taGVhZGVye2ZsZXgtZGlyZWN0aW9uOiByb3d9XHJcbi5hbi1sb2dvLWhlYWRpbmd7XHJcbiAgcGFkZGluZzogMFxyXG59XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgLmxvZ2luLWhlYWQgaW1nIHtcclxuICAgIHdpZHRoOiA4MCU7XHJcbiAgfVxyXG59XHJcblxyXG4uY2FyZC1wcmljaW5nIHtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICBib3JkZXI6IDNweCBzb2xpZCB0cmFuc3BhcmVudDtcclxufVxyXG4uY2FyZC1wcmljaW5nIC5saXN0LXVuc3R5bGVkIGxpIHtcclxuICAgIHBhZGRpbmc6IC41cmVtIDA7XHJcbiAgICBjb2xvcjogIzZjNzU3ZDtcclxufVxyXG5cclxuXHJcbi5iZy1wcmltYXJ5e2JhY2tncm91bmQ6IzU4QTdGRSFpbXBvcnRhbnQ7Zm9udC1zaXplOiAxNHB4O31cclxuXHJcbi5jYXJkLXByaWNpbmc6aG92ZXIge1xyXG4gICAgei1pbmRleDogMTtcclxuICAgIGJvcmRlcjogM3B4IHNvbGlkICM1OEE3RkU7XHJcbiAgICBib3gtc2hhZG93OjAgMC41cmVtIDFyZW0gcmdiYSgwLCAwLCAwLCAwLjE1KSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4udXBsb2FkLWJ0bi13cmFwcGVyeyB0b3A6IDEwcHggIWltcG9ydGFudH1cclxuXHJcbi5jaGVja2JveF9hZGRyZXNzXHJcbntcclxuaGVpZ2h0OiAzNHB4O1xyXG53aWR0aDogMjBweDtcclxubWFyZ2luLWxlZnQ6IDBweDtcclxubWFyZ2luLXRvcDogLThweDtcclxufVxyXG5cclxuLmluZm8taWNvbntcclxuICAgIG1hcmdpbi1sZWZ0OiAyNjRweDtcclxuICAgIGZvbnQtc2l6ZTogMjBweDsgXHJcbiAgICBjb2xvcjogIzM4MzMzMztcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/auth/components/agency-registration/agency-registration.component.html":
/*!****************************************************************************************!*\
  !*** ./src/app/auth/components/agency-registration/agency-registration.component.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-head\">\n  <img src=\"assets/img/logo-big-new.png\" alt=\"\">\n  <br>\n  <div style=\"margin-top: 15px;\" *ngIf=\"!showMessage\">\n    <h3>Pricing Plan (Includes one month free trial)</h3>\n    <h3 style=\"margin-bottom: 0rem;\">Login instructions and onboarding info emailed after registration</h3>\n  </div>\n</div>\n\n<div class=\"bgblue\">\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col-lg-8\" *ngIf=\"showMessage\">\n        <div class=\"div12\">\n          <img src=\"assets/img/bg.png\" alt=\"\">\n        </div>\n      </div>\n\n      <div class=\"pricing card-deck card_section mt-20\" *ngIf=\"!showMessage\">\n        <div class=\"row\">\n          <div class=\"col-lg-3\" *ngFor=\"let plan of pricingPlanList\">\n            <div class=\"card card-pricing text-center px-3 mb-4\">\n              <span\n                class=\"h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm\">{{plan.planName}}</span>\n              <div class=\"bg-transparent card-header pt-4 border-0\">\n                <h1 class=\"h1 font-weight-normal text-primary text-center mb-0\" data-pricing-value=\"1200\">$<span\n                    class=\"price\">{{plan.planPrice}}</span>\n                  <span class=\"h6 text-muted ml-2\" *ngIf=\"plan.frequency == 'month'\">/ per month</span>\n                  <span class=\"h6 text-muted ml-2\" *ngIf=\"plan.frequency == 'year'\">/ per year</span>\n                </h1>\n              </div>\n              <div class=\"card-body pt-0\">\n                <ul class=\"list-unstyled mb-4\">\n                  <li>Up to {{plan.numberofUsers}} users</li>\n                  <li class=\"listing\">{{plan.remark}}</li>\n                </ul>\n                <button type=\"button\" data-toggle=\"modal\" data-target=\".addagency\" (click)=\"getPlanDetails(plan)\"\n                  class=\"btn btn-primary mb-3\">Select Plan</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <!-- Success Message -->\n      <div class=\"col-lg-4\" *ngIf=\"showMessage\">\n        <div class=\"loginbox\">\n          <div class=\"form-card\">\n            <div class=\"title\">\n              <h3 style=\"color: #FF6C6C\">Great!!</h3>\n            </div>\n            <fieldset class=\"form-fieldset\">\n              <!-- <div class=\"form-element form-input\"> -->\n              <p style=\"color:#58A7FE\"> Please check your registerd email to create password and view setup info!</p>\n              <!-- </div> -->\n              <!-- <a [routerLink]=\"['/']\" style=\"cursor:pointer\">Go To Login</a> -->\n            </fieldset>\n          </div>\n        </div>\n      </div>\n    </div>\n\n  </div>\n</div>\n\n<div class=\"modal fade addagency\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Agency Registration</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"modal-body\">\n          <form [formGroup]=\"agencyForm\">\n            <div class=\"form-fields\">\n              <div class=\"row mb-10 \">\n                <div class=\"col-lg-12\">\n                  <div class=\"form-group\">\n                    <label for=\"\">Agency Name*</label>\n                    <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"agencyname\"\n                      placeholder=\"Agency Name\">\n                    <div *ngIf=\"f.agencyname.invalid && (f.agencyname.dirty || f.agencyname.touched)\"\n                      class=\"text-left errormsg\">\n                      <span *ngIf=\"f.agencyname.errors.required\">\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter agency name</span>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"row mb-10\">\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label for=\"\">Agency Email*</label>\n                    <input type=\"email \" class=\"form-control\" *ngIf=\"addMode\" id=\"\" aria-describedby=\"\"\n                      formControlName=\"email\" placeholder=\"Email Address\">\n                    <input type=\"email \" class=\"form-control\" *ngIf=\"!addMode\" id=\"\" disabled aria-describedby=\"\"\n                      formControlName=\"email\" placeholder=\"Email Address\">\n                    <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"text-left errormsg\">\n                      <span *ngIf=\"f.email.errors.required\">\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter email</span>\n                      </span>\n                      <span *ngIf=\"f.email.errors.pattern\">\n                        <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter valid email\n                          address</span>\n                      </span>\n                    </div>\n\n                  </div>\n                </div>\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label for=\"\">Agency Phone*</label>\n                    <input type=\"text\" maxlength=\"10\" (keypress)=\"commonService.allowOnlyNumber($event)\"\n                      class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"phone\" placeholder=\"phone\">\n                    <div *ngIf=\"f.phone.invalid && (f.phone.dirty || f.phone.touched)\" class=\"text-left errormsg\">\n                      <span *ngIf=\"f.phone.errors.required\">\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter phone number</span>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"row mb-10\">\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label for=\"\">First Name*</label>\n                    <input type=\"text \" (keypress)=\"commonService.allowAlphabetOnly($event)\" class=\"form-control\" id=\"\"\n                      aria-describedby=\"\" formControlName=\"firstname\" placeholder=\"First Name\">\n                    <div *ngIf=\"f.firstname.invalid && (f.firstname.dirty || f.firstname.touched)\"\n                      class=\"text-left errormsg\">\n                      <span *ngIf=\"f.firstname.errors.required\">\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter first name</span>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label for=\"\">Last Name*</label>\n                    <input type=\"text\" class=\"form-control\" (keypress)=\"commonService.allowAlphabetOnly($event)\" id=\"\"\n                      aria-describedby=\"\" formControlName=\"lastname\" placeholder=\"Last Name\">\n                    <div *ngIf=\"f.lastname.invalid && (f.lastname.dirty || f.lastname.touched)\"\n                      class=\"text-left errormsg\">\n                      <span *ngIf=\"f.lastname.errors.required\">\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter last name</span>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n              <div class=\"row mb-10\">\n                <div class=\"col-lg-12\">\n                  <div class=\"form-group\">\n                    <label for=\"\">Address*</label>\n                    <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"address\"\n                      placeholder=\"Address\">\n                    <div *ngIf=\"f.address.invalid && (f.address.dirty || f.address.touched)\" class=\"text-left errormsg\">\n                      <span *ngIf=\"f.address.errors.required\">\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter address</span>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"row mb-10\">\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label for=\"exampleInputEmail1\">Country*</label>\n                    <select class=\"form-control\" placeholder=\"Country\" formControlName=\"country\"\n                      id=\"exampleFormControlSelect1\" (change)=\"getStatesList();clearStateCity()\">\n                      <option value=\"\">Select Country</option>\n                      <option *ngFor=\"let countries of countryList\" [value]=\"countries.id\">{{countries.countryName}}\n                      </option>\n                    </select>\n                    <div *ngIf=\"f.country.invalid && (f.country.dirty || f.country.touched)\" class=\"text-left errormsg\">\n                      <span *ngIf=\"f.country.errors.required\">\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select country</span>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label for=\"exampleFormControlSelect1\">State*</label>\n                    <select class=\"form-control\" placeholder=\"State\" formControlName=\"state\"\n                      id=\"exampleFormControlSelect1\" (change)=\"getCitiesList();clearCity()\">\n                      <option value=\"\">Select State</option>\n                      <option *ngFor=\"let states of stateList\" [value]=\"states.id\">{{states.stateName}}</option>\n                    </select>\n                    <div *ngIf=\"f.state.invalid && (f.state.dirty || f.state.touched)\" class=\"text-left errormsg\">\n                      <span *ngIf=\"f.state.errors.required\">\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select state</span>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"row mb-10\">\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label for=\"\">City*</label>\n                    <select class=\"form-control\" placeholder=\"City\" formControlName=\"city\"\n                      id=\"exampleFormControlSelect1\">\n                      <option value=\"\">Select City</option>\n                      <option *ngFor=\"let cities of cityList\" [value]=\"cities.id\">{{cities.cityName}}</option>\n                    </select>\n                    <div *ngIf=\"f.city.invalid && (f.city.dirty || f.city.touched)\" class=\"text-left errormsg\">\n                      <span *ngIf=\"f.city.errors.required\">\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select city</span>\n                      </span>\n                    </div>\n                  </div>\n                </div>\n                <div class=\"col-lg-6\">\n                  <div class=\"form-group\">\n                    <label for=\"\">Zip Code</label>\n                    <input type=\"text \" maxlength=\"6\" class=\"form-control\" id=\"\" formControlName=\"zipcode\"\n                      aria-describedby=\"\" placeholder=\"Enter Zip Code\">\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"row mb-10\">\n                <div class=\"col-lg-3\">\n                  <div class=\"form-group\">\n                    <a href=\"https://classroompanda.com/PrivacyPolicy\" target=\"_blank\">Privacy Policy - </a>\n                    <span><a href=\"https://classroompanda.com/EULA\" target=\"_blank\">EULA</a></span>\n                  </div>\n                </div>\n                <div class=\"col-lg-1\">\n                  <div class=\"form-group\">\n                    <input type=\"checkbox\" id=\"checkbox-in\" class=\"checkbox_address\" (change)=\"addAddress($event)\">\n                  </div>\n                </div>\n                <div class=\"col-lg-2\">\n                  <div class=\"form-group\">\n                    <p style=\"margin-left: -30px;\">I accept terms</p>\n                  </div>\n                </div>\n              </div>\n              \n              <div class=\"row mb-10\">\n                <div class=\"col-lg-12\">\n                  <button type=\"submit\" class=\"btn btn-info\" [disabled]=\"isActive\" (click)=\"promocodeForm()\" data-toggle=\"modal\"\n                    data-target=\".promocode\">Apply Promocode</button>\n\n                  <div *ngIf=\"isSuccessShow\" class=\"text-left errormsg\">\n                    <span *ngIf=\"isSuccessShow\" style=\"color: green;\">\n                      <span class=\"\">Promocode applied successfully</span>\n                      <p> Payable Amount {{price}}</p>\n                    </span>\n                  </div>\n                </div>\n\n              </div>\n\n            </div>\n          </form>\n        </div>\n        <div class=\"modal-footer\">\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"close\" data-dismiss=\"modal\">Back</button>\n          <button type=\"button\" class=\"btn btn-primary\" [disabled]=\"isActive\" (click)=\"openCheckout()\">Add Payment Info</button>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- last  -->\n</div>\n\n\n\n\n<div class=\"modal fade promocode\" id=\"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkoutLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"checkoutLabel\">Apply Promocode</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"promoForm\">\n          <div class=\"row mb-20 mt-20\">\n            <div class=\"col-lg-12\">\n              <div class=\"form-group\">\n                <label for=\"\">Promocode*</label>\n                <input type=\"text \" class=\"form-control\" [readOnly]=\"isSuccessShow\" id=\"\" aria-describedby=\"\"\n                  formControlName=\"promocodename\" placeholder=\"Enter Promocode here\">\n                <div *ngIf=\"p.promocodename.invalid && (p.promocodename.dirty || p.promocodename.touched)\"\n                  class=\"text-left errormsg\">\n                  <span *ngIf=\"p.promocodename.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter promocodename</span>\n                  </span>\n                </div>\n                <div *ngIf=\"isFailShow\" class=\"text-left errormsg\">\n                  <span *ngIf=\"isFailShow\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter a valid Promocode</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"close\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" [disabled]=\"isSuccessShow\" class=\"btn btn-primary\"\n          (click)=\"checkPromoCode()\">Apply</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n\n<app-confirm-box></app-confirm-box>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/auth/components/agency-registration/agency-registration.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/auth/components/agency-registration/agency-registration.component.ts ***!
  \**************************************************************************************/
/*! exports provided: AgencyRegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgencyRegistrationComponent", function() { return AgencyRegistrationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/services/auth-api-service/auth-api.service */ "./src/app/auth/shared/services/auth-api-service/auth-api.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/auth/shared/constant.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var src_app_shared_constdata__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/shared/constdata */ "./src/app/shared/constdata.ts");
/* harmony import */ var src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/layout/parent/shared/constant */ "./src/app/layout/parent/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var AgencyRegistrationComponent = /** @class */ (function () {
    function AgencyRegistrationComponent(apiService, error, confirmationService, spinner, notification, datepipe, commonService, fb, route, renderer) {
        this.apiService = apiService;
        this.error = error;
        this.confirmationService = confirmationService;
        this.spinner = spinner;
        this.notification = notification;
        this.datepipe = datepipe;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.renderer = renderer;
        this.emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
        this.loader = true;
        this.flag = false;
        this.pricingPlanList = [];
        this.planId = 0;
        this.planPrice = 0;
        this.price = 0;
        this.agencyVM = {};
        this.status = 1;
        this.addMode = true;
        this.isSuccessShow = false;
        this.isFailShow = false;
        this.isActive = true;
    }
    AgencyRegistrationComponent.prototype.ngOnInit = function () {
        this.getAllPricingPlan();
        this.createAgencyForm();
        this.getAllCountries();
        this.createPromoForm();
        this.short = this.datepipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
    };
    AgencyRegistrationComponent.prototype.getAllPricingPlan = function () {
        var _this = this;
        this.spinner.show();
        this.pricingPlanList = [];
        var req = {
            'limit': 0,
            'page': 0
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["AuthAPIURls"].GetAllPricingPlanDetails, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.pricingPlanList = res.body.data;
                _this.showMessage = false;
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
    AgencyRegistrationComponent.prototype.getPlanDetails = function (plan) {
        this.createAgencyForm();
        this.planId = plan.id;
        this.planPrice = plan.planPrice;
        this.price = plan.planPrice;
        this.agencyVM = {};
        this.addMode = true;
        this.status = 1;
        this.isFailShow = false;
        this.isSuccessShow = false;
    };
    // Agency Registration
    AgencyRegistrationComponent.prototype.createAgencyForm = function () {
        this.agencyForm = this.fb.group({
            agencyname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            firstname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.emailPattern)]],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            address: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            city: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            state: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            zipcode: [''],
            country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    Object.defineProperty(AgencyRegistrationComponent.prototype, "f", {
        get: function () { return this.agencyForm.controls; },
        enumerable: true,
        configurable: true
    });
    AgencyRegistrationComponent.prototype.openCheckout = function () {
        var _this = this;
        if (this.agencyForm.valid) {
            var amounttopay = this.price;
            var handler_1 = window.StripeCheckout.configure({
                key: src_app_shared_constdata__WEBPACK_IMPORTED_MODULE_11__["AdminStripKey"].publishableKey,
                locale: 'auto',
                token: function (token) {
                    _this.spinner.show();
                    console.log(token);
                    var model = {
                        'agencyID': 0,
                        'SourceToken': token.id,
                        'CreatedBy': 0,
                        'IsOffline': false,
                        'PlanID': _this.planId,
                        'Amount': _this.price,
                        'IsNew': _this.isSuccessShow,
                        'Id': 0,
                        'AgencyName': _this.agencyForm.value.agencyname,
                        'EmailId': _this.agencyForm.value.email,
                        'Mobile': _this.agencyForm.value.phone,
                        'OwnerFirstName': _this.agencyForm.value.firstname,
                        'OwnerLastName': _this.agencyForm.value.lastname,
                        'StateId': _this.agencyForm.value.state,
                        'CityId': _this.agencyForm.value.city,
                        'PostalCode': _this.agencyForm.value.zipcode,
                        'Address': _this.agencyForm.value.address,
                        'CountryId': _this.agencyForm.value.country,
                        'status': _this.status
                    };
                    console.log(model);
                    _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["AuthAPIURls"].AgencyRegistration, model, null).subscribe(function (result) {
                        if (result.body.statusCode === 200) {
                            _this.showMessage = true;
                            _this.spinner.hide();
                            _this.notification.success({ message: 'Registration done successfully!', title: '' });
                            $('.addagency').modal('hide');
                            console.log('data', result.body.data);
                        }
                        else if (result.body.statusCode === 986) {
                            _this.showMessage = false;
                            _this.notification.warning({ message: 'This email Address already exist!', title: '' });
                            _this.spinner.hide();
                        }
                        else {
                            _this.showMessage = false;
                            _this.spinner.hide();
                            _this.error.unknownError();
                            console.log('err');
                        }
                    }, function (err) {
                        _this.error.commonError(err);
                        _this.spinner.hide();
                    });
                }
            });
            handler_1.open({
                name: 'Classroom Panda',
                description: 'Child Day Care',
                amount: amounttopay * 100,
                email: this.agencyForm.value.email,
                panelLabel: 'Subscribe'
            });
            this.globalListener = this.renderer.listenGlobal('window', 'popstate', function () {
                handler_1.close();
            });
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.agencyForm);
        }
    };
    // Get City State Country List
    AgencyRegistrationComponent.prototype.getAllCountries = function () {
        var _this = this;
        this.countryList = [];
        var req = {
            'AgencyID': 4
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["AuthAPIURls"].GetAllCountry, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.countryList = res.body.data;
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
    AgencyRegistrationComponent.prototype.getStatesList = function () {
        var _this = this;
        this.spinner.show();
        this.stateList = [];
        this.cityList = [];
        var req = {
            'CountryId': this.agencyForm.value.country,
            'AgencyID': 4
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["AuthAPIURls"].GetAllStates, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.stateList = res.body.data;
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
    AgencyRegistrationComponent.prototype.getCitiesList = function () {
        var _this = this;
        this.spinner.show();
        this.cityList = [];
        var req = {
            'StateId': this.agencyForm.value.state,
            'AgencyID': 4
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["AuthAPIURls"].GetAllCities, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.cityList = res.body.data;
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
    AgencyRegistrationComponent.prototype.clearStateCity = function () {
        this.agencyForm.controls['state'].setValue('');
        this.agencyForm.controls['city'].setValue('');
    };
    AgencyRegistrationComponent.prototype.clearCity = function () {
        this.agencyForm.controls['city'].setValue('');
    };
    // Promocode
    AgencyRegistrationComponent.prototype.createPromoForm = function () {
        this.promoForm = this.fb.group({
            promocodename: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    };
    Object.defineProperty(AgencyRegistrationComponent.prototype, "p", {
        get: function () { return this.promoForm.controls; },
        enumerable: true,
        configurable: true
    });
    AgencyRegistrationComponent.prototype.promocodeForm = function () {
        this.isSuccessShow = false;
        this.isFailShow = false;
        this.price = this.planPrice;
        this.createPromoForm();
    };
    AgencyRegistrationComponent.prototype.checkPromoCode = function () {
        var _this = this;
        var req = {
            'Id': 0,
            'CouponName': this.promoForm.value.promocodename,
            'Amount': this.price
        };
        this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_12__["ParentAPIURLs"].CheckCoupon, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.isSuccess === true) {
                    $('.promocode').modal('hide');
                    _this.price = res.body.amount;
                    _this.isSuccessShow = true;
                    _this.isFailShow = false;
                }
                else {
                    _this.isSuccessShow = false;
                    _this.isFailShow = true;
                }
                _this.spinner.hide();
            }
            else {
                _this.isSuccessShow = false;
                _this.isFailShow = true;
                _this.spinner.hide();
                _this.error.unknownError();
            }
        }, function (err) {
            _this.isSuccessShow = false;
            _this.isFailShow = true;
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    AgencyRegistrationComponent.prototype.close = function () {
        debugger;
        this.isFailShow = false;
        this.isSuccessShow = false;
    };
    AgencyRegistrationComponent.prototype.addAddress = function (event) {
        debugger;
        if (event.target.checked === true) {
            this.isActive = false;
        }
        else {
            this.isActive = true;
        }
        // if (this.addChildForm.value.addressasparent === true) {
        //   this.addChildForm.get('address').setValue(this.parentAddress);
        //   this.addChildForm.controls['address'].disable();
        // } else {
        //   this.addChildForm.get('address').setValue('');
        //   this.addChildForm.controls['address'].enable();
        // }
    };
    AgencyRegistrationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-agency-registration',
            template: __webpack_require__(/*! ./agency-registration.component.html */ "./src/app/auth/components/agency-registration/agency-registration.component.html"),
            styles: [__webpack_require__(/*! ./agency-registration.component.css */ "./src/app/auth/components/agency-registration/agency-registration.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_6__["AuthApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"], primeng_api__WEBPACK_IMPORTED_MODULE_10__["ConfirmationService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer"]])
    ], AgencyRegistrationComponent);
    return AgencyRegistrationComponent;
}());



/***/ }),

/***/ "./src/app/auth/components/create-password/create-password.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/auth/components/create-password/create-password.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* .bgblue{background: #58A7FE!important} */\r\nhtml, body{height: 100vh;}\r\n.pt-100{padding-top:30px }\r\n.bgblue h1{font-size: 30px;text-align: center;color: #FF6C6C;margin-bottom: 100px}\r\n.bgblue h1 span{color: #58A7FE;font-weight: 600}\r\n.bgblue {\r\n  background: #fffaf3;\r\n  height: auto;\r\n  /* display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center; */\r\n  padding-top: 80px;\r\n}\r\n.btn-success{\r\n    width: 100%;\r\n    padding: 12px 0;\r\n    border: 0;\r\n    background: #FF6C6C;\r\n    font-size: 18px;\r\n    border-radius: 0 0 10px 10px;\r\n}\r\n.login {\r\n  background: #FF6C6C;\r\n  font-size: 18px;\r\n  padding: 13px 35px;\r\n  color: #fff;\r\n}\r\n.forgot{font-size: 14px; color: #58A7FE;font-weight: 400}\r\n.m-30{margin: 30px 0;}\r\n.btn-success:not(:disabled):not(.disabled):active{background: #337ab7;border-color:#337ab7 }\r\n.an-header{top:0;height: 50px;padding: 0}\r\n.an-logo-heading{font-size: 15px;padding-left:30px }\r\n.btnfooter{    background: #FFFFFF;\r\n  padding: 14px;box-shadow: 0 0 20px 2px rgba(153, 153, 153, 0.4)}\r\n.btnfooter p{padding: 0;margin: 0}\r\n.loginbox { position: relative}\r\n.loginbox .checkboxcustom{padding-left:30px }\r\n.loginbox .topkid{position: absolute;\r\n    top: -70px;\r\n    text-align: center;\r\n    right: 0;\r\n    }\r\n.loginbox .bottomkid{position: absolute;\r\n      bottom: -40px;\r\n      text-align: center;\r\n      left: -70px;\r\n      }\r\n.loginbox .bottomkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.loginbox .topkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.form-fieldset{\r\n        padding: 20px;\r\n      }\r\n/* .form-card{background: url('../../../../assets/img/back.png'); */\r\n/* } */\r\n.login-head {\r\n  text-align: center;\r\n  background: #fffaf3;\r\n}\r\n.login-head img {\r\n  width: 210px;\r\n}\r\n@media (max-width:992px) {\r\n  .div12 img {\r\n    display: none;\r\n  }\r\n}\r\n@media (max-width: 640px)\r\n{\r\n.an-topbar-left-part {\r\n   background: #fff;\r\n   }\r\n.form-card{width: 90%}\r\n.an-header{flex-direction: row}\r\n.an-logo-heading{\r\n  padding: 0\r\n}\r\n}\r\n@media (max-width: 480px) {\r\n  .login-head img {\r\n    width: 80%;\r\n  }\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9jb21wb25lbnRzL2NyZWF0ZS1wYXNzd29yZC9jcmVhdGUtcGFzc3dvcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyQ0FBMkM7QUFDM0MsV0FBVyxhQUFhLENBQUM7QUFDekIsUUFBUSxpQkFBaUI7QUFDekIsV0FBVyxlQUFlLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLG9CQUFvQjtBQUNqRixnQkFBZ0IsY0FBYyxDQUFDLGdCQUFnQjtBQUMvQztFQUNFLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1o7Ozs0QkFHMEI7RUFDMUIsaUJBQWlCO0FBQ25CO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsZUFBZTtJQUNmLFNBQVM7SUFDVCxtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLDRCQUE0QjtBQUNoQztBQUNBO0VBQ0UsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsV0FBVztBQUNiO0FBRUEsUUFBUSxlQUFlLEVBQUUsY0FBYyxDQUFDLGdCQUFnQjtBQUN4RCxNQUFNLGNBQWMsQ0FBQztBQUVyQixrREFBa0QsbUJBQW1CLENBQUMscUJBQXFCO0FBQzNGLFdBQVcsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVO0FBQ3hDLGlCQUFpQixlQUFlLENBQUMsa0JBQWtCO0FBQ25ELGVBQWUsbUJBQW1CO0VBQ2hDLGFBQWEsQ0FBQyxpREFBaUQ7QUFDL0QsYUFBYSxVQUFVLENBQUMsU0FBUztBQUdqQyxZQUFZLGtCQUFrQjtBQUM5QiwwQkFBMEIsa0JBQWtCO0FBQzVDLGtCQUFrQixrQkFBa0I7SUFDbEMsVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1I7QUFFQSxxQkFBcUIsa0JBQWtCO01BQ3JDLGFBQWE7TUFDYixrQkFBa0I7TUFDbEIsV0FBVztNQUNYO0FBRUYsNkJBQTZCLGFBQWE7TUFDeEMsY0FBYyxDQUFDO0FBRWpCLDBCQUEwQixhQUFhO01BQ3JDLGNBQWMsQ0FBQztBQUVmO1FBQ0UsYUFBYTtNQUNmO0FBRU4sbUVBQW1FO0FBRW5FLE1BQU07QUFDTjtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUVBO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7QUFDRjtBQUNBOztBQUVBO0dBQ0csZ0JBQWdCO0dBQ2hCO0FBQ0gsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsbUJBQW1CO0FBQzlCO0VBQ0U7QUFDRjtBQUNBO0FBQ0E7RUFDRTtJQUNFLFVBQVU7RUFDWjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvYXV0aC9jb21wb25lbnRzL2NyZWF0ZS1wYXNzd29yZC9jcmVhdGUtcGFzc3dvcmQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC5iZ2JsdWV7YmFja2dyb3VuZDogIzU4QTdGRSFpbXBvcnRhbnR9ICovXHJcbmh0bWwsIGJvZHl7aGVpZ2h0OiAxMDB2aDt9XHJcbi5wdC0xMDB7cGFkZGluZy10b3A6MzBweCB9XHJcbi5iZ2JsdWUgaDF7Zm9udC1zaXplOiAzMHB4O3RleHQtYWxpZ246IGNlbnRlcjtjb2xvcjogI0ZGNkM2QzttYXJnaW4tYm90dG9tOiAxMDBweH1cclxuLmJnYmx1ZSBoMSBzcGFue2NvbG9yOiAjNThBN0ZFO2ZvbnQtd2VpZ2h0OiA2MDB9XHJcbi5iZ2JsdWUge1xyXG4gIGJhY2tncm91bmQ6ICNmZmZhZjM7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIC8qIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyAqL1xyXG4gIHBhZGRpbmctdG9wOiA4MHB4O1xyXG59XHJcbi5idG4tc3VjY2Vzc3tcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogMTJweCAwO1xyXG4gICAgYm9yZGVyOiAwO1xyXG4gICAgYmFja2dyb3VuZDogI0ZGNkM2QztcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDAgMCAxMHB4IDEwcHg7XHJcbn1cclxuLmxvZ2luIHtcclxuICBiYWNrZ3JvdW5kOiAjRkY2QzZDO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBwYWRkaW5nOiAxM3B4IDM1cHg7XHJcbiAgY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbi5mb3Jnb3R7Zm9udC1zaXplOiAxNHB4OyBjb2xvcjogIzU4QTdGRTtmb250LXdlaWdodDogNDAwfVxyXG4ubS0zMHttYXJnaW46IDMwcHggMDt9XHJcblxyXG4uYnRuLXN1Y2Nlc3M6bm90KDpkaXNhYmxlZCk6bm90KC5kaXNhYmxlZCk6YWN0aXZle2JhY2tncm91bmQ6ICMzMzdhYjc7Ym9yZGVyLWNvbG9yOiMzMzdhYjcgfVxyXG4uYW4taGVhZGVye3RvcDowO2hlaWdodDogNTBweDtwYWRkaW5nOiAwfVxyXG4uYW4tbG9nby1oZWFkaW5ne2ZvbnQtc2l6ZTogMTVweDtwYWRkaW5nLWxlZnQ6MzBweCB9XHJcbi5idG5mb290ZXJ7ICAgIGJhY2tncm91bmQ6ICNGRkZGRkY7XHJcbiAgcGFkZGluZzogMTRweDtib3gtc2hhZG93OiAwIDAgMjBweCAycHggcmdiYSgxNTMsIDE1MywgMTUzLCAwLjQpfVxyXG4gIC5idG5mb290ZXIgcHtwYWRkaW5nOiAwO21hcmdpbjogMH1cclxuXHJcblxyXG4gIC5sb2dpbmJveCB7IHBvc2l0aW9uOiByZWxhdGl2ZX1cclxuICAubG9naW5ib3ggLmNoZWNrYm94Y3VzdG9te3BhZGRpbmctbGVmdDozMHB4IH1cclxuICAubG9naW5ib3ggLnRvcGtpZHtwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IC03MHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLmxvZ2luYm94IC5ib3R0b21raWR7cG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICBib3R0b206IC00MHB4O1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGxlZnQ6IC03MHB4O1xyXG4gICAgICB9XHJcblxyXG4gICAgLmxvZ2luYm94IC5ib3R0b21raWQgaW1neyAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgICBtYXJnaW46IDAgYXV0bzt9XHJcblxyXG4gICAgLmxvZ2luYm94IC50b3BraWQgaW1neyAgICBoZWlnaHQ6IDEyMHB4O1xyXG4gICAgICBtYXJnaW46IDAgYXV0bzt9XHJcblxyXG4gICAgICAuZm9ybS1maWVsZHNldHtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgICB9XHJcblxyXG4vKiAuZm9ybS1jYXJke2JhY2tncm91bmQ6IHVybCgnLi4vLi4vLi4vLi4vYXNzZXRzL2ltZy9iYWNrLnBuZycpOyAqL1xyXG5cclxuLyogfSAqL1xyXG4ubG9naW4taGVhZCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQ6ICNmZmZhZjM7XHJcbn1cclxuLmxvZ2luLWhlYWQgaW1nIHtcclxuICB3aWR0aDogMjEwcHg7XHJcbn1cclxuIFxyXG5AbWVkaWEgKG1heC13aWR0aDo5OTJweCkge1xyXG4gIC5kaXYxMiBpbWcge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbn0gXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA2NDBweClcclxue1xyXG4uYW4tdG9wYmFyLWxlZnQtcGFydCB7XHJcbiAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgIH1cclxuLmZvcm0tY2FyZHt3aWR0aDogOTAlfVxyXG4uYW4taGVhZGVye2ZsZXgtZGlyZWN0aW9uOiByb3d9XHJcbi5hbi1sb2dvLWhlYWRpbmd7XHJcbiAgcGFkZGluZzogMFxyXG59XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgLmxvZ2luLWhlYWQgaW1nIHtcclxuICAgIHdpZHRoOiA4MCU7XHJcbiAgfVxyXG59Il19 */"

/***/ }),

/***/ "./src/app/auth/components/create-password/create-password.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/auth/components/create-password/create-password.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-head\">\r\n  <img src=\"assets/img/logo-big-new.png\" alt=\"\">\r\n</div>\r\n<div class=\"bgblue\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-8\">\r\n        <div class=\"div12\">\r\n          <img src=\"assets/img/bg.png\" alt=\"\">\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-lg-4\" *ngIf=\"!showMessage\">\r\n        <div class=\"loginbox\">\r\n          <form class=\"form-card\" [formGroup]=\"resetForm\">\r\n            <div class=\"title\">\r\n              <h3>CREATE NEW PASSWORD</h3>\r\n            </div>\r\n            <fieldset class=\"form-fieldset\">\r\n\r\n              <div class=\"form-element form-input\">\r\n                <input formControlName=\"newpassword\" class=\"form-element-field\" placeholder=\"Enter new password\"\r\n                  type=\"password\" autofocus />\r\n                <div class=\"form-element-bar\"></div>\r\n                <label class=\"form-element-label\" for=\"\">New Password</label>\r\n              </div>\r\n              <div *ngIf=\"f.newpassword.invalid && (f.newpassword.dirty || f.newpassword.touched)\"\r\n                class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.newpassword.errors.minlength\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Minimum 6 characters\r\n                    required</span>\r\n                </span>\r\n                <span *ngIf=\"f.newpassword.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter password</span>\r\n                </span>\r\n              </div>\r\n\r\n              <div class=\"form-element form-input\">\r\n                <input id=\"\" formControlName=\"confirmpassword\" class=\"form-element-field\"\r\n                  placeholder=\"Enter confirm password.\" type=\"password\" />\r\n                <div class=\"form-element-bar\"></div>\r\n                <label class=\"form-element-label\" for=\"\">Confirm Password</label>\r\n              </div>\r\n              <div *ngIf=\"f.confirmpassword.invalid && (f.confirmpassword.dirty || f.confirmpassword.touched)\"\r\n                class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.confirmpassword.errors.minlength\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Minimum 6 characters\r\n                    required</span>\r\n                </span>\r\n                <span *ngIf=\"f.confirmpassword.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter password</span>\r\n                </span>\r\n              </div>\r\n            </fieldset>\r\n            <button type=\"button\" [disabled]=\"!resetForm.valid\" (click)=\"verifyPassword()\"\r\n              class=\"btn btn-success\">Create new password</button>\r\n          </form>\r\n\r\n          <div class=\"topkid\">\r\n            <img src=\"assets/img/top.png\" alt=\"\">\r\n          </div>\r\n\r\n          <div class=\"bottomkid\">\r\n            <img src=\"assets/img/kids.png\" alt=\"\">\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!-- Success Message -->\r\n      <div class=\"col-lg-4\" *ngIf=\"showMessage\">\r\n        <div class=\"loginbox\">\r\n          <div class=\"form-card\">\r\n            <div class=\"title\">\r\n              <h3 style=\"color: #FF6C6C\">Great!!</h3>\r\n            </div>\r\n            <fieldset class=\"form-fieldset\">\r\n              <!-- <div class=\"form-element form-input\"> -->\r\n              <p style=\"color:#58A7FE\"> Password has been created successfully and sent to your registered email!</p>\r\n              <!-- </div> -->\r\n              <a [routerLink]=\"['/']\" style=\"cursor:pointer\">Go To Login</a>\r\n            </fieldset>\r\n          </div>\r\n\r\n\r\n\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/auth/components/create-password/create-password.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/auth/components/create-password/create-password.component.ts ***!
  \******************************************************************************/
/*! exports provided: CreatePasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatePasswordComponent", function() { return CreatePasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/services/auth-api-service/auth-api.service */ "./src/app/auth/shared/services/auth-api-service/auth-api.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/auth/shared/constant.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CreatePasswordComponent = /** @class */ (function () {
    function CreatePasswordComponent(apiService, error, spinner, notification, commonService, fb, route) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.id = this.route.snapshot.paramMap.get('id');
    }
    CreatePasswordComponent.prototype.ngOnInit = function () {
        this.createPassword();
    };
    CreatePasswordComponent.prototype.createPassword = function () {
        this.resetForm = this.fb.group({
            newpassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(6)]],
            confirmpassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(6)]],
        });
    };
    Object.defineProperty(CreatePasswordComponent.prototype, "f", {
        get: function () { return this.resetForm.controls; },
        enumerable: true,
        configurable: true
    });
    CreatePasswordComponent.prototype.verifyPassword = function () {
        var _this = this;
        this.spinner.show();
        if (this.resetForm.valid) {
            var newpwd = this.resetForm.value.newpassword;
            var curpwd = this.resetForm.value.confirmpassword;
            if (newpwd === curpwd) {
                var req = {
                    'UserId': this.id,
                    'NewPassword': newpwd
                };
                this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["AuthAPIURls"].CreatePassword, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.spinner.hide();
                        _this.notification.success({ message: 'Password created successfully', title: '' });
                        _this.showMessage = true;
                    }
                    else {
                        _this.showMessage = false;
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
                this.notification.warning({ message: 'Passowrd not match', title: '' });
            }
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.resetForm);
        }
    };
    CreatePasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-create-password',
            template: __webpack_require__(/*! ./create-password.component.html */ "./src/app/auth/components/create-password/create-password.component.html"),
            styles: [__webpack_require__(/*! ./create-password.component.css */ "./src/app/auth/components/create-password/create-password.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_6__["AuthApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]])
    ], CreatePasswordComponent);
    return CreatePasswordComponent;
}());



/***/ }),

/***/ "./src/app/auth/components/forgot-password/forgot-password.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/auth/components/forgot-password/forgot-password.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* .bgblue{background: #58A7FE!important} */\r\nhtml, body{height: 100vh;}\r\n.pt-100{padding-top:30px }\r\n.bgblue h1{font-size: 30px;text-align: center;color: #FF6C6C;margin-bottom: 100px}\r\n.bgblue h1 span{color: #58A7FE;font-weight: 600}\r\n.bgblue {\r\n  background: #fffaf3;\r\n  height: auto;\r\n  /* display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center; */\r\n  padding-top: 80px;\r\n}\r\n.btn-success{\r\n    width: 100%;\r\n    padding: 12px 0;\r\n    border: 0;\r\n    background: #FF6C6C;\r\n    font-size: 18px;\r\n    border-radius: 0 0 10px 10px;\r\n}\r\n.login {\r\n  background: #FF6C6C;\r\n  font-size: 18px;\r\n  padding: 13px 35px;\r\n  color: #fff;\r\n}\r\n.forgot{font-size: 14px; color: #58A7FE;font-weight: 400}\r\n.m-30{margin: 30px 0;}\r\n.btn-success:not(:disabled):not(.disabled):active{background: #337ab7;border-color:#337ab7 }\r\n.an-header{top:0;height: 50px;padding: 0}\r\n.an-logo-heading{font-size: 15px;padding-left:30px }\r\n.btnfooter{    background: #FFFFFF;\r\n  padding: 14px;box-shadow: 0 0 20px 2px rgba(153, 153, 153, 0.4)}\r\n.btnfooter p{padding: 0;margin: 0}\r\n.loginbox { position: relative}\r\n.loginbox .checkboxcustom{padding-left:30px }\r\n.loginbox .topkid{position: absolute;\r\n    top: -70px;\r\n    text-align: center;\r\n    right: 0;\r\n    }\r\n.loginbox .bottomkid{position: absolute;\r\n      bottom: -40px;\r\n      text-align: center;\r\n      left: -70px;\r\n      }\r\n.loginbox .bottomkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.loginbox .topkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.form-fieldset{\r\n        padding: 20px;\r\n      }\r\n/* .form-card{background: url('../../../../assets/img/back.png'); */\r\n/* } */\r\n.login-head {\r\n  text-align: center;\r\n}\r\n.login-head img {\r\n  width: 210px;\r\n}\r\n@media (max-width:992px) {\r\n  .div12 img {\r\n    display: none;\r\n  }\r\n}\r\n@media (max-width: 640px)\r\n{\r\n.an-topbar-left-part {\r\n   background: #fff;\r\n   }\r\n.form-card{width: 90%}\r\n.an-header{flex-direction: row}\r\n.an-logo-heading{\r\n  padding: 0\r\n}\r\n}\r\n@media (max-width: 480px) {\r\n  .login-head img {\r\n    width: 80%;\r\n  }\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9jb21wb25lbnRzL2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyQ0FBMkM7QUFDM0MsV0FBVyxhQUFhLENBQUM7QUFDekIsUUFBUSxpQkFBaUI7QUFDekIsV0FBVyxlQUFlLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLG9CQUFvQjtBQUNqRixnQkFBZ0IsY0FBYyxDQUFDLGdCQUFnQjtBQUMvQztFQUNFLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1o7Ozs0QkFHMEI7RUFDMUIsaUJBQWlCO0FBQ25CO0FBQ0E7SUFDSSxXQUFXO0lBQ1gsZUFBZTtJQUNmLFNBQVM7SUFDVCxtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLDRCQUE0QjtBQUNoQztBQUNBO0VBQ0UsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsV0FBVztBQUNiO0FBRUEsUUFBUSxlQUFlLEVBQUUsY0FBYyxDQUFDLGdCQUFnQjtBQUN4RCxNQUFNLGNBQWMsQ0FBQztBQUVyQixrREFBa0QsbUJBQW1CLENBQUMscUJBQXFCO0FBQzNGLFdBQVcsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVO0FBQ3hDLGlCQUFpQixlQUFlLENBQUMsa0JBQWtCO0FBQ25ELGVBQWUsbUJBQW1CO0VBQ2hDLGFBQWEsQ0FBQyxpREFBaUQ7QUFDL0QsYUFBYSxVQUFVLENBQUMsU0FBUztBQUdqQyxZQUFZLGtCQUFrQjtBQUM5QiwwQkFBMEIsa0JBQWtCO0FBQzVDLGtCQUFrQixrQkFBa0I7SUFDbEMsVUFBVTtJQUNWLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1I7QUFFQSxxQkFBcUIsa0JBQWtCO01BQ3JDLGFBQWE7TUFDYixrQkFBa0I7TUFDbEIsV0FBVztNQUNYO0FBRUYsNkJBQTZCLGFBQWE7TUFDeEMsY0FBYyxDQUFDO0FBRWpCLDBCQUEwQixhQUFhO01BQ3JDLGNBQWMsQ0FBQztBQUVmO1FBQ0UsYUFBYTtNQUNmO0FBRU4sbUVBQW1FO0FBRW5FLE1BQU07QUFDTjtFQUNFLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjtBQUNGO0FBQ0E7O0FBRUE7R0FDRyxnQkFBZ0I7R0FDaEI7QUFDSCxXQUFXLFVBQVU7QUFDckIsV0FBVyxtQkFBbUI7QUFDOUI7RUFDRTtBQUNGO0FBQ0E7QUFDQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hdXRoL2NvbXBvbmVudHMvZm9yZ290LXBhc3N3b3JkL2ZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLmJnYmx1ZXtiYWNrZ3JvdW5kOiAjNThBN0ZFIWltcG9ydGFudH0gKi9cclxuaHRtbCwgYm9keXtoZWlnaHQ6IDEwMHZoO31cclxuLnB0LTEwMHtwYWRkaW5nLXRvcDozMHB4IH1cclxuLmJnYmx1ZSBoMXtmb250LXNpemU6IDMwcHg7dGV4dC1hbGlnbjogY2VudGVyO2NvbG9yOiAjRkY2QzZDO21hcmdpbi1ib3R0b206IDEwMHB4fVxyXG4uYmdibHVlIGgxIHNwYW57Y29sb3I6ICM1OEE3RkU7Zm9udC13ZWlnaHQ6IDYwMH1cclxuLmJnYmx1ZSB7XHJcbiAgYmFja2dyb3VuZDogI2ZmZmFmMztcclxuICBoZWlnaHQ6IGF1dG87XHJcbiAgLyogZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7ICovXHJcbiAgcGFkZGluZy10b3A6IDgwcHg7XHJcbn1cclxuLmJ0bi1zdWNjZXNze1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAxMnB4IDA7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRkY2QzZDO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcclxufVxyXG4ubG9naW4ge1xyXG4gIGJhY2tncm91bmQ6ICNGRjZDNkM7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIHBhZGRpbmc6IDEzcHggMzVweDtcclxuICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLmZvcmdvdHtmb250LXNpemU6IDE0cHg7IGNvbG9yOiAjNThBN0ZFO2ZvbnQtd2VpZ2h0OiA0MDB9XHJcbi5tLTMwe21hcmdpbjogMzBweCAwO31cclxuXHJcbi5idG4tc3VjY2Vzczpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmV7YmFja2dyb3VuZDogIzMzN2FiNztib3JkZXItY29sb3I6IzMzN2FiNyB9XHJcbi5hbi1oZWFkZXJ7dG9wOjA7aGVpZ2h0OiA1MHB4O3BhZGRpbmc6IDB9XHJcbi5hbi1sb2dvLWhlYWRpbmd7Zm9udC1zaXplOiAxNXB4O3BhZGRpbmctbGVmdDozMHB4IH1cclxuLmJ0bmZvb3RlcnsgICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcclxuICBwYWRkaW5nOiAxNHB4O2JveC1zaGFkb3c6IDAgMCAyMHB4IDJweCByZ2JhKDE1MywgMTUzLCAxNTMsIDAuNCl9XHJcbiAgLmJ0bmZvb3RlciBwe3BhZGRpbmc6IDA7bWFyZ2luOiAwfVxyXG5cclxuXHJcbiAgLmxvZ2luYm94IHsgcG9zaXRpb246IHJlbGF0aXZlfVxyXG4gIC5sb2dpbmJveCAuY2hlY2tib3hjdXN0b217cGFkZGluZy1sZWZ0OjMwcHggfVxyXG4gIC5sb2dpbmJveCAudG9wa2lke3Bvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogLTcwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICByaWdodDogMDtcclxuICAgIH1cclxuXHJcbiAgICAubG9naW5ib3ggLmJvdHRvbWtpZHtwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgIGJvdHRvbTogLTQwcHg7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgbGVmdDogLTcwcHg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAubG9naW5ib3ggLmJvdHRvbWtpZCBpbWd7ICAgIGhlaWdodDogMTIwcHg7XHJcbiAgICAgIG1hcmdpbjogMCBhdXRvO31cclxuXHJcbiAgICAubG9naW5ib3ggLnRvcGtpZCBpbWd7ICAgIGhlaWdodDogMTIwcHg7XHJcbiAgICAgIG1hcmdpbjogMCBhdXRvO31cclxuXHJcbiAgICAgIC5mb3JtLWZpZWxkc2V0e1xyXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XHJcbiAgICAgIH1cclxuXHJcbi8qIC5mb3JtLWNhcmR7YmFja2dyb3VuZDogdXJsKCcuLi8uLi8uLi8uLi9hc3NldHMvaW1nL2JhY2sucG5nJyk7ICovXHJcblxyXG4vKiB9ICovXHJcbi5sb2dpbi1oZWFkIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuLmxvZ2luLWhlYWQgaW1nIHtcclxuICB3aWR0aDogMjEwcHg7XHJcbn1cclxuIFxyXG5AbWVkaWEgKG1heC13aWR0aDo5OTJweCkge1xyXG4gIC5kaXYxMiBpbWcge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbn0gXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA2NDBweClcclxue1xyXG4uYW4tdG9wYmFyLWxlZnQtcGFydCB7XHJcbiAgIGJhY2tncm91bmQ6ICNmZmY7XHJcbiAgIH1cclxuLmZvcm0tY2FyZHt3aWR0aDogOTAlfVxyXG4uYW4taGVhZGVye2ZsZXgtZGlyZWN0aW9uOiByb3d9XHJcbi5hbi1sb2dvLWhlYWRpbmd7XHJcbiAgcGFkZGluZzogMFxyXG59XHJcbn1cclxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgLmxvZ2luLWhlYWQgaW1nIHtcclxuICAgIHdpZHRoOiA4MCU7XHJcbiAgfVxyXG59Il19 */"

/***/ }),

/***/ "./src/app/auth/components/forgot-password/forgot-password.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/auth/components/forgot-password/forgot-password.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-head\">\r\n    <img src=\"assets/img/logo-big-new.png\" alt=\"\">\r\n  </div>\r\n  <div class=\"bgblue\">\r\n  <!-- <h1>Day<span>Care</span></h1> -->\r\n \r\n<div class=\"container\">\r\n\r\n<div class=\"row\">\r\n    <div class=\"col-lg-8\">\r\n        <div class=\"div12\">\r\n            <img src=\"assets/img/bg.png\" alt=\"\">\r\n          </div>\r\n    </div>\r\n<div class=\"col-lg-4\" *ngIf=\"!showMessage\">\r\n    <div class=\"loginbox\">\r\n      <form class=\"form-card\" [formGroup]=\"forgotPassword\" >\r\n        <div class=\"title\">\r\n          <h3>ENTER YOUR USERNAME</h3>\r\n        </div>\r\n        <fieldset class=\"form-fieldset\">\r\n          <div class=\"form-element form-input\">\r\n            <input   formControlName=\"email\" class=\"form-element-field\" placeholder=\"Username or Email or Phone number\"\r\n             type=\"input\"  autofocus/>\r\n            <div class=\"form-element-bar\"></div>\r\n            <label class=\"form-element-label\" for=\"field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9\">Username</label>\r\n          </div>\r\n          <div *ngIf=\"forgotPassword.controls.email.invalid && (forgotPassword.controls.email.dirty || forgotPassword.controls.email.touched)\" class=\"text-left errormsg\">\r\n            <span *ngIf=\"forgotPassword.controls.email.errors.pattern && !forgotPassword.controls.email.errors.maxlength\">\r\n                <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Please enter valid email address</span> \r\n            </span>\r\n            <span *ngIf=\"forgotPassword.controls.email.errors.maxlength\">\r\n              <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Cannot enter more then 100 characters</span> \r\n          </span>\r\n            <span *ngIf=\"forgotPassword.controls.email.errors.required\">\r\n              <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Please enter email address</span> \r\n          </span>\r\n        </div> \r\n        <div class=\"text-left errormsg\">\r\n            <span *ngIf=\"invalidEmail\">\r\n                <i class=\"fa fa-exclamation-circle errtext\" aria-hidden=\"true\"></i> <span class=\"errtext\"> Oops! Email address is incorrect</span>\r\n            </span>\r\n        </div>\r\n        </fieldset>\r\n        <button type=\"button\"  [disabled]=\"!forgotPassword.valid\" (click)=\"forgetPassword()\" class=\"btn btn-success\" >Send new password</button>\r\n      \r\n      </form>\r\n       </div>\r\n\r\n  </div>\r\n  <!-- Success Message -->\r\n  <div class=\"col-lg-4\" *ngIf=\"showMessage\">\r\n  <div class=\"loginbox\">\r\n    <div class=\"form-card\">\r\n        <div class=\"title\">\r\n            <h3 style=\"color: #FF6C6C\">Great!!</h3>\r\n          </div>\r\n          <fieldset class=\"form-fieldset\">\r\n            <!-- <div class=\"form-element form-input\"> -->\r\n          <p style=\"color:#58A7FE\">Create Password link has been sent to your registerd email!</p>  \r\n            <!-- </div> -->\r\n            <a [routerLink]=\"['/']\" style=\"cursor:pointer\">Go To Login</a>\r\n          </fieldset>\r\n    </div>\r\n  \r\n    \r\n    \r\n    \r\n   </div>\r\n   </div>\r\n</div>\r\n\r\n</div>\r\n</div>\r\n\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/auth/components/forgot-password/forgot-password.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/auth/components/forgot-password/forgot-password.component.ts ***!
  \******************************************************************************/
/*! exports provided: ForgotPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgotPasswordComponent", function() { return ForgotPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/auth/shared/constant.ts");
/* harmony import */ var _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/services/auth-api-service/auth-api.service */ "./src/app/auth/shared/services/auth-api-service/auth-api.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(router, route, notificationService, error, apiService, spinner) {
        this.router = router;
        this.route = route;
        this.notificationService = notificationService;
        this.error = error;
        this.apiService = apiService;
        this.spinner = spinner;
        this.invalidEmail = false;
        this.email = '';
        this.msg = '';
        this.emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
        this.showSuccessMsg = false;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.showMessage = false;
        // this.route.params.subscribe(res => {
        //   this.email = res['email'];
        // });
        this.forgotPassword = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormGroup"]({
            'email': new _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(this.emailPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].maxLength(100)])
        });
    };
    ForgotPasswordComponent.prototype.forgetPassword = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            'requestedEmail': this.forgotPassword.value.email
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["AuthAPIURls"].ForgotPassword, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.statusCode === 200) {
                    _this.spinner.hide();
                    _this.showMessage = true;
                    // this.notificationService.warning({message: 'The email you have entered does not exist', title: ''});
                }
                else {
                    _this.showMessage = false;
                    _this.spinner.hide();
                }
            }
            else if (res.body.statusCode === 989) {
                _this.spinner.hide();
                _this.notificationService.warning({ message: 'The email you have entered does not exist', title: '' });
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
    ForgotPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-forgot-password',
            template: __webpack_require__(/*! ./forgot-password.component.html */ "./src/app/auth/components/forgot-password/forgot-password.component.html"),
            styles: [__webpack_require__(/*! ./forgot-password.component.css */ "./src/app/auth/components/forgot-password/forgot-password.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"], _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_6__["AuthApiService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerService"]])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());



/***/ }),

/***/ "./src/app/auth/components/kiosk-login/kiosk-login.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/auth/components/kiosk-login/kiosk-login.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* Reset CSS\r\n========================================================================== */\r\n*, *:after, *::before{box-sizing: border-box;}\r\nhtml, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video { margin: 0; padding: 0; border: 0; font-size: 100%; vertical-align: baseline; }\r\nbody{font-family: 'Roboto', sans-serif; font-size: 16px; color: #333333; line-height: 1.5; background-color: #59a4ff;}\r\nimg{max-width: 100%;}\r\na, .btn{transition: all 2s ease; -webkit-transition: all 2s ease;}\r\np+p{margin-top: 20px;}\r\n/* Common CSS\r\n    ========================================================================== */\r\nh1,h2,h3,h4,h5,h6{font-weight: 700;}\r\nh1{font-size: 24px; margin-bottom: 20px;}\r\nh2{font-size: 18px;}\r\nol, ul { list-style: none; }\r\na, .btn { transition: all 0.5s ease; }\r\na:active, a:hover, a:focus, .btn:focus, .btn:active, .btn:hover { outline: 0; }\r\na { color: #59a4ff; text-decoration: none; }\r\na:focus, a:hover { color: #59a4ff; text-decoration: none; }\r\nb, strong { font-weight: bold; }\r\nsmall { font-size: 80%; }\r\nsub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; }\r\n.form-control{border:1px #b4b4b4 solid; border-radius: 6px; padding: 0 10px; height: 44px; width: 100%;}\r\n.form-control:focus{color: #333; outline: none; box-shadow: none;}\r\n.form-control::-webkit-input-placeholder {\r\n  /* Edge */\r\n  color: #c1c1c1;\r\n}\r\n.form-control:-ms-input-placeholder {\r\n  /* Internet Explorer 10-11 */\r\n  color: #c1c1c1;\r\n}\r\n.form-control::-moz-placeholder {\r\n  color: #c1c1c1;\r\n}\r\n.form-control::-ms-input-placeholder {\r\n  color: #c1c1c1;\r\n}\r\n.form-control::placeholder {\r\n  color: #c1c1c1;\r\n}\r\n[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {\r\n    cursor: pointer;\r\n}\r\n.btn{display: inline-block;\r\n    font-weight: 400;\r\n    color: #212529;\r\n    text-align: center;\r\n    vertical-align: middle;\r\n    -webkit-user-select: none;\r\n    -moz-user-select: none;\r\n    -ms-user-select: none;\r\n    user-select: none;\r\n    background-color: transparent;\r\n    border: 1px solid transparent;\r\n    padding: .375rem .75rem;    \r\n    line-height: 1.5;\r\n    border-radius: .25rem;\r\n    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;\r\nfont-size: 16px; text-transform: uppercase; min-width: 125px; height: 44px; border-radius:30px;}\r\na.btn{line-height: 30px;}\r\n.btn:hover{opacity: 0.8;}\r\n.btn-primary, .btn-primary:hover, .btn-primary:focus, .btn-primary.focus{background-color: #57a7fe; border-color: #57a7fe; color: #fff;}\r\n.btn-gray, \r\n.btn-gray:hover, \r\n.btn-gray:focus{background-color: #c1c1c1; border-color: #c1c1c1; color: #333;}\r\nheader{text-align: center; position: relative; padding: 10px 15px;}\r\nheader .logo{max-width: 200px;}\r\n.rightIcon{position: absolute; right:5%; top:15px;}\r\n.page-container{padding-left:30px; padding-right:30px; min-height: calc(100vh - 153px);}\r\n.otp-widget{max-width: 275px; margin: 0 auto; padding-top: 50px;}\r\n.wt-frame{background-color: #fff; border-radius: 10px; box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.2);}\r\n.lockbox{width:125px; margin: 0 auto;}\r\n.opt-code{margin-top: -10px; font-size: 18px;}\r\n.otp-fields .form-control{margin: 4px; text-align: center; font-size: 18px; font-weight: 700;;}\r\n.agency-code label{padding: 8px 0; display: inline-block;}\r\n.childprofileDetails{color: #fff; border-top:1px #fff solid; border-bottom:1px #fff solid;  padding: 15px 30px;}\r\n.childprofileDetails h3{font-size: 24px; font-weight: normal;}\r\n.otherDetails h3{font-size: 30px;}\r\n.childprofileDetails p+p{margin-top: 0;}\r\n.childprofile img, .cardChild img{height: 80px; width: 80px; border-radius:50%; margin-right: 1rem;}\r\n.childCardsWidget{overflow: auto; padding-left: 30px; padding-right: 30px;}\r\n.cardChild{margin: 10px 3px; min-width: 250px;}\r\n.cardChild img{height: 60px; width: 60px;}\r\n.childInfo h3{color: #666; font-size: 18px;}\r\n.childInfo p{color: #999;}\r\n.btns{margin-left: -8px; margin-right: -8px; white-space: nowrap;}\r\n.btns a{margin-left: 8px; margin-right: 8px;}\r\n.rowWidget{margin-left: -30px; margin-right: -30px;}\r\n/*-----*/\r\n.p-2{padding:1rem;}\r\n.p-3{padding:1.5rem;}\r\n.mt-2{margin-top: 1rem;}\r\n.mt-3{margin-top: 1.5rem;}\r\n.mr-2{margin-right: 1rem;}\r\n.mb-2{margin-bottom: 1rem;}\r\n.text-center{text-align: center;}\r\n.d-flex {\r\n    display: flex!important;\r\n}\r\n@media all and (min-width:768px){\r\n    .d-md-flex {\r\n        display: flex!important;\r\n    }    \r\n}\r\n@media all and (max-width:767px){\r\n    .childprofileDetails{text-align: center;}\r\n    .otherDetails{\r\n        justify-content: center!important; margin-top: 10px;}\r\n}\r\n@media all and (max-width:400px){\r\n    header .logo{max-width: 200px;}\r\n   .rightIcon{right:2%;}\r\n   .rightIcon img{width: 40px;}\r\n}\r\n.justify-content-start {\r\n    justify-content: flex-start!important;\r\n}\r\n.justify-content-center {\r\n    justify-content: center!important;\r\n    height: 100px;\r\n}\r\n.justify-content-between {\r\n    justify-content: space-between!important;\r\n}\r\n.align-items-center {\r\n    align-items: center!important;\r\n}\r\n.agency-code {\r\nposition: fixed;\r\nleft: 10px;\r\nbottom: 0;\r\ncolor: white;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9jb21wb25lbnRzL2tpb3NrLWxvZ2luL2tpb3NrLWxvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7NEVBQzRFO0FBQzVFLHNCQUFzQixzQkFBc0IsQ0FBQztBQUM3Qyw2ZUFBNmUsU0FBUyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLHdCQUF3QixFQUFFO0FBRTFqQixLQUFLLGlDQUFpQyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUseUJBQXlCLENBQUM7QUFDckgsSUFBSSxlQUFlLENBQUM7QUFDcEIsUUFBUSx1QkFBdUIsRUFBRSwrQkFBK0IsQ0FBQztBQUNqRSxJQUFJLGdCQUFnQixDQUFDO0FBRXJCO2dGQUNnRjtBQUNoRixrQkFBa0IsZ0JBQWdCLENBQUM7QUFDbkMsR0FBRyxlQUFlLEVBQUUsbUJBQW1CLENBQUM7QUFDeEMsR0FBRyxlQUFlLENBQUM7QUFDbkIsU0FBUyxnQkFBZ0IsRUFBRTtBQUMzQixVQUFVLHlCQUF5QixFQUFFO0FBQ3JDLGtFQUFrRSxVQUFVLEVBQUU7QUFFOUUsSUFBSSxjQUFjLEVBQUUscUJBQXFCLEVBQUU7QUFDM0MsbUJBQW1CLGNBQWMsRUFBRSxxQkFBcUIsRUFBRTtBQUUxRCxZQUFZLGlCQUFpQixFQUFFO0FBQy9CLFFBQVEsY0FBYyxFQUFFO0FBQ3hCLFdBQVcsY0FBYyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSx3QkFBd0IsRUFBRTtBQUN6RixjQUFjLHdCQUF3QixFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDO0FBQ3ZHLG9CQUFvQixXQUFXLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDO0FBQ2pFO0VBQ0UsU0FBUztFQUNULGNBQWM7QUFDaEI7QUFDQTtFQUNFLDRCQUE0QjtFQUM1QixjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxjQUFjO0FBQ2hCO0FBRkE7RUFDRSxjQUFjO0FBQ2hCO0FBRkE7RUFDRSxjQUFjO0FBQ2hCO0FBRUE7SUFDSSxlQUFlO0FBQ25CO0FBRUEsS0FBSyxxQkFBcUI7SUFDdEIsZ0JBQWdCO0lBQ2hCLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsc0JBQXNCO0lBQ3RCLHlCQUF5QjtJQUN6QixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQiw2QkFBNkI7SUFDN0IsNkJBQTZCO0lBQzdCLHVCQUF1QjtJQUN2QixnQkFBZ0I7SUFDaEIscUJBQXFCO0lBQ3JCLDhIQUE4SDtBQUNsSSxlQUFlLEVBQUUseUJBQXlCLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixDQUFDO0FBQy9GLE1BQU0saUJBQWlCLENBQUM7QUFDeEIsV0FBVyxZQUFZLENBQUM7QUFDeEIseUVBQXlFLHlCQUF5QixFQUFFLHFCQUFxQixFQUFFLFdBQVcsQ0FBQztBQUN2STs7Z0JBRWdCLHlCQUF5QixFQUFFLHFCQUFxQixFQUFFLFdBQVcsQ0FBQztBQUU5RSxPQUFPLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDO0FBQ2xFLGFBQWEsZ0JBQWdCLENBQUM7QUFDOUIsV0FBVyxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDO0FBQ2xELGdCQUFnQixpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSwrQkFBK0IsQ0FBQztBQUN2RixZQUFZLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQztBQUNoRSxVQUFVLHNCQUFzQixFQUFFLG1CQUFtQixFQUFFLDRDQUE0QyxDQUFDO0FBQ3BHLFNBQVMsV0FBVyxFQUFFLGNBQWMsQ0FBQztBQUNyQyxVQUFVLGlCQUFpQixFQUFFLGVBQWUsQ0FBQztBQUM3QywwQkFBMEIsV0FBVyxFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRTtBQUM5RixtQkFBbUIsY0FBYyxFQUFFLHFCQUFxQixDQUFDO0FBQ3pELHFCQUFxQixXQUFXLEVBQUUseUJBQXlCLEVBQUUsNEJBQTRCLEdBQUcsa0JBQWtCLENBQUM7QUFDL0csd0JBQXdCLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQztBQUM3RCxpQkFBaUIsZUFBZSxDQUFDO0FBQ2pDLHlCQUF5QixhQUFhLENBQUM7QUFDdkMsa0NBQWtDLFlBQVksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLENBQUM7QUFDbkcsa0JBQWtCLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQztBQUMxRSxXQUFXLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDO0FBQzlDLGVBQWUsWUFBWSxFQUFFLFdBQVcsQ0FBQztBQUV6QyxjQUFjLFdBQVcsRUFBRSxlQUFlLENBQUM7QUFDM0MsYUFBYSxXQUFXLENBQUM7QUFDekIsTUFBTSxpQkFBaUIsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsQ0FBQztBQUNqRSxRQUFRLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDO0FBRTVDLFdBQVcsa0JBQWtCLEVBQUUsbUJBQW1CLENBQUM7QUFFbkQsUUFBUTtBQUNSLEtBQUssWUFBWSxDQUFDO0FBQ2xCLEtBQUssY0FBYyxDQUFDO0FBQ3BCLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkIsTUFBTSxrQkFBa0IsQ0FBQztBQUN6QixNQUFNLGtCQUFrQixDQUFDO0FBQ3pCLE1BQU0sbUJBQW1CLENBQUM7QUFDMUIsYUFBYSxrQkFBa0IsQ0FBQztBQUVoQztJQUVJLHVCQUF1QjtBQUMzQjtBQUVBO0lBQ0k7UUFFSSx1QkFBdUI7SUFDM0I7QUFDSjtBQUVBO0lBQ0kscUJBQXFCLGtCQUFrQixDQUFDO0lBQ3hDO1FBQ0ksaUNBQWlDLEVBQUUsZ0JBQWdCLENBQUM7QUFDNUQ7QUFFQTtJQUNJLGFBQWEsZ0JBQWdCLENBQUM7R0FDL0IsV0FBVyxRQUFRLENBQUM7R0FDcEIsZUFBZSxXQUFXLENBQUM7QUFDOUI7QUFFQTtJQUVJLHFDQUFxQztBQUN6QztBQUNBO0lBRUksaUNBQWlDO0lBQ2pDLGFBQWE7QUFDakI7QUFDQTtJQUVJLHdDQUF3QztBQUM1QztBQUVBO0lBRUksNkJBQTZCO0FBQ2pDO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsVUFBVTtBQUNWLFNBQVM7QUFDVCxZQUFZO0FBQ1oiLCJmaWxlIjoic3JjL2FwcC9hdXRoL2NvbXBvbmVudHMva2lvc2stbG9naW4va2lvc2stbG9naW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFJlc2V0IENTU1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4qLCAqOmFmdGVyLCAqOjpiZWZvcmV7Ym94LXNpemluZzogYm9yZGVyLWJveDt9XHJcbmh0bWwsIGJvZHksIGRpdiwgc3BhbiwgYXBwbGV0LCBvYmplY3QsIGlmcmFtZSwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgcCwgYmxvY2txdW90ZSwgcHJlLCBhLCBhYmJyLCBhY3JvbnltLCBhZGRyZXNzLCBiaWcsIGNpdGUsIGNvZGUsIGRlbCwgZGZuLCBlbSwgaW1nLCBpbnMsIGtiZCwgcSwgcywgc2FtcCwgc21hbGwsIHN0cmlrZSwgc3Ryb25nLCBzdWIsIHN1cCwgdHQsIHZhciwgYiwgdSwgaSwgY2VudGVyLCBkbCwgZHQsIGRkLCBvbCwgdWwsIGxpLCBmaWVsZHNldCwgZm9ybSwgbGFiZWwsIGxlZ2VuZCwgdGFibGUsIGNhcHRpb24sIHRib2R5LCB0Zm9vdCwgdGhlYWQsIHRyLCB0aCwgdGQsIGFydGljbGUsIGFzaWRlLCBjYW52YXMsIGRldGFpbHMsIGVtYmVkLCBmaWd1cmUsIGZpZ2NhcHRpb24sIGZvb3RlciwgaGVhZGVyLCBoZ3JvdXAsIG1lbnUsIG5hdiwgb3V0cHV0LCBydWJ5LCBzZWN0aW9uLCBzdW1tYXJ5LCB0aW1lLCBtYXJrLCBhdWRpbywgdmlkZW8geyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IGJvcmRlcjogMDsgZm9udC1zaXplOiAxMDAlOyB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cclxuXHJcbmJvZHl7Zm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDE2cHg7IGNvbG9yOiAjMzMzMzMzOyBsaW5lLWhlaWdodDogMS41OyBiYWNrZ3JvdW5kLWNvbG9yOiAjNTlhNGZmO31cclxuaW1ne21heC13aWR0aDogMTAwJTt9XHJcbmEsIC5idG57dHJhbnNpdGlvbjogYWxsIDJzIGVhc2U7IC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDJzIGVhc2U7fVxyXG5wK3B7bWFyZ2luLXRvcDogMjBweDt9XHJcblxyXG4vKiBDb21tb24gQ1NTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5oMSxoMixoMyxoNCxoNSxoNntmb250LXdlaWdodDogNzAwO31cclxuaDF7Zm9udC1zaXplOiAyNHB4OyBtYXJnaW4tYm90dG9tOiAyMHB4O31cclxuaDJ7Zm9udC1zaXplOiAxOHB4O31cclxub2wsIHVsIHsgbGlzdC1zdHlsZTogbm9uZTsgfVxyXG5hLCAuYnRuIHsgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZTsgfVxyXG5hOmFjdGl2ZSwgYTpob3ZlciwgYTpmb2N1cywgLmJ0bjpmb2N1cywgLmJ0bjphY3RpdmUsIC5idG46aG92ZXIgeyBvdXRsaW5lOiAwOyB9XHJcblxyXG5hIHsgY29sb3I6ICM1OWE0ZmY7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxyXG5hOmZvY3VzLCBhOmhvdmVyIHsgY29sb3I6ICM1OWE0ZmY7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxyXG5cclxuYiwgc3Ryb25nIHsgZm9udC13ZWlnaHQ6IGJvbGQ7IH1cclxuc21hbGwgeyBmb250LXNpemU6IDgwJTsgfVxyXG5zdWIsIHN1cCB7IGZvbnQtc2l6ZTogNzUlOyBsaW5lLWhlaWdodDogMDsgcG9zaXRpb246IHJlbGF0aXZlOyB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7IH1cclxuLmZvcm0tY29udHJvbHtib3JkZXI6MXB4ICNiNGI0YjQgc29saWQ7IGJvcmRlci1yYWRpdXM6IDZweDsgcGFkZGluZzogMCAxMHB4OyBoZWlnaHQ6IDQ0cHg7IHdpZHRoOiAxMDAlO31cclxuLmZvcm0tY29udHJvbDpmb2N1c3tjb2xvcjogIzMzMzsgb3V0bGluZTogbm9uZTsgYm94LXNoYWRvdzogbm9uZTt9XHJcbi5mb3JtLWNvbnRyb2w6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xyXG4gIC8qIEVkZ2UgKi9cclxuICBjb2xvcjogI2MxYzFjMTtcclxufVxyXG4uZm9ybS1jb250cm9sOi1tcy1pbnB1dC1wbGFjZWhvbGRlciB7XHJcbiAgLyogSW50ZXJuZXQgRXhwbG9yZXIgMTAtMTEgKi9cclxuICBjb2xvcjogI2MxYzFjMTtcclxufVxyXG4uZm9ybS1jb250cm9sOjpwbGFjZWhvbGRlciB7XHJcbiAgY29sb3I6ICNjMWMxYzE7XHJcbn1cclxuXHJcblt0eXBlPWJ1dHRvbl06bm90KDpkaXNhYmxlZCksIFt0eXBlPXJlc2V0XTpub3QoOmRpc2FibGVkKSwgW3R5cGU9c3VibWl0XTpub3QoOmRpc2FibGVkKSwgYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmJ0bntkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgY29sb3I6ICMyMTI1Mjk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xyXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbiAgICBwYWRkaW5nOiAuMzc1cmVtIC43NXJlbTsgICAgXHJcbiAgICBsaW5lLWhlaWdodDogMS41O1xyXG4gICAgYm9yZGVyLXJhZGl1czogLjI1cmVtO1xyXG4gICAgdHJhbnNpdGlvbjogY29sb3IgLjE1cyBlYXNlLWluLW91dCxiYWNrZ3JvdW5kLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsYm9yZGVyLWNvbG9yIC4xNXMgZWFzZS1pbi1vdXQsYm94LXNoYWRvdyAuMTVzIGVhc2UtaW4tb3V0O1xyXG5mb250LXNpemU6IDE2cHg7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IG1pbi13aWR0aDogMTI1cHg7IGhlaWdodDogNDRweDsgYm9yZGVyLXJhZGl1czozMHB4O31cclxuYS5idG57bGluZS1oZWlnaHQ6IDMwcHg7fVxyXG4uYnRuOmhvdmVye29wYWNpdHk6IDAuODt9XHJcbi5idG4tcHJpbWFyeSwgLmJ0bi1wcmltYXJ5OmhvdmVyLCAuYnRuLXByaW1hcnk6Zm9jdXMsIC5idG4tcHJpbWFyeS5mb2N1c3tiYWNrZ3JvdW5kLWNvbG9yOiAjNTdhN2ZlOyBib3JkZXItY29sb3I6ICM1N2E3ZmU7IGNvbG9yOiAjZmZmO31cclxuLmJ0bi1ncmF5LCBcclxuLmJ0bi1ncmF5OmhvdmVyLCBcclxuLmJ0bi1ncmF5OmZvY3Vze2JhY2tncm91bmQtY29sb3I6ICNjMWMxYzE7IGJvcmRlci1jb2xvcjogI2MxYzFjMTsgY29sb3I6ICMzMzM7fVxyXG5cclxuaGVhZGVye3RleHQtYWxpZ246IGNlbnRlcjsgcG9zaXRpb246IHJlbGF0aXZlOyBwYWRkaW5nOiAxMHB4IDE1cHg7fVxyXG5oZWFkZXIgLmxvZ297bWF4LXdpZHRoOiAyMDBweDt9XHJcbi5yaWdodEljb257cG9zaXRpb246IGFic29sdXRlOyByaWdodDo1JTsgdG9wOjE1cHg7fVxyXG4ucGFnZS1jb250YWluZXJ7cGFkZGluZy1sZWZ0OjMwcHg7IHBhZGRpbmctcmlnaHQ6MzBweDsgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDE1M3B4KTt9XHJcbi5vdHAtd2lkZ2V0e21heC13aWR0aDogMjc1cHg7IG1hcmdpbjogMCBhdXRvOyBwYWRkaW5nLXRvcDogNTBweDt9XHJcbi53dC1mcmFtZXtiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyBib3JkZXItcmFkaXVzOiAxMHB4OyBib3gtc2hhZG93OiAwIDJweCA1cHggM3B4IHJnYmEoMCwgMCwgMCwgMC4yKTt9XHJcbi5sb2NrYm94e3dpZHRoOjEyNXB4OyBtYXJnaW46IDAgYXV0bzt9XHJcbi5vcHQtY29kZXttYXJnaW4tdG9wOiAtMTBweDsgZm9udC1zaXplOiAxOHB4O31cclxuLm90cC1maWVsZHMgLmZvcm0tY29udHJvbHttYXJnaW46IDRweDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDE4cHg7IGZvbnQtd2VpZ2h0OiA3MDA7O31cclxuLmFnZW5jeS1jb2RlIGxhYmVse3BhZGRpbmc6IDhweCAwOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7fVxyXG4uY2hpbGRwcm9maWxlRGV0YWlsc3tjb2xvcjogI2ZmZjsgYm9yZGVyLXRvcDoxcHggI2ZmZiBzb2xpZDsgYm9yZGVyLWJvdHRvbToxcHggI2ZmZiBzb2xpZDsgIHBhZGRpbmc6IDE1cHggMzBweDt9XHJcbi5jaGlsZHByb2ZpbGVEZXRhaWxzIGgze2ZvbnQtc2l6ZTogMjRweDsgZm9udC13ZWlnaHQ6IG5vcm1hbDt9XHJcbi5vdGhlckRldGFpbHMgaDN7Zm9udC1zaXplOiAzMHB4O31cclxuLmNoaWxkcHJvZmlsZURldGFpbHMgcCtwe21hcmdpbi10b3A6IDA7fVxyXG4uY2hpbGRwcm9maWxlIGltZywgLmNhcmRDaGlsZCBpbWd7aGVpZ2h0OiA4MHB4OyB3aWR0aDogODBweDsgYm9yZGVyLXJhZGl1czo1MCU7IG1hcmdpbi1yaWdodDogMXJlbTt9XHJcbi5jaGlsZENhcmRzV2lkZ2V0e292ZXJmbG93OiBhdXRvOyBwYWRkaW5nLWxlZnQ6IDMwcHg7IHBhZGRpbmctcmlnaHQ6IDMwcHg7fVxyXG4uY2FyZENoaWxke21hcmdpbjogMTBweCAzcHg7IG1pbi13aWR0aDogMjUwcHg7fVxyXG4uY2FyZENoaWxkIGltZ3toZWlnaHQ6IDYwcHg7IHdpZHRoOiA2MHB4O31cclxuXHJcbi5jaGlsZEluZm8gaDN7Y29sb3I6ICM2NjY7IGZvbnQtc2l6ZTogMThweDt9XHJcbi5jaGlsZEluZm8gcHtjb2xvcjogIzk5OTt9XHJcbi5idG5ze21hcmdpbi1sZWZ0OiAtOHB4OyBtYXJnaW4tcmlnaHQ6IC04cHg7IHdoaXRlLXNwYWNlOiBub3dyYXA7fVxyXG4uYnRucyBhe21hcmdpbi1sZWZ0OiA4cHg7IG1hcmdpbi1yaWdodDogOHB4O31cclxuXHJcbi5yb3dXaWRnZXR7bWFyZ2luLWxlZnQ6IC0zMHB4OyBtYXJnaW4tcmlnaHQ6IC0zMHB4O31cclxuXHJcbi8qLS0tLS0qL1xyXG4ucC0ye3BhZGRpbmc6MXJlbTt9XHJcbi5wLTN7cGFkZGluZzoxLjVyZW07fVxyXG4ubXQtMnttYXJnaW4tdG9wOiAxcmVtO31cclxuLm10LTN7bWFyZ2luLXRvcDogMS41cmVtO31cclxuLm1yLTJ7bWFyZ2luLXJpZ2h0OiAxcmVtO31cclxuLm1iLTJ7bWFyZ2luLWJvdHRvbTogMXJlbTt9XHJcbi50ZXh0LWNlbnRlcnt0ZXh0LWFsaWduOiBjZW50ZXI7fVxyXG5cclxuLmQtZmxleCB7XHJcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveCFpbXBvcnRhbnQ7XHJcbiAgICBkaXNwbGF5OiBmbGV4IWltcG9ydGFudDtcclxufVxyXG5cclxuQG1lZGlhIGFsbCBhbmQgKG1pbi13aWR0aDo3NjhweCl7XHJcbiAgICAuZC1tZC1mbGV4IHtcclxuICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveCFpbXBvcnRhbnQ7XHJcbiAgICAgICAgZGlzcGxheTogZmxleCFpbXBvcnRhbnQ7XHJcbiAgICB9ICAgIFxyXG59XHJcblxyXG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOjc2N3B4KXtcclxuICAgIC5jaGlsZHByb2ZpbGVEZXRhaWxze3RleHQtYWxpZ246IGNlbnRlcjt9XHJcbiAgICAub3RoZXJEZXRhaWxzey1tcy1mbGV4LXBhY2s6IGNlbnRlciFpbXBvcnRhbnQ7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXIhaW1wb3J0YW50OyBtYXJnaW4tdG9wOiAxMHB4O31cclxufVxyXG5cclxuQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDo0MDBweCl7XHJcbiAgICBoZWFkZXIgLmxvZ297bWF4LXdpZHRoOiAyMDBweDt9XHJcbiAgIC5yaWdodEljb257cmlnaHQ6MiU7fVxyXG4gICAucmlnaHRJY29uIGltZ3t3aWR0aDogNDBweDt9XHJcbn1cclxuXHJcbi5qdXN0aWZ5LWNvbnRlbnQtc3RhcnQge1xyXG4gICAgLW1zLWZsZXgtcGFjazogc3RhcnQhaW1wb3J0YW50O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0IWltcG9ydGFudDtcclxufVxyXG4uanVzdGlmeS1jb250ZW50LWNlbnRlciB7XHJcbiAgICAtbXMtZmxleC1wYWNrOiBjZW50ZXIhaW1wb3J0YW50O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXIhaW1wb3J0YW50O1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxufVxyXG4uanVzdGlmeS1jb250ZW50LWJldHdlZW4ge1xyXG4gICAgLW1zLWZsZXgtcGFjazoganVzdGlmeSFpbXBvcnRhbnQ7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW4haW1wb3J0YW50O1xyXG59XHJcblxyXG4uYWxpZ24taXRlbXMtY2VudGVyIHtcclxuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXIhaW1wb3J0YW50O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlciFpbXBvcnRhbnQ7XHJcbn1cclxuLmFnZW5jeS1jb2RlIHtcclxucG9zaXRpb246IGZpeGVkO1xyXG5sZWZ0OiAxMHB4O1xyXG5ib3R0b206IDA7XHJcbmNvbG9yOiB3aGl0ZTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/auth/components/kiosk-login/kiosk-login.component.html":
/*!************************************************************************!*\
  !*** ./src/app/auth/components/kiosk-login/kiosk-login.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header style=\"background-color: #59a4ff;\">\n  <img src=\"assets/img/logo.png\" alt=\"\" class=\"logo\">\n</header>\n\n<div class=\"page-container\" style=\"background-color: #59a4ff;\">\n  <div class=\"otp-widget text-center\">\n    <div class=\"wt-frame p-3 lockbox\"><img src=\"assets/img/lock.svg\" alt=\"\" style=\"height: 60px; width: 51px;\"></div>\n    <div class=\"wt-frame p-2 opt-code mb-2\">\n      <p>Enter Your Pin</p>\n      <div class=\"d-flex justify-content-center otp-fields\">\n        <ng-otp-input #ngOtpInput (onInputChange)=\"onOtpChange($event)\" *ngIf=\"showOtpComponent\" [config]=\"config\">\n        </ng-otp-input>\n      </div>\n    </div>\n    <div class=\"agency-code mt-3\" *ngIf=\"showAgencyField == false\">\n      <label>Input Agency Code</label>\n      <input type=\"text\" [(ngModel)]=\"code\" placeholder=\"Type a Code\" class=\"form-control mb-2\">\n      <button type=\"submit\" class=\"btn btn-gray mb-2\" (click)=\"agencyLogin()\">Save</button>\n    </div>\n    <div class=\"agency-code mt-5\" *ngIf=\"showAgencyField == true\">\n      <label>Agency Logged In</label>\n    </div>\n    <div class=\"back-login mt-5\"\n      style=\"color:white;font-weight: bolder;font-size: 16px;\">\n      <div class=\"forgot\" style=\"cursor:pointer\" [routerLink]=\"['/']\"><i class=\"fa fa-long-arrow-left\"\n          aria-hidden=\"true\" style=\"margin-right: 5px;\"></i> Back To Login Page</div>\n    </div>\n  </div>\n</div>\n\n\n\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/auth/components/kiosk-login/kiosk-login.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/auth/components/kiosk-login/kiosk-login.component.ts ***!
  \**********************************************************************/
/*! exports provided: KioskLoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KioskLoginComponent", function() { return KioskLoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/auth-api-service/auth-api.service */ "./src/app/auth/shared/services/auth-api-service/auth-api.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/auth/shared/constant.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var KioskLoginComponent = /** @class */ (function () {
    function KioskLoginComponent(fb, router, toaster, apiService, error, spinner, notification, commonService) {
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.showEmail = true;
        this.code = '';
        this.emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
        this.showOtpComponent = true;
        this.config = {
            allowNumbersOnly: true,
            length: 4,
            isPasswordInput: false,
            disableAutoFocus: false,
            placeholder: '',
            inputStyles: {
                'width': '50px',
                'height': '50px',
            },
            containerStyles: {
                'margin-left': '0px'
            },
            containerClass: false
        };
    }
    KioskLoginComponent.prototype.ngOnInit = function () {
        if (this.commonService.getIsAgencyFieldActive() === 'true') {
            this.showAgencyField = true;
        }
        else {
            this.showAgencyField = false;
        }
    };
    KioskLoginComponent.prototype.onOtpChange = function (otp) {
        this.otp = otp;
        if (this.otp.length === 4) {
            this.doLogin();
        }
    };
    KioskLoginComponent.prototype.setVal = function () {
        this.ngOtpInputRef.setValue('');
    };
    KioskLoginComponent.prototype.onConfigChange = function () {
        var _this = this;
        this.showOtpComponent = false;
        this.otp = null;
        setTimeout(function () {
            _this.showOtpComponent = true;
        }, 0);
    };
    KioskLoginComponent.prototype.doLogin = function () {
        var _this = this;
        if (!localStorage.getItem('agencyID')) {
            this.setVal();
            this.notification.warning({ message: 'Agency is not login', title: 'Oops!' });
        }
        else {
            this.spinner.show();
            var data = {
                'quickPin': this.otp,
                'agencyID': localStorage.getItem('agencyID'),
                'BusinessToken': localStorage.getItem('fcmtkn')
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["AuthAPIURls"].loginforKioskWeb, data, null).subscribe(function (res) {
                _this.spinner.hide();
                if (res.body) {
                    if (res.body.access_token) {
                        localStorage.setItem('teacherTodayAttendenceId', res.body.data.teacherTodayAttendenceId);
                        _this.commonService.setUserDetails('userdetails', res.body);
                        _this.commonService.isSubscriptionActive = res.body.data.isSubscriptionActive;
                        _this.loginSuccess(res.body.data);
                    }
                    else {
                        _this.setVal();
                        _this.notification.warning({ message: res.body.message, title: 'Oops!' });
                    }
                }
                else {
                    _this.spinner.hide();
                    _this.setVal();
                    _this.error.unknownError();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.setVal();
                _this.error.commonError(err);
            });
        }
    };
    KioskLoginComponent.prototype.loginSuccess = function (data) {
        localStorage.setItem('imagepath', data.imagePath);
        // localStorage.setItem('agencyID', data.agencyID);
        localStorage.setItem('iskiosklogin', 'true');
        if (data.roleId === 4) {
            localStorage.setItem('isauthenticated', 'true');
            localStorage.setItem('path', '/home/parentdashboard/kiosk');
            this.router.navigate(['/home/parentdashboard/kiosk']);
            this.toaster.success({ message: '', title: 'Welcome' });
        }
        else {
        }
    };
    KioskLoginComponent.prototype.agencyLogin = function () {
        var _this = this;
        if (this.code === '') {
            this.notification.warning({ message: 'Please enter Agency ID', title: '' });
            this.setVal();
        }
        else {
            this.spinner.show();
            var data = {
                'quickPin': this.code,
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["AuthAPIURls"].AgencyLoginForKiosk, data, null).subscribe(function (res) {
                _this.spinner.hide();
                if (res.body) {
                    if (res.body.statusCode === 200) {
                        localStorage.setItem('agencyID', res.body.agencyId);
                        localStorage.setItem('agencyLogin', 'true');
                        _this.showAgencyField = true;
                        _this.setVal();
                        _this.notification.success({ message: 'Login successfully', title: '' });
                    }
                    else {
                        _this.setVal();
                        _this.notification.warning({ message: 'Agency credentials are wrong', title: 'Oops!' });
                    }
                }
                else {
                    _this.spinner.hide();
                    _this.error.unknownError();
                }
            }, function (err) {
                _this.setVal();
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ngOtpInput'),
        __metadata("design:type", Object)
    ], KioskLoginComponent.prototype, "ngOtpInputRef", void 0);
    KioskLoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-kiosk-login',
            template: __webpack_require__(/*! ./kiosk-login.component.html */ "./src/app/auth/components/kiosk-login/kiosk-login.component.html"),
            styles: [__webpack_require__(/*! ./kiosk-login.component.css */ "./src/app/auth/components/kiosk-login/kiosk-login.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"], _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_4__["AuthApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]])
    ], KioskLoginComponent);
    return KioskLoginComponent;
}());



/***/ }),

/***/ "./src/app/auth/components/login/login.component.css":
/*!***********************************************************!*\
  !*** ./src/app/auth/components/login/login.component.css ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* .bgblue{background: #58A7FE!important} */\r\nhtml, body{height: 100vh;}\r\n.pt-100{padding-top:30px }\r\n.bgblue h1{font-size: 30px;text-align: center;color: #FF6C6C;margin-bottom: 100px}\r\n.bgblue h1 span{color: #58A7FE;font-weight: 600}\r\n.bgblue {\r\n  background: #fffaf3;\r\n  height: auto;\r\n  /* display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center; */\r\n  padding-top: 80px;\r\n  height: calc(100vh - 142px);\r\n}\r\n.btn-success{\r\n    width: 100%;\r\n    padding: 12px 0;\r\n    border: 0;\r\n    background: #FF6C6C;\r\n    font-size: 18px;\r\n    border-radius: 0 0 10px 10px;\r\n}\r\n.login {\r\n  background: #FF6C6C;\r\n  font-size: 18px;\r\n  padding: 13px 35px;\r\n  color: #fff;\r\n}\r\n.forgot{font-size: 14px; color: #58A7FE;font-weight: 400}\r\n.m-30{margin: 30px 0;}\r\n.btn-success:not(:disabled):not(.disabled):active{background: #337ab7;border-color:#337ab7 }\r\n.an-header{top:0;height: 50px;padding: 0}\r\n.an-logo-heading{font-size: 15px;padding-left:30px }\r\n.btnfooter{    background: #FFFFFF;\r\n  padding: 14px;box-shadow: 0 0 20px 2px rgba(153, 153, 153, 0.4)}\r\n.btnfooter p{padding: 0;margin: 0}\r\n.loginbox { position: relative}\r\n.loginbox .checkboxcustom{padding-left:30px }\r\n.loginbox .topkid{position: absolute;\r\n    top: -70px;\r\n    text-align: center;\r\n    right: 0;\r\n    }\r\n.loginbox .bottomkid{position: absolute;\r\n      bottom: -40px;\r\n      text-align: center;\r\n      left: -70px;\r\n      }\r\n.loginbox .bottomkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.loginbox .topkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.form-fieldset{\r\n        padding: 20px;\r\n      }\r\n/* .form-card{background: url('../../../../assets/img/back.png'); */\r\n/* } */\r\n.login-head {\r\n  text-align: center;\r\n  background: #fffaf3;\r\n}\r\n.login-head img {\r\n  width: 210px;\r\n}\r\n@media (max-width:992px) {\r\n  .div12 img {\r\n    display: none;\r\n  }\r\n}\r\n@media (max-width: 640px)\r\n{\r\n.an-topbar-left-part {\r\n   background: #fff;\r\n   }\r\n.form-card{width: 90%}\r\n.an-header{flex-direction: row}\r\n.an-logo-heading{\r\n  padding: 0\r\n}\r\n}\r\n@media (max-width: 480px) {\r\n  .login-head img {\r\n    width: 80%;\r\n  }\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkNBQTJDO0FBQzNDLFdBQVcsYUFBYSxDQUFDO0FBQ3pCLFFBQVEsaUJBQWlCO0FBQ3pCLFdBQVcsZUFBZSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxvQkFBb0I7QUFDakYsZ0JBQWdCLGNBQWMsQ0FBQyxnQkFBZ0I7QUFDL0M7RUFDRSxtQkFBbUI7RUFDbkIsWUFBWTtFQUNaOzs7NEJBRzBCO0VBQzFCLGlCQUFpQjtFQUNqQiwyQkFBMkI7QUFDN0I7QUFDQTtJQUNJLFdBQVc7SUFDWCxlQUFlO0lBQ2YsU0FBUztJQUNULG1CQUFtQjtJQUNuQixlQUFlO0lBQ2YsNEJBQTRCO0FBQ2hDO0FBQ0E7RUFDRSxtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixXQUFXO0FBQ2I7QUFFQSxRQUFRLGVBQWUsRUFBRSxjQUFjLENBQUMsZ0JBQWdCO0FBQ3hELE1BQU0sY0FBYyxDQUFDO0FBRXJCLGtEQUFrRCxtQkFBbUIsQ0FBQyxxQkFBcUI7QUFDM0YsV0FBVyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVU7QUFDeEMsaUJBQWlCLGVBQWUsQ0FBQyxrQkFBa0I7QUFDbkQsZUFBZSxtQkFBbUI7RUFDaEMsYUFBYSxDQUFDLGlEQUFpRDtBQUMvRCxhQUFhLFVBQVUsQ0FBQyxTQUFTO0FBR2pDLFlBQVksa0JBQWtCO0FBQzlCLDBCQUEwQixrQkFBa0I7QUFDNUMsa0JBQWtCLGtCQUFrQjtJQUNsQyxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLFFBQVE7SUFDUjtBQUVBLHFCQUFxQixrQkFBa0I7TUFDckMsYUFBYTtNQUNiLGtCQUFrQjtNQUNsQixXQUFXO01BQ1g7QUFFRiw2QkFBNkIsYUFBYTtNQUN4QyxjQUFjLENBQUM7QUFFakIsMEJBQTBCLGFBQWE7TUFDckMsY0FBYyxDQUFDO0FBRWY7UUFDRSxhQUFhO01BQ2Y7QUFFTixtRUFBbUU7QUFFbkUsTUFBTTtBQUNOO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjtBQUNGO0FBQ0E7O0FBRUE7R0FDRyxnQkFBZ0I7R0FDaEI7QUFDSCxXQUFXLFVBQVU7QUFDckIsV0FBVyxtQkFBbUI7QUFDOUI7RUFDRTtBQUNGO0FBQ0E7QUFDQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9hdXRoL2NvbXBvbmVudHMvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIC5iZ2JsdWV7YmFja2dyb3VuZDogIzU4QTdGRSFpbXBvcnRhbnR9ICovXHJcbmh0bWwsIGJvZHl7aGVpZ2h0OiAxMDB2aDt9XHJcbi5wdC0xMDB7cGFkZGluZy10b3A6MzBweCB9XHJcbi5iZ2JsdWUgaDF7Zm9udC1zaXplOiAzMHB4O3RleHQtYWxpZ246IGNlbnRlcjtjb2xvcjogI0ZGNkM2QzttYXJnaW4tYm90dG9tOiAxMDBweH1cclxuLmJnYmx1ZSBoMSBzcGFue2NvbG9yOiAjNThBN0ZFO2ZvbnQtd2VpZ2h0OiA2MDB9XHJcbi5iZ2JsdWUge1xyXG4gIGJhY2tncm91bmQ6ICNmZmZhZjM7XHJcbiAgaGVpZ2h0OiBhdXRvO1xyXG4gIC8qIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyAqL1xyXG4gIHBhZGRpbmctdG9wOiA4MHB4O1xyXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDE0MnB4KTtcclxufVxyXG4uYnRuLXN1Y2Nlc3N7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDEycHggMDtcclxuICAgIGJvcmRlcjogMDtcclxuICAgIGJhY2tncm91bmQ6ICNGRjZDNkM7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xyXG59XHJcbi5sb2dpbiB7XHJcbiAgYmFja2dyb3VuZDogI0ZGNkM2QztcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgcGFkZGluZzogMTNweCAzNXB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG59XHJcblxyXG4uZm9yZ290e2ZvbnQtc2l6ZTogMTRweDsgY29sb3I6ICM1OEE3RkU7Zm9udC13ZWlnaHQ6IDQwMH1cclxuLm0tMzB7bWFyZ2luOiAzMHB4IDA7fVxyXG5cclxuLmJ0bi1zdWNjZXNzOm5vdCg6ZGlzYWJsZWQpOm5vdCguZGlzYWJsZWQpOmFjdGl2ZXtiYWNrZ3JvdW5kOiAjMzM3YWI3O2JvcmRlci1jb2xvcjojMzM3YWI3IH1cclxuLmFuLWhlYWRlcnt0b3A6MDtoZWlnaHQ6IDUwcHg7cGFkZGluZzogMH1cclxuLmFuLWxvZ28taGVhZGluZ3tmb250LXNpemU6IDE1cHg7cGFkZGluZy1sZWZ0OjMwcHggfVxyXG4uYnRuZm9vdGVyeyAgICBiYWNrZ3JvdW5kOiAjRkZGRkZGO1xyXG4gIHBhZGRpbmc6IDE0cHg7Ym94LXNoYWRvdzogMCAwIDIwcHggMnB4IHJnYmEoMTUzLCAxNTMsIDE1MywgMC40KX1cclxuICAuYnRuZm9vdGVyIHB7cGFkZGluZzogMDttYXJnaW46IDB9XHJcblxyXG5cclxuICAubG9naW5ib3ggeyBwb3NpdGlvbjogcmVsYXRpdmV9XHJcbiAgLmxvZ2luYm94IC5jaGVja2JveGN1c3RvbXtwYWRkaW5nLWxlZnQ6MzBweCB9XHJcbiAgLmxvZ2luYm94IC50b3BraWR7cG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAtNzBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC5sb2dpbmJveCAuYm90dG9ta2lke3Bvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgYm90dG9tOiAtNDBweDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBsZWZ0OiAtNzBweDtcclxuICAgICAgfVxyXG5cclxuICAgIC5sb2dpbmJveCAuYm90dG9ta2lkIGltZ3sgICAgaGVpZ2h0OiAxMjBweDtcclxuICAgICAgbWFyZ2luOiAwIGF1dG87fVxyXG5cclxuICAgIC5sb2dpbmJveCAudG9wa2lkIGltZ3sgICAgaGVpZ2h0OiAxMjBweDtcclxuICAgICAgbWFyZ2luOiAwIGF1dG87fVxyXG5cclxuICAgICAgLmZvcm0tZmllbGRzZXR7XHJcbiAgICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgfVxyXG5cclxuLyogLmZvcm0tY2FyZHtiYWNrZ3JvdW5kOiB1cmwoJy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWcvYmFjay5wbmcnKTsgKi9cclxuXHJcbi8qIH0gKi9cclxuLmxvZ2luLWhlYWQge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kOiAjZmZmYWYzO1xyXG59XHJcbi5sb2dpbi1oZWFkIGltZyB7XHJcbiAgd2lkdGg6IDIxMHB4O1xyXG59XHJcbiBcclxuQG1lZGlhIChtYXgtd2lkdGg6OTkycHgpIHtcclxuICAuZGl2MTIgaW1nIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG59IFxyXG5AbWVkaWEgKG1heC13aWR0aDogNjQwcHgpXHJcbntcclxuLmFuLXRvcGJhci1sZWZ0LXBhcnQge1xyXG4gICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICB9XHJcbi5mb3JtLWNhcmR7d2lkdGg6IDkwJX1cclxuLmFuLWhlYWRlcntmbGV4LWRpcmVjdGlvbjogcm93fVxyXG4uYW4tbG9nby1oZWFkaW5ne1xyXG4gIHBhZGRpbmc6IDBcclxufVxyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xyXG4gIC5sb2dpbi1oZWFkIGltZyB7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/auth/components/login/login.component.html":
/*!************************************************************!*\
  !*** ./src/app/auth/components/login/login.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-head\">\r\n  <img src=\"assets/img/logo-big-new.png\" alt=\"\">\r\n</div>\r\n<div class=\"bgblue\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-8\">\r\n        <div class=\"div12\">\r\n          <img src=\"assets/img/bg.png\" alt=\"\">\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-lg-4\">\r\n        <div class=\"loginbox\">\r\n          <form class=\"form-card\" [formGroup]=\"loginForm\" (keydown)=\"doLogin($event)\">\r\n            <div class=\"title\">\r\n              <h3>LOGIN</h3>\r\n            </div>\r\n            <fieldset class=\"form-fieldset\">\r\n              <div class=\"form-element form-input\">\r\n                <input formControlName=\"email\" class=\"form-element-field\" placeholder=\"Username or Email\" type=\"input\"\r\n                  autofocus />\r\n                <div class=\"form-element-bar\"></div>\r\n                <label class=\"form-element-label\" for=\"field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9\">Name</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"loginForm.controls.email.invalid && (loginForm.controls.email.dirty || loginForm.controls.email.touched)\"\r\n                class=\"text-left errormsg\">\r\n                <span *ngIf=\"loginForm.controls.email.errors.maxlength\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Cannot enter more then 100\r\n                    characters</span>\r\n                </span>\r\n                <span *ngIf=\"loginForm.controls.email.errors.pattern && !loginForm.controls.email.errors.maxlength\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter valid email\r\n                    address</span>\r\n                </span>\r\n                <span *ngIf=\"loginForm.controls.email.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter email\r\n                    address</span>\r\n                </span>\r\n              </div>\r\n              <div class=\"text-left errormsg\">\r\n                <span *ngIf=\"invalidEmail\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\" aria-hidden=\"true\"></i> <span class=\"errtext\"> Oops! Email\r\n                    address is incorrect</span>\r\n                </span>\r\n              </div>\r\n\r\n              <div class=\"form-element form-input\">\r\n                <input id=\"field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9\" formControlName=\"password\"\r\n                  class=\"form-element-field\" placeholder=\"Enter valid password.\" type=\"password\" required />\r\n                <div class=\"form-element-bar\"></div>\r\n                <label class=\"form-element-label\" for=\"field-omv6eo-metm0n-5j55wv-w3wbws-6nm2b9\">Password</label>\r\n                <div\r\n                  *ngIf=\"loginForm.controls.password.invalid && (loginForm.controls.password.dirty || loginForm.controls.password.touched)\"\r\n                  class=\"text-left errormsg\">\r\n                  <span *ngIf=\"loginForm.controls.password.errors.minlength\">\r\n                    <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Minimum 6 characters\r\n                      required</span>\r\n                  </span>\r\n                  <span *ngIf=\"loginForm.controls.password.errors.required\">\r\n                    <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter password</span>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"m-30\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-lg-12\">\r\n                    <div class=\"d-flex justify-content-between\">\r\n                      <div class=\"forgot\" style=\"cursor:pointer\" [routerLink]=\"['/forgotpassword']\">Forgot Password?\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"d-flex justify-content-between\">\r\n                      <div class=\"forgot\" style=\"cursor:pointer\" [routerLink]=\"['/parentsregistration']\">Parent\r\n                        Registration</div>\r\n                    </div>\r\n\r\n                    <div class=\"d-flex justify-content-between\">\r\n                      <div class=\"forgot\" style=\"cursor:pointer\" [routerLink]=\"['/agencyregistration']\">Agency\r\n                        Registration</div>\r\n                    </div>\r\n\r\n                    <div class=\"d-flex justify-content-between\">\r\n                      <div class=\"forgot\" style=\"cursor:pointer\" [routerLink]=\"['/kiosklogin']\">Kiosk Login</div>\r\n                    </div>\r\n\r\n                    \r\n                  </div>\r\n\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </fieldset>\r\n            <button type=\"button\" [disabled]=\"!loginForm.valid\" class=\"btn btn-success\"\r\n              (click)=\"doLogin($event)\">Login</button>\r\n\r\n          </form>\r\n\r\n          <div class=\"topkid\">\r\n            <img src=\"assets/img/top.png\" alt=\"\">\r\n          </div>\r\n\r\n          <div class=\"bottomkid\">\r\n            <img src=\"assets/img/kids.png\" alt=\"\">\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/auth/components/login/login.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/auth/components/login/login.component.ts ***!
  \**********************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/services/auth-api-service/auth-api.service */ "./src/app/auth/shared/services/auth-api-service/auth-api.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/auth/shared/constant.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, router, toaster, apiService, error, spinner, notification, commonService) {
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.showEmail = true;
        this.emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.commonService.incidentData = new rxjs__WEBPACK_IMPORTED_MODULE_9__["ReplaySubject"]();
        this.commonService.userProfileData = new rxjs__WEBPACK_IMPORTED_MODULE_9__["ReplaySubject"]();
        this.commonService.fullNameObj = new rxjs__WEBPACK_IMPORTED_MODULE_9__["ReplaySubject"]();
        this.invalidEmail = false;
        this.invalidPassword = false;
        this.loginForm = this.fb.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.emailPattern), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(6)]]
        });
    };
    // get email() { return this.loginForm.get('email'); }
    // get password() { return this.loginForm.get('password'); }
    LoginComponent.prototype.doLogin = function (event) {
        var _this = this;
        if ((event.keyCode === 13 || event.type === 'click') && this.loginForm.valid) {
            this.spinner.show();
            var data = {
                'emailAddress': this.loginForm.value.email,
                'password': this.loginForm.value.password,
                'OSType': 3,
                'BusinessToken': localStorage.getItem('fcmtkn')
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_5__["AuthAPIURls"].login, data, null).subscribe(function (res) {
                _this.spinner.hide();
                if (res.body) {
                    if (res.body.access_token) {
                        //  this.commonService.saveLoginUserDetails(res.body.data); // this method is alternate for local storage
                        if (res.body.data.roleId === 3 && res.body.data.teacherTodayAttendenceStatusId === 2
                            && res.body.data.isSubscriptionActive === true) {
                            _this.notification.warning({ message: 'You are clocked out for today', title: '' });
                        }
                        else if (res.body.data.roleId === 3 && res.body.data.isSubscriptionActive === false) {
                            _this.notification.warning({ message: 'Please contact to agency admin ', title: 'Subscription expired!' });
                        }
                        else if (res.body.data.roleId === 2 && res.body.data.isApprovedAgency === false) {
                            _this.notification.warning({ message: 'This account is not approved ', title: 'Contact to admin!' });
                        }
                        else {
                            localStorage.setItem('teacherTodayAttendenceId', res.body.data.teacherTodayAttendenceId);
                            _this.commonService.isSubscriptionActive = res.body.data.isSubscriptionActive;
                            _this.commonService.setUserDetails('userdetails', res.body);
                            _this.loginSuccess(res.body.data);
                        }
                    }
                    else {
                        _this.loginForm.reset();
                        // tslint:disable-next-line: comment-format
                        //this.notification.error({message: 'Invalid email address or password', title: 'Oops!'});
                        _this.notification.warning({ message: res.body.message, title: 'Oops!' });
                    }
                }
                else {
                    _this.spinner.hide();
                    _this.loginForm.reset();
                    _this.error.unknownError();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.loginForm.reset();
                _this.error.commonError(err);
            });
        }
    };
    LoginComponent.prototype.loginSuccess = function (data) {
        localStorage.setItem('imagepath', data.imagePath);
        localStorage.setItem('iskiosklogin', 'false');
        if (data.roleId === 1) {
            // localStorage.setItem('isauthenticated', 'true');
            localStorage.setItem('path', '/home/superadmin');
            //  localStorage.setItem('usertype', '1');
            this.router.navigate(['/home/superadmin']);
            this.toaster.success({ message: '', title: 'Welcome' });
        }
        else if (data.roleId === 2) {
            //  localStorage.setItem('isauthenticated', 'true');
            localStorage.setItem('path', '/home/agencydashboard');
            //  localStorage.setItem('usertype', '2');
            this.router.navigate(['/home/agencydashboard']);
            this.toaster.success({ message: '', title: 'Welcome' });
        }
        else if (data.roleId === 3) {
            // tslint:disable-next-line:max-line-length
            localStorage.setItem('isteacherclockedin', data.teacherTodayAttendenceStatusId); // 0 for not clockedin, 1 for clockedin 2 for clocked out
            localStorage.setItem('isauthenticated', 'true');
            localStorage.setItem('path', '/home/teacherdashboard');
            //  localStorage.setItem('usertype', '3');
            this.router.navigate(['/home/teacherdashboard']);
            this.toaster.success({ message: '', title: 'Welcome' });
            // this.commonService.getUserRole('userdetails');
        }
        else if (data.roleId === 4) {
            //   localStorage.setItem('isauthenticated', 'true');
            localStorage.setItem('path', '/home/parentdashboard');
            //  localStorage.setItem('usertype', '4');
            this.router.navigate(['/home/parentdashboard']);
            this.toaster.success({ message: '', title: 'Welcome' });
        }
        else {
        }
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/auth/components/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/auth/components/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"], _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_4__["AuthApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_7__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"], _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_8__["CommonService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/auth/components/parents-registration/parents-registration.component.css":
/*!*****************************************************************************************!*\
  !*** ./src/app/auth/components/parents-registration/parents-registration.component.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* .bgblue{background: #58A7FE!important} */\r\nhtml, body{height: 100vh;}\r\n.pt-100{padding-top:30px }\r\n.bgblue h1{font-size: 30px;text-align: center;color: #FF6C6C;margin-bottom: 100px}\r\n.bgblue h1 span{color: #58A7FE;font-weight: 600}\r\n.bgblue {\r\n  background: #fffaf3;\r\n  height: auto;\r\n  /* display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center; */\r\n  padding-top: 80px;\r\n}\r\n.btn-success{\r\n    width: 100%;\r\n    padding: 12px 0;\r\n    border: 0;\r\n    background: #FF6C6C;\r\n    font-size: 18px;\r\n    border-radius: 0 0 10px 10px;\r\n}\r\n.login {\r\n  background: #FF6C6C;\r\n  font-size: 18px;\r\n  padding: 13px 35px;\r\n  color: #fff;\r\n}\r\n.forgot{font-size: 14px; color: #58A7FE;font-weight: 400}\r\n.m-30{margin: 30px 0;}\r\n.btn-success:not(:disabled):not(.disabled):active{background: #337ab7;border-color:#337ab7 }\r\n.an-header{top:0;height: 50px;padding: 0}\r\n.an-logo-heading{font-size: 15px;padding-left:30px }\r\n.btnfooter{    background: #FFFFFF;\r\n  padding: 14px;box-shadow: 0 0 20px 2px rgba(153, 153, 153, 0.4)}\r\n.btnfooter p{padding: 0;margin: 0}\r\n.loginbox { position: relative;\r\n    margin-top: -10%;\r\n  }\r\n.loginbox .checkboxcustom{padding-left:30px }\r\n.loginbox .topkid{position: absolute;\r\n    top: -70px;\r\n    text-align: center;\r\n    right: 0;\r\n    }\r\n.loginbox .bottomkid{position: absolute;\r\n      bottom: -40px;\r\n      text-align: center;\r\n      left: -70px;\r\n      }\r\n.loginbox .bottomkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.loginbox .topkid img{    height: 120px;\r\n      margin: 0 auto;}\r\n.form-fieldset{\r\n        padding: 20px;\r\n      }\r\n/* .form-card{background: url('../../../../assets/img/back.png'); */\r\n/* } */\r\n.login-head {\r\n  background: #fffaf3;\r\n  text-align: center;\r\n}\r\n.login-head img {\r\n  width: 210px;\r\n}\r\n@media (max-width:992px) {\r\n  .div12 img {\r\n    display: none;\r\n  }\r\n}\r\n@media (max-width: 640px)\r\n{\r\n.an-topbar-left-part {\r\n   background: #fff;\r\n   }\r\n.form-card{width: 90%}\r\n.an-header{flex-direction: row}\r\n.an-logo-heading{\r\n  padding: 0\r\n}\r\n}\r\n@media (max-width: 480px) {\r\n  .login-head img {\r\n    width: 80%;\r\n  }\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9jb21wb25lbnRzL3BhcmVudHMtcmVnaXN0cmF0aW9uL3BhcmVudHMtcmVnaXN0cmF0aW9uLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMkNBQTJDO0FBQzNDLFdBQVcsYUFBYSxDQUFDO0FBQ3pCLFFBQVEsaUJBQWlCO0FBQ3pCLFdBQVcsZUFBZSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxvQkFBb0I7QUFDakYsZ0JBQWdCLGNBQWMsQ0FBQyxnQkFBZ0I7QUFDL0M7RUFDRSxtQkFBbUI7RUFDbkIsWUFBWTtFQUNaOzs7NEJBRzBCO0VBQzFCLGlCQUFpQjtBQUNuQjtBQUNBO0lBQ0ksV0FBVztJQUNYLGVBQWU7SUFDZixTQUFTO0lBQ1QsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZiw0QkFBNEI7QUFDaEM7QUFDQTtFQUNFLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLFdBQVc7QUFDYjtBQUVBLFFBQVEsZUFBZSxFQUFFLGNBQWMsQ0FBQyxnQkFBZ0I7QUFDeEQsTUFBTSxjQUFjLENBQUM7QUFFckIsa0RBQWtELG1CQUFtQixDQUFDLHFCQUFxQjtBQUMzRixXQUFXLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVTtBQUN4QyxpQkFBaUIsZUFBZSxDQUFDLGtCQUFrQjtBQUNuRCxlQUFlLG1CQUFtQjtFQUNoQyxhQUFhLENBQUMsaURBQWlEO0FBQy9ELGFBQWEsVUFBVSxDQUFDLFNBQVM7QUFHakMsWUFBWSxrQkFBa0I7SUFDNUIsZ0JBQWdCO0VBQ2xCO0FBQ0EsMEJBQTBCLGtCQUFrQjtBQUM1QyxrQkFBa0Isa0JBQWtCO0lBQ2xDLFVBQVU7SUFDVixrQkFBa0I7SUFDbEIsUUFBUTtJQUNSO0FBRUEscUJBQXFCLGtCQUFrQjtNQUNyQyxhQUFhO01BQ2Isa0JBQWtCO01BQ2xCLFdBQVc7TUFDWDtBQUVGLDZCQUE2QixhQUFhO01BQ3hDLGNBQWMsQ0FBQztBQUVqQiwwQkFBMEIsYUFBYTtNQUNyQyxjQUFjLENBQUM7QUFFZjtRQUNFLGFBQWE7TUFDZjtBQUVOLG1FQUFtRTtBQUVuRSxNQUFNO0FBQ047RUFDRSxtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFFQTtFQUNFO0lBQ0UsYUFBYTtFQUNmO0FBQ0Y7QUFDQTs7QUFFQTtHQUNHLGdCQUFnQjtHQUNoQjtBQUNILFdBQVcsVUFBVTtBQUNyQixXQUFXLG1CQUFtQjtBQUM5QjtFQUNFO0FBQ0Y7QUFDQTtBQUNBO0VBQ0U7SUFDRSxVQUFVO0VBQ1o7QUFDRiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvY29tcG9uZW50cy9wYXJlbnRzLXJlZ2lzdHJhdGlvbi9wYXJlbnRzLXJlZ2lzdHJhdGlvbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogLmJnYmx1ZXtiYWNrZ3JvdW5kOiAjNThBN0ZFIWltcG9ydGFudH0gKi9cclxuaHRtbCwgYm9keXtoZWlnaHQ6IDEwMHZoO31cclxuLnB0LTEwMHtwYWRkaW5nLXRvcDozMHB4IH1cclxuLmJnYmx1ZSBoMXtmb250LXNpemU6IDMwcHg7dGV4dC1hbGlnbjogY2VudGVyO2NvbG9yOiAjRkY2QzZDO21hcmdpbi1ib3R0b206IDEwMHB4fVxyXG4uYmdibHVlIGgxIHNwYW57Y29sb3I6ICM1OEE3RkU7Zm9udC13ZWlnaHQ6IDYwMH1cclxuLmJnYmx1ZSB7XHJcbiAgYmFja2dyb3VuZDogI2ZmZmFmMztcclxuICBoZWlnaHQ6IGF1dG87XHJcbiAgLyogZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7ICovXHJcbiAgcGFkZGluZy10b3A6IDgwcHg7XHJcbn1cclxuLmJ0bi1zdWNjZXNze1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiAxMnB4IDA7XHJcbiAgICBib3JkZXI6IDA7XHJcbiAgICBiYWNrZ3JvdW5kOiAjRkY2QzZDO1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMCAwIDEwcHggMTBweDtcclxufVxyXG4ubG9naW4ge1xyXG4gIGJhY2tncm91bmQ6ICNGRjZDNkM7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIHBhZGRpbmc6IDEzcHggMzVweDtcclxuICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLmZvcmdvdHtmb250LXNpemU6IDE0cHg7IGNvbG9yOiAjNThBN0ZFO2ZvbnQtd2VpZ2h0OiA0MDB9XHJcbi5tLTMwe21hcmdpbjogMzBweCAwO31cclxuXHJcbi5idG4tc3VjY2Vzczpub3QoOmRpc2FibGVkKTpub3QoLmRpc2FibGVkKTphY3RpdmV7YmFja2dyb3VuZDogIzMzN2FiNztib3JkZXItY29sb3I6IzMzN2FiNyB9XHJcbi5hbi1oZWFkZXJ7dG9wOjA7aGVpZ2h0OiA1MHB4O3BhZGRpbmc6IDB9XHJcbi5hbi1sb2dvLWhlYWRpbmd7Zm9udC1zaXplOiAxNXB4O3BhZGRpbmctbGVmdDozMHB4IH1cclxuLmJ0bmZvb3RlcnsgICAgYmFja2dyb3VuZDogI0ZGRkZGRjtcclxuICBwYWRkaW5nOiAxNHB4O2JveC1zaGFkb3c6IDAgMCAyMHB4IDJweCByZ2JhKDE1MywgMTUzLCAxNTMsIDAuNCl9XHJcbiAgLmJ0bmZvb3RlciBwe3BhZGRpbmc6IDA7bWFyZ2luOiAwfVxyXG5cclxuXHJcbiAgLmxvZ2luYm94IHsgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbWFyZ2luLXRvcDogLTEwJTtcclxuICB9XHJcbiAgLmxvZ2luYm94IC5jaGVja2JveGN1c3RvbXtwYWRkaW5nLWxlZnQ6MzBweCB9XHJcbiAgLmxvZ2luYm94IC50b3BraWR7cG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAtNzBweDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgfVxyXG5cclxuICAgIC5sb2dpbmJveCAuYm90dG9ta2lke3Bvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgYm90dG9tOiAtNDBweDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBsZWZ0OiAtNzBweDtcclxuICAgICAgfVxyXG5cclxuICAgIC5sb2dpbmJveCAuYm90dG9ta2lkIGltZ3sgICAgaGVpZ2h0OiAxMjBweDtcclxuICAgICAgbWFyZ2luOiAwIGF1dG87fVxyXG5cclxuICAgIC5sb2dpbmJveCAudG9wa2lkIGltZ3sgICAgaGVpZ2h0OiAxMjBweDtcclxuICAgICAgbWFyZ2luOiAwIGF1dG87fVxyXG5cclxuICAgICAgLmZvcm0tZmllbGRzZXR7XHJcbiAgICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgfVxyXG5cclxuLyogLmZvcm0tY2FyZHtiYWNrZ3JvdW5kOiB1cmwoJy4uLy4uLy4uLy4uL2Fzc2V0cy9pbWcvYmFjay5wbmcnKTsgKi9cclxuXHJcbi8qIH0gKi9cclxuLmxvZ2luLWhlYWQge1xyXG4gIGJhY2tncm91bmQ6ICNmZmZhZjM7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi5sb2dpbi1oZWFkIGltZyB7XHJcbiAgd2lkdGg6IDIxMHB4O1xyXG59XHJcbiBcclxuQG1lZGlhIChtYXgtd2lkdGg6OTkycHgpIHtcclxuICAuZGl2MTIgaW1nIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG59IFxyXG5AbWVkaWEgKG1heC13aWR0aDogNjQwcHgpXHJcbntcclxuLmFuLXRvcGJhci1sZWZ0LXBhcnQge1xyXG4gICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gICB9XHJcbi5mb3JtLWNhcmR7d2lkdGg6IDkwJX1cclxuLmFuLWhlYWRlcntmbGV4LWRpcmVjdGlvbjogcm93fVxyXG4uYW4tbG9nby1oZWFkaW5ne1xyXG4gIHBhZGRpbmc6IDBcclxufVxyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xyXG4gIC5sb2dpbi1oZWFkIGltZyB7XHJcbiAgICB3aWR0aDogODAlO1xyXG4gIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/auth/components/parents-registration/parents-registration.component.html":
/*!******************************************************************************************!*\
  !*** ./src/app/auth/components/parents-registration/parents-registration.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-head\">\r\n  <img src=\"assets/img/logo-big-new.png\" alt=\"\">\r\n</div>\r\n<div class=\"bgblue\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-8\">\r\n        <div class=\"div12\">\r\n          <img src=\"assets/img/bg.png\" alt=\"\">\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-lg-4 \" *ngIf=\"!showMessage\">\r\n        <div class=\"loginbox\">\r\n          <form class=\"form-card\" [formGroup]=\"registrationForm\">\r\n            <div class=\"title\">\r\n              <h3>PARENTS REGISTRATION</h3>\r\n            </div>\r\n            <fieldset class=\"form-fieldset\">\r\n\r\n              <div class=\"form-element form-input\">\r\n                <input formControlName=\"firstname\" class=\"form-element-field\" placeholder=\"Enter First Name\" type=\"text\"\r\n                  (keypress)=\"commonService.allowAlphabetOnly($event)\" autofocus />\r\n                <div class=\"form-element-bar\"></div>\r\n                <label class=\"form-element-label\" for=\"\">First Name</label>\r\n              </div>\r\n              <div *ngIf=\"f.firstname.invalid && (f.firstname.dirty || f.firstname.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.firstname.errors.minlength\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Minimum 3 characters\r\n                    required</span>\r\n                </span>\r\n                <span *ngIf=\"f.firstname.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter first name</span>\r\n                </span>\r\n              </div>\r\n\r\n              <div class=\"form-element form-input\">\r\n                <input formControlName=\"lastname\" class=\"form-element-field\"\r\n                  (keypress)=\"commonService.allowAlphabetOnly($event)\" placeholder=\"Enter confirm password.\"\r\n                  type=\"text\" />\r\n                <div class=\"form-element-bar\"></div>\r\n                <label class=\"form-element-label\" for=\"\">Last Name</label>\r\n              </div>\r\n              <div *ngIf=\"f.lastname.invalid && (f.lastname.dirty || f.lastname.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.lastname.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter last name</span>\r\n                </span>\r\n              </div>\r\n\r\n              <div class=\"form-element form-input\">\r\n                <input formControlName=\"email\" class=\"form-element-field\" maxlength=\"100\"\r\n                  placeholder=\"Enter Email address.\" type=\"email\" />\r\n                <div class=\"form-element-bar\"></div>\r\n                <label class=\"form-element-label\" for=\"\">Email Address</label>\r\n              </div>\r\n              <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.email.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter email</span>\r\n                </span>\r\n                <span *ngIf=\"f.email.errors.pattern\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter valid email\r\n                    address</span>\r\n                </span>\r\n              </div>\r\n\r\n              <div class=\"form-element form-input\">\r\n                <select class=\"form-control\" placeholder=\"Agency\" formControlName=\"agencyList\"\r\n                  (change)=\"selectAgency($event.target.value)\">\r\n                  <option value=\"\" class=\"form-element-label\" for=\"\">Select Agency</option>\r\n                  <option *ngFor=\"let agency of agencyList\" class=\"form-element-field\" [value]=\"agency.id\">\r\n                    {{agency.agencyName}}</option>\r\n                </select>\r\n              </div>\r\n              <div *ngIf=\"f.agencyList.invalid && (f.agencyList.dirty || f.agencyList.touched)\"\r\n                class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.agencyList.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please select agency</span>\r\n                </span>\r\n              </div>\r\n\r\n\r\n\r\n            </fieldset>\r\n            <button type=\"button\" [disabled]=\"!registrationForm.valid\" (click)=\"registerParentProfile()\"\r\n              class=\"btn btn-success\">Save</button>\r\n          </form>\r\n\r\n          <div class=\"topkid\">\r\n            <img src=\"assets/img/top.png\" alt=\"\">\r\n          </div>\r\n\r\n          <div class=\"bottomkid\">\r\n            <img src=\"assets/img/kids.png\" alt=\"\">\r\n          </div>\r\n          \r\n        </div>\r\n      </div>\r\n      <!-- Success Message -->\r\n      <div class=\"col-lg-4\" *ngIf=\"showMessage\">\r\n        <div class=\"loginbox\">\r\n          <div class=\"form-card\">\r\n            <div class=\"title\">\r\n              <h3 style=\"color: #FF6C6C\">Great!!</h3>\r\n            </div>\r\n            <fieldset class=\"form-fieldset\">\r\n              <!-- <div class=\"form-element form-input\"> -->\r\n              <p style=\"color:#58A7FE\"> Please check your registerd email to create password!</p>\r\n              <!-- </div> -->\r\n              <!-- <a [routerLink]=\"['/']\" style=\"cursor:pointer\">Go To Login</a> -->\r\n            </fieldset>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n<app-confirm-box></app-confirm-box>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/auth/components/parents-registration/parents-registration.component.ts":
/*!****************************************************************************************!*\
  !*** ./src/app/auth/components/parents-registration/parents-registration.component.ts ***!
  \****************************************************************************************/
/*! exports provided: ParentsRegistrationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParentsRegistrationComponent", function() { return ParentsRegistrationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/services/auth-api-service/auth-api.service */ "./src/app/auth/shared/services/auth-api-service/auth-api.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/auth/shared/constant.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_10__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ParentsRegistrationComponent = /** @class */ (function () {
    function ParentsRegistrationComponent(apiService, error, confirmationService, spinner, notification, datepipe, commonService, fb, route) {
        this.apiService = apiService;
        this.error = error;
        this.confirmationService = confirmationService;
        this.spinner = spinner;
        this.notification = notification;
        this.datepipe = datepipe;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
        this.loader = true;
        this.agencyList = [];
        this.status = 1;
        this.totalRecord = 0;
        this.nameSearch = '';
        this.pageNo = 0;
        this.limit = 0;
        this.linkedChildList = [];
        this.flag = false;
    }
    ParentsRegistrationComponent.prototype.ngOnInit = function () {
        console.log('sdf', this.commonService.getUserMail());
        this.validateRegistration();
        this.getAllAgency();
        this.parentVM = {};
        this.short = this.datepipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
    };
    ParentsRegistrationComponent.prototype.validateRegistration = function () {
        this.registrationForm = this.fb.group({
            firstname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)]],
            lastname: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(3)]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.emailPattern)]],
            agencyList: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
        });
    };
    Object.defineProperty(ParentsRegistrationComponent.prototype, "f", {
        get: function () { return this.registrationForm.controls; },
        enumerable: true,
        configurable: true
    });
    ParentsRegistrationComponent.prototype.getAllAgency = function () {
        var _this = this;
        this.spinner.show();
        this.agencyList = [];
        if (!this.registrationForm.valid) {
            var req = {
                'limit': this.limit,
                'page': this.pageNo,
                'status': this.status,
                'AgencyName': this.nameSearch,
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["AuthAPIURls"].GetAllAgencyList, req, null).subscribe(function (res) {
                _this.totalRecord = res.body.totalRows;
                if (res.body.statusCode === 200) {
                    _this.spinner.hide();
                    _this.agencyList = res.body.data;
                }
                else {
                    _this.showMessage = false;
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
            this.commonService.validateAllFields(this.registrationForm);
        }
    };
    ParentsRegistrationComponent.prototype.registerParentProfile = function () {
        var _this = this;
        this.linkedChildList = [];
        if (this.registrationForm.valid) {
            this.spinner.show();
            this.parentVM.FirstName = this.registrationForm.value.firstname;
            this.parentVM.LastName = this.registrationForm.value.lastname;
            this.parentVM.EmailId = this.registrationForm.value.email;
            this.parentVM.isParent = true;
            this.parentVM.AgencyID = this.registrationForm.value.agencyList;
            this.parentVM.createdBy = this.registrationForm.value.agencyList;
            this.spinner.hide();
            console.log('data', this.parentVM);
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["AuthAPIURls"].RegisterParentInformation, this.parentVM, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    _this.flag = false;
                    _this.showMessage = true;
                    _this.notification.success({ message: 'New user created successfully!', title: '' });
                    _this.spinner.hide();
                }
                else if (res.body.statusCode === 986) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: ' User already exist !', title: '' });
                }
                else if (res.body.statusCode === 205) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'Please enter valid name', title: '' });
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
            this.commonService.validateAllFields(this.registrationForm);
        }
    };
    ParentsRegistrationComponent.prototype.selectAgency = function (value) {
        var _this = this;
        if (value === '') {
            this.notification.warning({ message: 'Please select agency', title: '' });
        }
        else {
            this.confirmationService.confirm({
                message: 'Are you sure you want to join this agency?',
                accept: function () {
                    _this.notification.success({ message: 'Agency selected successfully', title: '' });
                },
                reject: function () {
                    _this.registrationForm.get('agencyList').reset('');
                }
            });
        }
    };
    ParentsRegistrationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-parents-registration',
            template: __webpack_require__(/*! ./parents-registration.component.html */ "./src/app/auth/components/parents-registration/parents-registration.component.html"),
            styles: [__webpack_require__(/*! ./parents-registration.component.css */ "./src/app/auth/components/parents-registration/parents-registration.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_auth_api_service_auth_api_service__WEBPACK_IMPORTED_MODULE_6__["AuthApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"], primeng_api__WEBPACK_IMPORTED_MODULE_10__["ConfirmationService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"]])
    ], ParentsRegistrationComponent);
    return ParentsRegistrationComponent;
}());



/***/ }),

/***/ "./src/app/auth/shared/confirm-box/confirm-box.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/auth/shared/confirm-box/confirm-box.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2F1dGgvc2hhcmVkL2NvbmZpcm0tYm94L2NvbmZpcm0tYm94LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/auth/shared/confirm-box/confirm-box.component.html":
/*!********************************************************************!*\
  !*** ./src/app/auth/shared/confirm-box/confirm-box.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div  class=\"confirmationInfo custom-modal-box\">\r\n  <p-confirmDialog  [acceptIcon]=\"false\" acceptLabel=\"{{buttonText}}\" [responsive]=\"true\" [rejectVisible]=\"rejectVisible\" [rejectIcon]=\"false\" header=\"Confirmation\" [closable]=\"false\" icon=\"pi pi-exclamation-triangle\" width=\"425\" #cd>\r\n      \r\n      <p-footer>\r\n        <button type=\"button\" pButton  label=\"No\" (click)=\"cd.reject()\" ></button>\r\n        <button type=\"button\" pButton style=\"background:#FF6C6C\"   label=\"Yes\"  (click)=\"cd.accept()\"></button>\r\n    </p-footer>\r\n  </p-confirmDialog>\r\n  </div>"

/***/ }),

/***/ "./src/app/auth/shared/confirm-box/confirm-box.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/auth/shared/confirm-box/confirm-box.component.ts ***!
  \******************************************************************/
/*! exports provided: ConfirmBoxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmBoxComponent", function() { return ConfirmBoxComponent; });
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

var ConfirmBoxComponent = /** @class */ (function () {
    function ConfirmBoxComponent() {
        this.IsLabel = false;
    }
    ConfirmBoxComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ConfirmBoxComponent.prototype, "IsLabel", void 0);
    ConfirmBoxComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-confirm-box',
            template: __webpack_require__(/*! ./confirm-box.component.html */ "./src/app/auth/shared/confirm-box/confirm-box.component.html"),
            styles: [__webpack_require__(/*! ./confirm-box.component.css */ "./src/app/auth/shared/confirm-box/confirm-box.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ConfirmBoxComponent);
    return ConfirmBoxComponent;
}());



/***/ }),

/***/ "./src/app/auth/shared/constant.ts":
/*!*****************************************!*\
  !*** ./src/app/auth/shared/constant.ts ***!
  \*****************************************/
/*! exports provided: AuthAPIURls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthAPIURls", function() { return AuthAPIURls; });
var AuthAPIURls = {
    /**Login Page */
    login: 'api/User/login',
    GetClassAttendence: 'api/Teacher/GetClassAttendence',
    ForgotPassword: 'api/Common/ForgotPassword',
    CreatePassword: 'api/Common/CreatePassword',
    GetAllAgencyList: 'api/Common/GetAllAgencyList',
    RegisterParentInformation: 'api/Common/RegisterParentInformation',
    /** Login for kiosk */
    loginforKioskWeb: 'api/User/loginforKioskWeb',
    AgencyLoginForKiosk: 'api/User/AgencyLoginForKiosk',
    // Get All pricing plan list
    GetAllPricingPlanDetails: 'api/Common/GetAllPricingPlanDetails',
    GetAllCountry: 'api/Common/GetAllCountry',
    GetAllStates: 'api/Common/GetAllStates',
    GetAllCities: 'api/Common/GetAllCities',
    AgencyRegistration: 'api/Common/AgencyRegistration'
};


/***/ }),

/***/ "./src/app/auth/shared/services/auth-api-service/auth-api.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/auth/shared/services/auth-api-service/auth-api.service.ts ***!
  \***************************************************************************/
/*! exports provided: AuthApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthApiService", function() { return AuthApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_api_service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/services/api-service/api.service */ "./src/app/shared/services/api-service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthApiService = /** @class */ (function () {
    function AuthApiService(apiService) {
        this.apiService = apiService;
    }
    /**API to get projects by  user email  */
    AuthApiService.prototype.getData = function (url, data) {
        return this.apiService.getData(url, data);
    };
    AuthApiService.prototype.postData = function (url, data, params) {
        return this.apiService.postData(url, data, params);
    };
    AuthApiService.prototype.deleteData = function (url, params) {
        return this.apiService.deleteData(url, params);
    };
    AuthApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_services_api_service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], AuthApiService);
    return AuthApiService;
}());



/***/ }),

/***/ "./src/app/layout/parent/shared/constant.ts":
/*!**************************************************!*\
  !*** ./src/app/layout/parent/shared/constant.ts ***!
  \**************************************************/
/*! exports provided: ParentAPIURLs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParentAPIURLs", function() { return ParentAPIURLs; });
var ParentAPIURLs = {
    // Child Form page
    GetParentInformation: 'api/Parent/GetParentInformation',
    GetParentUpdatedInformation: 'api/Parent/GetParentUpdatedInformation',
    DeleteParentUpdatedInformation: 'api/Parent/DeleteParentUpdatedInformation',
    GetAllStudentsOfParent: 'api/Parent/GetAllStudentsOfParent',
    GetAllStudentsForEnroll: 'api/Parent/GetAllStudentsForEnroll',
    SaveParentInformation: 'api/Parent/SaveParentInformation',
    SaveStudent: 'api/Parent/SaveStudent',
    ActivateStudent: 'api/Agency/ActivateStudent',
    SaveStudentGaurdians: 'api/Parent/SaveStudentGaurdians',
    SaveStudentMedication: 'api/Parent/SaveStudentMedication',
    GetRelationType: 'api/Masters/GetRelationType',
    GetAllDoseRepeat: 'api/Masters/GetAllDoseRepeat',
    GetImmunizationType: 'api/Masters/GetImmunizationType',
    SaveStudentImmunization: 'api/Parent/SaveStudentImmunization',
    SaveStudentDisabilities: 'api/Parent/SaveStudentDisabilities',
    GetAllergyType: 'api/Masters/GetAllergyType',
    GetAllergyReactionType: 'api/Masters/GetAllergyReactionType',
    GetAllergyName: 'api/Masters/GetAllergyName',
    SaveStudentAllergies: 'api/Parent/SaveStudentAllergies',
    // Attendance Page
    GetStudentClassEnrollment: 'api/Parent/GetStudentClassEnrollment',
    GetAttendanceListforparent: 'api/Parent/GetAttendanceListforparent',
    SaveStudentEnrollment: 'api/Parent/SaveStudentEnrollment',
    // daily activity report page
    GetDailySheetForParent: 'api/Parent/GetDailySheetForParent',
    GetParticularStudentActivityDiaperChanges: 'api/Classes/GetParticularStudentActivityDiaperChanges',
    GetParticularStudentActivityNap: 'api/Classes/GetParticularStudentActivityNap',
    GetParticularStudentOtherActivity: 'api/Classes/GetParticularStudentOtherActivity',
    GetParticularStudentActivityMoods: 'api/Classes/GetParticularStudentActivityMoods',
    GetParticularStudentActivityNotes: 'api/Classes/GetParticularStudentActivityNotes',
    GetParticularStudentActivityMedications: 'api/Classes/GetParticularStudentActivityMedications',
    GetParticularStudentActivityMeals: 'api/Classes/GetParticularStudentActivityMeals',
    GetAllPostActivitiesByChildID: 'api/Parent/GetAllPostActivitiesByChildID',
    // Dashboardpage
    SaveParentDashboardImagedLikeInformation: 'api/Parent/SaveParentDashboardImagedLikeInformation',
    SaveParentDashboardVideoLikeInformation: 'api/Parent/SaveParentDashboardVideoLikeInformation',
    GetAllParentInformation: 'api/Parent/GetAllParentInformation',
    PaymentDetails: 'api/Masters/PaymentDetails',
    PayPayment: 'api/Masters/PayPayment',
    //GetDuePaymentAccordingToParent: 'api/Masters/GetDuePaymentAccordingToParent',
    GetBalanceAccordingToParent: 'api/Masters/GetBalanceAccordingToParent',
    // Payment page
    GetPaymentDetailsForParent: 'api/Masters/GetPaymentDetailsForParent',
    GetPaymentDetailForParent: 'api/Masters/GetPaymentDetailForParent',
    // Message
    GetAssociatedTeacherListForChat: 'api/Message/GetAssociatedTeacherListForChat',
    GetMessageByID: 'api/Message/GetMessageByID',
    GetListForChat: 'api/Message/GetListForChat',
    SaveAdvanceFeePaymentDetails: 'api/Masters/SaveAdvanceFeePaymentDetails',
    UnreadMessageByID: 'api/Message/UnreadMessageByID',
    // Get Parent Address
    GetParentAddress: 'api/Parent/GetParentAddress',
    // Update data of Student's Enroll class
    UpdateStudentEnrollment: 'api/Parent/UpdateStudentEnrollment',
    // tslint:disable-next-line: comment-format
    //For ACH Information
    SaveACHInformationByParentID: 'api/Masters/SaveACHInformationByParentID',
    GetACHInformationByParentID: 'api/Masters/GetACHInformationByParentID',
    SaveRecurringPaymentByParentID: 'api/Masters/SaveRecurringPaymentByParentID',
    DeleteRecurringPaymentByParentID: 'api/Masters/DeleteRecurringPaymentByParentID',
    GetRecurringPaymentByParentID: 'api/Masters/GetRecurringPaymentByParentID',
    VerifyACHBankAccountByParentID: 'api/Masters/VerifyACHBankAccountByParentID',
    OneTimePaymentByACH: 'api/Masters/OneTimePaymentByACH',
    // Save Allergy By Super Admin
    SaveAllergyType: 'api/Masters/SaveAllergyType',
    SaveAllergyReactionType: 'api/Masters/SaveAllergyReactionType',
    SaveAllergyName: 'api/Masters/SaveAllergyName',
    // For Dose Repeat
    SaveAllDoseRepeat: 'api/Masters/SaveAllDoseRepeat',
    // Notification Setting
    GetNotificationSetting: 'api/Message/GetNotificationSetting',
    SaveNotificationSetting: 'api/Message/SaveNotificationSetting',
    // Save Coupon
    SaveCoupon: 'api/Masters/SaveCoupon',
    GetCoupons: 'api/Masters/GetCoupons',
    ActivateDeactivateCoupon: 'api/Masters/ActivateDeactivateCoupon',
    CheckCoupon: 'api/Masters/CheckCoupon',
    // For Deactivate Reason
    GetDeactivateReason: 'api/Masters/GetDeactivateReason',
    SaveDeactivateReason: 'api/Masters/SaveDeactivateReason'
};


/***/ })

}]);
//# sourceMappingURL=auth-auth-module.js.map