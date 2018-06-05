webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_scss__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__menu_scss__);


/* harmony default export */ __webpack_exports__["a"] = (function (array, className) {
    var menu = document.createElement("ul");
    menu.className = className;
    var listItems = '';
    array.forEach(function(item) {
        listItems += '<li>' + item + '</li>';
    });
    menu.innerHTML = listItems;
    return menu;
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blog_scss__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__blog_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__blog_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_normalize_css__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_normalize_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_normalize_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_menu_menu__ = __webpack_require__(4);




var menu = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__components_menu_menu__["a" /* default */])(['Главная','Блог'], 'menu');
document.body.appendChild(menu);

console.log('in blog.js');

/***/ })
],[7]);