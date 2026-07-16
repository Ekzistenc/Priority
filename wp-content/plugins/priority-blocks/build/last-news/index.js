/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/last-news/edit.js"
/*!*******************************!*\
  !*** ./src/last-news/edit.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/last-news/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






function Edit({
  attributes,
  setAttributes
}) {
  const {
    category,
    title,
    button,
    count
  } = attributes;
  const onChangeButtonProp = (field, value) => {
    setAttributes({
      button: {
        ...button,
        [field]: value
      }
    });
  };
  const categories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return select('core').getEntityRecords('taxonomy', 'category', {
      per_page: -1
    });
  }, []);
  const {
    postsPageUrl,
    isPostsPageMissing
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const {
      getEntityRecord,
      hasFinishedResolution
    } = select('core');
    const site = getEntityRecord('root', 'site');
    const siteResolved = hasFinishedResolution('getEntityRecord', ['root', 'site']);
    if (!siteResolved) {
      return {
        postsPageUrl: '',
        isPostsPageMissing: false
      };
    }
    const pageForPostsId = parseInt(site?.page_for_posts, 10) || 0;
    if (!pageForPostsId) {
      return {
        postsPageUrl: '',
        isPostsPageMissing: true
      };
    }
    const page = getEntityRecord('postType', 'page', pageForPostsId);
    const pageResolved = hasFinishedResolution('getEntityRecord', ['postType', 'page', pageForPostsId]);
    if (!pageResolved) {
      return {
        postsPageUrl: '',
        isPostsPageMissing: false
      };
    }
    const link = page?.link || '';
    return {
      postsPageUrl: link,
      isPostsPageMissing: !link
    };
  }, []);
  const shouldHideButtonUi = !category && isPostsPageMissing;
  const categoryId = categories?.find(item => item.slug === category)?.id;
  const categoryUrl = categories?.find(item => item.slug === category)?.link || '';
  const allNewsUrl = category ? categoryUrl : postsPageUrl;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (shouldHideButtonUi || !allNewsUrl) return;
    const currentLink = button?.link;
    if (!currentLink || currentLink === '#') {
      onChangeButtonProp('link', allNewsUrl);
    }
  }, [shouldHideButtonUi, allNewsUrl, button?.link]);
  const {
    news,
    isLoading
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    const {
      getEntityRecords,
      isResolving,
      hasFinishedResolution
    } = select('core');
    const query = {
      per_page: count || 3,
      status: 'publish',
      _embed: true
    };
    if (categoryId) {
      query.categories = [categoryId];
    }
    const posts = getEntityRecords('postType', 'post', query);
    const queryArgs = ['postType', 'post', query];
    const isLoadingNews = isResolving('getEntityRecords', queryArgs) || !hasFinishedResolution('getEntityRecords', queryArgs);
    return {
      isLoading: isLoadingNews,
      news: posts ? posts.map(item => {
        const media = item?._embedded?.['wp:featuredmedia']?.[0];
        return {
          title: item.title.rendered,
          image: {
            thumb_url: media?.media_details?.sizes?.large?.source_url || media?.source_url || ''
          }
        };
      }) : []
    };
  }, [count, categoryId]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u043B\u043E\u043A\u0430",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          __next40pxDefaultSize: true,
          label: "\u0420\u0443\u0431\u0440\u0438\u043A\u0430",
          value: category,
          options: [{
            label: 'Последние записи',
            value: ''
          }, ...(categories?.map(item => ({
            label: item.name,
            value: item.slug
          })) || [])],
          onChange: value => {
            setAttributes({
              category: value
            });
            if (value) {
              const nextTerm = categories?.find(item => item.slug === value);
              onChangeButtonProp('link', nextTerm?.link || '');
            } else {
              onChangeButtonProp('link', postsPageUrl || '');
            }
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
          value: title,
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          onChange: value => setAttributes({
            title: value
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          type: "number",
          min: "1",
          label: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043D\u043E\u0432\u043E\u0441\u0442\u0435\u0439",
          value: count,
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          onChange: value => setAttributes({
            count: Number(value)
          })
        }), !shouldHideButtonUi && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "components-base-control",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("label", {
            className: "components-base-control__label",
            children: "\u041A\u043D\u043E\u043F\u043A\u0430"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            __nextHasNoMarginBottom: true,
            checked: button.show,
            label: "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443",
            onChange: () => onChangeButtonProp('show', !button.show)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
            __nextHasNoMarginBottom: true,
            checked: button.modal,
            label: "\u041C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u043A\u043D\u043E",
            onChange: () => onChangeButtonProp('modal', !button.modal)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            value: button.text,
            label: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438",
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true,
            onChange: value => onChangeButtonProp('text', value)
          }), !button.modal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
              type: "url",
              value: button.link,
              label: "URL \u043A\u043D\u043E\u043F\u043A\u0438",
              __nextHasNoMarginBottom: true,
              __next40pxDefaultSize: true,
              onChange: value => onChangeButtonProp('link', value)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
              __nextHasNoMarginBottom: true,
              checked: button.target,
              label: "\u041E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0432 \u043D\u043E\u0432\u043E\u0439 \u0432\u043A\u043B\u0430\u0434\u043A\u0435",
              onChange: () => onChangeButtonProp('target', !button.target)
            })]
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("section", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
        className: 'sd-news'
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText, {
          tagName: "h2",
          value: title,
          placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
          onChange: value => setAttributes({
            title: value
          })
        }), isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "sd-news__loader",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ProgressBar, {})
        }) : news && news.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "sd-news__grid",
          children: news.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("a", {
            className: "sd-news__card",
            children: [item?.image?.thumb_url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
              src: item.image.thumb_url,
              href: "#",
              alt: ""
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
              className: "no-thumb"
            }), item?.title && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
              children: item.title
            })]
          }, index))
        }), button.show && !shouldHideButtonUi && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.RichText, {
          tagName: "div",
          value: button.text,
          placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438",
          onChange: value => onChangeButtonProp('text', value),
          className: `sd-news__lik ${button.modal ? 'sd-modal-link' : 'sd-button-link'}`,
          href: button.modal ? '#' : button.link || '#',
          target: !button.modal && button.target ? '_blank' : '_self'
        })]
      })
    })]
  });
}

/***/ },

/***/ "./src/last-news/index.js"
/*!********************************!*\
  !*** ./src/last-news/index.js ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/last-news/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/last-news/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/last-news/block.json");




(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ },

/***/ "./src/last-news/editor.scss"
/*!***********************************!*\
  !*** ./src/last-news/editor.scss ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/last-news/style.scss"
/*!**********************************!*\
  !*** ./src/last-news/style.scss ***!
  \**********************************/
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

/***/ "@wordpress/data"
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["data"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "./src/last-news/block.json"
/*!**********************************!*\
  !*** ./src/last-news/block.json ***!
  \**********************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"snd/last-news","version":"0.1.0","title":"Последние новости","category":"snd-blocks","icon":"format-aside","example":{"viewportWidth":1200},"attributes":{"align":{"type":"string","default":"full"},"category":{"type":"string","default":""},"title":{"type":"string","default":"Последние новости"},"count":{"type":"number","default":"3"},"anchor":{"type":"string"},"button":{"type":"object","default":{"text":"Смотреть все новости","link":"","target":false,"modal":false,"show":true}}},"supports":{"html":false,"align":true,"anchor":true},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php"}');

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
/******/ 			"last-news/index": 0,
/******/ 			"last-news/style-index": 0
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["last-news/style-index"], () => (__webpack_require__("./src/last-news/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map