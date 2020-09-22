(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["global-global-module"],{

/***/ "./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".info-icon{\r\n    margin-left: 174px;\r\n    font-size: 20px; \r\n    color: #383333;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2dsb2JhbC9jb21wb25lbnRzL2dsb2JhbC1hdXRob3JpemVkLXBlcnNvbi9nbG9iYWwtYXV0aG9yaXplZC1wZXJzb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsY0FBYztBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9nbG9iYWwvY29tcG9uZW50cy9nbG9iYWwtYXV0aG9yaXplZC1wZXJzb24vZ2xvYmFsLWF1dGhvcml6ZWQtcGVyc29uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW5mby1pY29ue1xyXG4gICAgbWFyZ2luLWxlZnQ6IDE3NHB4O1xyXG4gICAgZm9udC1zaXplOiAyMHB4OyBcclxuICAgIGNvbG9yOiAjMzgzMzMzO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.html":
/*!***********************************************************************************************************!*\
  !*** ./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n\r\n    <div class=\"pagetitle\">\r\n      <div>\r\n        <h2>Authorized Person\r\n        </h2>\r\n      </div>\r\n      <div>\r\n        <button type=\"submit\" *ngIf=\"isSubscriptionActive\" class=\"btn btn-red\" data-toggle=\"modal\" (click)=\"onClick()\">Add Authorized Person\r\n          </button>\r\n      </div>\r\n    </div>\r\n    <div class=\"subhead d-flex justify-content-between mt-20\">\r\n      <div>\r\n        <h3>Authorized Person</h3>\r\n      </div>\r\n      <div class=\"info-icon\">\r\n        <i class=\"fa fa-info-circle\" (click)=\"OpenInfoVideo()\" data-toggle=\"modal\"\r\n           aria-hidden=\"true\" title=\"Information Video\"></i>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"card cardfilter\">\r\n        <div class=\"row algcenter\">\r\n  \r\n          <div class=\"leftfilter\">\r\n            <div class=\"search-date\">\r\n              <div class=\"pr15 label-text\">Search Name : </div>\r\n              <input type=\"text\" placeholder=\"Authorized person name\" (keydown)=\"keyDownFunction($event)\" [(ngModel)]=\"nameSearch\"\r\n                class=\"form-control mr15\" id=\"\">\r\n            </div>\r\n            <div class=\"search-date\">\r\n              <div class=\"label-text\">Search By Emergency Contact</div>\r\n              <div class=\"pr15\">\r\n                <div class=\"form-group\">\r\n                  <select name=\"\" id=\"\" [(ngModel)]=\"showEmergency\">\r\n                    <option value=\"false\">All</option>\r\n                    <option value=\"true\">Emergency</option>\r\n                  </select>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"filter-buttons\">\r\n              <button type=\"submit\" class=\"btn btn-send\" (click)=\"getAllAuthorizedPersonList()\">Search</button>\r\n            </div>\r\n          </div>  \r\n        </div>\r\n      </div>\r\n    <div class=\"innertable\">\r\n      <div class=\"table-responsive\">\r\n        <table class=\"table\">\r\n          <thead class=\"thead-light\">\r\n            <tr>\r\n              <th scope=\"col\">Photo</th>\r\n              <th scope=\"col\">Authorized Person</th>\r\n              <th scope=\"col\">Parent Name</th>\r\n              <th scope=\"col\">Mobile</th>\r\n              <th *ngIf=\"role == 2\"  scope=\"col\">Quick Pin</th>\r\n              <!-- <th scope=\"col\">Email</th> -->\r\n              <th scope=\"col\">Emergancy Contact</th>\r\n              <!-- <th scope=\"col\">Associate Student</th> -->\r\n              <th scope=\"col\" class=\"text-center\">Details</th>\r\n              <th scope=\"col\" class=\"text-center\">Change Status</th>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr *ngFor = \"let authPerson of authorizedPersonList\">\r\n              <td>\r\n                <img src=\"{{authPerson.imagePath}}\" onError=\"this.src='assets/img/user.png'\" alt=\"\"\r\n                class=\"img-circle childimg\">\r\n              </td>\r\n              <td>{{authPerson.authorizedPersonName}}</td>\r\n              <td>{{authPerson.parentName}}</td>\r\n              <td>{{authPerson.mobile}}</td>\r\n              <!-- <td>{{authPerson.studentName}}</td> -->\r\n              <td *ngIf=\"role == 2\">{{authPerson.quickPin}}</td>\r\n              <!-- <td>{{authPerson.emailId}}</td> -->\r\n              <td>{{authPerson.isEmergencyContact? 'Yes': 'No'}}</td>\r\n              <td class=\"text-center\">\r\n                <a (click)=\"getDetails(authPerson)\" title=\"View Details/update\"><i class=\"fa fa-eye\"></i>  </a>\r\n              </td>\r\n              <td class=\"text-center\" >\r\n                <button class=\"form-control\" *ngIf=\"!authPerson.isDeleted && isSubscriptionActive\"   class=\"btn btn-warning\"\r\n                  (click)=\"deleteRow(authPerson)\">Deactivate</button>\r\n                <button class=\"form-control\" *ngIf=\"authPerson.isDeleted && isSubscriptionActive\" class=\"btn btn-success\"\r\n                  (click)=\"activatePerson(authPerson)\">Activate</button>\r\n\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <div class=\"text-center\">\r\n          <label *ngIf=\"!authorizedPersonList && !loader\">No record found!</label>\r\n        </div>\r\n        <p-paginator   [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\"\r\n              (onPageChange)=\"paginate($event)\"></p-paginator>\r\n      </div>\r\n      \r\n    </div>\r\n\r\n    <div class=\"modal fade \" id=\"authpermodal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\">Add Person</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <div class=\"upload-profile\">\r\n              <div>\r\n                <img src=\"{{image}}\" onError=\"this.src='assets/img/user.png'\" alt=\"\" class=\"img-fluid img-circle\">\r\n              </div>\r\n\r\n              <div class=\"upload-btn-wrapper\">\r\n                <button class=\"btn btn-send\">Upload a image</button>\r\n                <input type=\"file\" name=\"myfile\" #input (change)=\"processFile($event)\" />\r\n              </div>\r\n            </div>\r\n            <form [formGroup]=\"profileForm\">\r\n              <div class=\"form-fields\">\r\n                <div class=\"row mb-10 \">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Select Parent*</label>\r\n                      <select class=\"form-control\" [attr.disabled]=\"!isAddMode ? '' : null\" formControlName=\"parentName\" (change)=\"getAllStudentsList()\" id=\"authpermodal\">\r\n                        <option value=\"\">Select</option>\r\n                        <option *ngFor=\"let parent of parentList\" [value]=\"parent.id\">{{parent.parentName}} </option>\r\n                      </select>\r\n                      <div *ngIf=\"f.parentName.invalid && (f.parentName.dirty || f.parentName.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.parentName.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select Parent Name</span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label>Student Name*</label>\r\n                      <p-multiSelect [options]=\"studentsList\" formControlName=\"studentName\" [panelStyle]=\"{minWidth:'200px'}\"\r\n                        [maxSelectedLabels]=\"15\"></p-multiSelect>\r\n                      <div *ngIf=\"f.studentName.invalid && (f.studentName.dirty || f.studentName.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.studentName.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select student </span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row mb-10\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Authorized Person Name*</label>\r\n                      <input type=\"text \" maxlength=\"255\" class=\"form-control\" aria-describedby=\"\" placeholder=\"Authorized Person Name\"\r\n                        formControlName=\"authorizedPersonName\" (keypress)=\"commonService.allowAlphabetOnly($event)\">\r\n                      <div *ngIf=\"f.authorizedPersonName.invalid && (f.authorizedPersonName.dirty || f.authorizedPersonName.touched)\"\r\n                        class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.authorizedPersonName.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter Authorized Person\r\n                          </span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Mobile</label>\r\n                      <input type=\"text \" maxlength=\"10\" class=\"form-control\" aria-describedby=\"\" placeholder=\"Mobile\"\r\n                        formControlName=\"mobile\" (keypress)=\"commonService.allowOnlyNumber($event)\">\r\n                      <div *ngIf=\"f.mobile.invalid && (f.mobile.dirty || f.mobile.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.mobile.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter mobile number\r\n                          </span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row mb-10\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Email Address</label>\r\n                      <input type=\"email\" [attr.disabled]=\"!isAddMode ? '' : null\" class=\"form-control\" aria-describedby=\"\"\r\n                        placeholder=\"Email address\" formControlName=\"email\">\r\n                      <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.email.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter email</span>\r\n                        </span>\r\n                        <span *ngIf=\"f.email.errors.pattern\">\r\n                          <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter valid\r\n                            email address</span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                      <div class=\"form-group\" style=\"margin-top: 22px;\">\r\n                    <div class=\"\">\r\n                      <label class=\"checkboxcustom\">\r\n                        <input type=\"checkbox\" id=\"checkbox-in\" formControlName=\"emergencypickup\"> \r\n                        <span class=\"checkmark abc\"></span><label style=\"margin-left: 12px;\"> Emergency Contact</label>\r\n                      </label>\r\n                    </div>\r\n                    </div>\r\n                  </div>\r\n                </div>                \r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\" >Close</button>\r\n            <button type=\"button\" *ngIf=\"isSubscriptionActive  && !isDeactivated\" class=\"btn btn-primary\" (click)=\"saveDetails();\" >Save\r\n              Changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Modal for Parent Admin -->\r\n\r\n    <div class=\"modal fade \" id=\"authparentmodal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\r\n      aria-hidden=\"true\">\r\n      <div class=\"modal-dialog modal-lg\">\r\n        <div class=\"modal-content\">\r\n          <div class=\"modal-header\">\r\n            <h5 class=\"modal-title\">Add Person</h5>\r\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n              <span aria-hidden=\"true\">&times;</span>\r\n            </button>\r\n          </div>\r\n          <div class=\"modal-body\">\r\n            <div class=\"upload-profile\">\r\n              <div>\r\n                <img src=\"{{image}}\" onError=\"this.src='assets/img/user.png'\" alt=\"\" class=\"img-fluid img-circle\">\r\n              </div>\r\n\r\n              <div class=\"upload-btn-wrapper\">\r\n                <button class=\"btn btn-send\">Upload a image</button>\r\n                <input type=\"file\" name=\"myfile\" #input (change)=\"processFile($event)\" />\r\n              </div>\r\n            </div>\r\n            <form [formGroup]=\"profileForm\">\r\n              <div class=\"form-fields\">\r\n                <div class=\"row mb-10 \">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label>Student Name*</label>\r\n                      <p-multiSelect [options]=\"studentsList\" formControlName=\"studentName\" [panelStyle]=\"{minWidth:'200px'}\"\r\n                        [maxSelectedLabels]=\"15\"></p-multiSelect>\r\n                      <div *ngIf=\"f.studentName.invalid && (f.studentName.dirty || f.studentName.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.studentName.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select student </span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Authorized Person Name*</label>\r\n                      <input type=\"text \" maxlength=\"255\" class=\"form-control\" aria-describedby=\"\" placeholder=\"Authorized Person Name\"\r\n                        formControlName=\"authorizedPersonName\" (keypress)=\"commonService.allowAlphabetOnly($event)\">\r\n                      <div *ngIf=\"f.authorizedPersonName.invalid && (f.authorizedPersonName.dirty || f.authorizedPersonName.touched)\"\r\n                        class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.authorizedPersonName.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter Authorized Person\r\n                          </span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row mb-10\">\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Email Address</label>\r\n                      <input type=\"email\" [attr.disabled]=\"!isAddMode ? '' : null\" class=\"form-control\" aria-describedby=\"\"\r\n                        placeholder=\"Email address\" formControlName=\"email\">\r\n                      <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.email.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter email</span>\r\n                        </span>\r\n                        <span *ngIf=\"f.email.errors.pattern\">\r\n                          <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter valid\r\n                            email address</span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-lg-6\">\r\n                    <div class=\"form-group\">\r\n                      <label for=\"\">Mobile</label>\r\n                      <input type=\"text \" maxlength=\"10\" class=\"form-control\" aria-describedby=\"\" placeholder=\"Mobile\"\r\n                        formControlName=\"mobile\" (keypress)=\"commonService.allowOnlyNumber($event)\">\r\n                      <div *ngIf=\"f.mobile.invalid && (f.mobile.dirty || f.mobile.touched)\" class=\"text-left errormsg\">\r\n                        <span *ngIf=\"f.mobile.errors.required\">\r\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter mobile number\r\n                          </span>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"row mb-10\">\r\n                    <div class=\"col-lg-6\">\r\n                        <div class=\"form-group\" style=\"margin-top: 22px;\">\r\n                      <div class=\"\">\r\n                        <label class=\"checkboxcustom\">\r\n                          <input type=\"checkbox\" id=\"checkbox-in\" formControlName=\"emergencypickup\"> \r\n                          <span class=\"checkmark abc\"></span><label style=\"margin-left: 12px;\"> Emergency Contact</label>\r\n                        </label>\r\n                      </div>\r\n                      </div>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\" >Close</button>\r\n            <button type=\"button\" class=\"btn btn-primary\" *ngIf=\"isSubscriptionActive && !isDeactivated\" (click)=\"saveDetails();\" >Save\r\n              Changes</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  <!-- For Information Video -->\r\n  <div class=\"modal fade\" id=\"infovideo\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkoutLabel\" aria-hidden=\"true\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n      <div class=\"modal-content\">\r\n        <div class=\"modal-header\">\r\n          <h5 class=\"modal-title\" id=\"checkoutLabel\">Information Video</h5>\r\n          <button type=\"button\" *ngIf=\"videoPath\" class=\"close\" (click)= \"PauseInfoVideo()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n          <button type=\"button\" *ngIf=\"!videoPath\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n            <span aria-hidden=\"true\">&times;</span>\r\n          </button>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n          <div class=\"cont video_section_pop\" *ngIf=\"videoPath\">\r\n            <video controls id=\"pausevideo\">\r\n              <source *ngIf=\"videoPath\" [src] = \"videoPath\" type=\"video/mp4\" />\r\n              <source *ngIf=\"videoPath\" [src] = \"videoPath\" type=\"video/ogg\" />\r\n              <source *ngIf=\"videoPath\" [src] = \"videoPath\" type=\"video/webm\" />\r\n              Browser not supported\r\n            </video>\r\n          </div>\r\n\r\n          <div class=\"cont video_section_pop\" *ngIf=\"!videoPath\">\r\n              Video Not Found\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n\r\n\r\n  </div>\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n\r\n<app-confirm-box></app-confirm-box>"

/***/ }),

/***/ "./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: GlobalAuthorizedPersonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalAuthorizedPersonComponent", function() { return GlobalAuthorizedPersonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var src_app_layout_agency_admin_components_shared_constatant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/layout/agency-admin/components/shared/constatant */ "./src/app/layout/agency-admin/components/shared/constatant.ts");
/* harmony import */ var src_app_layout_agency_admin_components_shared_services_agency_api_service_agency_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/layout/agency-admin/components/shared/services/agency-api-service/agency-api.service */ "./src/app/layout/agency-admin/components/shared/services/agency-api-service/agency-api.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var src_app_shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/layout/teacher/shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/global/shared/constant.ts");
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











var GlobalAuthorizedPersonComponent = /** @class */ (function () {
    function GlobalAuthorizedPersonComponent(fb, commonService, apiService, confirmationService, spinner, error, notification) {
        this.fb = fb;
        this.commonService = commonService;
        this.apiService = apiService;
        this.confirmationService = confirmationService;
        this.spinner = spinner;
        this.error = error;
        this.notification = notification;
        this.flag = false;
        this.disableEmail = false;
        this.studentsList = [];
        this.authorizedPersonList = [];
        this.parentList = [];
        this.StudentIDs = [];
        this.totalRecord = 0;
        this.reasonNotToAllowbox = true;
        this.emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
        this.role = 0;
        this.roleId = 0;
        this.agencyId = 0;
        this.limit = 10;
        this.pageNo = 0;
        this.isDeactivated = true;
        this.nameSearch = '';
        this.showEmergency = false;
        this.loader = false;
        this.videoPath = '';
        this.role = this.commonService.getUserRole('userdetails');
        this.agencyId = this.commonService.getAgencyId();
        this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
    }
    GlobalAuthorizedPersonComponent.prototype.ngOnInit = function () {
        this.roleId = this.commonService.getReleventUserId('userdetails');
        if (this.role === 4) {
            this.getAllStudentsList();
        }
        this.getAllAuthorizedPersonList();
        this.createAuthorizationForm();
        this.getAllParentList();
        this.getSectionVideo();
    };
    GlobalAuthorizedPersonComponent.prototype.OpenInfoVideo = function (data) {
        $('#infovideo').modal('show');
    };
    GlobalAuthorizedPersonComponent.prototype.getSectionVideo = function () {
        var _this = this;
        var req = {
            'SectionID': 4
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetVideoForSection, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.videoPath = res.body.filePath;
                console.log(_this.videoPath, 'bbbbbbbbbbbbbbb');
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
    GlobalAuthorizedPersonComponent.prototype.PauseInfoVideo = function () {
        var myVideo = document.getElementById('pausevideo');
        myVideo.pause();
        myVideo.currentTime = 0;
    };
    GlobalAuthorizedPersonComponent.prototype.getAllAuthorizedPersonList = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        this.authorizedPersonList = [];
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
            'ParentId': this.role === 4 ? this.roleId : 0,
            'limit': this.limit,
            'page': this.pageNo,
            'authorizedPersonName': this.nameSearch,
            'IsEmergencyContact': this.showEmergency,
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].GetAuthorizedPersonDetails, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                _this.authorizedPersonList = res.body.data;
                _this.loader = false;
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    GlobalAuthorizedPersonComponent.prototype.createAuthorizationForm = function () {
        this.profileForm = this.fb.group({
            studentName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            parentName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.emailPattern)]],
            mobile: [''],
            authorizedPersonName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            photo: [''],
            notallowedreason: [''],
            emergencypickup: [false],
        });
    };
    Object.defineProperty(GlobalAuthorizedPersonComponent.prototype, "f", {
        get: function () { return this.profileForm.controls; },
        enumerable: true,
        configurable: true
    });
    GlobalAuthorizedPersonComponent.prototype.saveForm = function () {
        var _this = this;
        if (this.role === 2) {
            this.profileForm.controls['parentName'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.profileForm.controls['parentName'].updateValueAndValidity();
        }
        else {
            this.profileForm.controls['parentName'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator);
            this.profileForm.controls['parentName'].updateValueAndValidity();
        }
        if (this.profileForm.valid) {
            this.personAuthorizedVM = {
                Id: 0,
                AgencyID: this.commonService.getAgencyId(),
                ParentID: this.role === 2 ? this.profileForm.controls.parentName.value : this.commonService.getReleventUserId('userdetails'),
                StudentIDs: this.profileForm.controls.studentName.value,
                Mobile: this.profileForm.controls.mobile.value,
                EmailId: this.profileForm.controls.email.value,
                AuthorizedPersonName: this.profileForm.controls.authorizedPersonName.value,
                imagePath: this.image ? this.image : '',
                IsAuthorizedPickUp: true,
                isAddMode: this.isAddMode,
                IsEmergencyContact: this.profileForm.controls.emergencypickup.value,
                QuickPin: this.personAuthorizedVM.QuickPin
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].SaveAuthorizedPersonDetails, this.personAuthorizedVM, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    _this.totalRecord = res.body.totalRows;
                    _this.spinner.hide();
                    _this.notification.success({ message: res.body.message, title: '' });
                    $('#authpermodal').modal('hide');
                    $('#authparentmodal').modal('hide');
                    _this.getAllAuthorizedPersonList();
                }
                else {
                    _this.spinner.hide();
                    _this.notification.warning({ message: res.body.message, title: '' });
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.profileForm);
        }
    };
    GlobalAuthorizedPersonComponent.prototype.getAllParentList = function () {
        var _this = this;
        this.parentList = [];
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
        };
        this.apiService.postData(src_app_layout_agency_admin_components_shared_constatant__WEBPACK_IMPORTED_MODULE_3__["AgencyAPIURLs"].GetAllParentWithoutGuardian, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.parentList = res.body.data;
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
    GlobalAuthorizedPersonComponent.prototype.getAllStudentsList = function () {
        var _this = this;
        this.spinner.show();
        this.studentsList = [];
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
            'studentID': 0,
            'parentID': this.role !== 2 ? this.commonService.getReleventUserId('userdetails') :
                this.profileForm.value.parentName,
            'studentName': '',
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].GetAllStudentByParentIdDropdown, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.data.length > 0 && res.body.data !== []) {
                    _this.studentsList = res.body.data;
                    _this.spinner.hide();
                }
                else {
                    _this.spinner.hide();
                }
            }
            else {
                _this.spinner.hide();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    GlobalAuthorizedPersonComponent.prototype.processFile = function (event) {
        var _this = this;
        this.formData = new FormData();
        var self = this;
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
                event.target.files[0].type !== 'image/jpg') {
                self.fileData = null;
                this.notification.warning({ message: 'File not format not supported', title: '' });
                return false;
            }
            var reader_1 = new FileReader();
            this.formData = new FormData();
            this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
            self.fileData = this.formData;
            reader_1.readAsDataURL(event.target.files[0]);
            setTimeout(function () {
                _this.image = reader_1.result;
            }, 100);
            this.flag = true;
        }
    };
    GlobalAuthorizedPersonComponent.prototype.UploadImage = function () {
        var _this = this;
        this.apiService.uploadImage(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].UploadImage, this.fileData, null).subscribe(function (res) {
            if (res.status === 200) {
                _this.image = res.body.data;
                _this.saveForm();
            }
        }, function (err) {
            _this.error.commonError(err);
        });
    };
    GlobalAuthorizedPersonComponent.prototype.saveDetails = function () {
        this.spinner.show();
        if (this.flag === true) {
            this.UploadImage();
            this.flag = false;
        }
        else {
            this.saveForm();
        }
    };
    GlobalAuthorizedPersonComponent.prototype.onClick = function () {
        this.image = '';
        this.isAddMode = true;
        this.isDeactivated = false;
        this.personAuthorizedVM = {};
        if (this.role === 2) {
            this.studentsList = [];
        }
        this.createAuthorizationForm();
        if (this.role === 2) {
            $('#authpermodal').modal('show');
        }
        else {
            $('#authparentmodal').modal('show');
        }
    };
    // get perticuler user details
    GlobalAuthorizedPersonComponent.prototype.getDetails = function (data) {
        this.image = '';
        this.personAuthorizedVM = {};
        this.personAuthorizedVM.AgencyID = this.agencyId;
        this.personAuthorizedVM.ParentID = data.parentID;
        this.personAuthorizedVM.StudentIDs = data.studentIDs;
        this.personAuthorizedVM.EmailId = data.emailId;
        this.personAuthorizedVM.AuthorizedPersonName = data.authorizedPersonName;
        this.personAuthorizedVM.imagePath = data.imagePath;
        this.personAuthorizedVM.Mobile = data.mobile; // future use
        this.personAuthorizedVM.IsAuthorizedPickUp = true;
        this.personAuthorizedVM.IsEmergencyContact = data.isEmergencyContact;
        this.image = data.imagePath;
        this.isDeactivated = data.isDeleted;
        this.personAuthorizedVM.QuickPin = data.quickPin;
        this.updateAuthorizationForm();
        this.getAllStudentsList();
        this.isAddMode = false;
        if (this.role === 2) {
            $('#authpermodal').modal('show');
        }
        else {
            $('#authparentmodal').modal('show');
        }
    };
    GlobalAuthorizedPersonComponent.prototype.updateAuthorizationForm = function () {
        this.profileForm = this.fb.group({
            studentName: [this.personAuthorizedVM.StudentIDs, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            parentName: [this.personAuthorizedVM.ParentID],
            email: [this.personAuthorizedVM.EmailId],
            mobile: [this.personAuthorizedVM.Mobile],
            authorizedPersonName: [this.personAuthorizedVM.AuthorizedPersonName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            photo: [''],
            notallowedreason: [''],
            allowpickup: [true],
            emergencypickup: [this.personAuthorizedVM.IsEmergencyContact],
        });
    };
    // Method to delete/deactivate Parent
    GlobalAuthorizedPersonComponent.prototype.deleteRow = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to deactivate this user?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'AgencyID': _this.agencyId,
                    'EmailId': value.emailId,
                    'IsDeleted': true,
                    'DeletedDate': new Date(),
                    'DeletedBy': _this.commonService.getReleventUserId('userdetails'),
                    'QuickPin': value.quickPin,
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].SaveAuthorizedPersonDetails, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.deleteParentSuccess(value);
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
    GlobalAuthorizedPersonComponent.prototype.deleteParentSuccess = function (data) {
        this.getAllAuthorizedPersonList();
        this.notification.success({ message: 'This User has been deactivated', title: '' });
    };
    // Method to delete/deactivateAuth Person
    GlobalAuthorizedPersonComponent.prototype.activatePerson = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to activate this user?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'AgencyID': _this.commonService.getAgencyId(),
                    'EmailId': value.emailId,
                    'IsDeleted': false,
                    'UpdatedBy': _this.commonService.getReleventUserId('userdetails'),
                    'QuickPin': value.quickPin,
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].ActivateAuthPerson, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.notification.success({ message: 'This user has been activated', title: '' });
                        _this.getAllAuthorizedPersonList();
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
    GlobalAuthorizedPersonComponent.prototype.paginate = function (event) {
        this.pageNo = event.page;
        this.getAllAuthorizedPersonList();
    };
    GlobalAuthorizedPersonComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode === 13) {
            this.getAllAuthorizedPersonList();
        }
    };
    GlobalAuthorizedPersonComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-global-authorized-person',
            template: __webpack_require__(/*! ./global-authorized-person.component.html */ "./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.html"),
            styles: [__webpack_require__(/*! ./global-authorized-person.component.css */ "./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], src_app_shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            src_app_layout_agency_admin_components_shared_services_agency_api_service_agency_api_service__WEBPACK_IMPORTED_MODULE_4__["AgencyApiService"], primeng_api__WEBPACK_IMPORTED_MODULE_10__["ConfirmationService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"], src_app_shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__["ErrorHandlerService"], src_app_shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_7__["NotificationService"]])
    ], GlobalAuthorizedPersonComponent);
    return GlobalAuthorizedPersonComponent;
}());



/***/ }),

/***/ "./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.css":
/*!**********************************************************************************************************!*\
  !*** ./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.css ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".info-icon{\r\n    margin-left: 550px;\r\n    font-size: 20px; \r\n    color: #383333;\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2dsb2JhbC9jb21wb25lbnRzL2dsb2JhbC1yZXN0cmljdGVkLXBlcnNvbi9nbG9iYWwtcmVzdHJpY3RlZC1wZXJzb24uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0lBQ2YsY0FBYztBQUNsQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9nbG9iYWwvY29tcG9uZW50cy9nbG9iYWwtcmVzdHJpY3RlZC1wZXJzb24vZ2xvYmFsLXJlc3RyaWN0ZWQtcGVyc29uLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW5mby1pY29ue1xyXG4gICAgbWFyZ2luLWxlZnQ6IDU1MHB4O1xyXG4gICAgZm9udC1zaXplOiAyMHB4OyBcclxuICAgIGNvbG9yOiAjMzgzMzMzO1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.html":
/*!***********************************************************************************************************!*\
  !*** ./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\n  <div class=\"container-fluid\">\n\n    <div class=\"pagetitle\">\n      <div>\n        <h2>Restricted Person\n        </h2>\n      </div>\n      <div>\n        <button type=\"submit\" *ngIf=\"isSubscriptionActive\" class=\"btn btn-red\" data-toggle=\"modal\"\n          (click)=\"onClick()\">Add Restricted Person\n        </button>\n      </div>\n    </div>\n    <div class=\"subhead d-flex justify-content-between mt-20\">\n      <div>\n        <h3>Restricted Person</h3>\n      </div>\n      <div class=\"info-icon\">\n        <i class=\"fa fa-info-circle\" (click)=\"OpenInfoVideo()\" data-toggle=\"modal\"\n           aria-hidden=\"true\" title=\"Information Video\"></i>\n      </div>\n    </div>\n\n    <div class=\"card cardfilter\">\n      <div class=\"row algcenter\">\n\n        <div class=\"leftfilter\">\n          <div class=\"search-date\">\n            <div class=\"pr15 label-text\">Search Name : </div>\n            <input type=\"text\" placeholder=\"Restricted person name\" (keydown)=\"keyDownFunction($event)\"\n              [(ngModel)]=\"nameSearch\" class=\"form-control mr15\" id=\"\">\n          </div>\n          <div class=\"filter-buttons\">\n            <button type=\"submit\" class=\"btn btn-send\" (click)=\"getAllRestrictedPersonList()\">Search</button>\n          </div>\n        </div>\n \n      </div>\n    </div>\n    <div class=\"innertable\">\n      <div class=\"table-responsive\">\n        <table class=\"table\">\n          <thead class=\"thead-light\">\n            <tr>\n              <th scope=\"col\">Photo</th>\n              <th scope=\"col\">Restricted Person</th>\n              <th scope=\"col\">Parent Name</th>\n              <th scope=\"col\">Mobile</th>\n              <th scope=\"col\" class=\"text-center\">Description</th>\n              <th scope=\"col\" class=\"text-center\">Details</th>\n              <th scope=\"col\" class=\"text-center\">Change Status</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let resPerson of restrictedPersonList\">\n              <td>\n                <img src=\"{{resPerson.imagePath}}\" onError=\"this.src='assets/img/user.png'\" alt=\"\"\n                  class=\"img-circle childimg\">\n              </td>\n              <td>{{resPerson.restrictedPersonName}}</td>\n              <td>{{resPerson.parentName}}</td>\n              <td>{{resPerson.mobile}}</td>\n              <td>{{resPerson.description}}</td>\n              <td class=\"text-center\">\n                <a (click)=\"getDetails(resPerson)\" title=\"View Details/update\"><i class=\"fa fa-eye\"></i> </a>\n              </td>\n              <td class=\"text-center\">\n                <button class=\"form-control\" *ngIf=\"!resPerson.isDeleted && isSubscriptionActive\"\n                  class=\"btn btn-warning\" (click)=\"deleteRow(resPerson)\">Deactivate</button>\n                <button class=\"form-control\" *ngIf=\"resPerson.isDeleted && isSubscriptionActive\" class=\"btn btn-success\"\n                  (click)=\"activatePerson(resPerson)\">Activate</button>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n        <div class=\"text-center\">\n          <label *ngIf=\"!restrictedPersonList && !loader\">No record found!</label>\n        </div>\n        <p-paginator [alwaysShow]=\"false\" [rows]=\"limit\" [totalRecords]=\"totalRecord\" (onPageChange)=\"paginate($event)\">\n        </p-paginator>\n      </div>\n\n    </div>\n\n    <div class=\"modal fade \" id=\"authpermodal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\"\n      aria-hidden=\"true\">\n      <div class=\"modal-dialog modal-lg\">\n        <div class=\"modal-content\">\n          <div class=\"modal-header\">\n            <h5 class=\"modal-title\">Add Person</h5>\n            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>\n          <div class=\"modal-body\">\n            <div class=\"upload-profile\">\n              <div>\n                <img src=\"{{image}}\" onError=\"this.src='assets/img/user.png'\" alt=\"\" class=\"img-fluid img-circle\">\n              </div>\n\n              <div class=\"upload-btn-wrapper\">\n                <button class=\"btn btn-send\">Upload a image</button>\n                <input type=\"file\" name=\"myfile\" #input (change)=\"processFile($event)\" />\n              </div>\n            </div>\n            <form [formGroup]=\"profileForm\">\n              <div class=\"form-fields\">\n\n                <div class=\"row mb-10 \">\n                  <div class=\"col-lg-6\">\n                    <div class=\"form-group\">\n                      <label for=\"\">Select Parent*</label>\n                      <select class=\"form-control\" [attr.disabled]=\"!isAddMode ? '' : null\" formControlName=\"parentName\"\n                        (change)=\"getAllStudentsList()\" id=\"authpermodal\">\n                        <option value=\"\">Select</option>\n                        <option *ngFor=\"let parent of parentList\" [value]=\"parent.id\">{{parent.parentName}} </option>\n                      </select>\n                      <div *ngIf=\"f.parentName.invalid && (f.parentName.dirty || f.parentName.touched)\"\n                        class=\"text-left errormsg\">\n                        <span *ngIf=\"f.parentName.errors.required\">\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select Parent Name</span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-6\">\n                    <div class=\"form-group\">\n                      <label>Student Name*</label>\n                      <p-multiSelect [options]=\"studentsList\" formControlName=\"studentName\"\n                        [panelStyle]=\"{minWidth:'200px'}\" [maxSelectedLabels]=\"15\"></p-multiSelect>\n                      <div *ngIf=\"f.studentName.invalid && (f.studentName.dirty || f.studentName.touched)\"\n                        class=\"text-left errormsg\">\n                        <span *ngIf=\"f.studentName.errors.required\">\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please select student </span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row mb-10\">\n                  <div class=\"col-lg-6\">\n                    <div class=\"form-group\">\n                      <label for=\"\">Restricted Person Name*</label>\n                      <input type=\"text \" maxlength=\"255\" class=\"form-control\" aria-describedby=\"\"\n                        placeholder=\"Restricted Person Name\" formControlName=\"restrictedPersonName\"\n                        (keypress)=\"commonService.allowAlphabetOnly($event)\">\n                      <div\n                        *ngIf=\"f.restrictedPersonName.invalid && (f.restrictedPersonName.dirty || f.restrictedPersonName.touched)\"\n                        class=\"text-left errormsg\">\n                        <span *ngIf=\"f.restrictedPersonName.errors.required\">\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter Restricted Person\n                          </span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-6\">\n                    <div class=\"form-group\">\n                      <label for=\"\">Mobile</label>\n                      <input type=\"text \" maxlength=\"10\" class=\"form-control\" aria-describedby=\"\" placeholder=\"Mobile\"\n                        formControlName=\"mobile\" (keypress)=\"commonService.allowOnlyNumber($event)\">\n                      <div *ngIf=\"f.mobile.invalid && (f.mobile.dirty || f.mobile.touched)\" class=\"text-left errormsg\">\n                        <span *ngIf=\"f.mobile.errors.required\">\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter mobile number\n                          </span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n                <div class=\"row mb-10\">\n                  <div class=\"col-lg-6\">\n                    <div class=\"form-group\">\n                      <label for=\"\">Email Address</label>\n                      <input type=\"email\" [attr.disabled]=\"!isAddMode ? '' : null\" class=\"form-control\"\n                        aria-describedby=\"\" placeholder=\"Email address\" formControlName=\"email\">\n                      <div *ngIf=\"f.email.invalid && (f.email.dirty || f.email.touched)\" class=\"text-left errormsg\">\n                        <span *ngIf=\"f.email.errors.required\">\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter email</span>\n                        </span>\n                        <span *ngIf=\"f.email.errors.pattern\">\n                          <i class=\"fa fa-exclamation-circle errtext\"></i> <span class=\"errtext\"> Please enter valid\n                            email address</span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"col-lg-6\">\n                    <div class=\"form-group\">\n                      <label for=\"\">Restricted Person Description</label>\n                      <input type=\"text \" maxlength=\"255\" class=\"form-control\" aria-describedby=\"\"\n                        placeholder=\"Restricted Person Description\" formControlName=\"description\"\n                        (keypress)=\"commonService.allowAlphabetOnly($event)\">\n                      <div *ngIf=\"f.description.invalid && (f.description.dirty || f.description.touched)\"\n                        class=\"text-left errormsg\">\n                        <span *ngIf=\"f.description.errors.required\">\n                          <i class=\"fa fa-exclamation-circle\"></i> <span class=\"\"> Please enter Description\n                          </span>\n                        </span>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n\n              </div>\n            </form>\n          </div>\n          <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n            <button type=\"button\" *ngIf=\"isSubscriptionActive  && !isDeactivated\" class=\"btn btn-primary\"\n              (click)=\"saveDetails();\">Save\n              Changes</button>\n          </div>\n        </div>\n      </div>\n    </div>\n\n<!-- For Information Video -->\n<div class=\"modal fade\" id=\"infovideo\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"checkoutLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"checkoutLabel\">Information Video</h5>\n        <button type=\"button\" *ngIf=\"videoPath\" class=\"close\" (click)= \"PauseInfoVideo()\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <button type=\"button\" *ngIf=\"!videoPath\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"cont video_section_pop\" *ngIf=\"videoPath\">\n          <video controls id=\"pausevideo\">\n            <source *ngIf=\"videoPath\" [src] = \"videoPath\" type=\"video/mp4\" />\n            <source *ngIf=\"videoPath\" [src] = \"videoPath\" type=\"video/ogg\" />\n            <source *ngIf=\"videoPath\" [src] = \"videoPath\" type=\"video/webm\" />\n            Browser not supported\n          </video>\n        </div>\n\n        <div class=\"cont video_section_pop\" *ngIf=\"!videoPath\">\n            Video Not Found\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n  </div>\n</div>\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\n\n<app-confirm-box></app-confirm-box>"

/***/ }),

/***/ "./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.ts ***!
  \*********************************************************************************************************/
/*! exports provided: GlobalRestrictedPersonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalRestrictedPersonComponent", function() { return GlobalRestrictedPersonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var src_app_layout_agency_admin_components_shared_constatant__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/layout/agency-admin/components/shared/constatant */ "./src/app/layout/agency-admin/components/shared/constatant.ts");
/* harmony import */ var src_app_layout_agency_admin_components_shared_services_agency_api_service_agency_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/layout/agency-admin/components/shared/services/agency-api-service/agency-api.service */ "./src/app/layout/agency-admin/components/shared/services/agency-api-service/agency-api.service.ts");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var src_app_shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var src_app_shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/layout/teacher/shared/constant */ "./src/app/layout/teacher/shared/constant.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/global/shared/constant.ts");
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











var GlobalRestrictedPersonComponent = /** @class */ (function () {
    function GlobalRestrictedPersonComponent(fb, commonService, apiService, confirmationService, spinner, error, notification) {
        this.fb = fb;
        this.commonService = commonService;
        this.apiService = apiService;
        this.confirmationService = confirmationService;
        this.spinner = spinner;
        this.error = error;
        this.notification = notification;
        this.flag = false;
        this.disableEmail = false;
        this.studentsList = [];
        this.restrictedPersonList = [];
        this.parentList = [];
        this.StudentIDs = [];
        this.totalRecord = 0;
        this.reasonNotToAllowbox = true;
        this.emailPattern = /^([\w-\.]+\u0040([\w-]+\.)+[\w-]{2,4})?$/;
        this.role = 0;
        this.roleId = 0;
        this.agencyId = 0;
        this.limit = 10;
        this.pageNo = 0;
        this.isDeactivated = true;
        this.nameSearch = '';
        this.showEmergency = false;
        this.loader = false;
        this.videoPath = '';
        this.role = this.commonService.getUserRole('userdetails');
        this.agencyId = this.commonService.getAgencyId();
        this.isSubscriptionActive = this.commonService.getSubscriptionStatus();
    }
    GlobalRestrictedPersonComponent.prototype.ngOnInit = function () {
        this.roleId = this.commonService.getReleventUserId('userdetails');
        if (this.role === 4) {
            this.getAllStudentsList();
        }
        this.getAllRestrictedPersonList();
        this.createRestrictedForm();
        this.getAllParentList();
        this.getSectionVideo();
    };
    GlobalRestrictedPersonComponent.prototype.OpenInfoVideo = function (data) {
        $('#infovideo').modal('show');
    };
    GlobalRestrictedPersonComponent.prototype.getSectionVideo = function () {
        var _this = this;
        var req = {
            'SectionID': 5
        };
        this.apiService.postData(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].GetVideoForSection, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.videoPath = res.body.filePath;
                console.log(_this.videoPath, 'bbbbbbbbbbbbbbb');
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
    GlobalRestrictedPersonComponent.prototype.PauseInfoVideo = function () {
        var myVideo = document.getElementById('pausevideo');
        myVideo.pause();
        myVideo.currentTime = 0;
    };
    GlobalRestrictedPersonComponent.prototype.getAllRestrictedPersonList = function () {
        var _this = this;
        this.loader = true;
        this.spinner.show();
        this.restrictedPersonList = [];
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
            'ParentId': this.role === 4 ? this.roleId : 0,
            'limit': this.limit,
            'page': this.pageNo,
            'restrictedPersonName': this.nameSearch,
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].GetRestrictedPersonDetails, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.totalRecord = res.body.totalRows;
                _this.restrictedPersonList = res.body.data;
                _this.loader = false;
                _this.spinner.hide();
            }
            else {
                _this.spinner.hide();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    GlobalRestrictedPersonComponent.prototype.createRestrictedForm = function () {
        this.profileForm = this.fb.group({
            studentName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            parentName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern(this.emailPattern)]],
            mobile: [''],
            restrictedPersonName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            photo: [''],
            description: [''],
        });
    };
    Object.defineProperty(GlobalRestrictedPersonComponent.prototype, "f", {
        get: function () { return this.profileForm.controls; },
        enumerable: true,
        configurable: true
    });
    GlobalRestrictedPersonComponent.prototype.saveForm = function () {
        var _this = this;
        if (this.role === 2) {
            this.profileForm.controls['parentName'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.profileForm.controls['parentName'].updateValueAndValidity();
        }
        else {
            this.profileForm.controls['parentName'].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator);
            this.profileForm.controls['parentName'].updateValueAndValidity();
        }
        if (this.profileForm.valid) {
            this.personRestrictedVM = {
                Id: 0,
                AgencyID: this.commonService.getAgencyId(),
                ParentID: this.role === 2 ? this.profileForm.controls.parentName.value : this.commonService.getReleventUserId('userdetails'),
                StudentIDs: this.profileForm.controls.studentName.value,
                Mobile: this.profileForm.controls.mobile.value,
                EmailId: this.profileForm.controls.email.value,
                RestrictedPersonName: this.profileForm.controls.restrictedPersonName.value,
                Description: this.profileForm.controls.description.value,
                imagePath: this.image ? this.image : '',
                IsRestricted: true,
                isAddMode: this.isAddMode,
                CommonId: this.personRestrictedVM.CommonId
            };
            this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].SaveRestrictedPersonDetails, this.personRestrictedVM, null).subscribe(function (res) {
                if (res.body.statusCode === 200) {
                    _this.totalRecord = res.body.totalRows;
                    _this.spinner.hide();
                    _this.notification.success({ message: res.body.message, title: '' });
                    $('#authpermodal').modal('hide');
                    $('#authparentmodal').modal('hide');
                    _this.getAllRestrictedPersonList();
                }
                else {
                    _this.spinner.hide();
                    _this.notification.warning({ message: res.body.message, title: '' });
                }
            }, function (err) {
                _this.spinner.hide();
                _this.error.commonError(err);
            });
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.profileForm);
        }
    };
    GlobalRestrictedPersonComponent.prototype.getAllParentList = function () {
        var _this = this;
        this.parentList = [];
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
        };
        this.apiService.postData(src_app_layout_agency_admin_components_shared_constatant__WEBPACK_IMPORTED_MODULE_3__["AgencyAPIURLs"].GetAllParentWithoutGuardian, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                _this.parentList = res.body.data;
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
    GlobalRestrictedPersonComponent.prototype.getAllStudentsList = function () {
        var _this = this;
        this.spinner.show();
        this.studentsList = [];
        var req = {
            'AgencyID': this.commonService.getAgencyId(),
            'studentID': 0,
            'parentID': this.role !== 2 ? this.commonService.getReleventUserId('userdetails') :
                this.profileForm.value.parentName,
            'studentName': '',
        };
        this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].GetAllStudentByParentIdDropdown, req, null).subscribe(function (res) {
            if (res.body.statusCode === 200) {
                if (res.body.data.length > 0 && res.body.data !== []) {
                    _this.studentsList = res.body.data;
                    _this.spinner.hide();
                }
                else {
                    _this.spinner.hide();
                }
            }
            else {
                _this.spinner.hide();
            }
        }, function (err) {
            _this.spinner.hide();
            _this.error.commonError(err);
        });
    };
    GlobalRestrictedPersonComponent.prototype.processFile = function (event) {
        var _this = this;
        this.formData = new FormData();
        var self = this;
        if (event.target.files && event.target.files[0]) {
            if (event.target.files[0].type !== 'image/png' && event.target.files[0].type !== 'image/jpeg' &&
                event.target.files[0].type !== 'image/jpg') {
                self.fileData = null;
                this.notification.warning({ message: 'File not format not supported', title: '' });
                return false;
            }
            var reader_1 = new FileReader();
            this.formData = new FormData();
            this.formData.append('fileData', event.target.files[0], event.target.files[0].name);
            self.fileData = this.formData;
            reader_1.readAsDataURL(event.target.files[0]);
            setTimeout(function () {
                _this.image = reader_1.result;
            }, 100);
            this.flag = true;
        }
    };
    GlobalRestrictedPersonComponent.prototype.UploadImage = function () {
        var _this = this;
        this.apiService.uploadImage(src_app_layout_teacher_shared_constant__WEBPACK_IMPORTED_MODULE_8__["TeacherAPIURLs"].UploadImage, this.fileData, null).subscribe(function (res) {
            if (res.status === 200) {
                _this.image = res.body.data;
                _this.saveForm();
            }
        }, function (err) {
            _this.error.commonError(err);
        });
    };
    GlobalRestrictedPersonComponent.prototype.saveDetails = function () {
        this.spinner.show();
        if (this.flag === true) {
            this.UploadImage();
            this.flag = false;
        }
        else {
            this.saveForm();
        }
    };
    GlobalRestrictedPersonComponent.prototype.onClick = function () {
        this.image = '';
        this.isAddMode = true;
        this.isDeactivated = false;
        this.personRestrictedVM = {};
        if (this.role === 2) {
            this.studentsList = [];
        }
        this.createRestrictedForm();
        if (this.role === 2) {
            $('#authpermodal').modal('show');
        }
        else {
            $('#authparentmodal').modal('show');
        }
    };
    // get perticuler user details
    GlobalRestrictedPersonComponent.prototype.getDetails = function (data) {
        this.image = '';
        this.personRestrictedVM = {};
        this.personRestrictedVM.AgencyID = this.agencyId;
        this.personRestrictedVM.ParentID = data.parentID;
        this.personRestrictedVM.StudentIDs = data.studentIDs;
        this.personRestrictedVM.EmailId = data.emailId;
        this.personRestrictedVM.RestrictedPersonName = data.restrictedPersonName;
        this.personRestrictedVM.imagePath = data.imagePath;
        this.personRestrictedVM.Mobile = data.mobile; // future use
        this.personRestrictedVM.IsRestricted = true;
        this.personRestrictedVM.Description = data.description;
        this.image = data.imagePath;
        this.isDeactivated = data.isDeleted;
        this.personRestrictedVM.CommonId = data.commonID;
        this.updateRestrictedForm();
        this.getAllStudentsList();
        this.isAddMode = false;
        if (this.role === 2) {
            $('#authpermodal').modal('show');
        }
        else {
            $('#authparentmodal').modal('show');
        }
    };
    GlobalRestrictedPersonComponent.prototype.updateRestrictedForm = function () {
        this.profileForm = this.fb.group({
            studentName: [this.personRestrictedVM.StudentIDs, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            parentName: [this.personRestrictedVM.ParentID],
            email: [this.personRestrictedVM.EmailId],
            mobile: [this.personRestrictedVM.Mobile],
            restrictedPersonName: [this.personRestrictedVM.RestrictedPersonName, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            photo: [''],
            description: [this.personRestrictedVM.Description]
        });
    };
    // Method to delete/deactivate Parent
    GlobalRestrictedPersonComponent.prototype.deleteRow = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to deactivate this user?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'AgencyID': _this.agencyId,
                    'EmailId': value.emailId,
                    'IsDeleted': true,
                    'DeletedDate': new Date(),
                    'DeletedBy': _this.commonService.getReleventUserId('userdetails'),
                    'CommonId': value.commonID,
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].SaveRestrictedPersonDetails, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.deleteParentSuccess(value);
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
    GlobalRestrictedPersonComponent.prototype.deleteParentSuccess = function (data) {
        this.getAllRestrictedPersonList();
        this.notification.success({ message: 'This User has been deactivated', title: '' });
    };
    // Method to delete/deactivateAuth Person
    GlobalRestrictedPersonComponent.prototype.activatePerson = function (value) {
        var _this = this;
        this.confirmationService.confirm({
            message: 'Do you want to activate this user?',
            accept: function () {
                _this.spinner.show();
                var req = {
                    'AgencyID': _this.commonService.getAgencyId(),
                    'EmailId': value.emailId,
                    'IsDeleted': false,
                    'UpdatedBy': _this.commonService.getReleventUserId('userdetails'),
                    'CommonId': value.commonID,
                };
                _this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_9__["GlobalAPIURLs"].ActivateRestrictedPerson, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.notification.success({ message: 'This user has been activated', title: '' });
                        _this.getAllRestrictedPersonList();
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
    GlobalRestrictedPersonComponent.prototype.paginate = function (event) {
        this.pageNo = event.page;
        this.getAllRestrictedPersonList();
    };
    GlobalRestrictedPersonComponent.prototype.keyDownFunction = function (event) {
        if (event.keyCode === 13) {
            this.getAllRestrictedPersonList();
        }
    };
    GlobalRestrictedPersonComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-global-restricted-person',
            template: __webpack_require__(/*! ./global-restricted-person.component.html */ "./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.html"),
            styles: [__webpack_require__(/*! ./global-restricted-person.component.css */ "./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], src_app_shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            src_app_layout_agency_admin_components_shared_services_agency_api_service_agency_api_service__WEBPACK_IMPORTED_MODULE_4__["AgencyApiService"], primeng_api__WEBPACK_IMPORTED_MODULE_10__["ConfirmationService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerService"], src_app_shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_6__["ErrorHandlerService"], src_app_shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_7__["NotificationService"]])
    ], GlobalRestrictedPersonComponent);
    return GlobalRestrictedPersonComponent;
}());



/***/ }),

/***/ "./src/app/layout/global/components/reset-password/reset-password.component.css":
/*!**************************************************************************************!*\
  !*** ./src/app/layout/global/components/reset-password/reset-password.component.css ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n/* Added By Aniket */\r\n/* .profileupdate {\r\n    margin-left: 10%;\r\n    margin-right: 10%\r\n} */\r\n.spaceb {\r\n    margin-bottom: 20px;\r\n}\r\n.upload-profile {\r\n    text-align: center;\r\n    padding: 15px;\r\n}\r\n.form-fields {\r\n    width: 100%;\r\n    padding: 15px;\r\n    border: 1px solid #f5f5f5;\r\n    margin: 10px;\r\n}\r\n.upload-profile img {\r\n    height: 120px;\r\n    width: 120px;\r\n    border-radius: 50%;\r\n    margin-bottom: 10px;\r\n}\r\n.modal-container {\r\n    border-radius: 10px;\r\n    box-shadow: 0 4px 14px 0px rgba(0,0,0,0.09);\r\n    padding: 10px;\r\n    background: #ffffff;\r\n}\r\n.modal-container form {\r\n    display: flex;\r\n}\r\n.btn-send {\r\n    background: none;\r\n    padding: 5px 20px;\r\n    color: #58A7FE;\r\n    font-size: 14px;\r\n    border-radius: 30px;\r\n    border: 1px solid #58A7FE;\r\n}\r\n.btn-send:hover {\r\n    background: #58A7FE;\r\n    padding: 5px 20px;\r\n    color: #ffffff;\r\n    font-size: 14px;\r\n    border-radius: 30px;\r\n    border: 1px solid #58A7FE;\r\n}\r\n@media (max-width: 767px) {\r\n    .modal-container form {\r\n        display: block;\r\n    }\r\n    .form-fields {margin: 0;}\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2dsb2JhbC9jb21wb25lbnRzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLG9CQUFvQjtBQUNwQjs7O0dBR0c7QUFHSDtJQUNJLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7QUFDakI7QUFDQTtJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2IseUJBQXlCO0lBQ3pCLFlBQVk7QUFDaEI7QUFDQTtJQUNJLGFBQWE7SUFDYixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLG1CQUFtQjtBQUN2QjtBQUNBO0lBQ0ksbUJBQW1CO0lBQ25CLDJDQUEyQztJQUMzQyxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCO0FBQ0E7SUFDSSxhQUFhO0FBQ2pCO0FBQ0E7SUFDSSxnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLGNBQWM7SUFDZCxlQUFlO0lBQ2YsbUJBQW1CO0lBQ25CLHlCQUF5QjtBQUM3QjtBQUNBO0lBQ0ksbUJBQW1CO0lBQ25CLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQix5QkFBeUI7QUFDN0I7QUFDQTtJQUNJO1FBQ0ksY0FBYztJQUNsQjtJQUNBLGNBQWMsU0FBUyxDQUFDO0FBQzVCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2dsb2JhbC9jb21wb25lbnRzL3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuLyogQWRkZWQgQnkgQW5pa2V0ICovXHJcbi8qIC5wcm9maWxldXBkYXRlIHtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMCU7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwJVxyXG59ICovXHJcblxyXG5cclxuLnNwYWNlYiB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcbi51cGxvYWQtcHJvZmlsZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG59XHJcbi5mb3JtLWZpZWxkcyB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZjVmNWY1O1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcbi51cGxvYWQtcHJvZmlsZSBpbWcge1xyXG4gICAgaGVpZ2h0OiAxMjBweDtcclxuICAgIHdpZHRoOiAxMjBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuLm1vZGFsLWNvbnRhaW5lciB7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYm94LXNoYWRvdzogMCA0cHggMTRweCAwcHggcmdiYSgwLDAsMCwwLjA5KTtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xyXG59XHJcbi5tb2RhbC1jb250YWluZXIgZm9ybSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcbi5idG4tc2VuZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgcGFkZGluZzogNXB4IDIwcHg7XHJcbiAgICBjb2xvcjogIzU4QTdGRTtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNThBN0ZFO1xyXG59XHJcbi5idG4tc2VuZDpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjNThBN0ZFO1xyXG4gICAgcGFkZGluZzogNXB4IDIwcHg7XHJcbiAgICBjb2xvcjogI2ZmZmZmZjtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDMwcHg7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjNThBN0ZFO1xyXG59XHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgLm1vZGFsLWNvbnRhaW5lciBmb3JtIHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIC5mb3JtLWZpZWxkcyB7bWFyZ2luOiAwO31cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/global/components/reset-password/reset-password.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/layout/global/components/reset-password/reset-password.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"wrapper\">\r\n  <div class=\"container-fluid\">\r\n<div class=\"pagetitle\">\r\n  <div>\r\n    <h2>Reset Password\r\n    </h2>\r\n  </div>\r\n</div>\r\n<div class=\"modal-container\">\r\n  \r\n  <div class=\"modal-body profileupdate\">\r\n    <form [formGroup]=\"resetForm\">    \r\n        <div class=\"form-fields\">\r\n        <div class=\"row mb-10 \">\r\n        <div class=\"col-lg-6 \">\r\n          <div class=\"form-group\">\r\n            <label for=\"\">New Password</label>\r\n            <input type=\"password\"  class=\"form-control\" formControlName=\"newpassword\" id=\"\"  aria-describedby=\"\" placeholder=\"New Password\">\r\n            <div *ngIf=\"f.newpassword.invalid && (f.newpassword.dirty || f.newpassword.touched)\" class=\"text-left errormsg\">\r\n              <span *ngIf=\"f.newpassword.errors.minlength\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Minimum 6 characters required</span> \r\n              </span>\r\n              <span *ngIf=\"f.newpassword.errors.required\">\r\n                <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Please enter password</span> \r\n            </span>\r\n          </div>\r\n         \r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row mb-10 \">\r\n        <div class=\"col-lg-6 \">\r\n          <div class=\"form-group\">\r\n            <label for=\"\">Confirm Password</label>\r\n            <input type=\"password\"  class=\"form-control\"  formControlName=\"confirmpassword\" id=\"\" aria-describedby=\"\" placeholder=\"Confirm Password\">\r\n            <div *ngIf=\"f.confirmpassword.invalid && (f.confirmpassword.dirty || f.confirmpassword.touched)\" class=\"text-left errormsg\">\r\n              <span *ngIf=\"f.confirmpassword.errors.minlength\">\r\n                  <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Minimum 6 characters required</span> \r\n              </span>\r\n              <span *ngIf=\"f.confirmpassword.errors.required\">\r\n                <i class=\"fa fa-exclamation-circle errtext\" ></i> <span class=\"errtext\"> Please enter password</span> \r\n            </span>\r\n          </div>\r\n          </div>\r\n        </div>\r\n        </div>\r\n      </div>\r\n  </form>\r\n</div>\r\n<div class=\"modal-footer profileupdate\">\r\n  <button type=\"button\" class=\"btn btn-primary\" (click)=\"verifyPassword()\">Update Password</button>\r\n  <button type=\"button\" class=\"btn btn-secondary\" (click)=\"resetFields()\">Reset</button>\r\n</div>\r\n</div>\r\n\r\n\r\n</div>\r\n</div>\r\n<ngx-spinner type=\"ball-atom\" size=\"medium\" color=\"#58A7FE\"></ngx-spinner>\r\n<router-outlet><router-outlet>"

/***/ }),

/***/ "./src/app/layout/global/components/reset-password/reset-password.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/layout/global/components/reset-password/reset-password.component.ts ***!
  \*************************************************************************************/
/*! exports provided: ResetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetPasswordComponent", function() { return ResetPasswordComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/services/error-handler/error-handler.service */ "./src/app/shared/services/error-handler/error-handler.service.ts");
/* harmony import */ var _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/services/notification-service/notification.service */ "./src/app/shared/services/notification-service/notification.service.ts");
/* harmony import */ var _agency_admin_components_shared_services_agency_api_service_agency_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../agency-admin/components/shared/services/agency-api-service/agency-api.service */ "./src/app/layout/agency-admin/components/shared/services/agency-api-service/agency-api.service.ts");
/* harmony import */ var _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/services/common/common.service */ "./src/app/shared/services/common/common.service.ts");
/* harmony import */ var _shared_constant__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constant */ "./src/app/layout/global/shared/constant.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(apiService, error, spinner, notification, commonService, fb) {
        this.apiService = apiService;
        this.error = error;
        this.spinner = spinner;
        this.notification = notification;
        this.commonService = commonService;
        this.fb = fb;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        console.log('sdf', this.commonService.getUserMail());
        this.createResetForm();
    };
    ResetPasswordComponent.prototype.createResetForm = function () {
        this.resetForm = this.fb.group({
            newpassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(6)]],
            confirmpassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(6)]],
        });
    };
    Object.defineProperty(ResetPasswordComponent.prototype, "f", {
        get: function () { return this.resetForm.controls; },
        enumerable: true,
        configurable: true
    });
    ResetPasswordComponent.prototype.verifyPassword = function () {
        var _this = this;
        this.spinner.show();
        if (this.resetForm.valid) {
            var newpwd = this.resetForm.value.newpassword;
            var curpwd = this.resetForm.value.confirmpassword;
            if (newpwd === curpwd) {
                var req = {
                    'requestedEmail': this.commonService.getUserMail(),
                    'updatedPassword': newpwd
                };
                this.apiService.postData(_shared_constant__WEBPACK_IMPORTED_MODULE_7__["GlobalAPIURLs"].UpdatedPassword, req, null).subscribe(function (res) {
                    if (res.body.statusCode === 200) {
                        _this.notification.success({ message: 'Password has been updated and  sent to your mail successfully.', title: '' });
                        _this.resetForm.reset();
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
                this.notification.warning({ message: 'Passowrd not match', title: '' });
            }
        }
        else {
            this.spinner.hide();
            this.commonService.validateAllFields(this.resetForm);
        }
    };
    ResetPasswordComponent.prototype.resetFields = function () {
        this.resetForm.reset();
        console.log('sdf', this.commonService.getUserMail());
    };
    ResetPasswordComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__(/*! ./reset-password.component.html */ "./src/app/layout/global/components/reset-password/reset-password.component.html"),
            styles: [__webpack_require__(/*! ./reset-password.component.css */ "./src/app/layout/global/components/reset-password/reset-password.component.css")]
        }),
        __metadata("design:paramtypes", [_agency_admin_components_shared_services_agency_api_service_agency_api_service__WEBPACK_IMPORTED_MODULE_5__["AgencyApiService"], _shared_services_error_handler_error_handler_service__WEBPACK_IMPORTED_MODULE_3__["ErrorHandlerService"],
            ngx_spinner__WEBPACK_IMPORTED_MODULE_2__["NgxSpinnerService"], _shared_services_notification_service_notification_service__WEBPACK_IMPORTED_MODULE_4__["NotificationService"],
            _shared_services_common_common_service__WEBPACK_IMPORTED_MODULE_6__["CommonService"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/layout/global/global-routing.module.ts":
/*!********************************************************!*\
  !*** ./src/app/layout/global/global-routing.module.ts ***!
  \********************************************************/
/*! exports provided: GlobalRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalRoutingModule", function() { return GlobalRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _components_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/reset-password/reset-password.component */ "./src/app/layout/global/components/reset-password/reset-password.component.ts");
/* harmony import */ var _components_global_authorized_person_global_authorized_person_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/global-authorized-person/global-authorized-person.component */ "./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.ts");
/* harmony import */ var _components_global_restricted_person_global_restricted_person_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/global-restricted-person/global-restricted-person.component */ "./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        component: _components_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_2__["ResetPasswordComponent"],
    },
    {
        path: 'authorizedperson',
        component: _components_global_authorized_person_global_authorized_person_component__WEBPACK_IMPORTED_MODULE_3__["GlobalAuthorizedPersonComponent"],
    },
    {
        path: 'restrictedperson',
        component: _components_global_restricted_person_global_restricted_person_component__WEBPACK_IMPORTED_MODULE_4__["GlobalRestrictedPersonComponent"],
    },
];
var GlobalRoutingModule = /** @class */ (function () {
    function GlobalRoutingModule() {
    }
    GlobalRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        })
    ], GlobalRoutingModule);
    return GlobalRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/global/global.component.ts":
/*!***************************************************!*\
  !*** ./src/app/layout/global/global.component.ts ***!
  \***************************************************/
/*! exports provided: GlobalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalComponent", function() { return GlobalComponent; });
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

var GlobalComponent = /** @class */ (function () {
    function GlobalComponent() {
    }
    GlobalComponent.prototype.ngOnInit = function () {
    };
    GlobalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-agency-admin-message',
            template: "\n  <app-reset-password> </app-reset-password>\n  <router-outlet><router-outlet>"
        }),
        __metadata("design:paramtypes", [])
    ], GlobalComponent);
    return GlobalComponent;
}());



/***/ }),

/***/ "./src/app/layout/global/global.module.ts":
/*!************************************************!*\
  !*** ./src/app/layout/global/global.module.ts ***!
  \************************************************/
/*! exports provided: GlobalModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalModule", function() { return GlobalModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _components_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/reset-password/reset-password.component */ "./src/app/layout/global/components/reset-password/reset-password.component.ts");
/* harmony import */ var _global_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global.component */ "./src/app/layout/global/global.component.ts");
/* harmony import */ var _global_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global-routing.module */ "./src/app/layout/global/global-routing.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-spinner */ "./node_modules/ngx-spinner/fesm5/ngx-spinner.js");
/* harmony import */ var _components_global_authorized_person_global_authorized_person_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/global-authorized-person/global-authorized-person.component */ "./src/app/layout/global/components/global-authorized-person/global-authorized-person.component.ts");
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/multiselect */ "./node_modules/primeng/multiselect.js");
/* harmony import */ var primeng_multiselect__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_multiselect__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! primeng/paginator */ "./node_modules/primeng/paginator.js");
/* harmony import */ var primeng_paginator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(primeng_paginator__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_global_restricted_person_global_restricted_person_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/global-restricted-person/global-restricted-person.component */ "./src/app/layout/global/components/global-restricted-person/global-restricted-person.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var GlobalModule = /** @class */ (function () {
    function GlobalModule() {
    }
    GlobalModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _global_routing_module__WEBPACK_IMPORTED_MODULE_4__["GlobalRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_6__["NgxSpinnerModule"],
                primeng_multiselect__WEBPACK_IMPORTED_MODULE_8__["MultiSelectModule"],
                src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
                primeng_paginator__WEBPACK_IMPORTED_MODULE_10__["PaginatorModule"]
            ],
            declarations: [_components_reset_password_reset_password_component__WEBPACK_IMPORTED_MODULE_2__["ResetPasswordComponent"], _global_component__WEBPACK_IMPORTED_MODULE_3__["GlobalComponent"], _components_global_authorized_person_global_authorized_person_component__WEBPACK_IMPORTED_MODULE_7__["GlobalAuthorizedPersonComponent"], _components_global_restricted_person_global_restricted_person_component__WEBPACK_IMPORTED_MODULE_11__["GlobalRestrictedPersonComponent"]]
        })
    ], GlobalModule);
    return GlobalModule;
}());



/***/ }),

/***/ "./src/app/layout/global/shared/constant.ts":
/*!**************************************************!*\
  !*** ./src/app/layout/global/shared/constant.ts ***!
  \**************************************************/
/*! exports provided: GlobalAPIURLs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalAPIURLs", function() { return GlobalAPIURLs; });
var GlobalAPIURLs = {
    UpdatedPassword: 'api/Common/UpdatedPassword',
    GetAllStudentByParentIdDropdown: 'api/Masters/GetAllStudentByParentIdDropdown',
    SaveAuthorizedPersonDetails: 'api/Masters/SaveAuthorizedPersonDetails',
    GetAuthorizedPersonDetails: 'api/Masters/GetAuthorizedPersonDetails',
    ActivateAuthPerson: 'api/Masters/ActivateAuthPerson',
    // Restricted Person 
    SaveRestrictedPersonDetails: 'api/Masters/SaveRestrictedPersonDetails',
    GetRestrictedPersonDetails: 'api/Masters/GetRestrictedPersonDetails',
    ActivateRestrictedPerson: 'api/Masters/ActivateRestrictedPerson'
};


/***/ })

}]);
//# sourceMappingURL=global-global-module.js.map