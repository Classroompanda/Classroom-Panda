(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/angular2-csv/Angular2-csv.js":
/*!***************************************************!*\
  !*** ./node_modules/angular2-csv/Angular2-csv.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var CsvConfigConsts = (function () {
    function CsvConfigConsts() {
    }
    return CsvConfigConsts;
}());
CsvConfigConsts.EOL = "\r\n";
CsvConfigConsts.BOM = "\ufeff";
CsvConfigConsts.DEFAULT_FIELD_SEPARATOR = ',';
CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR = '.';
CsvConfigConsts.DEFAULT_QUOTE = '"';
CsvConfigConsts.DEFAULT_SHOW_TITLE = false;
CsvConfigConsts.DEFAULT_TITLE = 'My Report';
CsvConfigConsts.DEFAULT_FILENAME = 'mycsv.csv';
CsvConfigConsts.DEFAULT_SHOW_LABELS = false;
CsvConfigConsts.DEFAULT_USE_BOM = true;
CsvConfigConsts.DEFAULT_HEADER = [];
exports.CsvConfigConsts = CsvConfigConsts;
exports.ConfigDefaults = {
    filename: CsvConfigConsts.DEFAULT_FILENAME,
    fieldSeparator: CsvConfigConsts.DEFAULT_FIELD_SEPARATOR,
    quoteStrings: CsvConfigConsts.DEFAULT_QUOTE,
    decimalseparator: CsvConfigConsts.DEFAULT_DECIMAL_SEPARATOR,
    showLabels: CsvConfigConsts.DEFAULT_SHOW_LABELS,
    showTitle: CsvConfigConsts.DEFAULT_SHOW_TITLE,
    title: CsvConfigConsts.DEFAULT_TITLE,
    useBom: CsvConfigConsts.DEFAULT_USE_BOM,
    headers: CsvConfigConsts.DEFAULT_HEADER
};
var Angular2Csv = (function () {
    function Angular2Csv(DataJSON, filename, options) {
        this.csv = "";
        var config = options || {};
        this.data = typeof DataJSON != 'object' ? JSON.parse(DataJSON) : DataJSON;
        this._options = objectAssign({}, exports.ConfigDefaults, config);
        if (this._options.filename) {
            this._options.filename = filename;
        }
        this.generateCsv();
    }
    /**
     * Generate and Download Csv
     */
    Angular2Csv.prototype.generateCsv = function () {
        if (this._options.useBom) {
            this.csv += CsvConfigConsts.BOM;
        }
        if (this._options.showTitle) {
            this.csv += this._options.title + '\r\n\n';
        }
        this.getHeaders();
        this.getBody();
        if (this.csv == '') {
            console.log("Invalid data");
            return;
        }
        var blob = new Blob([this.csv], { "type": "text/csv;charset=utf8;" });
        if (navigator.msSaveBlob) {
            var filename = this._options.filename.replace(/ /g, "_") + ".csv";
            navigator.msSaveBlob(blob, filename);
        }
        else {
            var uri = 'data:attachment/csv;charset=utf-8,' + encodeURI(this.csv);
            var link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.setAttribute('visibility', 'hidden');
            link.download = this._options.filename.replace(/ /g, "_") + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    /**
     * Create Headers
     */
    Angular2Csv.prototype.getHeaders = function () {
        if (this._options.headers.length > 0) {
            var row = "";
            for (var _i = 0, _a = this._options.headers; _i < _a.length; _i++) {
                var column = _a[_i];
                row += column + this._options.fieldSeparator;
            }
            row = row.slice(0, -1);
            this.csv += row + CsvConfigConsts.EOL;
        }
    };
    /**
     * Create Body
     */
    Angular2Csv.prototype.getBody = function () {
        for (var i = 0; i < this.data.length; i++) {
            var row = "";
            for (var index in this.data[i]) {
                row += this.formartData(this.data[i][index]) + this._options.fieldSeparator;
                ;
            }
            row = row.slice(0, -1);
            this.csv += row + CsvConfigConsts.EOL;
        }
    };
    /**
     * Format Data
     * @param {any} data
     */
    Angular2Csv.prototype.formartData = function (data) {
        if (this._options.decimalseparator === 'locale' && this.isFloat(data)) {
            return data.toLocaleString();
        }
        if (this._options.decimalseparator !== '.' && this.isFloat(data)) {
            return data.toString().replace('.', this._options.decimalseparator);
        }
        if (typeof data === 'string') {
            data = data.replace(/"/g, '""');
            if (this._options.quoteStrings || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) {
                data = this._options.quoteStrings + data + this._options.quoteStrings;
            }
            return data;
        }
        if (typeof data === 'boolean') {
            return data ? 'TRUE' : 'FALSE';
        }
        return data;
    };
    /**
     * Check if is Float
     * @param {any} input
     */
    Angular2Csv.prototype.isFloat = function (input) {
        return +input === input && (!isFinite(input) || Boolean(input % 1));
    };
    return Angular2Csv;
}());
exports.Angular2Csv = Angular2Csv;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
/**
 * Convet to Object
 * @param {any} val
 */
function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}
/**
 * Assign data  to new Object
 * @param {any}   target
 * @param {any[]} ...source
 */
function objectAssign(target) {
    var source = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        source[_i - 1] = arguments[_i];
    }
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }
        if (Object.getOwnPropertySymbols) {
            symbols = Object.getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }
    return to;
}


/***/ }),

/***/ "./src/app/layout/admin/shared/constant.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/admin/shared/constant.ts ***!
  \*************************************************/
/*! exports provided: AdminAPIURLs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAPIURLs", function() { return AdminAPIURLs; });
var AdminAPIURLs = {
    // Agency admin list
    SaveAgencyInformation: 'api/Agency/SaveAgencyInformation',
    GetAllAgencyDetails: 'api/Agency/GetAllAgencyDetails',
    GetAllPricingPlanDetails: 'api/Agency/GetAllPricingPlanDetails',
    GetAllState: 'api/Masters/GetAllState',
    // Pricing plan
    SavePricingPlanInformation: 'api/Agency/SavePricingPlanInformation',
    // For Parent List
    GetClassroomJoinParent: 'api/Parent/GetClassroomJoinParent',
    // Save State
    SaveState: 'api/Masters/SaveState',
    // Save State
    SaveCity: 'api/Masters/SaveCity',
    // Plan Page
    SaveSubscriptionInformation: 'api/Agency/SaveSubscriptionInformation',
    GetCountDetailsForSuperAdmin: 'api/Agency/GetCountDetailsForSuperAdmin',
    GetAllAgencyPlanDetails: 'api/Agency/GetAllAgencyPlanDetails',
    ActivateDeactivateAgency: 'api/Agency/ActivateDeactivateAgency',
    // For Information Video
    MultipleImageUpload: 'api/common/MultipleImageUpload',
    SaveInfoVideo: 'api/Masters/SaveInfoVideo',
    // For Text Plan
    SaveTextMessagePlan: 'api/Message/SaveTextMessagePlan',
    GetTextMessagePlan: 'api/Message/GetTextMessagePlan',
    ActivateDeactivateTextMessagePlan: 'api/Message/ActivateDeactivateTextMessagePlan',
};


/***/ }),

/***/ "./src/app/layout/admin/shared/services/admin-api.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/layout/admin/shared/services/admin-api.service.ts ***!
  \*******************************************************************/
/*! exports provided: AdminApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminApiService", function() { return AdminApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_services_api_service_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/api-service/api.service */ "./src/app/shared/services/api-service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminApiService = /** @class */ (function () {
    function AdminApiService(apiService) {
        this.apiService = apiService;
    }
    /**API to get projects by  user email  */
    AdminApiService.prototype.getData = function (url, data) {
        return this.apiService.getData(url, data);
    };
    AdminApiService.prototype.postData = function (url, data, params) {
        return this.apiService.postData(url, data, params);
    };
    AdminApiService.prototype.deleteData = function (url, params) {
        return this.apiService.deleteData(url, params);
    };
    AdminApiService.prototype.uploadImage = function (url, data, params) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]();
        params = headers.set('Content-Type', 'multipart/form-data');
        return this.apiService.postData(url, data, params);
    };
    AdminApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_services_api_service_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], AdminApiService);
    return AdminApiService;
}());



/***/ }),

/***/ "./src/app/layout/agency-admin/components/shared/services/agency-api-service/agency-api.service.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/app/layout/agency-admin/components/shared/services/agency-api-service/agency-api.service.ts ***!
  \*********************************************************************************************************/
/*! exports provided: AgencyApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgencyApiService", function() { return AgencyApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_api_service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../shared/services/api-service/api.service */ "./src/app/shared/services/api-service/api.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AgencyApiService = /** @class */ (function () {
    function AgencyApiService(apiService) {
        this.apiService = apiService;
    }
    /**API to get projects by  user email  */
    AgencyApiService.prototype.getData = function (url, data) {
        return this.apiService.getData(url, data);
    };
    AgencyApiService.prototype.postData = function (url, data, params) {
        return this.apiService.postData(url, data, params);
    };
    AgencyApiService.prototype.deleteData = function (url, params) {
        return this.apiService.deleteData(url, params);
    };
    AgencyApiService.prototype.uploadImage = function (url, data, params) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        params = headers.set('Content-Type', 'multipart/form-data');
        return this.apiService.postData(url, data, params);
    };
    AgencyApiService.prototype.postDataV2 = function (url, data, params) {
        return this.apiService.postDataV2(url, data, params);
    };
    AgencyApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_services_api_service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], AgencyApiService);
    return AgencyApiService;
}());



/***/ }),

/***/ "./src/app/layout/parent/shared/services/parent-api-service.ts":
/*!*********************************************************************!*\
  !*** ./src/app/layout/parent/shared/services/parent-api-service.ts ***!
  \*********************************************************************/
/*! exports provided: ParentApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParentApiService", function() { return ParentApiService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_api_service_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/services/api-service/api.service */ "./src/app/shared/services/api-service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ParentApiService = /** @class */ (function () {
    function ParentApiService(apiService) {
        this.apiService = apiService;
    }
    /**API to get projects by  user email  */
    ParentApiService.prototype.getData = function (url, data) {
        return this.apiService.getData(url, data);
    };
    ParentApiService.prototype.postData = function (url, data, params) {
        return this.apiService.postData(url, data, params);
    };
    ParentApiService.prototype.deleteData = function (url, params) {
        return this.apiService.deleteData(url, params);
    };
    ParentApiService.prototype.uploadImage = function (url, data, params) {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]();
        params = headers.set('Content-Type', 'multipart/form-data');
        return this.apiService.postData(url, data, params);
    };
    ParentApiService.prototype.postDataV2 = function (url, data, params) {
        return this.apiService.postDataV2(url, data, params);
    };
    ParentApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_shared_services_api_service_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])
    ], ParentApiService);
    return ParentApiService;
}());



/***/ }),

/***/ "./src/app/shared/constdata.ts":
/*!*************************************!*\
  !*** ./src/app/shared/constdata.ts ***!
  \*************************************/
/*! exports provided: AdminStripKey, StripClintID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminStripKey", function() { return AdminStripKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StripClintID", function() { return StripClintID; });
/** Following publish key use to payment againts subscription that will pay
 to Owner of this key (Super Admin) */
var AdminStripKey = {
    /**  Test publishable Key  */
    // publishableKey: 'pk_test_2GT92tIJ9wYUNtjwQZS855N1',
    /**  Live publishable Key  */
    publishableKey: 'pk_live_EQuf8rr46EGcFyC0pNniomEF',
};
/**Client id is use to redirect to the stripe account create page */
/**Following are two different keys for test and live */
var StripClintID = {
    /**Test Mode Client ID */
    // ClientID: 'ca_EqyWiw8fq7VHqbfxp2vvUgpHLOZumCeS',
    /**Live Mode Client ID */
    ClientID: 'ca_EqyWgq54bDmWdEY0njt7JhCzm9YcEecI'
};


/***/ }),

/***/ "./src/app/shared/services/constant.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/services/constant.ts ***!
  \*********************************************/
/*! exports provided: LayoutAPIURLs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutAPIURLs", function() { return LayoutAPIURLs; });
var LayoutAPIURLs = {
    TeacherClockInClockOut: 'api/Teacher/TeacherClockInClockOut',
    DeleteToken: 'api/Masters/DeleteDeviceToken'
};


/***/ }),

/***/ "./src/app/shared/services/lauout-api-service.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/services/lauout-api-service.ts ***!
  \*******************************************************/
/*! exports provided: LayoutApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutApiService", function() { return LayoutApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_service_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api-service/api.service */ "./src/app/shared/services/api-service/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LayoutApiService = /** @class */ (function () {
    function LayoutApiService(apiService) {
        this.apiService = apiService;
    }
    /**API to get projects by  user email  */
    LayoutApiService.prototype.getData = function (url, data) {
        return this.apiService.getData(url, data);
    };
    LayoutApiService.prototype.postData = function (url, data, params) {
        return this.apiService.postData(url, data, params);
    };
    LayoutApiService.prototype.deleteData = function (url, params) {
        return this.apiService.deleteData(url, params);
    };
    LayoutApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_api_service_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], LayoutApiService);
    return LayoutApiService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map