(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["admin-admin-module"],{

/***/ "./src/app/layout/admin/admin-routing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/admin/admin-routing.module.ts ***!
  \******************************************************/
/*! exports provided: AdminRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminRoutingModule", function() { return AdminRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_layout_admin_components_agency_list_agency_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/layout/admin/components/agency-list/agency-list.component */ "./src/app/layout/admin/components/agency-list/agency-list.component.ts");
/* harmony import */ var src_app_layout_admin_components_pricing_plan_pricing_plan_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/layout/admin/components/pricing-plan/pricing-plan.component */ "./src/app/layout/admin/components/pricing-plan/pricing-plan.component.ts");
/* harmony import */ var _components_plan_page_plan_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/plan-page/plan-page.component */ "./src/app/layout/admin/components/plan-page/plan-page.component.ts");
/* harmony import */ var _components_super_admin_dashboard_super_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/super-admin-dashboard/super-admin-dashboard.component */ "./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.ts");
/* harmony import */ var src_app_layout_admin_components_add_state_add_state_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/layout/admin/components/add-state/add-state.component */ "./src/app/layout/admin/components/add-state/add-state.component.ts");
/* harmony import */ var src_app_layout_admin_components_add_city_add_city_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/layout/admin/components/add-city/add-city.component */ "./src/app/layout/admin/components/add-city/add-city.component.ts");
/* harmony import */ var _components_add_info_video_add_info_video_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/add-info-video/add-info-video.component */ "./src/app/layout/admin/components/add-info-video/add-info-video.component.ts");
/* harmony import */ var _components_add_allergy_add_allergy_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/add-allergy/add-allergy.component */ "./src/app/layout/admin/components/add-allergy/add-allergy.component.ts");
/* harmony import */ var _components_add_coupon_add_coupon_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/add-coupon/add-coupon.component */ "./src/app/layout/admin/components/add-coupon/add-coupon.component.ts");
/* harmony import */ var _components_add_deactivate_reason_add_deactivate_reason_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/add-deactivate-reason/add-deactivate-reason.component */ "./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.ts");
/* harmony import */ var _components_text_plan_text_plan_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/text-plan/text-plan.component */ "./src/app/layout/admin/components/text-plan/text-plan.component.ts");
/* harmony import */ var _components_add_dose_add_dose_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/add-dose/add-dose.component */ "./src/app/layout/admin/components/add-dose/add-dose.component.ts");
/* harmony import */ var _components_policy_accept_list_policy_accept_list_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/policy-accept-list/policy-accept-list.component */ "./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.ts");
/* harmony import */ var _components_parent_list_parent_list_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/parent-list/parent-list.component */ "./src/app/layout/admin/components/parent-list/parent-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var routes = [
    {
        path: '',
        component: _components_super_admin_dashboard_super_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_5__["SuperAdminDashboardComponent"],
    },
    {
        path: 'agencylist',
        component: src_app_layout_admin_components_agency_list_agency_list_component__WEBPACK_IMPORTED_MODULE_2__["AgencyListComponent"]
    },
    {
        path: 'pricingplan',
        component: src_app_layout_admin_components_pricing_plan_pricing_plan_component__WEBPACK_IMPORTED_MODULE_3__["PricingPlanComponent"]
    },
    {
        path: 'planlist',
        component: _components_plan_page_plan_page_component__WEBPACK_IMPORTED_MODULE_4__["PlanPageComponent"]
    },
    {
        path: 'addstate',
        component: src_app_layout_admin_components_add_state_add_state_component__WEBPACK_IMPORTED_MODULE_6__["AddStateComponent"]
    },
    {
        path: 'addcity',
        component: src_app_layout_admin_components_add_city_add_city_component__WEBPACK_IMPORTED_MODULE_7__["AddCityComponent"]
    },
    {
        path: 'addinfovideo',
        component: _components_add_info_video_add_info_video_component__WEBPACK_IMPORTED_MODULE_8__["AddInfoVideoComponent"]
    },
    {
        path: 'addallergy',
        component: _components_add_allergy_add_allergy_component__WEBPACK_IMPORTED_MODULE_9__["AddAllergyComponent"]
    },
    {
        path: 'addcoupon',
        component: _components_add_coupon_add_coupon_component__WEBPACK_IMPORTED_MODULE_10__["AddCouponComponent"]
    },
    {
        path: 'addreason',
        component: _components_add_deactivate_reason_add_deactivate_reason_component__WEBPACK_IMPORTED_MODULE_11__["AddDeactivateReasonComponent"]
    },
    {
        path: 'textplan',
        component: _components_text_plan_text_plan_component__WEBPACK_IMPORTED_MODULE_12__["TextPlanComponent"]
    },
    {
        path: 'adddose',
        component: _components_add_dose_add_dose_component__WEBPACK_IMPORTED_MODULE_13__["AddDoseComponent"]
    },
    {
        path: 'policyacceptagency',
        component: _components_policy_accept_list_policy_accept_list_component__WEBPACK_IMPORTED_MODULE_14__["PolicyAcceptListComponent"]
    },
    {
        path: 'joinclassroomparent',
        component: _components_parent_list_parent_list_component__WEBPACK_IMPORTED_MODULE_15__["ParentListComponent"]
    }
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/admin/admin.module.ts":
/*!**********************************************!*\
  !*** ./src/app/layout/admin/admin.module.ts ***!
  \**********************************************/
/*! exports provided: AdminModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminModule", function() { return AdminModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _admin_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./admin-routing.module */ "./src/app/layout/admin/admin-routing.module.ts");
/* harmony import */ var _components_agency_list_agency_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/agency-list/agency-list.component */ "./src/app/layout/admin/components/agency-list/agency-list.component.ts");
/* harmony import */ var _components_pricing_plan_pricing_plan_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/pricing-plan/pricing-plan.component */ "./src/app/layout/admin/components/pricing-plan/pricing-plan.component.ts");
/* harmony import */ var _components_add_state_add_state_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/add-state/add-state.component */ "./src/app/layout/admin/components/add-state/add-state.component.ts");
/* harmony import */ var _components_add_city_add_city_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/add-city/add-city.component */ "./src/app/layout/admin/components/add-city/add-city.component.ts");
/* harmony import */ var _components_plan_page_plan_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/plan-page/plan-page.component */ "./src/app/layout/admin/components/plan-page/plan-page.component.ts");
/* harmony import */ var _components_super_admin_dashboard_super_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/super-admin-dashboard/super-admin-dashboard.component */ "./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.ts");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! primeng/dialog */ "./node_modules/primeng/dialog.js");
/* harmony import */ var primeng_dialog__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(primeng_dialog__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! primeng/multiselect */ "./node_modules/primeng/multiselect.js");
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(primeng_multiselect__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/calendar */ "./node_modules/primeng/calendar.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(primeng_calendar__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/paginator */ "./node_modules/primeng/paginator.js");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(primeng_paginator__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var primeng_autocomplete__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/autocomplete */ "./node_modules/primeng/autocomplete.js");
/* harmony import */ var primeng_autocomplete__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(primeng_autocomplete__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var primeng_fileupload__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/fileupload */ "./node_modules/primeng/fileupload.js");
/* harmony import */ var primeng_fileupload__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(primeng_fileupload__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/radiobutton */ "./node_modules/primeng/radiobutton.js");
/* harmony import */ var primeng_radiobutton__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(primeng_radiobutton__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! primeng/inputswitch */ "./node_modules/primeng/inputswitch.js");
/* harmony import */ var primeng_inputswitch__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(primeng_inputswitch__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _components_add_info_video_add_info_video_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/add-info-video/add-info-video.component */ "./src/app/layout/admin/components/add-info-video/add-info-video.component.ts");
/* harmony import */ var _components_add_allergy_add_allergy_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/add-allergy/add-allergy.component */ "./src/app/layout/admin/components/add-allergy/add-allergy.component.ts");
/* harmony import */ var _components_add_coupon_add_coupon_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/add-coupon/add-coupon.component */ "./src/app/layout/admin/components/add-coupon/add-coupon.component.ts");
/* harmony import */ var _components_add_deactivate_reason_add_deactivate_reason_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/add-deactivate-reason/add-deactivate-reason.component */ "./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.ts");
/* harmony import */ var _components_text_plan_text_plan_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/text-plan/text-plan.component */ "./src/app/layout/admin/components/text-plan/text-plan.component.ts");
/* harmony import */ var _components_add_dose_add_dose_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/add-dose/add-dose.component */ "./src/app/layout/admin/components/add-dose/add-dose.component.ts");
/* harmony import */ var _components_policy_accept_list_policy_accept_list_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/policy-accept-list/policy-accept-list.component */ "./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.ts");
/* harmony import */ var _components_parent_list_parent_list_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/parent-list/parent-list.component */ "./src/app/layout/admin/components/parent-list/parent-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _admin_routing_module__WEBPACK_IMPORTED_MODULE_2__["AdminRoutingModule"],
                primeng_dialog__WEBPACK_IMPORTED_MODULE_9__["DialogModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_10__["FormsModule"],
                primeng_multiselect__WEBPACK_IMPORTED_MODULE_11__["MultiSelectModule"],
                primeng_calendar__WEBPACK_IMPORTED_MODULE_12__["CalendarModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_13__["CarouselModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_14__["NgxSpinnerModule"],
                primeng_paginator__WEBPACK_IMPORTED_MODULE_15__["PaginatorModule"],
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_13__["BsDatepickerModule"].forRoot(),
                ngx_bootstrap__WEBPACK_IMPORTED_MODULE_13__["TimepickerModule"].forRoot(),
                primeng_autocomplete__WEBPACK_IMPORTED_MODULE_16__["AutoCompleteModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_20__["SharedModule"],
                primeng_fileupload__WEBPACK_IMPORTED_MODULE_17__["FileUploadModule"],
                primeng_radiobutton__WEBPACK_IMPORTED_MODULE_18__["RadioButtonModule"],
                primeng_inputswitch__WEBPACK_IMPORTED_MODULE_19__["InputSwitchModule"]
            ],
            // tslint:disable-next-line: max-line-length
            declarations: [_components_agency_list_agency_list_component__WEBPACK_IMPORTED_MODULE_3__["AgencyListComponent"], _components_add_state_add_state_component__WEBPACK_IMPORTED_MODULE_5__["AddStateComponent"], _components_add_city_add_city_component__WEBPACK_IMPORTED_MODULE_6__["AddCityComponent"], _components_pricing_plan_pricing_plan_component__WEBPACK_IMPORTED_MODULE_4__["PricingPlanComponent"], _components_plan_page_plan_page_component__WEBPACK_IMPORTED_MODULE_7__["PlanPageComponent"], _components_super_admin_dashboard_super_admin_dashboard_component__WEBPACK_IMPORTED_MODULE_8__["SuperAdminDashboardComponent"], _components_add_info_video_add_info_video_component__WEBPACK_IMPORTED_MODULE_21__["AddInfoVideoComponent"], _components_add_allergy_add_allergy_component__WEBPACK_IMPORTED_MODULE_22__["AddAllergyComponent"], _components_add_coupon_add_coupon_component__WEBPACK_IMPORTED_MODULE_23__["AddCouponComponent"], _components_add_deactivate_reason_add_deactivate_reason_component__WEBPACK_IMPORTED_MODULE_24__["AddDeactivateReasonComponent"], _components_text_plan_text_plan_component__WEBPACK_IMPORTED_MODULE_25__["TextPlanComponent"], _components_add_dose_add_dose_component__WEBPACK_IMPORTED_MODULE_26__["AddDoseComponent"], _components_policy_accept_list_policy_accept_list_component__WEBPACK_IMPORTED_MODULE_27__["PolicyAcceptListComponent"], _components_parent_list_parent_list_component__WEBPACK_IMPORTED_MODULE_28__["ParentListComponent"]]
        })
    ], AdminModule);
    return AdminModule;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/add-allergy/add-allergy.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-allergy/add-allergy.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-control{height: 30px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2FkbWluL2NvbXBvbmVudHMvYWRkLWFsbGVyZ3kvYWRkLWFsbGVyZ3kuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjLFlBQVkiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvYWRtaW4vY29tcG9uZW50cy9hZGQtYWxsZXJneS9hZGQtYWxsZXJneS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tY29udHJvbHtoZWlnaHQ6IDMwcHh9Il19 */"

/***/ }),

/***/ "./src/app/layout/admin/components/add-allergy/add-allergy.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-allergy/add-allergy.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"container-fluid\">\n\n    <div class=\"pagetitle\">\n      <div>\n        <h2>Admin\n          <span>/ AllergyList </span>\n        </h2>\n      </div>\n      <div>\n        <button type=\"submit\" class=\"btn btn-send\" (click)=\"clearAllergyTypeForm()\" data-toggle=\"modal\"\n          data-target=\".addallergytype\">Add Allergy Type</button>\n        <button type=\"submit\" class=\"btn btn-send\" (click)=\"clearAllergyForm()\" data-toggle=\"modal\"\n          data-target=\".addallergy\">Add Allergy</button>\n        <button type=\"submit\" class=\"btn btn-send\" (click)=\"clearAllergyReactionForm()\" data-toggle=\"modal\"\n          data-target=\".addallergyreaction\">Add Allergy Reaction</button>\n      </div>\n    </div>\n\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\n      <div>\n        <h3>Allergy List</h3>\n      </div>\n    </div>\n\n    <ul class=\"nav nav-pills mt-20\" id=\"pills-tab\" role=\"tablist\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link active\" id=\"allergyType\" data-toggle=\"pill\" href=\"#pills-allergyType\"\n          (click)=\"this.getAllergyType();\" role=\"tab\" aria-controls=\"pills-allergyType\" aria-selected=\"true\">Allergy\n          Type</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" id=\"allergy\" data-toggle=\"pill\" href=\"#pills-allergy\" role=\"tab\"\n          (click)=\"this.getAllergyName();\" aria-controls=\"pills-allergy\" aria-selected=\"false\">Allergy</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" id=\"allergyReaction\" data-toggle=\"pill\" href=\"#pills-allergyReaction\" role=\"tab\"\n          (click)=\"this.getAllergyReactionType();\" aria-controls=\"pills-allergyReaction\" aria-selected=\"false\">Allergy\n          Reaction\n          Type</a>\n      </li>\n    </ul>\n\n\n    <div class=\"tab-content\" id=\"pills-tabContent\">\n\n      <div class=\"tab-pane fade show active\" id=\"pills-allergyType\" role=\"tabpanel\" aria-labelledby=\"allergyType\">\n        <div class=\"innertable\">\n          <div class=\"table-responsive\">\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Allergy Type</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let allergyType of allergyTypeList\">\n                  <td>{{allergyType.label}}</td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"text-center\">\n              <span class=\"text-center\" *ngIf=\"(allergyTypeList.length == 0 && !loader)\">No record found</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"tab-pane fade \" id=\"pills-allergy\" role=\"tabpanel\" aria-labelledby=\"allergy\">\n        <div class=\"innertable\">\n          <div class=\"table-responsive\">\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Allergy Type</th>\n                  <th scope=\"col\">Allergy Name</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let allergy of allergyList\">\n                  <td> {{allergy.allergyType}}</td>\n                  <td>{{allergy.label}}</td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"text-center\">\n              <span class=\"text-center\" *ngIf=\"(allergyList.length == 0 && !loader)\">No record found</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"tab-pane fade \" id=\"pills-allergyReaction\" role=\"tabpanel\" aria-labelledby=\"allergyReaction\">\n        <div class=\"innertable\">\n          <div class=\"table-responsive\">\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Allergy Type</th>\n                  <th scope=\"col\">Allergy Reaction Type</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let allergyReaction of allergyReactionList\">\n                  <td> {{allergyReaction.allergyType}}</td>\n                  <td>{{allergyReaction.label}}</td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"text-center\">\n              <span class=\"text-center\" *ngIf=\"(allergyReactionList.length == 0 && !loader)\">No record found</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n\n\n<div class=\"modal fade addallergytype \" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Allergy Type</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"allergyTypeForm\">\n          <div class=\"row mb-20 mt-20\">\n            <div class=\"col-lg-12\">\n              <div class=\"form-group\">\n                <label for=\"\">Allergy Type*</label>\n                <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"allergytype\"\n                  placeholder=\"Allergy Type\">\n                <div *ngIf=\"t.allergytype.invalid && (t.allergytype.dirty || t.allergytype.touched)\"\n                  class=\"text-left errormsg\">\n                  <span *ngIf=\"t.allergytype.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter allergy type</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveAllergyType()\">Add</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal fade addallergy\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Allergy</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"allergyForm\">\n          <div class=\"row mb-20\">\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"\">Allergy Type*</label>\n                <select class=\"form-control\" placeholder=\"Allergy type\" formControlName=\"allergytype\"\n                  id=\"exampleFormControlSelect1\">\n                  <option value=\"\">Select Allergy Type</option>\n                  <option *ngFor=\"let allergyType of allergyTypeList\" [value]=\"allergyType.value\">{{allergyType.label}}\n                  </option>\n                </select>\n                <div *ngIf=\"a.allergytype.invalid && (a.allergytype.dirty || a.allergytype.touched)\"\n                  class=\"text-left errormsg\">\n                  <span *ngIf=\"a.allergytype.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select allergy type</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"\">Allergy Name*</label>\n                <input type=\"text\" class=\"form-control\" id=\"\" formControlName=\"allergyname\" aria-describedby=\"\"\n                  placeholder=\"Enter Allergy Name\">\n                <div *ngIf=\"a.allergyname.invalid && (a.allergyname.dirty || a.allergyname.touched)\"\n                  class=\"text-left errormsg\">\n                  <span *ngIf=\"a.allergyname.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter allergy name</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveAllergy()\">Add </button>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<div class=\"modal fade addallergyreaction\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Allergy Reaction</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"allergyReactionForm\">\n          <div class=\"row mb-20\">\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"\">Allergy Type*</label>\n                <select class=\"form-control\" placeholder=\"Allergy type\" formControlName=\"allergytype\"\n                  id=\"exampleFormControlSelect1\">\n                  <option value=\"\">Select Allergy Type</option>\n                  <option *ngFor=\"let allergyType of allergyTypeList\" [value]=\"allergyType.value\">{{allergyType.label}}\n                  </option>\n                </select>\n                <div *ngIf=\"r.allergytype.invalid && (r.allergytype.dirty || r.allergytype.touched)\"\n                  class=\"text-left errormsg\">\n                  <span *ngIf=\"r.allergytype.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select allergy type</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"\">Allergy Reaction Name*</label>\n                <input type=\"text\" class=\"form-control\" id=\"\" formControlName=\"allergyreactionname\" aria-describedby=\"\"\n                  placeholder=\"Enter Allergy Reaction Name\">\n                <div\n                  *ngIf=\"r.allergyreactionname.invalid && (r.allergyreactionname.dirty || r.allergyreactionname.touched)\"\n                  class=\"text-left errormsg\">\n                  <span *ngIf=\"r.allergyreactionname.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter allergy reaction name</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveAllergyReaction()\">Add </button>\n      </div>\n    </div>\n  </div>\n\n</div>\n\n<app-confirm-box></app-confirm-box>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/add-allergy/add-allergy.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-allergy/add-allergy.component.ts ***!
  \******************************************************************************/
/*! exports provided: AddAllergyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddAllergyComponent", function() { return AddAllergyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/layout/parent/shared/constant */ "./src/app/layout/parent/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddAllergyComponent = /** @class */ (function () {
    function AddAllergyComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
    }
    AddAllergyComponent.prototype.ngOnInit = function () {
        this.allergyList = [];
        this.allergyTypeList = [];
        this.allergyReactionList = [];
        this.createAllergyForm();
        this.createAllergyReactionForm();
        this.createAllergyTypeForm();
        this.getAllergyType();
    };
    AddAllergyComponent.prototype.createAllergyForm = function () {
        this.allergyForm = this.fb.group({
            allergytype: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            allergyname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    AddAllergyComponent.prototype.createAllergyTypeForm = function () {
        this.allergyTypeForm = this.fb.group({
            allergytype: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    AddAllergyComponent.prototype.createAllergyReactionForm = function () {
        this.allergyReactionForm = this.fb.group({
            allergytype: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            allergyreactionname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    Object.defineProperty(AddAllergyComponent.prototype, "a", {
        get: function () { return this.allergyForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAllergyComponent.prototype, "t", {
        get: function () { return this.allergyTypeForm.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddAllergyComponent.prototype, "r", {
        get: function () { return this.allergyReactionForm.controls; },
        enumerable: true,
        configurable: true
    });
    AddAllergyComponent.prototype.getAllergyType = function () {
        var _this = this;
        var req = {
            'isDeleted': false,
        };
        this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].GetAllergyType, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.allergyTypeList = res.body.data;
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
    AddAllergyComponent.prototype.getAllergyName = function () {
        var _this = this;
        var req = {
            'isDeleted': false,
        };
        this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].GetAllergyName, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.allergyList = res.body.data;
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
    AddAllergyComponent.prototype.getAllergyReactionType = function () {
        var _this = this;
        var req = {
            'isDeleted': false,
        };
        this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].GetAllergyReactionType, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.allergyReactionList = res.body.data;
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
    // Save Allergy
    AddAllergyComponent.prototype.saveAllergy = function () {
        var _this = this;
        if (this.allergyForm.valid) {
            var data = {
                'id': 0,
                'AllergyTypeID': this.allergyForm.value.allergytype,
                'NameOfAllergy': this.allergyForm.value.allergyname,
                'createdBy': this.commonService.getLoggedInUserId()
            };
            this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].SaveAllergyName, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('.addallergy').modal('hide');
                    _this.spinner.hide();
                    _this.notification.success({ message: 'Allergy Added successfully', title: '' });
                    _this.getAllergyName();
                }
                else if (res.body.statusCode === 206) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'Allergy already exists with same name.', title: '' });
                    _this.getAllergyName();
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
            this.commonService.validateAllFields(this.allergyForm);
        }
    };
    // Save Allergy Type
    AddAllergyComponent.prototype.saveAllergyType = function () {
        var _this = this;
        if (this.allergyTypeForm.valid) {
            var data = {
                'id': 0,
                'AllergyTypeName': this.allergyTypeForm.value.allergytype,
                'createdBy': this.commonService.getLoggedInUserId()
            };
            this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].SaveAllergyType, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('.addallergytype').modal('hide');
                    _this.spinner.hide();
                    _this.notification.success({ message: 'Allergy type Added successfully', title: '' });
                    _this.getAllergyType();
                }
                else if (res.body.statusCode === 206) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'Allergy type already exists with same name.', title: '' });
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
            this.commonService.validateAllFields(this.allergyTypeForm);
        }
    };
    // Save Allergy Reaction Type
    AddAllergyComponent.prototype.saveAllergyReaction = function () {
        var _this = this;
        if (this.allergyReactionForm.valid) {
            var data = {
                'id': 0,
                'AllergyTypeID': this.allergyReactionForm.value.allergytype,
                'AllergyReactionTypeName': this.allergyReactionForm.value.allergyreactionname,
                'createdBy': this.commonService.getLoggedInUserId()
            };
            this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].SaveAllergyReactionType, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('.addallergyreaction').modal('hide');
                    _this.spinner.hide();
                    _this.notification.success({ message: 'Allergy Reaction Added successfully', title: '' });
                    _this.getAllergyReactionType();
                }
                else if (res.body.statusCode === 206) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'Allergy reaction already exists with same name.', title: '' });
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
            this.commonService.validateAllFields(this.allergyReactionForm);
        }
    };
    AddAllergyComponent.prototype.clearAllergyForm = function () {
        this.createAllergyForm();
    };
    AddAllergyComponent.prototype.clearAllergyTypeForm = function () {
        this.createAllergyTypeForm();
    };
    AddAllergyComponent.prototype.clearAllergyReactionForm = function () {
        this.createAllergyReactionForm();
    };
    AddAllergyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-allergy',
            template: __webpack_require__(/*! ./add-allergy.component.html */ "./src/app/layout/admin/components/add-allergy/add-allergy.component.html"),
            styles: [__webpack_require__(/*! ./add-allergy.component.css */ "./src/app/layout/admin/components/add-allergy/add-allergy.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["ConfirmationService"]])
    ], AddAllergyComponent);
    return AddAllergyComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/add-city/add-city.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-city/add-city.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL2FkZC1jaXR5L2FkZC1jaXR5LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/admin/components/add-city/add-city.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-city/add-city.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Admin\r\n          <span>/ City List </span>\r\n        </h2>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\r\n      <div>\r\n        <h3>City List</h3>\r\n      </div>\r\n      <div>\r\n        <button type=\"submit\" class=\"btn btn-send\" data-toggle=\"modal\" (click)=\"clearForm()\" data-target=\".addplan\">Add City</button>\r\n      </div>\r\n    </div>\r\n\r\n<!-- \r\n    <div class=\"innertable\">\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table\">\r\n          <thead class=\"thead-light\">\r\n            <tr>              \r\n              <th scope=\"col\">State Name</th>            \r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let plan of stateList\">\r\n              <td>{{plan.stateName}}</td>            \r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div> -->\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class=\"modal fade addplan\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">{{addMode? 'Add City' : 'city Details' }}</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"pricingForm\">\r\n          <div class=\"row mb-20 mt-20\">\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"exampleInputEmail1\">Country*</label>                      \r\n                <select class=\"form-control\" placeholder=\"Country\" formControlName=\"country\"\r\n                id=\"exampleFormControlSelect1\" (change)=\"getStatesList();\">\r\n                <option value=\"\">Select Country</option>\r\n                <option *ngFor=\"let countries of countryList\" [value]=\"countries.id\" >{{countries.countryName}}</option>\r\n              </select>\r\n              <div *ngIf=\"f.country.invalid && (f.country.dirty || f.country.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.country.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select country</span>\r\n                </span>\r\n              </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                    <label for=\"exampleFormControlSelect1\">State*</label>\r\n                    <select class=\"form-control\" placeholder=\"State\" formControlName=\"state\"\r\n                    id=\"exampleFormControlSelect1\">\r\n                    <option value=\"\">Select State</option>\r\n                    <option *ngFor=\"let states of stateList\" [value]=\"states.id\" >{{states.stateName}}</option>\r\n                  </select>\r\n                  <div *ngIf=\"f.state.invalid && (f.state.dirty || f.state.touched)\" class=\"text-left errormsg\">\r\n                    <span *ngIf=\"f.state.errors.required\">\r\n                      <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select state</span>\r\n                    </span>\r\n                  </div>\r\n                  </div>\r\n              </div>\r\n          </div>     \r\n          \r\n          <div class=\"row mb-20\">\r\n              <div class=\"col-lg-6\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Enter City Name*</label>\r\n                    <input type=\"text\" formControlName=\"cityname\" maxlength=\"25\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter city name\">\r\n                    <div *ngIf=\"f.cityname.invalid && (f.cityname.dirty || f.cityname.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.cityname.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter city name</span>\r\n                        </span>\r\n                      </div>\r\n                  </div>\r\n                  </div>\r\n          </div>\r\n         \r\n        </form>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\"  class=\"btn btn-primary\" (click)=\"createNewPlan()\">{{addMode? 'Add': 'Save Chnage'}}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/add-city/add-city.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-city/add-city.component.ts ***!
  \************************************************************************/
/*! exports provided: AddCityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCityComponent", function() { return AddCityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/admin/shared/constant.ts");
/* harmony import */ var src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/layout/teacher/shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AddCityComponent = /** @class */ (function () {
    function AddCityComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.totalRecord = 0;
        this.pricingPlanList = [];
        this.pageNo = 0;
        this.limit = 10;
        this.planId = 0;
        this.loader = true;
        this.PaymentVM = {};
        this.addMode = true;
    }
    AddCityComponent.prototype.ngOnInit = function () {
        this.countryList = [];
        this.cityList = [];
        this.stateList = [];
        this.getAllCountries();
        this.createPlanForm();
    };
    AddCityComponent.prototype.getStatesList = function () {
        var _this = this;
        this.spinner.show();
        this.stateList = [];
        this.cityList = [];
        var req = {
            'CountryId': this.pricingForm.value.country,
            'AgencyID': 4
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_10__["TeacherAPIURLs"].GetAllStates, req, null).subscribe(function (res) {
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
    AddCityComponent.prototype.getAllCountries = function () {
        var _this = this;
        this.countryList = [];
        var req = {
            'AgencyID': 4
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_10__["TeacherAPIURLs"].GetAllCountry, req, null).subscribe(function (res) {
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
    AddCityComponent.prototype.createPlanForm = function () {
        this.pricingForm = this.fb.group({
            country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            state: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            cityname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
        });
    };
    AddCityComponent.prototype.updatePlanForm = function () {
        this.pricingForm = this.fb.group({
            planname: [this.PaymentVM.planName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            noofusers: [this.PaymentVM.numberofUsers, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            price: [this.PaymentVM.planPrice, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            remark: [this.PaymentVM.remark],
            limit: [this.PaymentVM.frequency, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            active: [this.PaymentVM.IsActive]
        });
    };
    Object.defineProperty(AddCityComponent.prototype, "f", {
        get: function () { return this.pricingForm.controls; },
        enumerable: true,
        configurable: true
    });
    AddCityComponent.prototype.getAllstatelist = function () {
        var _this = this;
        this.spinner.show();
        this.stateList = [];
        var req = {
            'limit': this.limit,
            'page': this.pageNo
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetAllState, req, null).subscribe(function (res) {
            _this.totalRecord = res.body.totalRows;
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
    AddCityComponent.prototype.createNewPlan = function () {
        var _this = this;
        this.spinner.show();
        if (this.pricingForm.valid) {
            var req = {
                'cityname': this.pricingForm.value.cityname,
                'countryId': this.pricingForm.value.country,
                'stateId': this.pricingForm.value.state
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].SaveCity, req, null).subscribe(function (res) {
                _this.totalRecord = res.body.totalRows;
                if (res.body.statusCode === 200) {
                    _this.notification.success({ message: _this.addMode ? 'City has been created successfully' :
                            'Plan has been update successfully', title: '' });
                    $('.addplan').modal('hide');
                    _this.getAllstatelist();
                }
                else if (res.body.statusCode === 987) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'This City is already in used ', title: 'Cannnot be updated' });
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
            this.commonService.validateAllFields(this.pricingForm);
        }
    };
    AddCityComponent.prototype.getPlanDetails = function (obj) {
        this.addMode = false;
        this.planId = obj.id;
        this.PaymentVM.IsActive = obj.isActive;
        this.PaymentVM.planName = obj.planName;
        this.PaymentVM.numberofUsers = obj.numberofUsers;
        this.PaymentVM.planPrice = obj.planPrice;
        this.PaymentVM.remark = obj.remark;
        this.PaymentVM.frequency = obj.frequency;
        this.updatePlanForm();
    };
    AddCityComponent.prototype.clearForm = function () {
        this.planId = 0;
        this.createPlanForm();
        this.addMode = true;
    };
    AddCityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-city',
            template: __webpack_require__(/*! ./add-city.component.html */ "./src/app/layout/admin/components/add-city/add-city.component.html"),
            styles: [__webpack_require__(/*! ./add-city.component.css */ "./src/app/layout/admin/components/add-city/add-city.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_8__["ConfirmationService"]])
    ], AddCityComponent);
    return AddCityComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/add-coupon/add-coupon.component.css":
/*!*****************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-coupon/add-coupon.component.css ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL2FkZC1jb3Vwb24vYWRkLWNvdXBvbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/admin/components/add-coupon/add-coupon.component.html":
/*!******************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-coupon/add-coupon.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"container-fluid\">\n\n    <div class=\"pagetitle\">\n      <div>\n        <h2>Admin\n          <span>/ CouponList </span>\n        </h2>\n      </div>\n      <div>\n        <button type=\"submit\" class=\"btn btn-send\" (click)=\"clearCouponForm()\" data-toggle=\"modal\"\n          data-target=\".addcoupon\">Add Coupon</button>\n      </div>\n    </div>\n\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\n      <div>\n        <h3>Coupon List</h3>\n      </div>\n    </div>\n\n\n    <div class=\"tab-content\" id=\"pills-tabContent\">\n\n      <div class=\"tab-pane fade show active\" id=\"pills-allergyType\" role=\"tabpanel\" aria-labelledby=\"allergyType\">\n        <div class=\"innertable\">\n          <div class=\"table-responsive\">\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Coupon Name</th>\n                  <th scope=\"col\">Discount(%)</th>\n                  <th scope=\"col\" class=\"text-center\">Change Status</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let coupon of couponList\">\n                  <td>{{coupon.couponName}}</td>\n                  <td>{{coupon.discount}}</td>\n                  <td class=\"text-center\" >\n                    <button class=\"form-control\" *ngIf=\"!coupon.isDeleted\"   class=\"btn btn-warning\"\n                      (click)=\"deactivateCoupon(coupon)\">Deactivate</button>\n                    <button class=\"form-control\" *ngIf=\"coupon.isDeleted\" class=\"btn btn-success\"\n                      (click)=\"activateCoupon(coupon)\">Activate</button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"text-center\">\n              <span class=\"text-center\" *ngIf=\"(couponList.length == 0 && !loader)\">No record found</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n\n\n<div class=\"modal fade addcoupon \" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Coupon</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"couponForm\">\n          <div class=\"row mb-20 mt-20\">\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"\">Coupon Name*</label>\n                <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"couponname\"\n                  placeholder=\"Coupon Name\">\n                <div *ngIf=\"t.couponname.invalid && (t.couponname.dirty || t.couponname.touched)\"\n                  class=\"text-left errormsg\">\n                  <span *ngIf=\"t.couponname.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter coupon name</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"\">Discount(%)*</label>\n                <input type=\"text \" (keypress)=\"commonService.allowOnlyNumber($event)\" class=\"form-control\" id=\"\"\n                  aria-describedby=\"\" formControlName=\"discount\" placeholder=\"Discount\">\n                <div *ngIf=\"t.discount.invalid && (t.discount.dirty || t.discount.touched)\" class=\"text-left errormsg\">\n                  <span *ngIf=\"t.discount.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter discount</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveCoupon()\">Add</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<app-confirm-box></app-confirm-box>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/add-coupon/add-coupon.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-coupon/add-coupon.component.ts ***!
  \****************************************************************************/
/*! exports provided: AddCouponComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCouponComponent", function() { return AddCouponComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/layout/parent/shared/constant */ "./src/app/layout/parent/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddCouponComponent = /** @class */ (function () {
    function AddCouponComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
    }
    AddCouponComponent.prototype.ngOnInit = function () {
        this.couponList = [];
        this.createCouponForm();
        this.getCoupon();
    };
    AddCouponComponent.prototype.createCouponForm = function () {
        this.couponForm = this.fb.group({
            couponname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            discount: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    };
    Object.defineProperty(AddCouponComponent.prototype, "t", {
        get: function () { return this.couponForm.controls; },
        enumerable: true,
        configurable: true
    });
    AddCouponComponent.prototype.getCoupon = function () {
        var _this = this;
        var req = {
            'isActive': true,
        };
        this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].GetCoupons, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.couponList = res.body.data;
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
    // Save Coupon
    AddCouponComponent.prototype.saveCoupon = function () {
        var _this = this;
        if (this.couponForm.valid) {
            var data = {
                'id': 0,
                'createdBy': this.commonService.getLoggedInUserId(),
                'CouponName': this.couponForm.value.couponname,
                'Discount': this.couponForm.value.discount,
            };
            this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].SaveCoupon, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('.addcoupon').modal('hide');
                    //this.spinner.hide();
                    _this.notification.success({ message: 'Coupon Added successfully', title: '' });
                    _this.getCoupon();
                }
                else if (res.body.statusCode === 206) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'Coupon already exists with same name.', title: '' });
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
            this.commonService.validateAllFields(this.couponForm);
        }
    };
    AddCouponComponent.prototype.clearCouponForm = function () {
        this.createCouponForm();
    };
    // Method to delete/deactivate Coupon
    AddCouponComponent.prototype.deactivateCoupon = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to deactivate this Coupon?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'Id': value.id,
                    'IsDeleted': true,
                    'DeletedBy': _this.commonService.getReleventUserId('userdetails'),
                };
                _this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].ActivateDeactivateCoupon, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        //this.spinner.hide();
                        _this.notification.success({ message: 'This Coupon has been deactivated', title: '' });
                        _this.getCoupon();
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
        });
    };
    // Method to ActivateAuth Coupon
    AddCouponComponent.prototype.activateCoupon = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to activate this Coupon?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'Id': value.id,
                    'IsDeleted': false,
                    'UpdatedBy': _this.commonService.getReleventUserId('userdetails'),
                };
                _this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].ActivateDeactivateCoupon, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        //this.spinner.hide();
                        _this.notification.success({ message: 'This Coupon has been activated', title: '' });
                        _this.getCoupon();
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
        });
    };
    AddCouponComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-coupon',
            template: __webpack_require__(/*! ./add-coupon.component.html */ "./src/app/layout/admin/components/add-coupon/add-coupon.component.html"),
            styles: [__webpack_require__(/*! ./add-coupon.component.css */ "./src/app/layout/admin/components/add-coupon/add-coupon.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["ConfirmationService"]])
    ], AddCouponComponent);
    return AddCouponComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL2FkZC1kZWFjdGl2YXRlLXJlYXNvbi9hZGQtZGVhY3RpdmF0ZS1yZWFzb24uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"container-fluid\">\n\n    <div class=\"pagetitle\">\n      <div>\n        <h2>Admin\n          <span>/ DeactivateReasonList </span>\n        </h2>\n      </div>\n      <div>\n        <button type=\"submit\" class=\"btn btn-send\" (click)=\"clearDeactivateReasonForm()\" data-toggle=\"modal\"\n          data-target=\".adddeactivatereason\">Add Deactivate Reason</button>\n      </div>\n    </div>\n\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\n      <div>\n        <h3>Deactivate Reason List</h3>\n      </div>\n    </div>\n\n\n    <div class=\"tab-content\" id=\"pills-tabContent\">\n\n      <div class=\"tab-pane fade show active\" id=\"pills-allergyType\" role=\"tabpanel\" aria-labelledby=\"allergyType\">\n        <div class=\"innertable\">\n          <div class=\"table-responsive\">\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Deactivate Reason</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let deactivateReason of deactivateReasonList\">\n                  <td>{{deactivateReason.reason}}</td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"text-center\">\n              <span class=\"text-center\" *ngIf=\"(deactivateReasonList.length == 0 && !loader)\">No record found</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n\n\n<div class=\"modal fade adddeactivatereason\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Deactivate Reason</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"deactivateReasonForm\">\n          <div class=\"row mb-20 mt-20\">\n            <div class=\"col-lg-12\">\n              <div class=\"form-group\">\n                <label for=\"\">Deactivate Reason*</label>\n                <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"reason\"\n                  placeholder=\"Deactivate Reason\">\n                <div *ngIf=\"t.reason.invalid && (t.reason.dirty || t.reason.touched)\" class=\"text-left errormsg\">\n                  <span *ngIf=\"t.reason.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter deactivate reason</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveDeactivateReason()\">Add</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<app-confirm-box></app-confirm-box>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: AddDeactivateReasonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddDeactivateReasonComponent", function() { return AddDeactivateReasonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/layout/parent/shared/constant */ "./src/app/layout/parent/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddDeactivateReasonComponent = /** @class */ (function () {
    function AddDeactivateReasonComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
    }
    AddDeactivateReasonComponent.prototype.ngOnInit = function () {
        this.deactivateReasonList = [];
        this.createDeactivateReasonForm();
        this.getDeactivateReason();
    };
    AddDeactivateReasonComponent.prototype.createDeactivateReasonForm = function () {
        this.deactivateReasonForm = this.fb.group({
            reason: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    Object.defineProperty(AddDeactivateReasonComponent.prototype, "t", {
        get: function () { return this.deactivateReasonForm.controls; },
        enumerable: true,
        configurable: true
    });
    AddDeactivateReasonComponent.prototype.getDeactivateReason = function () {
        var _this = this;
        var req = {
            'isDeleted': false,
            'RoleID': 5 // For Student
        };
        this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].GetDeactivateReason, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.deactivateReasonList = res.body.data;
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
    // Save Deactivate Reason
    AddDeactivateReasonComponent.prototype.saveDeactivateReason = function () {
        var _this = this;
        if (this.deactivateReasonForm.valid) {
            var data = {
                'id': 0,
                'Reason': this.deactivateReasonForm.value.reason,
                'RoleID': 5
            };
            this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].SaveDeactivateReason, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('.adddeactivatereason').modal('hide');
                    _this.spinner.hide();
                    _this.notification.success({ message: 'Deactivate Reason Added successfully', title: '' });
                    _this.getDeactivateReason();
                }
                else if (res.body.statusCode === 206) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'Deactivate Reason already exists with same name.', title: '' });
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
            this.commonService.validateAllFields(this.deactivateReasonForm);
        }
    };
    AddDeactivateReasonComponent.prototype.clearDeactivateReasonForm = function () {
        this.createDeactivateReasonForm();
    };
    AddDeactivateReasonComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-deactivate-reason',
            template: __webpack_require__(/*! ./add-deactivate-reason.component.html */ "./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.html"),
            styles: [__webpack_require__(/*! ./add-deactivate-reason.component.css */ "./src/app/layout/admin/components/add-deactivate-reason/add-deactivate-reason.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["ConfirmationService"]])
    ], AddDeactivateReasonComponent);
    return AddDeactivateReasonComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/add-dose/add-dose.component.css":
/*!*************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-dose/add-dose.component.css ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-control{height: 30px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2FkbWluL2NvbXBvbmVudHMvYWRkLWRvc2UvYWRkLWRvc2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjLFlBQVkiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvYWRtaW4vY29tcG9uZW50cy9hZGQtZG9zZS9hZGQtZG9zZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tY29udHJvbHtoZWlnaHQ6IDMwcHh9Il19 */"

/***/ }),

/***/ "./src/app/layout/admin/components/add-dose/add-dose.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-dose/add-dose.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"container-fluid\">\n\n    <div class=\"pagetitle\">\n      <div>\n        <h2>Admin\n          <span>/ AllergyList </span>\n        </h2>\n      </div>\n      <div>\n        <button type=\"submit\" class=\"btn btn-send\" (click)=\"cleardoseTypeForm()\" data-toggle=\"modal\"\n          data-target=\".addallergytype\">Add Dose Type</button>\n      </div>\n    </div>\n\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\n      <div>\n        <h3>Repeat Dose List</h3>\n      </div>\n    </div>\n\n    <!-- <ul class=\"nav nav-pills mt-20\" id=\"pills-tab\" role=\"tablist\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link active\" id=\"allergyType\" data-toggle=\"pill\" href=\"#pills-allergyType\"\n          (click)=\"this.getAllDoseRepeat();\" role=\"tab\" aria-controls=\"pills-allergyType\" aria-selected=\"true\">Dose\n          Type</a>\n      </li>\n    </ul> -->\n\n\n    <div class=\"tab-content\" id=\"pills-tabContent\">\n\n      <div class=\"tab-pane fade show active\" id=\"pills-allergyType\" role=\"tabpanel\" aria-labelledby=\"allergyType\">\n        <div class=\"innertable\">\n          <div class=\"table-responsive\">\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Dose Type</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let dose of doseList\">\n                  <td>{{dose.label}}</td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"text-center\">\n              <span class=\"text-center\" *ngIf=\"(doseList.length == 0 && !loader)\">No record found</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n\n\n<div class=\"modal fade addallergytype \" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\n  aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Dose Type</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"doseTypeForm\">\n          <div class=\"row mb-20 mt-20\">\n            <div class=\"col-lg-12\">\n              <div class=\"form-group\">\n                <label for=\"\">Dose Type*</label>\n                <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"dose\"\n                  placeholder=\"Dose Type\">\n                <div *ngIf=\"t.dose.invalid && (t.dose.dirty || t.dose.touched)\"\n                  class=\"text-left errormsg\">\n                  <span *ngIf=\"t.dose.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter dose type</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"saveDoseType()\">Add</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<app-confirm-box></app-confirm-box>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/add-dose/add-dose.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-dose/add-dose.component.ts ***!
  \************************************************************************/
/*! exports provided: AddDoseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddDoseComponent", function() { return AddDoseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/layout/parent/shared/constant */ "./src/app/layout/parent/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AddDoseComponent = /** @class */ (function () {
    function AddDoseComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.doseList = [];
    }
    AddDoseComponent.prototype.ngOnInit = function () {
        this.createDoseForm();
        this.getAllDoseRepeat();
    };
    AddDoseComponent.prototype.createDoseForm = function () {
        this.doseTypeForm = this.fb.group({
            dose: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    Object.defineProperty(AddDoseComponent.prototype, "t", {
        get: function () { return this.doseTypeForm.controls; },
        enumerable: true,
        configurable: true
    });
    AddDoseComponent.prototype.getAllDoseRepeat = function () {
        var _this = this;
        this.doseList = [];
        var data = {
            'agencyID': this.commonService.getAgencyId()
        };
        this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].GetAllDoseRepeat, data, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.doseList = res.body.data;
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
    // Save Allergy Type
    AddDoseComponent.prototype.saveDoseType = function () {
        var _this = this;
        if (this.doseTypeForm.valid) {
            var data = {
                'id': 0,
                'agencyID': 4,
                'DoseRepeatName': this.doseTypeForm.value.dose,
                'createdBy': this.commonService.getLoggedInUserId()
            };
            this.apiService.postData(src_app_layout_parent_shared_constant__WEBPACK_IMPORTED_MODULE_9__["ParentAPIURLs"].SaveAllDoseRepeat, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('.addallergytype').modal('hide');
                    _this.spinner.hide();
                    _this.notification.success({ message: 'Dose type Added successfully', title: '' });
                    _this.getAllDoseRepeat();
                }
                else if (res.body.statusCode === 206) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'Dose type already exists with same name.', title: '' });
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
            this.commonService.validateAllFields(this.doseTypeForm);
        }
    };
    AddDoseComponent.prototype.cleardoseTypeForm = function () {
        this.createDoseForm();
    };
    AddDoseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-dose',
            template: __webpack_require__(/*! ./add-dose.component.html */ "./src/app/layout/admin/components/add-dose/add-dose.component.html"),
            styles: [__webpack_require__(/*! ./add-dose.component.css */ "./src/app/layout/admin/components/add-dose/add-dose.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["ConfirmationService"]])
    ], AddDoseComponent);
    return AddDoseComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/add-info-video/add-info-video.component.css":
/*!*************************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-info-video/add-info-video.component.css ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL2FkZC1pbmZvLXZpZGVvL2FkZC1pbmZvLXZpZGVvLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/admin/components/add-info-video/add-info-video.component.html":
/*!**************************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-info-video/add-info-video.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"container-fluid\">\n\n    <div class=\"pagetitle\">\n      <div>\n        <h2>Admin\n          <span>/ Information Videos List </span>\n        </h2>\n      </div>\n    </div>\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\n      <div>\n        <h3>Information Video List</h3>\n      </div>\n      <div>\n        <button type=\"submit\" class=\"btn btn-send\" data-toggle=\"modal\" (click)=\"clearForm()\" data-target=\".addvideo\">Add\n          Information Video</button>\n      </div>\n    </div>\n\n    <div class=\"innertable\">\n      <div class=\"table-responsive\">\n        <table class=\"table\">\n          <thead class=\"thead-light\">\n            <tr>\n              <th scope=\"col\">Section</th>\n              <th scope=\"col\">Title</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let video of videoList\">\n              <td>{{video.sectionName}}</td>\n              <td>{{video.title}}</td>            \n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n  </div>\n</div>\n\n\n<div class=\"modal fade addvideo\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Information Video</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"VideoUploadForm\">\n\n          <div class=\"row mb-20 mt-20\">\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"exampleInputEmail1\">Section*</label>\n                <select class=\"form-control\" placeholder=\"Section\" formControlName=\"section\"\n                  id=\"exampleFormControlSelect1\">\n                  <option value=\"\">Select Section</option>\n                <option *ngFor=\"let sections of sectionList\" [value]=\"sections.id\" >{{sections.sectionName}}</option>\n                </select>\n                <div *ngIf=\"f.section.invalid && (f.section.dirty || f.section.touched)\" class=\"text-left errormsg\">\n                  <span *ngIf=\"f.section.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select section</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"\">Title*</label>\n                <input type=\"text\" formControlName=\"title\" maxlength=\"25\" class=\"form-control\" id=\"\"\n                  aria-describedby=\"\" placeholder=\"Enter title\">\n                <div *ngIf=\"f.title.invalid && (f.title.dirty || f.title.touched)\"\n                  class=\"text-left errormsg\">\n                  <span *ngIf=\"f.title.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter title</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n\n          </div>\n\n          <div class=\"row mb-20 mt-20\">\n            <div class=\"col-lg-12\">\n              <div class=\"form-group\">\n                <h4>Upload Video (.mp4 extention only)</h4>\n                <p-fileUpload name=\"myfile[]\" #pformvideo uploadLabel=\"Post\" [accept]=\"allowedVideoFileType\"\n                  maxFileSize=\"200000000\" [showUploadButton]=\"showUploadBtn\" customUpload=\"true\"\n                  (uploadHandler)=\"myVideoUploader($event)\"></p-fileUpload>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div>\n  </div>\n</div>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/add-info-video/add-info-video.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-info-video/add-info-video.component.ts ***!
  \************************************************************************************/
/*! exports provided: AddInfoVideoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddInfoVideoComponent", function() { return AddInfoVideoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/layout/teacher/shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_app_layout_teacher_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service */ "./src/app/layout/teacher/shared/services/teacher-api-service/teacher-api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AddInfoVideoComponent = /** @class */ (function () {
    function AddInfoVideoComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.allowedVideoFileType = 'video/mp4';
        this.showUploadBtn = true;
        this.flag = false;
        this.formData = new FormData();
        this.totalRecord = 0;
        this.pricingPlanList = [];
        this.pageNo = 0;
        this.limit = 10;
        this.planId = 0;
        this.loader = true;
        this.videoUrlArray = [];
    }
    AddInfoVideoComponent.prototype.ngOnInit = function () {
        this.videoList = [];
        this.createVideoUploadForm();
        this.GetSectionList();
        this.GetVideoInfo();
    };
    AddInfoVideoComponent.prototype.GetVideoInfo = function () {
        var _this = this;
        this.videoList = [];
        var req = {
            'IsDeleted': false
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetSectionVideo, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.videoList = res.body.data;
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
    AddInfoVideoComponent.prototype.GetSectionList = function () {
        var _this = this;
        this.sectionList = [];
        var req = {
            'IsDeleted': false
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetSectionList, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.sectionList = res.body.data;
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
    AddInfoVideoComponent.prototype.createVideoUploadForm = function () {
        this.VideoUploadForm = this.fb.group({
            section: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            title: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    };
    Object.defineProperty(AddInfoVideoComponent.prototype, "f", {
        get: function () { return this.VideoUploadForm.controls; },
        enumerable: true,
        configurable: true
    });
    AddInfoVideoComponent.prototype.clearForm = function () {
        this.videoUrlArray = [];
        this.createVideoUploadForm();
        this.pformvideo.clear();
    };
    AddInfoVideoComponent.prototype.myVideoUploader = function (event) {
        this.spinner.show();
        this.flag = true;
        this.isImageArray = false;
        this.formData = new FormData();
        this.formData.append(event.files[0].name, event.files[0]);
        // this.notification.success({ message: 'Video is ready to upload', title: 'Done!' });
        this.uploadMedia();
    };
    AddInfoVideoComponent.prototype.uploadMedia = function () {
        var _this = this;
        if (this.VideoUploadForm.valid) {
            this.videoUrlArray = [];
            var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpHeaders"]();
            headers.set('Content-Type', null);
            headers.set('Accept', 'multipart/form-data');
            var params = headers;
            var loggedInId = this.commonService.getLoggedInUserId();
            var Id = loggedInId.toString();
            this.formData.append('loggedInId', Id);
            this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].MultipleImageUpload, this.formData, params).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    _this.flag = false;
                    res.body.data.forEach(function (x) {
                        _this.videoUrlArray.push({
                            'id': 0,
                            'postActivitiesID': 0,
                            'vedioServerPath': x
                        });
                    });
                    _this.saveVideo();
                    _this.formData = new FormData();
                }
                else {
                    _this.spinner.hide();
                    _this.error.unknownError();
                    _this.formData = new FormData();
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
                _this.formData = new FormData();
            });
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.VideoUploadForm);
        }
    };
    AddInfoVideoComponent.prototype.saveVideo = function () {
        var _this = this;
        if (this.VideoUploadForm.valid) {
            if (this.videoUrlArray.length > 0) {
                var data = {
                    'id': 0,
                    'title': this.VideoUploadForm.value.title,
                    'VideoPath': this.videoUrlArray[0].vedioServerPath,
                    'sectionID': this.VideoUploadForm.value.section,
                    'createdBy': this.commonService.getLoggedInUserId()
                };
                this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].SaveSectionVideo, data, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        $('.addvideo').modal('hide');
                        _this.spinner.hide();
                        _this.notification.success({ message: 'Video uploaded successfully', title: '' });
                        _this.GetVideoInfo();
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
                this.notification.warning({ message: 'Please upload video', title: '' });
            }
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.VideoUploadForm);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('pformvideo'),
        __metadata("design:type", Object)
    ], AddInfoVideoComponent.prototype, "pformvideo", void 0);
    AddInfoVideoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-info-video',
            template: __webpack_require__(/*! ./add-info-video.component.html */ "./src/app/layout/admin/components/add-info-video/add-info-video.component.html"),
            styles: [__webpack_require__(/*! ./add-info-video.component.css */ "./src/app/layout/admin/components/add-info-video/add-info-video.component.css")]
        }),
        __metadata("design:paramtypes", [src_app_layout_teacher_shared_services_teacher_api_service_teacher_api_service__WEBPACK_IMPORTED_MODULE_10__["TeacherApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_1__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["ConfirmationService"]])
    ], AddInfoVideoComponent);
    return AddInfoVideoComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/add-state/add-state.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-state/add-state.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL2FkZC1zdGF0ZS9hZGQtc3RhdGUuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/admin/components/add-state/add-state.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-state/add-state.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Admin\r\n          <span>/ State List </span>\r\n        </h2>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\r\n      <div>\r\n        <h3>State List</h3>\r\n      </div>\r\n      <div>\r\n        <button type=\"submit\" class=\"btn btn-send\" data-toggle=\"modal\" (click)=\"clearForm()\" data-target=\".addplan\">Add State</button>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"innertable\">\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table\">\r\n          <thead class=\"thead-light\">\r\n            <tr>              \r\n              <th scope=\"col\">State Name</th>             \r\n              <!-- <th scope=\"col\" class=\"text-center\">Actions</th> -->\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let plan of stateList\">\r\n              <td>{{plan.stateName}}</td>             \r\n              <!-- <td class=\"text-center\">\r\n                <a data-toggle=\"modal\" data-target=\".addplan\" (click)=\"getPlanDetails(plan)\">\r\n                  <i class=\"fa fa-eye\" aria-hidden=\"true\" ></i>\r\n                </a>\r\n              </td> -->\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class=\"modal fade addplan\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">{{addMode? 'Add State' : 'State Details' }}</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"pricingForm\">\r\n          <div class=\"row mb-20 mt-20\">\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"exampleInputEmail1\">Country*</label>                      \r\n                <select class=\"form-control\" placeholder=\"Country\" formControlName=\"country\"\r\n                id=\"exampleFormControlSelect1\">\r\n                <option value=\"\">Select Country</option>\r\n                <option *ngFor=\"let countries of countryList\" [value]=\"countries.id\" >{{countries.countryName}}</option>\r\n              </select>\r\n              <div *ngIf=\"f.country.invalid && (f.country.dirty || f.country.touched)\" class=\"text-left errormsg\">\r\n                <span *ngIf=\"f.country.errors.required\">\r\n                  <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select country</span>\r\n                </span>\r\n              </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Enter State Name*</label>\r\n                <input type=\"text\" formControlName=\"statename\" maxlength=\"25\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter state name\">\r\n                <div *ngIf=\"f.statename.invalid && (f.statename.dirty || f.statename.touched)\" class=\"text-left errormsg\">\r\n                    <span *ngIf=\"f.statename.errors.required\">\r\n                      <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter state name</span>\r\n                    </span>\r\n                  </div>\r\n              </div>\r\n              </div>\r\n          </div>         \r\n        </form>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\"  class=\"btn btn-primary\" (click)=\"createNewPlan()\">{{addMode? 'Add': 'Save Chnage'}}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/add-state/add-state.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/layout/admin/components/add-state/add-state.component.ts ***!
  \**************************************************************************/
/*! exports provided: AddStateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddStateComponent", function() { return AddStateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/admin/shared/constant.ts");
/* harmony import */ var src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/layout/teacher/shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AddStateComponent = /** @class */ (function () {
    function AddStateComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.totalRecord = 0;
        this.pricingPlanList = [];
        this.pageNo = 0;
        this.limit = 10;
        this.planId = 0;
        this.loader = true;
        this.PaymentVM = {};
        this.addMode = true;
    }
    AddStateComponent.prototype.ngOnInit = function () {
        this.countryList = [];
        this.cityList = [];
        this.stateList = [];
        this.getAllstatelist();
        this.getAllCountries();
        this.createPlanForm();
    };
    AddStateComponent.prototype.getAllCountries = function () {
        var _this = this;
        this.countryList = [];
        var req = {
            'AgencyID': 4
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_10__["TeacherAPIURLs"].GetAllCountry, req, null).subscribe(function (res) {
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
    AddStateComponent.prototype.createPlanForm = function () {
        this.pricingForm = this.fb.group({
            statename: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            country: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
    };
    AddStateComponent.prototype.updatePlanForm = function () {
        this.pricingForm = this.fb.group({
            planname: [this.PaymentVM.planName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            noofusers: [this.PaymentVM.numberofUsers, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            price: [this.PaymentVM.planPrice, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            remark: [this.PaymentVM.remark],
            limit: [this.PaymentVM.frequency, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            active: [this.PaymentVM.IsActive]
        });
    };
    Object.defineProperty(AddStateComponent.prototype, "f", {
        get: function () { return this.pricingForm.controls; },
        enumerable: true,
        configurable: true
    });
    AddStateComponent.prototype.getAllstatelist = function () {
        var _this = this;
        this.spinner.show();
        this.stateList = [];
        var req = {
            'limit': this.limit,
            'page': this.pageNo
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetAllState, req, null).subscribe(function (res) {
            _this.totalRecord = res.body.totalRows;
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
    AddStateComponent.prototype.createNewPlan = function () {
        var _this = this;
        this.spinner.show();
        if (this.pricingForm.valid) {
            var req = {
                'statename': this.pricingForm.value.statename,
                'countryId': this.pricingForm.value.country
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].SaveState, req, null).subscribe(function (res) {
                _this.totalRecord = res.body.totalRows;
                if (res.body.statusCode === 200) {
                    _this.notification.success({ message: _this.addMode ? 'State has been created successfully' :
                            'Plan has been update successfully', title: '' });
                    $('.addplan').modal('hide');
                    _this.getAllstatelist();
                }
                else if (res.body.statusCode === 987) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'This State is already in used', title: 'Cannnot be updated' });
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
            this.commonService.validateAllFields(this.pricingForm);
        }
    };
    AddStateComponent.prototype.getPlanDetails = function (obj) {
        this.addMode = false;
        this.planId = obj.id;
        this.PaymentVM.IsActive = obj.isActive;
        this.PaymentVM.planName = obj.planName;
        this.PaymentVM.numberofUsers = obj.numberofUsers;
        this.PaymentVM.planPrice = obj.planPrice;
        this.PaymentVM.remark = obj.remark;
        this.PaymentVM.frequency = obj.frequency;
        this.updatePlanForm();
    };
    AddStateComponent.prototype.clearForm = function () {
        this.planId = 0;
        this.createPlanForm();
        this.addMode = true;
    };
    AddStateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-state',
            template: __webpack_require__(/*! ./add-state.component.html */ "./src/app/layout/admin/components/add-state/add-state.component.html"),
            styles: [__webpack_require__(/*! ./add-state.component.css */ "./src/app/layout/admin/components/add-state/add-state.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_8__["ConfirmationService"]])
    ], AddStateComponent);
    return AddStateComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/agency-list/agency-list.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/layout/admin/components/agency-list/agency-list.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".form-control{height: 30px}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2FkbWluL2NvbXBvbmVudHMvYWdlbmN5LWxpc3QvYWdlbmN5LWxpc3QuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjLFlBQVkiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvYWRtaW4vY29tcG9uZW50cy9hZ2VuY3ktbGlzdC9hZ2VuY3ktbGlzdC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tY29udHJvbHtoZWlnaHQ6IDMwcHh9Il19 */"

/***/ }),

/***/ "./src/app/layout/admin/components/agency-list/agency-list.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/layout/admin/components/agency-list/agency-list.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n    <div class=\"container-fluid\">\r\n  \r\n      <div class=\"pagetitle\">\r\n        <div>\r\n          <h2>Admin\r\n            <span>/ AgencyList </span>\r\n          </h2>\r\n        </div>\r\n        <div>\r\n            <button type=\"submit\" class=\"btn btn-send\" (click)=\"clearForm()\" data-toggle=\"modal\" data-target=\".addagency\">Add Agency</button>\r\n          </div>\r\n      </div>\r\n  \r\n  \r\n      <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\r\n        <div>\r\n          <h3>Agency List</h3>\r\n        </div>\r\n      </div>\r\n  \r\n      \r\n  \r\n          <div class=\"card cardfilter\">\r\n            <div class=\"row algcenter\">   \r\n               <div class=\"leftfilter\">\r\n                <div class=\"search-date\">\r\n                  <div class=\"pr15 label-text\">Search Name : </div>\r\n                  <input type=\"text\" placeholder=\"Search Agency Name\" (keydown)=\"keyDownFunction($event)\" [(ngModel)]=\"nameSearch\"\r\n                    class=\"form-control mr15\" id=\"\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n      \r\n\r\n  \r\n      <ul class=\"nav nav-pills mt-20\" id=\"pills-tab\" role=\"tablist\">\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link active\" id=\"appAgency\" data-toggle=\"pill\" href=\"#pills-appAgency\" (click)=\"this.getUserStatus(1);\" role=\"tab\" aria-controls=\"pills-appAgency\"\r\n              aria-selected=\"true\">Approve Agency</a>\r\n          </li>\r\n          <li class=\"nav-item\">\r\n            <a class=\"nav-link\" id=\"penAgency\" data-toggle=\"pill\" href=\"#pills-penAgency\" role=\"tab\" (click)=\"this.getUserStatus(0);\" aria-controls=\"pills-penAgency\"\r\n              aria-selected=\"false\">Unapprove Agency</a>\r\n          </li>\r\n        </ul>\r\n  \r\n  \r\n      <div class=\"tab-content\" id=\"pills-tabContent\">\r\n          <div class=\"tab-pane fade show active\" id=\"pills-appAgency\" role=\"tabpanel\" aria-labelledby=\"appAgency\">\r\n    \r\n            <div class=\"innertable\">\r\n              <div class=\"table-responsive\">\r\n                <table class=\"table\">\r\n                  <thead class=\"thead-light\">\r\n                    <tr >\r\n                                   \r\n                      <th scope=\"col\">Agency</th>\r\n                      <th scope=\"col\">Owner</th>\r\n                      <th scope=\"col\">Email</th>\r\n                      <th scope=\"col\">City</th>\r\n                      <th scope=\"col\">State</th>                     \r\n                      <th class=\"text-center\" scope=\"col\">Actions</th>\r\n                      <th scope=\"col\" class=\"text-center\">Change Status</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                     <tr *ngFor=\"let agency of agencyList\">                      \r\n                      <td>{{agency.agencyName}}</td>\r\n                      <td>{{agency.ownerName}}</td>\r\n                      <td>{{agency.emailId}}</td>\r\n                      <td>{{agency.cityName}} </td>\r\n                      <td>{{agency.stateName}}</td>                \r\n                      <td class=\"text-center\">\r\n                        <a (click)=\"getAgencyDetials(agency)\" title=\"View/update\" data-toggle=\"modal\" data-target=\".addagency\">\r\n                          <i class=\"fa fa-eye\" aria-hidden=\"true\"></i>\r\n                        </a>                       \r\n                      </td>\r\n\r\n                      <td class=\"text-center\" >\r\n                        <button class=\"form-control\" *ngIf=\"!agency.isDeleted\"   class=\"btn btn-warning\"\r\n                          (click)=\"deleteAgency(agency)\">Deactivate</button>\r\n                        <button class=\"form-control\" *ngIf=\"agency.isDeleted\" class=\"btn btn-success\"\r\n                          (click)=\"activateAgency(agency)\">Activate</button>\r\n                      </td>\r\n                    </tr> \r\n                  </tbody>\r\n                </table>\r\n                <div class=\"text-center\">\r\n                    <span class=\"text-center\" *ngIf=\"(agencyList.length == 0 && !loader)\">No record found</span>\r\n                  </div>\r\n              </div>\r\n              <p-paginator [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\" (onPageChange)=\"paginate($event)\"></p-paginator>\r\n            </div>\r\n          </div>\r\n          <div class=\"tab-pane fade \" id=\"pills-penAgency\" role=\"tabpanel\" aria-labelledby=\"penAgency\">\r\n            <div class=\"innertable\">\r\n              <div class=\"table-responsive\">\r\n                <table class=\"table\">\r\n                  <thead class=\"thead-light\">\r\n                    <tr >                  \r\n                      <th scope=\"col\">Agency</th>\r\n                      <th scope=\"col\">Owner</th>\r\n                      <th>Email</th>\r\n                      <th>City</th>\r\n                      <th>State</th>                    \r\n                      <th class=\"text-center\" scope=\"col\">Status</th>\r\n                    </tr>\r\n                  </thead>\r\n                  <tbody>\r\n                    <tr *ngFor=\"let agency of agencyList\">                  \r\n                      <td> {{agency.agencyName}}</td>\r\n                      <td>{{agency.ownerName}}</td>\r\n                      <td>{{agency.emailId}}</td>\r\n                      <td>{{agency.cityName}} </td>\r\n                      <td>{{agency.stateName}}</td>                \r\n                      <td class=\"text-center\">\r\n                        <div class=\"form-group\">                         \r\n                          <button   class=\"form-control\" class=\"btn btn-success\"\r\n                          (click)=\"approvedDenyRequest($event,agency)\">Approve</button>\r\n                        </div>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n                <div class=\"text-center\">\r\n                  <span class=\"text-center\" *ngIf=\"(agencyList.length == 0 && !loader)\">No record found</span>\r\n                </div>\r\n              </div>              \r\n            </div>\r\n          </div>\r\n        </div>       \r\n    </div>\r\n  </div>\r\n  \r\n  \r\n  <div class=\"modal fade addagency \" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog modal-lg\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">{{addMode ? 'Add New Agency' : 'Agency Details'}}</h5>\r\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <form [formGroup]=\"agencyForm\">\r\n            <div class=\"row mb-20 mt-20\">\r\n              <div class=\"col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Agency Name*</label>\r\n                  <input type=\"text \"   class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"agencyname\" placeholder=\"Agency Name\">\r\n                  <div *ngIf=\"f.agencyname.invalid && (f.agencyname.dirty || f.agencyname.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.agencyname.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter agency name</span>\r\n                      </span>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n  \r\n  \r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Agency Email*</label>\r\n                  <input type=\"email \" class=\"form-control\" *ngIf=\"addMode\" id=\"\" aria-describedby=\"\" formControlName=\"email\" placeholder=\"Email Address\">\r\n                  <input type=\"email \" class=\"form-control\" *ngIf=\"!addMode\" id=\"\" disabled aria-describedby=\"\" formControlName=\"email\" placeholder=\"Email Address\">\r\n                  <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.email.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter email</span>\r\n                      </span>\r\n                      <span *ngIf=\"f.email.errors.pattern\">\r\n                          <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Please enter valid email address</span> \r\n                      </span>\r\n                    </div>\r\n                \r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Agency Phone*</label>\r\n                  <input type=\"text\"  maxlength=\"10\" (keypress)=\"commonService.allowOnlyNumber($event)\"  class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"phone\" placeholder=\"phone\">\r\n                  <div *ngIf=\"f.phone.invalid && (f.phone.dirty || f.phone.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.phone.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter phone number</span>\r\n                      </span>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n  \r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">First Name*</label>\r\n                  <input type=\"text \" (keypress)=\"commonService.allowAlphabetOnly($event)\" class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"firstname\" placeholder=\"First Name\">\r\n                  <div *ngIf=\"f.firstname.invalid && (f.firstname.dirty || f.firstname.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.firstname.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter first name</span>\r\n                      </span>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Last Name*</label>\r\n                  <input type=\"text\" class=\"form-control\" (keypress)=\"commonService.allowAlphabetOnly($event)\" id=\"\" aria-describedby=\"\" formControlName=\"lastname\" placeholder=\"Last Name\">\r\n                  <div *ngIf=\"f.lastname.invalid && (f.lastname.dirty || f.lastname.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.lastname.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter last name</span>\r\n                      </span>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mb-20\">\r\n              <div class=\"col-lg-12\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Address*</label>\r\n                  <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"address\" placeholder=\"Address\">\r\n                  <div *ngIf=\"f.address.invalid && (f.address.dirty || f.address.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.address.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter address</span>\r\n                      </span>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mb-20\">\r\n                <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"exampleInputEmail1\">Country*</label>                      \r\n                      <select class=\"form-control\" placeholder=\"Country\" formControlName=\"country\"\r\n                      id=\"exampleFormControlSelect1\" (change)=\"getStatesList();clearStateCity()\">\r\n                      <option value=\"\">Select Country</option>\r\n                      <option *ngFor=\"let countries of countryList\" [value]=\"countries.id\" >{{countries.countryName}}</option>\r\n                    </select>\r\n                    <div *ngIf=\"f.country.invalid && (f.country.dirty || f.country.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.country.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select country</span>\r\n                      </span>\r\n                    </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                          <label for=\"exampleFormControlSelect1\">State*</label>\r\n                          <select class=\"form-control\" placeholder=\"State\" formControlName=\"state\"\r\n                          id=\"exampleFormControlSelect1\" (change)=\"getCitiesList();clearCity()\">\r\n                          <option value=\"\">Select State</option>\r\n                          <option *ngFor=\"let states of stateList\" [value]=\"states.id\" >{{states.stateName}}</option>\r\n                        </select>\r\n                        <div *ngIf=\"f.state.invalid && (f.state.dirty || f.state.touched)\" class=\"text-left errormsg\">\r\n                          <span *ngIf=\"f.state.errors.required\">\r\n                            <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select state</span>\r\n                          </span>\r\n                        </div>\r\n                        </div>\r\n                  </div>\r\n                  </div>\r\n                  <div class=\"row mb-20\">\r\n                  <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\">\r\n                        <label for=\"\">City*</label>                       \r\n                        <select class=\"form-control\" placeholder=\"City\" formControlName=\"city\"\r\n                        id=\"exampleFormControlSelect1\" >\r\n                        <option value=\"\">Select City</option>\r\n                        <option *ngFor=\"let cities of cityList\" [value]=\"cities.id\" >{{cities.cityName}}</option>\r\n                      </select>\r\n                      <div *ngIf=\"f.city.invalid && (f.city.dirty || f.city.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.city.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select city</span>\r\n                        </span>\r\n                      </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-lg-6\">\r\n                        <div class=\"form-group\">\r\n                          <label for=\"\">Zip Code</label>\r\n                          <input type=\"text \" maxlength=\"6\" class=\"form-control\" id=\"\" formControlName=\"zipcode\" aria-describedby=\"\" placeholder=\"Enter Zip Code\">\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n            \r\n           \r\n          </form>\r\n        </div>\r\n        <div class=\"modal-footer\">\r\n          <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"verifyAgency()\">{{ addMode? 'Add' : 'Save Changes'}}</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    \r\n  </div>\r\n  <app-confirm-box></app-confirm-box>\r\n  <ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/agency-list/agency-list.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/layout/admin/components/agency-list/agency-list.component.ts ***!
  \******************************************************************************/
/*! exports provided: AgencyListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgencyListComponent", function() { return AgencyListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/layout/teacher/shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/admin/shared/constant.ts");
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AgencyListComponent = /** @class */ (function () {
    function AgencyListComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.today = new Date();
        this.agencyVM = {};
        this.totalRecord = 0;
        this.agencyList = [];
        this.pageNo = 0;
        this.limit = 10;
        this.loader = true;
        this.status = 1;
        this.addMode = true;
        this.agencyID = 0;
        this.emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
        this.nameSearch = '';
    }
    AgencyListComponent.prototype.ngOnInit = function () {
        this.countryList = [];
        this.cityList = [];
        this.stateList = [];
        this.createAgencyForm();
        this.getAllCountries();
        this.getAllAgencyList();
    };
    AgencyListComponent.prototype.createAgencyForm = function () {
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
    AgencyListComponent.prototype.updateAgencyForm = function () {
        this.agencyForm = this.fb.group({
            agencyname: [this.agencyVM.AgencyName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            firstname: [this.agencyVM.OwnerFirstName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            lastname: [this.agencyVM.OwnerLastName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            email: [this.agencyVM.EmailId],
            phone: [this.agencyVM.Mobile, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            address: [this.agencyVM.Address, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            city: [this.agencyVM.CityId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            state: [this.agencyVM.StateId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            zipcode: [this.agencyVM.PostalCode],
            country: [this.agencyVM.CountryId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
        });
    };
    Object.defineProperty(AgencyListComponent.prototype, "f", {
        get: function () { return this.agencyForm.controls; },
        enumerable: true,
        configurable: true
    });
    AgencyListComponent.prototype.getAllCountries = function () {
        var _this = this;
        this.countryList = [];
        var req = {
            'AgencyID': 4
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllCountry, req, null).subscribe(function (res) {
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
    AgencyListComponent.prototype.getCitiesList = function () {
        var _this = this;
        this.spinner.show();
        this.cityList = [];
        var req = {
            'StateId': this.agencyForm.value.state,
            'AgencyID': 4
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllCities, req, null).subscribe(function (res) {
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
    AgencyListComponent.prototype.clearStateCity = function () {
        this.agencyForm.controls['state'].setValue('');
        this.agencyForm.controls['city'].setValue('');
    };
    AgencyListComponent.prototype.clearCity = function () {
        this.agencyForm.controls['city'].setValue('');
    };
    AgencyListComponent.prototype.getStatesList = function () {
        var _this = this;
        this.spinner.show();
        this.stateList = [];
        this.cityList = [];
        var req = {
            'CountryId': this.agencyForm.value.country,
            'AgencyID': 4
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetAllStates, req, null).subscribe(function (res) {
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
    AgencyListComponent.prototype.verifyAgency = function () {
        this.spinner.show();
        if (this.agencyForm.valid) {
            this.agencyVM.Id = this.agencyID;
            this.agencyVM.AgencyName = this.agencyForm.value.agencyname;
            this.agencyVM.EmailId = this.agencyForm.value.email;
            this.agencyVM.Mobile = this.agencyForm.value.phone;
            this.agencyVM.OwnerFirstName = this.agencyForm.value.firstname;
            this.agencyVM.OwnerLastName = this.agencyForm.value.lastname;
            this.agencyVM.StateId = this.agencyForm.value.state;
            this.agencyVM.CityId = this.agencyForm.value.city;
            this.agencyVM.PostalCode = this.agencyForm.value.zipcode;
            this.agencyVM.Address = this.agencyForm.value.address;
            this.agencyVM.CountryId = this.agencyForm.value.country;
            this.agencyVM.status = this.status;
            var msg = 'Agency information has been saved successfully';
            this.creteNewAgency(this.agencyVM, msg);
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.agencyForm);
        }
    };
    AgencyListComponent.prototype.creteNewAgency = function (req, msg) {
        var _this = this;
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].SaveAgencyInformation, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                $('.addagency').modal('hide');
                _this.getAllAgencyList();
                _this.notification.success({ message: msg, title: '' });
                _this.spinner.hide();
            }
            else if (res.body.statusCode === 986) {
                _this.spinner.hide();
                _this.notification.warning({ message: 'This email Address already exist!', title: '' });
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
    AgencyListComponent.prototype.getAgencyDetials = function (obj) {
        this.agencyID = obj.id;
        this.addMode = false;
        this.agencyVM.AgencyName = obj.agencyName;
        this.agencyVM.EmailId = obj.emailId;
        this.agencyVM.Mobile = obj.mobile;
        this.agencyVM.OwnerFirstName = obj.ownerFirstName;
        this.agencyVM.OwnerLastName = obj.ownerLastName;
        this.agencyVM.StateId = obj.stateId;
        this.agencyVM.CityId = obj.cityId;
        this.agencyVM.PostalCode = obj.postalCode;
        this.agencyVM.Address = obj.address;
        this.agencyVM.CountryId = obj.countryId;
        this.agencyVM.status = 1;
        this.updateAgencyForm();
        this.getAllCountries();
        this.getStatesList();
        this.getCitiesList();
    };
    AgencyListComponent.prototype.getAllAgencyList = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        this.agencyList = [];
        var req = {
            'limit': this.limit,
            'page': this.pageNo,
            'status': this.status,
            'AgencyName': this.nameSearch,
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetAllAgencyDetails, req, null).subscribe(function (res) {
            _this.totalRecord = res.body.totalRows;
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                _this.agencyList = res.body.data;
                _this.loader = false;
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
    AgencyListComponent.prototype.getUserStatus = function (value) {
        this.status = value;
        this.getAllAgencyList();
    };
    AgencyListComponent.prototype.paginate = function (event) {
        this.status = 1;
        this.pageNo = event.page;
        // this.limit = event.page;
        this.getAllAgencyList();
    };
    AgencyListComponent.prototype.approvedDenyRequest = function (event, obj) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to approve this agency ?',
            accept: function () {
                _this.spinner.show();
                obj.status = 1;
                var msg = 'This agency has been activated successfully!';
                _this.creteNewAgency(obj, msg);
            }
        });
    };
    AgencyListComponent.prototype.clearForm = function () {
        this.createAgencyForm();
        this.agencyVM = {};
        this.addMode = true;
        this.status = 0;
    };
    // to serch agency list by enter key
    AgencyListComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode === 13) {
            this.getAllAgencyList();
        }
    };
    // Method to delete/deactivate Parent
    AgencyListComponent.prototype.deleteAgency = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to deactivate this Agency?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'AgencyID': value.id,
                    'IsDeleted': true,
                    'DeletedBy': _this.commonService.getReleventUserId('userdetails'),
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].ActivateDeactivateAgency, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.deleteAgencySuccess(value);
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
        });
    };
    AgencyListComponent.prototype.deleteAgencySuccess = function (data) {
        this.getAllAgencyList();
        this.notification.success({ message: 'This Agency has been deactivated', title: '' });
    };
    // Method to delete/deactivateAuth Person
    AgencyListComponent.prototype.activateAgency = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to activate this Agency?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'AgencyID': value.id,
                    'IsDeleted': false,
                    'UpdatedBy': _this.commonService.getReleventUserId('userdetails'),
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].ActivateDeactivateAgency, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        // this.spinner.hide();
                        _this.notification.success({ message: 'This Agency has been activated', title: '' });
                        _this.getAllAgencyList();
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
        });
    };
    AgencyListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-agency-list',
            template: __webpack_require__(/*! ./agency-list.component.html */ "./src/app/layout/admin/components/agency-list/agency-list.component.html"),
            styles: [__webpack_require__(/*! ./agency-list.component.css */ "./src/app/layout/admin/components/agency-list/agency-list.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_10__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["ConfirmationService"]])
    ], AgencyListComponent);
    return AgencyListComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/parent-list/parent-list.component.css":
/*!*******************************************************************************!*\
  !*** ./src/app/layout/admin/components/parent-list/parent-list.component.css ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL3BhcmVudC1saXN0L3BhcmVudC1saXN0LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/admin/components/parent-list/parent-list.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/layout/admin/components/parent-list/parent-list.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"container-fluid\">\n\n    <div class=\"pagetitle\">\n      <div>\n        <h2>Admin\n          <span>/ Learning Progrem Join Parent List </span>\n        </h2>\n      </div>\n      <div>\n        <button type=\"submit\" class=\"btn btn-send\" (click)=\"generateParentCsvFile()\" data-toggle=\"modal\">Download CSV</button>\n      </div>\n    </div>\n\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\n      <div>\n        <h3>Learning Progrem Join Parent List</h3>\n      </div>\n    </div>\n\n\n    <div class=\"tab-content\" id=\"pills-tabContent\">\n\n      <div class=\"tab-pane fade show active\" id=\"pills-allergyType\" role=\"tabpanel\" aria-labelledby=\"allergyType\">\n        <div class=\"innertable\">\n          <div class=\"table-responsive\">\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Parent Name</th>\n                  <th scope=\"col\">Email</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let agency of parentList\">\n                  <td>{{agency.parentName}}</td>\n                  <td>{{agency.email}}</td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"text-center\">\n              <span class=\"text-center\" *ngIf=\"(parentList.length == 0 && !loader)\">No record found</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n\n\n<app-confirm-box></app-confirm-box>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/parent-list/parent-list.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/layout/admin/components/parent-list/parent-list.component.ts ***!
  \******************************************************************************/
/*! exports provided: ParentListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParentListComponent", function() { return ParentListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/admin/shared/constant.ts");
/* harmony import */ var angular2_csv_Angular2_csv__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angular2-csv/Angular2-csv */ "./node_modules/angular2-csv/Angular2-csv.js");
/* harmony import */ var angular2_csv_Angular2_csv__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(angular2_csv_Angular2_csv__WEBPACK_IMPORTED_MODULE_10__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ParentListComponent = /** @class */ (function () {
    function ParentListComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.parentList = [];
        this.ParentDataForCsv = [];
        this.csvFileNameForParent = 'ProgramJoinParentList';
        this.csvOptionsForParent = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: false,
            headers: [
                'FirstName',
                'LastName',
                'Email'
            ],
            showTitle: false,
            title: [
                'FirstName',
                'LastName',
                'Email'
            ],
            useBom: false,
            removeNewLines: true,
            keys: [
                'FirstName',
                'LastName',
                'Email'
            ],
        };
    }
    ParentListComponent.prototype.ngOnInit = function () {
        this.getAllParentList();
    };
    ParentListComponent.prototype.getAllParentList = function () {
        var _this = this;
        this.parentList = [];
        var req = {
            'AgencyID': 1,
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetClassroomJoinParent, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.parentList = res.body.data;
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
    ParentListComponent.prototype.generateParentCsvFile = function () {
        var csvArrayForParent = [];
        this.parentList.forEach(function (element) {
            csvArrayForParent.push({
                FirstName: element.firstName,
                LastName: element.lastName,
                Email: element.email
            });
        });
        this.ParentDataForCsv = csvArrayForParent;
        // tslint:disable-next-line: no-unused-expression
        new angular2_csv_Angular2_csv__WEBPACK_IMPORTED_MODULE_10__["Angular2Csv"](this.ParentDataForCsv, this.csvFileNameForParent, this.csvOptionsForParent);
        this.isDownloading = false;
    };
    ParentListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-parent-list',
            template: __webpack_require__(/*! ./parent-list.component.html */ "./src/app/layout/admin/components/parent-list/parent-list.component.html"),
            styles: [__webpack_require__(/*! ./parent-list.component.css */ "./src/app/layout/admin/components/parent-list/parent-list.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_8__["ConfirmationService"]])
    ], ParentListComponent);
    return ParentListComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/plan-page/plan-page.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/layout/admin/components/plan-page/plan-page.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-pricing {\r\n    z-index: 1;\r\n    border: 3px solid transparent;\r\n}\r\n.card-pricing .list-unstyled li {\r\n    padding: .5rem 0;\r\n    color: #6c757d;\r\n}\r\n.bg-primary{background:#58A7FE!important;font-size: 14px;}\r\n.card-pricing:hover {\r\n    z-index: 1;\r\n    border: 3px solid #58A7FE;\r\n    box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2FkbWluL2NvbXBvbmVudHMvcGxhbi1wYWdlL3BsYW4tcGFnZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksVUFBVTtJQUNWLDZCQUE2QjtBQUNqQztBQUNBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGNBQWM7QUFDbEI7QUFHQSxZQUFZLDRCQUE0QixDQUFDLGVBQWUsQ0FBQztBQUV6RDtJQUNJLFVBQVU7SUFDVix5QkFBeUI7SUFDekIsdURBQXVEO0FBQzNEIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2FkbWluL2NvbXBvbmVudHMvcGxhbi1wYWdlL3BsYW4tcGFnZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQtcHJpY2luZyB7XHJcbiAgICB6LWluZGV4OiAxO1xyXG4gICAgYm9yZGVyOiAzcHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbn1cclxuLmNhcmQtcHJpY2luZyAubGlzdC11bnN0eWxlZCBsaSB7XHJcbiAgICBwYWRkaW5nOiAuNXJlbSAwO1xyXG4gICAgY29sb3I6ICM2Yzc1N2Q7XHJcbn1cclxuXHJcblxyXG4uYmctcHJpbWFyeXtiYWNrZ3JvdW5kOiM1OEE3RkUhaW1wb3J0YW50O2ZvbnQtc2l6ZTogMTRweDt9XHJcblxyXG4uY2FyZC1wcmljaW5nOmhvdmVyIHtcclxuICAgIHotaW5kZXg6IDE7XHJcbiAgICBib3JkZXI6IDNweCBzb2xpZCAjNThBN0ZFO1xyXG4gICAgYm94LXNoYWRvdzowIDAuNXJlbSAxcmVtIHJnYmEoMCwgMCwgMCwgMC4xNSkgIWltcG9ydGFudDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/admin/components/plan-page/plan-page.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/layout/admin/components/plan-page/plan-page.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Admin\r\n          <span>/ PlanPage </span>\r\n        </h2>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead mb-20\">\r\n      <div>\r\n        <h3>Pricing Plan</h3>\r\n      </div>\r\n      <div>\r\n        <!-- <button type=\"submit\" class=\"btn btn-send\"  data-toggle=\"modal\" data-target=\".addplan\">Add Plan</button> -->\r\n      </div>\r\n    </div>\r\n\r\n    <!-- <div class=\"pricing card-deck flex-column flex-md-row mb-3 card_section\" >\r\n      <div *ngFor=\"let plan of pricingPlanList\" class=\"card card-pricing text-center px-3 mb-4\">\r\n        <span class=\"h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm\">{{plan.planName | slice: 0:20}}</span>\r\n        <div class=\"bg-transparent card-header pt-4 border-0\">\r\n          <h1 class=\"h1 font-weight-normal text-primary text-center mb-0\" data-pricing-value=\"1200\">$<span class=\"price\">{{plan.planPrice}}</span>\r\n            <span class=\"h6 text-muted ml-2\" *ngIf=\"plan.frequency == 'month'\">/ per month</span>\r\n            <span class=\"h6 text-muted ml-2\" *ngIf=\"plan.frequency == 'year'\">/ per year</span>\r\n          </h1>\r\n        </div>\r\n        <div class=\"card-body pt-0\">\r\n          <ul class=\"list-unstyled mb-4\">\r\n            <li><b>{{plan.planName}}</b></li>\r\n            <li>Up to {{plan.numberofUsers}} users</li>\r\n            <li class=\"listing\">{{plan.remark}}</li>\r\n          </ul>\r\n          <button type=\"button\" data-target=\".addplan\" data-toggle=\"modal\" (click)=\"getPlanDetails(plan)\" class=\"btn btn-primary mb-3\">Purchase Plan</button>\r\n        </div>\r\n      </div>\r\n    \r\n    </div> -->\r\n\r\n    <!-- <div class=\"row\">\r\n        <div class=\"col col-md-4\">\r\n            <div class=\"pricing card-deck flex-column flex-md-row mb-3 card_section\">\r\n         \r\n     \r\n                <div *ngFor=\"let plan of pricingPlanList\" class=\"card card-pricing text-center px-3 mb-4\" >\r\n                    <span class=\"h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm\">{{plan.planName}}</span>\r\n                    <div class=\"bg-transparent card-header pt-4 border-0\">\r\n                      <h1 class=\"h1 font-weight-normal text-primary text-center mb-0\" data-pricing-value=\"1200\">$<span class=\"price\">{{plan.planPrice}}</span>\r\n                        <span class=\"h6 text-muted ml-2\" *ngIf=\"plan.frequency == 'month'\">/ per month</span>\r\n                        <span class=\"h6 text-muted ml-2\" *ngIf=\"plan.frequency == 'year'\">/ per year</span>\r\n                      </h1>\r\n                    </div>\r\n                    <div class=\"card-body pt-0\">\r\n                      <ul class=\"list-unstyled mb-4\">\r\n                        <li>Up to {{plan.numberofUsers}} users</li>\r\n                        <li class=\"listing\">{{plan.remark}}</li>\r\n                      </ul>\r\n                      <button type=\"button\"  data-toggle=\"modal\" data-target=\".addplan\" (click)=\"getPlanDetails(plan)\" class=\"btn btn-primary mb-3\">Purchse Plan</button>\r\n                    </div>\r\n                  </div>\r\n            </div>\r\n        </div>\r\n      </div> -->\r\n\r\n <!-- Deepak start  -->\r\n\r\n <div class=\"pricing card-deck card_section mt-20\" >\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-3\" *ngFor=\"let plan of pricingPlanList\">\r\n        <div   class=\"card card-pricing text-center px-3 mb-4\" >\r\n          <span class=\"h6 w-60 mx-auto px-4 py-1 rounded-bottom bg-primary text-white shadow-sm\">{{plan.planName}}</span>\r\n          <div class=\"bg-transparent card-header pt-4 border-0\">\r\n            <h1 class=\"h1 font-weight-normal text-primary text-center mb-0\" data-pricing-value=\"1200\">$<span class=\"price\">{{plan.planPrice}}</span>\r\n              <span class=\"h6 text-muted ml-2\" *ngIf=\"plan.frequency == 'month'\">/ per month</span>\r\n              <span class=\"h6 text-muted ml-2\" *ngIf=\"plan.frequency == 'year'\">/ per year</span>\r\n            </h1>\r\n          </div>\r\n          <div class=\"card-body pt-0\">\r\n            <ul class=\"list-unstyled mb-4\">\r\n              <li>Up to {{plan.numberofUsers}} users</li>\r\n              <li class=\"listing\">{{plan.remark}}</li>\r\n              <!-- <li>Monthly updates</li>\r\n              <li>Free cancelation</li> -->\r\n            </ul>\r\n            <button type=\"button\"  data-toggle=\"modal\" data-target=\".addplan\" (click)=\"getPlanDetails(plan)\" class=\"btn btn-primary mb-3\">Purchase Plan</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    \r\n</div>\r\n\r\n  <!-- Deepak Stop -->\r\n    <!-- last -->\r\n  </div>\r\n\r\n  \r\n<div class=\"modal fade addplan\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Purchase</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"planForm\">\r\n          <div class=\"row mb-20 mt-20\">\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Agency</label>\r\n                <select formControlName=\"agencyid\" class=\"form-control\">\r\n                  <option value=\"\">Select</option>\r\n                  <option *ngFor=\"let agency of agencyList\" [value]=\"agency.id\">{{agency.agencyName}}</option>\r\n                </select>\r\n                <div *ngIf=\"f.agencyid.invalid && (f.agencyid.dirty || f.agencyid.touched)\" class=\"text-left errormsg\">\r\n                    <span *ngIf=\"f.agencyid.errors.required\">\r\n                      <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select agency</span>\r\n                    </span>\r\n                  </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\"  class=\"btn btn-primary\" (click)=\"subscribePlan()\">Subscribe</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n"

/***/ }),

/***/ "./src/app/layout/admin/components/plan-page/plan-page.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/layout/admin/components/plan-page/plan-page.component.ts ***!
  \**************************************************************************/
/*! exports provided: PlanPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlanPageComponent", function() { return PlanPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/admin/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PlanPageComponent = /** @class */ (function () {
    function PlanPageComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.pricingPlanList = [];
        this.agencyList = [];
        this.planId = 0;
    }
    PlanPageComponent.prototype.ngOnInit = function () {
        this.getAllPricingPlan();
        this.createPlanForm();
        this.getAllAgencyList();
    };
    PlanPageComponent.prototype.getAllPricingPlan = function () {
        var _this = this;
        this.spinner.show();
        this.pricingPlanList = [];
        var req = {
            'limit': 0,
            'page': 0
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetAllPricingPlanDetails, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.pricingPlanList = res.body.data;
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
    PlanPageComponent.prototype.createPlanForm = function () {
        this.planForm = this.fb.group({
            agencyid: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required],
        });
    };
    PlanPageComponent.prototype.getPlanDetails = function (plan) {
        this.createPlanForm();
        this.planId = plan.id;
    };
    PlanPageComponent.prototype.getAllAgencyList = function () {
        var _this = this;
        this.agencyList = [];
        var req = {
            'limit': 0,
            'page': 0,
            'status': 1,
            'AgencyName': ''
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetAllAgencyDetails, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.agencyList = res.body.data;
            }
            else {
                _this.error.unknownError();
            }
        }, function (err) {
            _this.error.commonError(err);
        });
    };
    Object.defineProperty(PlanPageComponent.prototype, "f", {
        get: function () { return this.planForm.controls; },
        enumerable: true,
        configurable: true
    });
    PlanPageComponent.prototype.subscribePlan = function () {
        var _this = this;
        this.spinner.show();
        if (this.planForm.valid) {
            var req = {
                'id': 0,
                'agencyID': this.planForm.value.agencyid,
                'planID': this.planId,
                'isOffline': true,
                'createdBy': 1
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].SaveSubscriptionInformation, req, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('.addplan').modal('hide');
                    _this.notification.success({ message: 'Subscription Successfull', title: '' });
                    _this.spinner.hide();
                }
                else if (res.body.statusCode === 205) {
                    _this.notification.warning({ message: 'Your previous subscription plan still active', title: '' });
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
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.planForm);
        }
    };
    PlanPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-plan-page',
            template: __webpack_require__(/*! ./plan-page.component.html */ "./src/app/layout/admin/components/plan-page/plan-page.component.html"),
            styles: [__webpack_require__(/*! ./plan-page.component.css */ "./src/app/layout/admin/components/plan-page/plan-page.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_8__["ConfirmationService"]])
    ], PlanPageComponent);
    return PlanPageComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.css":
/*!*********************************************************************************************!*\
  !*** ./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL3BvbGljeS1hY2NlcHQtbGlzdC9wb2xpY3ktYWNjZXB0LWxpc3QuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.html":
/*!**********************************************************************************************!*\
  !*** ./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"container-fluid\">\n\n    <div class=\"pagetitle\">\n      <div>\n        <h2>Admin\n          <span>/ Agency List </span>\n        </h2>\n      </div>\n      <div>\n        <button type=\"submit\" class=\"btn btn-send\" (click)=\"generateAgencyCsvFile()\" data-toggle=\"modal\">Download CSV</button>\n      </div>\n    </div>\n\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\n      <div>\n        <h3>Agency List</h3>\n      </div>\n    </div>\n\n\n    <div class=\"tab-content\" id=\"pills-tabContent\">\n\n      <div class=\"tab-pane fade show active\" id=\"pills-allergyType\" role=\"tabpanel\" aria-labelledby=\"allergyType\">\n        <div class=\"innertable\">\n          <div class=\"table-responsive\">\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Agency Name</th>\n                  <th scope=\"col\">Owner First Name</th>\n                  <th scope=\"col\">Owner Last Name</th>\n                  <th scope=\"col\">Registration Date</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let agency of agencyList\">\n                  <td>{{agency.agencyName}}</td>\n                  <td>{{agency.ownerFirstName}}</td>\n                  <td>{{agency.ownerLastName}}</td>\n                  <td>{{agency.policyEULAAcceptDate | date:'medium'}}</td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"text-center\">\n              <span class=\"text-center\" *ngIf=\"(agencyList.length == 0 && !loader)\">No record found</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n\n\n<app-confirm-box></app-confirm-box>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.ts ***!
  \********************************************************************************************/
/*! exports provided: PolicyAcceptListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolicyAcceptListComponent", function() { return PolicyAcceptListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/admin/shared/constant.ts");
/* harmony import */ var angular2_csv_Angular2_csv__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! angular2-csv/Angular2-csv */ "./node_modules/angular2-csv/Angular2-csv.js");
/* harmony import */ var angular2_csv_Angular2_csv__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(angular2_csv_Angular2_csv__WEBPACK_IMPORTED_MODULE_10__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var PolicyAcceptListComponent = /** @class */ (function () {
    function PolicyAcceptListComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.agencyList = [];
        this.ParentDataForCsv = [];
        this.csvFileNameForParent = 'AgencyList';
        this.csvOptionsForAgency = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: false,
            headers: [
                'AgencyName',
                'OwnerName',
                'TimeOfRegistration'
            ],
            showTitle: false,
            title: [
                'AgencyName',
                'OwnerName',
                'TimeOfRegistration'
            ],
            useBom: false,
            removeNewLines: true,
            keys: [
                'AgencyName',
                'OwnerName',
                'TimeOfRegistration'
            ],
        };
    }
    PolicyAcceptListComponent.prototype.ngOnInit = function () {
        this.getAllAgencyList();
    };
    PolicyAcceptListComponent.prototype.getAllAgencyList = function () {
        var _this = this;
        this.agencyList = [];
        var req = {
            'limit': 0,
            'page': 0,
            'status': 1,
            'AgencyName': ''
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetAllAgencyDetails, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.agencyList = res.body.data;
            }
            else {
                _this.error.unknownError();
            }
        }, function (err) {
            _this.error.commonError(err);
        });
    };
    PolicyAcceptListComponent.prototype.generateAgencyCsvFile = function () {
        var csvArrayForParent = [];
        this.agencyList.forEach(function (element) {
            csvArrayForParent.push({
                AgencyName: element.agencyName,
                OwnerName: element.ownerName,
                TimeOfRegistration: element.policyEULAAcceptDate
            });
        });
        this.ParentDataForCsv = csvArrayForParent;
        // tslint:disable-next-line: no-unused-expression
        new angular2_csv_Angular2_csv__WEBPACK_IMPORTED_MODULE_10__["Angular2Csv"](this.ParentDataForCsv, this.csvFileNameForParent, this.csvOptionsForAgency);
        this.isDownloading = false;
    };
    PolicyAcceptListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-policy-accept-list',
            template: __webpack_require__(/*! ./policy-accept-list.component.html */ "./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.html"),
            styles: [__webpack_require__(/*! ./policy-accept-list.component.css */ "./src/app/layout/admin/components/policy-accept-list/policy-accept-list.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_4__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_8__["ConfirmationService"]])
    ], PolicyAcceptListComponent);
    return PolicyAcceptListComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/pricing-plan/pricing-plan.component.css":
/*!*********************************************************************************!*\
  !*** ./src/app/layout/admin/components/pricing-plan/pricing-plan.component.css ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL3ByaWNpbmctcGxhbi9wcmljaW5nLXBsYW4uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/admin/components/pricing-plan/pricing-plan.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/layout/admin/components/pricing-plan/pricing-plan.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Admin\r\n          <span>/ Pricing Plan </span>\r\n        </h2>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\r\n      <div>\r\n        <h3>Pricing Plan</h3>\r\n      </div>\r\n      <div>\r\n        <button type=\"submit\" class=\"btn btn-send\" data-toggle=\"modal\" (click)=\"clearForm()\" data-target=\".addplan\">Add Plan</button>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <div class=\"innertable\">\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table\">\r\n          <thead class=\"thead-light\">\r\n            <tr>\r\n              <!-- <th scope=\"col\">Plan #ID</th> -->\r\n              <th scope=\"col\">Name</th>\r\n              <th scope=\"col\">Price($)</th>\r\n              <th scope=\"col\">Maximun Users</th>\r\n              <th scope=\"col\">Status</th>\r\n              <th scope=\"col\" class=\"text-center\">Actions</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor=\"let plan of pricingPlanList\">\r\n              <td>{{plan.planName}}</td>\r\n              <td>${{plan.planPrice}}</td>\r\n              <td>{{plan.numberofUsers}}</td>\r\n              <td>{{plan.isActive ? 'Active': 'In Active' }}</td>\r\n              <td class=\"text-center\">\r\n                <a data-toggle=\"modal\" data-target=\".addplan\" (click)=\"getPlanDetails(plan)\">\r\n                  <i class=\"fa fa-eye\" aria-hidden=\"true\" ></i>\r\n                </a>\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div class=\"modal fade addplan\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">{{addMode? 'Add Pricing Plan' : 'Pricing Plan Details' }}</h5>\r\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <form [formGroup]=\"pricingForm\">\r\n          <div class=\"row mb-20 mt-20\">\r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Plan Name (Max length 25 char)</label>\r\n                <input type=\"text\" formControlName=\"planname\" maxlength=\"25\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Enter plan name\">\r\n                <div *ngIf=\"f.planname.invalid && (f.planname.dirty || f.planname.touched)\" class=\"text-left errormsg\">\r\n                    <span *ngIf=\"f.planname.errors.required\">\r\n                      <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter plan name</span>\r\n                    </span>\r\n                  </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">No of User</label>\r\n                  <input type=\"number\" formControlName=\"noofusers\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Number of user\">\r\n                  <div *ngIf=\"f.noofusers.invalid && (f.noofusers.dirty || f.noofusers.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.noofusers.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter no of user</span>\r\n                      </span>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n          </div>\r\n\r\n\r\n          <div class=\"row mb-20\">\r\n            \r\n            <div class=\"col-lg-6\">\r\n              <div class=\"form-group\">\r\n                <label for=\"\">Price($)</label>\r\n                <input type=\"number\" formControlName=\"price\" class=\"form-control\" id=\"\" aria-describedby=\"\" placeholder=\"Price\">\r\n                <div *ngIf=\"f.price.invalid && (f.price.dirty || f.price.touched)\" class=\"text-left errormsg\">\r\n                    <span *ngIf=\"f.price.errors.required\">\r\n                      <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter price</span>\r\n                    </span>\r\n                  </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-lg-6\">\r\n                <div class=\"form-group\">\r\n                  <label for=\"\">Time Period</label>\r\n                  <select formControlName=\"limit\" class=\"form-control\">\r\n                    <option value=\"\">Select</option>\r\n                    <option value=\"month\">One Month</option>\r\n                    <option value=\"year\">One Year</option>\r\n                  </select>\r\n                  <div *ngIf=\"f.limit.invalid && (f.limit.dirty || f.limit.touched)\" class=\"text-left errormsg\">\r\n                      <span *ngIf=\"f.limit.errors.required\">\r\n                        <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select time period</span>\r\n                      </span>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n          </div>\r\n          <div class=\"row mb-20\">\r\n              <div class=\"col-lg-12\">\r\n                  <div class=\"form-group\">\r\n                    <label for=\"\">Remark (Max length 100 char)</label>\r\n                    <textarea name=\"\" maxlength=\"100\" formControlName=\"remark\" placeholder=\"Remark\" class=\"form-control\" id=\"\"  rows=\"6\"></textarea>\r\n                  </div>\r\n                </div>\r\n          </div>\r\n          <div class=\"row mb-20\">\r\n              <div class=\"col-lg-12\"> \r\n                  <div class=\"\">\r\n                      <label class=\"checkboxcustom\">\r\n                        <input type=\"checkbox\" id=\"checkbox-in\" class=\"abc\" formControlName=\"active\" >\r\n                        <span class=\"checkmark abc\"></span><label style=\"margin-left: 14px;\"> IsActive</label>\r\n                      </label>\r\n                    </div>\r\n              </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n        <button type=\"button\"  class=\"btn btn-primary\" (click)=\"createNewPlan()\">{{addMode? 'Add': 'Save Chnage'}}</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/pricing-plan/pricing-plan.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/layout/admin/components/pricing-plan/pricing-plan.component.ts ***!
  \********************************************************************************/
/*! exports provided: PricingPlanComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PricingPlanComponent", function() { return PricingPlanComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/admin/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PricingPlanComponent = /** @class */ (function () {
    function PricingPlanComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.totalRecord = 0;
        this.pricingPlanList = [];
        this.pageNo = 0;
        this.limit = 10;
        this.planId = 0;
        this.loader = true;
        this.PaymentVM = {};
        this.addMode = true;
    }
    PricingPlanComponent.prototype.ngOnInit = function () {
        this.getAllPricingPlan();
        this.createPlanForm();
    };
    PricingPlanComponent.prototype.createPlanForm = function () {
        this.pricingForm = this.fb.group({
            planname: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            noofusers: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            price: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            remark: [''],
            limit: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            active: [true]
        });
    };
    PricingPlanComponent.prototype.updatePlanForm = function () {
        this.pricingForm = this.fb.group({
            planname: [this.PaymentVM.planName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            noofusers: [this.PaymentVM.numberofUsers, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            price: [this.PaymentVM.planPrice, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            remark: [this.PaymentVM.remark],
            limit: [this.PaymentVM.frequency, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            active: [this.PaymentVM.IsActive]
        });
    };
    Object.defineProperty(PricingPlanComponent.prototype, "f", {
        get: function () { return this.pricingForm.controls; },
        enumerable: true,
        configurable: true
    });
    PricingPlanComponent.prototype.getAllPricingPlan = function () {
        var _this = this;
        this.spinner.show();
        this.pricingPlanList = [];
        var req = {
            'limit': this.limit,
            'page': this.pageNo
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetAllPricingPlanDetails, req, null).subscribe(function (res) {
            _this.totalRecord = res.body.totalRows;
            if (res.body.statusCode === 200) {
                _this.pricingPlanList = res.body.data;
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
    PricingPlanComponent.prototype.createNewPlan = function () {
        var _this = this;
        this.spinner.show();
        if (this.pricingForm.valid) {
            var req = {
                'id': this.addMode ? 0 : this.planId,
                'planName': this.pricingForm.value.planname,
                'numberofUsers': this.pricingForm.value.noofusers,
                'planPrice': this.pricingForm.value.price,
                'frequency': this.pricingForm.value.limit,
                'remark': this.pricingForm.value.remark,
                'IsActive': this.pricingForm.value.active
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].SavePricingPlanInformation, req, null).subscribe(function (res) {
                _this.totalRecord = res.body.totalRows;
                if (res.body.statusCode === 200) {
                    _this.notification.success({ message: _this.addMode ? 'Plan has been created successfully' :
                            'Plan has been update successfully', title: '' });
                    $('.addplan').modal('hide');
                    _this.getAllPricingPlan();
                }
                else if (res.body.statusCode === 987) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'This plan is already in used ', title: 'Cannnot be updated' });
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
            this.commonService.validateAllFields(this.pricingForm);
        }
    };
    PricingPlanComponent.prototype.getPlanDetails = function (obj) {
        this.addMode = false;
        this.planId = obj.id;
        this.PaymentVM.IsActive = obj.isActive;
        this.PaymentVM.planName = obj.planName;
        this.PaymentVM.numberofUsers = obj.numberofUsers;
        this.PaymentVM.planPrice = obj.planPrice;
        this.PaymentVM.remark = obj.remark;
        this.PaymentVM.frequency = obj.frequency;
        this.updatePlanForm();
    };
    PricingPlanComponent.prototype.clearForm = function () {
        this.planId = 0;
        this.createPlanForm();
        this.addMode = true;
    };
    PricingPlanComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-pricing-plan',
            template: __webpack_require__(/*! ./pricing-plan.component.html */ "./src/app/layout/admin/components/pricing-plan/pricing-plan.component.html"),
            styles: [__webpack_require__(/*! ./pricing-plan.component.css */ "./src/app/layout/admin/components/pricing-plan/pricing-plan.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_8__["ConfirmationService"]])
    ], PricingPlanComponent);
    return PricingPlanComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.css":
/*!***************************************************************************************************!*\
  !*** ./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.css ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL3N1cGVyLWFkbWluLWRhc2hib2FyZC9zdXBlci1hZG1pbi1kYXNoYm9hcmQuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.html":
/*!****************************************************************************************************!*\
  !*** ./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"pagetitle mb-20\">\r\n      <h2>Dashboard</h2>\r\n    </div>\r\n    <div class=\"pagebadges\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-4 col-md-4\">\r\n          <div class=\"badgebox\">\r\n            <div>\r\n              <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\r\n            </div>\r\n            <div>\r\n              <h3>{{approvedAgencyCount}}</h3>\r\n              <p>Approved Agency</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-lg-4 col-md-4\">\r\n          <div class=\"badgebox\">\r\n            <div>\r\n              <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\r\n            </div>\r\n            <div>\r\n              <h3>{{unApprovedAgencyCount}}</h3>\r\n              <p>Unapproved Agency</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-lg-4 col-md-4\">\r\n          <div class=\"badgebox\">\r\n            <div>\r\n              <i class=\"fa fa-user\" aria-hidden=\"true\"></i>\r\n            </div>\r\n            <div>\r\n              <h3>{{subscriptionActiveAgencyCount}}</h3>\r\n              <p>Active Subscription</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12 col-md-12\">\r\n        <div class=\"whitebox white_box_table\">\r\n          <div class=\"head\">Organization</div>\r\n          <!-- Serach -->\r\n          <div class=\"card cardfilter\">\r\n            <div class=\"row algcenter\">    \r\n              <div class=\"leftfilter\">\r\n                <div class=\"search-date\">\r\n                  <div class=\"pr15 label-text\">Search Name : </div>\r\n                  <input type=\"text\" placeholder=\"Search Agency Name\" (keydown)=\"keyDownFunction($event)\" [(ngModel)]=\"nameSearch\"\r\n                    class=\"form-control mr15\" id=\"\">\r\n                </div>\r\n              </div>\r\n              <!-- <div class=\"filter-buttons\">\r\n                <button type=\"submit\" class=\"btn btn-send\" (click)=\"getAllAgencyPlanDetailsList()\">Search</button>\r\n              </div> -->\r\n            </div>\r\n          </div>\r\n          <!-- search end -->\r\n          <div class=\"table-responsive\">\r\n            <table class=\"table\">\r\n              <thead class=\"thead-light\">\r\n                <tr>                  \r\n                  <th scope=\"col\">Agency</th>\r\n                  <th scope=\"col\">Last Logged In</th>\r\n                  <th scope=\"col\">Owner</th>\r\n                  <th>Email</th>\r\n                  <th>City</th>\r\n                  <th scope=\"col\">State</th>\r\n                  <th>Plan</th>\r\n                  <th scope=\"col\">Valid From</th>\r\n                  <th scope=\"col\">Valid To</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let agency of agencyPlanList\">                 \r\n                  <td>{{agency.agencyName}}</td>\r\n                  <td *ngIf=\"agency.lastLogin == null\">-</td>\r\n                  <td *ngIf=\"agency.lastLogin != null\">{{agency.lastLogin| date}}</td>\r\n                  <td>{{agency.ownerName}}</td>\r\n                  <td>{{agency.emailId}} </td>\r\n                  <td>{{agency.cityName}} </td>\r\n                  <td>{{agency.stateName}}</td>\r\n                  <td>{{agency.planName}}</td>\r\n                  <td>{{agency.validFrom| date}}</td>\r\n                  <td>{{agency.validTo| date}}</td>\r\n                  \r\n                </tr>\r\n               \r\n\r\n              </tbody>\r\n            </table>\r\n            <div class=\"text-center\">\r\n              <span class=\"text-center\" *ngIf=\"(agencyPlanList.length == 0 && !loader)\">No record found</span>\r\n            </div>\r\n          </div>\r\n          <p-paginator [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\" (onPageChange)=\"paginate($event)\"></p-paginator>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n\r\n\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: SuperAdminDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SuperAdminDashboardComponent", function() { return SuperAdminDashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var src_app_shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var src_app_shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/admin/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SuperAdminDashboardComponent = /** @class */ (function () {
    function SuperAdminDashboardComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
        this.totalRecord = 0;
        this.agencyPlanList = [];
        this.countList = [];
        this.pageNo = 0;
        this.limit = 10;
        this.loader = true;
        this.approvedAgencyCount = 0;
        this.subscriptionActiveAgencyCount = 0;
        this.unApprovedAgencyCount = 0;
        this.nameSearch = '';
    }
    SuperAdminDashboardComponent.prototype.ngOnInit = function () {
        this.getAllAgencyPlanDetailsList();
        this.getCount();
    };
    SuperAdminDashboardComponent.prototype.getAllAgencyPlanDetailsList = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        this.agencyPlanList = [];
        this.countList = [];
        var req = {
            'limit': this.limit,
            'page': this.pageNo,
            'AgencyName': this.nameSearch
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetAllAgencyPlanDetails, req, null).subscribe(function (res) {
            _this.totalRecord = res.body.totalRows;
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                _this.agencyPlanList = res.body.data;
                _this.loader = false;
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
    SuperAdminDashboardComponent.prototype.getCount = function () {
        var _this = this;
        this.spinner.show();
        this.countList = [];
        var req = {
            'limit': this.limit,
            'page': this.pageNo
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetCountDetailsForSuperAdmin, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.countList = res.body.data;
                _this.approvedAgencyCount = res.body.data.approvedAgencyCount;
                _this.unApprovedAgencyCount = res.body.data.unApprovedAgencyCount;
                _this.subscriptionActiveAgencyCount = res.body.data.subscriptionActiveAgencyCount;
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
    SuperAdminDashboardComponent.prototype.paginate = function (event) {
        this.pageNo = event.page;
        // this.limit = event.page;
        this.getAllAgencyPlanDetailsList();
    };
    SuperAdminDashboardComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode === 13) {
            this.getAllAgencyPlanDetailsList();
        }
    };
    SuperAdminDashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-super-admin-dashboard',
            template: __webpack_require__(/*! ./super-admin-dashboard.component.html */ "./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./super-admin-dashboard.component.css */ "./src/app/layout/admin/components/super-admin-dashboard/super-admin-dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_1__["AdminApiService"], src_app_shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_8__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], src_app_shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_2__["NotificationService"],
            src_app_shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["ConfirmationService"]])
    ], SuperAdminDashboardComponent);
    return SuperAdminDashboardComponent;
}());



/***/ }),

/***/ "./src/app/layout/admin/components/text-plan/text-plan.component.css":
/*!***************************************************************************!*\
  !*** ./src/app/layout/admin/components/text-plan/text-plan.component.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9hZG1pbi9jb21wb25lbnRzL3RleHQtcGxhbi90ZXh0LXBsYW4uY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/layout/admin/components/text-plan/text-plan.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/layout/admin/components/text-plan/text-plan.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"container-fluid\">\n\n    <div class=\"pagetitle\">\n      <div>\n        <h2>Admin\n          <span>/ Text Message Plan </span>\n        </h2>\n      </div>\n      <div>\n        <button type=\"submit\" class=\"btn btn-send\" (click)=\"clearTextPlanForm()\" data-toggle=\"modal\"\n          data-target=\".addtextplan\">Add Text Plan</button>\n      </div>\n    </div>\n\n    <div class=\"d-flex justify-content-between align-items-center mt-20 subhead\">\n      <div>\n        <h3>Coupon List</h3>\n      </div>\n    </div>\n\n\n    <div class=\"tab-content\" id=\"pills-tabContent\">\n\n      <div class=\"tab-pane fade show active\" id=\"pills-allergyType\" role=\"tabpanel\" aria-labelledby=\"allergyType\">\n        <div class=\"innertable\">\n          <div class=\"table-responsive\">\n            <table class=\"table\">\n              <thead class=\"thead-light\">\n                <tr>\n                  <th scope=\"col\">Amount</th>\n                  <th scope=\"col\">Messages</th>\n                  <th scope=\"col\" class=\"text-center\">Change Status</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr *ngFor=\"let plan of txtPlanList\">\n                  <td>{{plan.amount}}</td>\n                  <td>{{plan.messages}}</td>\n                  <td class=\"text-center\">\n                    <button class=\"form-control\" *ngIf=\"!plan.isDeleted\" class=\"btn btn-warning\"\n                      (click)=\"deactivatePlan(plan)\">Deactivate</button>\n                    <button class=\"form-control\" *ngIf=\"plan.isDeleted\" class=\"btn btn-success\"\n                      (click)=\"activatePlan(plan)\">Activate</button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n            <div class=\"text-center\">\n              <span class=\"text-center\" *ngIf=\"(txtPlanList.length == 0 && !loader)\">No record found</span>\n            </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n\n  </div>\n</div>\n\n\n<div class=\"modal fade addtextplan\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog modal-lg\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Add Text Plan</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <form [formGroup]=\"txtPlanForm\">\n          <div class=\"row mb-20 mt-20\">\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"\">Amount*</label>\n                <input type=\"text \" class=\"form-control\" id=\"\" aria-describedby=\"\" formControlName=\"amount\"\n                  (keypress)=\"commonService.allowOnlyNumber($event)\" placeholder=\"Plan Amount\">\n                <div *ngIf=\"t.amount.invalid && (t.amount.dirty || t.amount.touched)\" class=\"text-left errormsg\">\n                  <span *ngIf=\"t.amount.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter plan amount</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n\n            <div class=\"col-lg-6\">\n              <div class=\"form-group\">\n                <label for=\"\">Messages*</label>\n                <input type=\"text \" (keypress)=\"commonService.allowOnlyNumber($event)\" class=\"form-control\" id=\"\"\n                  (keypress)=\"commonService.allowOnlyNumber($event)\" aria-describedby=\"\" formControlName=\"messages\"\n                  placeholder=\"Number of messages\">\n                <div *ngIf=\"t.messages.invalid && (t.messages.dirty || t.messages.touched)\" class=\"text-left errormsg\">\n                  <span *ngIf=\"t.messages.errors.required\">\n                    <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter number of messages</span>\n                  </span>\n                </div>\n              </div>\n            </div>\n          </div>\n        </form>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"savePlan()\">Add Plan</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<app-confirm-box></app-confirm-box>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>"

/***/ }),

/***/ "./src/app/layout/admin/components/text-plan/text-plan.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/layout/admin/components/text-plan/text-plan.component.ts ***!
  \**************************************************************************/
/*! exports provided: TextPlanComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextPlanComponent", function() { return TextPlanComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/api */ "./node_modules/primeng/api.js");
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_api__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/services/admin-api.service */ "./src/app/layout/admin/shared/services/admin-api.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/admin/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TextPlanComponent = /** @class */ (function () {
    function TextPlanComponent(apiService, error, spinner, notification, commonService, fb, route, confirmationService) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
        this.route = route;
        this.confirmationService = confirmationService;
    }
    TextPlanComponent.prototype.ngOnInit = function () {
        this.txtPlanList = [];
        this.createTextPlanForm();
        this.getPlan();
    };
    TextPlanComponent.prototype.createTextPlanForm = function () {
        this.txtPlanForm = this.fb.group({
            amount: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            messages: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    };
    Object.defineProperty(TextPlanComponent.prototype, "t", {
        get: function () { return this.txtPlanForm.controls; },
        enumerable: true,
        configurable: true
    });
    TextPlanComponent.prototype.getPlan = function () {
        var _this = this;
        var req = {
            'isActive': true,
            'agencyID': 0
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].GetTextMessagePlan, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.txtPlanList = res.body.data;
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
    // Save Plan
    TextPlanComponent.prototype.savePlan = function () {
        var _this = this;
        if (this.txtPlanForm.valid) {
            var data = {
                'id': 0,
                'createdBy': this.commonService.getLoggedInUserId(),
                'Amount': this.txtPlanForm.value.amount,
                'Messages': this.txtPlanForm.value.messages,
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].SaveTextMessagePlan, data, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    $('.addtextplan').modal('hide');
                    _this.notification.success({ message: 'Text Message Plan Added Successfully.', title: '' });
                    _this.getPlan();
                }
                else if (res.body.statusCode === 206) {
                    _this.spinner.hide();
                    _this.notification.warning({ message: 'Text Message Plan already exists with same amount.', title: '' });
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
            this.commonService.validateAllFields(this.txtPlanForm);
        }
    };
    TextPlanComponent.prototype.clearTextPlanForm = function () {
        this.createTextPlanForm();
    };
    // Method to delete/deactivate Plan
    TextPlanComponent.prototype.deactivatePlan = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to deactivate this Plan?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'Id': value.id,
                    'IsDeleted': true,
                    'DeletedBy': _this.commonService.getReleventUserId('userdetails'),
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].ActivateDeactivateTextMessagePlan, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.notification.success({ message: 'This Plan has been deactivated', title: '' });
                        _this.getPlan();
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
        });
    };
    // Method to Activate Plan
    TextPlanComponent.prototype.activatePlan = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to activate this Plan?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'Id': value.id,
                    'IsDeleted': false,
                    'UpdatedBy': _this.commonService.getReleventUserId('userdetails'),
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["AdminAPIURLs"].ActivateDeactivateTextMessagePlan, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.notification.success({ message: 'This Plan has been activated', title: '' });
                        _this.getPlan();
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
        });
    };
    TextPlanComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-text-plan',
            template: __webpack_require__(/*! ./text-plan.component.html */ "./src/app/layout/admin/components/text-plan/text-plan.component.html"),
            styles: [__webpack_require__(/*! ./text-plan.component.css */ "./src/app/layout/admin/components/text-plan/text-plan.component.css")]
        }),
        __metadata("design:paramtypes", [_shared_services_admin_api_service__WEBPACK_IMPORTED_MODULE_8__["AdminApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_2__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"],
            primeng_api__WEBPACK_IMPORTED_MODULE_7__["ConfirmationService"]])
    ], TextPlanComponent);
    return TextPlanComponent;
}());



/***/ })

}]);
//# sourceMappingURL=admin-admin-module.js.map