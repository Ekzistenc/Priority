/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modal/edit.js"
/*!***************************!*\
  !*** ./src/modal/edit.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/modal/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





function Edit({
  attributes,
  setAttributes
}) {
  const {
    image_logo,
    image_bg,
    title
  } = attributes;
  const [showDialog, setShowDialog] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const ALLOWED_MEDIA_TYPES = ['image'];
  const onChangeText = (field, value) => {
    setAttributes({
      [field]: value
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u043B\u043E\u043A\u0430",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u0435 \u043E\u043A\u043D\u043E \u0434\u043B\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
          __nextHasNoMarginBottom: true,
          checked: showDialog,
          onChange: value => setShowDialog(value)
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUploadCheck, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
            onSelect: media => {
              const url = media?.sizes?.medium?.url || media?.url || '';
              setAttributes({
                image_logo: {
                  id: media?.id || 0,
                  url: url,
                  alt: media?.alt || ''
                }
              });
            },
            allowedTypes: ALLOWED_MEDIA_TYPES,
            value: image_logo.id,
            render: ({
              open
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "components-base-control",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                className: "components-base-control__label-media-button",
                children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043B\u043E\u0433\u043E\u0442\u0438\u043F"
              }), image_logo.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "components-base-control__media-preview",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                  src: image_logo.url,
                  alt: image_logo.alt
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "components-base-control__media-buttons",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                  variant: "primary",
                  onClick: open,
                  children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043B\u043E\u0433\u043E\u0442\u0438\u043F"
                }), image_logo.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                  className: "is-secondary is-destructive",
                  onClick: () => {
                    setAttributes({
                      image_logo: {
                        id: 0,
                        url: '',
                        alt: ''
                      }
                    });
                  },
                  children: "x"
                })]
              })]
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUploadCheck, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
            onSelect: media => {
              const url = media?.sizes?.large?.url || media?.url || '';
              setAttributes({
                image_bg: {
                  id: media?.id || 0,
                  url: url,
                  alt: media?.alt || ''
                }
              });
            },
            allowedTypes: ALLOWED_MEDIA_TYPES,
            value: image_bg.id,
            render: ({
              open
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "components-base-control",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
                className: "components-base-control__label-media-button",
                children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u043E\u043D"
              }), image_bg.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                className: "components-base-control__media-preview",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
                  src: image_bg.url,
                  alt: image_bg.alt
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                className: "components-base-control__media-buttons",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                  variant: "primary",
                  onClick: open,
                  children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u043E\u043D"
                }), image_bg.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                  className: "is-secondary is-destructive",
                  onClick: () => {
                    setAttributes({
                      image_bg: {
                        id: 0,
                        url: '',
                        alt: ''
                      }
                    });
                  },
                  children: "x"
                })]
              })]
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
          label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
          value: title,
          __nextHasNoMarginBottom: true,
          onChange: value => onChangeText('title', value)
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
        className: 'dialog-block'
      }),
      children: [!showDialog && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
        status: "warning",
        isDismissible: false,
        children: "\u0417\u0434\u0435\u0441\u044C \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u0435 \u043E\u043A\u043D\u043E"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("dialog", {
        id: "modalDialog",
        open: showDialog,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "sd-dialog__wrapper",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "sd-dialog__grid",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("a", {
              className: "sd-dialog__close",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("svg", {
                width: "32.527344",
                height: "32.526855",
                viewBox: "0 0 32.5273 32.5269",
                fill: "none",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("desc", {
                  children: "Created with Pixso."
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("defs", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("rect", {
                  id: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A 115",
                  x: "9.035156",
                  y: "7.228149",
                  rx: "1.000000",
                  width: "23.000000",
                  height: "2.555555",
                  transform: "rotate(45 9.035156 7.228149)",
                  fill: "#EEDECD",
                  "fill-opacity": "1.000000"
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("rect", {
                  id: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A 117",
                  x: "7.228516",
                  y: "23.491638",
                  rx: "1.000000",
                  width: "23.000000",
                  height: "2.555555",
                  transform: "rotate(-45 7.228516 23.491638)",
                  fill: "#EEDECD",
                  "fill-opacity": "1.000000"
                })]
              })
            }), image_logo.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
              src: image_logo.url,
              alt: image_logo.alt,
              loading: "lazy",
              className: "sd-dialog__logo"
            }), image_bg.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("img", {
              src: image_bg.url,
              alt: image_bg.alt,
              loading: "lazy",
              className: "modal__img"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
              className: "inline-inner",
              children: [title && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText, {
                tagName: "h2",
                value: title,
                className: "text-center",
                onChange: value => onChangeText('title', value)
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks, {
                allowedBlocks: ['contact-form-7/contact-form-selector']
              })]
            })]
          })
        })
      })]
    })]
  });
}

/***/ },

/***/ "./src/modal/index.js"
/*!****************************!*\
  !*** ./src/modal/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/modal/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/modal/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/modal/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/modal/block.json");





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/modal/save.js"
/*!***************************!*\
  !*** ./src/modal/save.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function save({
  attributes
}) {
  const {
    image_logo,
    image_bg,
    title
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("dialog", {
      id: "modalDialog",
      ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "sd-dialog__wrapper",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: "sd-dialog__grid",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("a", {
            className: "sd-dialog__close",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("svg", {
              width: "32.527344",
              height: "32.526855",
              viewBox: "0 0 32.5273 32.5269",
              fill: "none",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("desc", {
                children: "Created with Pixso."
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("defs", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect", {
                id: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A 115",
                x: "9.035156",
                y: "7.228149",
                rx: "1.000000",
                width: "23.000000",
                height: "2.555555",
                transform: "rotate(45 9.035156 7.228149)",
                fill: "#EEDECD",
                "fill-opacity": "1.000000"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("rect", {
                id: "\u041F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u0438\u043A 117",
                x: "7.228516",
                y: "23.491638",
                rx: "1.000000",
                width: "23.000000",
                height: "2.555555",
                transform: "rotate(-45 7.228516 23.491638)",
                fill: "#EEDECD",
                "fill-opacity": "1.000000"
              })]
            })
          }), image_logo.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            src: image_logo.url,
            alt: image_logo.alt,
            loading: "lazy",
            className: "sd-dialog__logo"
          }), image_bg.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
            src: image_bg.url,
            alt: image_bg.alt,
            loading: "lazy",
            className: "modal__img"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: "inline-inner",
            children: [title && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText.Content, {
              tagName: "h2",
              value: title,
              className: "text-center"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks.Content, {})]
          })]
        })
      })
    })
  });
}

/***/ },

/***/ "./src/modal/editor.scss"
/*!*******************************!*\
  !*** ./src/modal/editor.scss ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/modal/style.scss"
/*!******************************!*\
  !*** ./src/modal/style.scss ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "./src/modal/block.json"
/*!******************************!*\
  !*** ./src/modal/block.json ***!
  \******************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"snd/modal","version":"0.1.0","title":"Модальное окно","category":"snd-theme","icon":"button","attributes":{"align":{"type":"string","default":"full"},"image_logo":{"type":"object","default":{"id":0,"url":"","alt":""}},"image_bg":{"type":"object","default":{"id":0,"url":"","alt":""}},"title":{"type":"string","default":"Пожалуйста, укажите номер..."}},"supports":{"html":false},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":["dialog-polyfill","file:./view.js"],"viewStyle":["dialog-polyfill"]}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			let notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn, priority] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"modal/index": 0,
/******/ 			"modal/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = globalThis["webpackChunkpriority_blocks"] ||= [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["modal/style-index"], () => (__webpack_require__("./src/modal/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map