(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~agency-admin-agency-admin-module~layout-layout-module"],{

/***/ "./node_modules/@angular/cdk/esm5/bidi.es5.js":
/*!****************************************************!*\
  !*** ./node_modules/@angular/cdk/esm5/bidi.es5.js ***!
  \****************************************************/
/*! exports provided: Directionality, DIR_DOCUMENT, Dir, BidiModule, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Directionality", function() { return Directionality; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIR_DOCUMENT", function() { return DIR_DOCUMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dir", function() { return Dir; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BidiModule", function() { return BidiModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return DIR_DOCUMENT_FACTORY; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Injection token used to inject the document into Directionality.
 * This is used so that the value can be faked in tests.
 *
 * We can't use the real document in tests because changing the real `dir` causes geometry-based
 * tests in Safari to fail.
 *
 * We also can't re-provide the DOCUMENT token from platform-brower because the unit tests
 * themselves use things like `querySelector` in test code.
 *
 * This token is defined in a separate file from Directionality as a workaround for
 * https://github.com/angular/angular/issues/22559
 *
 * \@docs-private
  @type {?} */
var DIR_DOCUMENT = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["InjectionToken"]('cdk-dir-doc', {
    providedIn: 'root',
    factory: DIR_DOCUMENT_FACTORY,
});
/**
 * \@docs-private
 * @return {?}
 */
function DIR_DOCUMENT_FACTORY() {
    return Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_0__["DOCUMENT"]);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * The directionality (LTR / RTL) context for the application (or a subtree of it).
 * Exposes the current direction and a stream of direction changes.
 */
var Directionality = /** @class */ (function () {
    function Directionality(_document) {
        /**
         * The current 'ltr' or 'rtl' value.
         */
        this.value = 'ltr';
        /**
         * Stream that emits whenever the 'ltr' / 'rtl' state changes.
         */
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        if (_document) {
            /** @type {?} */
            var bodyDir = _document.body ? _document.body.dir : null;
            /** @type {?} */
            var htmlDir = _document.documentElement ? _document.documentElement.dir : null;
            /** @type {?} */
            var value = bodyDir || htmlDir;
            this.value = (value === 'ltr' || value === 'rtl') ? value : 'ltr';
        }
    }
    /**
     * @return {?}
     */
    Directionality.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.change.complete();
    };
    Directionality.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    Directionality.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [DIR_DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ Directionality.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function Directionality_Factory() { return new Directionality(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["inject"])(DIR_DOCUMENT, 8)); }, token: Directionality, providedIn: "root" });
    return Directionality;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Provides itself as Directionality such that descendant directives only need to ever inject
 * Directionality to get the closest direction.
 */
var Dir = /** @class */ (function () {
    function Dir() {
        this._dir = 'ltr';
        /**
         * Whether the `value` has been set to its initial value.
         */
        this._isInitialized = false;
        /**
         * Event emitted when the direction changes.
         */
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        /** @docs-private */
        get: /**
         * \@docs-private
         * @return {?}
         */
        function () { return this._dir; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var old = this._dir;
            this._dir = (value === 'ltr' || value === 'rtl') ? value : 'ltr';
            if (old !== this._dir && this._isInitialized) {
                this.change.emit(this._dir);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: /**
         * Current layout direction of the element.
         * @return {?}
         */
        function () { return this.dir; },
        enumerable: true,
        configurable: true
    });
    /** Initialize once default value has been set. */
    /**
     * Initialize once default value has been set.
     * @return {?}
     */
    Dir.prototype.ngAfterContentInit = /**
     * Initialize once default value has been set.
     * @return {?}
     */
    function () {
        this._isInitialized = true;
    };
    /**
     * @return {?}
     */
    Dir.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.change.complete();
    };
    Dir.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[dir]',
                    providers: [{ provide: Directionality, useExisting: Dir }],
                    host: { '[dir]': 'dir' },
                    exportAs: 'dir',
                },] },
    ];
    Dir.propDecorators = {
        change: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"], args: ['dirChange',] }],
        dir: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return Dir;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var BidiModule = /** @class */ (function () {
    function BidiModule() {
    }
    BidiModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    exports: [Dir],
                    declarations: [Dir],
                },] },
    ];
    return BidiModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */


//# sourceMappingURL=bidi.es5.js.map


/***/ }),

/***/ "./node_modules/@angular/cdk/esm5/coercion.es5.js":
/*!********************************************************!*\
  !*** ./node_modules/@angular/cdk/esm5/coercion.es5.js ***!
  \********************************************************/
/*! exports provided: coerceBooleanProperty, coerceNumberProperty, _isNumberValue, coerceArray, coerceCssPixelValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coerceBooleanProperty", function() { return coerceBooleanProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coerceNumberProperty", function() { return coerceNumberProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_isNumberValue", function() { return _isNumberValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coerceArray", function() { return coerceArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coerceCssPixelValue", function() { return coerceCssPixelValue; });
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * Coerces a data-bound value (typically a string) to a boolean.
 * @param {?} value
 * @return {?}
 */
function coerceBooleanProperty(value) {
    return value != null && "" + value !== 'false';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @param {?} value
 * @param {?=} fallbackValue
 * @return {?}
 */
function coerceNumberProperty(value, fallbackValue) {
    if (fallbackValue === void 0) { fallbackValue = 0; }
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}
/**
 * Whether the provided value is considered a number.
 * \@docs-private
 * @param {?} value
 * @return {?}
 */
function _isNumberValue(value) {
    // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
    // and other non-number values as NaN, where Number just uses 0) but it considers the string
    // '123hello' to be a valid number. Therefore we also check if Number(value) is NaN.
    return !isNaN(parseFloat(/** @type {?} */ (value))) && !isNaN(Number(value));
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * Wraps the provided value in an array, unless the provided value is an array.
 * @template T
 * @param {?} value
 * @return {?}
 */
function coerceArray(value) {
    return Array.isArray(value) ? value : [value];
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * Coerces a value to a CSS pixel value.
 * @param {?} value
 * @return {?}
 */
function coerceCssPixelValue(value) {
    if (value == null) {
        return '';
    }
    return typeof value === 'string' ? value : value + "px";
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */


//# sourceMappingURL=coercion.es5.js.map


/***/ }),

/***/ "./node_modules/@angular/cdk/esm5/collections.es5.js":
/*!***********************************************************!*\
  !*** ./node_modules/@angular/cdk/esm5/collections.es5.js ***!
  \***********************************************************/
/*! exports provided: UniqueSelectionDispatcher, ArrayDataSource, DataSource, getMultipleValuesInSingleSelectionError, SelectionModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UniqueSelectionDispatcher", function() { return UniqueSelectionDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ArrayDataSource", function() { return ArrayDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSource", function() { return DataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMultipleValuesInSingleSelectionError", function() { return getMultipleValuesInSingleSelectionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectionModel", function() { return SelectionModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @abstract
 * @template T
 */
var  /**
 * @abstract
 * @template T
 */
DataSource = /** @class */ (function () {
    function DataSource() {
    }
    return DataSource;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * DataSource wrapper for a native array.
 * @template T
 */
var  /**
 * DataSource wrapper for a native array.
 * @template T
 */
ArrayDataSource = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(ArrayDataSource, _super);
    function ArrayDataSource(_data) {
        var _this = _super.call(this) || this;
        _this._data = _data;
        return _this;
    }
    /**
     * @return {?}
     */
    ArrayDataSource.prototype.connect = /**
     * @return {?}
     */
    function () {
        return this._data instanceof rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"] ? this._data : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this._data);
    };
    /**
     * @return {?}
     */
    ArrayDataSource.prototype.disconnect = /**
     * @return {?}
     */
    function () { };
    return ArrayDataSource;
}(DataSource));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class to be used to power selecting one or more options from a list.
 * @template T
 */
var  /**
 * Class to be used to power selecting one or more options from a list.
 * @template T
 */
SelectionModel = /** @class */ (function () {
    function SelectionModel(_multiple, initiallySelectedValues, _emitChanges) {
        if (_multiple === void 0) { _multiple = false; }
        if (_emitChanges === void 0) { _emitChanges = true; }
        var _this = this;
        this._multiple = _multiple;
        this._emitChanges = _emitChanges;
        /**
         * Currently-selected values.
         */
        this._selection = new Set();
        /**
         * Keeps track of the deselected options that haven't been emitted by the change event.
         */
        this._deselectedToEmit = [];
        /**
         * Keeps track of the selected options that haven't been emitted by the change event.
         */
        this._selectedToEmit = [];
        /**
         * Event emitted when the value has changed.
         */
        this.changed = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        /**
         * Event emitted when the value has changed.
         * @deprecated Use `changed` instead.
         * \@breaking-change 8.0.0 To be changed to `changed`
         */
        this.onChange = this.changed;
        if (initiallySelectedValues && initiallySelectedValues.length) {
            if (_multiple) {
                initiallySelectedValues.forEach(function (value) { return _this._markSelected(value); });
            }
            else {
                this._markSelected(initiallySelectedValues[0]);
            }
            // Clear the array in order to avoid firing the change event for preselected values.
            this._selectedToEmit.length = 0;
        }
    }
    Object.defineProperty(SelectionModel.prototype, "selected", {
        /** Selected values. */
        get: /**
         * Selected values.
         * @return {?}
         */
        function () {
            if (!this._selected) {
                this._selected = Array.from(this._selection.values());
            }
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Selects a value or an array of values.
     */
    /**
     * Selects a value or an array of values.
     * @param {...?} values
     * @return {?}
     */
    SelectionModel.prototype.select = /**
     * Selects a value or an array of values.
     * @param {...?} values
     * @return {?}
     */
    function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._verifyValueAssignment(values);
        values.forEach(function (value) { return _this._markSelected(value); });
        this._emitChangeEvent();
    };
    /**
     * Deselects a value or an array of values.
     */
    /**
     * Deselects a value or an array of values.
     * @param {...?} values
     * @return {?}
     */
    SelectionModel.prototype.deselect = /**
     * Deselects a value or an array of values.
     * @param {...?} values
     * @return {?}
     */
    function () {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        this._verifyValueAssignment(values);
        values.forEach(function (value) { return _this._unmarkSelected(value); });
        this._emitChangeEvent();
    };
    /**
     * Toggles a value between selected and deselected.
     */
    /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.toggle = /**
     * Toggles a value between selected and deselected.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.isSelected(value) ? this.deselect(value) : this.select(value);
    };
    /**
     * Clears all of the selected values.
     */
    /**
     * Clears all of the selected values.
     * @return {?}
     */
    SelectionModel.prototype.clear = /**
     * Clears all of the selected values.
     * @return {?}
     */
    function () {
        this._unmarkAll();
        this._emitChangeEvent();
    };
    /**
     * Determines whether a value is selected.
     */
    /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype.isSelected = /**
     * Determines whether a value is selected.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this._selection.has(value);
    };
    /**
     * Determines whether the model does not have a value.
     */
    /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    SelectionModel.prototype.isEmpty = /**
     * Determines whether the model does not have a value.
     * @return {?}
     */
    function () {
        return this._selection.size === 0;
    };
    /**
     * Determines whether the model has a value.
     */
    /**
     * Determines whether the model has a value.
     * @return {?}
     */
    SelectionModel.prototype.hasValue = /**
     * Determines whether the model has a value.
     * @return {?}
     */
    function () {
        return !this.isEmpty();
    };
    /**
     * Sorts the selected values based on a predicate function.
     */
    /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    SelectionModel.prototype.sort = /**
     * Sorts the selected values based on a predicate function.
     * @param {?=} predicate
     * @return {?}
     */
    function (predicate) {
        if (this._multiple && this.selected) {
            /** @type {?} */ ((this._selected)).sort(predicate);
        }
    };
    /**
     * Gets whether multiple values can be selected.
     */
    /**
     * Gets whether multiple values can be selected.
     * @return {?}
     */
    SelectionModel.prototype.isMultipleSelection = /**
     * Gets whether multiple values can be selected.
     * @return {?}
     */
    function () {
        return this._multiple;
    };
    /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    SelectionModel.prototype._emitChangeEvent = /**
     * Emits a change event and clears the records of selected and deselected values.
     * @return {?}
     */
    function () {
        // Clear the selected values so they can be re-cached.
        this._selected = null;
        if (this._selectedToEmit.length || this._deselectedToEmit.length) {
            this.changed.next({
                source: this,
                added: this._selectedToEmit,
                removed: this._deselectedToEmit
            });
            this._deselectedToEmit = [];
            this._selectedToEmit = [];
        }
    };
    /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype._markSelected = /**
     * Selects a value.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!this.isSelected(value)) {
            if (!this._multiple) {
                this._unmarkAll();
            }
            this._selection.add(value);
            if (this._emitChanges) {
                this._selectedToEmit.push(value);
            }
        }
    };
    /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    SelectionModel.prototype._unmarkSelected = /**
     * Deselects a value.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (this.isSelected(value)) {
            this._selection.delete(value);
            if (this._emitChanges) {
                this._deselectedToEmit.push(value);
            }
        }
    };
    /**
     * Clears out the selected values.
     * @return {?}
     */
    SelectionModel.prototype._unmarkAll = /**
     * Clears out the selected values.
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isEmpty()) {
            this._selection.forEach(function (value) { return _this._unmarkSelected(value); });
        }
    };
    /**
     * Verifies the value assignment and throws an error if the specified value array is
     * including multiple values while the selection model is not supporting multiple values.
     * @param {?} values
     * @return {?}
     */
    SelectionModel.prototype._verifyValueAssignment = /**
     * Verifies the value assignment and throws an error if the specified value array is
     * including multiple values while the selection model is not supporting multiple values.
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (values.length > 1 && !this._multiple) {
            throw getMultipleValuesInSingleSelectionError();
        }
    };
    return SelectionModel;
}());
/**
 * Returns an error that reports that multiple values are passed into a selection model
 * with a single value.
 * \@docs-private
 * @return {?}
 */
function getMultipleValuesInSingleSelectionError() {
    return Error('Cannot pass multiple values into SelectionModel with single-value mode.');
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Class to coordinate unique selection based on name.
 * Intended to be consumed as an Angular service.
 * This service is needed because native radio change events are only fired on the item currently
 * being selected, and we still need to uncheck the previous selection.
 *
 * This service does not *store* any IDs and names because they may change at any time, so it is
 * less error-prone if they are simply passed through when the events occur.
 */
var UniqueSelectionDispatcher = /** @class */ (function () {
    function UniqueSelectionDispatcher() {
        this._listeners = [];
    }
    /**
     * Notify other items that selection for the given name has been set.
     * @param id ID of the item.
     * @param name Name of the item.
     */
    /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    UniqueSelectionDispatcher.prototype.notify = /**
     * Notify other items that selection for the given name has been set.
     * @param {?} id ID of the item.
     * @param {?} name Name of the item.
     * @return {?}
     */
    function (id, name) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(id, name);
        }
    };
    /**
     * Listen for future changes to item selection.
     * @return Function used to deregister listener
     */
    /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?} Function used to deregister listener
     */
    UniqueSelectionDispatcher.prototype.listen = /**
     * Listen for future changes to item selection.
     * @param {?} listener
     * @return {?} Function used to deregister listener
     */
    function (listener) {
        var _this = this;
        this._listeners.push(listener);
        return function () {
            _this._listeners = _this._listeners.filter(function (registered) {
                return listener !== registered;
            });
        };
    };
    /**
     * @return {?}
     */
    UniqueSelectionDispatcher.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._listeners = [];
    };
    UniqueSelectionDispatcher.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"], args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */ UniqueSelectionDispatcher.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["defineInjectable"])({ factory: function UniqueSelectionDispatcher_Factory() { return new UniqueSelectionDispatcher(); }, token: UniqueSelectionDispatcher, providedIn: "root" });
    return UniqueSelectionDispatcher;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */


//# sourceMappingURL=collections.es5.js.map


/***/ }),

/***/ "./node_modules/@angular/cdk/esm5/layout.es5.js":
/*!******************************************************!*\
  !*** ./node_modules/@angular/cdk/esm5/layout.es5.js ***!
  \******************************************************/
/*! exports provided: LayoutModule, BreakpointObserver, Breakpoints, MediaMatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreakpointObserver", function() { return BreakpointObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Breakpoints", function() { return Breakpoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaMatcher", function() { return MediaMatcher; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */






/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{},] },
    ];
    return LayoutModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Global registry for all dynamically-created, injected media queries.
  @type {?} */
var mediaQueriesForWebkitCompatibility = new Set();
/** *
 * Style tag that holds all of the dynamically-created media queries.
  @type {?} */
var mediaQueryStyleNode;
/**
 * A utility for calling matchMedia queries.
 */
var MediaMatcher = /** @class */ (function () {
    function MediaMatcher(platform) {
        this.platform = platform;
        this._matchMedia = this.platform.isBrowser && window.matchMedia ?
            // matchMedia is bound to the window scope intentionally as it is an illegal invocation to
            // call it from a different scope.
            window.matchMedia.bind(window) :
            noopMatchMedia;
    }
    /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     */
    /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     * @param {?} query
     * @return {?}
     */
    MediaMatcher.prototype.matchMedia = /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     * @param {?} query
     * @return {?}
     */
    function (query) {
        if (this.platform.WEBKIT) {
            createEmptyStyleRule(query);
        }
        return this._matchMedia(query);
    };
    MediaMatcher.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    MediaMatcher.ctorParameters = function () { return [
        { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__["Platform"] }
    ]; };
    /** @nocollapse */ MediaMatcher.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function MediaMatcher_Factory() { return new MediaMatcher(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_1__["Platform"])); }, token: MediaMatcher, providedIn: "root" });
    return MediaMatcher;
}());
/**
 * For Webkit engines that only trigger the MediaQueryListListener when
 * there is at least one CSS selector for the respective media query.
 * @param {?} query
 * @return {?}
 */
function createEmptyStyleRule(query) {
    if (mediaQueriesForWebkitCompatibility.has(query)) {
        return;
    }
    try {
        if (!mediaQueryStyleNode) {
            mediaQueryStyleNode = document.createElement('style');
            mediaQueryStyleNode.setAttribute('type', 'text/css'); /** @type {?} */
            ((document.head)).appendChild(mediaQueryStyleNode);
        }
        if (mediaQueryStyleNode.sheet) {
            (/** @type {?} */ (mediaQueryStyleNode.sheet))
                .insertRule("@media " + query + " {.fx-query-test{ }}", 0);
            mediaQueriesForWebkitCompatibility.add(query);
        }
    }
    catch (e) {
        console.error(e);
    }
}
/**
 * No-op matchMedia replacement for non-browser platforms.
 * @param {?} query
 * @return {?}
 */
function noopMatchMedia(query) {
    // Use `as any` here to avoid adding additional necessary properties for
    // the noop matcher.
    return /** @type {?} */ ({
        matches: query === 'all' || query === '',
        media: query,
        addListener: function () { },
        removeListener: function () { }
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Utility for checking the matching state of \@media queries.
 */
var BreakpointObserver = /** @class */ (function () {
    function BreakpointObserver(mediaMatcher, zone) {
        this.mediaMatcher = mediaMatcher;
        this.zone = zone;
        /**
         * A map of all media queries currently being listened for.
         */
        this._queries = new Map();
        /**
         * A subject for all other observables to takeUntil based on.
         */
        this._destroySubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    /** Completes the active subject, signalling to all other observables to complete. */
    /**
     * Completes the active subject, signalling to all other observables to complete.
     * @return {?}
     */
    BreakpointObserver.prototype.ngOnDestroy = /**
     * Completes the active subject, signalling to all other observables to complete.
     * @return {?}
     */
    function () {
        this._destroySubject.next();
        this._destroySubject.complete();
    };
    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    /**
     * Whether one or more media queries match the current viewport size.
     * @param {?} value One or more media queries to check.
     * @return {?} Whether any of the media queries match.
     */
    BreakpointObserver.prototype.isMatched = /**
     * Whether one or more media queries match the current viewport size.
     * @param {?} value One or more media queries to check.
     * @return {?} Whether any of the media queries match.
     */
    function (value) {
        var _this = this;
        /** @type {?} */
        var queries = splitQueries(Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceArray"])(value));
        return queries.some(function (mediaQuery) { return _this._registerQuery(mediaQuery).mql.matches; });
    };
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param value One or more media queries to check.
     * @returns A stream of matches for the given queries.
     */
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param {?} value One or more media queries to check.
     * @return {?} A stream of matches for the given queries.
     */
    BreakpointObserver.prototype.observe = /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param {?} value One or more media queries to check.
     * @return {?} A stream of matches for the given queries.
     */
    function (value) {
        var _this = this;
        /** @type {?} */
        var queries = splitQueries(Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_4__["coerceArray"])(value));
        /** @type {?} */
        var observables = queries.map(function (query) { return _this._registerQuery(query).observable; });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(observables).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(0, rxjs__WEBPACK_IMPORTED_MODULE_2__["asapScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (breakpointStates) {
            /** @type {?} */
            var response = {
                matches: false,
                breakpoints: {},
            };
            breakpointStates.forEach(function (state) {
                response.matches = response.matches || state.matches;
                response.breakpoints[state.query] = state.matches;
            });
            return response;
        }));
    };
    /**
     * Registers a specific query to be listened for.
     * @param {?} query
     * @return {?}
     */
    BreakpointObserver.prototype._registerQuery = /**
     * Registers a specific query to be listened for.
     * @param {?} query
     * @return {?}
     */
    function (query) {
        var _this = this;
        // Only set up a new MediaQueryList if it is not already being listened for.
        if (this._queries.has(query)) {
            return /** @type {?} */ ((this._queries.get(query)));
        }
        /** @type {?} */
        var mql = this.mediaMatcher.matchMedia(query);
        /** @type {?} */
        var queryListener;
        /** @type {?} */
        var queryObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEventPattern"])(
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
        // back into the zone because matchMedia is only included in Zone.js by loading the
        // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
        // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
        // patches it.
        function (listener) {
            queryListener = function (e) { return _this.zone.run(function () { return listener(e); }); };
            mql.addListener(queryListener);
        }, function () { return mql.removeListener(queryListener); })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroySubject), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(mql), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (nextMql) { return ({ query: query, matches: nextMql.matches }); }));
        /** @type {?} */
        var output = { observable: queryObservable, mql: mql };
        this._queries.set(query, output);
        return output;
    };
    BreakpointObserver.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    BreakpointObserver.ctorParameters = function () { return [
        { type: MediaMatcher },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
    ]; };
    /** @nocollapse */ BreakpointObserver.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function BreakpointObserver_Factory() { return new BreakpointObserver(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(MediaMatcher), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); }, token: BreakpointObserver, providedIn: "root" });
    return BreakpointObserver;
}());
/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 * @param {?} queries
 * @return {?}
 */
function splitQueries(queries) {
    return queries.map(function (query) { return query.split(','); })
        .reduce(function (a1, a2) { return a1.concat(a2); })
        .map(function (query) { return query.trim(); });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
  @type {?} */
var Breakpoints = {
    XSmall: '(max-width: 599.99px)',
    Small: '(min-width: 600px) and (max-width: 959.99px)',
    Medium: '(min-width: 960px) and (max-width: 1279.99px)',
    Large: '(min-width: 1280px) and (max-width: 1919.99px)',
    XLarge: '(min-width: 1920px)',
    Handset: '(max-width: 599.99px) and (orientation: portrait), ' +
        '(max-width: 959.99px) and (orientation: landscape)',
    Tablet: '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait), ' +
        '(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
    Web: '(min-width: 840px) and (orientation: portrait), ' +
        '(min-width: 1280px) and (orientation: landscape)',
    HandsetPortrait: '(max-width: 599.99px) and (orientation: portrait)',
    TabletPortrait: '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)',
    WebPortrait: '(min-width: 840px) and (orientation: portrait)',
    HandsetLandscape: '(max-width: 959.99px) and (orientation: landscape)',
    TabletLandscape: '(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
    WebLandscape: '(min-width: 1280px) and (orientation: landscape)',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */


//# sourceMappingURL=layout.es5.js.map


/***/ }),

/***/ "./node_modules/@angular/cdk/esm5/platform.es5.js":
/*!********************************************************!*\
  !*** ./node_modules/@angular/cdk/esm5/platform.es5.js ***!
  \********************************************************/
/*! exports provided: Platform, PlatformModule, getSupportedInputTypes, supportsPassiveEventListeners, normalizePassiveListenerOptions, supportsScrollBehavior, getRtlScrollAxisType, RtlScrollAxisType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Platform", function() { return Platform; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlatformModule", function() { return PlatformModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSupportedInputTypes", function() { return getSupportedInputTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsPassiveEventListeners", function() { return supportsPassiveEventListeners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizePassiveListenerOptions", function() { return normalizePassiveListenerOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "supportsScrollBehavior", function() { return supportsScrollBehavior; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRtlScrollAxisType", function() { return getRtlScrollAxisType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RtlScrollAxisType", function() { return RtlScrollAxisType; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var hasV8BreakIterator = (typeof Intl !== 'undefined' && (/** @type {?} */ (Intl)).v8BreakIterator);
/**
 * Service to detect the current platform by comparing the userAgent strings and
 * checking browser-specific global properties.
 */
var Platform = /** @class */ (function () {
    /**
     * @breaking-change 8.0.0 remove optional decorator
     */
    function Platform(_platformId) {
        this._platformId = _platformId;
        /**
         * Whether the Angular application is being rendered in the browser.
         * We want to use the Angular platform check because if the Document is shimmed
         * without the navigator, the following checks will fail. This is preferred because
         * sometimes the Document may be shimmed without the user's knowledge or intention
         */
        this.isBrowser = this._platformId ?
            Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this._platformId) : typeof document === 'object' && !!document;
        /**
         * Whether the current browser is Microsoft Edge.
         */
        this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
        /**
         * Whether the current rendering engine is Microsoft Trident.
         */
        this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
        /**
         * Whether the current rendering engine is Blink.
         */
        this.BLINK = this.isBrowser && (!!((/** @type {?} */ (window)).chrome || hasV8BreakIterator) &&
            typeof CSS !== 'undefined' && !this.EDGE && !this.TRIDENT);
        /**
         * Whether the current rendering engine is WebKit.
         */
        this.WEBKIT = this.isBrowser &&
            /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
        /**
         * Whether the current platform is Apple iOS.
         */
        this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !('MSStream' in window);
        /**
         * Whether the current browser is Firefox.
         */
        this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
        /**
         * Whether the current platform is Android.
         */
        this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
        /**
         * Whether the current browser is Safari.
         */
        this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    }
    Platform.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    Platform.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"],] }] }
    ]; };
    /** @nocollapse */ Platform.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function Platform_Factory() { return new Platform(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"], 8)); }, token: Platform, providedIn: "root" });
    return Platform;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var PlatformModule = /** @class */ (function () {
    function PlatformModule() {
    }
    PlatformModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{},] },
    ];
    return PlatformModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/** *
 * Cached result Set of input types support by the current browser.
  @type {?} */
var supportedInputTypes;
/** *
 * Types of `<input>` that *might* be supported.
  @type {?} */
var candidateInputTypes = [
    'color',
    'button',
    'checkbox',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
];
/**
 * @return {?} The input types supported by this browser.
 */
function getSupportedInputTypes() {
    // Result is cached.
    if (supportedInputTypes) {
        return supportedInputTypes;
    }
    // We can't check if an input type is not supported until we're on the browser, so say that
    // everything is supported when not on the browser. We don't use `Platform` here since it's
    // just a helper function and can't inject it.
    if (typeof document !== 'object' || !document) {
        supportedInputTypes = new Set(candidateInputTypes);
        return supportedInputTypes;
    }
    /** @type {?} */
    var featureTestInput = document.createElement('input');
    supportedInputTypes = new Set(candidateInputTypes.filter(function (value) {
        featureTestInput.setAttribute('type', value);
        return featureTestInput.type === value;
    }));
    return supportedInputTypes;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/** *
 * Cached result of whether the user's browser supports passive event listeners.
  @type {?} */
var supportsPassiveEvents;
/**
 * Checks whether the user's browser supports passive event listeners.
 * See: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 * @return {?}
 */
function supportsPassiveEventListeners() {
    if (supportsPassiveEvents == null && typeof window !== 'undefined') {
        try {
            window.addEventListener('test', /** @type {?} */ ((null)), Object.defineProperty({}, 'passive', {
                get: function () { return supportsPassiveEvents = true; }
            }));
        }
        finally {
            supportsPassiveEvents = supportsPassiveEvents || false;
        }
    }
    return supportsPassiveEvents;
}
/**
 * Normalizes an `AddEventListener` object to something that can be passed
 * to `addEventListener` on any browser, no matter whether it supports the
 * `options` parameter.
 * @param {?} options Object to be normalized.
 * @return {?}
 */
function normalizePassiveListenerOptions(options) {
    return supportsPassiveEventListeners() ? options : !!options.capture;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/** @enum {number} */
var RtlScrollAxisType = {
    /**
       * scrollLeft is 0 when scrolled all the way left and (scrollWidth - clientWidth) when scrolled
       * all the way right.
       */
    NORMAL: 0,
    /**
       * scrollLeft is -(scrollWidth - clientWidth) when scrolled all the way left and 0 when scrolled
       * all the way right.
       */
    NEGATED: 1,
    /**
       * scrollLeft is (scrollWidth - clientWidth) when scrolled all the way left and 0 when scrolled
       * all the way right.
       */
    INVERTED: 2,
};
RtlScrollAxisType[RtlScrollAxisType.NORMAL] = 'NORMAL';
RtlScrollAxisType[RtlScrollAxisType.NEGATED] = 'NEGATED';
RtlScrollAxisType[RtlScrollAxisType.INVERTED] = 'INVERTED';
/** *
 * Cached result of the way the browser handles the horizontal scroll axis in RTL mode.
  @type {?} */
var rtlScrollAxisType;
/**
 * Check whether the browser supports scroll behaviors.
 * @return {?}
 */
function supportsScrollBehavior() {
    return !!(typeof document == 'object' && 'scrollBehavior' in /** @type {?} */ ((document.documentElement)).style);
}
/**
 * Checks the type of RTL scroll axis used by this browser. As of time of writing, Chrome is NORMAL,
 * Firefox & Safari are NEGATED, and IE & Edge are INVERTED.
 * @return {?}
 */
function getRtlScrollAxisType() {
    // We can't check unless we're on the browser. Just assume 'normal' if we're not.
    if (typeof document !== 'object' || !document) {
        return RtlScrollAxisType.NORMAL;
    }
    if (!rtlScrollAxisType) {
        /** @type {?} */
        var scrollContainer = document.createElement('div');
        /** @type {?} */
        var containerStyle = scrollContainer.style;
        scrollContainer.dir = 'rtl';
        containerStyle.height = '1px';
        containerStyle.width = '1px';
        containerStyle.overflow = 'auto';
        containerStyle.visibility = 'hidden';
        containerStyle.pointerEvents = 'none';
        containerStyle.position = 'absolute';
        /** @type {?} */
        var content = document.createElement('div');
        /** @type {?} */
        var contentStyle = content.style;
        contentStyle.width = '2px';
        contentStyle.height = '1px';
        scrollContainer.appendChild(content);
        document.body.appendChild(scrollContainer);
        rtlScrollAxisType = RtlScrollAxisType.NORMAL;
        // The viewport starts scrolled all the way to the right in RTL mode. If we are in a NORMAL
        // browser this would mean that the scrollLeft should be 1. If it's zero instead we know we're
        // dealing with one of the other two types of browsers.
        if (scrollContainer.scrollLeft === 0) {
            // In a NEGATED browser the scrollLeft is always somewhere in [-maxScrollAmount, 0]. For an
            // INVERTED browser it is always somewhere in [0, maxScrollAmount]. We can determine which by
            // setting to the scrollLeft to 1. This is past the max for a NEGATED browser, so it will
            // return 0 when we read it again.
            scrollContainer.scrollLeft = 1;
            rtlScrollAxisType =
                scrollContainer.scrollLeft === 0 ? RtlScrollAxisType.NEGATED : RtlScrollAxisType.INVERTED;
        } /** @type {?} */
        ((scrollContainer.parentNode)).removeChild(scrollContainer);
    }
    return rtlScrollAxisType;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */


//# sourceMappingURL=platform.es5.js.map


/***/ }),

/***/ "./node_modules/@angular/cdk/esm5/scrolling.es5.js":
/*!*********************************************************!*\
  !*** ./node_modules/@angular/cdk/esm5/scrolling.es5.js ***!
  \*********************************************************/
/*! exports provided: _fixedSizeVirtualScrollStrategyFactory, FixedSizeVirtualScrollStrategy, CdkFixedSizeVirtualScroll, SCROLL_DISPATCHER_PROVIDER_FACTORY, DEFAULT_SCROLL_TIME, ScrollDispatcher, SCROLL_DISPATCHER_PROVIDER, CdkScrollable, ScrollingModule, ScrollDispatchModule, VIEWPORT_RULER_PROVIDER_FACTORY, DEFAULT_RESIZE_TIME, ViewportRuler, VIEWPORT_RULER_PROVIDER, CdkVirtualForOf, VIRTUAL_SCROLL_STRATEGY, CdkVirtualScrollViewport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_fixedSizeVirtualScrollStrategyFactory", function() { return _fixedSizeVirtualScrollStrategyFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FixedSizeVirtualScrollStrategy", function() { return FixedSizeVirtualScrollStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkFixedSizeVirtualScroll", function() { return CdkFixedSizeVirtualScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLL_DISPATCHER_PROVIDER_FACTORY", function() { return SCROLL_DISPATCHER_PROVIDER_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SCROLL_TIME", function() { return DEFAULT_SCROLL_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollDispatcher", function() { return ScrollDispatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLL_DISPATCHER_PROVIDER", function() { return SCROLL_DISPATCHER_PROVIDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkScrollable", function() { return CdkScrollable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollingModule", function() { return ScrollingModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollDispatchModule", function() { return ScrollDispatchModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEWPORT_RULER_PROVIDER_FACTORY", function() { return VIEWPORT_RULER_PROVIDER_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RESIZE_TIME", function() { return DEFAULT_RESIZE_TIME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewportRuler", function() { return ViewportRuler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEWPORT_RULER_PROVIDER", function() { return VIEWPORT_RULER_PROVIDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkVirtualForOf", function() { return CdkVirtualForOf; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIRTUAL_SCROLL_STRATEGY", function() { return VIRTUAL_SCROLL_STRATEGY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CdkVirtualScrollViewport", function() { return CdkVirtualScrollViewport; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */









/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * The injection token used to specify the virtual scrolling strategy.
  @type {?} */
var VIRTUAL_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('VIRTUAL_SCROLL_STRATEGY');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Virtual scrolling strategy for lists with items of known fixed size.
 */
var  /**
 * Virtual scrolling strategy for lists with items of known fixed size.
 */
FixedSizeVirtualScrollStrategy = /** @class */ (function () {
    /**
     * @param itemSize The size of the items in the virtually scrolling list.
     * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
     * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
     */
    function FixedSizeVirtualScrollStrategy(itemSize, minBufferPx, maxBufferPx) {
        this._scrolledIndexChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * \@docs-private Implemented as part of VirtualScrollStrategy.
         */
        this.scrolledIndexChange = this._scrolledIndexChange.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])());
        /**
         * The attached viewport.
         */
        this._viewport = null;
        this._itemSize = itemSize;
        this._minBufferPx = minBufferPx;
        this._maxBufferPx = maxBufferPx;
    }
    /**
     * Attaches this scroll strategy to a viewport.
     * @param viewport The viewport to attach this strategy to.
     */
    /**
     * Attaches this scroll strategy to a viewport.
     * @param {?} viewport The viewport to attach this strategy to.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype.attach = /**
     * Attaches this scroll strategy to a viewport.
     * @param {?} viewport The viewport to attach this strategy to.
     * @return {?}
     */
    function (viewport) {
        this._viewport = viewport;
        this._updateTotalContentSize();
        this._updateRenderedRange();
    };
    /** Detaches this scroll strategy from the currently attached viewport. */
    /**
     * Detaches this scroll strategy from the currently attached viewport.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype.detach = /**
     * Detaches this scroll strategy from the currently attached viewport.
     * @return {?}
     */
    function () {
        this._scrolledIndexChange.complete();
        this._viewport = null;
    };
    /**
     * Update the item size and buffer size.
     * @param itemSize The size of the items in the virtually scrolling list.
     * @param minBufferPx The minimum amount of buffer (in pixels) before needing to render more
     * @param maxBufferPx The amount of buffer (in pixels) to render when rendering more.
     */
    /**
     * Update the item size and buffer size.
     * @param {?} itemSize The size of the items in the virtually scrolling list.
     * @param {?} minBufferPx The minimum amount of buffer (in pixels) before needing to render more
     * @param {?} maxBufferPx The amount of buffer (in pixels) to render when rendering more.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype.updateItemAndBufferSize = /**
     * Update the item size and buffer size.
     * @param {?} itemSize The size of the items in the virtually scrolling list.
     * @param {?} minBufferPx The minimum amount of buffer (in pixels) before needing to render more
     * @param {?} maxBufferPx The amount of buffer (in pixels) to render when rendering more.
     * @return {?}
     */
    function (itemSize, minBufferPx, maxBufferPx) {
        if (maxBufferPx < minBufferPx) {
            throw Error('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
        }
        this._itemSize = itemSize;
        this._minBufferPx = minBufferPx;
        this._maxBufferPx = maxBufferPx;
        this._updateTotalContentSize();
        this._updateRenderedRange();
    };
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    /**
     * \@docs-private Implemented as part of VirtualScrollStrategy.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype.onContentScrolled = /**
     * \@docs-private Implemented as part of VirtualScrollStrategy.
     * @return {?}
     */
    function () {
        this._updateRenderedRange();
    };
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    /**
     * \@docs-private Implemented as part of VirtualScrollStrategy.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype.onDataLengthChanged = /**
     * \@docs-private Implemented as part of VirtualScrollStrategy.
     * @return {?}
     */
    function () {
        this._updateTotalContentSize();
        this._updateRenderedRange();
    };
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    /**
     * \@docs-private Implemented as part of VirtualScrollStrategy.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype.onContentRendered = /**
     * \@docs-private Implemented as part of VirtualScrollStrategy.
     * @return {?}
     */
    function () {
        /* no-op */ 
    };
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    /**
     * \@docs-private Implemented as part of VirtualScrollStrategy.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype.onRenderedOffsetChanged = /**
     * \@docs-private Implemented as part of VirtualScrollStrategy.
     * @return {?}
     */
    function () {
        /* no-op */ 
    };
    /**
     * Scroll to the offset for the given index.
     * @param index The index of the element to scroll to.
     * @param behavior The ScrollBehavior to use when scrolling.
     */
    /**
     * Scroll to the offset for the given index.
     * @param {?} index The index of the element to scroll to.
     * @param {?} behavior The ScrollBehavior to use when scrolling.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype.scrollToIndex = /**
     * Scroll to the offset for the given index.
     * @param {?} index The index of the element to scroll to.
     * @param {?} behavior The ScrollBehavior to use when scrolling.
     * @return {?}
     */
    function (index, behavior) {
        if (this._viewport) {
            this._viewport.scrollToOffset(index * this._itemSize, behavior);
        }
    };
    /**
     * Update the viewport's total content size.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype._updateTotalContentSize = /**
     * Update the viewport's total content size.
     * @return {?}
     */
    function () {
        if (!this._viewport) {
            return;
        }
        this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
    };
    /**
     * Update the viewport's rendered range.
     * @return {?}
     */
    FixedSizeVirtualScrollStrategy.prototype._updateRenderedRange = /**
     * Update the viewport's rendered range.
     * @return {?}
     */
    function () {
        if (!this._viewport) {
            return;
        }
        /** @type {?} */
        var scrollOffset = this._viewport.measureScrollOffset();
        /** @type {?} */
        var firstVisibleIndex = scrollOffset / this._itemSize;
        /** @type {?} */
        var renderedRange = this._viewport.getRenderedRange();
        /** @type {?} */
        var newRange = { start: renderedRange.start, end: renderedRange.end };
        /** @type {?} */
        var viewportSize = this._viewport.getViewportSize();
        /** @type {?} */
        var dataLength = this._viewport.getDataLength();
        /** @type {?} */
        var startBuffer = scrollOffset - newRange.start * this._itemSize;
        if (startBuffer < this._minBufferPx && newRange.start != 0) {
            /** @type {?} */
            var expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
            newRange.start = Math.max(0, newRange.start - expandStart);
            newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
        }
        else {
            /** @type {?} */
            var endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
            if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
                /** @type {?} */
                var expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
                if (expandEnd > 0) {
                    newRange.end = Math.min(dataLength, newRange.end + expandEnd);
                    newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
                }
            }
        }
        this._viewport.setRenderedRange(newRange);
        this._viewport.setRenderedContentOffset(this._itemSize * newRange.start);
        this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
    };
    return FixedSizeVirtualScrollStrategy;
}());
/**
 * Provider factory for `FixedSizeVirtualScrollStrategy` that simply extracts the already created
 * `FixedSizeVirtualScrollStrategy` from the given directive.
 * @param {?} fixedSizeDir The instance of `CdkFixedSizeVirtualScroll` to extract the
 *     `FixedSizeVirtualScrollStrategy` from.
 * @return {?}
 */
function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir) {
    return fixedSizeDir._scrollStrategy;
}
/**
 * A virtual scroll strategy that supports fixed-size items.
 */
var CdkFixedSizeVirtualScroll = /** @class */ (function () {
    function CdkFixedSizeVirtualScroll() {
        this._itemSize = 20;
        this._minBufferPx = 100;
        this._maxBufferPx = 200;
        /**
         * The scroll strategy used by this directive.
         */
        this._scrollStrategy = new FixedSizeVirtualScrollStrategy(this.itemSize, this.minBufferPx, this.maxBufferPx);
    }
    Object.defineProperty(CdkFixedSizeVirtualScroll.prototype, "itemSize", {
        /** The size of the items in the list (in pixels). */
        get: /**
         * The size of the items in the list (in pixels).
         * @return {?}
         */
        function () { return this._itemSize; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._itemSize = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkFixedSizeVirtualScroll.prototype, "minBufferPx", {
        /**
         * The minimum amount of buffer rendered beyond the viewport (in pixels).
         * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
         */
        get: /**
         * The minimum amount of buffer rendered beyond the viewport (in pixels).
         * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
         * @return {?}
         */
        function () { return this._minBufferPx; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._minBufferPx = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkFixedSizeVirtualScroll.prototype, "maxBufferPx", {
        /**
         * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
         */
        get: /**
         * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
         * @return {?}
         */
        function () { return this._maxBufferPx; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._maxBufferPx = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceNumberProperty"])(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CdkFixedSizeVirtualScroll.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx);
    };
    CdkFixedSizeVirtualScroll.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: 'cdk-virtual-scroll-viewport[itemSize]',
                    providers: [{
                            provide: VIRTUAL_SCROLL_STRATEGY,
                            useFactory: _fixedSizeVirtualScrollStrategyFactory,
                            deps: [Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return CdkFixedSizeVirtualScroll; })],
                        }],
                },] },
    ];
    CdkFixedSizeVirtualScroll.propDecorators = {
        itemSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        minBufferPx: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        maxBufferPx: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
    };
    return CdkFixedSizeVirtualScroll;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Time in ms to throttle the scrolling events by default.
  @type {?} */
var DEFAULT_SCROLL_TIME = 20;
/**
 * Service contained all registered Scrollable references and emits an event when any one of the
 * Scrollable references emit a scrolled event.
 */
var ScrollDispatcher = /** @class */ (function () {
    function ScrollDispatcher(_ngZone, _platform) {
        this._ngZone = _ngZone;
        this._platform = _platform;
        /**
         * Subject for notifying that a registered scrollable reference element has been scrolled.
         */
        this._scrolled = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Keeps track of the global `scroll` and `resize` subscriptions.
         */
        this._globalSubscription = null;
        /**
         * Keeps track of the amount of subscriptions to `scrolled`. Used for cleaning up afterwards.
         */
        this._scrolledCount = 0;
        /**
         * Map of all the scrollable references that are registered with the service and their
         * scroll event subscriptions.
         */
        this.scrollContainers = new Map();
    }
    /**
     * Registers a scrollable instance with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event to its scrolled observable.
     * @param scrollable Scrollable instance to be registered.
     */
    /**
     * Registers a scrollable instance with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event to its scrolled observable.
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    ScrollDispatcher.prototype.register = /**
     * Registers a scrollable instance with the service and listens for its scrolled events. When the
     * scrollable is scrolled, the service emits the event to its scrolled observable.
     * @param {?} scrollable Scrollable instance to be registered.
     * @return {?}
     */
    function (scrollable) {
        var _this = this;
        /** @type {?} */
        var scrollSubscription = scrollable.elementScrolled()
            .subscribe(function () { return _this._scrolled.next(scrollable); });
        this.scrollContainers.set(scrollable, scrollSubscription);
    };
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param scrollable Scrollable instance to be deregistered.
     */
    /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    ScrollDispatcher.prototype.deregister = /**
     * Deregisters a Scrollable reference and unsubscribes from its scroll event observable.
     * @param {?} scrollable Scrollable instance to be deregistered.
     * @return {?}
     */
    function (scrollable) {
        /** @type {?} */
        var scrollableReference = this.scrollContainers.get(scrollable);
        if (scrollableReference) {
            scrollableReference.unsubscribe();
            this.scrollContainers.delete(scrollable);
        }
    };
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     *
     * **Note:** in order to avoid hitting change detection for every scroll event,
     * all of the events emitted from this stream will be run outside the Angular zone.
     * If you need to update any data bindings as a result of a scroll event, you have
     * to run the callback using `NgZone.run`.
     */
    /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     *
     * **Note:** in order to avoid hitting change detection for every scroll event,
     * all of the events emitted from this stream will be run outside the Angular zone.
     * If you need to update any data bindings as a result of a scroll event, you have
     * to run the callback using `NgZone.run`.
     * @param {?=} auditTimeInMs
     * @return {?}
     */
    ScrollDispatcher.prototype.scrolled = /**
     * Returns an observable that emits an event whenever any of the registered Scrollable
     * references (or window, document, or body) fire a scrolled event. Can provide a time in ms
     * to override the default "throttle" time.
     *
     * **Note:** in order to avoid hitting change detection for every scroll event,
     * all of the events emitted from this stream will be run outside the Angular zone.
     * If you need to update any data bindings as a result of a scroll event, you have
     * to run the callback using `NgZone.run`.
     * @param {?=} auditTimeInMs
     * @return {?}
     */
    function (auditTimeInMs) {
        var _this = this;
        if (auditTimeInMs === void 0) { auditTimeInMs = DEFAULT_SCROLL_TIME; }
        if (!this._platform.isBrowser) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])();
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            if (!_this._globalSubscription) {
                _this._addGlobalListener();
            }
            /** @type {?} */
            var subscription = auditTimeInMs > 0 ?
                _this._scrolled.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["auditTime"])(auditTimeInMs)).subscribe(observer) :
                _this._scrolled.subscribe(observer);
            _this._scrolledCount++;
            return function () {
                subscription.unsubscribe();
                _this._scrolledCount--;
                if (!_this._scrolledCount) {
                    _this._removeGlobalListener();
                }
            };
        });
    };
    /**
     * @return {?}
     */
    ScrollDispatcher.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._removeGlobalListener();
        this.scrollContainers.forEach(function (_, container) { return _this.deregister(container); });
        this._scrolled.complete();
    };
    /**
     * Returns an observable that emits whenever any of the
     * scrollable ancestors of an element are scrolled.
     * @param elementRef Element whose ancestors to listen for.
     * @param auditTimeInMs Time to throttle the scroll events.
     */
    /**
     * Returns an observable that emits whenever any of the
     * scrollable ancestors of an element are scrolled.
     * @param {?} elementRef Element whose ancestors to listen for.
     * @param {?=} auditTimeInMs Time to throttle the scroll events.
     * @return {?}
     */
    ScrollDispatcher.prototype.ancestorScrolled = /**
     * Returns an observable that emits whenever any of the
     * scrollable ancestors of an element are scrolled.
     * @param {?} elementRef Element whose ancestors to listen for.
     * @param {?=} auditTimeInMs Time to throttle the scroll events.
     * @return {?}
     */
    function (elementRef, auditTimeInMs) {
        /** @type {?} */
        var ancestors = this.getAncestorScrollContainers(elementRef);
        return this.scrolled(auditTimeInMs).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(function (target) {
            return !target || ancestors.indexOf(target) > -1;
        }));
    };
    /** Returns all registered Scrollables that contain the provided element. */
    /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype.getAncestorScrollContainers = /**
     * Returns all registered Scrollables that contain the provided element.
     * @param {?} elementRef
     * @return {?}
     */
    function (elementRef) {
        var _this = this;
        /** @type {?} */
        var scrollingContainers = [];
        this.scrollContainers.forEach(function (_subscription, scrollable) {
            if (_this._scrollableContainsElement(scrollable, elementRef)) {
                scrollingContainers.push(scrollable);
            }
        });
        return scrollingContainers;
    };
    /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    ScrollDispatcher.prototype._scrollableContainsElement = /**
     * Returns true if the element is contained within the provided Scrollable.
     * @param {?} scrollable
     * @param {?} elementRef
     * @return {?}
     */
    function (scrollable, elementRef) {
        /** @type {?} */
        var element = elementRef.nativeElement;
        /** @type {?} */
        var scrollableElement = scrollable.getElementRef().nativeElement;
        // Traverse through the element parents until we reach null, checking if any of the elements
        // are the scrollable's element.
        do {
            if (element == scrollableElement) {
                return true;
            }
        } while (element = /** @type {?} */ ((element)).parentElement);
        return false;
    };
    /**
     * Sets up the global scroll listeners.
     * @return {?}
     */
    ScrollDispatcher.prototype._addGlobalListener = /**
     * Sets up the global scroll listeners.
     * @return {?}
     */
    function () {
        var _this = this;
        this._globalSubscription = this._ngZone.runOutsideAngular(function () {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window.document, 'scroll').subscribe(function () { return _this._scrolled.next(); });
        });
    };
    /**
     * Cleans up the global scroll listener.
     * @return {?}
     */
    ScrollDispatcher.prototype._removeGlobalListener = /**
     * Cleans up the global scroll listener.
     * @return {?}
     */
    function () {
        if (this._globalSubscription) {
            this._globalSubscription.unsubscribe();
            this._globalSubscription = null;
        }
    };
    ScrollDispatcher.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    ScrollDispatcher.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"] }
    ]; };
    /** @nocollapse */ ScrollDispatcher.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function ScrollDispatcher_Factory() { return new ScrollDispatcher(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"])); }, token: ScrollDispatcher, providedIn: "root" });
    return ScrollDispatcher;
}());
/**
 * \@docs-private \@deprecated \@breaking-change 8.0.0
 * @param {?} parentDispatcher
 * @param {?} ngZone
 * @param {?} platform
 * @return {?}
 */
function SCROLL_DISPATCHER_PROVIDER_FACTORY(parentDispatcher, ngZone, platform) {
    return parentDispatcher || new ScrollDispatcher(ngZone, platform);
}
/** *
 * \@docs-private \@deprecated \@breaking-change 8.0.0
  @type {?} */
var SCROLL_DISPATCHER_PROVIDER = {
    // If there is already a ScrollDispatcher available, use that. Otherwise, provide a new one.
    provide: ScrollDispatcher,
    deps: [[new _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"](), new _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"](), ScrollDispatcher], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]],
    useFactory: SCROLL_DISPATCHER_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Sends an event when the directive's element is scrolled. Registers itself with the
 * ScrollDispatcher service to include itself as part of its collection of scrolling events that it
 * can be listened to through the service.
 */
var CdkScrollable = /** @class */ (function () {
    function CdkScrollable(elementRef, scrollDispatcher, ngZone, dir) {
        var _this = this;
        this.elementRef = elementRef;
        this.scrollDispatcher = scrollDispatcher;
        this.ngZone = ngZone;
        this.dir = dir;
        this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this._elementScrolled = rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            return _this.ngZone.runOutsideAngular(function () {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(_this.elementRef.nativeElement, 'scroll').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(_this._destroyed))
                    .subscribe(observer);
            });
        });
    }
    /**
     * @return {?}
     */
    CdkScrollable.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.scrollDispatcher.register(this);
    };
    /**
     * @return {?}
     */
    CdkScrollable.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.scrollDispatcher.deregister(this);
        this._destroyed.next();
        this._destroyed.complete();
    };
    /** Returns observable that emits when a scroll event is fired on the host element. */
    /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    CdkScrollable.prototype.elementScrolled = /**
     * Returns observable that emits when a scroll event is fired on the host element.
     * @return {?}
     */
    function () {
        return this._elementScrolled;
    };
    /** Gets the ElementRef for the viewport. */
    /**
     * Gets the ElementRef for the viewport.
     * @return {?}
     */
    CdkScrollable.prototype.getElementRef = /**
     * Gets the ElementRef for the viewport.
     * @return {?}
     */
    function () {
        return this.elementRef;
    };
    /**
     * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
     * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
     * left and right always refer to the left and right side of the scrolling container irrespective
     * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
     * in an RTL context.
     * @param options specified the offsets to scroll to.
     */
    /**
     * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
     * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
     * left and right always refer to the left and right side of the scrolling container irrespective
     * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
     * in an RTL context.
     * @param {?} options specified the offsets to scroll to.
     * @return {?}
     */
    CdkScrollable.prototype.scrollTo = /**
     * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
     * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
     * left and right always refer to the left and right side of the scrolling container irrespective
     * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
     * in an RTL context.
     * @param {?} options specified the offsets to scroll to.
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var el = this.elementRef.nativeElement;
        /** @type {?} */
        var isRtl = this.dir && this.dir.value == 'rtl';
        // Rewrite start & end offsets as right or left offsets.
        options.left = options.left == null ? (isRtl ? options.end : options.start) : options.left;
        options.right = options.right == null ? (isRtl ? options.start : options.end) : options.right;
        // Rewrite the bottom offset as a top offset.
        if (options.bottom != null) {
            options.top = el.scrollHeight - el.clientHeight - options.bottom;
        }
        // Rewrite the right offset as a left offset.
        if (isRtl && Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() != _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].NORMAL) {
            if (options.left != null) {
                options.right = el.scrollWidth - el.clientWidth - options.left;
            }
            if (Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() == _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].INVERTED) {
                options.left = options.right;
            }
            else if (Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() == _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].NEGATED) {
                options.left = options.right ? -options.right : options.right;
            }
        }
        else {
            if (options.right != null) {
                options.left = el.scrollWidth - el.clientWidth - options.right;
            }
        }
        this._applyScrollToOptions(options);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    CdkScrollable.prototype._applyScrollToOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        /** @type {?} */
        var el = this.elementRef.nativeElement;
        if (Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["supportsScrollBehavior"])()) {
            el.scrollTo(options);
        }
        else {
            if (options.top != null) {
                el.scrollTop = options.top;
            }
            if (options.left != null) {
                el.scrollLeft = options.left;
            }
        }
    };
    /**
     * Measures the scroll offset relative to the specified edge of the viewport. This method can be
     * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
     * about what scrollLeft means in RTL. The values returned by this method are normalized such that
     * left and right always refer to the left and right side of the scrolling container irrespective
     * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
     * in an RTL context.
     * @param from The edge to measure from.
     */
    /**
     * Measures the scroll offset relative to the specified edge of the viewport. This method can be
     * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
     * about what scrollLeft means in RTL. The values returned by this method are normalized such that
     * left and right always refer to the left and right side of the scrolling container irrespective
     * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
     * in an RTL context.
     * @param {?} from The edge to measure from.
     * @return {?}
     */
    CdkScrollable.prototype.measureScrollOffset = /**
     * Measures the scroll offset relative to the specified edge of the viewport. This method can be
     * used instead of directly checking scrollLeft or scrollTop, since browsers are not consistent
     * about what scrollLeft means in RTL. The values returned by this method are normalized such that
     * left and right always refer to the left and right side of the scrolling container irrespective
     * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
     * in an RTL context.
     * @param {?} from The edge to measure from.
     * @return {?}
     */
    function (from) {
        /** @type {?} */
        var LEFT = 'left';
        /** @type {?} */
        var RIGHT = 'right';
        /** @type {?} */
        var el = this.elementRef.nativeElement;
        if (from == 'top') {
            return el.scrollTop;
        }
        if (from == 'bottom') {
            return el.scrollHeight - el.clientHeight - el.scrollTop;
        }
        /** @type {?} */
        var isRtl = this.dir && this.dir.value == 'rtl';
        if (from == 'start') {
            from = isRtl ? RIGHT : LEFT;
        }
        else if (from == 'end') {
            from = isRtl ? LEFT : RIGHT;
        }
        if (isRtl && Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() == _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].INVERTED) {
            // For INVERTED, scrollLeft is (scrollWidth - clientWidth) when scrolled all the way left and
            // 0 when scrolled all the way right.
            if (from == LEFT) {
                return el.scrollWidth - el.clientWidth - el.scrollLeft;
            }
            else {
                return el.scrollLeft;
            }
        }
        else if (isRtl && Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["getRtlScrollAxisType"])() == _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["RtlScrollAxisType"].NEGATED) {
            // For NEGATED, scrollLeft is -(scrollWidth - clientWidth) when scrolled all the way left and
            // 0 when scrolled all the way right.
            if (from == LEFT) {
                return el.scrollLeft + el.scrollWidth - el.clientWidth;
            }
            else {
                return -el.scrollLeft;
            }
        }
        else {
            // For NORMAL, as well as non-RTL contexts, scrollLeft is 0 when scrolled all the way left and
            // (scrollWidth - clientWidth) when scrolled all the way right.
            if (from == LEFT) {
                return el.scrollLeft;
            }
            else {
                return el.scrollWidth - el.clientWidth - el.scrollLeft;
            }
        }
    };
    CdkScrollable.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[cdk-scrollable], [cdkScrollable]'
                },] },
    ];
    /** @nocollapse */
    CdkScrollable.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: ScrollDispatcher },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["Directionality"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }] }
    ]; };
    return CdkScrollable;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Checks if the given ranges are equal.
 * @param {?} r1
 * @param {?} r2
 * @return {?}
 */
function rangesEqual(r1, r2) {
    return r1.start == r2.start && r1.end == r2.end;
}
/**
 * A viewport that virtualizes it's scrolling with the help of `CdkVirtualForOf`.
 */
var CdkVirtualScrollViewport = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_6__["__extends"])(CdkVirtualScrollViewport, _super);
    function CdkVirtualScrollViewport(elementRef, _changeDetectorRef, ngZone, _scrollStrategy, dir, scrollDispatcher) {
        var _this = _super.call(this, elementRef, scrollDispatcher, ngZone, dir) || this;
        _this.elementRef = elementRef;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._scrollStrategy = _scrollStrategy;
        /**
         * Emits when the viewport is detached from a CdkVirtualForOf.
         */
        _this._detachedSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Emits when the rendered range changes.
         */
        _this._renderedRangeSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * The direction the viewport scrolls.
         */
        _this.orientation = 'vertical';
        /**
         * Emits when the index of the first element visible in the viewport changes.
         */
        _this.scrolledIndexChange = rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"].create(function (observer) {
            return _this._scrollStrategy.scrolledIndexChange.subscribe(function (index) {
                return Promise.resolve().then(function () { return _this.ngZone.run(function () { return observer.next(index); }); });
            });
        });
        /**
         * A stream that emits whenever the rendered range changes.
         */
        _this.renderedRangeStream = _this._renderedRangeSubject.asObservable();
        /**
         * The transform used to scale the spacer to the same size as all content, including content that
         * is not currently rendered.
         */
        _this._totalContentSizeTransform = '';
        /**
         * The total size of all content (in pixels), including content that is not currently rendered.
         */
        _this._totalContentSize = 0;
        /**
         * The currently rendered range of indices.
         */
        _this._renderedRange = { start: 0, end: 0 };
        /**
         * The length of the data bound to this viewport (in number of items).
         */
        _this._dataLength = 0;
        /**
         * The size of the viewport (in pixels).
         */
        _this._viewportSize = 0;
        /**
         * The last rendered content offset that was set.
         */
        _this._renderedContentOffset = 0;
        /**
         * Whether the last rendered content offset was to the end of the content (and therefore needs to
         * be rewritten as an offset to the start of the content).
         */
        _this._renderedContentOffsetNeedsRewrite = false;
        /**
         * Whether there is a pending change detection cycle.
         */
        _this._isChangeDetectionPending = false;
        /**
         * A list of functions to run after the next change detection cycle.
         */
        _this._runAfterChangeDetection = [];
        if (!_scrollStrategy) {
            throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
        }
        return _this;
    }
    /**
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        // It's still too early to measure the viewport at this point. Deferring with a promise allows
        // the Viewport to be rendered with the correct size before we measure. We run this outside the
        // zone to avoid causing more change detection cycles. We handle the change detection loop
        // ourselves instead.
        this.ngZone.runOutsideAngular(function () { return Promise.resolve().then(function () {
            _this._measureViewportSize();
            _this._scrollStrategy.attach(_this);
            _this.elementScrolled()
                .pipe(
            // Start off with a fake scroll event so we properly detect our initial position.
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(/** @type {?} */ ((null))), 
            // Collect multiple events into one until the next animation frame. This way if
            // there are multiple scroll events in the same frame we only need to recheck
            // our layout once.
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["auditTime"])(0, rxjs__WEBPACK_IMPORTED_MODULE_2__["animationFrameScheduler"]))
                .subscribe(function () { return _this._scrollStrategy.onContentScrolled(); });
            _this._markChangeDetectionNeeded();
        }); });
    };
    /**
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.detach();
        this._scrollStrategy.detach();
        // Complete all subjects
        this._renderedRangeSubject.complete();
        this._detachedSubject.complete();
        _super.prototype.ngOnDestroy.call(this);
    };
    /** Attaches a `CdkVirtualForOf` to this viewport. */
    /**
     * Attaches a `CdkVirtualForOf` to this viewport.
     * @param {?} forOf
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.attach = /**
     * Attaches a `CdkVirtualForOf` to this viewport.
     * @param {?} forOf
     * @return {?}
     */
    function (forOf) {
        var _this = this;
        if (this._forOf) {
            throw Error('CdkVirtualScrollViewport is already attached.');
        }
        // Subscribe to the data stream of the CdkVirtualForOf to keep track of when the data length
        // changes. Run outside the zone to avoid triggering change detection, since we're managing the
        // change detection loop ourselves.
        this.ngZone.runOutsideAngular(function () {
            _this._forOf = forOf;
            _this._forOf.dataStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(_this._detachedSubject)).subscribe(function (data) {
                /** @type {?} */
                var newLength = data.length;
                if (newLength !== _this._dataLength) {
                    _this._dataLength = newLength;
                    _this._scrollStrategy.onDataLengthChanged();
                }
                _this._doChangeDetection();
            });
        });
    };
    /** Detaches the current `CdkVirtualForOf`. */
    /**
     * Detaches the current `CdkVirtualForOf`.
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.detach = /**
     * Detaches the current `CdkVirtualForOf`.
     * @return {?}
     */
    function () {
        this._forOf = null;
        this._detachedSubject.next();
    };
    /** Gets the length of the data bound to this viewport (in number of items). */
    /**
     * Gets the length of the data bound to this viewport (in number of items).
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.getDataLength = /**
     * Gets the length of the data bound to this viewport (in number of items).
     * @return {?}
     */
    function () {
        return this._dataLength;
    };
    /** Gets the size of the viewport (in pixels). */
    /**
     * Gets the size of the viewport (in pixels).
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.getViewportSize = /**
     * Gets the size of the viewport (in pixels).
     * @return {?}
     */
    function () {
        return this._viewportSize;
    };
    // TODO(mmalerba): This is technically out of sync with what's really rendered until a render
    // cycle happens. I'm being careful to only call it after the render cycle is complete and before
    // setting it to something else, but its error prone and should probably be split into
    // `pendingRange` and `renderedRange`, the latter reflecting whats actually in the DOM.
    /** Get the current rendered range of items. */
    /**
     * Get the current rendered range of items.
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.getRenderedRange = /**
     * Get the current rendered range of items.
     * @return {?}
     */
    function () {
        return this._renderedRange;
    };
    /**
     * Sets the total size of all content (in pixels), including content that is not currently
     * rendered.
     */
    /**
     * Sets the total size of all content (in pixels), including content that is not currently
     * rendered.
     * @param {?} size
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.setTotalContentSize = /**
     * Sets the total size of all content (in pixels), including content that is not currently
     * rendered.
     * @param {?} size
     * @return {?}
     */
    function (size) {
        if (this._totalContentSize !== size) {
            this._totalContentSize = size;
            /** @type {?} */
            var axis = this.orientation == 'horizontal' ? 'X' : 'Y';
            this._totalContentSizeTransform = "scale" + axis + "(" + this._totalContentSize + ")";
            this._markChangeDetectionNeeded();
        }
    };
    /** Sets the currently rendered range of indices. */
    /**
     * Sets the currently rendered range of indices.
     * @param {?} range
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.setRenderedRange = /**
     * Sets the currently rendered range of indices.
     * @param {?} range
     * @return {?}
     */
    function (range) {
        var _this = this;
        if (!rangesEqual(this._renderedRange, range)) {
            this._renderedRangeSubject.next(this._renderedRange = range);
            this._markChangeDetectionNeeded(function () { return _this._scrollStrategy.onContentRendered(); });
        }
    };
    /**
     * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
     */
    /**
     * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.getOffsetToRenderedContentStart = /**
     * Gets the offset from the start of the viewport to the start of the rendered data (in pixels).
     * @return {?}
     */
    function () {
        return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
    };
    /**
     * Sets the offset from the start of the viewport to either the start or end of the rendered data
     * (in pixels).
     */
    /**
     * Sets the offset from the start of the viewport to either the start or end of the rendered data
     * (in pixels).
     * @param {?} offset
     * @param {?=} to
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.setRenderedContentOffset = /**
     * Sets the offset from the start of the viewport to either the start or end of the rendered data
     * (in pixels).
     * @param {?} offset
     * @param {?=} to
     * @return {?}
     */
    function (offset, to) {
        var _this = this;
        if (to === void 0) { to = 'to-start'; }
        /** @type {?} */
        var isRtl = this.dir && this.dir.value == 'rtl';
        /** @type {?} */
        var isHorizontal = this.orientation == 'horizontal';
        /** @type {?} */
        var axis = isHorizontal ? 'X' : 'Y';
        /** @type {?} */
        var axisDirection = isHorizontal && isRtl ? -1 : 1;
        /** @type {?} */
        var transform = "translate" + axis + "(" + Number(axisDirection * offset) + "px)";
        this._renderedContentOffset = offset;
        if (to === 'to-end') {
            transform += " translate" + axis + "(-100%)";
            // The viewport should rewrite this as a `to-start` offset on the next render cycle. Otherwise
            // elements will appear to expand in the wrong direction (e.g. `mat-expansion-panel` would
            // expand upward).
            this._renderedContentOffsetNeedsRewrite = true;
        }
        if (this._renderedContentTransform != transform) {
            // We know this value is safe because we parse `offset` with `Number()` before passing it
            // into the string.
            this._renderedContentTransform = transform;
            this._markChangeDetectionNeeded(function () {
                if (_this._renderedContentOffsetNeedsRewrite) {
                    _this._renderedContentOffset -= _this.measureRenderedContentSize();
                    _this._renderedContentOffsetNeedsRewrite = false;
                    _this.setRenderedContentOffset(_this._renderedContentOffset);
                }
                else {
                    _this._scrollStrategy.onRenderedOffsetChanged();
                }
            });
        }
    };
    /**
     * Scrolls to the given offset from the start of the viewport. Please note that this is not always
     * the same as setting `scrollTop` or `scrollLeft`. In a horizontal viewport with right-to-left
     * direction, this would be the equivalent of setting a fictional `scrollRight` property.
     * @param offset The offset to scroll to.
     * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     */
    /**
     * Scrolls to the given offset from the start of the viewport. Please note that this is not always
     * the same as setting `scrollTop` or `scrollLeft`. In a horizontal viewport with right-to-left
     * direction, this would be the equivalent of setting a fictional `scrollRight` property.
     * @param {?} offset The offset to scroll to.
     * @param {?=} behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.scrollToOffset = /**
     * Scrolls to the given offset from the start of the viewport. Please note that this is not always
     * the same as setting `scrollTop` or `scrollLeft`. In a horizontal viewport with right-to-left
     * direction, this would be the equivalent of setting a fictional `scrollRight` property.
     * @param {?} offset The offset to scroll to.
     * @param {?=} behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     * @return {?}
     */
    function (offset, behavior) {
        if (behavior === void 0) { behavior = 'auto'; }
        /** @type {?} */
        var options = { behavior: behavior };
        if (this.orientation === 'horizontal') {
            options.start = offset;
        }
        else {
            options.top = offset;
        }
        this.scrollTo(options);
    };
    /**
     * Scrolls to the offset for the given index.
     * @param index The index of the element to scroll to.
     * @param behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     */
    /**
     * Scrolls to the offset for the given index.
     * @param {?} index The index of the element to scroll to.
     * @param {?=} behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.scrollToIndex = /**
     * Scrolls to the offset for the given index.
     * @param {?} index The index of the element to scroll to.
     * @param {?=} behavior The ScrollBehavior to use when scrolling. Default is behavior is `auto`.
     * @return {?}
     */
    function (index, behavior) {
        if (behavior === void 0) { behavior = 'auto'; }
        this._scrollStrategy.scrollToIndex(index, behavior);
    };
    /**
     * Gets the current scroll offset from the start of the viewport (in pixels).
     * @param from The edge to measure the offset from. Defaults to 'top' in vertical mode and 'start'
     *     in horizontal mode.
     */
    /**
     * Gets the current scroll offset from the start of the viewport (in pixels).
     * @param {?=} from The edge to measure the offset from. Defaults to 'top' in vertical mode and 'start'
     *     in horizontal mode.
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.measureScrollOffset = /**
     * Gets the current scroll offset from the start of the viewport (in pixels).
     * @param {?=} from The edge to measure the offset from. Defaults to 'top' in vertical mode and 'start'
     *     in horizontal mode.
     * @return {?}
     */
    function (from) {
        return _super.prototype.measureScrollOffset.call(this, from ? from : this.orientation === 'horizontal' ? 'start' : 'top');
    };
    /** Measure the combined size of all of the rendered items. */
    /**
     * Measure the combined size of all of the rendered items.
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.measureRenderedContentSize = /**
     * Measure the combined size of all of the rendered items.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var contentEl = this._contentWrapper.nativeElement;
        return this.orientation === 'horizontal' ? contentEl.offsetWidth : contentEl.offsetHeight;
    };
    /**
     * Measure the total combined size of the given range. Throws if the range includes items that are
     * not rendered.
     */
    /**
     * Measure the total combined size of the given range. Throws if the range includes items that are
     * not rendered.
     * @param {?} range
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.measureRangeSize = /**
     * Measure the total combined size of the given range. Throws if the range includes items that are
     * not rendered.
     * @param {?} range
     * @return {?}
     */
    function (range) {
        if (!this._forOf) {
            return 0;
        }
        return this._forOf.measureRangeSize(range, this.orientation);
    };
    /** Update the viewport dimensions and re-render. */
    /**
     * Update the viewport dimensions and re-render.
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype.checkViewportSize = /**
     * Update the viewport dimensions and re-render.
     * @return {?}
     */
    function () {
        // TODO: Cleanup later when add logic for handling content resize
        this._measureViewportSize();
        this._scrollStrategy.onDataLengthChanged();
    };
    /**
     * Measure the viewport size.
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype._measureViewportSize = /**
     * Measure the viewport size.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var viewportEl = this.elementRef.nativeElement;
        this._viewportSize = this.orientation === 'horizontal' ?
            viewportEl.clientWidth : viewportEl.clientHeight;
    };
    /**
     * Queue up change detection to run.
     * @param {?=} runAfter
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype._markChangeDetectionNeeded = /**
     * Queue up change detection to run.
     * @param {?=} runAfter
     * @return {?}
     */
    function (runAfter) {
        var _this = this;
        if (runAfter) {
            this._runAfterChangeDetection.push(runAfter);
        }
        // Use a Promise to batch together calls to `_doChangeDetection`. This way if we set a bunch of
        // properties sequentially we only have to run `_doChangeDetection` once at the end.
        if (!this._isChangeDetectionPending) {
            this._isChangeDetectionPending = true;
            this.ngZone.runOutsideAngular(function () { return Promise.resolve().then(function () {
                _this._doChangeDetection();
            }); });
        }
    };
    /**
     * Run change detection.
     * @return {?}
     */
    CdkVirtualScrollViewport.prototype._doChangeDetection = /**
     * Run change detection.
     * @return {?}
     */
    function () {
        var _this = this;
        this._isChangeDetectionPending = false;
        // Apply changes to Angular bindings. Note: We must call `markForCheck` to run change detection
        // from the root, since the repeated items are content projected in. Calling `detectChanges`
        // instead does not properly check the projected content.
        this.ngZone.run(function () { return _this._changeDetectorRef.markForCheck(); });
        // Apply the content transform. The transform can't be set via an Angular binding because
        // bypassSecurityTrustStyle is banned in Google. However the value is safe, it's composed of
        // string literals, a variable that can only be 'X' or 'Y', and user input that is run through
        // the `Number` function first to coerce it to a numeric value.
        this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform;
        /** @type {?} */
        var runAfterChangeDetection = this._runAfterChangeDetection;
        this._runAfterChangeDetection = [];
        for (var _i = 0, runAfterChangeDetection_1 = runAfterChangeDetection; _i < runAfterChangeDetection_1.length; _i++) {
            var fn = runAfterChangeDetection_1[_i];
            fn();
        }
    };
    CdkVirtualScrollViewport.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{selector: 'cdk-virtual-scroll-viewport',
                    template: "<div #contentWrapper class=\"cdk-virtual-scroll-content-wrapper\"><ng-content></ng-content></div><div class=\"cdk-virtual-scroll-spacer\" [style.transform]=\"_totalContentSizeTransform\"></div>",
                    styles: ["cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}.cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:0}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:0}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;transform-origin:100% 0}"],
                    host: {
                        'class': 'cdk-virtual-scroll-viewport',
                        '[class.cdk-virtual-scroll-orientation-horizontal]': 'orientation === "horizontal"',
                        '[class.cdk-virtual-scroll-orientation-vertical]': 'orientation === "vertical"',
                    },
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                },] },
    ];
    /** @nocollapse */
    CdkVirtualScrollViewport.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [VIRTUAL_SCROLL_STRATEGY,] }] },
        { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["Directionality"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }] },
        { type: ScrollDispatcher }
    ]; };
    CdkVirtualScrollViewport.propDecorators = {
        orientation: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        scrolledIndexChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        _contentWrapper: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['contentWrapper',] }]
    };
    return CdkVirtualScrollViewport;
}(CdkScrollable));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * Helper to extract size from a DOM Node.
 * @param {?} orientation
 * @param {?} node
 * @return {?}
 */
function getSize(orientation, node) {
    /** @type {?} */
    var el = /** @type {?} */ (node);
    if (!el.getBoundingClientRect) {
        return 0;
    }
    /** @type {?} */
    var rect = el.getBoundingClientRect();
    return orientation == 'horizontal' ? rect.width : rect.height;
}
/**
 * A directive similar to `ngForOf` to be used for rendering data inside a virtual scrolling
 * container.
 * @template T
 */
var CdkVirtualForOf = /** @class */ (function () {
    function CdkVirtualForOf(_viewContainerRef, _template, _differs, /** The virtual scrolling viewport that these items are being rendered in. */
    _viewport, ngZone) {
        var _this = this;
        this._viewContainerRef = _viewContainerRef;
        this._template = _template;
        this._differs = _differs;
        this._viewport = _viewport;
        /**
         * Emits when the rendered view of the data changes.
         */
        this.viewChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * Subject that emits when a new DataSource instance is given.
         */
        this._dataSourceChanges = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        /**
         * The size of the cache used to store templates that are not being used for re-use later.
         * Setting the cache size to `0` will disable caching. Defaults to 20 templates.
         */
        this.cdkVirtualForTemplateCacheSize = 20;
        /**
         * Emits whenever the data in the current DataSource changes.
         */
        this.dataStream = this._dataSourceChanges
            .pipe(
        // Start off with null `DataSource`.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(/** @type {?} */ ((null))), 
        // Bundle up the previous and current data sources so we can work with both.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["pairwise"])(), 
        // Use `_changeDataSource` to disconnect from the previous data source and connect to the
        // new one, passing back a stream of data changes which we run through `switchMap` to give
        // us a data stream that emits the latest data from whatever the current `DataSource` is.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (_a) {
            var prev = _a[0], cur = _a[1];
            return _this._changeDataSource(prev, cur);
        }), 
        // Replay the last emitted data when someone subscribes.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])(1));
        /**
         * The differ used to calculate changes to the data.
         */
        this._differ = null;
        /**
         * The template cache used to hold on ot template instancess that have been stamped out, but don't
         * currently need to be rendered. These instances will be reused in the future rather than
         * stamping out brand new ones.
         */
        this._templateCache = [];
        /**
         * Whether the rendered data should be updated during the next ngDoCheck cycle.
         */
        this._needsUpdate = false;
        this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.dataStream.subscribe(function (data) {
            _this._data = data;
            _this._onRenderedDataChange();
        });
        this._viewport.renderedRangeStream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroyed)).subscribe(function (range) {
            _this._renderedRange = range;
            ngZone.run(function () { return _this.viewChange.next(_this._renderedRange); });
            _this._onRenderedDataChange();
        });
        this._viewport.attach(this);
    }
    Object.defineProperty(CdkVirtualForOf.prototype, "cdkVirtualForOf", {
        /** The DataSource to display. */
        get: /**
         * The DataSource to display.
         * @return {?}
         */
        function () {
            return this._cdkVirtualForOf;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._cdkVirtualForOf = value;
            /** @type {?} */
            var ds = value instanceof _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__["DataSource"] ? value :
                // Slice the value if its an NgIterable to ensure we're working with an array.
                new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__["ArrayDataSource"](value instanceof rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"] ? value : Array.prototype.slice.call(value || []));
            this._dataSourceChanges.next(ds);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkVirtualForOf.prototype, "cdkVirtualForTrackBy", {
        /**
         * The `TrackByFunction` to use for tracking changes. The `TrackByFunction` takes the index and
         * the item and produces a value to be used as the item's identity when tracking changes.
         */
        get: /**
         * The `TrackByFunction` to use for tracking changes. The `TrackByFunction` takes the index and
         * the item and produces a value to be used as the item's identity when tracking changes.
         * @return {?}
         */
        function () {
            return this._cdkVirtualForTrackBy;
        },
        set: /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            var _this = this;
            this._needsUpdate = true;
            this._cdkVirtualForTrackBy = fn ?
                function (index, item) { return fn(index + (_this._renderedRange ? _this._renderedRange.start : 0), item); } :
                undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CdkVirtualForOf.prototype, "cdkVirtualForTemplate", {
        /** The template used to stamp out new elements. */
        set: /**
         * The template used to stamp out new elements.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this._needsUpdate = true;
                this._template = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     */
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     * @param {?} range
     * @param {?} orientation
     * @return {?}
     */
    CdkVirtualForOf.prototype.measureRangeSize = /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     * @param {?} range
     * @param {?} orientation
     * @return {?}
     */
    function (range, orientation) {
        if (range.start >= range.end) {
            return 0;
        }
        if (range.start < this._renderedRange.start || range.end > this._renderedRange.end) {
            throw Error("Error: attempted to measure an item that isn't rendered.");
        }
        /** @type {?} */
        var renderedStartIndex = range.start - this._renderedRange.start;
        /** @type {?} */
        var rangeLen = range.end - range.start;
        /** @type {?} */
        var totalSize = 0;
        /** @type {?} */
        var i = rangeLen;
        while (i--) {
            /** @type {?} */
            var view = /** @type {?} */ (this._viewContainerRef.get(i + renderedStartIndex));
            /** @type {?} */
            var j = view ? view.rootNodes.length : 0;
            while (j--) {
                totalSize += getSize(orientation, /** @type {?} */ ((view)).rootNodes[j]);
            }
        }
        return totalSize;
    };
    /**
     * @return {?}
     */
    CdkVirtualForOf.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this._differ && this._needsUpdate) {
            /** @type {?} */
            var changes = this._differ.diff(this._renderedItems);
            if (!changes) {
                this._updateContext();
            }
            else {
                this._applyChanges(changes);
            }
            this._needsUpdate = false;
        }
    };
    /**
     * @return {?}
     */
    CdkVirtualForOf.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._viewport.detach();
        this._dataSourceChanges.complete();
        this.viewChange.complete();
        this._destroyed.next();
        this._destroyed.complete();
        for (var _i = 0, _a = this._templateCache; _i < _a.length; _i++) {
            var view = _a[_i];
            view.destroy();
        }
    };
    /**
     * React to scroll state changes in the viewport.
     * @return {?}
     */
    CdkVirtualForOf.prototype._onRenderedDataChange = /**
     * React to scroll state changes in the viewport.
     * @return {?}
     */
    function () {
        if (!this._renderedRange) {
            return;
        }
        this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
        if (!this._differ) {
            this._differ = this._differs.find(this._renderedItems).create(this.cdkVirtualForTrackBy);
        }
        this._needsUpdate = true;
    };
    /**
     * Swap out one `DataSource` for another.
     * @param {?} oldDs
     * @param {?} newDs
     * @return {?}
     */
    CdkVirtualForOf.prototype._changeDataSource = /**
     * Swap out one `DataSource` for another.
     * @param {?} oldDs
     * @param {?} newDs
     * @return {?}
     */
    function (oldDs, newDs) {
        if (oldDs) {
            oldDs.disconnect(this);
        }
        this._needsUpdate = true;
        return newDs.connect(this);
    };
    /**
     * Update the `CdkVirtualForOfContext` for all views.
     * @return {?}
     */
    CdkVirtualForOf.prototype._updateContext = /**
     * Update the `CdkVirtualForOfContext` for all views.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var count = this._data.length;
        /** @type {?} */
        var i = this._viewContainerRef.length;
        while (i--) {
            /** @type {?} */
            var view = /** @type {?} */ (this._viewContainerRef.get(i));
            view.context.index = this._renderedRange.start + i;
            view.context.count = count;
            this._updateComputedContextProperties(view.context);
            view.detectChanges();
        }
    };
    /**
     * Apply changes to the DOM.
     * @param {?} changes
     * @return {?}
     */
    CdkVirtualForOf.prototype._applyChanges = /**
     * Apply changes to the DOM.
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        // Rearrange the views to put them in the right location.
        changes.forEachOperation(function (record, adjustedPreviousIndex, currentIndex) {
            if (record.previousIndex == null) { // Item added.
                /** @type {?} */
                var view = _this._getViewForNewItem();
                _this._viewContainerRef.insert(view, /** @type {?} */ ((currentIndex)));
                view.context.$implicit = record.item;
            }
            else if (currentIndex == null) { // Item removed.
                // Item removed.
                _this._cacheView(/** @type {?} */ (_this._viewContainerRef.detach(/** @type {?} */ ((adjustedPreviousIndex)))));
            }
            else { // Item moved.
                /** @type {?} */
                var view = /** @type {?} */ (_this._viewContainerRef.get(/** @type {?} */ ((adjustedPreviousIndex))));
                _this._viewContainerRef.move(view, currentIndex);
                view.context.$implicit = record.item;
            }
        });
        // Update $implicit for any items that had an identity change.
        changes.forEachIdentityChange(function (record) {
            /** @type {?} */
            var view = /** @type {?} */ (_this._viewContainerRef.get(/** @type {?} */ ((record.currentIndex))));
            view.context.$implicit = record.item;
        });
        /** @type {?} */
        var count = this._data.length;
        /** @type {?} */
        var i = this._viewContainerRef.length;
        while (i--) {
            /** @type {?} */
            var view = /** @type {?} */ (this._viewContainerRef.get(i));
            view.context.index = this._renderedRange.start + i;
            view.context.count = count;
            this._updateComputedContextProperties(view.context);
        }
    };
    /**
     * Cache the given detached view.
     * @param {?} view
     * @return {?}
     */
    CdkVirtualForOf.prototype._cacheView = /**
     * Cache the given detached view.
     * @param {?} view
     * @return {?}
     */
    function (view) {
        if (this._templateCache.length < this.cdkVirtualForTemplateCacheSize) {
            this._templateCache.push(view);
        }
        else {
            /** @type {?} */
            var index = this._viewContainerRef.indexOf(view);
            // It's very unlikely that the index will ever be -1, but just in case,
            // destroy the view on its own, otherwise destroy it through the
            // container to ensure that all the references are removed.
            if (index === -1) {
                view.destroy();
            }
            else {
                this._viewContainerRef.remove(index);
            }
        }
    };
    /**
     * Get a view for a new item, either from the cache or by creating a new one.
     * @return {?}
     */
    CdkVirtualForOf.prototype._getViewForNewItem = /**
     * Get a view for a new item, either from the cache or by creating a new one.
     * @return {?}
     */
    function () {
        return this._templateCache.pop() || this._viewContainerRef.createEmbeddedView(this._template, {
            $implicit: /** @type {?} */ ((null)),
            cdkVirtualForOf: this._cdkVirtualForOf,
            index: -1,
            count: -1,
            first: false,
            last: false,
            odd: false,
            even: false
        });
    };
    /**
     * Update the computed properties on the `CdkVirtualForOfContext`.
     * @param {?} context
     * @return {?}
     */
    CdkVirtualForOf.prototype._updateComputedContextProperties = /**
     * Update the computed properties on the `CdkVirtualForOfContext`.
     * @param {?} context
     * @return {?}
     */
    function (context) {
        context.first = context.index === 0;
        context.last = context.index === context.count - 1;
        context.even = context.index % 2 === 0;
        context.odd = !context.even;
    };
    CdkVirtualForOf.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[cdkVirtualFor][cdkVirtualForOf]',
                },] },
    ];
    /** @nocollapse */
    CdkVirtualForOf.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"] },
        { type: CdkVirtualScrollViewport, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
    ]; };
    CdkVirtualForOf.propDecorators = {
        cdkVirtualForOf: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cdkVirtualForTrackBy: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cdkVirtualForTemplate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        cdkVirtualForTemplateCacheSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
    };
    return CdkVirtualForOf;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ScrollingModule = /** @class */ (function () {
    function ScrollingModule() {
    }
    ScrollingModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["BidiModule"], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["PlatformModule"]],
                    exports: [
                        _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__["BidiModule"],
                        CdkFixedSizeVirtualScroll,
                        CdkScrollable,
                        CdkVirtualForOf,
                        CdkVirtualScrollViewport,
                    ],
                    declarations: [
                        CdkFixedSizeVirtualScroll,
                        CdkScrollable,
                        CdkVirtualForOf,
                        CdkVirtualScrollViewport,
                    ],
                },] },
    ];
    return ScrollingModule;
}());
/**
 * @deprecated ScrollDispatchModule has been renamed to ScrollingModule.
 * \@breaking-change 8.0.0 delete this alias
 */
var ScrollDispatchModule = /** @class */ (function () {
    function ScrollDispatchModule() {
    }
    ScrollDispatchModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [ScrollingModule],
                    exports: [ScrollingModule],
                },] },
    ];
    return ScrollDispatchModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** *
 * Time in ms to throttle the resize events by default.
  @type {?} */
var DEFAULT_RESIZE_TIME = 20;
/**
 * Simple utility for getting the bounds of the browser viewport.
 * \@docs-private
 */
var ViewportRuler = /** @class */ (function () {
    function ViewportRuler(_platform, ngZone) {
        var _this = this;
        this._platform = _platform;
        ngZone.runOutsideAngular(function () {
            _this._change = _platform.isBrowser ?
                Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window, 'resize'), Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(window, 'orientationchange')) :
                Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])();
            // Note that we need to do the subscription inside `runOutsideAngular`
            // since subscribing is what causes the event listener to be added.
            _this._invalidateCache = _this.change().subscribe(function () { return _this._updateViewportSize(); });
        });
    }
    /**
     * @return {?}
     */
    ViewportRuler.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._invalidateCache.unsubscribe();
    };
    /** Returns the viewport's width and height. */
    /**
     * Returns the viewport's width and height.
     * @return {?}
     */
    ViewportRuler.prototype.getViewportSize = /**
     * Returns the viewport's width and height.
     * @return {?}
     */
    function () {
        if (!this._viewportSize) {
            this._updateViewportSize();
        }
        /** @type {?} */
        var output = { width: this._viewportSize.width, height: this._viewportSize.height };
        // If we're not on a browser, don't cache the size since it'll be mocked out anyway.
        if (!this._platform.isBrowser) {
            this._viewportSize = /** @type {?} */ ((null));
        }
        return output;
    };
    /** Gets a ClientRect for the viewport's bounds. */
    /**
     * Gets a ClientRect for the viewport's bounds.
     * @return {?}
     */
    ViewportRuler.prototype.getViewportRect = /**
     * Gets a ClientRect for the viewport's bounds.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var scrollPosition = this.getViewportScrollPosition();
        var _a = this.getViewportSize(), width = _a.width, height = _a.height;
        return {
            top: scrollPosition.top,
            left: scrollPosition.left,
            bottom: scrollPosition.top + height,
            right: scrollPosition.left + width,
            height: height,
            width: width,
        };
    };
    /** Gets the (top, left) scroll position of the viewport. */
    /**
     * Gets the (top, left) scroll position of the viewport.
     * @return {?}
     */
    ViewportRuler.prototype.getViewportScrollPosition = /**
     * Gets the (top, left) scroll position of the viewport.
     * @return {?}
     */
    function () {
        // While we can get a reference to the fake document
        // during SSR, it doesn't have getBoundingClientRect.
        if (!this._platform.isBrowser) {
            return { top: 0, left: 0 };
        }
        /** @type {?} */
        var documentElement = /** @type {?} */ ((document.documentElement));
        /** @type {?} */
        var documentRect = documentElement.getBoundingClientRect();
        /** @type {?} */
        var top = -documentRect.top || document.body.scrollTop || window.scrollY ||
            documentElement.scrollTop || 0;
        /** @type {?} */
        var left = -documentRect.left || document.body.scrollLeft || window.scrollX ||
            documentElement.scrollLeft || 0;
        return { top: top, left: left };
    };
    /**
     * Returns a stream that emits whenever the size of the viewport changes.
     * @param throttleTime Time in milliseconds to throttle the stream.
     */
    /**
     * Returns a stream that emits whenever the size of the viewport changes.
     * @param {?=} throttleTime Time in milliseconds to throttle the stream.
     * @return {?}
     */
    ViewportRuler.prototype.change = /**
     * Returns a stream that emits whenever the size of the viewport changes.
     * @param {?=} throttleTime Time in milliseconds to throttle the stream.
     * @return {?}
     */
    function (throttleTime) {
        if (throttleTime === void 0) { throttleTime = DEFAULT_RESIZE_TIME; }
        return throttleTime > 0 ? this._change.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["auditTime"])(throttleTime)) : this._change;
    };
    /**
     * Updates the cached viewport size.
     * @return {?}
     */
    ViewportRuler.prototype._updateViewportSize = /**
     * Updates the cached viewport size.
     * @return {?}
     */
    function () {
        this._viewportSize = this._platform.isBrowser ?
            { width: window.innerWidth, height: window.innerHeight } :
            { width: 0, height: 0 };
    };
    ViewportRuler.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{ providedIn: 'root' },] },
    ];
    /** @nocollapse */
    ViewportRuler.ctorParameters = function () { return [
        { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
    ]; };
    /** @nocollapse */ ViewportRuler.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function ViewportRuler_Factory() { return new ViewportRuler(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); }, token: ViewportRuler, providedIn: "root" });
    return ViewportRuler;
}());
/**
 * \@docs-private \@deprecated \@breaking-change 8.0.0
 * @param {?} parentRuler
 * @param {?} platform
 * @param {?} ngZone
 * @return {?}
 */
function VIEWPORT_RULER_PROVIDER_FACTORY(parentRuler, platform, ngZone) {
    return parentRuler || new ViewportRuler(platform, ngZone);
}
/** *
 * \@docs-private \@deprecated \@breaking-change 8.0.0
  @type {?} */
var VIEWPORT_RULER_PROVIDER = {
    // If there is already a ViewportRuler available, use that. Otherwise, provide a new one.
    provide: ViewportRuler,
    deps: [[new _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"](), new _angular_core__WEBPACK_IMPORTED_MODULE_0__["SkipSelf"](), ViewportRuler], _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]],
    useFactory: VIEWPORT_RULER_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */


//# sourceMappingURL=scrolling.es5.js.map


/***/ }),

/***/ "./node_modules/ngx-scrollbar/fesm5/ngx-scrollbar.js":
/*!***********************************************************!*\
  !*** ./node_modules/ngx-scrollbar/fesm5/ngx-scrollbar.js ***!
  \***********************************************************/
/*! exports provided: NgScrollbarModule, NgScrollbar, SmoothScrollModule, smoothScroll, easeInOutQuad, easeInCubic, inOutQuintic, SmoothScroll, ɵc, ɵb, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgScrollbarModule", function() { return NgScrollbarModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgScrollbar", function() { return NgScrollbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmoothScrollModule", function() { return SmoothScrollModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "smoothScroll", function() { return smoothScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInOutQuad", function() { return easeInOutQuad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "easeInCubic", function() { return easeInCubic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inOutQuintic", function() { return inOutQuintic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmoothScroll", function() { return SmoothScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return NgScrollbarHorizontal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return NgScrollbarThumb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return NgScrollbarVertical; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/platform */ "./node_modules/@angular/cdk/esm5/platform.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");









/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SmoothScroll = /** @class */ (function () {
    function SmoothScroll(_platform, el) {
        this._platform = _platform;
        this.view = el.nativeElement;
    }
    /**
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    SmoothScroll.prototype.scrollFunc = /**
     * @param {?} left
     * @param {?} top
     * @return {?}
     */
    function (left, top) {
        if (Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__["supportsScrollBehavior"])()) {
            this.view.scrollTo({ top: top, left: left });
        }
        else {
            this.view.scrollTop = top;
            this.view.scrollLeft = left;
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    SmoothScroll.prototype.scrollTo = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _this = this;
        // Avoid SSR error
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this._platform)) {
            /** @type {?} */
            var scrollFunc = function (left, top) {
                if (Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__["supportsScrollBehavior"])()) {
                    _this.view.scrollTo({ top: top, left: left });
                }
                else {
                    _this.view.scrollTop = top;
                    _this.view.scrollLeft = left;
                }
            };
            if (options.duration) {
                /** @type {?} */
                var smoothScrollOptions = {
                    top: options.top,
                    left: options.left,
                    duration: options.duration,
                    easeFunc: options.easeFunc || easeInOutQuad,
                    offsetTop: this.view.scrollTop,
                    offsetLeft: this.view.scrollLeft,
                    scrollFunc: scrollFunc
                };
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["from"])(smoothScroll(smoothScrollOptions));
            }
            this.scrollFunc(options.left, options.top);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])();
    };
    /**
     * @param {?} selector
     * @param {?=} offset
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    SmoothScroll.prototype.scrollToElement = /**
     * @param {?} selector
     * @param {?=} offset
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (selector, offset, duration, easeFunc) {
        if (offset === void 0) { offset = 0; }
        /** @type {?} */
        var target = this.view.querySelector(selector);
        return target ? this.scrollTo({ left: target.offsetLeft, top: target.offsetTop - offset, duration: duration, easeFunc: easeFunc }) : Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])();
    };
    /**
     * @param {?} left
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    SmoothScroll.prototype.scrollXTo = /**
     * @param {?} left
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (left, duration, easeFunc) {
        return this.scrollTo({ left: left, duration: duration, easeFunc: easeFunc });
    };
    /**
     * @param {?} top
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    SmoothScroll.prototype.scrollYTo = /**
     * @param {?} top
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (top, duration, easeFunc) {
        return this.scrollTo({ top: top, duration: duration, easeFunc: easeFunc });
    };
    /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    SmoothScroll.prototype.scrollToTop = /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (duration, easeFunc) {
        return this.scrollYTo(0, duration, easeFunc);
    };
    /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    SmoothScroll.prototype.scrollToBottom = /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (duration, easeFunc) {
        return this.scrollYTo(this.view.scrollHeight - this.view.clientHeight, duration, easeFunc);
    };
    /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    SmoothScroll.prototype.scrollToRight = /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (duration, easeFunc) {
        return this.scrollXTo(this.view.scrollWidth, duration, easeFunc);
    };
    /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    SmoothScroll.prototype.scrollToLeft = /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (duration, easeFunc) {
        return this.scrollXTo(0, duration, easeFunc);
    };
    SmoothScroll.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"], args: [{
                    selector: '[smoothScroll], [smooth-scroll]'
                },] }
    ];
    /** @nocollapse */
    SmoothScroll.ctorParameters = function () { return [
        { type: Object, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"],] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }
    ]; };
    return SmoothScroll;
}());
/**
 * @param {?} options
 * @return {?}
 */
function smoothScroll(options) {
    return new Promise(function (resolve) {
        /** @type {?} */
        var currentTime = 0;
        /** @type {?} */
        var increment = 10;
        /** @type {?} */
        var valX = options.offsetLeft;
        /** @type {?} */
        var valY = options.offsetTop;
        /** @type {?} */
        var animateScroll = function () {
            // increment the time
            currentTime += increment;
            // find the value with the easing function
            if (typeof options.left !== 'undefined') {
                /** @type {?} */
                var deltaX = options.left - options.offsetLeft;
                valX = options.easeFunc(currentTime, options.offsetLeft, deltaX, options.duration);
            }
            if (typeof options.top !== 'undefined') {
                /** @type {?} */
                var deltaY = options.top - options.offsetTop;
                valY = options.easeFunc(currentTime, options.offsetTop, deltaY, options.duration);
            }
            // scroll to position
            options.scrollFunc(valX, valY);
            // do the animation unless its over
            if (currentTime < options.duration) {
                rxjs__WEBPACK_IMPORTED_MODULE_3__["animationFrameScheduler"].schedule(animateScroll);
            }
            else {
                resolve();
            }
        };
        animateScroll();
    });
}
/**
 * @param {?} t
 * @param {?} b
 * @param {?} c
 * @param {?} d
 * @return {?}
 */
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
        return (c / 2) * t * t + b;
    }
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
}
/**
 * @param {?} t
 * @param {?} b
 * @param {?} c
 * @param {?} d
 * @return {?}
 */
function easeInCubic(t, b, c, d) {
    /** @type {?} */
    var tc = (t /= d) * t * t;
    return b + c * tc;
}
/**
 * @param {?} t
 * @param {?} b
 * @param {?} c
 * @param {?} d
 * @return {?}
 */
function inOutQuintic(t, b, c, d) {
    /** @type {?} */
    var ts = (t /= d) * t;
    /** @type {?} */
    var tc = ts * t;
    return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SmoothScrollModule = /** @class */ (function () {
    function SmoothScrollModule() {
    }
    SmoothScrollModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__["ScrollingModule"]],
                    declarations: [SmoothScroll],
                    exports: [SmoothScroll]
                },] }
    ];
    return SmoothScrollModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/** @type {?} */
var defaultState = {
    viewStyle: {
        paddingRight: '0',
        paddingBottom: '0',
        width: '100%',
        height: '100%'
    },
    displayX: false,
    displayY: false
};
var NgScrollbar = /** @class */ (function () {
    function NgScrollbar(breakpointObserver, _platform) {
        this.breakpointObserver = breakpointObserver;
        this._platform = _platform;
        /**
         * Horizontal custom scrollbar
         */
        this.trackX = false;
        /**
         * Vertical custom Scrollbar
         */
        this.trackY = true;
        /**
         * Auto hide scrollbars on mouse leave
         */
        this.autoHide = false;
        /**
         * Auto update scrollbars on content changes (Mutation Observer)
         */
        this.autoUpdate = true;
        /**
         * The smooth scroll duration when a scrollbar is clicked
         */
        this.scrollToDuration = 300;
        /**
         * Disable custom scrollbars on specific breakpoints
         */
        this.disableOnBreakpoints = [
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__["Breakpoints"].HandsetLandscape,
            _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__["Breakpoints"].HandsetPortrait
        ];
        this._disabled = false;
        /**
         * Scrollbar state
         */
        this._state = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](defaultState);
        this.viewStyle = this._state.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (state) { return state.viewStyle; }));
        this.displayX = this._state.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (state) { return state.displayX; }));
        this.displayY = this._state.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (state) { return state.displayY; }));
        /**
         * Mutation observer subscription
         */
        this._updateObserverSub$ = rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
        /**
         * CDK breakpoint subscription
         */
        this._breakpointSub$ = rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
        /**
         * Steam that emits when scrollbar thumbnail needs to update (for internal uses)
         */
        this._updateObserver = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.updateObserver = this._updateObserver.asObservable();
    }
    Object.defineProperty(NgScrollbar.prototype, "disabled", {
        /** Disable custom scrollbars and switch back to native scrollbars */
        get: /**
         * Disable custom scrollbars and switch back to native scrollbars
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} disable
         * @return {?}
         */
        function (disable) {
            disable ? this.disable() : this.enable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgScrollbar.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.view = this.scrollable.getElementRef().nativeElement;
        if (!this.disabled) {
            if (this.disableOnBreakpoints) {
                // Enable/Disable custom scrollbar on breakpoints (Used to disable scrollbars on mobile phones)
                this._breakpointSub$ = this.breakpointObserver.observe(this.disableOnBreakpoints).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function (result) { return result.matches ? _this.disable() : _this.enable(); })).subscribe();
            }
            else {
                this.enable();
            }
        }
        // Update state on content changes
        this._updateObserverSub$ = this.updateObserver.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["throttleTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () { return _this.updateState(); })).subscribe();
    };
    /**
     * @return {?}
     */
    NgScrollbar.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._breakpointSub$.unsubscribe();
        this._updateObserverSub$.unsubscribe();
        if (this._observer) {
            this._observer.disconnect();
        }
    };
    /**
     * Update scrollbar thumbnail position
     */
    /**
     * Update scrollbar thumbnail position
     * @return {?}
     */
    NgScrollbar.prototype.update = /**
     * Update scrollbar thumbnail position
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this._updateObserver.next();
        }
    };
    /**
     * Enable custom scrollbar
     */
    /**
     * Enable custom scrollbar
     * @return {?}
     */
    NgScrollbar.prototype.enable = /**
     * Enable custom scrollbar
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.view) {
            this._disabled = false;
            // Hide native scrollbars
            this._nativeScrollbarSize = this.view.offsetWidth - this.view.clientWidth + 1 + "px";
            this.updateState();
            if (this.autoUpdate && Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this._platform)) {
                // Observe content changes
                this._observer = new MutationObserver(function () { return _this.update(); });
                this._observer.observe(this.view, { subtree: true, childList: true, characterData: true });
            }
        }
    };
    /**
     * Disable custom scrollbar
     */
    /**
     * Disable custom scrollbar
     * @return {?}
     */
    NgScrollbar.prototype.disable = /**
     * Disable custom scrollbar
     * @return {?}
     */
    function () {
        this._disabled = true;
        // Reset and bring back native scrollbars
        this._state.next(defaultState);
        if (this._observer) {
            this._observer.disconnect();
        }
    };
    /**
     * @param {?} options
     * @return {?}
     */
    NgScrollbar.prototype.scrollTo = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return this.smoothScroll.scrollTo(options);
    };
    /**
     * @param {?} selector
     * @param {?=} offset
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    NgScrollbar.prototype.scrollToElement = /**
     * @param {?} selector
     * @param {?=} offset
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (selector, offset, duration, easeFunc) {
        if (offset === void 0) { offset = 0; }
        return this.smoothScroll.scrollToElement(selector, offset, duration, easeFunc);
    };
    /**
     * @param {?} to
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    NgScrollbar.prototype.scrollXTo = /**
     * @param {?} to
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (to, duration, easeFunc) {
        return this.smoothScroll.scrollXTo(to, duration, easeFunc);
    };
    /**
     * @param {?} to
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    NgScrollbar.prototype.scrollYTo = /**
     * @param {?} to
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (to, duration, easeFunc) {
        return this.smoothScroll.scrollYTo(to, duration, easeFunc);
    };
    /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    NgScrollbar.prototype.scrollToTop = /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (duration, easeFunc) {
        return this.smoothScroll.scrollToTop(duration, easeFunc);
    };
    /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    NgScrollbar.prototype.scrollToBottom = /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (duration, easeFunc) {
        return this.smoothScroll.scrollToBottom(duration, easeFunc);
    };
    /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    NgScrollbar.prototype.scrollToRight = /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (duration, easeFunc) {
        return this.smoothScroll.scrollToRight(duration, easeFunc);
    };
    /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    NgScrollbar.prototype.scrollToLeft = /**
     * @param {?=} duration
     * @param {?=} easeFunc
     * @return {?}
     */
    function (duration, easeFunc) {
        return this.smoothScroll.scrollToLeft(duration, easeFunc);
    };
    /**
     * @return {?}
     */
    NgScrollbar.prototype.updateState = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var paddingBottom = '0';
        /** @type {?} */
        var paddingRight = '0';
        /** @type {?} */
        var displayY = false;
        /** @type {?} */
        var displayX = false;
        /** @type {?} */
        var size = "calc(100% + " + this._nativeScrollbarSize + ")";
        if (this.trackY) {
            // Check if vertical scrollbar should be displayed
            if (this.view.scrollHeight > this.view.clientHeight) {
                displayY = true;
                paddingRight = this.overlay ? '0' : this._nativeScrollbarSize;
            }
        }
        if (this.trackX) {
            // Check if horizontal scrollbar should be displayed
            if (this.view.scrollWidth > this.view.clientWidth) {
                displayX = true;
                paddingBottom = this.overlay ? '0' : this._nativeScrollbarSize;
            }
        }
        this._state.next({
            viewStyle: {
                width: size,
                height: size,
                paddingBottom: paddingBottom,
                paddingRight: paddingRight
            },
            displayX: displayX,
            displayY: displayY
        });
    };
    NgScrollbar.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng-scrollbar',
                    template: "<div class=\"ng-scrollbar-container\">\r\n\r\n  <div cdkScrollable smoothScroll class=\"ng-scrollbar-view {{viewClass}}\" [ngStyle]=\"viewStyle | async\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n\r\n  <ng-scrollbar-vertical #vertical\r\n                         *ngIf=\"!disabled && trackY\"\r\n                         [class.ng-scrollbar-visible]=\"displayY | async\"\r\n                         [barClass]=\"barClass\"\r\n                         [thumbClass]=\"thumbClass\"\r\n                         [scrollToDuration]=\"scrollToDuration\">\r\n  </ng-scrollbar-vertical>\r\n\r\n  <ng-scrollbar-horizontal #horizontal\r\n                           *ngIf=\"!disabled && trackX\"\r\n                           [class.ng-scrollbar-visible]=\"displayX | async\"\r\n                           [barClass]=\"barClass\"\r\n                           [thumbClass]=\"thumbClass\"\r\n                           [scrollToDuration]=\"scrollToDuration\">\r\n  </ng-scrollbar-horizontal>\r\n\r\n</div>\r\n",
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    host: {
                        '[attr.trackX]': 'trackX',
                        '[attr.trackY]': 'trackY',
                        '[class.ng-scrollbar-auto-hide]': 'autoHide'
                    },
                    styles: [":host{display:block;overflow:hidden}:host[trackY=true] .ng-scrollbar-view{overflow-y:scroll}:host[trackX=true] .ng-scrollbar-view{overflow-x:scroll}.ng-scrollbar-container,.ng-scrollbar-view,:host{position:relative;height:100%;width:100%}.ng-scrollbar-container{overflow:hidden;top:0;left:0}.ng-scrollbar-view{box-sizing:content-box;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-overflow-scrolling:touch}.ng-scrollbar-view ::-webkit-scrollbar{background:0 0}ng-scrollbar-thumb{display:none}ng-scrollbar-thumb.ng-scrollbar-visible{display:block}::ng-deep .ng-scrollbar-auto-hide .ng-scrollbar{opacity:0;transition:opacity 120ms ease-out}::ng-deep .ng-scrollbar-auto-hide:active .ng-scrollbar,::ng-deep .ng-scrollbar-auto-hide:focus .ng-scrollbar,::ng-deep .ng-scrollbar-auto-hide:hover .ng-scrollbar{opacity:1;transition:opacity 340ms ease-out}::ng-deep .ng-scrollbar{position:absolute;z-index:1;border-radius:4px}::ng-deep .ng-scrollbar-thumb{position:relative;width:0;height:0;border-radius:inherit;background-color:rgba(0,0,0,.2);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);transition:height ease-out 150ms}::ng-deep .ng-scrollbar-thumb:active,::ng-deep .ng-scrollbar-thumb:hover{background-color:rgba(0,0,0,.3)}::ng-deep .ng-scrollbar-vertical{right:6px;top:6px;bottom:6px;width:8px}::ng-deep .ng-scrollbar-vertical .ng-scrollbar-thumb{width:100%}::ng-deep .ng-scrollbar-horizontal{left:6px;right:6px;bottom:6px;height:8px}::ng-deep .ng-scrollbar-horizontal .ng-scrollbar-thumb{height:100%}"]
                }] }
    ];
    /** @nocollapse */
    NgScrollbar.ctorParameters = function () { return [
        { type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__["BreakpointObserver"] },
        { type: Object, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"],] }] }
    ]; };
    NgScrollbar.propDecorators = {
        trackX: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        trackY: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        autoHide: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        autoUpdate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        viewClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        barClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        thumbClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        scrollToDuration: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        overlay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        disableOnBreakpoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['disabled',] }],
        scrollable: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__["CdkScrollable"],] }],
        smoothScroll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: [SmoothScroll,] }],
        verticalScrollbar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['vertical', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },] }],
        horizontalScrollbar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['horizontal', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },] }]
    };
    return NgScrollbar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgScrollbarThumb = /** @class */ (function () {
    function NgScrollbarThumb(_parent, _platform, _zone) {
        this._parent = _parent;
        this._platform = _platform;
        this._zone = _zone;
        this._minThumbSize = 20;
        this._naturalThumbSize = 0;
        this._thumbSize = 0;
        this._trackMax = 0;
        this._scrollMax = 0;
        this._currPos = 0;
        this._scroll$ = rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
        this._thumbDrag$ = rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
        this._updateObserver$ = rxjs__WEBPACK_IMPORTED_MODULE_3__["Subscription"].EMPTY;
        this._state = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]({
            transform: 'translate3d(0, 0, 0)'
        });
        /**
         * Scrollbar styles
         */
        this.scrollbarStyle = this._state.asObservable();
    }
    Object.defineProperty(NgScrollbarThumb.prototype, "thumbSize", {
        get: /**
         * @return {?}
         */
        function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgScrollbarThumb.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Avoid SSR Error
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformBrowser"])(this._platform)) {
            this._view = this._parent.scrollable.getElementRef().nativeElement;
            // Start view scroll event
            this._scroll$ = this._parent.scrollable.elementScrolled()
                .subscribe(function () { return _this.updateScrollbar(); });
            // Start scrollbar thumbnail drag events
            this._zone.runOutsideAngular(function () {
                return _this._thumbDrag$ = _this.startThumbEvents().subscribe();
            });
            // Update scrollbar thumbnail size on content changes
            this._updateObserver$ = this._parent.updateObserver.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["throttleTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () { return _this.updateScrollbar(); }), 
            // Make sure scrollbar thumbnail position is correct after the new content is rendered
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["debounceTime"])(200), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () { return _this.updateScrollbar(); })).subscribe();
            // Initialize scrollbar
            setTimeout(function () { return _this.updateScrollbar(); }, 200);
        }
    };
    /**
     * @return {?}
     */
    NgScrollbarThumb.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._scroll$.unsubscribe();
        this._thumbDrag$.unsubscribe();
        this._updateObserver$.unsubscribe();
    };
    /**
     * Scrollbar click
     * @param e Mouse event
     */
    /**
     * Scrollbar click
     * @param {?} e Mouse event
     * @return {?}
     */
    NgScrollbarThumb.prototype.onScrollbarHolderClick = /**
     * Scrollbar click
     * @param {?} e Mouse event
     * @return {?}
     */
    function (e) {
    };
    /**
     * Update scrollbar
     */
    /**
     * Update scrollbar
     * @return {?}
     */
    NgScrollbarThumb.prototype.updateScrollbar = /**
     * Update scrollbar
     * @return {?}
     */
    function () {
    };
    /**
     * Start vertical thumb worker
     */
    /**
     * Start vertical thumb worker
     * @return {?}
     */
    NgScrollbarThumb.prototype.startThumbEvents = /**
     * Start vertical thumb worker
     * @return {?}
     */
    function () {
        return undefined;
    };
    /**
     * Get scrollbar thumb size
     * @param naturalThumbSize
     * @param scrollMax
     */
    /**
     * Get scrollbar thumb size
     * @param {?} naturalThumbSize
     * @param {?} scrollMax
     * @return {?}
     */
    NgScrollbarThumb.prototype.scrollBoundaries = /**
     * Get scrollbar thumb size
     * @param {?} naturalThumbSize
     * @param {?} scrollMax
     * @return {?}
     */
    function (naturalThumbSize, scrollMax) {
        return (naturalThumbSize < this._minThumbSize) ? this._minThumbSize : scrollMax ? naturalThumbSize : 0;
    };
    /**
     * @param {?} state
     * @return {?}
     */
    NgScrollbarThumb.prototype.updateState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this._state.next(Object(tslib__WEBPACK_IMPORTED_MODULE_7__["__assign"])({}, this._state.value, state));
    };
    NgScrollbarThumb.propDecorators = {
        barClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        thumbClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        scrollToDuration: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        bar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['bar',] }],
        thumb: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['thumb',] }]
    };
    return NgScrollbarThumb;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgScrollbarVertical = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_7__["__extends"])(NgScrollbarVertical, _super);
    function NgScrollbarVertical(_document, _parent, _platform, _zone) {
        var _this = _super.call(this, _parent, _platform, _zone) || this;
        _this._document = _document;
        _this._parent = _parent;
        _this._zone = _zone;
        return _this;
    }
    Object.defineProperty(NgScrollbarVertical.prototype, "thumbSize", {
        /**
         * Calculate scrollbar thumbnail size
         */
        get: /**
         * Calculate scrollbar thumbnail size
         * @return {?}
         */
        function () {
            /** @type {?} */
            var barClientHeight = this.bar.nativeElement.clientHeight;
            /** @type {?} */
            var viewClientHeight = this._view.clientHeight;
            /** @type {?} */
            var viewScrollHeight = this._view.scrollHeight;
            this._naturalThumbSize = barClientHeight / viewScrollHeight * barClientHeight;
            this._scrollMax = viewScrollHeight - viewClientHeight;
            return this.scrollBoundaries(this._naturalThumbSize, this._scrollMax);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Scrollbar click
     * @param e Mouse event
     */
    /**
     * Scrollbar click
     * @param {?} e Mouse event
     * @return {?}
     */
    NgScrollbarVertical.prototype.onScrollbarHolderClick = /**
     * Scrollbar click
     * @param {?} e Mouse event
     * @return {?}
     */
    function (e) {
        if (e.target === e.currentTarget) {
            /** @type {?} */
            var offsetY = e.offsetY - this._naturalThumbSize * .5;
            /** @type {?} */
            var thumbPositionPercentage = offsetY * 100 / this.bar.nativeElement.clientHeight;
            /** @type {?} */
            var value = thumbPositionPercentage * this._view.scrollHeight / 100;
            this._parent.scrollTo(/** @type {?} */ ({ top: value, duration: this.scrollToDuration })).subscribe();
        }
    };
    /**
     * Update scrollbar
     */
    /**
     * Update scrollbar
     * @return {?}
     */
    NgScrollbarVertical.prototype.updateScrollbar = /**
     * Update scrollbar
     * @return {?}
     */
    function () {
        var _this = this;
        this._thumbSize = this.thumb.nativeElement.clientHeight;
        this._trackMax = this.bar.nativeElement.clientHeight - this._thumbSize;
        this._currPos = this._view.scrollTop * this._trackMax / this._scrollMax;
        this._zone.run(function () {
            rxjs__WEBPACK_IMPORTED_MODULE_3__["animationFrameScheduler"].schedule(function () {
                return _this.updateState({
                    transform: "translate3d(0, " + _this._currPos + "px, 0)",
                    height: _this.thumbSize + "px"
                });
            });
        });
    };
    /**
     * Start vertical thumb worker
     */
    /**
     * Start vertical thumb worker
     * @return {?}
     */
    NgScrollbarVertical.prototype.startThumbEvents = /**
     * Start vertical thumb worker
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var mouseDown$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this.thumb.nativeElement, 'mousedown');
        /** @type {?} */
        var mouseMove$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this._document, 'mousemove');
        /** @type {?} */
        var mouseUp$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this._document, 'mouseup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () { return _this._document.onselectstart = null; }));
        return mouseDown$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () {
            _this._document.onselectstart = function () { return false; };
            // Initialize trackMax for before start dragging
            _this._trackMax = _this.bar.nativeElement.clientHeight - _this._thumbSize;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["pluck"])('offsetY'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["mergeMap"])(function (mouseDownOffset) { return mouseMove$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(mouseUp$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["pluck"])('clientY'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function (mouseMoveClient) {
            /** @type {?} */
            var offsetY = mouseMoveClient - _this.bar.nativeElement.getBoundingClientRect().top;
            /** @type {?} */
            var value = _this._scrollMax * (offsetY - mouseDownOffset) / _this._trackMax;
            _this._parent.scrollable.scrollTo({ top: value });
        })); }));
    };
    NgScrollbarVertical.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng-scrollbar-vertical',
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    template: "\n    <div #bar class=\"ng-scrollbar ng-scrollbar-vertical {{barClass}}\" (mousedown)=\"onScrollbarHolderClick($event)\">\n      <div #thumb class=\"ng-scrollbar-thumb {{thumbClass}}\" [ngStyle]=\"scrollbarStyle | async\"></div>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    NgScrollbarVertical.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
        { type: NgScrollbar, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return NgScrollbar; }),] }] },
        { type: Object, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"],] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
    ]; };
    return NgScrollbarVertical;
}(NgScrollbarThumb));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgScrollbarHorizontal = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_7__["__extends"])(NgScrollbarHorizontal, _super);
    function NgScrollbarHorizontal(_document, _parent, _platform, _zone) {
        var _this = _super.call(this, _parent, _platform, _zone) || this;
        _this._document = _document;
        _this._parent = _parent;
        _this._zone = _zone;
        return _this;
    }
    Object.defineProperty(NgScrollbarHorizontal.prototype, "thumbSize", {
        /**
         * Calculate scrollbar thumbnail size
         */
        get: /**
         * Calculate scrollbar thumbnail size
         * @return {?}
         */
        function () {
            /** @type {?} */
            var barClientWidth = this.bar.nativeElement.clientWidth;
            /** @type {?} */
            var viewClientWidth = this._view.clientWidth;
            /** @type {?} */
            var viewScrollWidth = this._view.scrollWidth;
            this._naturalThumbSize = barClientWidth / viewScrollWidth * barClientWidth;
            this._scrollMax = viewScrollWidth - viewClientWidth;
            return this.scrollBoundaries(this._naturalThumbSize, this._scrollMax);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Scrollbar click
     * @param e Mouse event
     */
    /**
     * Scrollbar click
     * @param {?} e Mouse event
     * @return {?}
     */
    NgScrollbarHorizontal.prototype.onScrollbarHolderClick = /**
     * Scrollbar click
     * @param {?} e Mouse event
     * @return {?}
     */
    function (e) {
        if (e.target === e.currentTarget) {
            /** @type {?} */
            var offsetX = e.offsetX - this._naturalThumbSize * .5;
            /** @type {?} */
            var thumbPositionPercentage = offsetX * 100 / this.bar.nativeElement.clientWidth;
            /** @type {?} */
            var value = thumbPositionPercentage * this._view.scrollWidth / 100;
            this._parent.scrollTo(/** @type {?} */ ({ left: value, duration: this.scrollToDuration })).subscribe();
        }
    };
    /**
     * Update scrollbar
     */
    /**
     * Update scrollbar
     * @return {?}
     */
    NgScrollbarHorizontal.prototype.updateScrollbar = /**
     * Update scrollbar
     * @return {?}
     */
    function () {
        var _this = this;
        this._thumbSize = this.thumb.nativeElement.clientWidth;
        this._trackMax = this.bar.nativeElement.clientWidth - this._thumbSize;
        this._currPos = this._view.scrollLeft * this._trackMax / this._scrollMax;
        this._zone.run(function () {
            rxjs__WEBPACK_IMPORTED_MODULE_3__["animationFrameScheduler"].schedule(function () {
                return _this.updateState({
                    transform: "translate3d(" + _this._currPos + "px, 0, 0)",
                    width: _this.thumbSize + "px"
                });
            });
        });
    };
    /**
     * Start vertical thumb worker
     */
    /**
     * Start vertical thumb worker
     * @return {?}
     */
    NgScrollbarHorizontal.prototype.startThumbEvents = /**
     * Start vertical thumb worker
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var mouseDown$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this.thumb.nativeElement, 'mousedown');
        /** @type {?} */
        var mouseMove$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this._document, 'mousemove');
        /** @type {?} */
        var mouseUp$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["fromEvent"])(this._document, 'mouseup').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () { return _this._document.onselectstart = null; }));
        return mouseDown$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () {
            _this._document.onselectstart = function () { return false; };
            // Initialize trackMax for before start dragging
            _this._trackMax = _this.bar.nativeElement.clientWidth - _this._thumbSize;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["pluck"])('offsetX'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["mergeMap"])(function (mouseDownOffset) { return mouseMove$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(mouseUp$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["pluck"])('clientX'), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function (mouseMoveClient) {
            /** @type {?} */
            var offsetX = mouseMoveClient - _this.bar.nativeElement.getBoundingClientRect().left;
            /** @type {?} */
            var value = _this._scrollMax * (offsetX - mouseDownOffset) / _this._trackMax;
            _this._parent.scrollable.scrollTo({ left: value });
        })); }));
    };
    NgScrollbarHorizontal.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng-scrollbar-horizontal',
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    template: "\n    <div #bar class=\"ng-scrollbar ng-scrollbar-horizontal {{barClass}}\" (mousedown)=\"onScrollbarHolderClick($event)\">\n      <div #thumb class=\"ng-scrollbar-thumb {{thumbClass}}\" [ngStyle]=\"scrollbarStyle | async\"></div>\n    </div>\n  "
                }] }
    ];
    /** @nocollapse */
    NgScrollbarHorizontal.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
        { type: NgScrollbar, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["forwardRef"])(function () { return NgScrollbar; }),] }] },
        { type: Object, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"],] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
    ]; };
    return NgScrollbarHorizontal;
}(NgScrollbarThumb));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgScrollbarModule = /** @class */ (function () {
    function NgScrollbarModule() {
    }
    NgScrollbarModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                        _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_4__["ScrollingModule"],
                        _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__["LayoutModule"],
                        SmoothScrollModule
                    ],
                    declarations: [
                        NgScrollbar,
                        NgScrollbarVertical,
                        NgScrollbarHorizontal
                    ],
                    exports: [
                        NgScrollbar
                    ]
                },] }
    ];
    return NgScrollbarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNjcm9sbGJhci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXNjcm9sbGJhci9zbW9vdGgtc2Nyb2xsL3Ntb290aC1zY3JvbGwudHMiLCJuZzovL25neC1zY3JvbGxiYXIvc21vb3RoLXNjcm9sbC9zbW9vdGgtc2Nyb2xsLm1vZHVsZS50cyIsIm5nOi8vbmd4LXNjcm9sbGJhci9zY3JvbGxiYXIvbmctc2Nyb2xsYmFyLnRzIiwibmc6Ly9uZ3gtc2Nyb2xsYmFyL3Njcm9sbGJhci9uZy1zY3JvbGxiYXItdGh1bWIudHMiLCJuZzovL25neC1zY3JvbGxiYXIvc2Nyb2xsYmFyL25nLXNjcm9sbGJhci12ZXJ0aWNhbC50cyIsIm5nOi8vbmd4LXNjcm9sbGJhci9zY3JvbGxiYXIvbmctc2Nyb2xsYmFyLWhvcml6b250YWwudHMiLCJuZzovL25neC1zY3JvbGxiYXIvc2Nyb2xsYmFyL25nLXNjcm9sbGJhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgc3VwcG9ydHNTY3JvbGxCZWhhdmlvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb20sIG9mLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xyXG5cclxuZXhwb3J0IHR5cGUgU21vb3RoU2Nyb2xsRWFzZUZ1bmMgPSAodDogbnVtYmVyLCBzOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyKSA9PiBudW1iZXI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNtb290aFNjcm9sbE9wdGlvbnMge1xyXG4gIHRvcD86IG51bWJlcjtcclxuICBsZWZ0PzogbnVtYmVyO1xyXG4gIG9mZnNldFRvcDogbnVtYmVyO1xyXG4gIG9mZnNldExlZnQ6IG51bWJlcjtcclxuICBkdXJhdGlvbjogbnVtYmVyO1xyXG4gIHNjcm9sbEZ1bmM6ICh0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyKSA9PiB2b2lkO1xyXG4gIGVhc2VGdW5jOiBTbW9vdGhTY3JvbGxFYXNlRnVuYztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTY3JvbGxUb09wdGlvbnMge1xyXG4gIHRvcD86IG51bWJlcjtcclxuICBsZWZ0PzogbnVtYmVyO1xyXG4gIGR1cmF0aW9uPzogbnVtYmVyO1xyXG4gIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmM7XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3Ntb290aFNjcm9sbF0sIFtzbW9vdGgtc2Nyb2xsXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNtb290aFNjcm9sbCB7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgdmlldzogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtOiBPYmplY3QsXHJcbiAgICAgICAgICAgICAgZWw6IEVsZW1lbnRSZWYpIHtcclxuICAgIHRoaXMudmlldyA9IGVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNjcm9sbEZ1bmMobGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcikge1xyXG4gICAgaWYgKHN1cHBvcnRzU2Nyb2xsQmVoYXZpb3IoKSkge1xyXG4gICAgICB0aGlzLnZpZXcuc2Nyb2xsVG8oe3RvcCwgbGVmdH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52aWV3LnNjcm9sbFRvcCA9IHRvcDtcclxuICAgICAgdGhpcy52aWV3LnNjcm9sbExlZnQgPSBsZWZ0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2Nyb2xsVG8ob3B0aW9uczogU2Nyb2xsVG9PcHRpb25zKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICAvLyBBdm9pZCBTU1IgZXJyb3JcclxuICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybSkpIHtcclxuICAgICAgY29uc3Qgc2Nyb2xsRnVuYyA9IChsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgaWYgKHN1cHBvcnRzU2Nyb2xsQmVoYXZpb3IoKSkge1xyXG4gICAgICAgICAgdGhpcy52aWV3LnNjcm9sbFRvKHt0b3AsIGxlZnR9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52aWV3LnNjcm9sbFRvcCA9IHRvcDtcclxuICAgICAgICAgIHRoaXMudmlldy5zY3JvbGxMZWZ0ID0gbGVmdDtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIGlmIChvcHRpb25zLmR1cmF0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgc21vb3RoU2Nyb2xsT3B0aW9uczogU21vb3RoU2Nyb2xsT3B0aW9ucyA9IHtcclxuICAgICAgICAgIHRvcDogb3B0aW9ucy50b3AsXHJcbiAgICAgICAgICBsZWZ0OiBvcHRpb25zLmxlZnQsXHJcbiAgICAgICAgICBkdXJhdGlvbjogb3B0aW9ucy5kdXJhdGlvbixcclxuICAgICAgICAgIGVhc2VGdW5jOiBvcHRpb25zLmVhc2VGdW5jIHx8IGVhc2VJbk91dFF1YWQsXHJcbiAgICAgICAgICBvZmZzZXRUb3A6IHRoaXMudmlldy5zY3JvbGxUb3AsXHJcbiAgICAgICAgICBvZmZzZXRMZWZ0OiB0aGlzLnZpZXcuc2Nyb2xsTGVmdCxcclxuICAgICAgICAgIHNjcm9sbEZ1bmNcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBmcm9tKHNtb290aFNjcm9sbChzbW9vdGhTY3JvbGxPcHRpb25zKSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zY3JvbGxGdW5jKG9wdGlvbnMubGVmdCwgb3B0aW9ucy50b3ApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9mPHZvaWQ+KCk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb0VsZW1lbnQoc2VsZWN0b3I6IHN0cmluZywgb2Zmc2V0ID0gMCwgZHVyYXRpb24/OiBudW1iZXIsIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIGNvbnN0IHRhcmdldDogSFRNTEVsZW1lbnQgPSB0aGlzLnZpZXcucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICByZXR1cm4gdGFyZ2V0ID8gdGhpcy5zY3JvbGxUbyh7bGVmdDogdGFyZ2V0Lm9mZnNldExlZnQsIHRvcDogdGFyZ2V0Lm9mZnNldFRvcCAtIG9mZnNldCwgZHVyYXRpb24sIGVhc2VGdW5jfSkgOiBvZjx2b2lkPigpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsWFRvKGxlZnQ6IG51bWJlciwgZHVyYXRpb24/OiBudW1iZXIsIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNjcm9sbFRvKHtsZWZ0LCBkdXJhdGlvbiwgZWFzZUZ1bmN9KTtcclxuICB9XHJcblxyXG4gIHNjcm9sbFlUbyh0b3A6IG51bWJlciwgZHVyYXRpb24/OiBudW1iZXIsIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNjcm9sbFRvKHt0b3AsIGR1cmF0aW9uLCBlYXNlRnVuY30pO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsVG9Ub3AoZHVyYXRpb24/OiBudW1iZXIsIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNjcm9sbFlUbygwLCBkdXJhdGlvbiwgZWFzZUZ1bmMpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsVG9Cb3R0b20oZHVyYXRpb24/OiBudW1iZXIsIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNjcm9sbFlUbyh0aGlzLnZpZXcuc2Nyb2xsSGVpZ2h0IC0gdGhpcy52aWV3LmNsaWVudEhlaWdodCwgZHVyYXRpb24sIGVhc2VGdW5jKTtcclxuICB9XHJcblxyXG4gIHNjcm9sbFRvUmlnaHQoZHVyYXRpb24/OiBudW1iZXIsIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNjcm9sbFhUbyh0aGlzLnZpZXcuc2Nyb2xsV2lkdGgsIGR1cmF0aW9uLCBlYXNlRnVuYyk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb0xlZnQoZHVyYXRpb24/OiBudW1iZXIsIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNjcm9sbFhUbygwLCBkdXJhdGlvbiwgZWFzZUZ1bmMpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNtb290aFNjcm9sbChvcHRpb25zOiBTbW9vdGhTY3JvbGxPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuICAgIGNvbnN0IGluY3JlbWVudCA9IDEwO1xyXG4gICAgbGV0IHZhbFggPSBvcHRpb25zLm9mZnNldExlZnQ7XHJcbiAgICBsZXQgdmFsWSA9IG9wdGlvbnMub2Zmc2V0VG9wO1xyXG5cclxuICAgIGNvbnN0IGFuaW1hdGVTY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgIC8vIGluY3JlbWVudCB0aGUgdGltZVxyXG4gICAgICBjdXJyZW50VGltZSArPSBpbmNyZW1lbnQ7XHJcbiAgICAgIC8vIGZpbmQgdGhlIHZhbHVlIHdpdGggdGhlIGVhc2luZyBmdW5jdGlvblxyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjb25zdCBkZWx0YVggPSBvcHRpb25zLmxlZnQgLSBvcHRpb25zLm9mZnNldExlZnQ7XHJcbiAgICAgICAgdmFsWCA9IG9wdGlvbnMuZWFzZUZ1bmMoY3VycmVudFRpbWUsIG9wdGlvbnMub2Zmc2V0TGVmdCwgZGVsdGFYLCBvcHRpb25zLmR1cmF0aW9uKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMudG9wICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbnN0IGRlbHRhWSA9IG9wdGlvbnMudG9wIC0gb3B0aW9ucy5vZmZzZXRUb3A7XHJcbiAgICAgICAgdmFsWSA9IG9wdGlvbnMuZWFzZUZ1bmMoY3VycmVudFRpbWUsIG9wdGlvbnMub2Zmc2V0VG9wLCBkZWx0YVksIG9wdGlvbnMuZHVyYXRpb24pO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIHNjcm9sbCB0byBwb3NpdGlvblxyXG4gICAgICBvcHRpb25zLnNjcm9sbEZ1bmModmFsWCwgdmFsWSk7XHJcbiAgICAgIC8vIGRvIHRoZSBhbmltYXRpb24gdW5sZXNzIGl0cyBvdmVyXHJcbiAgICAgIGlmIChjdXJyZW50VGltZSA8IG9wdGlvbnMuZHVyYXRpb24pIHtcclxuICAgICAgICBhbmltYXRpb25GcmFtZVNjaGVkdWxlci5zY2hlZHVsZShhbmltYXRlU2Nyb2xsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgICBhbmltYXRlU2Nyb2xsKCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIGVhc2luZyBmdW5jdGlvbnMgaHR0cDovL2dvby5nbC81SExsOFxyXG5leHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0OiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIpIHtcclxuICB0IC89IGQgLyAyO1xyXG4gIGlmICh0IDwgMSkge1xyXG4gICAgcmV0dXJuIChjIC8gMikgKiB0ICogdCArIGI7XHJcbiAgfVxyXG4gIHQtLTtcclxuICByZXR1cm4gKC1jIC8gMikgKiAodCAqICh0IC0gMikgLSAxKSArIGI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBlYXNlSW5DdWJpYyh0OiBudW1iZXIsIGI6IG51bWJlciwgYzogbnVtYmVyLCBkOiBudW1iZXIpIHtcclxuICBjb25zdCB0YyA9ICh0IC89IGQpICogdCAqIHQ7XHJcbiAgcmV0dXJuIGIgKyBjICogdGM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbk91dFF1aW50aWModDogbnVtYmVyLCBiOiBudW1iZXIsIGM6IG51bWJlciwgZDogbnVtYmVyKSB7XHJcbiAgY29uc3QgdHMgPSAodCAvPSBkKSAqIHQsXHJcbiAgICB0YyA9IHRzICogdDtcclxuICByZXR1cm4gYiArIGMgKiAoNiAqIHRjICogdHMgKyAtMTUgKiB0cyAqIHRzICsgMTAgKiB0Yyk7XHJcbn1cclxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XHJcbmltcG9ydCB7IFNtb290aFNjcm9sbCB9IGZyb20gJy4vc21vb3RoLXNjcm9sbCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtTY3JvbGxpbmdNb2R1bGVdLFxyXG4gIGRlY2xhcmF0aW9uczogW1Ntb290aFNjcm9sbF0sXHJcbiAgZXhwb3J0czogW1Ntb290aFNjcm9sbF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNtb290aFNjcm9sbE1vZHVsZSB7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIFZpZXdDaGlsZCxcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIE9uRGVzdHJveSxcclxuICBFbGVtZW50UmVmLFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIFBMQVRGT1JNX0lEXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQ2RrU2Nyb2xsYWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG5pbXBvcnQgeyBCcmVha3BvaW50T2JzZXJ2ZXIsIEJyZWFrcG9pbnRzLCBCcmVha3BvaW50U3RhdGUgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgQmVoYXZpb3JTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWFwLCB0YXAsIHRocm90dGxlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU21vb3RoU2Nyb2xsLCBTbW9vdGhTY3JvbGxFYXNlRnVuYyB9IGZyb20gJy4uL3Ntb290aC1zY3JvbGwvc21vb3RoLXNjcm9sbCc7XHJcblxyXG5pbnRlcmZhY2UgTmdTY3JvbGxiYXJTdGF0ZSB7XHJcbiAgdmlld1N0eWxlPzoge1xyXG4gICAgd2lkdGg/OiBzdHJpbmc7XHJcbiAgICBoZWlnaHQ/OiBzdHJpbmc7XHJcbiAgICBwYWRkaW5nUmlnaHQ/OiBzdHJpbmc7XHJcbiAgICBwYWRkaW5nQm90dG9tPzogc3RyaW5nO1xyXG4gIH07XHJcbiAgZGlzcGxheVg/OiBib29sZWFuO1xyXG4gIGRpc3BsYXlZPzogYm9vbGVhbjtcclxufVxyXG5cclxuY29uc3QgZGVmYXVsdFN0YXRlOiBOZ1Njcm9sbGJhclN0YXRlID0ge1xyXG4gIHZpZXdTdHlsZToge1xyXG4gICAgcGFkZGluZ1JpZ2h0OiAnMCcsXHJcbiAgICBwYWRkaW5nQm90dG9tOiAnMCcsXHJcbiAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgaGVpZ2h0OiAnMTAwJSdcclxuICB9LFxyXG4gIGRpc3BsYXlYOiBmYWxzZSxcclxuICBkaXNwbGF5WTogZmFsc2VcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctc2Nyb2xsYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJ25nLXNjcm9sbGJhci5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnbmctc2Nyb2xsYmFyLnNjc3MnXSxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICBob3N0OiB7XHJcbiAgICAnW2F0dHIudHJhY2tYXSc6ICd0cmFja1gnLFxyXG4gICAgJ1thdHRyLnRyYWNrWV0nOiAndHJhY2tZJyxcclxuICAgICdbY2xhc3Mubmctc2Nyb2xsYmFyLWF1dG8taGlkZV0nOiAnYXV0b0hpZGUnXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdTY3JvbGxiYXIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKiogSG9yaXpvbnRhbCBjdXN0b20gc2Nyb2xsYmFyICovXHJcbiAgQElucHV0KCkgdHJhY2tYID0gZmFsc2U7XHJcbiAgLyoqIFZlcnRpY2FsIGN1c3RvbSBTY3JvbGxiYXIgKi9cclxuICBASW5wdXQoKSB0cmFja1kgPSB0cnVlO1xyXG4gIC8qKiBBdXRvIGhpZGUgc2Nyb2xsYmFycyBvbiBtb3VzZSBsZWF2ZSAqL1xyXG4gIEBJbnB1dCgpIGF1dG9IaWRlID0gZmFsc2U7XHJcbiAgLyoqIEF1dG8gdXBkYXRlIHNjcm9sbGJhcnMgb24gY29udGVudCBjaGFuZ2VzIChNdXRhdGlvbiBPYnNlcnZlcikgKi9cclxuICBASW5wdXQoKSBhdXRvVXBkYXRlID0gdHJ1ZTtcclxuICAvKiogVmlld3BvcnQgY2xhc3MgKi9cclxuICBASW5wdXQoKSB2aWV3Q2xhc3M6IHN0cmluZztcclxuICAvKiogU2Nyb2xsYmFycyBjbGFzcyAqL1xyXG4gIEBJbnB1dCgpIGJhckNsYXNzOiBzdHJpbmc7XHJcbiAgLyoqIFNjcm9sbGJhcnMgdGh1bWJuYWlscyBjbGFzcyAqL1xyXG4gIEBJbnB1dCgpIHRodW1iQ2xhc3M6IHN0cmluZztcclxuICAvKiogVGhlIHNtb290aCBzY3JvbGwgZHVyYXRpb24gd2hlbiBhIHNjcm9sbGJhciBpcyBjbGlja2VkICovXHJcbiAgQElucHV0KCkgc2Nyb2xsVG9EdXJhdGlvbiA9IDMwMDtcclxuICAvKiogVXNlIG92ZXJsYXkgc2Nyb2xsYmFycyAqL1xyXG4gIEBJbnB1dCgpIG92ZXJsYXk6IGJvb2xlYW47XHJcbiAgLyoqIERpc2FibGUgY3VzdG9tIHNjcm9sbGJhcnMgb24gc3BlY2lmaWMgYnJlYWtwb2ludHMgKi9cclxuICBASW5wdXQoKSBkaXNhYmxlT25CcmVha3BvaW50cyA9IFtcclxuICAgIEJyZWFrcG9pbnRzLkhhbmRzZXRMYW5kc2NhcGUsXHJcbiAgICBCcmVha3BvaW50cy5IYW5kc2V0UG9ydHJhaXRcclxuICBdO1xyXG5cclxuICAvKiogRGlzYWJsZSBjdXN0b20gc2Nyb2xsYmFycyBhbmQgc3dpdGNoIGJhY2sgdG8gbmF0aXZlIHNjcm9sbGJhcnMgKi9cclxuICBASW5wdXQoJ2Rpc2FibGVkJylcclxuICBnZXQgZGlzYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBzZXQgZGlzYWJsZWQoZGlzYWJsZTogYm9vbGVhbikge1xyXG4gICAgZGlzYWJsZSA/IHRoaXMuZGlzYWJsZSgpIDogdGhpcy5lbmFibGUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gIEBWaWV3Q2hpbGQoQ2RrU2Nyb2xsYWJsZSkgc2Nyb2xsYWJsZTogQ2RrU2Nyb2xsYWJsZTtcclxuICBAVmlld0NoaWxkKFNtb290aFNjcm9sbCkgc21vb3RoU2Nyb2xsOiBTbW9vdGhTY3JvbGw7XHJcbiAgQFZpZXdDaGlsZCgndmVydGljYWwnLCB7cmVhZDogRWxlbWVudFJlZn0pIHZlcnRpY2FsU2Nyb2xsYmFyOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2hvcml6b250YWwnLCB7cmVhZDogRWxlbWVudFJlZn0pIGhvcml6b250YWxTY3JvbGxiYXI6IEVsZW1lbnRSZWY7XHJcblxyXG4gIC8qKiBOYXRpdmUgc2Nyb2xsYmFyIHNpemUgKi9cclxuICBwcml2YXRlIF9uYXRpdmVTY3JvbGxiYXJTaXplOiBzdHJpbmc7XHJcblxyXG4gIC8qKiBTY3JvbGxiYXIgc3RhdGUgKi9cclxuICBwcml2YXRlIF9zdGF0ZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TmdTY3JvbGxiYXJTdGF0ZT4oZGVmYXVsdFN0YXRlKTtcclxuICB2aWV3U3R5bGU6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX3N0YXRlLnBpcGUobWFwKChzdGF0ZTogTmdTY3JvbGxiYXJTdGF0ZSkgPT4gc3RhdGUudmlld1N0eWxlKSk7XHJcbiAgZGlzcGxheVg6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9zdGF0ZS5waXBlKG1hcCgoc3RhdGU6IE5nU2Nyb2xsYmFyU3RhdGUpID0+IHN0YXRlLmRpc3BsYXlYKSk7XHJcbiAgZGlzcGxheVk6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLl9zdGF0ZS5waXBlKG1hcCgoc3RhdGU6IE5nU2Nyb2xsYmFyU3RhdGUpID0+IHN0YXRlLmRpc3BsYXlZKSk7XHJcblxyXG4gIC8qKiBNdXRhdGlvbiBvYnNlcnZlciBzdWJzY3JpcHRpb24gKi9cclxuICBwcml2YXRlIF91cGRhdGVPYnNlcnZlclN1YiQgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcbiAgLyoqIENESyBicmVha3BvaW50IHN1YnNjcmlwdGlvbiAqL1xyXG4gIHByaXZhdGUgX2JyZWFrcG9pbnRTdWIkID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xyXG4gIC8qKiBWaWV3cG9ydCBFbGVtZW50ICovXHJcbiAgdmlldzogSFRNTEVsZW1lbnQ7XHJcbiAgLyoqIE9ic2VydmUgY29udGVudCBjaGFuZ2VzICovXHJcbiAgcHJpdmF0ZSBfb2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXI7XHJcblxyXG4gIC8qKiBTdGVhbSB0aGF0IGVtaXRzIHdoZW4gc2Nyb2xsYmFyIHRodW1ibmFpbCBuZWVkcyB0byB1cGRhdGUgKGZvciBpbnRlcm5hbCB1c2VzKSAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZU9ic2VydmVyID0gbmV3IFN1YmplY3QoKTtcclxuICB1cGRhdGVPYnNlcnZlciA9IHRoaXMuX3VwZGF0ZU9ic2VydmVyLmFzT2JzZXJ2YWJsZSgpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgX3BsYXRmb3JtOiBPYmplY3QpIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMudmlldyA9IHRoaXMuc2Nyb2xsYWJsZS5nZXRFbGVtZW50UmVmKCkubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgaWYgKHRoaXMuZGlzYWJsZU9uQnJlYWtwb2ludHMpIHtcclxuICAgICAgICAvLyBFbmFibGUvRGlzYWJsZSBjdXN0b20gc2Nyb2xsYmFyIG9uIGJyZWFrcG9pbnRzIChVc2VkIHRvIGRpc2FibGUgc2Nyb2xsYmFycyBvbiBtb2JpbGUgcGhvbmVzKVxyXG4gICAgICAgIHRoaXMuX2JyZWFrcG9pbnRTdWIkID0gdGhpcy5icmVha3BvaW50T2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmRpc2FibGVPbkJyZWFrcG9pbnRzKS5waXBlKFxyXG4gICAgICAgICAgdGFwKChyZXN1bHQ6IEJyZWFrcG9pbnRTdGF0ZSkgPT4gcmVzdWx0Lm1hdGNoZXMgPyB0aGlzLmRpc2FibGUoKSA6IHRoaXMuZW5hYmxlKCkpXHJcbiAgICAgICAgKS5zdWJzY3JpYmUoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmVuYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVXBkYXRlIHN0YXRlIG9uIGNvbnRlbnQgY2hhbmdlc1xyXG4gICAgdGhpcy5fdXBkYXRlT2JzZXJ2ZXJTdWIkID0gdGhpcy51cGRhdGVPYnNlcnZlci5waXBlKFxyXG4gICAgICB0aHJvdHRsZVRpbWUoMjAwKSxcclxuICAgICAgdGFwKCgpID0+IHRoaXMudXBkYXRlU3RhdGUoKSlcclxuICAgICkuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMuX2JyZWFrcG9pbnRTdWIkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl91cGRhdGVPYnNlcnZlclN1YiQudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmICh0aGlzLl9vYnNlcnZlcikge1xyXG4gICAgICB0aGlzLl9vYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgc2Nyb2xsYmFyIHRodW1ibmFpbCBwb3NpdGlvblxyXG4gICAqL1xyXG4gIHVwZGF0ZSgpIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICB0aGlzLl91cGRhdGVPYnNlcnZlci5uZXh0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgY3VzdG9tIHNjcm9sbGJhclxyXG4gICAqL1xyXG4gIGVuYWJsZSgpIHtcclxuICAgIGlmICh0aGlzLnZpZXcpIHtcclxuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgLy8gSGlkZSBuYXRpdmUgc2Nyb2xsYmFyc1xyXG4gICAgICB0aGlzLl9uYXRpdmVTY3JvbGxiYXJTaXplID0gYCR7dGhpcy52aWV3Lm9mZnNldFdpZHRoIC0gdGhpcy52aWV3LmNsaWVudFdpZHRoICsgMX1weGA7XHJcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmF1dG9VcGRhdGUgJiYgaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm0pKSB7XHJcbiAgICAgICAgLy8gT2JzZXJ2ZSBjb250ZW50IGNoYW5nZXNcclxuICAgICAgICB0aGlzLl9vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHRoaXMudXBkYXRlKCkpO1xyXG4gICAgICAgIHRoaXMuX29ic2VydmVyLm9ic2VydmUodGhpcy52aWV3LCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERpc2FibGUgY3VzdG9tIHNjcm9sbGJhclxyXG4gICAqL1xyXG4gIGRpc2FibGUoKSB7XHJcbiAgICB0aGlzLl9kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAvLyBSZXNldCBhbmQgYnJpbmcgYmFjayBuYXRpdmUgc2Nyb2xsYmFyc1xyXG4gICAgdGhpcy5fc3RhdGUubmV4dChkZWZhdWx0U3RhdGUpO1xyXG4gICAgaWYgKHRoaXMuX29ic2VydmVyKSB7XHJcbiAgICAgIHRoaXMuX29ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNjcm9sbFRvKG9wdGlvbnM6IFNjcm9sbFRvT3B0aW9ucyk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc21vb3RoU2Nyb2xsLnNjcm9sbFRvKG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsVG9FbGVtZW50KHNlbGVjdG9yOiBzdHJpbmcsIG9mZnNldCA9IDAsIGR1cmF0aW9uPzogbnVtYmVyLCBlYXNlRnVuYz86IFNtb290aFNjcm9sbEVhc2VGdW5jKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zbW9vdGhTY3JvbGwuc2Nyb2xsVG9FbGVtZW50KHNlbGVjdG9yLCBvZmZzZXQsIGR1cmF0aW9uLCBlYXNlRnVuYyk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxYVG8odG86IG51bWJlciwgZHVyYXRpb24/OiBudW1iZXIsIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNtb290aFNjcm9sbC5zY3JvbGxYVG8odG8sIGR1cmF0aW9uLCBlYXNlRnVuYyk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxZVG8odG86IG51bWJlciwgZHVyYXRpb24/OiBudW1iZXIsIGVhc2VGdW5jPzogU21vb3RoU2Nyb2xsRWFzZUZ1bmMpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcclxuICAgIHJldHVybiB0aGlzLnNtb290aFNjcm9sbC5zY3JvbGxZVG8odG8sIGR1cmF0aW9uLCBlYXNlRnVuYyk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb1RvcChkdXJhdGlvbj86IG51bWJlciwgZWFzZUZ1bmM/OiBTbW9vdGhTY3JvbGxFYXNlRnVuYyk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc21vb3RoU2Nyb2xsLnNjcm9sbFRvVG9wKGR1cmF0aW9uLCBlYXNlRnVuYyk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb0JvdHRvbShkdXJhdGlvbj86IG51bWJlciwgZWFzZUZ1bmM/OiBTbW9vdGhTY3JvbGxFYXNlRnVuYyk6IE9ic2VydmFibGU8dm9pZD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc21vb3RoU2Nyb2xsLnNjcm9sbFRvQm90dG9tKGR1cmF0aW9uLCBlYXNlRnVuYyk7XHJcbiAgfVxyXG5cclxuICBzY3JvbGxUb1JpZ2h0KGR1cmF0aW9uPzogbnVtYmVyLCBlYXNlRnVuYz86IFNtb290aFNjcm9sbEVhc2VGdW5jKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zbW9vdGhTY3JvbGwuc2Nyb2xsVG9SaWdodChkdXJhdGlvbiwgZWFzZUZ1bmMpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsVG9MZWZ0KGR1cmF0aW9uPzogbnVtYmVyLCBlYXNlRnVuYz86IFNtb290aFNjcm9sbEVhc2VGdW5jKTogT2JzZXJ2YWJsZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gdGhpcy5zbW9vdGhTY3JvbGwuc2Nyb2xsVG9MZWZ0KGR1cmF0aW9uLCBlYXNlRnVuYyk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZVN0YXRlKCkge1xyXG4gICAgbGV0IHBhZGRpbmdCb3R0b20gPSAnMCcsIHBhZGRpbmdSaWdodCA9ICcwJywgZGlzcGxheVkgPSBmYWxzZSwgZGlzcGxheVggPSBmYWxzZTtcclxuICAgIGNvbnN0IHNpemUgPSBgY2FsYygxMDAlICsgJHt0aGlzLl9uYXRpdmVTY3JvbGxiYXJTaXplfSlgO1xyXG4gICAgaWYgKHRoaXMudHJhY2tZKSB7XHJcbiAgICAgIC8vIENoZWNrIGlmIHZlcnRpY2FsIHNjcm9sbGJhciBzaG91bGQgYmUgZGlzcGxheWVkXHJcbiAgICAgIGlmICh0aGlzLnZpZXcuc2Nyb2xsSGVpZ2h0ID4gdGhpcy52aWV3LmNsaWVudEhlaWdodCkge1xyXG4gICAgICAgIGRpc3BsYXlZID0gdHJ1ZTtcclxuICAgICAgICBwYWRkaW5nUmlnaHQgPSB0aGlzLm92ZXJsYXkgPyAnMCcgOiB0aGlzLl9uYXRpdmVTY3JvbGxiYXJTaXplO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy50cmFja1gpIHtcclxuICAgICAgLy8gQ2hlY2sgaWYgaG9yaXpvbnRhbCBzY3JvbGxiYXIgc2hvdWxkIGJlIGRpc3BsYXllZFxyXG4gICAgICBpZiAodGhpcy52aWV3LnNjcm9sbFdpZHRoID4gdGhpcy52aWV3LmNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgZGlzcGxheVggPSB0cnVlO1xyXG4gICAgICAgIHBhZGRpbmdCb3R0b20gPSB0aGlzLm92ZXJsYXkgPyAnMCcgOiB0aGlzLl9uYXRpdmVTY3JvbGxiYXJTaXplO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zdGF0ZS5uZXh0KHtcclxuICAgICAgdmlld1N0eWxlOiB7XHJcbiAgICAgICAgd2lkdGg6IHNpemUsXHJcbiAgICAgICAgaGVpZ2h0OiBzaXplLFxyXG4gICAgICAgIHBhZGRpbmdCb3R0b20sXHJcbiAgICAgICAgcGFkZGluZ1JpZ2h0XHJcbiAgICAgIH0sXHJcbiAgICAgIGRpc3BsYXlYLFxyXG4gICAgICBkaXNwbGF5WVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIElucHV0LCBWaWV3Q2hpbGQsIE5nWm9uZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgdGhyb3R0bGVUaW1lLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5nU2Nyb2xsYmFyIH0gZnJvbSAnLi9uZy1zY3JvbGxiYXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5nU2Nyb2xsYmFyVGh1bWIgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG5cclxuICAvKiogU2Nyb2xsYmFyIGNsYXNzICovXHJcbiAgQElucHV0KCkgYmFyQ2xhc3M6IHN0cmluZztcclxuICAvKiogU2Nyb2xsYmFyIHRodW1ibmFpbCBjbGFzcyAqL1xyXG4gIEBJbnB1dCgpIHRodW1iQ2xhc3M6IHN0cmluZztcclxuICAvKiogVGhlIHNjcm9sbCBkdXJhdGlvbiB3aGVuIHNjcm9sbGJhciAobm90IHRoZSB0aHVtYm5haWwpIGlzIGNsaWNrZWQgKi9cclxuICBASW5wdXQoKSBzY3JvbGxUb0R1cmF0aW9uOiBudW1iZXI7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2JhcicpIGJhcjogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCd0aHVtYicpIHRodW1iOiBFbGVtZW50UmVmO1xyXG5cclxuICBwcm90ZWN0ZWQgX21pblRodW1iU2l6ZSA9IDIwO1xyXG4gIHByb3RlY3RlZCBfbmF0dXJhbFRodW1iU2l6ZSA9IDA7XHJcbiAgcHJvdGVjdGVkIF90aHVtYlNpemUgPSAwO1xyXG4gIHByb3RlY3RlZCBfdHJhY2tNYXggPSAwO1xyXG4gIHByb3RlY3RlZCBfc2Nyb2xsTWF4ID0gMDtcclxuICBwcm90ZWN0ZWQgX2N1cnJQb3MgPSAwO1xyXG4gIHByb3RlY3RlZCBfc2Nyb2xsJCA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcclxuICBwcm90ZWN0ZWQgX3RodW1iRHJhZyQgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcbiAgcHJvdGVjdGVkIF91cGRhdGVPYnNlcnZlciQgPSBTdWJzY3JpcHRpb24uRU1QVFk7XHJcbiAgcHJvdGVjdGVkIF92aWV3OiBIVE1MRWxlbWVudDtcclxuICBwcm90ZWN0ZWQgX3N0YXRlID0gbmV3IEJlaGF2aW9yU3ViamVjdDxhbnk+KHtcclxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsIDAsIDApJ1xyXG4gIH0pO1xyXG5cclxuICAvKiogU2Nyb2xsYmFyIHN0eWxlcyAqL1xyXG4gIHJlYWRvbmx5IHNjcm9sbGJhclN0eWxlID0gdGhpcy5fc3RhdGUuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIGdldCB0aHVtYlNpemUoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9wYXJlbnQ6IE5nU2Nyb2xsYmFyLFxyXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBfcGxhdGZvcm06IE9iamVjdCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3pvbmU6IE5nWm9uZSkge1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgLy8gQXZvaWQgU1NSIEVycm9yXHJcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm0pKSB7XHJcbiAgICAgIHRoaXMuX3ZpZXcgPSB0aGlzLl9wYXJlbnQuc2Nyb2xsYWJsZS5nZXRFbGVtZW50UmVmKCkubmF0aXZlRWxlbWVudDtcclxuICAgICAgLy8gU3RhcnQgdmlldyBzY3JvbGwgZXZlbnRcclxuICAgICAgdGhpcy5fc2Nyb2xsJCA9IHRoaXMuX3BhcmVudC5zY3JvbGxhYmxlLmVsZW1lbnRTY3JvbGxlZCgpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnVwZGF0ZVNjcm9sbGJhcigpKTtcclxuXHJcbiAgICAgIC8vIFN0YXJ0IHNjcm9sbGJhciB0aHVtYm5haWwgZHJhZyBldmVudHNcclxuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PlxyXG4gICAgICAgIHRoaXMuX3RodW1iRHJhZyQgPSB0aGlzLnN0YXJ0VGh1bWJFdmVudHMoKS5zdWJzY3JpYmUoKVxyXG4gICAgICApO1xyXG5cclxuICAgICAgLy8gVXBkYXRlIHNjcm9sbGJhciB0aHVtYm5haWwgc2l6ZSBvbiBjb250ZW50IGNoYW5nZXNcclxuICAgICAgdGhpcy5fdXBkYXRlT2JzZXJ2ZXIkID0gdGhpcy5fcGFyZW50LnVwZGF0ZU9ic2VydmVyLnBpcGUoXHJcbiAgICAgICAgdGhyb3R0bGVUaW1lKDIwMCksXHJcbiAgICAgICAgdGFwKCgpID0+IHRoaXMudXBkYXRlU2Nyb2xsYmFyKCkpLFxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSBzY3JvbGxiYXIgdGh1bWJuYWlsIHBvc2l0aW9uIGlzIGNvcnJlY3QgYWZ0ZXIgdGhlIG5ldyBjb250ZW50IGlzIHJlbmRlcmVkXHJcbiAgICAgICAgZGVib3VuY2VUaW1lKDIwMCksXHJcbiAgICAgICAgdGFwKCgpID0+IHRoaXMudXBkYXRlU2Nyb2xsYmFyKCkpLFxyXG4gICAgICApLnN1YnNjcmliZSgpO1xyXG5cclxuICAgICAgLy8gSW5pdGlhbGl6ZSBzY3JvbGxiYXJcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZVNjcm9sbGJhcigpLCAyMDApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl9zY3JvbGwkLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl90aHVtYkRyYWckLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl91cGRhdGVPYnNlcnZlciQudW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjcm9sbGJhciBjbGlja1xyXG4gICAqIEBwYXJhbSBlIE1vdXNlIGV2ZW50XHJcbiAgICovXHJcbiAgb25TY3JvbGxiYXJIb2xkZXJDbGljayhlOiBhbnkpIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBzY3JvbGxiYXJcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgdXBkYXRlU2Nyb2xsYmFyKCkge1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgdmVydGljYWwgdGh1bWIgd29ya2VyXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHN0YXJ0VGh1bWJFdmVudHMoKTogT2JzZXJ2YWJsZTxhbnk+IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgc2Nyb2xsYmFyIHRodW1iIHNpemVcclxuICAgKiBAcGFyYW0gbmF0dXJhbFRodW1iU2l6ZVxyXG4gICAqIEBwYXJhbSBzY3JvbGxNYXhcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgc2Nyb2xsQm91bmRhcmllcyhuYXR1cmFsVGh1bWJTaXplOiBudW1iZXIsIHNjcm9sbE1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiAobmF0dXJhbFRodW1iU2l6ZSA8IHRoaXMuX21pblRodW1iU2l6ZSkgPyB0aGlzLl9taW5UaHVtYlNpemUgOiBzY3JvbGxNYXggPyBuYXR1cmFsVGh1bWJTaXplIDogMDtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCB1cGRhdGVTdGF0ZShzdGF0ZTogYW55KSB7XHJcbiAgICB0aGlzLl9zdGF0ZS5uZXh0KHsuLi50aGlzLl9zdGF0ZS52YWx1ZSwgLi4uc3RhdGV9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE5nWm9uZSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIGZvcndhcmRSZWYsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBtZXJnZU1hcCwgcGx1Y2ssIHRha2VVbnRpbCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBOZ1Njcm9sbGJhciB9IGZyb20gJy4vbmctc2Nyb2xsYmFyJztcclxuaW1wb3J0IHsgTmdTY3JvbGxiYXJUaHVtYiB9IGZyb20gJy4vbmctc2Nyb2xsYmFyLXRodW1iJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbmctc2Nyb2xsYmFyLXZlcnRpY2FsJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAjYmFyIGNsYXNzPVwibmctc2Nyb2xsYmFyIG5nLXNjcm9sbGJhci12ZXJ0aWNhbCB7e2JhckNsYXNzfX1cIiAobW91c2Vkb3duKT1cIm9uU2Nyb2xsYmFySG9sZGVyQ2xpY2soJGV2ZW50KVwiPlxyXG4gICAgICA8ZGl2ICN0aHVtYiBjbGFzcz1cIm5nLXNjcm9sbGJhci10aHVtYiB7e3RodW1iQ2xhc3N9fVwiIFtuZ1N0eWxlXT1cInNjcm9sbGJhclN0eWxlIHwgYXN5bmNcIj48L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nU2Nyb2xsYmFyVmVydGljYWwgZXh0ZW5kcyBOZ1Njcm9sbGJhclRodW1iIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlIHNjcm9sbGJhciB0aHVtYm5haWwgc2l6ZVxyXG4gICAqL1xyXG4gIGdldCB0aHVtYlNpemUoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGJhckNsaWVudEhlaWdodCA9IHRoaXMuYmFyLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgY29uc3Qgdmlld0NsaWVudEhlaWdodCA9IHRoaXMuX3ZpZXcuY2xpZW50SGVpZ2h0O1xyXG4gICAgY29uc3Qgdmlld1Njcm9sbEhlaWdodCA9IHRoaXMuX3ZpZXcuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgdGhpcy5fbmF0dXJhbFRodW1iU2l6ZSA9IGJhckNsaWVudEhlaWdodCAvIHZpZXdTY3JvbGxIZWlnaHQgKiBiYXJDbGllbnRIZWlnaHQ7XHJcbiAgICB0aGlzLl9zY3JvbGxNYXggPSB2aWV3U2Nyb2xsSGVpZ2h0IC0gdmlld0NsaWVudEhlaWdodDtcclxuICAgIHJldHVybiB0aGlzLnNjcm9sbEJvdW5kYXJpZXModGhpcy5fbmF0dXJhbFRodW1iU2l6ZSwgdGhpcy5fc2Nyb2xsTWF4KTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByb3RlY3RlZCBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgICAgICAgICBASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gTmdTY3JvbGxiYXIpKSBwcm90ZWN0ZWQgX3BhcmVudDogTmdTY3JvbGxiYXIsXHJcbiAgICAgICAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgX3BsYXRmb3JtOiBPYmplY3QsXHJcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIF96b25lOiBOZ1pvbmUpIHtcclxuICAgIHN1cGVyKF9wYXJlbnQsIF9wbGF0Zm9ybSwgX3pvbmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2Nyb2xsYmFyIGNsaWNrXHJcbiAgICogQHBhcmFtIGUgTW91c2UgZXZlbnRcclxuICAgKi9cclxuICBvblNjcm9sbGJhckhvbGRlckNsaWNrKGU6IGFueSkge1xyXG4gICAgaWYgKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgY29uc3Qgb2Zmc2V0WSA9IGUub2Zmc2V0WSAtIHRoaXMuX25hdHVyYWxUaHVtYlNpemUgKiAuNTtcclxuICAgICAgY29uc3QgdGh1bWJQb3NpdGlvblBlcmNlbnRhZ2UgPSBvZmZzZXRZICogMTAwIC8gdGhpcy5iYXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGh1bWJQb3NpdGlvblBlcmNlbnRhZ2UgKiB0aGlzLl92aWV3LnNjcm9sbEhlaWdodCAvIDEwMDtcclxuICAgICAgdGhpcy5fcGFyZW50LnNjcm9sbFRvKHt0b3A6IHZhbHVlLCBkdXJhdGlvbjogdGhpcy5zY3JvbGxUb0R1cmF0aW9ufSBhcyBhbnkpLnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlIHNjcm9sbGJhclxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCB1cGRhdGVTY3JvbGxiYXIoKSB7XHJcbiAgICB0aGlzLl90aHVtYlNpemUgPSB0aGlzLnRodW1iLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgdGhpcy5fdHJhY2tNYXggPSB0aGlzLmJhci5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCAtIHRoaXMuX3RodW1iU2l6ZTtcclxuICAgIHRoaXMuX2N1cnJQb3MgPSB0aGlzLl92aWV3LnNjcm9sbFRvcCAqIHRoaXMuX3RyYWNrTWF4IC8gdGhpcy5fc2Nyb2xsTWF4O1xyXG4gICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBhbmltYXRpb25GcmFtZVNjaGVkdWxlci5zY2hlZHVsZSgoKSA9PlxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHt0aGlzLl9jdXJyUG9zfXB4LCAwKWAsXHJcbiAgICAgICAgICBoZWlnaHQ6IGAke3RoaXMudGh1bWJTaXplfXB4YFxyXG4gICAgICAgIH0pXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0YXJ0IHZlcnRpY2FsIHRodW1iIHdvcmtlclxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBzdGFydFRodW1iRXZlbnRzKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCBtb3VzZURvd24kID0gZnJvbUV2ZW50KHRoaXMudGh1bWIubmF0aXZlRWxlbWVudCwgJ21vdXNlZG93bicpO1xyXG4gICAgY29uc3QgbW91c2VNb3ZlJCA9IGZyb21FdmVudCh0aGlzLl9kb2N1bWVudCwgJ21vdXNlbW92ZScpO1xyXG4gICAgY29uc3QgbW91c2VVcCQgPSBmcm9tRXZlbnQodGhpcy5fZG9jdW1lbnQsICdtb3VzZXVwJykucGlwZShcclxuICAgICAgdGFwKCgpID0+IHRoaXMuX2RvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBudWxsKVxyXG4gICAgKTtcclxuICAgIHJldHVybiBtb3VzZURvd24kLnBpcGUoXHJcbiAgICAgIHRhcCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQub25zZWxlY3RzdGFydCA9ICgpID0+IGZhbHNlO1xyXG4gICAgICAgIC8vIEluaXRpYWxpemUgdHJhY2tNYXggZm9yIGJlZm9yZSBzdGFydCBkcmFnZ2luZ1xyXG4gICAgICAgIHRoaXMuX3RyYWNrTWF4ID0gdGhpcy5iYXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgLSB0aGlzLl90aHVtYlNpemU7XHJcbiAgICAgIH0pLFxyXG4gICAgICBwbHVjaygnb2Zmc2V0WScpLFxyXG4gICAgICBtZXJnZU1hcCgobW91c2VEb3duT2Zmc2V0OiBudW1iZXIpID0+IG1vdXNlTW92ZSQucGlwZShcclxuICAgICAgICB0YWtlVW50aWwobW91c2VVcCQpLFxyXG4gICAgICAgIHBsdWNrKCdjbGllbnRZJyksXHJcbiAgICAgICAgdGFwKChtb3VzZU1vdmVDbGllbnQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IG1vdXNlTW92ZUNsaWVudCAtIHRoaXMuYmFyLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG4gICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9zY3JvbGxNYXggKiAob2Zmc2V0WSAtIG1vdXNlRG93bk9mZnNldCkgLyB0aGlzLl90cmFja01heDtcclxuICAgICAgICAgIHRoaXMuX3BhcmVudC5zY3JvbGxhYmxlLnNjcm9sbFRvKHt0b3A6IHZhbHVlfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBOZ1pvbmUsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBmb3J3YXJkUmVmLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgbWVyZ2VNYXAsIHBsdWNrLCB0YWtlVW50aWwsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgTmdTY3JvbGxiYXIgfSBmcm9tICcuL25nLXNjcm9sbGJhcic7XHJcbmltcG9ydCB7IE5nU2Nyb2xsYmFyVGh1bWIgfSBmcm9tICcuL25nLXNjcm9sbGJhci10aHVtYic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLXNjcm9sbGJhci1ob3Jpem9udGFsJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiAjYmFyIGNsYXNzPVwibmctc2Nyb2xsYmFyIG5nLXNjcm9sbGJhci1ob3Jpem9udGFsIHt7YmFyQ2xhc3N9fVwiIChtb3VzZWRvd24pPVwib25TY3JvbGxiYXJIb2xkZXJDbGljaygkZXZlbnQpXCI+XHJcbiAgICAgIDxkaXYgI3RodW1iIGNsYXNzPVwibmctc2Nyb2xsYmFyLXRodW1iIHt7dGh1bWJDbGFzc319XCIgW25nU3R5bGVdPVwic2Nyb2xsYmFyU3R5bGUgfCBhc3luY1wiPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdTY3JvbGxiYXJIb3Jpem9udGFsIGV4dGVuZHMgTmdTY3JvbGxiYXJUaHVtYiB7XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZSBzY3JvbGxiYXIgdGh1bWJuYWlsIHNpemVcclxuICAgKi9cclxuICBnZXQgdGh1bWJTaXplKCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBiYXJDbGllbnRXaWR0aCA9IHRoaXMuYmFyLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICBjb25zdCB2aWV3Q2xpZW50V2lkdGggPSB0aGlzLl92aWV3LmNsaWVudFdpZHRoO1xyXG4gICAgY29uc3Qgdmlld1Njcm9sbFdpZHRoID0gdGhpcy5fdmlldy5zY3JvbGxXaWR0aDtcclxuICAgIHRoaXMuX25hdHVyYWxUaHVtYlNpemUgPSBiYXJDbGllbnRXaWR0aCAvIHZpZXdTY3JvbGxXaWR0aCAqIGJhckNsaWVudFdpZHRoO1xyXG4gICAgdGhpcy5fc2Nyb2xsTWF4ID0gdmlld1Njcm9sbFdpZHRoIC0gdmlld0NsaWVudFdpZHRoO1xyXG4gICAgcmV0dXJuIHRoaXMuc2Nyb2xsQm91bmRhcmllcyh0aGlzLl9uYXR1cmFsVGh1bWJTaXplLCB0aGlzLl9zY3JvbGxNYXgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJvdGVjdGVkIF9kb2N1bWVudDogYW55LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBOZ1Njcm9sbGJhcikpIHByb3RlY3RlZCBfcGFyZW50OiBOZ1Njcm9sbGJhcixcclxuICAgICAgICAgICAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBfcGxhdGZvcm06IE9iamVjdCxcclxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgX3pvbmU6IE5nWm9uZSkge1xyXG4gICAgc3VwZXIoX3BhcmVudCwgX3BsYXRmb3JtLCBfem9uZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTY3JvbGxiYXIgY2xpY2tcclxuICAgKiBAcGFyYW0gZSBNb3VzZSBldmVudFxyXG4gICAqL1xyXG4gIG9uU2Nyb2xsYmFySG9sZGVyQ2xpY2soZTogYW55KSB7XHJcbiAgICBpZiAoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCkge1xyXG4gICAgICBjb25zdCBvZmZzZXRYID0gZS5vZmZzZXRYIC0gdGhpcy5fbmF0dXJhbFRodW1iU2l6ZSAqIC41O1xyXG4gICAgICBjb25zdCB0aHVtYlBvc2l0aW9uUGVyY2VudGFnZSA9IG9mZnNldFggKiAxMDAgLyB0aGlzLmJhci5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHRodW1iUG9zaXRpb25QZXJjZW50YWdlICogdGhpcy5fdmlldy5zY3JvbGxXaWR0aCAvIDEwMDtcclxuICAgICAgdGhpcy5fcGFyZW50LnNjcm9sbFRvKHtsZWZ0OiB2YWx1ZSwgZHVyYXRpb246IHRoaXMuc2Nyb2xsVG9EdXJhdGlvbn0gYXMgYW55KS5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZSBzY3JvbGxiYXJcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgdXBkYXRlU2Nyb2xsYmFyKCkge1xyXG4gICAgdGhpcy5fdGh1bWJTaXplID0gdGhpcy50aHVtYi5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgdGhpcy5fdHJhY2tNYXggPSB0aGlzLmJhci5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoIC0gdGhpcy5fdGh1bWJTaXplO1xyXG4gICAgdGhpcy5fY3VyclBvcyA9IHRoaXMuX3ZpZXcuc2Nyb2xsTGVmdCAqIHRoaXMuX3RyYWNrTWF4IC8gdGhpcy5fc2Nyb2xsTWF4O1xyXG4gICAgdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICBhbmltYXRpb25GcmFtZVNjaGVkdWxlci5zY2hlZHVsZSgoKSA9PlxyXG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUoe1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt0aGlzLl9jdXJyUG9zfXB4LCAwLCAwKWAsXHJcbiAgICAgICAgICB3aWR0aDogYCR7dGhpcy50aHVtYlNpemV9cHhgXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnQgdmVydGljYWwgdGh1bWIgd29ya2VyXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIHN0YXJ0VGh1bWJFdmVudHMoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIGNvbnN0IG1vdXNlRG93biQgPSBmcm9tRXZlbnQodGhpcy50aHVtYi5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJyk7XHJcbiAgICBjb25zdCBtb3VzZU1vdmUkID0gZnJvbUV2ZW50KHRoaXMuX2RvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XHJcbiAgICBjb25zdCBtb3VzZVVwJCA9IGZyb21FdmVudCh0aGlzLl9kb2N1bWVudCwgJ21vdXNldXAnKS5waXBlKFxyXG4gICAgICB0YXAoKCkgPT4gdGhpcy5fZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IG51bGwpXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIG1vdXNlRG93biQucGlwZShcclxuICAgICAgdGFwKCgpID0+IHtcclxuICAgICAgICB0aGlzLl9kb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gKCkgPT4gZmFsc2U7XHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0cmFja01heCBmb3IgYmVmb3JlIHN0YXJ0IGRyYWdnaW5nXHJcbiAgICAgICAgdGhpcy5fdHJhY2tNYXggPSB0aGlzLmJhci5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoIC0gdGhpcy5fdGh1bWJTaXplO1xyXG4gICAgICB9KSxcclxuICAgICAgcGx1Y2soJ29mZnNldFgnKSxcclxuICAgICAgbWVyZ2VNYXAoKG1vdXNlRG93bk9mZnNldDogbnVtYmVyKSA9PiBtb3VzZU1vdmUkLnBpcGUoXHJcbiAgICAgICAgdGFrZVVudGlsKG1vdXNlVXAkKSxcclxuICAgICAgICBwbHVjaygnY2xpZW50WCcpLFxyXG4gICAgICAgIHRhcCgobW91c2VNb3ZlQ2xpZW50OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9mZnNldFggPSBtb3VzZU1vdmVDbGllbnQgLSB0aGlzLmJhci5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XHJcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX3Njcm9sbE1heCAqIChvZmZzZXRYIC0gbW91c2VEb3duT2Zmc2V0KSAvIHRoaXMuX3RyYWNrTWF4O1xyXG4gICAgICAgICAgdGhpcy5fcGFyZW50LnNjcm9sbGFibGUuc2Nyb2xsVG8oe2xlZnQ6IHZhbHVlfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgKSlcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG5pbXBvcnQgeyBMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcclxuaW1wb3J0IHsgU21vb3RoU2Nyb2xsTW9kdWxlIH0gZnJvbSAnLi4vc21vb3RoLXNjcm9sbC9zbW9vdGgtc2Nyb2xsLm1vZHVsZSc7XHJcbmltcG9ydCB7IE5nU2Nyb2xsYmFyIH0gZnJvbSAnLi9uZy1zY3JvbGxiYXInO1xyXG5pbXBvcnQgeyBOZ1Njcm9sbGJhclZlcnRpY2FsIH0gZnJvbSAnLi9uZy1zY3JvbGxiYXItdmVydGljYWwnO1xyXG5pbXBvcnQgeyBOZ1Njcm9sbGJhckhvcml6b250YWwgfSBmcm9tICcuL25nLXNjcm9sbGJhci1ob3Jpem9udGFsJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgU2Nyb2xsaW5nTW9kdWxlLFxyXG4gICAgTGF5b3V0TW9kdWxlLFxyXG4gICAgU21vb3RoU2Nyb2xsTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5nU2Nyb2xsYmFyLFxyXG4gICAgTmdTY3JvbGxiYXJWZXJ0aWNhbCxcclxuICAgIE5nU2Nyb2xsYmFySG9yaXpvbnRhbFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTmdTY3JvbGxiYXJcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1Njcm9sbGJhck1vZHVsZSB7XHJcbn1cclxuIl0sIm5hbWVzIjpbInRzbGliXzEuX19leHRlbmRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7SUErQkUsc0JBQXlDLFNBQWlCLEVBQzlDLEVBQWM7UUFEZSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBRXhELElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUM5Qjs7Ozs7O0lBRU8saUNBQVU7Ozs7O2NBQUMsSUFBWSxFQUFFLEdBQVc7UUFDMUMsSUFBSSxzQkFBc0IsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFB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

/***/ })

}]);
//# sourceMappingURL=default~agency-admin-agency-admin-module~layout-layout-module.js.map