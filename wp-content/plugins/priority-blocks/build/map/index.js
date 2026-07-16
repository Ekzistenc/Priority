/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@hello-pangea/dnd/dist/dnd.esm.js"
/*!********************************************************!*\
  !*** ./node_modules/@hello-pangea/dnd/dist/dnd.esm.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DragDropContext: () => (/* binding */ DragDropContext),
/* harmony export */   Draggable: () => (/* binding */ PublicDraggable),
/* harmony export */   Droppable: () => (/* binding */ ConnectedDroppable),
/* harmony export */   useKeyboardSensor: () => (/* binding */ useKeyboardSensor),
/* harmony export */   useMouseSensor: () => (/* binding */ useMouseSensor),
/* harmony export */   useTouchSensor: () => (/* binding */ useTouchSensor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/dist/redux.mjs");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/dist/react-redux.mjs");
/* harmony import */ var css_box_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! css-box-model */ "./node_modules/css-box-model/dist/css-box-model.esm.js");
/* harmony import */ var raf_schd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! raf-schd */ "./node_modules/raf-schd/dist/raf-schd.esm.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");








const isProduction$1 = "development" === 'production';
const spacesAndTabs = /[ \t]{2,}/g;
const lineStartWithSpaces = /^[ \t]*/gm;
const clean$2 = value => value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
const getDevMessage = message => clean$2(`
  %c@hello-pangea/dnd

  %c${clean$2(message)}

  %c👷‍ This is a development only message. It will be removed in production builds.
`);
const getFormattedMessage = message => [getDevMessage(message), 'color: #00C584; font-size: 1.2em; font-weight: bold;', 'line-height: 1.5', 'color: #723874;'];
const isDisabledFlag = '__@hello-pangea/dnd-disable-dev-warnings';
function log(type, message) {
  if (isProduction$1) {
    return;
  }
  if (typeof window !== 'undefined' && window[isDisabledFlag]) {
    return;
  }
  console[type](...getFormattedMessage(message));
}
const warning = log.bind(null, 'warn');
const error = log.bind(null, 'error');

function noop$2() {}

function getOptions(shared, fromBinding) {
  return {
    ...shared,
    ...fromBinding
  };
}
function bindEvents(el, bindings, sharedOptions) {
  const unbindings = bindings.map(binding => {
    const options = getOptions(sharedOptions, binding.options);
    el.addEventListener(binding.eventName, binding.fn, options);
    return function unbind() {
      el.removeEventListener(binding.eventName, binding.fn, options);
    };
  });
  return function unbindAll() {
    unbindings.forEach(unbind => {
      unbind();
    });
  };
}

const isProduction = "development" === 'production';
const prefix$1 = 'Invariant failed';
class RbdInvariant extends Error {}
RbdInvariant.prototype.toString = function toString() {
  return this.message;
};
function invariant(condition, message) {
  if (isProduction) {
    throw new RbdInvariant(prefix$1);
  } else {
    throw new RbdInvariant(`${prefix$1}: ${message || ''}`);
  }
}

class ErrorBoundary extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(...args) {
    super(...args);
    this.callbacks = null;
    this.unbind = noop$2;
    this.onWindowError = event => {
      const callbacks = this.getCallbacks();
      if (callbacks.isDragging()) {
        callbacks.tryAbort();
         true ? warning(`
        An error was caught by our window 'error' event listener while a drag was occurring.
        The active drag has been aborted.
      `) : 0;
      }
      const err = event.error;
      if (err instanceof RbdInvariant) {
        event.preventDefault();
        if (true) {
          error(err.message);
        }
      }
    };
    this.getCallbacks = () => {
      if (!this.callbacks) {
        throw new Error('Unable to find AppCallbacks in <ErrorBoundary/>');
      }
      return this.callbacks;
    };
    this.setCallbacks = callbacks => {
      this.callbacks = callbacks;
    };
  }
  componentDidMount() {
    this.unbind = bindEvents(window, [{
      eventName: 'error',
      fn: this.onWindowError
    }]);
  }
  componentDidCatch(err) {
    if (err instanceof RbdInvariant) {
      if (true) {
        error(err.message);
      }
      this.setState({});
      return;
    }
    throw err;
  }
  componentWillUnmount() {
    this.unbind();
  }
  render() {
    return this.props.children(this.setCallbacks);
  }
}

const dragHandleUsageInstructions = `
  Press space bar to start a drag.
  When dragging you can use the arrow keys to move the item around and escape to cancel.
  Some screen readers may require you to be in focus mode or to use your pass through key
`;
const position = index => index + 1;
const onDragStart = start => `
  You have lifted an item in position ${position(start.source.index)}
`;
const withLocation = (source, destination) => {
  const isInHomeList = source.droppableId === destination.droppableId;
  const startPosition = position(source.index);
  const endPosition = position(destination.index);
  if (isInHomeList) {
    return `
      You have moved the item from position ${startPosition}
      to position ${endPosition}
    `;
  }
  return `
    You have moved the item from position ${startPosition}
    in list ${source.droppableId}
    to list ${destination.droppableId}
    in position ${endPosition}
  `;
};
const withCombine = (id, source, combine) => {
  const inHomeList = source.droppableId === combine.droppableId;
  if (inHomeList) {
    return `
      The item ${id}
      has been combined with ${combine.draggableId}`;
  }
  return `
      The item ${id}
      in list ${source.droppableId}
      has been combined with ${combine.draggableId}
      in list ${combine.droppableId}
    `;
};
const onDragUpdate = update => {
  const location = update.destination;
  if (location) {
    return withLocation(update.source, location);
  }
  const combine = update.combine;
  if (combine) {
    return withCombine(update.draggableId, update.source, combine);
  }
  return 'You are over an area that cannot be dropped on';
};
const returnedToStart = source => `
  The item has returned to its starting position
  of ${position(source.index)}
`;
const onDragEnd = result => {
  if (result.reason === 'CANCEL') {
    return `
      Movement cancelled.
      ${returnedToStart(result.source)}
    `;
  }
  const location = result.destination;
  const combine = result.combine;
  if (location) {
    return `
      You have dropped the item.
      ${withLocation(result.source, location)}
    `;
  }
  if (combine) {
    return `
      You have dropped the item.
      ${withCombine(result.draggableId, result.source, combine)}
    `;
  }
  return `
    The item has been dropped while not over a drop area.
    ${returnedToStart(result.source)}
  `;
};
const preset = {
  dragHandleUsageInstructions,
  onDragStart,
  onDragUpdate,
  onDragEnd
};

function isEqual$2(first, second) {
  if (first === second) {
    return true;
  }
  if (Number.isNaN(first) && Number.isNaN(second)) {
    return true;
  }
  return false;
}
function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  for (let i = 0; i < newInputs.length; i++) {
    if (!isEqual$2(newInputs[i], lastInputs[i])) {
      return false;
    }
  }
  return true;
}

function useMemo(getResult, inputs) {
  const initial = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => ({
    inputs,
    result: getResult()
  }))[0];
  const isFirstRun = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  const committed = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(initial);
  const useCache = isFirstRun.current || Boolean(inputs && committed.current.inputs && areInputsEqual(inputs, committed.current.inputs));
  const cache = useCache ? committed.current : {
    inputs,
    result: getResult()
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    isFirstRun.current = false;
    committed.current = cache;
  }, [cache]);
  return cache.result;
}
function useCallback(callback, inputs) {
  return useMemo(() => callback, inputs);
}

const origin = {
  x: 0,
  y: 0
};
const add = (point1, point2) => ({
  x: point1.x + point2.x,
  y: point1.y + point2.y
});
const subtract = (point1, point2) => ({
  x: point1.x - point2.x,
  y: point1.y - point2.y
});
const isEqual$1 = (point1, point2) => point1.x === point2.x && point1.y === point2.y;
const negate = point => ({
  x: point.x !== 0 ? -point.x : 0,
  y: point.y !== 0 ? -point.y : 0
});
const patch = (line, value, otherValue = 0) => {
  if (line === 'x') {
    return {
      x: value,
      y: otherValue
    };
  }
  return {
    x: otherValue,
    y: value
  };
};
const distance = (point1, point2) => Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
const closest$1 = (target, points) => Math.min(...points.map(point => distance(target, point)));
const apply = fn => point => ({
  x: fn(point.x),
  y: fn(point.y)
});

var executeClip = (frame, subject) => {
  const result = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.getRect)({
    top: Math.max(subject.top, frame.top),
    right: Math.min(subject.right, frame.right),
    bottom: Math.min(subject.bottom, frame.bottom),
    left: Math.max(subject.left, frame.left)
  });
  if (result.width <= 0 || result.height <= 0) {
    return null;
  }
  return result;
};

const offsetByPosition = (spacing, point) => ({
  top: spacing.top + point.y,
  left: spacing.left + point.x,
  bottom: spacing.bottom + point.y,
  right: spacing.right + point.x
});
const getCorners = spacing => [{
  x: spacing.left,
  y: spacing.top
}, {
  x: spacing.right,
  y: spacing.top
}, {
  x: spacing.left,
  y: spacing.bottom
}, {
  x: spacing.right,
  y: spacing.bottom
}];
const noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

const scroll$1 = (target, frame) => {
  if (!frame) {
    return target;
  }
  return offsetByPosition(target, frame.scroll.diff.displacement);
};
const increase = (target, axis, withPlaceholder) => {
  if (withPlaceholder && withPlaceholder.increasedBy) {
    return {
      ...target,
      [axis.end]: target[axis.end] + withPlaceholder.increasedBy[axis.line]
    };
  }
  return target;
};
const clip = (target, frame) => {
  if (frame && frame.shouldClipSubject) {
    return executeClip(frame.pageMarginBox, target);
  }
  return (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.getRect)(target);
};
var getSubject = ({
  page,
  withPlaceholder,
  axis,
  frame
}) => {
  const scrolled = scroll$1(page.marginBox, frame);
  const increased = increase(scrolled, axis, withPlaceholder);
  const clipped = clip(increased, frame);
  return {
    page,
    withPlaceholder,
    active: clipped
  };
};

var scrollDroppable = (droppable, newScroll) => {
  !droppable.frame ?  true ? invariant() : 0 : void 0;
  const scrollable = droppable.frame;
  const scrollDiff = subtract(newScroll, scrollable.scroll.initial);
  const scrollDisplacement = negate(scrollDiff);
  const frame = {
    ...scrollable,
    scroll: {
      initial: scrollable.scroll.initial,
      current: newScroll,
      diff: {
        value: scrollDiff,
        displacement: scrollDisplacement
      },
      max: scrollable.scroll.max
    }
  };
  const subject = getSubject({
    page: droppable.subject.page,
    withPlaceholder: droppable.subject.withPlaceholder,
    axis: droppable.axis,
    frame
  });
  const result = {
    ...droppable,
    frame,
    subject
  };
  return result;
};

function memoizeOne(resultFn, isEqual = areInputsEqual) {
  let cache = null;
  function memoized(...newArgs) {
    if (cache && cache.lastThis === this && isEqual(newArgs, cache.lastArgs)) {
      return cache.lastResult;
    }
    const lastResult = resultFn.apply(this, newArgs);
    cache = {
      lastResult,
      lastArgs: newArgs,
      lastThis: this
    };
    return lastResult;
  }
  memoized.clear = function clear() {
    cache = null;
  };
  return memoized;
}

const toDroppableMap = memoizeOne(droppables => droppables.reduce((previous, current) => {
  previous[current.descriptor.id] = current;
  return previous;
}, {}));
const toDraggableMap = memoizeOne(draggables => draggables.reduce((previous, current) => {
  previous[current.descriptor.id] = current;
  return previous;
}, {}));
const toDroppableList = memoizeOne(droppables => Object.values(droppables));
const toDraggableList = memoizeOne(draggables => Object.values(draggables));

var getDraggablesInsideDroppable = memoizeOne((droppableId, draggables) => {
  const result = toDraggableList(draggables).filter(draggable => droppableId === draggable.descriptor.droppableId).sort((a, b) => a.descriptor.index - b.descriptor.index);
  return result;
});

function tryGetDestination(impact) {
  if (impact.at && impact.at.type === 'REORDER') {
    return impact.at.destination;
  }
  return null;
}
function tryGetCombine(impact) {
  if (impact.at && impact.at.type === 'COMBINE') {
    return impact.at.combine;
  }
  return null;
}

var removeDraggableFromList = memoizeOne((remove, list) => list.filter(item => item.descriptor.id !== remove.descriptor.id));

var moveToNextCombine = ({
  isMovingForward,
  draggable,
  destination,
  insideDestination,
  previousImpact
}) => {
  if (!destination.isCombineEnabled) {
    return null;
  }
  const location = tryGetDestination(previousImpact);
  if (!location) {
    return null;
  }
  function getImpact(target) {
    const at = {
      type: 'COMBINE',
      combine: {
        draggableId: target,
        droppableId: destination.descriptor.id
      }
    };
    return {
      ...previousImpact,
      at
    };
  }
  const all = previousImpact.displaced.all;
  const closestId = all.length ? all[0] : null;
  if (isMovingForward) {
    return closestId ? getImpact(closestId) : null;
  }
  const withoutDraggable = removeDraggableFromList(draggable, insideDestination);
  if (!closestId) {
    if (!withoutDraggable.length) {
      return null;
    }
    const last = withoutDraggable[withoutDraggable.length - 1];
    return getImpact(last.descriptor.id);
  }
  const indexOfClosest = withoutDraggable.findIndex(d => d.descriptor.id === closestId);
  !(indexOfClosest !== -1) ?  true ? invariant(false, 'Could not find displaced item in set') : 0 : void 0;
  const proposedIndex = indexOfClosest - 1;
  if (proposedIndex < 0) {
    return null;
  }
  const before = withoutDraggable[proposedIndex];
  return getImpact(before.descriptor.id);
};

var isHomeOf = (draggable, destination) => draggable.descriptor.droppableId === destination.descriptor.id;

const noDisplacedBy = {
  point: origin,
  value: 0
};
const emptyGroups = {
  invisible: {},
  visible: {},
  all: []
};
const noImpact = {
  displaced: emptyGroups,
  displacedBy: noDisplacedBy,
  at: null
};

var isWithin = (lowerBound, upperBound) => value => lowerBound <= value && value <= upperBound;

var isPartiallyVisibleThroughFrame = frame => {
  const isWithinVertical = isWithin(frame.top, frame.bottom);
  const isWithinHorizontal = isWithin(frame.left, frame.right);
  return subject => {
    const isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
    if (isContained) {
      return true;
    }
    const isPartiallyVisibleVertically = isWithinVertical(subject.top) || isWithinVertical(subject.bottom);
    const isPartiallyVisibleHorizontally = isWithinHorizontal(subject.left) || isWithinHorizontal(subject.right);
    const isPartiallyContained = isPartiallyVisibleVertically && isPartiallyVisibleHorizontally;
    if (isPartiallyContained) {
      return true;
    }
    const isBiggerVertically = subject.top < frame.top && subject.bottom > frame.bottom;
    const isBiggerHorizontally = subject.left < frame.left && subject.right > frame.right;
    const isTargetBiggerThanFrame = isBiggerVertically && isBiggerHorizontally;
    if (isTargetBiggerThanFrame) {
      return true;
    }
    const isTargetBiggerOnOneAxis = isBiggerVertically && isPartiallyVisibleHorizontally || isBiggerHorizontally && isPartiallyVisibleVertically;
    return isTargetBiggerOnOneAxis;
  };
};

var isTotallyVisibleThroughFrame = frame => {
  const isWithinVertical = isWithin(frame.top, frame.bottom);
  const isWithinHorizontal = isWithin(frame.left, frame.right);
  return subject => {
    const isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
    return isContained;
  };
};

const vertical = {
  direction: 'vertical',
  line: 'y',
  crossAxisLine: 'x',
  start: 'top',
  end: 'bottom',
  size: 'height',
  crossAxisStart: 'left',
  crossAxisEnd: 'right',
  crossAxisSize: 'width'
};
const horizontal = {
  direction: 'horizontal',
  line: 'x',
  crossAxisLine: 'y',
  start: 'left',
  end: 'right',
  size: 'width',
  crossAxisStart: 'top',
  crossAxisEnd: 'bottom',
  crossAxisSize: 'height'
};

var isTotallyVisibleThroughFrameOnAxis = axis => frame => {
  const isWithinVertical = isWithin(frame.top, frame.bottom);
  const isWithinHorizontal = isWithin(frame.left, frame.right);
  return subject => {
    if (axis === vertical) {
      return isWithinVertical(subject.top) && isWithinVertical(subject.bottom);
    }
    return isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
  };
};

const getDroppableDisplaced = (target, destination) => {
  const displacement = destination.frame ? destination.frame.scroll.diff.displacement : origin;
  return offsetByPosition(target, displacement);
};
const isVisibleInDroppable = (target, destination, isVisibleThroughFrameFn) => {
  if (!destination.subject.active) {
    return false;
  }
  return isVisibleThroughFrameFn(destination.subject.active)(target);
};
const isVisibleInViewport = (target, viewport, isVisibleThroughFrameFn) => isVisibleThroughFrameFn(viewport)(target);
const isVisible$1 = ({
  target: toBeDisplaced,
  destination,
  viewport,
  withDroppableDisplacement,
  isVisibleThroughFrameFn
}) => {
  const displacedTarget = withDroppableDisplacement ? getDroppableDisplaced(toBeDisplaced, destination) : toBeDisplaced;
  return isVisibleInDroppable(displacedTarget, destination, isVisibleThroughFrameFn) && isVisibleInViewport(displacedTarget, viewport, isVisibleThroughFrameFn);
};
const isPartiallyVisible = args => isVisible$1({
  ...args,
  isVisibleThroughFrameFn: isPartiallyVisibleThroughFrame
});
const isTotallyVisible = args => isVisible$1({
  ...args,
  isVisibleThroughFrameFn: isTotallyVisibleThroughFrame
});
const isTotallyVisibleOnAxis = args => isVisible$1({
  ...args,
  isVisibleThroughFrameFn: isTotallyVisibleThroughFrameOnAxis(args.destination.axis)
});

const getShouldAnimate = (id, last, forceShouldAnimate) => {
  if (typeof forceShouldAnimate === 'boolean') {
    return forceShouldAnimate;
  }
  if (!last) {
    return true;
  }
  const {
    invisible,
    visible
  } = last;
  if (invisible[id]) {
    return false;
  }
  const previous = visible[id];
  return previous ? previous.shouldAnimate : true;
};
function getTarget(draggable, displacedBy) {
  const marginBox = draggable.page.marginBox;
  const expandBy = {
    top: displacedBy.point.y,
    right: 0,
    bottom: 0,
    left: displacedBy.point.x
  };
  return (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.getRect)((0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.expand)(marginBox, expandBy));
}
function getDisplacementGroups({
  afterDragging,
  destination,
  displacedBy,
  viewport,
  forceShouldAnimate,
  last
}) {
  return afterDragging.reduce(function process(groups, draggable) {
    const target = getTarget(draggable, displacedBy);
    const id = draggable.descriptor.id;
    groups.all.push(id);
    const isVisible = isPartiallyVisible({
      target,
      destination,
      viewport,
      withDroppableDisplacement: true
    });
    if (!isVisible) {
      groups.invisible[draggable.descriptor.id] = true;
      return groups;
    }
    const shouldAnimate = getShouldAnimate(id, last, forceShouldAnimate);
    const displacement = {
      draggableId: id,
      shouldAnimate
    };
    groups.visible[id] = displacement;
    return groups;
  }, {
    all: [],
    visible: {},
    invisible: {}
  });
}

function getIndexOfLastItem(draggables, options) {
  if (!draggables.length) {
    return 0;
  }
  const indexOfLastItem = draggables[draggables.length - 1].descriptor.index;
  return options.inHomeList ? indexOfLastItem : indexOfLastItem + 1;
}
function goAtEnd({
  insideDestination,
  inHomeList,
  displacedBy,
  destination
}) {
  const newIndex = getIndexOfLastItem(insideDestination, {
    inHomeList
  });
  return {
    displaced: emptyGroups,
    displacedBy,
    at: {
      type: 'REORDER',
      destination: {
        droppableId: destination.descriptor.id,
        index: newIndex
      }
    }
  };
}
function calculateReorderImpact({
  draggable,
  insideDestination,
  destination,
  viewport,
  displacedBy,
  last,
  index,
  forceShouldAnimate
}) {
  const inHomeList = isHomeOf(draggable, destination);
  if (index == null) {
    return goAtEnd({
      insideDestination,
      inHomeList,
      displacedBy,
      destination
    });
  }
  const match = insideDestination.find(item => item.descriptor.index === index);
  if (!match) {
    return goAtEnd({
      insideDestination,
      inHomeList,
      displacedBy,
      destination
    });
  }
  const withoutDragging = removeDraggableFromList(draggable, insideDestination);
  const sliceFrom = insideDestination.indexOf(match);
  const impacted = withoutDragging.slice(sliceFrom);
  const displaced = getDisplacementGroups({
    afterDragging: impacted,
    destination,
    displacedBy,
    last,
    viewport: viewport.frame,
    forceShouldAnimate
  });
  return {
    displaced,
    displacedBy,
    at: {
      type: 'REORDER',
      destination: {
        droppableId: destination.descriptor.id,
        index
      }
    }
  };
}

function didStartAfterCritical(draggableId, afterCritical) {
  return Boolean(afterCritical.effected[draggableId]);
}

var fromCombine = ({
  isMovingForward,
  destination,
  draggables,
  combine,
  afterCritical
}) => {
  if (!destination.isCombineEnabled) {
    return null;
  }
  const combineId = combine.draggableId;
  const combineWith = draggables[combineId];
  const combineWithIndex = combineWith.descriptor.index;
  const didCombineWithStartAfterCritical = didStartAfterCritical(combineId, afterCritical);
  if (didCombineWithStartAfterCritical) {
    if (isMovingForward) {
      return combineWithIndex;
    }
    return combineWithIndex - 1;
  }
  if (isMovingForward) {
    return combineWithIndex + 1;
  }
  return combineWithIndex;
};

var fromReorder = ({
  isMovingForward,
  isInHomeList,
  insideDestination,
  location
}) => {
  if (!insideDestination.length) {
    return null;
  }
  const currentIndex = location.index;
  const proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;
  const firstIndex = insideDestination[0].descriptor.index;
  const lastIndex = insideDestination[insideDestination.length - 1].descriptor.index;
  const upperBound = isInHomeList ? lastIndex : lastIndex + 1;
  if (proposedIndex < firstIndex) {
    return null;
  }
  if (proposedIndex > upperBound) {
    return null;
  }
  return proposedIndex;
};

var moveToNextIndex = ({
  isMovingForward,
  isInHomeList,
  draggable,
  draggables,
  destination,
  insideDestination,
  previousImpact,
  viewport,
  afterCritical
}) => {
  const wasAt = previousImpact.at;
  !wasAt ?  true ? invariant(false, 'Cannot move in direction without previous impact location') : 0 : void 0;
  if (wasAt.type === 'REORDER') {
    const newIndex = fromReorder({
      isMovingForward,
      isInHomeList,
      location: wasAt.destination,
      insideDestination
    });
    if (newIndex == null) {
      return null;
    }
    return calculateReorderImpact({
      draggable,
      insideDestination,
      destination,
      viewport,
      last: previousImpact.displaced,
      displacedBy: previousImpact.displacedBy,
      index: newIndex
    });
  }
  const newIndex = fromCombine({
    isMovingForward,
    destination,
    displaced: previousImpact.displaced,
    draggables,
    combine: wasAt.combine,
    afterCritical
  });
  if (newIndex == null) {
    return null;
  }
  return calculateReorderImpact({
    draggable,
    insideDestination,
    destination,
    viewport,
    last: previousImpact.displaced,
    displacedBy: previousImpact.displacedBy,
    index: newIndex
  });
};

var getCombinedItemDisplacement = ({
  displaced,
  afterCritical,
  combineWith,
  displacedBy
}) => {
  const isDisplaced = Boolean(displaced.visible[combineWith] || displaced.invisible[combineWith]);
  if (didStartAfterCritical(combineWith, afterCritical)) {
    return isDisplaced ? origin : negate(displacedBy.point);
  }
  return isDisplaced ? displacedBy.point : origin;
};

var whenCombining = ({
  afterCritical,
  impact,
  draggables
}) => {
  const combine = tryGetCombine(impact);
  !combine ?  true ? invariant() : 0 : void 0;
  const combineWith = combine.draggableId;
  const center = draggables[combineWith].page.borderBox.center;
  const displaceBy = getCombinedItemDisplacement({
    displaced: impact.displaced,
    afterCritical,
    combineWith,
    displacedBy: impact.displacedBy
  });
  return add(center, displaceBy);
};

const distanceFromStartToBorderBoxCenter = (axis, box) => box.margin[axis.start] + box.borderBox[axis.size] / 2;
const distanceFromEndToBorderBoxCenter = (axis, box) => box.margin[axis.end] + box.borderBox[axis.size] / 2;
const getCrossAxisBorderBoxCenter = (axis, target, isMoving) => target[axis.crossAxisStart] + isMoving.margin[axis.crossAxisStart] + isMoving.borderBox[axis.crossAxisSize] / 2;
const goAfter = ({
  axis,
  moveRelativeTo,
  isMoving
}) => patch(axis.line, moveRelativeTo.marginBox[axis.end] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
const goBefore = ({
  axis,
  moveRelativeTo,
  isMoving
}) => patch(axis.line, moveRelativeTo.marginBox[axis.start] - distanceFromEndToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveRelativeTo.marginBox, isMoving));
const goIntoStart = ({
  axis,
  moveInto,
  isMoving
}) => patch(axis.line, moveInto.contentBox[axis.start] + distanceFromStartToBorderBoxCenter(axis, isMoving), getCrossAxisBorderBoxCenter(axis, moveInto.contentBox, isMoving));

var whenReordering = ({
  impact,
  draggable,
  draggables,
  droppable,
  afterCritical
}) => {
  const insideDestination = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
  const draggablePage = draggable.page;
  const axis = droppable.axis;
  if (!insideDestination.length) {
    return goIntoStart({
      axis,
      moveInto: droppable.page,
      isMoving: draggablePage
    });
  }
  const {
    displaced,
    displacedBy
  } = impact;
  const closestAfter = displaced.all[0];
  if (closestAfter) {
    const closest = draggables[closestAfter];
    if (didStartAfterCritical(closestAfter, afterCritical)) {
      return goBefore({
        axis,
        moveRelativeTo: closest.page,
        isMoving: draggablePage
      });
    }
    const withDisplacement = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.offset)(closest.page, displacedBy.point);
    return goBefore({
      axis,
      moveRelativeTo: withDisplacement,
      isMoving: draggablePage
    });
  }
  const last = insideDestination[insideDestination.length - 1];
  if (last.descriptor.id === draggable.descriptor.id) {
    return draggablePage.borderBox.center;
  }
  if (didStartAfterCritical(last.descriptor.id, afterCritical)) {
    const page = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.offset)(last.page, negate(afterCritical.displacedBy.point));
    return goAfter({
      axis,
      moveRelativeTo: page,
      isMoving: draggablePage
    });
  }
  return goAfter({
    axis,
    moveRelativeTo: last.page,
    isMoving: draggablePage
  });
};

var withDroppableDisplacement = (droppable, point) => {
  const frame = droppable.frame;
  if (!frame) {
    return point;
  }
  return add(point, frame.scroll.diff.displacement);
};

const getResultWithoutDroppableDisplacement = ({
  impact,
  draggable,
  droppable,
  draggables,
  afterCritical
}) => {
  const original = draggable.page.borderBox.center;
  const at = impact.at;
  if (!droppable) {
    return original;
  }
  if (!at) {
    return original;
  }
  if (at.type === 'REORDER') {
    return whenReordering({
      impact,
      draggable,
      draggables,
      droppable,
      afterCritical
    });
  }
  return whenCombining({
    impact,
    draggables,
    afterCritical
  });
};
var getPageBorderBoxCenterFromImpact = args => {
  const withoutDisplacement = getResultWithoutDroppableDisplacement(args);
  const droppable = args.droppable;
  const withDisplacement = droppable ? withDroppableDisplacement(droppable, withoutDisplacement) : withoutDisplacement;
  return withDisplacement;
};

var scrollViewport = (viewport, newScroll) => {
  const diff = subtract(newScroll, viewport.scroll.initial);
  const displacement = negate(diff);
  const frame = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.getRect)({
    top: newScroll.y,
    bottom: newScroll.y + viewport.frame.height,
    left: newScroll.x,
    right: newScroll.x + viewport.frame.width
  });
  const updated = {
    frame,
    scroll: {
      initial: viewport.scroll.initial,
      max: viewport.scroll.max,
      current: newScroll,
      diff: {
        value: diff,
        displacement
      }
    }
  };
  return updated;
};

function getDraggables$1(ids, draggables) {
  return ids.map(id => draggables[id]);
}
function tryGetVisible(id, groups) {
  for (let i = 0; i < groups.length; i++) {
    const displacement = groups[i].visible[id];
    if (displacement) {
      return displacement;
    }
  }
  return null;
}
var speculativelyIncrease = ({
  impact,
  viewport,
  destination,
  draggables,
  maxScrollChange
}) => {
  const scrolledViewport = scrollViewport(viewport, add(viewport.scroll.current, maxScrollChange));
  const scrolledDroppable = destination.frame ? scrollDroppable(destination, add(destination.frame.scroll.current, maxScrollChange)) : destination;
  const last = impact.displaced;
  const withViewportScroll = getDisplacementGroups({
    afterDragging: getDraggables$1(last.all, draggables),
    destination,
    displacedBy: impact.displacedBy,
    viewport: scrolledViewport.frame,
    last,
    forceShouldAnimate: false
  });
  const withDroppableScroll = getDisplacementGroups({
    afterDragging: getDraggables$1(last.all, draggables),
    destination: scrolledDroppable,
    displacedBy: impact.displacedBy,
    viewport: viewport.frame,
    last,
    forceShouldAnimate: false
  });
  const invisible = {};
  const visible = {};
  const groups = [last, withViewportScroll, withDroppableScroll];
  last.all.forEach(id => {
    const displacement = tryGetVisible(id, groups);
    if (displacement) {
      visible[id] = displacement;
      return;
    }
    invisible[id] = true;
  });
  const newImpact = {
    ...impact,
    displaced: {
      all: last.all,
      invisible,
      visible
    }
  };
  return newImpact;
};

var withViewportDisplacement = (viewport, point) => add(viewport.scroll.diff.displacement, point);

var getClientFromPageBorderBoxCenter = ({
  pageBorderBoxCenter,
  draggable,
  viewport
}) => {
  const withoutPageScrollChange = withViewportDisplacement(viewport, pageBorderBoxCenter);
  const offset = subtract(withoutPageScrollChange, draggable.page.borderBox.center);
  return add(draggable.client.borderBox.center, offset);
};

var isTotallyVisibleInNewLocation = ({
  draggable,
  destination,
  newPageBorderBoxCenter,
  viewport,
  withDroppableDisplacement,
  onlyOnMainAxis = false
}) => {
  const changeNeeded = subtract(newPageBorderBoxCenter, draggable.page.borderBox.center);
  const shifted = offsetByPosition(draggable.page.borderBox, changeNeeded);
  const args = {
    target: shifted,
    destination,
    withDroppableDisplacement,
    viewport
  };
  return onlyOnMainAxis ? isTotallyVisibleOnAxis(args) : isTotallyVisible(args);
};

var moveToNextPlace = ({
  isMovingForward,
  draggable,
  destination,
  draggables,
  previousImpact,
  viewport,
  previousPageBorderBoxCenter,
  previousClientSelection,
  afterCritical
}) => {
  if (!destination.isEnabled) {
    return null;
  }
  const insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  const isInHomeList = isHomeOf(draggable, destination);
  const impact = moveToNextCombine({
    isMovingForward,
    draggable,
    destination,
    insideDestination,
    previousImpact
  }) || moveToNextIndex({
    isMovingForward,
    isInHomeList,
    draggable,
    draggables,
    destination,
    insideDestination,
    previousImpact,
    viewport,
    afterCritical
  });
  if (!impact) {
    return null;
  }
  const pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact,
    draggable,
    droppable: destination,
    draggables,
    afterCritical
  });
  const isVisibleInNewLocation = isTotallyVisibleInNewLocation({
    draggable,
    destination,
    newPageBorderBoxCenter: pageBorderBoxCenter,
    viewport: viewport.frame,
    withDroppableDisplacement: false,
    onlyOnMainAxis: true
  });
  if (isVisibleInNewLocation) {
    const clientSelection = getClientFromPageBorderBoxCenter({
      pageBorderBoxCenter,
      draggable,
      viewport
    });
    return {
      clientSelection,
      impact,
      scrollJumpRequest: null
    };
  }
  const distance = subtract(pageBorderBoxCenter, previousPageBorderBoxCenter);
  const cautious = speculativelyIncrease({
    impact,
    viewport,
    destination,
    draggables,
    maxScrollChange: distance
  });
  return {
    clientSelection: previousClientSelection,
    impact: cautious,
    scrollJumpRequest: distance
  };
};

const getKnownActive = droppable => {
  const rect = droppable.subject.active;
  !rect ?  true ? invariant(false, 'Cannot get clipped area from droppable') : 0 : void 0;
  return rect;
};
var getBestCrossAxisDroppable = ({
  isMovingForward,
  pageBorderBoxCenter,
  source,
  droppables,
  viewport
}) => {
  const active = source.subject.active;
  if (!active) {
    return null;
  }
  const axis = source.axis;
  const isBetweenSourceClipped = isWithin(active[axis.start], active[axis.end]);
  const candidates = toDroppableList(droppables).filter(droppable => droppable !== source).filter(droppable => droppable.isEnabled).filter(droppable => Boolean(droppable.subject.active)).filter(droppable => isPartiallyVisibleThroughFrame(viewport.frame)(getKnownActive(droppable))).filter(droppable => {
    const activeOfTarget = getKnownActive(droppable);
    if (isMovingForward) {
      return active[axis.crossAxisEnd] < activeOfTarget[axis.crossAxisEnd];
    }
    return activeOfTarget[axis.crossAxisStart] < active[axis.crossAxisStart];
  }).filter(droppable => {
    const activeOfTarget = getKnownActive(droppable);
    const isBetweenDestinationClipped = isWithin(activeOfTarget[axis.start], activeOfTarget[axis.end]);
    return isBetweenSourceClipped(activeOfTarget[axis.start]) || isBetweenSourceClipped(activeOfTarget[axis.end]) || isBetweenDestinationClipped(active[axis.start]) || isBetweenDestinationClipped(active[axis.end]);
  }).sort((a, b) => {
    const first = getKnownActive(a)[axis.crossAxisStart];
    const second = getKnownActive(b)[axis.crossAxisStart];
    if (isMovingForward) {
      return first - second;
    }
    return second - first;
  }).filter((droppable, index, array) => getKnownActive(droppable)[axis.crossAxisStart] === getKnownActive(array[0])[axis.crossAxisStart]);
  if (!candidates.length) {
    return null;
  }
  if (candidates.length === 1) {
    return candidates[0];
  }
  const contains = candidates.filter(droppable => {
    const isWithinDroppable = isWithin(getKnownActive(droppable)[axis.start], getKnownActive(droppable)[axis.end]);
    return isWithinDroppable(pageBorderBoxCenter[axis.line]);
  });
  if (contains.length === 1) {
    return contains[0];
  }
  if (contains.length > 1) {
    return contains.sort((a, b) => getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start])[0];
  }
  return candidates.sort((a, b) => {
    const first = closest$1(pageBorderBoxCenter, getCorners(getKnownActive(a)));
    const second = closest$1(pageBorderBoxCenter, getCorners(getKnownActive(b)));
    if (first !== second) {
      return first - second;
    }
    return getKnownActive(a)[axis.start] - getKnownActive(b)[axis.start];
  })[0];
};

const getCurrentPageBorderBoxCenter = (draggable, afterCritical) => {
  const original = draggable.page.borderBox.center;
  return didStartAfterCritical(draggable.descriptor.id, afterCritical) ? subtract(original, afterCritical.displacedBy.point) : original;
};
const getCurrentPageBorderBox = (draggable, afterCritical) => {
  const original = draggable.page.borderBox;
  return didStartAfterCritical(draggable.descriptor.id, afterCritical) ? offsetByPosition(original, negate(afterCritical.displacedBy.point)) : original;
};

var getClosestDraggable = ({
  pageBorderBoxCenter,
  viewport,
  destination,
  insideDestination,
  afterCritical
}) => {
  const sorted = insideDestination.filter(draggable => isTotallyVisible({
    target: getCurrentPageBorderBox(draggable, afterCritical),
    destination,
    viewport: viewport.frame,
    withDroppableDisplacement: true
  })).sort((a, b) => {
    const distanceToA = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(a, afterCritical)));
    const distanceToB = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, getCurrentPageBorderBoxCenter(b, afterCritical)));
    if (distanceToA < distanceToB) {
      return -1;
    }
    if (distanceToB < distanceToA) {
      return 1;
    }
    return a.descriptor.index - b.descriptor.index;
  });
  return sorted[0] || null;
};

var getDisplacedBy = memoizeOne(function getDisplacedBy(axis, displaceBy) {
  const displacement = displaceBy[axis.line];
  return {
    value: displacement,
    point: patch(axis.line, displacement)
  };
});

const getRequiredGrowthForPlaceholder = (droppable, placeholderSize, draggables) => {
  const axis = droppable.axis;
  if (droppable.descriptor.mode === 'virtual') {
    return patch(axis.line, placeholderSize[axis.line]);
  }
  const availableSpace = droppable.subject.page.contentBox[axis.size];
  const insideDroppable = getDraggablesInsideDroppable(droppable.descriptor.id, draggables);
  const spaceUsed = insideDroppable.reduce((sum, dimension) => sum + dimension.client.marginBox[axis.size], 0);
  const requiredSpace = spaceUsed + placeholderSize[axis.line];
  const needsToGrowBy = requiredSpace - availableSpace;
  if (needsToGrowBy <= 0) {
    return null;
  }
  return patch(axis.line, needsToGrowBy);
};
const withMaxScroll = (frame, max) => ({
  ...frame,
  scroll: {
    ...frame.scroll,
    max
  }
});
const addPlaceholder = (droppable, draggable, draggables) => {
  const frame = droppable.frame;
  !!isHomeOf(draggable, droppable) ?  true ? invariant(false, 'Should not add placeholder space to home list') : 0 : void 0;
  !!droppable.subject.withPlaceholder ?  true ? invariant(false, 'Cannot add placeholder size to a subject when it already has one') : 0 : void 0;
  const placeholderSize = getDisplacedBy(droppable.axis, draggable.displaceBy).point;
  const requiredGrowth = getRequiredGrowthForPlaceholder(droppable, placeholderSize, draggables);
  const added = {
    placeholderSize,
    increasedBy: requiredGrowth,
    oldFrameMaxScroll: droppable.frame ? droppable.frame.scroll.max : null
  };
  if (!frame) {
    const subject = getSubject({
      page: droppable.subject.page,
      withPlaceholder: added,
      axis: droppable.axis,
      frame: droppable.frame
    });
    return {
      ...droppable,
      subject
    };
  }
  const maxScroll = requiredGrowth ? add(frame.scroll.max, requiredGrowth) : frame.scroll.max;
  const newFrame = withMaxScroll(frame, maxScroll);
  const subject = getSubject({
    page: droppable.subject.page,
    withPlaceholder: added,
    axis: droppable.axis,
    frame: newFrame
  });
  return {
    ...droppable,
    subject,
    frame: newFrame
  };
};
const removePlaceholder = droppable => {
  const added = droppable.subject.withPlaceholder;
  !added ?  true ? invariant(false, 'Cannot remove placeholder form subject when there was none') : 0 : void 0;
  const frame = droppable.frame;
  if (!frame) {
    const subject = getSubject({
      page: droppable.subject.page,
      axis: droppable.axis,
      frame: null,
      withPlaceholder: null
    });
    return {
      ...droppable,
      subject
    };
  }
  const oldMaxScroll = added.oldFrameMaxScroll;
  !oldMaxScroll ?  true ? invariant(false, 'Expected droppable with frame to have old max frame scroll when removing placeholder') : 0 : void 0;
  const newFrame = withMaxScroll(frame, oldMaxScroll);
  const subject = getSubject({
    page: droppable.subject.page,
    axis: droppable.axis,
    frame: newFrame,
    withPlaceholder: null
  });
  return {
    ...droppable,
    subject,
    frame: newFrame
  };
};

var moveToNewDroppable = ({
  previousPageBorderBoxCenter,
  moveRelativeTo,
  insideDestination,
  draggable,
  draggables,
  destination,
  viewport,
  afterCritical
}) => {
  if (!moveRelativeTo) {
    if (insideDestination.length) {
      return null;
    }
    const proposed = {
      displaced: emptyGroups,
      displacedBy: noDisplacedBy,
      at: {
        type: 'REORDER',
        destination: {
          droppableId: destination.descriptor.id,
          index: 0
        }
      }
    };
    const proposedPageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
      impact: proposed,
      draggable,
      droppable: destination,
      draggables,
      afterCritical
    });
    const withPlaceholder = isHomeOf(draggable, destination) ? destination : addPlaceholder(destination, draggable, draggables);
    const isVisibleInNewLocation = isTotallyVisibleInNewLocation({
      draggable,
      destination: withPlaceholder,
      newPageBorderBoxCenter: proposedPageBorderBoxCenter,
      viewport: viewport.frame,
      withDroppableDisplacement: false,
      onlyOnMainAxis: true
    });
    return isVisibleInNewLocation ? proposed : null;
  }
  const isGoingBeforeTarget = Boolean(previousPageBorderBoxCenter[destination.axis.line] <= moveRelativeTo.page.borderBox.center[destination.axis.line]);
  const proposedIndex = (() => {
    const relativeTo = moveRelativeTo.descriptor.index;
    if (moveRelativeTo.descriptor.id === draggable.descriptor.id) {
      return relativeTo;
    }
    if (isGoingBeforeTarget) {
      return relativeTo;
    }
    return relativeTo + 1;
  })();
  const displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  return calculateReorderImpact({
    draggable,
    insideDestination,
    destination,
    viewport,
    displacedBy,
    last: emptyGroups,
    index: proposedIndex
  });
};

var moveCrossAxis = ({
  isMovingForward,
  previousPageBorderBoxCenter,
  draggable,
  isOver,
  draggables,
  droppables,
  viewport,
  afterCritical
}) => {
  const destination = getBestCrossAxisDroppable({
    isMovingForward,
    pageBorderBoxCenter: previousPageBorderBoxCenter,
    source: isOver,
    droppables,
    viewport
  });
  if (!destination) {
    return null;
  }
  const insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  const moveRelativeTo = getClosestDraggable({
    pageBorderBoxCenter: previousPageBorderBoxCenter,
    viewport,
    destination,
    insideDestination,
    afterCritical
  });
  const impact = moveToNewDroppable({
    previousPageBorderBoxCenter,
    destination,
    draggable,
    draggables,
    moveRelativeTo,
    insideDestination,
    viewport,
    afterCritical
  });
  if (!impact) {
    return null;
  }
  const pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact,
    draggable,
    droppable: destination,
    draggables,
    afterCritical
  });
  const clientSelection = getClientFromPageBorderBoxCenter({
    pageBorderBoxCenter,
    draggable,
    viewport
  });
  return {
    clientSelection,
    impact,
    scrollJumpRequest: null
  };
};

var whatIsDraggedOver = impact => {
  const at = impact.at;
  if (!at) {
    return null;
  }
  if (at.type === 'REORDER') {
    return at.destination.droppableId;
  }
  return at.combine.droppableId;
};

const getDroppableOver$1 = (impact, droppables) => {
  const id = whatIsDraggedOver(impact);
  return id ? droppables[id] : null;
};
var moveInDirection = ({
  state,
  type
}) => {
  const isActuallyOver = getDroppableOver$1(state.impact, state.dimensions.droppables);
  const isMainAxisMovementAllowed = Boolean(isActuallyOver);
  const home = state.dimensions.droppables[state.critical.droppable.id];
  const isOver = isActuallyOver || home;
  const direction = isOver.axis.direction;
  const isMovingOnMainAxis = direction === 'vertical' && (type === 'MOVE_UP' || type === 'MOVE_DOWN') || direction === 'horizontal' && (type === 'MOVE_LEFT' || type === 'MOVE_RIGHT');
  if (isMovingOnMainAxis && !isMainAxisMovementAllowed) {
    return null;
  }
  const isMovingForward = type === 'MOVE_DOWN' || type === 'MOVE_RIGHT';
  const draggable = state.dimensions.draggables[state.critical.draggable.id];
  const previousPageBorderBoxCenter = state.current.page.borderBoxCenter;
  const {
    draggables,
    droppables
  } = state.dimensions;
  return isMovingOnMainAxis ? moveToNextPlace({
    isMovingForward,
    previousPageBorderBoxCenter,
    draggable,
    destination: isOver,
    draggables,
    viewport: state.viewport,
    previousClientSelection: state.current.client.selection,
    previousImpact: state.impact,
    afterCritical: state.afterCritical
  }) : moveCrossAxis({
    isMovingForward,
    previousPageBorderBoxCenter,
    draggable,
    isOver,
    draggables,
    droppables,
    viewport: state.viewport,
    afterCritical: state.afterCritical
  });
};

function isMovementAllowed(state) {
  return state.phase === 'DRAGGING' || state.phase === 'COLLECTING';
}

function isPositionInFrame(frame) {
  const isWithinVertical = isWithin(frame.top, frame.bottom);
  const isWithinHorizontal = isWithin(frame.left, frame.right);
  return function run(point) {
    return isWithinVertical(point.y) && isWithinHorizontal(point.x);
  };
}

function getHasOverlap(first, second) {
  return first.left < second.right && first.right > second.left && first.top < second.bottom && first.bottom > second.top;
}
function getFurthestAway({
  pageBorderBox,
  draggable,
  candidates
}) {
  const startCenter = draggable.page.borderBox.center;
  const sorted = candidates.map(candidate => {
    const axis = candidate.axis;
    const target = patch(candidate.axis.line, pageBorderBox.center[axis.line], candidate.page.borderBox.center[axis.crossAxisLine]);
    return {
      id: candidate.descriptor.id,
      distance: distance(startCenter, target)
    };
  }).sort((a, b) => b.distance - a.distance);
  return sorted[0] ? sorted[0].id : null;
}
function getDroppableOver({
  pageBorderBox,
  draggable,
  droppables
}) {
  const candidates = toDroppableList(droppables).filter(item => {
    if (!item.isEnabled) {
      return false;
    }
    const active = item.subject.active;
    if (!active) {
      return false;
    }
    if (!getHasOverlap(pageBorderBox, active)) {
      return false;
    }
    if (isPositionInFrame(active)(pageBorderBox.center)) {
      return true;
    }
    const axis = item.axis;
    const childCenter = active.center[axis.crossAxisLine];
    const crossAxisStart = pageBorderBox[axis.crossAxisStart];
    const crossAxisEnd = pageBorderBox[axis.crossAxisEnd];
    const isContained = isWithin(active[axis.crossAxisStart], active[axis.crossAxisEnd]);
    const isStartContained = isContained(crossAxisStart);
    const isEndContained = isContained(crossAxisEnd);
    if (!isStartContained && !isEndContained) {
      return true;
    }
    if (isStartContained) {
      return crossAxisStart < childCenter;
    }
    return crossAxisEnd > childCenter;
  });
  if (!candidates.length) {
    return null;
  }
  if (candidates.length === 1) {
    return candidates[0].descriptor.id;
  }
  return getFurthestAway({
    pageBorderBox,
    draggable,
    candidates
  });
}

const offsetRectByPosition = (rect, point) => (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.getRect)(offsetByPosition(rect, point));

var withDroppableScroll = (droppable, area) => {
  const frame = droppable.frame;
  if (!frame) {
    return area;
  }
  return offsetRectByPosition(area, frame.scroll.diff.value);
};

function getIsDisplaced({
  displaced,
  id
}) {
  return Boolean(displaced.visible[id] || displaced.invisible[id]);
}

function atIndex({
  draggable,
  closest,
  inHomeList
}) {
  if (!closest) {
    return null;
  }
  if (!inHomeList) {
    return closest.descriptor.index;
  }
  if (closest.descriptor.index > draggable.descriptor.index) {
    return closest.descriptor.index - 1;
  }
  return closest.descriptor.index;
}
var getReorderImpact = ({
  pageBorderBoxWithDroppableScroll: targetRect,
  draggable,
  destination,
  insideDestination,
  last,
  viewport,
  afterCritical
}) => {
  const axis = destination.axis;
  const displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  const displacement = displacedBy.value;
  const targetStart = targetRect[axis.start];
  const targetEnd = targetRect[axis.end];
  const withoutDragging = removeDraggableFromList(draggable, insideDestination);
  const closest = withoutDragging.find(child => {
    const id = child.descriptor.id;
    const childCenter = child.page.borderBox.center[axis.line];
    const didStartAfterCritical$1 = didStartAfterCritical(id, afterCritical);
    const isDisplaced = getIsDisplaced({
      displaced: last,
      id
    });
    if (didStartAfterCritical$1) {
      if (isDisplaced) {
        return targetEnd <= childCenter;
      }
      return targetStart < childCenter - displacement;
    }
    if (isDisplaced) {
      return targetEnd <= childCenter + displacement;
    }
    return targetStart < childCenter;
  }) || null;
  const newIndex = atIndex({
    draggable,
    closest,
    inHomeList: isHomeOf(draggable, destination)
  });
  return calculateReorderImpact({
    draggable,
    insideDestination,
    destination,
    viewport,
    last,
    displacedBy,
    index: newIndex
  });
};

const combineThresholdDivisor = 4;
var getCombineImpact = ({
  draggable,
  pageBorderBoxWithDroppableScroll: targetRect,
  previousImpact,
  destination,
  insideDestination,
  afterCritical
}) => {
  if (!destination.isCombineEnabled) {
    return null;
  }
  const axis = destination.axis;
  const displacedBy = getDisplacedBy(destination.axis, draggable.displaceBy);
  const displacement = displacedBy.value;
  const targetStart = targetRect[axis.start];
  const targetEnd = targetRect[axis.end];
  const withoutDragging = removeDraggableFromList(draggable, insideDestination);
  const combineWith = withoutDragging.find(child => {
    const id = child.descriptor.id;
    const childRect = child.page.borderBox;
    const childSize = childRect[axis.size];
    const threshold = childSize / combineThresholdDivisor;
    const didStartAfterCritical$1 = didStartAfterCritical(id, afterCritical);
    const isDisplaced = getIsDisplaced({
      displaced: previousImpact.displaced,
      id
    });
    if (didStartAfterCritical$1) {
      if (isDisplaced) {
        return targetEnd > childRect[axis.start] + threshold && targetEnd < childRect[axis.end] - threshold;
      }
      return targetStart > childRect[axis.start] - displacement + threshold && targetStart < childRect[axis.end] - displacement - threshold;
    }
    if (isDisplaced) {
      return targetEnd > childRect[axis.start] + displacement + threshold && targetEnd < childRect[axis.end] + displacement - threshold;
    }
    return targetStart > childRect[axis.start] + threshold && targetStart < childRect[axis.end] - threshold;
  });
  if (!combineWith) {
    return null;
  }
  const impact = {
    displacedBy,
    displaced: previousImpact.displaced,
    at: {
      type: 'COMBINE',
      combine: {
        draggableId: combineWith.descriptor.id,
        droppableId: destination.descriptor.id
      }
    }
  };
  return impact;
};

var getDragImpact = ({
  pageOffset,
  draggable,
  draggables,
  droppables,
  previousImpact,
  viewport,
  afterCritical
}) => {
  const pageBorderBox = offsetRectByPosition(draggable.page.borderBox, pageOffset);
  const destinationId = getDroppableOver({
    pageBorderBox,
    draggable,
    droppables
  });
  if (!destinationId) {
    return noImpact;
  }
  const destination = droppables[destinationId];
  const insideDestination = getDraggablesInsideDroppable(destination.descriptor.id, draggables);
  const pageBorderBoxWithDroppableScroll = withDroppableScroll(destination, pageBorderBox);
  return getCombineImpact({
    pageBorderBoxWithDroppableScroll,
    draggable,
    previousImpact,
    destination,
    insideDestination,
    afterCritical
  }) || getReorderImpact({
    pageBorderBoxWithDroppableScroll,
    draggable,
    destination,
    insideDestination,
    last: previousImpact.displaced,
    viewport,
    afterCritical
  });
};

var patchDroppableMap = (droppables, updated) => ({
  ...droppables,
  [updated.descriptor.id]: updated
});

const clearUnusedPlaceholder = ({
  previousImpact,
  impact,
  droppables
}) => {
  const last = whatIsDraggedOver(previousImpact);
  const now = whatIsDraggedOver(impact);
  if (!last) {
    return droppables;
  }
  if (last === now) {
    return droppables;
  }
  const lastDroppable = droppables[last];
  if (!lastDroppable.subject.withPlaceholder) {
    return droppables;
  }
  const updated = removePlaceholder(lastDroppable);
  return patchDroppableMap(droppables, updated);
};
var recomputePlaceholders = ({
  draggable,
  draggables,
  droppables,
  previousImpact,
  impact
}) => {
  const cleaned = clearUnusedPlaceholder({
    previousImpact,
    impact,
    droppables
  });
  const isOver = whatIsDraggedOver(impact);
  if (!isOver) {
    return cleaned;
  }
  const droppable = droppables[isOver];
  if (isHomeOf(draggable, droppable)) {
    return cleaned;
  }
  if (droppable.subject.withPlaceholder) {
    return cleaned;
  }
  const patched = addPlaceholder(droppable, draggable, draggables);
  return patchDroppableMap(cleaned, patched);
};

var update = ({
  state,
  clientSelection: forcedClientSelection,
  dimensions: forcedDimensions,
  viewport: forcedViewport,
  impact: forcedImpact,
  scrollJumpRequest
}) => {
  const viewport = forcedViewport || state.viewport;
  const dimensions = forcedDimensions || state.dimensions;
  const clientSelection = forcedClientSelection || state.current.client.selection;
  const offset = subtract(clientSelection, state.initial.client.selection);
  const client = {
    offset,
    selection: clientSelection,
    borderBoxCenter: add(state.initial.client.borderBoxCenter, offset)
  };
  const page = {
    selection: add(client.selection, viewport.scroll.current),
    borderBoxCenter: add(client.borderBoxCenter, viewport.scroll.current),
    offset: add(client.offset, viewport.scroll.diff.value)
  };
  const current = {
    client,
    page
  };
  if (state.phase === 'COLLECTING') {
    return {
      ...state,
      dimensions,
      viewport,
      current
    };
  }
  const draggable = dimensions.draggables[state.critical.draggable.id];
  const newImpact = forcedImpact || getDragImpact({
    pageOffset: page.offset,
    draggable,
    draggables: dimensions.draggables,
    droppables: dimensions.droppables,
    previousImpact: state.impact,
    viewport,
    afterCritical: state.afterCritical
  });
  const withUpdatedPlaceholders = recomputePlaceholders({
    draggable,
    impact: newImpact,
    previousImpact: state.impact,
    draggables: dimensions.draggables,
    droppables: dimensions.droppables
  });
  const result = {
    ...state,
    current,
    dimensions: {
      draggables: dimensions.draggables,
      droppables: withUpdatedPlaceholders
    },
    impact: newImpact,
    viewport,
    scrollJumpRequest: scrollJumpRequest || null,
    forceShouldAnimate: scrollJumpRequest ? false : null
  };
  return result;
};

function getDraggables(ids, draggables) {
  return ids.map(id => draggables[id]);
}
var recompute = ({
  impact,
  viewport,
  draggables,
  destination,
  forceShouldAnimate
}) => {
  const last = impact.displaced;
  const afterDragging = getDraggables(last.all, draggables);
  const displaced = getDisplacementGroups({
    afterDragging,
    destination,
    displacedBy: impact.displacedBy,
    viewport: viewport.frame,
    forceShouldAnimate,
    last
  });
  return {
    ...impact,
    displaced
  };
};

var getClientBorderBoxCenter = ({
  impact,
  draggable,
  droppable,
  draggables,
  viewport,
  afterCritical
}) => {
  const pageBorderBoxCenter = getPageBorderBoxCenterFromImpact({
    impact,
    draggable,
    draggables,
    droppable,
    afterCritical
  });
  return getClientFromPageBorderBoxCenter({
    pageBorderBoxCenter,
    draggable,
    viewport
  });
};

var refreshSnap = ({
  state,
  dimensions: forcedDimensions,
  viewport: forcedViewport
}) => {
  !(state.movementMode === 'SNAP') ?  true ? invariant() : 0 : void 0;
  const needsVisibilityCheck = state.impact;
  const viewport = forcedViewport || state.viewport;
  const dimensions = forcedDimensions || state.dimensions;
  const {
    draggables,
    droppables
  } = dimensions;
  const draggable = draggables[state.critical.draggable.id];
  const isOver = whatIsDraggedOver(needsVisibilityCheck);
  !isOver ?  true ? invariant(false, 'Must be over a destination in SNAP movement mode') : 0 : void 0;
  const destination = droppables[isOver];
  const impact = recompute({
    impact: needsVisibilityCheck,
    viewport,
    destination,
    draggables
  });
  const clientSelection = getClientBorderBoxCenter({
    impact,
    draggable,
    droppable: destination,
    draggables,
    viewport,
    afterCritical: state.afterCritical
  });
  return update({
    impact,
    clientSelection,
    state,
    dimensions,
    viewport
  });
};

var getHomeLocation = descriptor => ({
  index: descriptor.index,
  droppableId: descriptor.droppableId
});

var getLiftEffect = ({
  draggable,
  home,
  draggables,
  viewport
}) => {
  const displacedBy = getDisplacedBy(home.axis, draggable.displaceBy);
  const insideHome = getDraggablesInsideDroppable(home.descriptor.id, draggables);
  const rawIndex = insideHome.indexOf(draggable);
  !(rawIndex !== -1) ?  true ? invariant(false, 'Expected draggable to be inside home list') : 0 : void 0;
  const afterDragging = insideHome.slice(rawIndex + 1);
  const effected = afterDragging.reduce((previous, item) => {
    previous[item.descriptor.id] = true;
    return previous;
  }, {});
  const afterCritical = {
    inVirtualList: home.descriptor.mode === 'virtual',
    displacedBy,
    effected
  };
  const displaced = getDisplacementGroups({
    afterDragging,
    destination: home,
    displacedBy,
    last: null,
    viewport: viewport.frame,
    forceShouldAnimate: false
  });
  const impact = {
    displaced,
    displacedBy,
    at: {
      type: 'REORDER',
      destination: getHomeLocation(draggable.descriptor)
    }
  };
  return {
    impact,
    afterCritical
  };
};

var patchDimensionMap = (dimensions, updated) => ({
  draggables: dimensions.draggables,
  droppables: patchDroppableMap(dimensions.droppables, updated)
});

const start = key => {
  if (true) {
    {
      return;
    }
  }
};
const finish = key => {
  if (true) {
    {
      return;
    }
  }
};

var offsetDraggable = ({
  draggable,
  offset: offset$1,
  initialWindowScroll
}) => {
  const client = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.offset)(draggable.client, offset$1);
  const page = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.withScroll)(client, initialWindowScroll);
  const moved = {
    ...draggable,
    placeholder: {
      ...draggable.placeholder,
      client
    },
    client,
    page
  };
  return moved;
};

var getFrame = droppable => {
  const frame = droppable.frame;
  !frame ?  true ? invariant(false, 'Expected Droppable to have a frame') : 0 : void 0;
  return frame;
};

var adjustAdditionsForScrollChanges = ({
  additions,
  updatedDroppables,
  viewport
}) => {
  const windowScrollChange = viewport.scroll.diff.value;
  return additions.map(draggable => {
    const droppableId = draggable.descriptor.droppableId;
    const modified = updatedDroppables[droppableId];
    const frame = getFrame(modified);
    const droppableScrollChange = frame.scroll.diff.value;
    const totalChange = add(windowScrollChange, droppableScrollChange);
    const moved = offsetDraggable({
      draggable,
      offset: totalChange,
      initialWindowScroll: viewport.scroll.initial
    });
    return moved;
  });
};

var publishWhileDraggingInVirtual = ({
  state,
  published
}) => {
  start();
  const withScrollChange = published.modified.map(update => {
    const existing = state.dimensions.droppables[update.droppableId];
    const scrolled = scrollDroppable(existing, update.scroll);
    return scrolled;
  });
  const droppables = {
    ...state.dimensions.droppables,
    ...toDroppableMap(withScrollChange)
  };
  const updatedAdditions = toDraggableMap(adjustAdditionsForScrollChanges({
    additions: published.additions,
    updatedDroppables: droppables,
    viewport: state.viewport
  }));
  const draggables = {
    ...state.dimensions.draggables,
    ...updatedAdditions
  };
  published.removals.forEach(id => {
    delete draggables[id];
  });
  const dimensions = {
    droppables,
    draggables
  };
  const wasOverId = whatIsDraggedOver(state.impact);
  const wasOver = wasOverId ? dimensions.droppables[wasOverId] : null;
  const draggable = dimensions.draggables[state.critical.draggable.id];
  const home = dimensions.droppables[state.critical.droppable.id];
  const {
    impact: onLiftImpact,
    afterCritical
  } = getLiftEffect({
    draggable,
    home,
    draggables,
    viewport: state.viewport
  });
  const previousImpact = wasOver && wasOver.isCombineEnabled ? state.impact : onLiftImpact;
  const impact = getDragImpact({
    pageOffset: state.current.page.offset,
    draggable: dimensions.draggables[state.critical.draggable.id],
    draggables: dimensions.draggables,
    droppables: dimensions.droppables,
    previousImpact,
    viewport: state.viewport,
    afterCritical
  });
  finish();
  const draggingState = {
    ...state,
    phase: 'DRAGGING',
    impact,
    onLiftImpact,
    dimensions,
    afterCritical,
    forceShouldAnimate: false
  };
  if (state.phase === 'COLLECTING') {
    return draggingState;
  }
  const dropPending = {
    ...draggingState,
    phase: 'DROP_PENDING',
    reason: state.reason,
    isWaiting: false
  };
  return dropPending;
};

const isSnapping = state => state.movementMode === 'SNAP';
const postDroppableChange = (state, updated, isEnabledChanging) => {
  const dimensions = patchDimensionMap(state.dimensions, updated);
  if (!isSnapping(state) || isEnabledChanging) {
    return update({
      state,
      dimensions
    });
  }
  return refreshSnap({
    state,
    dimensions
  });
};
function removeScrollJumpRequest(state) {
  if (state.isDragging && state.movementMode === 'SNAP') {
    return {
      ...state,
      scrollJumpRequest: null
    };
  }
  return state;
}
const idle$2 = {
  phase: 'IDLE',
  completed: null,
  shouldFlush: false
};
var reducer = (state = idle$2, action) => {
  if (action.type === 'FLUSH') {
    return {
      ...idle$2,
      shouldFlush: true
    };
  }
  if (action.type === 'INITIAL_PUBLISH') {
    !(state.phase === 'IDLE') ?  true ? invariant(false, 'INITIAL_PUBLISH must come after a IDLE phase') : 0 : void 0;
    const {
      critical,
      clientSelection,
      viewport,
      dimensions,
      movementMode
    } = action.payload;
    const draggable = dimensions.draggables[critical.draggable.id];
    const home = dimensions.droppables[critical.droppable.id];
    const client = {
      selection: clientSelection,
      borderBoxCenter: draggable.client.borderBox.center,
      offset: origin
    };
    const initial = {
      client,
      page: {
        selection: add(client.selection, viewport.scroll.initial),
        borderBoxCenter: add(client.selection, viewport.scroll.initial),
        offset: add(client.selection, viewport.scroll.diff.value)
      }
    };
    const isWindowScrollAllowed = toDroppableList(dimensions.droppables).every(item => !item.isFixedOnPage);
    const {
      impact,
      afterCritical
    } = getLiftEffect({
      draggable,
      home,
      draggables: dimensions.draggables,
      viewport
    });
    const result = {
      phase: 'DRAGGING',
      isDragging: true,
      critical,
      movementMode,
      dimensions,
      initial,
      current: initial,
      isWindowScrollAllowed,
      impact,
      afterCritical,
      onLiftImpact: impact,
      viewport,
      scrollJumpRequest: null,
      forceShouldAnimate: null
    };
    return result;
  }
  if (action.type === 'COLLECTION_STARTING') {
    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
      return state;
    }
    !(state.phase === 'DRAGGING') ?  true ? invariant(false, `Collection cannot start from phase ${state.phase}`) : 0 : void 0;
    const result = {
      ...state,
      phase: 'COLLECTING'
    };
    return result;
  }
  if (action.type === 'PUBLISH_WHILE_DRAGGING') {
    !(state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') ?  true ? invariant(false, `Unexpected ${action.type} received in phase ${state.phase}`) : 0 : void 0;
    return publishWhileDraggingInVirtual({
      state,
      published: action.payload
    });
  }
  if (action.type === 'MOVE') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }
    !isMovementAllowed(state) ?  true ? invariant(false, `${action.type} not permitted in phase ${state.phase}`) : 0 : void 0;
    const {
      client: clientSelection
    } = action.payload;
    if (isEqual$1(clientSelection, state.current.client.selection)) {
      return state;
    }
    return update({
      state,
      clientSelection,
      impact: isSnapping(state) ? state.impact : null
    });
  }
  if (action.type === 'UPDATE_DROPPABLE_SCROLL') {
    if (state.phase === 'DROP_PENDING') {
      return removeScrollJumpRequest(state);
    }
    if (state.phase === 'COLLECTING') {
      return removeScrollJumpRequest(state);
    }
    !isMovementAllowed(state) ?  true ? invariant(false, `${action.type} not permitted in phase ${state.phase}`) : 0 : void 0;
    const {
      id,
      newScroll
    } = action.payload;
    const target = state.dimensions.droppables[id];
    if (!target) {
      return state;
    }
    const scrolled = scrollDroppable(target, newScroll);
    return postDroppableChange(state, scrolled, false);
  }
  if (action.type === 'UPDATE_DROPPABLE_IS_ENABLED') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }
    !isMovementAllowed(state) ?  true ? invariant(false, `Attempting to move in an unsupported phase ${state.phase}`) : 0 : void 0;
    const {
      id,
      isEnabled
    } = action.payload;
    const target = state.dimensions.droppables[id];
    !target ?  true ? invariant(false, `Cannot find Droppable[id: ${id}] to toggle its enabled state`) : 0 : void 0;
    !(target.isEnabled !== isEnabled) ?  true ? invariant(false, `Trying to set droppable isEnabled to ${String(isEnabled)}
      but it is already ${String(target.isEnabled)}`) : 0 : void 0;
    const updated = {
      ...target,
      isEnabled
    };
    return postDroppableChange(state, updated, true);
  }
  if (action.type === 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED') {
    if (state.phase === 'DROP_PENDING') {
      return state;
    }
    !isMovementAllowed(state) ?  true ? invariant(false, `Attempting to move in an unsupported phase ${state.phase}`) : 0 : void 0;
    const {
      id,
      isCombineEnabled
    } = action.payload;
    const target = state.dimensions.droppables[id];
    !target ?  true ? invariant(false, `Cannot find Droppable[id: ${id}] to toggle its isCombineEnabled state`) : 0 : void 0;
    !(target.isCombineEnabled !== isCombineEnabled) ?  true ? invariant(false, `Trying to set droppable isCombineEnabled to ${String(isCombineEnabled)}
      but it is already ${String(target.isCombineEnabled)}`) : 0 : void 0;
    const updated = {
      ...target,
      isCombineEnabled
    };
    return postDroppableChange(state, updated, true);
  }
  if (action.type === 'MOVE_BY_WINDOW_SCROLL') {
    if (state.phase === 'DROP_PENDING' || state.phase === 'DROP_ANIMATING') {
      return state;
    }
    !isMovementAllowed(state) ?  true ? invariant(false, `Cannot move by window in phase ${state.phase}`) : 0 : void 0;
    !state.isWindowScrollAllowed ?  true ? invariant(false, 'Window scrolling is currently not supported for fixed lists') : 0 : void 0;
    const newScroll = action.payload.newScroll;
    if (isEqual$1(state.viewport.scroll.current, newScroll)) {
      return removeScrollJumpRequest(state);
    }
    const viewport = scrollViewport(state.viewport, newScroll);
    if (isSnapping(state)) {
      return refreshSnap({
        state,
        viewport
      });
    }
    return update({
      state,
      viewport
    });
  }
  if (action.type === 'UPDATE_VIEWPORT_MAX_SCROLL') {
    if (!isMovementAllowed(state)) {
      return state;
    }
    const maxScroll = action.payload.maxScroll;
    if (isEqual$1(maxScroll, state.viewport.scroll.max)) {
      return state;
    }
    const withMaxScroll = {
      ...state.viewport,
      scroll: {
        ...state.viewport.scroll,
        max: maxScroll
      }
    };
    return {
      ...state,
      viewport: withMaxScroll
    };
  }
  if (action.type === 'MOVE_UP' || action.type === 'MOVE_DOWN' || action.type === 'MOVE_LEFT' || action.type === 'MOVE_RIGHT') {
    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
      return state;
    }
    !(state.phase === 'DRAGGING') ?  true ? invariant(false, `${action.type} received while not in DRAGGING phase`) : 0 : void 0;
    const result = moveInDirection({
      state,
      type: action.type
    });
    if (!result) {
      return state;
    }
    return update({
      state,
      impact: result.impact,
      clientSelection: result.clientSelection,
      scrollJumpRequest: result.scrollJumpRequest
    });
  }
  if (action.type === 'DROP_PENDING') {
    const reason = action.payload.reason;
    !(state.phase === 'COLLECTING') ?  true ? invariant(false, 'Can only move into the DROP_PENDING phase from the COLLECTING phase') : 0 : void 0;
    const newState = {
      ...state,
      phase: 'DROP_PENDING',
      isWaiting: true,
      reason
    };
    return newState;
  }
  if (action.type === 'DROP_ANIMATE') {
    const {
      completed,
      dropDuration,
      newHomeClientOffset
    } = action.payload;
    !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ?  true ? invariant(false, `Cannot animate drop from phase ${state.phase}`) : 0 : void 0;
    const result = {
      phase: 'DROP_ANIMATING',
      completed,
      dropDuration,
      newHomeClientOffset,
      dimensions: state.dimensions
    };
    return result;
  }
  if (action.type === 'DROP_COMPLETE') {
    const {
      completed
    } = action.payload;
    return {
      phase: 'IDLE',
      completed,
      shouldFlush: false
    };
  }
  return state;
};

function guard(action, predicate) {
  return action instanceof Object && 'type' in action && action.type === predicate;
}
const beforeInitialCapture = args => ({
  type: 'BEFORE_INITIAL_CAPTURE',
  payload: args
});
const lift$1 = args => ({
  type: 'LIFT',
  payload: args
});
const initialPublish = args => ({
  type: 'INITIAL_PUBLISH',
  payload: args
});
const publishWhileDragging = args => ({
  type: 'PUBLISH_WHILE_DRAGGING',
  payload: args
});
const collectionStarting = () => ({
  type: 'COLLECTION_STARTING',
  payload: null
});
const updateDroppableScroll = args => ({
  type: 'UPDATE_DROPPABLE_SCROLL',
  payload: args
});
const updateDroppableIsEnabled = args => ({
  type: 'UPDATE_DROPPABLE_IS_ENABLED',
  payload: args
});
const updateDroppableIsCombineEnabled = args => ({
  type: 'UPDATE_DROPPABLE_IS_COMBINE_ENABLED',
  payload: args
});
const move = args => ({
  type: 'MOVE',
  payload: args
});
const moveByWindowScroll = args => ({
  type: 'MOVE_BY_WINDOW_SCROLL',
  payload: args
});
const updateViewportMaxScroll = args => ({
  type: 'UPDATE_VIEWPORT_MAX_SCROLL',
  payload: args
});
const moveUp = () => ({
  type: 'MOVE_UP',
  payload: null
});
const moveDown = () => ({
  type: 'MOVE_DOWN',
  payload: null
});
const moveRight = () => ({
  type: 'MOVE_RIGHT',
  payload: null
});
const moveLeft = () => ({
  type: 'MOVE_LEFT',
  payload: null
});
const flush = () => ({
  type: 'FLUSH',
  payload: null
});
const animateDrop = args => ({
  type: 'DROP_ANIMATE',
  payload: args
});
const completeDrop = args => ({
  type: 'DROP_COMPLETE',
  payload: args
});
const drop = args => ({
  type: 'DROP',
  payload: args
});
const dropPending = args => ({
  type: 'DROP_PENDING',
  payload: args
});
const dropAnimationFinished = () => ({
  type: 'DROP_ANIMATION_FINISHED',
  payload: null
});

function checkIndexes(insideDestination) {
  if (insideDestination.length <= 1) {
    return;
  }
  const indexes = insideDestination.map(d => d.descriptor.index);
  const errors = {};
  for (let i = 1; i < indexes.length; i++) {
    const current = indexes[i];
    const previous = indexes[i - 1];
    if (current !== previous + 1) {
      errors[current] = true;
    }
  }
  if (!Object.keys(errors).length) {
    return;
  }
  const formatted = indexes.map(index => {
    const hasError = Boolean(errors[index]);
    return hasError ? `[🔥${index}]` : `${index}`;
  }).join(', ');
   true ? warning(`
    Detected non-consecutive <Draggable /> indexes.

    (This can cause unexpected bugs)

    ${formatted}
  `) : 0;
}
function validateDimensions(critical, dimensions) {
  if (true) {
    const insideDestination = getDraggablesInsideDroppable(critical.droppable.id, dimensions.draggables);
    checkIndexes(insideDestination);
  }
}

var lift = marshal => ({
  getState,
  dispatch
}) => next => action => {
  if (!guard(action, 'LIFT')) {
    next(action);
    return;
  }
  const {
    id,
    clientSelection,
    movementMode
  } = action.payload;
  const initial = getState();
  if (initial.phase === 'DROP_ANIMATING') {
    dispatch(completeDrop({
      completed: initial.completed
    }));
  }
  !(getState().phase === 'IDLE') ?  true ? invariant(false, 'Unexpected phase to start a drag') : 0 : void 0;
  dispatch(flush());
  dispatch(beforeInitialCapture({
    draggableId: id,
    movementMode
  }));
  const scrollOptions = {
    shouldPublishImmediately: movementMode === 'SNAP'
  };
  const request = {
    draggableId: id,
    scrollOptions
  };
  const {
    critical,
    dimensions,
    viewport
  } = marshal.startPublishing(request);
  validateDimensions(critical, dimensions);
  dispatch(initialPublish({
    critical,
    dimensions,
    clientSelection,
    movementMode,
    viewport
  }));
};

var style = marshal => () => next => action => {
  if (guard(action, 'INITIAL_PUBLISH')) {
    marshal.dragging();
  }
  if (guard(action, 'DROP_ANIMATE')) {
    marshal.dropping(action.payload.completed.result.reason);
  }
  if (guard(action, 'FLUSH') || guard(action, 'DROP_COMPLETE')) {
    marshal.resting();
  }
  next(action);
};

const curves = {
  outOfTheWay: 'cubic-bezier(0.2, 0, 0, 1)',
  drop: 'cubic-bezier(.2,1,.1,1)'
};
const combine = {
  opacity: {
    drop: 0,
    combining: 0.7
  },
  scale: {
    drop: 0.75
  }
};
const timings = {
  outOfTheWay: 0.2,
  minDropTime: 0.33,
  maxDropTime: 0.55
};
const outOfTheWayTiming = `${timings.outOfTheWay}s ${curves.outOfTheWay}`;
const transitions = {
  fluid: `opacity ${outOfTheWayTiming}`,
  snap: `transform ${outOfTheWayTiming}, opacity ${outOfTheWayTiming}`,
  drop: duration => {
    const timing = `${duration}s ${curves.drop}`;
    return `transform ${timing}, opacity ${timing}`;
  },
  outOfTheWay: `transform ${outOfTheWayTiming}`,
  placeholder: `height ${outOfTheWayTiming}, width ${outOfTheWayTiming}, margin ${outOfTheWayTiming}`
};
const moveTo = offset => isEqual$1(offset, origin) ? undefined : `translate(${offset.x}px, ${offset.y}px)`;
const transforms = {
  moveTo,
  drop: (offset, isCombining) => {
    const translate = moveTo(offset);
    if (!translate) {
      return undefined;
    }
    if (!isCombining) {
      return translate;
    }
    return `${translate} scale(${combine.scale.drop})`;
  }
};

const {
  minDropTime,
  maxDropTime
} = timings;
const dropTimeRange = maxDropTime - minDropTime;
const maxDropTimeAtDistance = 1500;
const cancelDropModifier = 0.6;
var getDropDuration = ({
  current,
  destination,
  reason
}) => {
  const distance$1 = distance(current, destination);
  if (distance$1 <= 0) {
    return minDropTime;
  }
  if (distance$1 >= maxDropTimeAtDistance) {
    return maxDropTime;
  }
  const percentage = distance$1 / maxDropTimeAtDistance;
  const duration = minDropTime + dropTimeRange * percentage;
  const withDuration = reason === 'CANCEL' ? duration * cancelDropModifier : duration;
  return Number(withDuration.toFixed(2));
};

var getNewHomeClientOffset = ({
  impact,
  draggable,
  dimensions,
  viewport,
  afterCritical
}) => {
  const {
    draggables,
    droppables
  } = dimensions;
  const droppableId = whatIsDraggedOver(impact);
  const destination = droppableId ? droppables[droppableId] : null;
  const home = droppables[draggable.descriptor.droppableId];
  const newClientCenter = getClientBorderBoxCenter({
    impact,
    draggable,
    draggables,
    afterCritical,
    droppable: destination || home,
    viewport
  });
  const offset = subtract(newClientCenter, draggable.client.borderBox.center);
  return offset;
};

var getDropImpact = ({
  draggables,
  reason,
  lastImpact,
  home,
  viewport,
  onLiftImpact
}) => {
  if (!lastImpact.at || reason !== 'DROP') {
    const recomputedHomeImpact = recompute({
      draggables,
      impact: onLiftImpact,
      destination: home,
      viewport,
      forceShouldAnimate: true
    });
    return {
      impact: recomputedHomeImpact,
      didDropInsideDroppable: false
    };
  }
  if (lastImpact.at.type === 'REORDER') {
    return {
      impact: lastImpact,
      didDropInsideDroppable: true
    };
  }
  const withoutMovement = {
    ...lastImpact,
    displaced: emptyGroups
  };
  return {
    impact: withoutMovement,
    didDropInsideDroppable: true
  };
};

const dropMiddleware = ({
  getState,
  dispatch
}) => next => action => {
  if (!guard(action, 'DROP')) {
    next(action);
    return;
  }
  const state = getState();
  const reason = action.payload.reason;
  if (state.phase === 'COLLECTING') {
    dispatch(dropPending({
      reason
    }));
    return;
  }
  if (state.phase === 'IDLE') {
    return;
  }
  const isWaitingForDrop = state.phase === 'DROP_PENDING' && state.isWaiting;
  !!isWaitingForDrop ?  true ? invariant(false, 'A DROP action occurred while DROP_PENDING and still waiting') : 0 : void 0;
  !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ?  true ? invariant(false, `Cannot drop in phase: ${state.phase}`) : 0 : void 0;
  const critical = state.critical;
  const dimensions = state.dimensions;
  const draggable = dimensions.draggables[state.critical.draggable.id];
  const {
    impact,
    didDropInsideDroppable
  } = getDropImpact({
    reason,
    lastImpact: state.impact,
    afterCritical: state.afterCritical,
    onLiftImpact: state.onLiftImpact,
    home: state.dimensions.droppables[state.critical.droppable.id],
    viewport: state.viewport,
    draggables: state.dimensions.draggables
  });
  const destination = didDropInsideDroppable ? tryGetDestination(impact) : null;
  const combine = didDropInsideDroppable ? tryGetCombine(impact) : null;
  const source = {
    index: critical.draggable.index,
    droppableId: critical.droppable.id
  };
  const result = {
    draggableId: draggable.descriptor.id,
    type: draggable.descriptor.type,
    source,
    reason,
    mode: state.movementMode,
    destination,
    combine
  };
  const newHomeClientOffset = getNewHomeClientOffset({
    impact,
    draggable,
    dimensions,
    viewport: state.viewport,
    afterCritical: state.afterCritical
  });
  const completed = {
    critical: state.critical,
    afterCritical: state.afterCritical,
    result,
    impact
  };
  const isAnimationRequired = !isEqual$1(state.current.client.offset, newHomeClientOffset) || Boolean(result.combine);
  if (!isAnimationRequired) {
    dispatch(completeDrop({
      completed
    }));
    return;
  }
  const dropDuration = getDropDuration({
    current: state.current.client.offset,
    destination: newHomeClientOffset,
    reason
  });
  const args = {
    newHomeClientOffset,
    dropDuration,
    completed
  };
  dispatch(animateDrop(args));
};

var getWindowScroll = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset
});

function getWindowScrollBinding(update) {
  return {
    eventName: 'scroll',
    options: {
      passive: true,
      capture: false
    },
    fn: event => {
      if (event.target !== window && event.target !== window.document) {
        return;
      }
      update();
    }
  };
}
function getScrollListener({
  onWindowScroll
}) {
  function updateScroll() {
    onWindowScroll(getWindowScroll());
  }
  const scheduled = (0,raf_schd__WEBPACK_IMPORTED_MODULE_5__["default"])(updateScroll);
  const binding = getWindowScrollBinding(scheduled);
  let unbind = noop$2;
  function isActive() {
    return unbind !== noop$2;
  }
  function start() {
    !!isActive() ?  true ? invariant(false, 'Cannot start scroll listener when already active') : 0 : void 0;
    unbind = bindEvents(window, [binding]);
  }
  function stop() {
    !isActive() ?  true ? invariant(false, 'Cannot stop scroll listener when not active') : 0 : void 0;
    scheduled.cancel();
    unbind();
    unbind = noop$2;
  }
  return {
    start,
    stop,
    isActive
  };
}

const shouldStop$1 = action => guard(action, 'DROP_COMPLETE') || guard(action, 'DROP_ANIMATE') || guard(action, 'FLUSH');
const scrollListener = store => {
  const listener = getScrollListener({
    onWindowScroll: newScroll => {
      store.dispatch(moveByWindowScroll({
        newScroll
      }));
    }
  });
  return next => action => {
    if (!listener.isActive() && guard(action, 'INITIAL_PUBLISH')) {
      listener.start();
    }
    if (listener.isActive() && shouldStop$1(action)) {
      listener.stop();
    }
    next(action);
  };
};

var getExpiringAnnounce = announce => {
  let wasCalled = false;
  let isExpired = false;
  const timeoutId = setTimeout(() => {
    isExpired = true;
  });
  const result = message => {
    if (wasCalled) {
       true ? warning('Announcement already made. Not making a second announcement') : 0;
      return;
    }
    if (isExpired) {
       true ? warning(`
        Announcements cannot be made asynchronously.
        Default message has already been announced.
      `) : 0;
      return;
    }
    wasCalled = true;
    announce(message);
    clearTimeout(timeoutId);
  };
  result.wasCalled = () => wasCalled;
  return result;
};

var getAsyncMarshal = () => {
  const entries = [];
  const execute = timerId => {
    const index = entries.findIndex(item => item.timerId === timerId);
    !(index !== -1) ?  true ? invariant(false, 'Could not find timer') : 0 : void 0;
    const [entry] = entries.splice(index, 1);
    entry.callback();
  };
  const add = fn => {
    const timerId = setTimeout(() => execute(timerId));
    const entry = {
      timerId,
      callback: fn
    };
    entries.push(entry);
  };
  const flush = () => {
    if (!entries.length) {
      return;
    }
    const shallow = [...entries];
    entries.length = 0;
    shallow.forEach(entry => {
      clearTimeout(entry.timerId);
      entry.callback();
    });
  };
  return {
    add,
    flush
  };
};

const areLocationsEqual = (first, second) => {
  if (first == null && second == null) {
    return true;
  }
  if (first == null || second == null) {
    return false;
  }
  return first.droppableId === second.droppableId && first.index === second.index;
};
const isCombineEqual = (first, second) => {
  if (first == null && second == null) {
    return true;
  }
  if (first == null || second == null) {
    return false;
  }
  return first.draggableId === second.draggableId && first.droppableId === second.droppableId;
};
const isCriticalEqual = (first, second) => {
  if (first === second) {
    return true;
  }
  const isDraggableEqual = first.draggable.id === second.draggable.id && first.draggable.droppableId === second.draggable.droppableId && first.draggable.type === second.draggable.type && first.draggable.index === second.draggable.index;
  const isDroppableEqual = first.droppable.id === second.droppable.id && first.droppable.type === second.droppable.type;
  return isDraggableEqual && isDroppableEqual;
};

const withTimings = (key, fn) => {
  start();
  fn();
  finish();
};
const getDragStart = (critical, mode) => ({
  draggableId: critical.draggable.id,
  type: critical.droppable.type,
  source: {
    droppableId: critical.droppable.id,
    index: critical.draggable.index
  },
  mode
});
function execute(responder, data, announce, getDefaultMessage) {
  if (!responder) {
    announce(getDefaultMessage(data));
    return;
  }
  const willExpire = getExpiringAnnounce(announce);
  const provided = {
    announce: willExpire
  };
  responder(data, provided);
  if (!willExpire.wasCalled()) {
    announce(getDefaultMessage(data));
  }
}
var getPublisher = (getResponders, announce) => {
  const asyncMarshal = getAsyncMarshal();
  let dragging = null;
  const beforeCapture = (draggableId, mode) => {
    !!dragging ?  true ? invariant(false, 'Cannot fire onBeforeCapture as a drag start has already been published') : 0 : void 0;
    withTimings('onBeforeCapture', () => {
      const fn = getResponders().onBeforeCapture;
      if (fn) {
        const before = {
          draggableId,
          mode
        };
        fn(before);
      }
    });
  };
  const beforeStart = (critical, mode) => {
    !!dragging ?  true ? invariant(false, 'Cannot fire onBeforeDragStart as a drag start has already been published') : 0 : void 0;
    withTimings('onBeforeDragStart', () => {
      const fn = getResponders().onBeforeDragStart;
      if (fn) {
        fn(getDragStart(critical, mode));
      }
    });
  };
  const start = (critical, mode) => {
    !!dragging ?  true ? invariant(false, 'Cannot fire onBeforeDragStart as a drag start has already been published') : 0 : void 0;
    const data = getDragStart(critical, mode);
    dragging = {
      mode,
      lastCritical: critical,
      lastLocation: data.source,
      lastCombine: null
    };
    asyncMarshal.add(() => {
      withTimings('onDragStart', () => execute(getResponders().onDragStart, data, announce, preset.onDragStart));
    });
  };
  const update = (critical, impact) => {
    const location = tryGetDestination(impact);
    const combine = tryGetCombine(impact);
    !dragging ?  true ? invariant(false, 'Cannot fire onDragMove when onDragStart has not been called') : 0 : void 0;
    const hasCriticalChanged = !isCriticalEqual(critical, dragging.lastCritical);
    if (hasCriticalChanged) {
      dragging.lastCritical = critical;
    }
    const hasLocationChanged = !areLocationsEqual(dragging.lastLocation, location);
    if (hasLocationChanged) {
      dragging.lastLocation = location;
    }
    const hasGroupingChanged = !isCombineEqual(dragging.lastCombine, combine);
    if (hasGroupingChanged) {
      dragging.lastCombine = combine;
    }
    if (!hasCriticalChanged && !hasLocationChanged && !hasGroupingChanged) {
      return;
    }
    const data = {
      ...getDragStart(critical, dragging.mode),
      combine,
      destination: location
    };
    asyncMarshal.add(() => {
      withTimings('onDragUpdate', () => execute(getResponders().onDragUpdate, data, announce, preset.onDragUpdate));
    });
  };
  const flush = () => {
    !dragging ?  true ? invariant(false, 'Can only flush responders while dragging') : 0 : void 0;
    asyncMarshal.flush();
  };
  const drop = result => {
    !dragging ?  true ? invariant(false, 'Cannot fire onDragEnd when there is no matching onDragStart') : 0 : void 0;
    dragging = null;
    withTimings('onDragEnd', () => execute(getResponders().onDragEnd, result, announce, preset.onDragEnd));
  };
  const abort = () => {
    if (!dragging) {
      return;
    }
    const result = {
      ...getDragStart(dragging.lastCritical, dragging.mode),
      combine: null,
      destination: null,
      reason: 'CANCEL'
    };
    drop(result);
  };
  return {
    beforeCapture,
    beforeStart,
    start,
    update,
    flush,
    drop,
    abort
  };
};

var responders = (getResponders, announce) => {
  const publisher = getPublisher(getResponders, announce);
  return store => next => action => {
    if (guard(action, 'BEFORE_INITIAL_CAPTURE')) {
      publisher.beforeCapture(action.payload.draggableId, action.payload.movementMode);
      return;
    }
    if (guard(action, 'INITIAL_PUBLISH')) {
      const critical = action.payload.critical;
      publisher.beforeStart(critical, action.payload.movementMode);
      next(action);
      publisher.start(critical, action.payload.movementMode);
      return;
    }
    if (guard(action, 'DROP_COMPLETE')) {
      const result = action.payload.completed.result;
      publisher.flush();
      next(action);
      publisher.drop(result);
      return;
    }
    next(action);
    if (guard(action, 'FLUSH')) {
      publisher.abort();
      return;
    }
    const state = store.getState();
    if (state.phase === 'DRAGGING') {
      publisher.update(state.critical, state.impact);
    }
  };
};

const dropAnimationFinishMiddleware = store => next => action => {
  if (!guard(action, 'DROP_ANIMATION_FINISHED')) {
    next(action);
    return;
  }
  const state = store.getState();
  !(state.phase === 'DROP_ANIMATING') ?  true ? invariant(false, 'Cannot finish a drop animating when no drop is occurring') : 0 : void 0;
  store.dispatch(completeDrop({
    completed: state.completed
  }));
};

const dropAnimationFlushOnScrollMiddleware = store => {
  let unbind = null;
  let frameId = null;
  function clear() {
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
    if (unbind) {
      unbind();
      unbind = null;
    }
  }
  return next => action => {
    if (guard(action, 'FLUSH') || guard(action, 'DROP_COMPLETE') || guard(action, 'DROP_ANIMATION_FINISHED')) {
      clear();
    }
    next(action);
    if (!guard(action, 'DROP_ANIMATE')) {
      return;
    }
    const binding = {
      eventName: 'scroll',
      options: {
        capture: true,
        passive: false,
        once: true
      },
      fn: function flushDropAnimation() {
        const state = store.getState();
        if (state.phase === 'DROP_ANIMATING') {
          store.dispatch(dropAnimationFinished());
        }
      }
    };
    frameId = requestAnimationFrame(() => {
      frameId = null;
      unbind = bindEvents(window, [binding]);
    });
  };
};

var dimensionMarshalStopper = marshal => () => next => action => {
  if (guard(action, 'DROP_COMPLETE') || guard(action, 'FLUSH') || guard(action, 'DROP_ANIMATE')) {
    marshal.stopPublishing();
  }
  next(action);
};

var focus = marshal => {
  let isWatching = false;
  return () => next => action => {
    if (guard(action, 'INITIAL_PUBLISH')) {
      isWatching = true;
      marshal.tryRecordFocus(action.payload.critical.draggable.id);
      next(action);
      marshal.tryRestoreFocusRecorded();
      return;
    }
    next(action);
    if (!isWatching) {
      return;
    }
    if (guard(action, 'FLUSH')) {
      isWatching = false;
      marshal.tryRestoreFocusRecorded();
      return;
    }
    if (guard(action, 'DROP_COMPLETE')) {
      isWatching = false;
      const result = action.payload.completed.result;
      if (result.combine) {
        marshal.tryShiftRecord(result.draggableId, result.combine.draggableId);
      }
      marshal.tryRestoreFocusRecorded();
    }
  };
};

const shouldStop = action => guard(action, 'DROP_COMPLETE') || guard(action, 'DROP_ANIMATE') || guard(action, 'FLUSH');
var autoScroll = autoScroller => store => next => action => {
  if (shouldStop(action)) {
    autoScroller.stop();
    next(action);
    return;
  }
  if (guard(action, 'INITIAL_PUBLISH')) {
    next(action);
    const state = store.getState();
    !(state.phase === 'DRAGGING') ?  true ? invariant(false, 'Expected phase to be DRAGGING after INITIAL_PUBLISH') : 0 : void 0;
    autoScroller.start(state);
    return;
  }
  next(action);
  autoScroller.scroll(store.getState());
};

const pendingDrop = store => next => action => {
  next(action);
  if (!guard(action, 'PUBLISH_WHILE_DRAGGING')) {
    return;
  }
  const postActionState = store.getState();
  if (postActionState.phase !== 'DROP_PENDING') {
    return;
  }
  if (postActionState.isWaiting) {
    return;
  }
  store.dispatch(drop({
    reason: postActionState.reason
  }));
};

const composeEnhancers =  true && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  name: '@hello-pangea/dnd'
}) : redux__WEBPACK_IMPORTED_MODULE_2__.compose;
var createStore = ({
  dimensionMarshal,
  focusMarshal,
  styleMarshal,
  getResponders,
  announce,
  autoScroller
}) => (0,redux__WEBPACK_IMPORTED_MODULE_2__.createStore)(reducer, composeEnhancers((0,redux__WEBPACK_IMPORTED_MODULE_2__.applyMiddleware)(style(styleMarshal), dimensionMarshalStopper(dimensionMarshal), lift(dimensionMarshal), dropMiddleware, dropAnimationFinishMiddleware, dropAnimationFlushOnScrollMiddleware, pendingDrop, autoScroll(autoScroller), scrollListener, focus(focusMarshal), responders(getResponders, announce))));

const clean$1 = () => ({
  additions: {},
  removals: {},
  modified: {}
});
function createPublisher({
  registry,
  callbacks
}) {
  let staging = clean$1();
  let frameId = null;
  const collect = () => {
    if (frameId) {
      return;
    }
    callbacks.collectionStarting();
    frameId = requestAnimationFrame(() => {
      frameId = null;
      start();
      const {
        additions,
        removals,
        modified
      } = staging;
      const added = Object.keys(additions).map(id => registry.draggable.getById(id).getDimension(origin)).sort((a, b) => a.descriptor.index - b.descriptor.index);
      const updated = Object.keys(modified).map(id => {
        const entry = registry.droppable.getById(id);
        const scroll = entry.callbacks.getScrollWhileDragging();
        return {
          droppableId: id,
          scroll
        };
      });
      const result = {
        additions: added,
        removals: Object.keys(removals),
        modified: updated
      };
      staging = clean$1();
      finish();
      callbacks.publish(result);
    });
  };
  const add = entry => {
    const id = entry.descriptor.id;
    staging.additions[id] = entry;
    staging.modified[entry.descriptor.droppableId] = true;
    if (staging.removals[id]) {
      delete staging.removals[id];
    }
    collect();
  };
  const remove = entry => {
    const descriptor = entry.descriptor;
    staging.removals[descriptor.id] = true;
    staging.modified[descriptor.droppableId] = true;
    if (staging.additions[descriptor.id]) {
      delete staging.additions[descriptor.id];
    }
    collect();
  };
  const stop = () => {
    if (!frameId) {
      return;
    }
    cancelAnimationFrame(frameId);
    frameId = null;
    staging = clean$1();
  };
  return {
    add,
    remove,
    stop
  };
}

var getMaxScroll = ({
  scrollHeight,
  scrollWidth,
  height,
  width
}) => {
  const maxScroll = subtract({
    x: scrollWidth,
    y: scrollHeight
  }, {
    x: width,
    y: height
  });
  const adjustedMaxScroll = {
    x: Math.max(0, maxScroll.x),
    y: Math.max(0, maxScroll.y)
  };
  return adjustedMaxScroll;
};

var getDocumentElement = () => {
  const doc = document.documentElement;
  !doc ?  true ? invariant(false, 'Cannot find document.documentElement') : 0 : void 0;
  return doc;
};

var getMaxWindowScroll = () => {
  const doc = getDocumentElement();
  const maxScroll = getMaxScroll({
    scrollHeight: doc.scrollHeight,
    scrollWidth: doc.scrollWidth,
    width: doc.clientWidth,
    height: doc.clientHeight
  });
  return maxScroll;
};

var getViewport = () => {
  const scroll = getWindowScroll();
  const maxScroll = getMaxWindowScroll();
  const top = scroll.y;
  const left = scroll.x;
  const doc = getDocumentElement();
  const width = doc.clientWidth;
  const height = doc.clientHeight;
  const right = left + width;
  const bottom = top + height;
  const frame = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.getRect)({
    top,
    left,
    right,
    bottom
  });
  const viewport = {
    frame,
    scroll: {
      initial: scroll,
      current: scroll,
      max: maxScroll,
      diff: {
        value: origin,
        displacement: origin
      }
    }
  };
  return viewport;
};

var getInitialPublish = ({
  critical,
  scrollOptions,
  registry
}) => {
  start();
  const viewport = getViewport();
  const windowScroll = viewport.scroll.current;
  const home = critical.droppable;
  const droppables = registry.droppable.getAllByType(home.type).map(entry => entry.callbacks.getDimensionAndWatchScroll(windowScroll, scrollOptions));
  const draggables = registry.draggable.getAllByType(critical.draggable.type).map(entry => entry.getDimension(windowScroll));
  const dimensions = {
    draggables: toDraggableMap(draggables),
    droppables: toDroppableMap(droppables)
  };
  finish();
  const result = {
    dimensions,
    critical,
    viewport
  };
  return result;
};

function shouldPublishUpdate(registry, dragging, entry) {
  if (entry.descriptor.id === dragging.id) {
    return false;
  }
  if (entry.descriptor.type !== dragging.type) {
    return false;
  }
  const home = registry.droppable.getById(entry.descriptor.droppableId);
  if (home.descriptor.mode !== 'virtual') {
     true ? warning(`
      You are attempting to add or remove a Draggable [id: ${entry.descriptor.id}]
      while a drag is occurring. This is only supported for virtual lists.

      See https://github.com/hello-pangea/dnd/blob/main/docs/patterns/virtual-lists.md
    `) : 0;
    return false;
  }
  return true;
}
var createDimensionMarshal = (registry, callbacks) => {
  let collection = null;
  const publisher = createPublisher({
    callbacks: {
      publish: callbacks.publishWhileDragging,
      collectionStarting: callbacks.collectionStarting
    },
    registry
  });
  const updateDroppableIsEnabled = (id, isEnabled) => {
    !registry.droppable.exists(id) ?  true ? invariant(false, `Cannot update is enabled flag of Droppable ${id} as it is not registered`) : 0 : void 0;
    if (!collection) {
      return;
    }
    callbacks.updateDroppableIsEnabled({
      id,
      isEnabled
    });
  };
  const updateDroppableIsCombineEnabled = (id, isCombineEnabled) => {
    if (!collection) {
      return;
    }
    !registry.droppable.exists(id) ?  true ? invariant(false, `Cannot update isCombineEnabled flag of Droppable ${id} as it is not registered`) : 0 : void 0;
    callbacks.updateDroppableIsCombineEnabled({
      id,
      isCombineEnabled
    });
  };
  const updateDroppableScroll = (id, newScroll) => {
    if (!collection) {
      return;
    }
    !registry.droppable.exists(id) ?  true ? invariant(false, `Cannot update the scroll on Droppable ${id} as it is not registered`) : 0 : void 0;
    callbacks.updateDroppableScroll({
      id,
      newScroll
    });
  };
  const scrollDroppable = (id, change) => {
    if (!collection) {
      return;
    }
    registry.droppable.getById(id).callbacks.scroll(change);
  };
  const stopPublishing = () => {
    if (!collection) {
      return;
    }
    publisher.stop();
    const home = collection.critical.droppable;
    registry.droppable.getAllByType(home.type).forEach(entry => entry.callbacks.dragStopped());
    collection.unsubscribe();
    collection = null;
  };
  const subscriber = event => {
    !collection ?  true ? invariant(false, 'Should only be subscribed when a collection is occurring') : 0 : void 0;
    const dragging = collection.critical.draggable;
    if (event.type === 'ADDITION') {
      if (shouldPublishUpdate(registry, dragging, event.value)) {
        publisher.add(event.value);
      }
    }
    if (event.type === 'REMOVAL') {
      if (shouldPublishUpdate(registry, dragging, event.value)) {
        publisher.remove(event.value);
      }
    }
  };
  const startPublishing = request => {
    !!collection ?  true ? invariant(false, 'Cannot start capturing critical dimensions as there is already a collection') : 0 : void 0;
    const entry = registry.draggable.getById(request.draggableId);
    const home = registry.droppable.getById(entry.descriptor.droppableId);
    const critical = {
      draggable: entry.descriptor,
      droppable: home.descriptor
    };
    const unsubscribe = registry.subscribe(subscriber);
    collection = {
      critical,
      unsubscribe
    };
    return getInitialPublish({
      critical,
      registry,
      scrollOptions: request.scrollOptions
    });
  };
  const marshal = {
    updateDroppableIsEnabled,
    updateDroppableIsCombineEnabled,
    scrollDroppable,
    updateDroppableScroll,
    startPublishing,
    stopPublishing
  };
  return marshal;
};

var canStartDrag = (state, id) => {
  if (state.phase === 'IDLE') {
    return true;
  }
  if (state.phase !== 'DROP_ANIMATING') {
    return false;
  }
  if (state.completed.result.draggableId === id) {
    return false;
  }
  return state.completed.result.reason === 'DROP';
};

var scrollWindow = change => {
  window.scrollBy(change.x, change.y);
};

const getScrollableDroppables = memoizeOne(droppables => toDroppableList(droppables).filter(droppable => {
  if (!droppable.isEnabled) {
    return false;
  }
  if (!droppable.frame) {
    return false;
  }
  return true;
}));
const getScrollableDroppableOver = (target, droppables) => {
  const maybe = getScrollableDroppables(droppables).find(droppable => {
    !droppable.frame ?  true ? invariant(false, 'Invalid result') : 0 : void 0;
    return isPositionInFrame(droppable.frame.pageMarginBox)(target);
  }) || null;
  return maybe;
};
var getBestScrollableDroppable = ({
  center,
  destination,
  droppables
}) => {
  if (destination) {
    const dimension = droppables[destination];
    if (!dimension.frame) {
      return null;
    }
    return dimension;
  }
  const dimension = getScrollableDroppableOver(center, droppables);
  return dimension;
};

const defaultAutoScrollerOptions = {
  startFromPercentage: 0.25,
  maxScrollAtPercentage: 0.05,
  maxPixelScroll: 28,
  ease: percentage => percentage ** 2,
  durationDampening: {
    stopDampeningAt: 1200,
    accelerateAt: 360
  },
  disabled: false
};

var getDistanceThresholds = (container, axis, getAutoScrollerOptions = () => defaultAutoScrollerOptions) => {
  const autoScrollerOptions = getAutoScrollerOptions();
  const startScrollingFrom = container[axis.size] * autoScrollerOptions.startFromPercentage;
  const maxScrollValueAt = container[axis.size] * autoScrollerOptions.maxScrollAtPercentage;
  const thresholds = {
    startScrollingFrom,
    maxScrollValueAt
  };
  return thresholds;
};

var getPercentage = ({
  startOfRange,
  endOfRange,
  current
}) => {
  const range = endOfRange - startOfRange;
  if (range === 0) {
     true ? warning(`
      Detected distance range of 0 in the fluid auto scroller
      This is unexpected and would cause a divide by 0 issue.
      Not allowing an auto scroll
    `) : 0;
    return 0;
  }
  const currentInRange = current - startOfRange;
  const percentage = currentInRange / range;
  return percentage;
};

var minScroll = 1;

var getValueFromDistance = (distanceToEdge, thresholds, getAutoScrollerOptions = () => defaultAutoScrollerOptions) => {
  const autoScrollerOptions = getAutoScrollerOptions();
  if (distanceToEdge > thresholds.startScrollingFrom) {
    return 0;
  }
  if (distanceToEdge <= thresholds.maxScrollValueAt) {
    return autoScrollerOptions.maxPixelScroll;
  }
  if (distanceToEdge === thresholds.startScrollingFrom) {
    return minScroll;
  }
  const percentageFromMaxScrollValueAt = getPercentage({
    startOfRange: thresholds.maxScrollValueAt,
    endOfRange: thresholds.startScrollingFrom,
    current: distanceToEdge
  });
  const percentageFromStartScrollingFrom = 1 - percentageFromMaxScrollValueAt;
  const scroll = autoScrollerOptions.maxPixelScroll * autoScrollerOptions.ease(percentageFromStartScrollingFrom);
  return Math.ceil(scroll);
};

var dampenValueByTime = (proposedScroll, dragStartTime, getAutoScrollerOptions) => {
  const autoScrollerOptions = getAutoScrollerOptions();
  const accelerateAt = autoScrollerOptions.durationDampening.accelerateAt;
  const stopAt = autoScrollerOptions.durationDampening.stopDampeningAt;
  const startOfRange = dragStartTime;
  const endOfRange = stopAt;
  const now = Date.now();
  const runTime = now - startOfRange;
  if (runTime >= stopAt) {
    return proposedScroll;
  }
  if (runTime < accelerateAt) {
    return minScroll;
  }
  const betweenAccelerateAtAndStopAtPercentage = getPercentage({
    startOfRange: accelerateAt,
    endOfRange,
    current: runTime
  });
  const scroll = proposedScroll * autoScrollerOptions.ease(betweenAccelerateAtAndStopAtPercentage);
  return Math.ceil(scroll);
};

var getValue = ({
  distanceToEdge,
  thresholds,
  dragStartTime,
  shouldUseTimeDampening,
  getAutoScrollerOptions
}) => {
  const scroll = getValueFromDistance(distanceToEdge, thresholds, getAutoScrollerOptions);
  if (scroll === 0) {
    return 0;
  }
  if (!shouldUseTimeDampening) {
    return scroll;
  }
  return Math.max(dampenValueByTime(scroll, dragStartTime, getAutoScrollerOptions), minScroll);
};

var getScrollOnAxis = ({
  container,
  distanceToEdges,
  dragStartTime,
  axis,
  shouldUseTimeDampening,
  getAutoScrollerOptions
}) => {
  const thresholds = getDistanceThresholds(container, axis, getAutoScrollerOptions);
  const isCloserToEnd = distanceToEdges[axis.end] < distanceToEdges[axis.start];
  if (isCloserToEnd) {
    return getValue({
      distanceToEdge: distanceToEdges[axis.end],
      thresholds,
      dragStartTime,
      shouldUseTimeDampening,
      getAutoScrollerOptions
    });
  }
  return -1 * getValue({
    distanceToEdge: distanceToEdges[axis.start],
    thresholds,
    dragStartTime,
    shouldUseTimeDampening,
    getAutoScrollerOptions
  });
};

var adjustForSizeLimits = ({
  container,
  subject,
  proposedScroll
}) => {
  const isTooBigVertically = subject.height > container.height;
  const isTooBigHorizontally = subject.width > container.width;
  if (!isTooBigHorizontally && !isTooBigVertically) {
    return proposedScroll;
  }
  if (isTooBigHorizontally && isTooBigVertically) {
    return null;
  }
  return {
    x: isTooBigHorizontally ? 0 : proposedScroll.x,
    y: isTooBigVertically ? 0 : proposedScroll.y
  };
};

const clean = apply(value => value === 0 ? 0 : value);
var getScroll$1 = ({
  dragStartTime,
  container,
  subject,
  center,
  shouldUseTimeDampening,
  getAutoScrollerOptions
}) => {
  const distanceToEdges = {
    top: center.y - container.top,
    right: container.right - center.x,
    bottom: container.bottom - center.y,
    left: center.x - container.left
  };
  const y = getScrollOnAxis({
    container,
    distanceToEdges,
    dragStartTime,
    axis: vertical,
    shouldUseTimeDampening,
    getAutoScrollerOptions
  });
  const x = getScrollOnAxis({
    container,
    distanceToEdges,
    dragStartTime,
    axis: horizontal,
    shouldUseTimeDampening,
    getAutoScrollerOptions
  });
  const required = clean({
    x,
    y
  });
  if (isEqual$1(required, origin)) {
    return null;
  }
  const limited = adjustForSizeLimits({
    container,
    subject,
    proposedScroll: required
  });
  if (!limited) {
    return null;
  }
  return isEqual$1(limited, origin) ? null : limited;
};

const smallestSigned = apply(value => {
  if (value === 0) {
    return 0;
  }
  return value > 0 ? 1 : -1;
});
const getOverlap = (() => {
  const getRemainder = (target, max) => {
    if (target < 0) {
      return target;
    }
    if (target > max) {
      return target - max;
    }
    return 0;
  };
  return ({
    current,
    max,
    change
  }) => {
    const targetScroll = add(current, change);
    const overlap = {
      x: getRemainder(targetScroll.x, max.x),
      y: getRemainder(targetScroll.y, max.y)
    };
    if (isEqual$1(overlap, origin)) {
      return null;
    }
    return overlap;
  };
})();
const canPartiallyScroll = ({
  max: rawMax,
  current,
  change
}) => {
  const max = {
    x: Math.max(current.x, rawMax.x),
    y: Math.max(current.y, rawMax.y)
  };
  const smallestChange = smallestSigned(change);
  const overlap = getOverlap({
    max,
    current,
    change: smallestChange
  });
  if (!overlap) {
    return true;
  }
  if (smallestChange.x !== 0 && overlap.x === 0) {
    return true;
  }
  if (smallestChange.y !== 0 && overlap.y === 0) {
    return true;
  }
  return false;
};
const canScrollWindow = (viewport, change) => canPartiallyScroll({
  current: viewport.scroll.current,
  max: viewport.scroll.max,
  change
});
const getWindowOverlap = (viewport, change) => {
  if (!canScrollWindow(viewport, change)) {
    return null;
  }
  const max = viewport.scroll.max;
  const current = viewport.scroll.current;
  return getOverlap({
    current,
    max,
    change
  });
};
const canScrollDroppable = (droppable, change) => {
  const frame = droppable.frame;
  if (!frame) {
    return false;
  }
  return canPartiallyScroll({
    current: frame.scroll.current,
    max: frame.scroll.max,
    change
  });
};
const getDroppableOverlap = (droppable, change) => {
  const frame = droppable.frame;
  if (!frame) {
    return null;
  }
  if (!canScrollDroppable(droppable, change)) {
    return null;
  }
  return getOverlap({
    current: frame.scroll.current,
    max: frame.scroll.max,
    change
  });
};

var getWindowScrollChange = ({
  viewport,
  subject,
  center,
  dragStartTime,
  shouldUseTimeDampening,
  getAutoScrollerOptions
}) => {
  const scroll = getScroll$1({
    dragStartTime,
    container: viewport.frame,
    subject,
    center,
    shouldUseTimeDampening,
    getAutoScrollerOptions
  });
  return scroll && canScrollWindow(viewport, scroll) ? scroll : null;
};

var getDroppableScrollChange = ({
  droppable,
  subject,
  center,
  dragStartTime,
  shouldUseTimeDampening,
  getAutoScrollerOptions
}) => {
  const frame = droppable.frame;
  if (!frame) {
    return null;
  }
  const scroll = getScroll$1({
    dragStartTime,
    container: frame.pageMarginBox,
    subject,
    center,
    shouldUseTimeDampening,
    getAutoScrollerOptions
  });
  return scroll && canScrollDroppable(droppable, scroll) ? scroll : null;
};

var scroll = ({
  state,
  dragStartTime,
  shouldUseTimeDampening,
  scrollWindow,
  scrollDroppable,
  getAutoScrollerOptions
}) => {
  const center = state.current.page.borderBoxCenter;
  const draggable = state.dimensions.draggables[state.critical.draggable.id];
  const subject = draggable.page.marginBox;
  if (state.isWindowScrollAllowed) {
    const viewport = state.viewport;
    const change = getWindowScrollChange({
      dragStartTime,
      viewport,
      subject,
      center,
      shouldUseTimeDampening,
      getAutoScrollerOptions
    });
    if (change) {
      scrollWindow(change);
      return;
    }
  }
  const droppable = getBestScrollableDroppable({
    center,
    destination: whatIsDraggedOver(state.impact),
    droppables: state.dimensions.droppables
  });
  if (!droppable) {
    return;
  }
  const change = getDroppableScrollChange({
    dragStartTime,
    droppable,
    subject,
    center,
    shouldUseTimeDampening,
    getAutoScrollerOptions
  });
  if (change) {
    scrollDroppable(droppable.descriptor.id, change);
  }
};

var createFluidScroller = ({
  scrollWindow,
  scrollDroppable,
  getAutoScrollerOptions = () => defaultAutoScrollerOptions
}) => {
  const scheduleWindowScroll = (0,raf_schd__WEBPACK_IMPORTED_MODULE_5__["default"])(scrollWindow);
  const scheduleDroppableScroll = (0,raf_schd__WEBPACK_IMPORTED_MODULE_5__["default"])(scrollDroppable);
  let dragging = null;
  const tryScroll = state => {
    !dragging ?  true ? invariant(false, 'Cannot fluid scroll if not dragging') : 0 : void 0;
    const {
      shouldUseTimeDampening,
      dragStartTime
    } = dragging;
    scroll({
      state,
      scrollWindow: scheduleWindowScroll,
      scrollDroppable: scheduleDroppableScroll,
      dragStartTime,
      shouldUseTimeDampening,
      getAutoScrollerOptions
    });
  };
  const start$1 = state => {
    start();
    !!dragging ?  true ? invariant(false, 'Cannot start auto scrolling when already started') : 0 : void 0;
    const dragStartTime = Date.now();
    let wasScrollNeeded = false;
    const fakeScrollCallback = () => {
      wasScrollNeeded = true;
    };
    scroll({
      state,
      dragStartTime: 0,
      shouldUseTimeDampening: false,
      scrollWindow: fakeScrollCallback,
      scrollDroppable: fakeScrollCallback,
      getAutoScrollerOptions
    });
    dragging = {
      dragStartTime,
      shouldUseTimeDampening: wasScrollNeeded
    };
    finish();
    if (wasScrollNeeded) {
      tryScroll(state);
    }
  };
  const stop = () => {
    if (!dragging) {
      return;
    }
    scheduleWindowScroll.cancel();
    scheduleDroppableScroll.cancel();
    dragging = null;
  };
  return {
    start: start$1,
    stop,
    scroll: tryScroll
  };
};

var createJumpScroller = ({
  move,
  scrollDroppable,
  scrollWindow
}) => {
  const moveByOffset = (state, offset) => {
    const client = add(state.current.client.selection, offset);
    move({
      client
    });
  };
  const scrollDroppableAsMuchAsItCan = (droppable, change) => {
    if (!canScrollDroppable(droppable, change)) {
      return change;
    }
    const overlap = getDroppableOverlap(droppable, change);
    if (!overlap) {
      scrollDroppable(droppable.descriptor.id, change);
      return null;
    }
    const whatTheDroppableCanScroll = subtract(change, overlap);
    scrollDroppable(droppable.descriptor.id, whatTheDroppableCanScroll);
    const remainder = subtract(change, whatTheDroppableCanScroll);
    return remainder;
  };
  const scrollWindowAsMuchAsItCan = (isWindowScrollAllowed, viewport, change) => {
    if (!isWindowScrollAllowed) {
      return change;
    }
    if (!canScrollWindow(viewport, change)) {
      return change;
    }
    const overlap = getWindowOverlap(viewport, change);
    if (!overlap) {
      scrollWindow(change);
      return null;
    }
    const whatTheWindowCanScroll = subtract(change, overlap);
    scrollWindow(whatTheWindowCanScroll);
    const remainder = subtract(change, whatTheWindowCanScroll);
    return remainder;
  };
  const jumpScroller = state => {
    const request = state.scrollJumpRequest;
    if (!request) {
      return;
    }
    const destination = whatIsDraggedOver(state.impact);
    !destination ?  true ? invariant(false, 'Cannot perform a jump scroll when there is no destination') : 0 : void 0;
    const droppableRemainder = scrollDroppableAsMuchAsItCan(state.dimensions.droppables[destination], request);
    if (!droppableRemainder) {
      return;
    }
    const viewport = state.viewport;
    const windowRemainder = scrollWindowAsMuchAsItCan(state.isWindowScrollAllowed, viewport, droppableRemainder);
    if (!windowRemainder) {
      return;
    }
    moveByOffset(state, windowRemainder);
  };
  return jumpScroller;
};

var createAutoScroller = ({
  scrollDroppable,
  scrollWindow,
  move,
  getAutoScrollerOptions
}) => {
  const fluidScroller = createFluidScroller({
    scrollWindow,
    scrollDroppable,
    getAutoScrollerOptions
  });
  const jumpScroll = createJumpScroller({
    move,
    scrollWindow,
    scrollDroppable
  });
  const scroll = state => {
    const autoScrollerOptions = getAutoScrollerOptions();
    if (autoScrollerOptions.disabled || state.phase !== 'DRAGGING') {
      return;
    }
    if (state.movementMode === 'FLUID') {
      fluidScroller.scroll(state);
      return;
    }
    if (!state.scrollJumpRequest) {
      return;
    }
    jumpScroll(state);
  };
  const scroller = {
    scroll,
    start: fluidScroller.start,
    stop: fluidScroller.stop
  };
  return scroller;
};

const prefix = 'data-rfd';
const dragHandle = (() => {
  const base = `${prefix}-drag-handle`;
  return {
    base,
    draggableId: `${base}-draggable-id`,
    contextId: `${base}-context-id`
  };
})();
const draggable = (() => {
  const base = `${prefix}-draggable`;
  return {
    base,
    contextId: `${base}-context-id`,
    id: `${base}-id`
  };
})();
const droppable = (() => {
  const base = `${prefix}-droppable`;
  return {
    base,
    contextId: `${base}-context-id`,
    id: `${base}-id`
  };
})();
const scrollContainer = {
  contextId: `${prefix}-scroll-container-context-id`
};

const makeGetSelector = context => attribute => `[${attribute}="${context}"]`;
const getStyles = (rules, property) => rules.map(rule => {
  const value = rule.styles[property];
  if (!value) {
    return '';
  }
  return `${rule.selector} { ${value} }`;
}).join(' ');
const noPointerEvents = 'pointer-events: none;';
var getStyles$1 = contextId => {
  const getSelector = makeGetSelector(contextId);
  const dragHandle$1 = (() => {
    const grabCursor = `
      cursor: -webkit-grab;
      cursor: grab;
    `;
    return {
      selector: getSelector(dragHandle.contextId),
      styles: {
        always: `
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          touch-action: manipulation;
        `,
        resting: grabCursor,
        dragging: noPointerEvents,
        dropAnimating: grabCursor
      }
    };
  })();
  const draggable$1 = (() => {
    const transition = `
      transition: ${transitions.outOfTheWay};
    `;
    return {
      selector: getSelector(draggable.contextId),
      styles: {
        dragging: transition,
        dropAnimating: transition,
        userCancel: transition
      }
    };
  })();
  const droppable$1 = {
    selector: getSelector(droppable.contextId),
    styles: {
      always: `overflow-anchor: none;`
    }
  };
  const body = {
    selector: 'body',
    styles: {
      dragging: `
        cursor: grabbing;
        cursor: -webkit-grabbing;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        overflow-anchor: none;
      `
    }
  };
  const rules = [draggable$1, dragHandle$1, droppable$1, body];
  return {
    always: getStyles(rules, 'always'),
    resting: getStyles(rules, 'resting'),
    dragging: getStyles(rules, 'dragging'),
    dropAnimating: getStyles(rules, 'dropAnimating'),
    userCancel: getStyles(rules, 'userCancel')
  };
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

const getHead = () => {
  const head = document.querySelector('head');
  !head ?  true ? invariant(false, 'Cannot find the head to append a style to') : 0 : void 0;
  return head;
};
const createStyleEl = nonce => {
  const el = document.createElement('style');
  if (nonce) {
    el.setAttribute('nonce', nonce);
  }
  el.type = 'text/css';
  return el;
};
function useStyleMarshal(contextId, nonce) {
  const styles = useMemo(() => getStyles$1(contextId), [contextId]);
  const alwaysRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const dynamicRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const setDynamicStyle = useCallback(memoizeOne(proposed => {
    const el = dynamicRef.current;
    !el ?  true ? invariant(false, 'Cannot set dynamic style element if it is not set') : 0 : void 0;
    el.textContent = proposed;
  }), []);
  const setAlwaysStyle = useCallback(proposed => {
    const el = alwaysRef.current;
    !el ?  true ? invariant(false, 'Cannot set dynamic style element if it is not set') : 0 : void 0;
    el.textContent = proposed;
  }, []);
  useIsomorphicLayoutEffect(() => {
    !(!alwaysRef.current && !dynamicRef.current) ?  true ? invariant(false, 'style elements already mounted') : 0 : void 0;
    const always = createStyleEl(nonce);
    const dynamic = createStyleEl(nonce);
    alwaysRef.current = always;
    dynamicRef.current = dynamic;
    always.setAttribute(`${prefix}-always`, contextId);
    dynamic.setAttribute(`${prefix}-dynamic`, contextId);
    getHead().appendChild(always);
    getHead().appendChild(dynamic);
    setAlwaysStyle(styles.always);
    setDynamicStyle(styles.resting);
    return () => {
      const remove = ref => {
        const current = ref.current;
        !current ?  true ? invariant(false, 'Cannot unmount ref as it is not set') : 0 : void 0;
        getHead().removeChild(current);
        ref.current = null;
      };
      remove(alwaysRef);
      remove(dynamicRef);
    };
  }, [nonce, setAlwaysStyle, setDynamicStyle, styles.always, styles.resting, contextId]);
  const dragging = useCallback(() => setDynamicStyle(styles.dragging), [setDynamicStyle, styles.dragging]);
  const dropping = useCallback(reason => {
    if (reason === 'DROP') {
      setDynamicStyle(styles.dropAnimating);
      return;
    }
    setDynamicStyle(styles.userCancel);
  }, [setDynamicStyle, styles.dropAnimating, styles.userCancel]);
  const resting = useCallback(() => {
    if (!dynamicRef.current) {
      return;
    }
    setDynamicStyle(styles.resting);
  }, [setDynamicStyle, styles.resting]);
  const marshal = useMemo(() => ({
    dragging,
    dropping,
    resting
  }), [dragging, dropping, resting]);
  return marshal;
}

function querySelectorAll(parentNode, selector) {
  return Array.from(parentNode.querySelectorAll(selector));
}

var getWindowFromEl = el => {
  if (el && el.ownerDocument && el.ownerDocument.defaultView) {
    return el.ownerDocument.defaultView;
  }
  return window;
};

function isHtmlElement(el) {
  return el instanceof getWindowFromEl(el).HTMLElement;
}

function findDragHandle(contextId, draggableId) {
  const selector = `[${dragHandle.contextId}="${contextId}"]`;
  const possible = querySelectorAll(document, selector);
  if (!possible.length) {
     true ? warning(`Unable to find any drag handles in the context "${contextId}"`) : 0;
    return null;
  }
  const handle = possible.find(el => {
    return el.getAttribute(dragHandle.draggableId) === draggableId;
  });
  if (!handle) {
     true ? warning(`Unable to find drag handle with id "${draggableId}" as no handle with a matching id was found`) : 0;
    return null;
  }
  if (!isHtmlElement(handle)) {
     true ? warning('drag handle needs to be a HTMLElement') : 0;
    return null;
  }
  return handle;
}

function useFocusMarshal(contextId) {
  const entriesRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
  const recordRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const restoreFocusFrameRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const isMountedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const register = useCallback(function register(id, focus) {
    const entry = {
      id,
      focus
    };
    entriesRef.current[id] = entry;
    return function unregister() {
      const entries = entriesRef.current;
      const current = entries[id];
      if (current !== entry) {
        delete entries[id];
      }
    };
  }, []);
  const tryGiveFocus = useCallback(function tryGiveFocus(tryGiveFocusTo) {
    const handle = findDragHandle(contextId, tryGiveFocusTo);
    if (handle && handle !== document.activeElement) {
      handle.focus();
    }
  }, [contextId]);
  const tryShiftRecord = useCallback(function tryShiftRecord(previous, redirectTo) {
    if (recordRef.current === previous) {
      recordRef.current = redirectTo;
    }
  }, []);
  const tryRestoreFocusRecorded = useCallback(function tryRestoreFocusRecorded() {
    if (restoreFocusFrameRef.current) {
      return;
    }
    if (!isMountedRef.current) {
      return;
    }
    restoreFocusFrameRef.current = requestAnimationFrame(() => {
      restoreFocusFrameRef.current = null;
      const record = recordRef.current;
      if (record) {
        tryGiveFocus(record);
      }
    });
  }, [tryGiveFocus]);
  const tryRecordFocus = useCallback(function tryRecordFocus(id) {
    recordRef.current = null;
    const focused = document.activeElement;
    if (!focused) {
      return;
    }
    if (focused.getAttribute(dragHandle.draggableId) !== id) {
      return;
    }
    recordRef.current = id;
  }, []);
  useIsomorphicLayoutEffect(() => {
    isMountedRef.current = true;
    return function clearFrameOnUnmount() {
      isMountedRef.current = false;
      const frameId = restoreFocusFrameRef.current;
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);
  const marshal = useMemo(() => ({
    register,
    tryRecordFocus,
    tryRestoreFocusRecorded,
    tryShiftRecord
  }), [register, tryRecordFocus, tryRestoreFocusRecorded, tryShiftRecord]);
  return marshal;
}

function createRegistry() {
  const entries = {
    draggables: {},
    droppables: {}
  };
  const subscribers = [];
  function subscribe(cb) {
    subscribers.push(cb);
    return function unsubscribe() {
      const index = subscribers.indexOf(cb);
      if (index === -1) {
        return;
      }
      subscribers.splice(index, 1);
    };
  }
  function notify(event) {
    if (subscribers.length) {
      subscribers.forEach(cb => cb(event));
    }
  }
  function findDraggableById(id) {
    return entries.draggables[id] || null;
  }
  function getDraggableById(id) {
    const entry = findDraggableById(id);
    !entry ?  true ? invariant(false, `Cannot find draggable entry with id [${id}]`) : 0 : void 0;
    return entry;
  }
  const draggableAPI = {
    register: entry => {
      entries.draggables[entry.descriptor.id] = entry;
      notify({
        type: 'ADDITION',
        value: entry
      });
    },
    update: (entry, last) => {
      const current = entries.draggables[last.descriptor.id];
      if (!current) {
        return;
      }
      if (current.uniqueId !== entry.uniqueId) {
        return;
      }
      delete entries.draggables[last.descriptor.id];
      entries.draggables[entry.descriptor.id] = entry;
    },
    unregister: entry => {
      const draggableId = entry.descriptor.id;
      const current = findDraggableById(draggableId);
      if (!current) {
        return;
      }
      if (entry.uniqueId !== current.uniqueId) {
        return;
      }
      delete entries.draggables[draggableId];
      if (entries.droppables[entry.descriptor.droppableId]) {
        notify({
          type: 'REMOVAL',
          value: entry
        });
      }
    },
    getById: getDraggableById,
    findById: findDraggableById,
    exists: id => Boolean(findDraggableById(id)),
    getAllByType: type => Object.values(entries.draggables).filter(entry => entry.descriptor.type === type)
  };
  function findDroppableById(id) {
    return entries.droppables[id] || null;
  }
  function getDroppableById(id) {
    const entry = findDroppableById(id);
    !entry ?  true ? invariant(false, `Cannot find droppable entry with id [${id}]`) : 0 : void 0;
    return entry;
  }
  const droppableAPI = {
    register: entry => {
      entries.droppables[entry.descriptor.id] = entry;
    },
    unregister: entry => {
      const current = findDroppableById(entry.descriptor.id);
      if (!current) {
        return;
      }
      if (entry.uniqueId !== current.uniqueId) {
        return;
      }
      delete entries.droppables[entry.descriptor.id];
    },
    getById: getDroppableById,
    findById: findDroppableById,
    exists: id => Boolean(findDroppableById(id)),
    getAllByType: type => Object.values(entries.droppables).filter(entry => entry.descriptor.type === type)
  };
  function clean() {
    entries.draggables = {};
    entries.droppables = {};
    subscribers.length = 0;
  }
  return {
    draggable: draggableAPI,
    droppable: droppableAPI,
    subscribe,
    clean
  };
}

function useRegistry() {
  const registry = useMemo(createRegistry, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return function unmount() {
      registry.clean();
    };
  }, [registry]);
  return registry;
}

var StoreContext = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(null);

var getBodyElement = () => {
  const body = document.body;
  !body ?  true ? invariant(false, 'Cannot find document.body') : 0 : void 0;
  return body;
};

const visuallyHidden = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: '0',
  padding: '0',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  'clip-path': 'inset(100%)'
};

const getId = contextId => `rfd-announcement-${contextId}`;
function useAnnouncer(contextId) {
  const id = useMemo(() => getId(contextId), [contextId]);
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function setup() {
    const el = document.createElement('div');
    ref.current = el;
    el.id = id;
    el.setAttribute('aria-live', 'assertive');
    el.setAttribute('aria-atomic', 'true');
    (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])(el.style, visuallyHidden);
    getBodyElement().appendChild(el);
    return function cleanup() {
      setTimeout(function remove() {
        const body = getBodyElement();
        if (body.contains(el)) {
          body.removeChild(el);
        }
        if (el === ref.current) {
          ref.current = null;
        }
      });
    };
  }, [id]);
  const announce = useCallback(message => {
    const el = ref.current;
    if (el) {
      el.textContent = message;
      return;
    }
     true ? warning(`
      A screen reader message was trying to be announced but it was unable to do so.
      This can occur if you unmount your <DragDropContext /> in your onDragEnd.
      Consider calling provided.announce() before the unmount so that the instruction will
      not be lost for users relying on a screen reader.

      Message not passed to screen reader:

      "${message}"
    `) : 0;
  }, []);
  return announce;
}

const defaults = {
  separator: '::'
};
function useUniqueId(prefix, options = defaults) {
  const id = react__WEBPACK_IMPORTED_MODULE_0___default().useId();
  return useMemo(() => `${prefix}${options.separator}${id}`, [options.separator, prefix, id]);
}

function getElementId({
  contextId,
  uniqueId
}) {
  return `rfd-hidden-text-${contextId}-${uniqueId}`;
}
function useHiddenTextElement({
  contextId,
  text
}) {
  const uniqueId = useUniqueId('hidden-text', {
    separator: '-'
  });
  const id = useMemo(() => getElementId({
    contextId,
    uniqueId
  }), [uniqueId, contextId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function mount() {
    const el = document.createElement('div');
    el.id = id;
    el.textContent = text;
    el.style.display = 'none';
    getBodyElement().appendChild(el);
    return function unmount() {
      const body = getBodyElement();
      if (body.contains(el)) {
        body.removeChild(el);
      }
    };
  }, [id, text]);
  return id;
}

var AppContext = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(null);

var peerDependencies = {
	react: "^18.0.0 || ^19.0.0"};

const semver = /(\d+)\.(\d+)\.(\d+)/;
const getVersion = value => {
  const result = semver.exec(value);
  !(result != null) ?  true ? invariant(false, `Unable to parse React version ${value}`) : 0 : void 0;
  const major = Number(result[1]);
  const minor = Number(result[2]);
  const patch = Number(result[3]);
  return {
    major,
    minor,
    patch,
    raw: value
  };
};
const isSatisfied = (expected, actual) => {
  if (actual.major > expected.major) {
    return true;
  }
  if (actual.major < expected.major) {
    return false;
  }
  if (actual.minor > expected.minor) {
    return true;
  }
  if (actual.minor < expected.minor) {
    return false;
  }
  return actual.patch >= expected.patch;
};
var checkReactVersion = (peerDepValue, actualValue) => {
  const peerDep = getVersion(peerDepValue);
  const actual = getVersion(actualValue);
  if (isSatisfied(peerDep, actual)) {
    return;
  }
   true ? warning(`
    React version: [${actual.raw}]
    does not satisfy expected peer dependency version: [${peerDep.raw}]

    This can result in run time bugs, and even fatal crashes
  `) : 0;
};

const suffix = `
  We expect a html5 doctype: <!doctype html>
  This is to ensure consistent browser layout and measurement

  More information: https://github.com/hello-pangea/dnd/blob/main/docs/guides/doctype.md
`;
var checkDoctype = doc => {
  const doctype = doc.doctype;
  if (!doctype) {
     true ? warning(`
      No <!doctype html> found.

      ${suffix}
    `) : 0;
    return;
  }
  if (doctype.name.toLowerCase() !== 'html') {
     true ? warning(`
      Unexpected <!doctype> found: (${doctype.name})

      ${suffix}
    `) : 0;
  }
  if (doctype.publicId !== '') {
     true ? warning(`
      Unexpected <!doctype> publicId found: (${doctype.publicId})
      A html5 doctype does not have a publicId

      ${suffix}
    `) : 0;
  }
};

function useDev(useHook) {
  if (true) {
    useHook();
  }
}

function useDevSetupWarning(fn, inputs) {
  useDev(() => {
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      try {
        fn();
      } catch (e) {
        error(`
          A setup problem was encountered.

          > ${e.message}
        `);
      }
    }, inputs);
  });
}

function useStartupValidation() {
  useDevSetupWarning(() => {
    checkReactVersion(peerDependencies.react, (react__WEBPACK_IMPORTED_MODULE_0___default().version));
    checkDoctype(document);
  }, []);
}

function usePrevious(current) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(current);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    ref.current = current;
  });
  return ref;
}

function create() {
  let lock = null;
  function isClaimed() {
    return Boolean(lock);
  }
  function isActive(value) {
    return value === lock;
  }
  function claim(abandon) {
    !!lock ?  true ? invariant(false, 'Cannot claim lock as it is already claimed') : 0 : void 0;
    const newLock = {
      abandon
    };
    lock = newLock;
    return newLock;
  }
  function release() {
    !lock ?  true ? invariant(false, 'Cannot release lock when there is no lock') : 0 : void 0;
    lock = null;
  }
  function tryAbandon() {
    if (lock) {
      lock.abandon();
      release();
    }
  }
  return {
    isClaimed,
    isActive,
    claim,
    release,
    tryAbandon
  };
}

function isDragging(state) {
  if (state.phase === 'IDLE' || state.phase === 'DROP_ANIMATING') {
    return false;
  }
  return state.isDragging;
}

const tab = 9;
const enter = 13;
const escape = 27;
const space = 32;
const pageUp = 33;
const pageDown = 34;
const end = 35;
const home = 36;
const arrowLeft = 37;
const arrowUp = 38;
const arrowRight = 39;
const arrowDown = 40;

const preventedKeys = {
  [enter]: true,
  [tab]: true
};
var preventStandardKeyEvents = event => {
  if (preventedKeys[event.keyCode]) {
    event.preventDefault();
  }
};

const supportedEventName = (() => {
  const base = 'visibilitychange';
  if (typeof document === 'undefined') {
    return base;
  }
  const candidates = [base, `ms${base}`, `webkit${base}`, `moz${base}`, `o${base}`];
  const supported = candidates.find(eventName => `on${eventName}` in document);
  return supported || base;
})();

const primaryButton = 0;
const sloppyClickThreshold = 5;
function isSloppyClickThresholdExceeded(original, current) {
  return Math.abs(current.x - original.x) >= sloppyClickThreshold || Math.abs(current.y - original.y) >= sloppyClickThreshold;
}
const idle$1 = {
  type: 'IDLE'
};
function getCaptureBindings({
  cancel,
  completed,
  getPhase,
  setPhase
}) {
  return [{
    eventName: 'mousemove',
    fn: event => {
      const {
        button,
        clientX,
        clientY
      } = event;
      if (button !== primaryButton) {
        return;
      }
      const point = {
        x: clientX,
        y: clientY
      };
      const phase = getPhase();
      if (phase.type === 'DRAGGING') {
        event.preventDefault();
        phase.actions.move(point);
        return;
      }
      !(phase.type === 'PENDING') ?  true ? invariant(false, 'Cannot be IDLE') : 0 : void 0;
      const pending = phase.point;
      if (!isSloppyClickThresholdExceeded(pending, point)) {
        return;
      }
      event.preventDefault();
      const actions = phase.actions.fluidLift(point);
      setPhase({
        type: 'DRAGGING',
        actions
      });
    }
  }, {
    eventName: 'mouseup',
    fn: event => {
      const phase = getPhase();
      if (phase.type !== 'DRAGGING') {
        cancel();
        return;
      }
      event.preventDefault();
      phase.actions.drop({
        shouldBlockNextClick: true
      });
      completed();
    }
  }, {
    eventName: 'mousedown',
    fn: event => {
      if (getPhase().type === 'DRAGGING') {
        event.preventDefault();
      }
      cancel();
    }
  }, {
    eventName: 'keydown',
    fn: event => {
      const phase = getPhase();
      if (phase.type === 'PENDING') {
        cancel();
        return;
      }
      if (event.keyCode === escape) {
        event.preventDefault();
        cancel();
        return;
      }
      preventStandardKeyEvents(event);
    }
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'scroll',
    options: {
      passive: true,
      capture: false
    },
    fn: () => {
      if (getPhase().type === 'PENDING') {
        cancel();
      }
    }
  }, {
    eventName: 'webkitmouseforcedown',
    fn: event => {
      const phase = getPhase();
      !(phase.type !== 'IDLE') ?  true ? invariant(false, 'Unexpected phase') : 0 : void 0;
      if (phase.actions.shouldRespectForcePress()) {
        cancel();
        return;
      }
      event.preventDefault();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}
function useMouseSensor(api) {
  const phaseRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(idle$1);
  const unbindEventsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(noop$2);
  const startCaptureBinding = useMemo(() => ({
    eventName: 'mousedown',
    fn: function onMouseDown(event) {
      if (event.defaultPrevented) {
        return;
      }
      if (event.button !== primaryButton) {
        return;
      }
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
        return;
      }
      const draggableId = api.findClosestDraggableId(event);
      if (!draggableId) {
        return;
      }
      const actions = api.tryGetLock(draggableId, stop, {
        sourceEvent: event
      });
      if (!actions) {
        return;
      }
      event.preventDefault();
      const point = {
        x: event.clientX,
        y: event.clientY
      };
      unbindEventsRef.current();
      startPendingDrag(actions, point);
    }
  }), [api]);
  const preventForcePressBinding = useMemo(() => ({
    eventName: 'webkitmouseforcewillbegin',
    fn: event => {
      if (event.defaultPrevented) {
        return;
      }
      const id = api.findClosestDraggableId(event);
      if (!id) {
        return;
      }
      const options = api.findOptionsForDraggable(id);
      if (!options) {
        return;
      }
      if (options.shouldRespectForcePress) {
        return;
      }
      if (!api.canGetLock(id)) {
        return;
      }
      event.preventDefault();
    }
  }), [api]);
  const listenForCapture = useCallback(function listenForCapture() {
    const options = {
      passive: false,
      capture: true
    };
    unbindEventsRef.current = bindEvents(window, [preventForcePressBinding, startCaptureBinding], options);
  }, [preventForcePressBinding, startCaptureBinding]);
  const stop = useCallback(() => {
    const current = phaseRef.current;
    if (current.type === 'IDLE') {
      return;
    }
    phaseRef.current = idle$1;
    unbindEventsRef.current();
    listenForCapture();
  }, [listenForCapture]);
  const cancel = useCallback(() => {
    const phase = phaseRef.current;
    stop();
    if (phase.type === 'DRAGGING') {
      phase.actions.cancel({
        shouldBlockNextClick: true
      });
    }
    if (phase.type === 'PENDING') {
      phase.actions.abort();
    }
  }, [stop]);
  const bindCapturingEvents = useCallback(function bindCapturingEvents() {
    const options = {
      capture: true,
      passive: false
    };
    const bindings = getCaptureBindings({
      cancel,
      completed: stop,
      getPhase: () => phaseRef.current,
      setPhase: phase => {
        phaseRef.current = phase;
      }
    });
    unbindEventsRef.current = bindEvents(window, bindings, options);
  }, [cancel, stop]);
  const startPendingDrag = useCallback(function startPendingDrag(actions, point) {
    !(phaseRef.current.type === 'IDLE') ?  true ? invariant(false, 'Expected to move from IDLE to PENDING drag') : 0 : void 0;
    phaseRef.current = {
      type: 'PENDING',
      point,
      actions
    };
    bindCapturingEvents();
  }, [bindCapturingEvents]);
  useIsomorphicLayoutEffect(function mount() {
    listenForCapture();
    return function unmount() {
      unbindEventsRef.current();
    };
  }, [listenForCapture]);
}

function noop$1() {}
const scrollJumpKeys = {
  [pageDown]: true,
  [pageUp]: true,
  [home]: true,
  [end]: true
};
function getDraggingBindings(actions, stop) {
  function cancel() {
    stop();
    actions.cancel();
  }
  function drop() {
    stop();
    actions.drop();
  }
  return [{
    eventName: 'keydown',
    fn: event => {
      if (event.keyCode === escape) {
        event.preventDefault();
        cancel();
        return;
      }
      if (event.keyCode === space) {
        event.preventDefault();
        drop();
        return;
      }
      if (event.keyCode === arrowDown) {
        event.preventDefault();
        actions.moveDown();
        return;
      }
      if (event.keyCode === arrowUp) {
        event.preventDefault();
        actions.moveUp();
        return;
      }
      if (event.keyCode === arrowRight) {
        event.preventDefault();
        actions.moveRight();
        return;
      }
      if (event.keyCode === arrowLeft) {
        event.preventDefault();
        actions.moveLeft();
        return;
      }
      if (scrollJumpKeys[event.keyCode]) {
        event.preventDefault();
        return;
      }
      preventStandardKeyEvents(event);
    }
  }, {
    eventName: 'mousedown',
    fn: cancel
  }, {
    eventName: 'mouseup',
    fn: cancel
  }, {
    eventName: 'click',
    fn: cancel
  }, {
    eventName: 'touchstart',
    fn: cancel
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'wheel',
    fn: cancel,
    options: {
      passive: true
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}
function useKeyboardSensor(api) {
  const unbindEventsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(noop$1);
  const startCaptureBinding = useMemo(() => ({
    eventName: 'keydown',
    fn: function onKeyDown(event) {
      if (event.defaultPrevented) {
        return;
      }
      if (event.keyCode !== space) {
        return;
      }
      const draggableId = api.findClosestDraggableId(event);
      if (!draggableId) {
        return;
      }
      const preDrag = api.tryGetLock(draggableId, stop, {
        sourceEvent: event
      });
      if (!preDrag) {
        return;
      }
      event.preventDefault();
      let isCapturing = true;
      const actions = preDrag.snapLift();
      unbindEventsRef.current();
      function stop() {
        !isCapturing ?  true ? invariant(false, 'Cannot stop capturing a keyboard drag when not capturing') : 0 : void 0;
        isCapturing = false;
        unbindEventsRef.current();
        listenForCapture();
      }
      unbindEventsRef.current = bindEvents(window, getDraggingBindings(actions, stop), {
        capture: true,
        passive: false
      });
    }
  }), [api]);
  const listenForCapture = useCallback(function tryStartCapture() {
    const options = {
      passive: false,
      capture: true
    };
    unbindEventsRef.current = bindEvents(window, [startCaptureBinding], options);
  }, [startCaptureBinding]);
  useIsomorphicLayoutEffect(function mount() {
    listenForCapture();
    return function unmount() {
      unbindEventsRef.current();
    };
  }, [listenForCapture]);
}

const idle = {
  type: 'IDLE'
};
const timeForLongPress = 120;
const forcePressThreshold = 0.15;
function getWindowBindings({
  cancel,
  getPhase
}) {
  return [{
    eventName: 'orientationchange',
    fn: cancel
  }, {
    eventName: 'resize',
    fn: cancel
  }, {
    eventName: 'contextmenu',
    fn: event => {
      event.preventDefault();
    }
  }, {
    eventName: 'keydown',
    fn: event => {
      if (getPhase().type !== 'DRAGGING') {
        cancel();
        return;
      }
      if (event.keyCode === escape) {
        event.preventDefault();
      }
      cancel();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}
function getHandleBindings({
  cancel,
  completed,
  getPhase
}) {
  return [{
    eventName: 'touchmove',
    options: {
      capture: false
    },
    fn: event => {
      const phase = getPhase();
      if (phase.type !== 'DRAGGING') {
        cancel();
        return;
      }
      phase.hasMoved = true;
      const {
        clientX,
        clientY
      } = event.touches[0];
      const point = {
        x: clientX,
        y: clientY
      };
      event.preventDefault();
      phase.actions.move(point);
    }
  }, {
    eventName: 'touchend',
    fn: event => {
      const phase = getPhase();
      if (phase.type !== 'DRAGGING') {
        cancel();
        return;
      }
      event.preventDefault();
      phase.actions.drop({
        shouldBlockNextClick: true
      });
      completed();
    }
  }, {
    eventName: 'touchcancel',
    fn: event => {
      if (getPhase().type !== 'DRAGGING') {
        cancel();
        return;
      }
      event.preventDefault();
      cancel();
    }
  }, {
    eventName: 'touchforcechange',
    fn: event => {
      const phase = getPhase();
      !(phase.type !== 'IDLE') ?  true ? invariant() : 0 : void 0;
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      const isForcePress = touch.force >= forcePressThreshold;
      if (!isForcePress) {
        return;
      }
      const shouldRespect = phase.actions.shouldRespectForcePress();
      if (phase.type === 'PENDING') {
        if (shouldRespect) {
          cancel();
        }
        return;
      }
      if (shouldRespect) {
        if (phase.hasMoved) {
          event.preventDefault();
          return;
        }
        cancel();
        return;
      }
      event.preventDefault();
    }
  }, {
    eventName: supportedEventName,
    fn: cancel
  }];
}
function useTouchSensor(api) {
  const phaseRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(idle);
  const unbindEventsRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(noop$2);
  const getPhase = useCallback(function getPhase() {
    return phaseRef.current;
  }, []);
  const setPhase = useCallback(function setPhase(phase) {
    phaseRef.current = phase;
  }, []);
  const startCaptureBinding = useMemo(() => ({
    eventName: 'touchstart',
    fn: function onTouchStart(event) {
      if (event.defaultPrevented) {
        return;
      }
      const draggableId = api.findClosestDraggableId(event);
      if (!draggableId) {
        return;
      }
      const actions = api.tryGetLock(draggableId, stop, {
        sourceEvent: event
      });
      if (!actions) {
        return;
      }
      const touch = event.touches[0];
      const {
        clientX,
        clientY
      } = touch;
      const point = {
        x: clientX,
        y: clientY
      };
      unbindEventsRef.current();
      startPendingDrag(actions, point);
    }
  }), [api]);
  const listenForCapture = useCallback(function listenForCapture() {
    const options = {
      capture: true,
      passive: false
    };
    unbindEventsRef.current = bindEvents(window, [startCaptureBinding], options);
  }, [startCaptureBinding]);
  const stop = useCallback(() => {
    const current = phaseRef.current;
    if (current.type === 'IDLE') {
      return;
    }
    if (current.type === 'PENDING') {
      clearTimeout(current.longPressTimerId);
    }
    setPhase(idle);
    unbindEventsRef.current();
    listenForCapture();
  }, [listenForCapture, setPhase]);
  const cancel = useCallback(() => {
    const phase = phaseRef.current;
    stop();
    if (phase.type === 'DRAGGING') {
      phase.actions.cancel({
        shouldBlockNextClick: true
      });
    }
    if (phase.type === 'PENDING') {
      phase.actions.abort();
    }
  }, [stop]);
  const bindCapturingEvents = useCallback(function bindCapturingEvents() {
    const options = {
      capture: true,
      passive: false
    };
    const args = {
      cancel,
      completed: stop,
      getPhase
    };
    const unbindTarget = bindEvents(window, getHandleBindings(args), options);
    const unbindWindow = bindEvents(window, getWindowBindings(args), options);
    unbindEventsRef.current = function unbindAll() {
      unbindTarget();
      unbindWindow();
    };
  }, [cancel, getPhase, stop]);
  const startDragging = useCallback(function startDragging() {
    const phase = getPhase();
    !(phase.type === 'PENDING') ?  true ? invariant(false, `Cannot start dragging from phase ${phase.type}`) : 0 : void 0;
    const actions = phase.actions.fluidLift(phase.point);
    setPhase({
      type: 'DRAGGING',
      actions,
      hasMoved: false
    });
  }, [getPhase, setPhase]);
  const startPendingDrag = useCallback(function startPendingDrag(actions, point) {
    !(getPhase().type === 'IDLE') ?  true ? invariant(false, 'Expected to move from IDLE to PENDING drag') : 0 : void 0;
    const longPressTimerId = setTimeout(startDragging, timeForLongPress);
    setPhase({
      type: 'PENDING',
      point,
      actions,
      longPressTimerId
    });
    bindCapturingEvents();
  }, [bindCapturingEvents, getPhase, setPhase, startDragging]);
  useIsomorphicLayoutEffect(function mount() {
    listenForCapture();
    return function unmount() {
      unbindEventsRef.current();
      const phase = getPhase();
      if (phase.type === 'PENDING') {
        clearTimeout(phase.longPressTimerId);
        setPhase(idle);
      }
    };
  }, [getPhase, listenForCapture, setPhase]);
  useIsomorphicLayoutEffect(function webkitHack() {
    const unbind = bindEvents(window, [{
      eventName: 'touchmove',
      fn: () => {},
      options: {
        capture: false,
        passive: false
      }
    }]);
    return unbind;
  }, []);
}

function useValidateSensorHooks(sensorHooks) {
  useDev(() => {
    const previousRef = usePrevious(sensorHooks);
    useDevSetupWarning(() => {
      !(previousRef.current.length === sensorHooks.length) ?  true ? invariant(false, 'Cannot change the amount of sensor hooks after mounting') : 0 : void 0;
    });
  });
}

const interactiveTagNames = ['input', 'button', 'textarea', 'select', 'option', 'optgroup', 'video', 'audio'];
function isAnInteractiveElement(parent, current) {
  if (current == null) {
    return false;
  }
  const hasAnInteractiveTag = interactiveTagNames.includes(current.tagName.toLowerCase());
  if (hasAnInteractiveTag) {
    return true;
  }
  const attribute = current.getAttribute('contenteditable');
  if (attribute === 'true' || attribute === '') {
    return true;
  }
  if (current === parent) {
    return false;
  }
  return isAnInteractiveElement(parent, current.parentElement);
}
function isEventInInteractiveElement(draggable, event) {
  const target = event.target;
  if (!isHtmlElement(target)) {
    return false;
  }
  return isAnInteractiveElement(draggable, target);
}

var getBorderBoxCenterPosition = el => (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.getRect)(el.getBoundingClientRect()).center;

function isElement(el) {
  return el instanceof getWindowFromEl(el).Element;
}

const supportedMatchesName = (() => {
  const base = 'matches';
  if (typeof document === 'undefined') {
    return base;
  }
  const candidates = [base, 'msMatchesSelector', 'webkitMatchesSelector'];
  const value = candidates.find(name => name in Element.prototype);
  return value || base;
})();
function closestPonyfill(el, selector) {
  if (el == null) {
    return null;
  }
  if (el[supportedMatchesName](selector)) {
    return el;
  }
  return closestPonyfill(el.parentElement, selector);
}
function closest(el, selector) {
  if (el.closest) {
    return el.closest(selector);
  }
  return closestPonyfill(el, selector);
}

function getSelector(contextId) {
  return `[${dragHandle.contextId}="${contextId}"]`;
}
function findClosestDragHandleFromEvent(contextId, event) {
  const target = event.target;
  if (!isElement(target)) {
     true ? warning('event.target must be a Element') : 0;
    return null;
  }
  const selector = getSelector(contextId);
  const handle = closest(target, selector);
  if (!handle) {
    return null;
  }
  if (!isHtmlElement(handle)) {
     true ? warning('drag handle must be a HTMLElement') : 0;
    return null;
  }
  return handle;
}
function tryGetClosestDraggableIdFromEvent(contextId, event) {
  const handle = findClosestDragHandleFromEvent(contextId, event);
  if (!handle) {
    return null;
  }
  return handle.getAttribute(dragHandle.draggableId);
}

function findDraggable(contextId, draggableId) {
  const selector = `[${draggable.contextId}="${contextId}"]`;
  const possible = querySelectorAll(document, selector);
  const draggable$1 = possible.find(el => {
    return el.getAttribute(draggable.id) === draggableId;
  });
  if (!draggable$1) {
    return null;
  }
  if (!isHtmlElement(draggable$1)) {
     true ? warning('Draggable element is not a HTMLElement') : 0;
    return null;
  }
  return draggable$1;
}

function preventDefault(event) {
  event.preventDefault();
}
function isActive({
  expected,
  phase,
  isLockActive,
  shouldWarn
}) {
  if (!isLockActive()) {
    if (shouldWarn) {
       true ? warning(`
        Cannot perform action.
        The sensor no longer has an action lock.

        Tips:

        - Throw away your action handlers when forceStop() is called
        - Check actions.isActive() if you really need to
      `) : 0;
    }
    return false;
  }
  if (expected !== phase) {
    if (shouldWarn) {
       true ? warning(`
        Cannot perform action.
        The actions you used belong to an outdated phase

        Current phase: ${expected}
        You called an action from outdated phase: ${phase}

        Tips:

        - Do not use preDragActions actions after calling preDragActions.lift()
      `) : 0;
    }
    return false;
  }
  return true;
}
function canStart({
  lockAPI,
  store,
  registry,
  draggableId
}) {
  if (lockAPI.isClaimed()) {
    return false;
  }
  const entry = registry.draggable.findById(draggableId);
  if (!entry) {
     true ? warning(`Unable to find draggable with id: ${draggableId}`) : 0;
    return false;
  }
  if (!entry.options.isEnabled) {
    return false;
  }
  if (!canStartDrag(store.getState(), draggableId)) {
    return false;
  }
  return true;
}
function tryStart({
  lockAPI,
  contextId,
  store,
  registry,
  draggableId,
  forceSensorStop,
  sourceEvent
}) {
  const shouldStart = canStart({
    lockAPI,
    store,
    registry,
    draggableId
  });
  if (!shouldStart) {
    return null;
  }
  const entry = registry.draggable.getById(draggableId);
  const el = findDraggable(contextId, entry.descriptor.id);
  if (!el) {
     true ? warning(`Unable to find draggable element with id: ${draggableId}`) : 0;
    return null;
  }
  if (sourceEvent && !entry.options.canDragInteractiveElements && isEventInInteractiveElement(el, sourceEvent)) {
    return null;
  }
  const lock = lockAPI.claim(forceSensorStop || noop$2);
  let phase = 'PRE_DRAG';
  function getShouldRespectForcePress() {
    return entry.options.shouldRespectForcePress;
  }
  function isLockActive() {
    return lockAPI.isActive(lock);
  }
  function tryDispatch(expected, getAction) {
    if (isActive({
      expected,
      phase,
      isLockActive,
      shouldWarn: true
    })) {
      store.dispatch(getAction());
    }
  }
  const tryDispatchWhenDragging = tryDispatch.bind(null, 'DRAGGING');
  function lift(args) {
    function completed() {
      lockAPI.release();
      phase = 'COMPLETED';
    }
    if (phase !== 'PRE_DRAG') {
      completed();
       true ? invariant(false, `Cannot lift in phase ${phase}`) : 0 ;
    }
    store.dispatch(lift$1(args.liftActionArgs));
    phase = 'DRAGGING';
    function finish(reason, options = {
      shouldBlockNextClick: false
    }) {
      args.cleanup();
      if (options.shouldBlockNextClick) {
        const unbind = bindEvents(window, [{
          eventName: 'click',
          fn: preventDefault,
          options: {
            once: true,
            passive: false,
            capture: true
          }
        }]);
        setTimeout(unbind);
      }
      completed();
      store.dispatch(drop({
        reason
      }));
    }
    return {
      isActive: () => isActive({
        expected: 'DRAGGING',
        phase,
        isLockActive,
        shouldWarn: false
      }),
      shouldRespectForcePress: getShouldRespectForcePress,
      drop: options => finish('DROP', options),
      cancel: options => finish('CANCEL', options),
      ...args.actions
    };
  }
  function fluidLift(clientSelection) {
    const move$1 = (0,raf_schd__WEBPACK_IMPORTED_MODULE_5__["default"])(client => {
      tryDispatchWhenDragging(() => move({
        client
      }));
    });
    const api = lift({
      liftActionArgs: {
        id: draggableId,
        clientSelection,
        movementMode: 'FLUID'
      },
      cleanup: () => move$1.cancel(),
      actions: {
        move: move$1
      }
    });
    return {
      ...api,
      move: move$1
    };
  }
  function snapLift() {
    const actions = {
      moveUp: () => tryDispatchWhenDragging(moveUp),
      moveRight: () => tryDispatchWhenDragging(moveRight),
      moveDown: () => tryDispatchWhenDragging(moveDown),
      moveLeft: () => tryDispatchWhenDragging(moveLeft)
    };
    return lift({
      liftActionArgs: {
        id: draggableId,
        clientSelection: getBorderBoxCenterPosition(el),
        movementMode: 'SNAP'
      },
      cleanup: noop$2,
      actions
    });
  }
  function abortPreDrag() {
    const shouldRelease = isActive({
      expected: 'PRE_DRAG',
      phase,
      isLockActive,
      shouldWarn: true
    });
    if (shouldRelease) {
      lockAPI.release();
    }
  }
  const preDrag = {
    isActive: () => isActive({
      expected: 'PRE_DRAG',
      phase,
      isLockActive,
      shouldWarn: false
    }),
    shouldRespectForcePress: getShouldRespectForcePress,
    fluidLift,
    snapLift,
    abort: abortPreDrag
  };
  return preDrag;
}
const defaultSensors = [useMouseSensor, useKeyboardSensor, useTouchSensor];
function useSensorMarshal({
  contextId,
  store,
  registry,
  customSensors,
  enableDefaultSensors
}) {
  const useSensors = [...(enableDefaultSensors ? defaultSensors : []), ...(customSensors || [])];
  const lockAPI = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(() => create())[0];
  const tryAbandonLock = useCallback(function tryAbandonLock(previous, current) {
    if (isDragging(previous) && !isDragging(current)) {
      lockAPI.tryAbandon();
    }
  }, [lockAPI]);
  useIsomorphicLayoutEffect(function listenToStore() {
    let previous = store.getState();
    const unsubscribe = store.subscribe(() => {
      const current = store.getState();
      tryAbandonLock(previous, current);
      previous = current;
    });
    return unsubscribe;
  }, [lockAPI, store, tryAbandonLock]);
  useIsomorphicLayoutEffect(() => {
    return lockAPI.tryAbandon;
  }, [lockAPI.tryAbandon]);
  const canGetLock = useCallback(draggableId => {
    return canStart({
      lockAPI,
      registry,
      store,
      draggableId
    });
  }, [lockAPI, registry, store]);
  const tryGetLock = useCallback((draggableId, forceStop, options) => tryStart({
    lockAPI,
    registry,
    contextId,
    store,
    draggableId,
    forceSensorStop: forceStop || null,
    sourceEvent: options && options.sourceEvent ? options.sourceEvent : null
  }), [contextId, lockAPI, registry, store]);
  const findClosestDraggableId = useCallback(event => tryGetClosestDraggableIdFromEvent(contextId, event), [contextId]);
  const findOptionsForDraggable = useCallback(id => {
    const entry = registry.draggable.findById(id);
    return entry ? entry.options : null;
  }, [registry.draggable]);
  const tryReleaseLock = useCallback(function tryReleaseLock() {
    if (!lockAPI.isClaimed()) {
      return;
    }
    lockAPI.tryAbandon();
    if (store.getState().phase !== 'IDLE') {
      store.dispatch(flush());
    }
  }, [lockAPI, store]);
  const isLockClaimed = useCallback(() => lockAPI.isClaimed(), [lockAPI]);
  const api = useMemo(() => ({
    canGetLock,
    tryGetLock,
    findClosestDraggableId,
    findOptionsForDraggable,
    tryReleaseLock,
    isLockClaimed
  }), [canGetLock, tryGetLock, findClosestDraggableId, findOptionsForDraggable, tryReleaseLock, isLockClaimed]);
  useValidateSensorHooks(useSensors);
  for (let i = 0; i < useSensors.length; i++) {
    useSensors[i](api);
  }
}

const createResponders = props => ({
  onBeforeCapture: t => {
    const onBeforeCapureCallback = () => {
      if (props.onBeforeCapture) {
        props.onBeforeCapture(t);
      }
    };
    (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync)(onBeforeCapureCallback);
  },
  onBeforeDragStart: props.onBeforeDragStart,
  onDragStart: props.onDragStart,
  onDragEnd: props.onDragEnd,
  onDragUpdate: props.onDragUpdate
});
const createAutoScrollerOptions = props => ({
  ...defaultAutoScrollerOptions,
  ...props.autoScrollerOptions,
  durationDampening: {
    ...defaultAutoScrollerOptions.durationDampening,
    ...props.autoScrollerOptions
  }
});
function getStore(lazyRef) {
  !lazyRef.current ?  true ? invariant(false, 'Could not find store from lazy ref') : 0 : void 0;
  return lazyRef.current;
}
function App(props) {
  const {
    contextId,
    setCallbacks,
    sensors,
    nonce,
    dragHandleUsageInstructions
  } = props;
  const lazyStoreRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  useStartupValidation();
  const lastPropsRef = usePrevious(props);
  const getResponders = useCallback(() => {
    return createResponders(lastPropsRef.current);
  }, [lastPropsRef]);
  const getAutoScrollerOptions = useCallback(() => {
    return createAutoScrollerOptions(lastPropsRef.current);
  }, [lastPropsRef]);
  const announce = useAnnouncer(contextId);
  const dragHandleUsageInstructionsId = useHiddenTextElement({
    contextId,
    text: dragHandleUsageInstructions
  });
  const styleMarshal = useStyleMarshal(contextId, nonce);
  const lazyDispatch = useCallback(action => {
    getStore(lazyStoreRef).dispatch(action);
  }, []);
  const marshalCallbacks = useMemo(() => (0,redux__WEBPACK_IMPORTED_MODULE_2__.bindActionCreators)({
    publishWhileDragging,
    updateDroppableScroll,
    updateDroppableIsEnabled,
    updateDroppableIsCombineEnabled,
    collectionStarting
  }, lazyDispatch), [lazyDispatch]);
  const registry = useRegistry();
  const dimensionMarshal = useMemo(() => {
    return createDimensionMarshal(registry, marshalCallbacks);
  }, [registry, marshalCallbacks]);
  const autoScroller = useMemo(() => createAutoScroller({
    scrollWindow,
    scrollDroppable: dimensionMarshal.scrollDroppable,
    getAutoScrollerOptions,
    ...(0,redux__WEBPACK_IMPORTED_MODULE_2__.bindActionCreators)({
      move
    }, lazyDispatch)
  }), [dimensionMarshal.scrollDroppable, lazyDispatch, getAutoScrollerOptions]);
  const focusMarshal = useFocusMarshal(contextId);
  const store = useMemo(() => createStore({
    announce,
    autoScroller,
    dimensionMarshal,
    focusMarshal,
    getResponders,
    styleMarshal
  }), [announce, autoScroller, dimensionMarshal, focusMarshal, getResponders, styleMarshal]);
  if (true) {
    if (lazyStoreRef.current && lazyStoreRef.current !== store) {
       true ? warning('unexpected store change') : 0;
    }
  }
  lazyStoreRef.current = store;
  const tryResetStore = useCallback(() => {
    const current = getStore(lazyStoreRef);
    const state = current.getState();
    if (state.phase !== 'IDLE') {
      current.dispatch(flush());
    }
  }, []);
  const isDragging = useCallback(() => {
    const state = getStore(lazyStoreRef).getState();
    if (state.phase === 'DROP_ANIMATING') {
      return true;
    }
    if (state.phase === 'IDLE') {
      return false;
    }
    return state.isDragging;
  }, []);
  const appCallbacks = useMemo(() => ({
    isDragging,
    tryAbort: tryResetStore
  }), [isDragging, tryResetStore]);
  setCallbacks(appCallbacks);
  const getCanLift = useCallback(id => canStartDrag(getStore(lazyStoreRef).getState(), id), []);
  const getIsMovementAllowed = useCallback(() => isMovementAllowed(getStore(lazyStoreRef).getState()), []);
  const appContext = useMemo(() => ({
    marshal: dimensionMarshal,
    focus: focusMarshal,
    contextId,
    canLift: getCanLift,
    isMovementAllowed: getIsMovementAllowed,
    dragHandleUsageInstructionsId,
    registry
  }), [contextId, dimensionMarshal, dragHandleUsageInstructionsId, focusMarshal, getCanLift, getIsMovementAllowed, registry]);
  useSensorMarshal({
    contextId,
    store,
    registry,
    customSensors: sensors || null,
    enableDefaultSensors: props.enableDefaultSensors !== false
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return tryResetStore;
  }, [tryResetStore]);
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AppContext.Provider, {
    value: appContext
  }, react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__.Provider, {
    context: StoreContext,
    store: store
  }, props.children));
}

function useUniqueContextId() {
  return react__WEBPACK_IMPORTED_MODULE_0___default().useId();
}

function DragDropContext(props) {
  const contextId = useUniqueContextId();
  const dragHandleUsageInstructions = props.dragHandleUsageInstructions || preset.dragHandleUsageInstructions;
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ErrorBoundary, null, setCallbacks => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, {
    nonce: props.nonce,
    contextId: contextId,
    setCallbacks: setCallbacks,
    dragHandleUsageInstructions: dragHandleUsageInstructions,
    enableDefaultSensors: props.enableDefaultSensors,
    sensors: props.sensors,
    onBeforeCapture: props.onBeforeCapture,
    onBeforeDragStart: props.onBeforeDragStart,
    onDragStart: props.onDragStart,
    onDragUpdate: props.onDragUpdate,
    onDragEnd: props.onDragEnd,
    autoScrollerOptions: props.autoScrollerOptions
  }, props.children));
}

const zIndexOptions = {
  dragging: 5000,
  dropAnimating: 4500
};
const getDraggingTransition = (shouldAnimateDragMovement, dropping) => {
  if (dropping) {
    return transitions.drop(dropping.duration);
  }
  if (shouldAnimateDragMovement) {
    return transitions.snap;
  }
  return transitions.fluid;
};
const getDraggingOpacity = (isCombining, isDropAnimating) => {
  if (!isCombining) {
    return undefined;
  }
  return isDropAnimating ? combine.opacity.drop : combine.opacity.combining;
};
const getShouldDraggingAnimate = dragging => {
  if (dragging.forceShouldAnimate != null) {
    return dragging.forceShouldAnimate;
  }
  return dragging.mode === 'SNAP';
};
function getDraggingStyle(dragging) {
  const dimension = dragging.dimension;
  const box = dimension.client;
  const {
    offset,
    combineWith,
    dropping
  } = dragging;
  const isCombining = Boolean(combineWith);
  const shouldAnimate = getShouldDraggingAnimate(dragging);
  const isDropAnimating = Boolean(dropping);
  const transform = isDropAnimating ? transforms.drop(offset, isCombining) : transforms.moveTo(offset);
  const style = {
    position: 'fixed',
    top: box.marginBox.top,
    left: box.marginBox.left,
    boxSizing: 'border-box',
    width: box.borderBox.width,
    height: box.borderBox.height,
    transition: getDraggingTransition(shouldAnimate, dropping),
    transform,
    opacity: getDraggingOpacity(isCombining, isDropAnimating),
    zIndex: isDropAnimating ? zIndexOptions.dropAnimating : zIndexOptions.dragging,
    pointerEvents: 'none'
  };
  return style;
}
function getSecondaryStyle(secondary) {
  return {
    transform: transforms.moveTo(secondary.offset),
    transition: secondary.shouldAnimateDisplacement ? undefined : 'none'
  };
}
function getStyle$1(mapped) {
  return mapped.type === 'DRAGGING' ? getDraggingStyle(mapped) : getSecondaryStyle(mapped);
}

function getDimension$1(descriptor, el, windowScroll = origin) {
  const computedStyles = window.getComputedStyle(el);
  const borderBox = el.getBoundingClientRect();
  const client = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.calculateBox)(borderBox, computedStyles);
  const page = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.withScroll)(client, windowScroll);
  const placeholder = {
    client,
    tagName: el.tagName.toLowerCase(),
    display: computedStyles.display
  };
  const displaceBy = {
    x: client.marginBox.width,
    y: client.marginBox.height
  };
  const dimension = {
    descriptor,
    placeholder,
    displaceBy,
    client,
    page
  };
  return dimension;
}

function useDraggablePublisher(args) {
  const uniqueId = useUniqueId('draggable');
  const {
    descriptor,
    registry,
    getDraggableRef,
    canDragInteractiveElements,
    shouldRespectForcePress,
    isEnabled
  } = args;
  const options = useMemo(() => ({
    canDragInteractiveElements,
    shouldRespectForcePress,
    isEnabled
  }), [canDragInteractiveElements, isEnabled, shouldRespectForcePress]);
  const getDimension = useCallback(windowScroll => {
    const el = getDraggableRef();
    !el ?  true ? invariant(false, 'Cannot get dimension when no ref is set') : 0 : void 0;
    return getDimension$1(descriptor, el, windowScroll);
  }, [descriptor, getDraggableRef]);
  const entry = useMemo(() => ({
    uniqueId,
    descriptor,
    options,
    getDimension
  }), [descriptor, getDimension, options, uniqueId]);
  const publishedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(entry);
  const isFirstPublishRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  useIsomorphicLayoutEffect(() => {
    registry.draggable.register(publishedRef.current);
    return () => registry.draggable.unregister(publishedRef.current);
  }, [registry.draggable]);
  useIsomorphicLayoutEffect(() => {
    if (isFirstPublishRef.current) {
      isFirstPublishRef.current = false;
      return;
    }
    const last = publishedRef.current;
    publishedRef.current = entry;
    registry.draggable.update(entry, last);
  }, [entry, registry.draggable]);
}

var DroppableContext = react__WEBPACK_IMPORTED_MODULE_0___default().createContext(null);

function checkIsValidInnerRef(el) {
  !(el && isHtmlElement(el)) ?  true ? invariant(false, `
    provided.innerRef has not been provided with a HTMLElement.

    You can find a guide on using the innerRef callback functions at:
    https://github.com/hello-pangea/dnd/blob/main/docs/guides/using-inner-ref.md
  `) : 0 : void 0;
}

function useValidation$1(props, contextId, getRef) {
  useDevSetupWarning(() => {
    function prefix(id) {
      return `Draggable[id: ${id}]: `;
    }
    const id = props.draggableId;
    !id ?  true ? invariant(false, 'Draggable requires a draggableId') : 0 : void 0;
    !(typeof id === 'string') ?  true ? invariant(false, `Draggable requires a [string] draggableId.
      Provided: [type: ${typeof id}] (value: ${id})`) : 0 : void 0;
    !Number.isInteger(props.index) ?  true ? invariant(false, `${prefix(id)} requires an integer index prop`) : 0 : void 0;
    if (props.mapped.type === 'DRAGGING') {
      return;
    }
    checkIsValidInnerRef(getRef());
    if (props.isEnabled) {
      !findDragHandle(contextId, id) ?  true ? invariant(false, `${prefix(id)} Unable to find drag handle`) : 0 : void 0;
    }
  });
}
function useClonePropValidation(isClone) {
  useDev(() => {
    const initialRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(isClone);
    useDevSetupWarning(() => {
      !(isClone === initialRef.current) ?  true ? invariant(false, 'Draggable isClone prop value changed during component life') : 0 : void 0;
    }, [isClone]);
  });
}

function useRequiredContext(Context) {
  const result = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(Context);
  !result ?  true ? invariant(false, 'Could not find required context') : 0 : void 0;
  return result;
}

function preventHtml5Dnd(event) {
  event.preventDefault();
}
const Draggable = props => {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const setRef = useCallback((el = null) => {
    ref.current = el;
  }, []);
  const getRef = useCallback(() => ref.current, []);
  const {
    contextId,
    dragHandleUsageInstructionsId,
    registry
  } = useRequiredContext(AppContext);
  const {
    type,
    droppableId
  } = useRequiredContext(DroppableContext);
  const descriptor = useMemo(() => ({
    id: props.draggableId,
    index: props.index,
    type,
    droppableId
  }), [props.draggableId, props.index, type, droppableId]);
  const {
    children,
    draggableId,
    isEnabled,
    shouldRespectForcePress,
    canDragInteractiveElements,
    isClone,
    mapped,
    dropAnimationFinished: dropAnimationFinishedAction
  } = props;
  useValidation$1(props, contextId, getRef);
  useClonePropValidation(isClone);
  if (!isClone) {
    const forPublisher = useMemo(() => ({
      descriptor,
      registry,
      getDraggableRef: getRef,
      canDragInteractiveElements,
      shouldRespectForcePress,
      isEnabled
    }), [descriptor, registry, getRef, canDragInteractiveElements, shouldRespectForcePress, isEnabled]);
    useDraggablePublisher(forPublisher);
  }
  const dragHandleProps = useMemo(() => isEnabled ? {
    tabIndex: 0,
    role: 'button',
    'aria-describedby': dragHandleUsageInstructionsId,
    'data-rfd-drag-handle-draggable-id': draggableId,
    'data-rfd-drag-handle-context-id': contextId,
    draggable: false,
    onDragStart: preventHtml5Dnd
  } : null, [contextId, dragHandleUsageInstructionsId, draggableId, isEnabled]);
  const onMoveEnd = useCallback(event => {
    if (mapped.type !== 'DRAGGING') {
      return;
    }
    if (!mapped.dropping) {
      return;
    }
    if (event.propertyName !== 'transform') {
      return;
    }
    (0,react_dom__WEBPACK_IMPORTED_MODULE_1__.flushSync)(dropAnimationFinishedAction);
  }, [dropAnimationFinishedAction, mapped]);
  const provided = useMemo(() => {
    const style = getStyle$1(mapped);
    const onTransitionEnd = mapped.type === 'DRAGGING' && mapped.dropping ? onMoveEnd : undefined;
    const result = {
      innerRef: setRef,
      draggableProps: {
        'data-rfd-draggable-context-id': contextId,
        'data-rfd-draggable-id': draggableId,
        style,
        onTransitionEnd
      },
      dragHandleProps
    };
    return result;
  }, [contextId, dragHandleProps, draggableId, mapped, onMoveEnd, setRef]);
  const rubric = useMemo(() => ({
    draggableId: descriptor.id,
    type: descriptor.type,
    source: {
      index: descriptor.index,
      droppableId: descriptor.droppableId
    }
  }), [descriptor.droppableId, descriptor.id, descriptor.index, descriptor.type]);
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, children(provided, mapped.snapshot, rubric));
};

var isStrictEqual = (a, b) => a === b;

var whatIsDraggedOverFromResult = result => {
  const {
    combine,
    destination
  } = result;
  if (destination) {
    return destination.droppableId;
  }
  if (combine) {
    return combine.droppableId;
  }
  return null;
};

const getCombineWithFromResult = result => {
  return result.combine ? result.combine.draggableId : null;
};
const getCombineWithFromImpact = impact => {
  return impact.at && impact.at.type === 'COMBINE' ? impact.at.combine.draggableId : null;
};
function getDraggableSelector() {
  const memoizedOffset = memoizeOne((x, y) => ({
    x,
    y
  }));
  const getMemoizedSnapshot = memoizeOne((mode, isClone, draggingOver = null, combineWith = null, dropping = null) => ({
    isDragging: true,
    isClone,
    isDropAnimating: Boolean(dropping),
    dropAnimation: dropping,
    mode,
    draggingOver,
    combineWith,
    combineTargetFor: null
  }));
  const getMemoizedProps = memoizeOne((offset, mode, dimension, isClone, draggingOver = null, combineWith = null, forceShouldAnimate = null) => ({
    mapped: {
      type: 'DRAGGING',
      dropping: null,
      draggingOver,
      combineWith,
      mode,
      offset,
      dimension,
      forceShouldAnimate,
      snapshot: getMemoizedSnapshot(mode, isClone, draggingOver, combineWith, null)
    }
  }));
  const selector = (state, ownProps) => {
    if (isDragging(state)) {
      if (state.critical.draggable.id !== ownProps.draggableId) {
        return null;
      }
      const offset = state.current.client.offset;
      const dimension = state.dimensions.draggables[ownProps.draggableId];
      const draggingOver = whatIsDraggedOver(state.impact);
      const combineWith = getCombineWithFromImpact(state.impact);
      const forceShouldAnimate = state.forceShouldAnimate;
      return getMemoizedProps(memoizedOffset(offset.x, offset.y), state.movementMode, dimension, ownProps.isClone, draggingOver, combineWith, forceShouldAnimate);
    }
    if (state.phase === 'DROP_ANIMATING') {
      const completed = state.completed;
      if (completed.result.draggableId !== ownProps.draggableId) {
        return null;
      }
      const isClone = ownProps.isClone;
      const dimension = state.dimensions.draggables[ownProps.draggableId];
      const result = completed.result;
      const mode = result.mode;
      const draggingOver = whatIsDraggedOverFromResult(result);
      const combineWith = getCombineWithFromResult(result);
      const duration = state.dropDuration;
      const dropping = {
        duration,
        curve: curves.drop,
        moveTo: state.newHomeClientOffset,
        opacity: combineWith ? combine.opacity.drop : null,
        scale: combineWith ? combine.scale.drop : null
      };
      return {
        mapped: {
          type: 'DRAGGING',
          offset: state.newHomeClientOffset,
          dimension,
          dropping,
          draggingOver,
          combineWith,
          mode,
          forceShouldAnimate: null,
          snapshot: getMemoizedSnapshot(mode, isClone, draggingOver, combineWith, dropping)
        }
      };
    }
    return null;
  };
  return selector;
}
function getSecondarySnapshot(combineTargetFor = null) {
  return {
    isDragging: false,
    isDropAnimating: false,
    isClone: false,
    dropAnimation: null,
    mode: null,
    draggingOver: null,
    combineTargetFor,
    combineWith: null
  };
}
const atRest = {
  mapped: {
    type: 'SECONDARY',
    offset: origin,
    combineTargetFor: null,
    shouldAnimateDisplacement: true,
    snapshot: getSecondarySnapshot(null)
  }
};
function getSecondarySelector() {
  const memoizedOffset = memoizeOne((x, y) => ({
    x,
    y
  }));
  const getMemoizedSnapshot = memoizeOne(getSecondarySnapshot);
  const getMemoizedProps = memoizeOne((offset, combineTargetFor = null, shouldAnimateDisplacement) => ({
    mapped: {
      type: 'SECONDARY',
      offset,
      combineTargetFor,
      shouldAnimateDisplacement,
      snapshot: getMemoizedSnapshot(combineTargetFor)
    }
  }));
  const getFallback = combineTargetFor => {
    return combineTargetFor ? getMemoizedProps(origin, combineTargetFor, true) : null;
  };
  const getProps = (ownId, draggingId, impact, afterCritical) => {
    const visualDisplacement = impact.displaced.visible[ownId];
    const isAfterCriticalInVirtualList = Boolean(afterCritical.inVirtualList && afterCritical.effected[ownId]);
    const combine = tryGetCombine(impact);
    const combineTargetFor = combine && combine.draggableId === ownId ? draggingId : null;
    if (!visualDisplacement) {
      if (!isAfterCriticalInVirtualList) {
        return getFallback(combineTargetFor);
      }
      if (impact.displaced.invisible[ownId]) {
        return null;
      }
      const change = negate(afterCritical.displacedBy.point);
      const offset = memoizedOffset(change.x, change.y);
      return getMemoizedProps(offset, combineTargetFor, true);
    }
    if (isAfterCriticalInVirtualList) {
      return getFallback(combineTargetFor);
    }
    const displaceBy = impact.displacedBy.point;
    const offset = memoizedOffset(displaceBy.x, displaceBy.y);
    return getMemoizedProps(offset, combineTargetFor, visualDisplacement.shouldAnimate);
  };
  const selector = (state, ownProps) => {
    if (isDragging(state)) {
      if (state.critical.draggable.id === ownProps.draggableId) {
        return null;
      }
      return getProps(ownProps.draggableId, state.critical.draggable.id, state.impact, state.afterCritical);
    }
    if (state.phase === 'DROP_ANIMATING') {
      const completed = state.completed;
      if (completed.result.draggableId === ownProps.draggableId) {
        return null;
      }
      return getProps(ownProps.draggableId, completed.result.draggableId, completed.impact, completed.afterCritical);
    }
    return null;
  };
  return selector;
}
const makeMapStateToProps$1 = () => {
  const draggingSelector = getDraggableSelector();
  const secondarySelector = getSecondarySelector();
  const selector = (state, ownProps) => draggingSelector(state, ownProps) || secondarySelector(state, ownProps) || atRest;
  return selector;
};
const mapDispatchToProps$1 = {
  dropAnimationFinished: dropAnimationFinished
};
const ConnectedDraggable = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(makeMapStateToProps$1, mapDispatchToProps$1, null, {
  context: StoreContext,
  areStatePropsEqual: isStrictEqual
})(Draggable);

function PrivateDraggable(props) {
  const droppableContext = useRequiredContext(DroppableContext);
  const isUsingCloneFor = droppableContext.isUsingCloneFor;
  if (isUsingCloneFor === props.draggableId && !props.isClone) {
    return null;
  }
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ConnectedDraggable, props);
}
function PublicDraggable(props) {
  const isEnabled = typeof props.isDragDisabled === 'boolean' ? !props.isDragDisabled : true;
  const canDragInteractiveElements = Boolean(props.disableInteractiveElementBlocking);
  const shouldRespectForcePress = Boolean(props.shouldRespectForcePress);
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PrivateDraggable, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_6__["default"])({}, props, {
    isClone: false,
    isEnabled: isEnabled,
    canDragInteractiveElements: canDragInteractiveElements,
    shouldRespectForcePress: shouldRespectForcePress
  }));
}

const isEqual = base => value => base === value;
const isScroll = isEqual('scroll');
const isAuto = isEqual('auto');
const isVisible = isEqual('visible');
const isEither = (overflow, fn) => fn(overflow.overflowX) || fn(overflow.overflowY);
const isBoth = (overflow, fn) => fn(overflow.overflowX) && fn(overflow.overflowY);
const isElementScrollable = el => {
  const style = window.getComputedStyle(el);
  const overflow = {
    overflowX: style.overflowX,
    overflowY: style.overflowY
  };
  return isEither(overflow, isScroll) || isEither(overflow, isAuto);
};
const isBodyScrollable = () => {
  if (false) // removed by dead control flow
{}
  const body = getBodyElement();
  const html = document.documentElement;
  !html ?  true ? invariant() : 0 : void 0;
  if (!isElementScrollable(body)) {
    return false;
  }
  const htmlStyle = window.getComputedStyle(html);
  const htmlOverflow = {
    overflowX: htmlStyle.overflowX,
    overflowY: htmlStyle.overflowY
  };
  if (isBoth(htmlOverflow, isVisible)) {
    return false;
  }
   true ? warning(`
    We have detected that your <body> element might be a scroll container.
    We have found no reliable way of detecting whether the <body> element is a scroll container.
    Under most circumstances a <body> scroll bar will be on the <html> element (document.documentElement)

    Because we cannot determine if the <body> is a scroll container, and generally it is not one,
    we will be treating the <body> as *not* a scroll container

    More information: https://github.com/hello-pangea/dnd/blob/main/docs/guides/how-we-detect-scroll-containers.md
  `) : 0;
  return false;
};
const getClosestScrollable = el => {
  if (el == null) {
    return null;
  }
  if (el === document.body) {
    return isBodyScrollable() ? el : null;
  }
  if (el === document.documentElement) {
    return null;
  }
  if (!isElementScrollable(el)) {
    return getClosestScrollable(el.parentElement);
  }
  return el;
};

var checkForNestedScrollContainers = scrollable => {
  if (!scrollable) {
    return;
  }
  const anotherScrollParent = getClosestScrollable(scrollable.parentElement);
  if (!anotherScrollParent) {
    return;
  }
   true ? warning(`
    Droppable: unsupported nested scroll container detected.
    A Droppable can only have one scroll parent (which can be itself)
    Nested scroll containers are currently not supported.

    We hope to support nested scroll containers soon: https://github.com/atlassian/react-beautiful-dnd/issues/131
  `) : 0;
};

var getScroll = el => ({
  x: el.scrollLeft,
  y: el.scrollTop
});

const getIsFixed = el => {
  if (!el) {
    return false;
  }
  const style = window.getComputedStyle(el);
  if (style.position === 'fixed') {
    return true;
  }
  return getIsFixed(el.parentElement);
};
var getEnv = start => {
  const closestScrollable = getClosestScrollable(start);
  const isFixedOnPage = getIsFixed(start);
  return {
    closestScrollable,
    isFixedOnPage
  };
};

var getDroppableDimension = ({
  descriptor,
  isEnabled,
  isCombineEnabled,
  isFixedOnPage,
  direction,
  client,
  page,
  closest
}) => {
  const frame = (() => {
    if (!closest) {
      return null;
    }
    const {
      scrollSize,
      client: frameClient
    } = closest;
    const maxScroll = getMaxScroll({
      scrollHeight: scrollSize.scrollHeight,
      scrollWidth: scrollSize.scrollWidth,
      height: frameClient.paddingBox.height,
      width: frameClient.paddingBox.width
    });
    return {
      pageMarginBox: closest.page.marginBox,
      frameClient,
      scrollSize,
      shouldClipSubject: closest.shouldClipSubject,
      scroll: {
        initial: closest.scroll,
        current: closest.scroll,
        max: maxScroll,
        diff: {
          value: origin,
          displacement: origin
        }
      }
    };
  })();
  const axis = direction === 'vertical' ? vertical : horizontal;
  const subject = getSubject({
    page,
    withPlaceholder: null,
    axis,
    frame
  });
  const dimension = {
    descriptor,
    isCombineEnabled,
    isFixedOnPage,
    axis,
    isEnabled,
    client,
    page,
    frame,
    subject
  };
  return dimension;
};

const getClient = (targetRef, closestScrollable) => {
  const base = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.getBox)(targetRef);
  if (!closestScrollable) {
    return base;
  }
  if (targetRef !== closestScrollable) {
    return base;
  }
  const top = base.paddingBox.top - closestScrollable.scrollTop;
  const left = base.paddingBox.left - closestScrollable.scrollLeft;
  const bottom = top + closestScrollable.scrollHeight;
  const right = left + closestScrollable.scrollWidth;
  const paddingBox = {
    top,
    right,
    bottom,
    left
  };
  const borderBox = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.expand)(paddingBox, base.border);
  const client = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.createBox)({
    borderBox,
    margin: base.margin,
    border: base.border,
    padding: base.padding
  });
  return client;
};
var getDimension = ({
  ref,
  descriptor,
  env,
  windowScroll,
  direction,
  isDropDisabled,
  isCombineEnabled,
  shouldClipSubject
}) => {
  const closestScrollable = env.closestScrollable;
  const client = getClient(ref, closestScrollable);
  const page = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.withScroll)(client, windowScroll);
  const closest = (() => {
    if (!closestScrollable) {
      return null;
    }
    const frameClient = (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.getBox)(closestScrollable);
    const scrollSize = {
      scrollHeight: closestScrollable.scrollHeight,
      scrollWidth: closestScrollable.scrollWidth
    };
    return {
      client: frameClient,
      page: (0,css_box_model__WEBPACK_IMPORTED_MODULE_4__.withScroll)(frameClient, windowScroll),
      scroll: getScroll(closestScrollable),
      scrollSize,
      shouldClipSubject
    };
  })();
  const dimension = getDroppableDimension({
    descriptor,
    isEnabled: !isDropDisabled,
    isCombineEnabled,
    isFixedOnPage: env.isFixedOnPage,
    direction,
    client,
    page,
    closest
  });
  return dimension;
};

const immediate = {
  passive: false
};
const delayed = {
  passive: true
};
var getListenerOptions = options => options.shouldPublishImmediately ? immediate : delayed;

const getClosestScrollableFromDrag = dragging => dragging && dragging.env.closestScrollable || null;
function useDroppablePublisher(args) {
  const whileDraggingRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const appContext = useRequiredContext(AppContext);
  const uniqueId = useUniqueId('droppable');
  const {
    registry,
    marshal
  } = appContext;
  const previousRef = usePrevious(args);
  const descriptor = useMemo(() => ({
    id: args.droppableId,
    type: args.type,
    mode: args.mode
  }), [args.droppableId, args.mode, args.type]);
  const publishedDescriptorRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(descriptor);
  const memoizedUpdateScroll = useMemo(() => memoizeOne((x, y) => {
    !whileDraggingRef.current ?  true ? invariant(false, 'Can only update scroll when dragging') : 0 : void 0;
    const scroll = {
      x,
      y
    };
    marshal.updateDroppableScroll(descriptor.id, scroll);
  }), [descriptor.id, marshal]);
  const getClosestScroll = useCallback(() => {
    const dragging = whileDraggingRef.current;
    if (!dragging || !dragging.env.closestScrollable) {
      return origin;
    }
    return getScroll(dragging.env.closestScrollable);
  }, []);
  const updateScroll = useCallback(() => {
    const scroll = getClosestScroll();
    memoizedUpdateScroll(scroll.x, scroll.y);
  }, [getClosestScroll, memoizedUpdateScroll]);
  const scheduleScrollUpdate = useMemo(() => (0,raf_schd__WEBPACK_IMPORTED_MODULE_5__["default"])(updateScroll), [updateScroll]);
  const onClosestScroll = useCallback(() => {
    const dragging = whileDraggingRef.current;
    const closest = getClosestScrollableFromDrag(dragging);
    !(dragging && closest) ?  true ? invariant(false, 'Could not find scroll options while scrolling') : 0 : void 0;
    const options = dragging.scrollOptions;
    if (options.shouldPublishImmediately) {
      updateScroll();
      return;
    }
    scheduleScrollUpdate();
  }, [scheduleScrollUpdate, updateScroll]);
  const getDimensionAndWatchScroll = useCallback((windowScroll, options) => {
    !!whileDraggingRef.current ?  true ? invariant(false, 'Cannot collect a droppable while a drag is occurring') : 0 : void 0;
    const previous = previousRef.current;
    const ref = previous.getDroppableRef();
    !ref ?  true ? invariant(false, 'Cannot collect without a droppable ref') : 0 : void 0;
    const env = getEnv(ref);
    const dragging = {
      ref,
      descriptor,
      env,
      scrollOptions: options
    };
    whileDraggingRef.current = dragging;
    const dimension = getDimension({
      ref,
      descriptor,
      env,
      windowScroll,
      direction: previous.direction,
      isDropDisabled: previous.isDropDisabled,
      isCombineEnabled: previous.isCombineEnabled,
      shouldClipSubject: !previous.ignoreContainerClipping
    });
    const scrollable = env.closestScrollable;
    if (scrollable) {
      scrollable.setAttribute(scrollContainer.contextId, appContext.contextId);
      scrollable.addEventListener('scroll', onClosestScroll, getListenerOptions(dragging.scrollOptions));
      if (true) {
        checkForNestedScrollContainers(scrollable);
      }
    }
    return dimension;
  }, [appContext.contextId, descriptor, onClosestScroll, previousRef]);
  const getScrollWhileDragging = useCallback(() => {
    const dragging = whileDraggingRef.current;
    const closest = getClosestScrollableFromDrag(dragging);
    !(dragging && closest) ?  true ? invariant(false, 'Can only recollect Droppable client for Droppables that have a scroll container') : 0 : void 0;
    return getScroll(closest);
  }, []);
  const dragStopped = useCallback(() => {
    const dragging = whileDraggingRef.current;
    !dragging ?  true ? invariant(false, 'Cannot stop drag when no active drag') : 0 : void 0;
    const closest = getClosestScrollableFromDrag(dragging);
    whileDraggingRef.current = null;
    if (!closest) {
      return;
    }
    scheduleScrollUpdate.cancel();
    closest.removeAttribute(scrollContainer.contextId);
    closest.removeEventListener('scroll', onClosestScroll, getListenerOptions(dragging.scrollOptions));
  }, [onClosestScroll, scheduleScrollUpdate]);
  const scroll = useCallback(change => {
    const dragging = whileDraggingRef.current;
    !dragging ?  true ? invariant(false, 'Cannot scroll when there is no drag') : 0 : void 0;
    const closest = getClosestScrollableFromDrag(dragging);
    !closest ?  true ? invariant(false, 'Cannot scroll a droppable with no closest scrollable') : 0 : void 0;
    closest.scrollTop += change.y;
    closest.scrollLeft += change.x;
  }, []);
  const callbacks = useMemo(() => {
    return {
      getDimensionAndWatchScroll,
      getScrollWhileDragging,
      dragStopped,
      scroll
    };
  }, [dragStopped, getDimensionAndWatchScroll, getScrollWhileDragging, scroll]);
  const entry = useMemo(() => ({
    uniqueId,
    descriptor,
    callbacks
  }), [callbacks, descriptor, uniqueId]);
  useIsomorphicLayoutEffect(() => {
    publishedDescriptorRef.current = entry.descriptor;
    registry.droppable.register(entry);
    return () => {
      if (whileDraggingRef.current) {
         true ? warning('Unsupported: changing the droppableId or type of a Droppable during a drag') : 0;
        dragStopped();
      }
      registry.droppable.unregister(entry);
    };
  }, [callbacks, descriptor, dragStopped, entry, marshal, registry.droppable]);
  useIsomorphicLayoutEffect(() => {
    if (!whileDraggingRef.current) {
      return;
    }
    marshal.updateDroppableIsEnabled(publishedDescriptorRef.current.id, !args.isDropDisabled);
  }, [args.isDropDisabled, marshal]);
  useIsomorphicLayoutEffect(() => {
    if (!whileDraggingRef.current) {
      return;
    }
    marshal.updateDroppableIsCombineEnabled(publishedDescriptorRef.current.id, args.isCombineEnabled);
  }, [args.isCombineEnabled, marshal]);
}

function noop() {}
const empty = {
  width: 0,
  height: 0,
  margin: noSpacing
};
const getSize = ({
  isAnimatingOpenOnMount,
  placeholder,
  animate
}) => {
  if (isAnimatingOpenOnMount) {
    return empty;
  }
  if (animate === 'close') {
    return empty;
  }
  return {
    height: placeholder.client.borderBox.height,
    width: placeholder.client.borderBox.width,
    margin: placeholder.client.margin
  };
};
const getStyle = ({
  isAnimatingOpenOnMount,
  placeholder,
  animate
}) => {
  const size = getSize({
    isAnimatingOpenOnMount,
    placeholder,
    animate
  });
  return {
    display: placeholder.display,
    boxSizing: 'border-box',
    width: size.width,
    height: size.height,
    marginTop: size.margin.top,
    marginRight: size.margin.right,
    marginBottom: size.margin.bottom,
    marginLeft: size.margin.left,
    flexShrink: '0',
    flexGrow: '0',
    pointerEvents: 'none',
    transition: animate !== 'none' ? transitions.placeholder : null
  };
};
const Placeholder = props => {
  const animateOpenTimerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const tryClearAnimateOpenTimer = useCallback(() => {
    if (!animateOpenTimerRef.current) {
      return;
    }
    clearTimeout(animateOpenTimerRef.current);
    animateOpenTimerRef.current = null;
  }, []);
  const {
    animate,
    onTransitionEnd,
    onClose,
    contextId
  } = props;
  const [isAnimatingOpenOnMount, setIsAnimatingOpenOnMount] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(props.animate === 'open');
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isAnimatingOpenOnMount) {
      return noop;
    }
    if (animate !== 'open') {
      tryClearAnimateOpenTimer();
      setIsAnimatingOpenOnMount(false);
      return noop;
    }
    if (animateOpenTimerRef.current) {
      return noop;
    }
    animateOpenTimerRef.current = setTimeout(() => {
      animateOpenTimerRef.current = null;
      setIsAnimatingOpenOnMount(false);
    });
    return tryClearAnimateOpenTimer;
  }, [animate, isAnimatingOpenOnMount, tryClearAnimateOpenTimer]);
  const onSizeChangeEnd = useCallback(event => {
    if (event.propertyName !== 'height') {
      return;
    }
    onTransitionEnd();
    if (animate === 'close') {
      onClose();
    }
  }, [animate, onClose, onTransitionEnd]);
  const style = getStyle({
    isAnimatingOpenOnMount,
    animate: props.animate,
    placeholder: props.placeholder
  });
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(props.placeholder.tagName, {
    style,
    'data-rfd-placeholder-context-id': contextId,
    onTransitionEnd: onSizeChangeEnd,
    ref: props.innerRef
  });
};
var Placeholder$1 = react__WEBPACK_IMPORTED_MODULE_0___default().memo(Placeholder);

function isBoolean(value) {
  return typeof value === 'boolean';
}
function runChecks(args, checks) {
  checks.forEach(check => check(args));
}
const shared = [function required({
  props
}) {
  !props.droppableId ?  true ? invariant(false, 'A Droppable requires a droppableId prop') : 0 : void 0;
  !(typeof props.droppableId === 'string') ?  true ? invariant(false, `A Droppable requires a [string] droppableId. Provided: [${typeof props.droppableId}]`) : 0 : void 0;
}, function boolean({
  props
}) {
  !isBoolean(props.isDropDisabled) ?  true ? invariant(false, 'isDropDisabled must be a boolean') : 0 : void 0;
  !isBoolean(props.isCombineEnabled) ?  true ? invariant(false, 'isCombineEnabled must be a boolean') : 0 : void 0;
  !isBoolean(props.ignoreContainerClipping) ?  true ? invariant(false, 'ignoreContainerClipping must be a boolean') : 0 : void 0;
}, function ref({
  getDroppableRef
}) {
  checkIsValidInnerRef(getDroppableRef());
}];
const standard = [function placeholder({
  props,
  getPlaceholderRef
}) {
  if (!props.placeholder) {
    return;
  }
  const ref = getPlaceholderRef();
  if (ref) {
    return;
  }
   true ? warning(`
      Droppable setup issue [droppableId: "${props.droppableId}"]:
      DroppableProvided > placeholder could not be found.

      Please be sure to add the {provided.placeholder} React Node as a child of your Droppable.
      More information: https://github.com/hello-pangea/dnd/blob/main/docs/api/droppable.md
    `) : 0;
}];
const virtual = [function hasClone({
  props
}) {
  !props.renderClone ?  true ? invariant(false, 'Must provide a clone render function (renderClone) for virtual lists') : 0 : void 0;
}, function hasNoPlaceholder({
  getPlaceholderRef
}) {
  !!getPlaceholderRef() ?  true ? invariant(false, 'Expected virtual list to not have a placeholder') : 0 : void 0;
}];
function useValidation(args) {
  useDevSetupWarning(() => {
    runChecks(args, shared);
    if (args.props.mode === 'standard') {
      runChecks(args, standard);
    }
    if (args.props.mode === 'virtual') {
      runChecks(args, virtual);
    }
  });
}

class AnimateInOut extends (react__WEBPACK_IMPORTED_MODULE_0___default().PureComponent) {
  constructor(...args) {
    super(...args);
    this.state = {
      isVisible: Boolean(this.props.on),
      data: this.props.on,
      animate: this.props.shouldAnimate && this.props.on ? 'open' : 'none'
    };
    this.onClose = () => {
      if (this.state.animate !== 'close') {
        return;
      }
      this.setState({
        isVisible: false
      });
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (!props.shouldAnimate) {
      return {
        isVisible: Boolean(props.on),
        data: props.on,
        animate: 'none'
      };
    }
    if (props.on) {
      return {
        isVisible: true,
        data: props.on,
        animate: 'open'
      };
    }
    if (state.isVisible) {
      return {
        isVisible: true,
        data: state.data,
        animate: 'close'
      };
    }
    return {
      isVisible: false,
      animate: 'close',
      data: null
    };
  }
  render() {
    if (!this.state.isVisible) {
      return null;
    }
    const provided = {
      onClose: this.onClose,
      data: this.state.data,
      animate: this.state.animate
    };
    return this.props.children(provided);
  }
}

const Droppable = props => {
  const appContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(AppContext);
  !appContext ?  true ? invariant(false, 'Could not find app context') : 0 : void 0;
  const {
    contextId,
    isMovementAllowed
  } = appContext;
  const droppableRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const placeholderRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    children,
    droppableId,
    type,
    mode,
    direction,
    ignoreContainerClipping,
    isDropDisabled,
    isCombineEnabled,
    snapshot,
    useClone,
    updateViewportMaxScroll,
    getContainerForClone
  } = props;
  const getDroppableRef = useCallback(() => droppableRef.current, []);
  const setDroppableRef = useCallback((value = null) => {
    droppableRef.current = value;
  }, []);
  const getPlaceholderRef = useCallback(() => placeholderRef.current, []);
  const setPlaceholderRef = useCallback((value = null) => {
    placeholderRef.current = value;
  }, []);
  useValidation({
    props,
    getDroppableRef,
    getPlaceholderRef
  });
  const onPlaceholderTransitionEnd = useCallback(() => {
    if (isMovementAllowed()) {
      updateViewportMaxScroll({
        maxScroll: getMaxWindowScroll()
      });
    }
  }, [isMovementAllowed, updateViewportMaxScroll]);
  useDroppablePublisher({
    droppableId,
    type,
    mode,
    direction,
    isDropDisabled,
    isCombineEnabled,
    ignoreContainerClipping,
    getDroppableRef
  });
  const placeholder = useMemo(() => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(AnimateInOut, {
    on: props.placeholder,
    shouldAnimate: props.shouldAnimatePlaceholder
  }, ({
    onClose,
    data,
    animate
  }) => react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Placeholder$1, {
    placeholder: data,
    onClose: onClose,
    innerRef: setPlaceholderRef,
    animate: animate,
    contextId: contextId,
    onTransitionEnd: onPlaceholderTransitionEnd
  })), [contextId, onPlaceholderTransitionEnd, props.placeholder, props.shouldAnimatePlaceholder, setPlaceholderRef]);
  const provided = useMemo(() => ({
    innerRef: setDroppableRef,
    placeholder,
    droppableProps: {
      'data-rfd-droppable-id': droppableId,
      'data-rfd-droppable-context-id': contextId
    }
  }), [contextId, droppableId, placeholder, setDroppableRef]);
  const isUsingCloneFor = useClone ? useClone.dragging.draggableId : null;
  const droppableContext = useMemo(() => ({
    droppableId,
    type,
    isUsingCloneFor
  }), [droppableId, isUsingCloneFor, type]);
  function getClone() {
    if (!useClone) {
      return null;
    }
    const {
      dragging,
      render
    } = useClone;
    const node = react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PrivateDraggable, {
      draggableId: dragging.draggableId,
      index: dragging.source.index,
      isClone: true,
      isEnabled: true,
      shouldRespectForcePress: false,
      canDragInteractiveElements: true
    }, (draggableProvided, draggableSnapshot) => render(draggableProvided, draggableSnapshot, dragging));
    return react_dom__WEBPACK_IMPORTED_MODULE_1___default().createPortal(node, getContainerForClone());
  }
  return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(DroppableContext.Provider, {
    value: droppableContext
  }, children(provided, snapshot), getClone());
};

function getBody() {
  !document.body ?  true ? invariant(false, 'document.body is not ready') : 0 : void 0;
  return document.body;
}
const defaultProps = {
  mode: 'standard',
  type: 'DEFAULT',
  direction: 'vertical',
  isDropDisabled: false,
  isCombineEnabled: false,
  ignoreContainerClipping: false,
  renderClone: null,
  getContainerForClone: getBody
};
const attachDefaultPropsToOwnProps = ownProps => {
  let mergedProps = {
    ...ownProps
  };
  let defaultPropKey;
  for (defaultPropKey in defaultProps) {
    if (ownProps[defaultPropKey] === undefined) {
      mergedProps = {
        ...mergedProps,
        [defaultPropKey]: defaultProps[defaultPropKey]
      };
    }
  }
  return mergedProps;
};
const isMatchingType = (type, critical) => type === critical.droppable.type;
const getDraggable = (critical, dimensions) => dimensions.draggables[critical.draggable.id];
const makeMapStateToProps = () => {
  const idleWithAnimation = {
    placeholder: null,
    shouldAnimatePlaceholder: true,
    snapshot: {
      isDraggingOver: false,
      draggingOverWith: null,
      draggingFromThisWith: null,
      isUsingPlaceholder: false
    },
    useClone: null
  };
  const idleWithoutAnimation = {
    ...idleWithAnimation,
    shouldAnimatePlaceholder: false
  };
  const getDraggableRubric = memoizeOne(descriptor => ({
    draggableId: descriptor.id,
    type: descriptor.type,
    source: {
      index: descriptor.index,
      droppableId: descriptor.droppableId
    }
  }));
  const getMapProps = memoizeOne((id, isEnabled, isDraggingOverForConsumer, isDraggingOverForImpact, dragging, renderClone) => {
    const draggableId = dragging.descriptor.id;
    const isHome = dragging.descriptor.droppableId === id;
    if (isHome) {
      const useClone = renderClone ? {
        render: renderClone,
        dragging: getDraggableRubric(dragging.descriptor)
      } : null;
      const snapshot = {
        isDraggingOver: isDraggingOverForConsumer,
        draggingOverWith: isDraggingOverForConsumer ? draggableId : null,
        draggingFromThisWith: draggableId,
        isUsingPlaceholder: true
      };
      return {
        placeholder: dragging.placeholder,
        shouldAnimatePlaceholder: false,
        snapshot,
        useClone
      };
    }
    if (!isEnabled) {
      return idleWithoutAnimation;
    }
    if (!isDraggingOverForImpact) {
      return idleWithAnimation;
    }
    const snapshot = {
      isDraggingOver: isDraggingOverForConsumer,
      draggingOverWith: draggableId,
      draggingFromThisWith: null,
      isUsingPlaceholder: true
    };
    return {
      placeholder: dragging.placeholder,
      shouldAnimatePlaceholder: true,
      snapshot,
      useClone: null
    };
  });
  const selector = (state, ownProps) => {
    const ownPropsWithDefaultProps = attachDefaultPropsToOwnProps(ownProps);
    const id = ownPropsWithDefaultProps.droppableId;
    const type = ownPropsWithDefaultProps.type;
    const isEnabled = !ownPropsWithDefaultProps.isDropDisabled;
    const renderClone = ownPropsWithDefaultProps.renderClone;
    if (isDragging(state)) {
      const critical = state.critical;
      if (!isMatchingType(type, critical)) {
        return idleWithoutAnimation;
      }
      const dragging = getDraggable(critical, state.dimensions);
      const isDraggingOver = whatIsDraggedOver(state.impact) === id;
      return getMapProps(id, isEnabled, isDraggingOver, isDraggingOver, dragging, renderClone);
    }
    if (state.phase === 'DROP_ANIMATING') {
      const completed = state.completed;
      if (!isMatchingType(type, completed.critical)) {
        return idleWithoutAnimation;
      }
      const dragging = getDraggable(completed.critical, state.dimensions);
      return getMapProps(id, isEnabled, whatIsDraggedOverFromResult(completed.result) === id, whatIsDraggedOver(completed.impact) === id, dragging, renderClone);
    }
    if (state.phase === 'IDLE' && state.completed && !state.shouldFlush) {
      const completed = state.completed;
      if (!isMatchingType(type, completed.critical)) {
        return idleWithoutAnimation;
      }
      const wasOver = whatIsDraggedOver(completed.impact) === id;
      const wasCombining = Boolean(completed.impact.at && completed.impact.at.type === 'COMBINE');
      const isHome = completed.critical.droppable.id === id;
      if (wasOver) {
        return wasCombining ? idleWithAnimation : idleWithoutAnimation;
      }
      if (isHome) {
        return idleWithAnimation;
      }
      return idleWithoutAnimation;
    }
    return idleWithoutAnimation;
  };
  return selector;
};
const mapDispatchToProps = {
  updateViewportMaxScroll: updateViewportMaxScroll
};
const ConnectedDroppable = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.connect)(makeMapStateToProps, mapDispatchToProps, (stateProps, dispatchProps, ownProps) => {
  return {
    ...attachDefaultPropsToOwnProps(ownProps),
    ...stateProps,
    ...dispatchProps
  };
}, {
  context: StoreContext,
  areStatePropsEqual: isStrictEqual
})(Droppable);




/***/ },

/***/ "./src/map/mapImage.svg"
/*!******************************!*\
  !*** ./src/map/mapImage.svg ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgMapImage),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _mask, _g, _mask2, _g2, _mask3, _g3, _mask4, _g4, _mask5, _g5, _mask6, _g6, _mask7, _g7, _mask8, _g8, _mask9, _g9, _mask0, _g0, _mask1, _g1, _mask10, _g10, _mask11, _g11, _mask12, _g12, _mask13, _g13, _mask14, _g14, _mask15, _g15, _mask16, _g16, _mask17, _g17, _mask18, _g18, _mask19, _g19, _mask20, _g20, _mask21, _g21, _mask22, _g22, _mask23, _g23, _mask24, _g24, _mask25, _g25, _mask26, _g26, _mask27, _g27, _mask28, _g28, _mask29, _g29, _mask30, _g30, _mask31, _g31, _mask32, _g32, _mask33, _g33, _mask34, _g34, _mask35, _g35, _mask36, _g36, _mask37, _g37, _mask38, _g38, _mask39, _g39, _mask40, _g40, _mask41, _g41, _mask42, _g42, _mask43, _g43, _mask44, _g44, _mask45, _g45, _mask46, _g46, _mask47, _g47, _mask48, _g48, _mask49, _g49, _mask50, _g50, _mask51, _g51, _mask52, _g52, _mask53, _g53, _mask54, _g54, _mask55, _g55, _mask56, _g56, _mask57, _g57, _mask58, _g58, _mask59, _g59, _mask60, _g60, _mask61, _g61, _mask62, _g62, _mask63, _g63;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgMapImage = function SvgMapImage(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 957,
    height: 936,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M0 1h957v935H0z"
  })), _mask || (_mask = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__a",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__a)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#eedecd",
    fillRule: "evenodd",
    d: "m398 427-4 15 9 4 4-17zM78 143 182 17l18 7-9 16v5l-18 40-22 14-17-6-5 22-18 6 4 4 14 3 4 4v5l-9 1-1 3-22-6-6 12H80zM1 0h180l-8 14L66 142l-17-3-2 10-23-4-23-9zm232 0h35l-20 38-13-6-8-20zm103 0h621v310l-187-45-25-15-1-10-13-6-4 11-5-2 6-17-4-3-22-8v-11l-26-8-9 30-167-77-14-12-39-9-7 2h-8l-4 5-97-33-2-5 2-11-9-19 8-4 6 3 31 6 8-3 2-8zm621 338v149l-18-4-5-12s12-23 11-38c-2-14-5-16-5-16l-12 6-123-32-2 5-14-6-20-18-21-11 5-13 56 12 22-64zm0 289v76l-5-2 2-9-29-14-23 32-42-27 10-21-14-8 9-26-28-29 2-10 70 15 5 14zM723 935h-4l37-65 3 2zm-109 0h-2l-93-50 3-6 91 50zM1 353v-40l8 7 7 20-7 16zm0-103v-84l37 6 27 11-15 44-23 29-9-5-11 2zm436 174-4 26 46 12 4-17-29-7 2-9zm-85-52-3 11 9 2 5-9zm-19 5-5 7 2 4 7 3 4-4c2 0 5-9 5-9l-4-3-3 3-5-1zm-59 1 16-6 8-14 6-3 1 4-4 4 7 5-14 11zm505 411-5 8-1 14-6 9 9-1 5-18 1-11zm105 4 37 21s-7 10-12 11c-4 0-27-14-27-14s-4-8 2-18m-603-99-3 8 1 5 6-11zm10-41v4l11 2 1-5zm-99 28-2 13 19 14-2 5 6 4 4-5 9 1 2-2-2-8-8-12zm26 212-1 19 124 13 2-34-5-20s-105 22-119 22zm283-204 1 10h11v-8h9v7h10l-1-10zm-165-12-3 9 6 5-3 2 3 6 11-6 15-20-3-3zm13-111 8 1-1 42-6 6-3 8h-13l-4-1 7-19 5-24zm-76 47 24 9 6-2-1-7-12-10-10-1-6 6zm-117-49 8 6-4 20 10 2 5 4 14-7 13 5 1-3-11-6 1-4 11 3v-2l-1-3 4-10-25-13v-3h-4l-1 21-3-2 1-7-5-12-11-1zm-65-5 8-8 2-12 4-2 11 7 33 17 4-2 2-8-19-10-7 4-21-11-16-2-15 15-2 6 22 17h5l22 10 2-2-22-12-7-2zm19-50 17-21 25 20-12 27-11-2-8-11zm-79 3 5-7 13 3-1 17h-6zm23-31 32-35c-1 1 14 15 14 15l-6 10 9 6 10-4 5 5-11 27-9 11-12-8 4-10-14-9-17 2zm668-147 15 6 6-29-14-3zm-55-76-2 9 12 4 3-10zm-53 24-1 6 15 5 2-7zm-65-20-8 30 48 13 7-32z"
  }))), _mask2 || (_mask2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__b",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g2 || (_g2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__b)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M957 606v3l-68-13-12-8h-8l-35-10v-1l1-2 34 10h8l1 1 12 7 24 5z"
  }))), _mask3 || (_mask3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__c",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g3 || (_g3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__c)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "M957 606v3l-68-13-12-8h-8l-35-10v-1l1-2 34 10h8l1 1 12 7 24 5z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m957 609-68-13-12-8h-8l-35-10v-1l1-2 34 10h8l1 1 12 7 24 5 43 8z"
  }))), _mask4 || (_mask4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__d",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g4 || (_g4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__d)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m1 518 29-28c18-20 25-36 30-44 6-7 109-227 109-227L271 0h11l-94 202-74 155-36 77s-10 22-22 39c-11 16-26 32-33 38L1 531z"
  }))), _mask5 || (_mask5 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__e",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g5 || (_g5 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__e)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m1 518 29-28c18-20 25-36 30-44 6-7 109-227 109-227L271 0h11l-94 202-74 155-36 77s-10 22-22 39c-11 16-26 32-33 38L1 531z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "M30 490c18-20 25-36 30-44 6-7 109-227 109-227L271 0h11l-94 202-74 155-36 77s-10 22-22 39c-11 16-26 32-33 38L1 531v-13z"
  }))), _mask6 || (_mask6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__f",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g6 || (_g6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__f)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M0 159s16 5 35 7l23 2 41 6 32 10 35 18c1 0 8-1 13-5l-3 6-6 2 4 2-1 3-2-1 1 4-3 6h-1c2-6-3-13-4-14a365 365 0 0 0-49-24l-17-4q-21-4-41-5l-22-3c-19-2-35-7-35-7z"
  }))), _mask7 || (_mask7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__g",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g7 || (_g7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__g)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "M0 159s16 5 35 7l23 2 41 6 32 10 35 18c1 0 8-1 13-5l-3 6-6 2 4 2-1 3-2-1 1 4-3 6h-1c2-6-3-13-4-14a365 365 0 0 0-49-24l-17-4q-21-4-41-5l-22-3c-19-2-35-7-35-7z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m35 166 23 2 41 6 32 10 35 18c1 0 8-1 13-5l-3 6-6 2 4 2-1 3-2-1 1 4-3 6h-1c2-6-3-13-4-14a365 365 0 0 0-49-24l-17-4q-21-4-41-5l-22-3c-19-2-35-7-35-7v-3s16 5 35 7Z"
  }))), _mask8 || (_mask8 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__h",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g8 || (_g8 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__h)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m184 212 2 1-1-4 2-5 3 11 154 84 388 96q3 1 3 5l-37 143v2Q598 742 491 935h-10l49-86 99-186 61-122 36-139-384-95h-1l-155-85-9 4 2-4 4-2-3-1z"
  }))), _mask9 || (_mask9 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__i",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g9 || (_g9 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__i)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m184 212 2 1-1-4 2-5 3 11 154 84 388 96q3 1 3 5l-37 143v2Q598 742 491 935h-10l49-86 99-186 61-122 36-139-384-95h-1l-155-85-9 4 2-4 4-2-3-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m186 213-1-4 2-5 3 11 154 84 388 96q3 1 3 5l-37 143v2Q598 742 491 935h-10l49-86 99-186 61-122 36-139-384-95h-1l-155-85-9 4 2-4 4-2-3-1 4-7z"
  }))), _mask0 || (_mask0 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__j",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g0 || (_g0 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__j)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m636 665 3 2 8-14 1-1 83 11 226 119v3L730 666l-81-11-9 15h-2l-3-2z"
  }))), _mask1 || (_mask1 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__k",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g1 || (_g1 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__k)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m636 665 3 2 8-14 1-1 83 11 226 119v3L730 666l-81-11-9 15h-2l-3-2z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m639 667 8-14 1-1 83 11 226 119v3L730 666l-81-11-9 15h-2l-3-2 1-3z"
  }))), _mask10 || (_mask10 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__l",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g10 || (_g10 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__l)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m699 540 131 33 26-53 62-85v-1l36-39 3-1v6l-35 38-62 85-53 109v1l-16 158-7 29v12l4 7 169 92v4h-9l-164-89q-11-4-17 5l-49 84h-9l50-87q6-11-4-18l-161-85 4-7 161 85q12 6 17-6 5-11 6-23l17-165h1l3-54q-1-3-7-4l-99-25 1-1v-2zM587 742l-24-13c-3-1-19-4-36-5-18-2-54 3-59 4-4 2-31 13-43 20q-13 8-30 27l-16 16c-18 17-53 27-53 27s-133 29-177 29q-31-2-51 7-19 7-27 29c-10 29 23 52 23 52h1-13c-11-9-27-30-19-55q9-25 32-34 21-9 55-8c41 1 168-27 174-28 0 0 33-9 49-25l16-16q17-19 32-28c14-8 44-21 44-21h1a298 298 0 0 1 100 1h1l24 13zm242-166-7-2-4 1q-4 1-7 4-4 4-3 7l-4 41zm-55 249 5 2v-5zm8 14-2 3h4zm-13 5-4-2-1 5zm-7-12 3-4h-4v1h-1zm16-2a8 8 0 0 0-14 5q0 3 3 5a8 8 0 0 0 11 0l2-5-1-2v-2zm-26-273 45 11q8 2 9 6l1 5 2-2 6-5z"
  }))), _mask11 || (_mask11 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__m",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g11 || (_g11 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__m)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m699 540 131 33 26-53 62-85v-1l36-39 3-1v6l-35 38-62 85-53 109v1l-16 158-7 29v12l4 7 169 92v4h-9l-164-89q-11-4-17 5l-49 84h-9l50-87q6-11-4-18l-161-85 4-7 161 85q12 6 17-6 5-11 6-23l17-165h1l3-54q-1-3-7-4l-99-25 1-1v-2zM587 742l-24-13c-3-1-19-4-36-5-18-2-54 3-59 4-4 2-31 13-43 20q-13 8-30 27l-16 16c-18 17-53 27-53 27s-133 29-177 29q-31-2-51 7-19 7-27 29c-10 29 23 52 23 52h1-13c-11-9-27-30-19-55q9-25 32-34 21-9 55-8c41 1 168-27 174-28 0 0 33-9 49-25l16-16q17-19 32-28c14-8 44-21 44-21h1a298 298 0 0 1 100 1h1l24 13zm242-166-7-2-4 1q-4 1-7 4-4 4-3 7l-4 41zm-55 249 5 2v-5zm8 14-2 3h4zm-13 5-4-2-1 5zm-7-12 3-4h-4v1h-1zm16-2a8 8 0 0 0-14 5q0 3 3 5a8 8 0 0 0 11 0l2-5-1-2v-2zm-26-273 45 11q8 2 9 6l1 5 2-2 6-5z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m830 573 26-53 62-85v-1l36-39 3-1v6l-35 38-62 85-53 109v1l-16 158-7 29v12l4 7 169 92v4h-9l-164-89q-11-4-17 5l-49 84h-9l50-87q6-11-4-18l-161-85 4-7 161 85q12 6 17-6 5-11 6-23l17-165h1l3-54q-1-3-7-4l-99-25 1-1v-2l1-3zM563 729c-3-1-19-4-36-5-18-2-54 3-59 4-4 2-31 13-43 20q-13 8-30 27l-16 16c-18 17-53 27-53 27s-133 29-177 29q-31-2-51 7-19 7-27 29c-10 29 23 52 23 52h1-13c-11-9-27-30-19-55q9-25 32-34 21-9 55-8c41 1 168-27 174-28 0 0 33-9 49-25l16-16q17-19 32-28c14-8 44-21 44-21h1a298 298 0 0 1 100 1h1l24 13-4 8zm259-155-4 1q-4 1-7 4-4 4-3 7l-4 41 25-51zm-43 253v-5l-5 3zm1 15h4l-2-3zm-15 0-1 5 5-3zm0-14h-4v1h-1l2 3zm7-1q-3 0-5 3a7 7 0 0 0 0 10 8 8 0 0 0 11 0l2-5-1-2v-2a8 8 0 0 0-7-4Zm25-259q8 2 9 6l1 5 2-2 6-5-63-15z"
  }))), _mask12 || (_mask12 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__n",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g12 || (_g12 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__n)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m464 155-43 163-3-1 3-12-3-1-3 12v1l-3-1 42-164 4 1-39 150h2l40-149zM361 537l-21 44c-2 5-3 19-3 19v1l-9 19v5h-4l1-6 8-19 4-20 21-45v-4h-2l19-66 1-13 34-128 3 1-33 127-1 13 4-11 33-129 3 1c-12 48-22 98-39 144l-15 59 278-4 48 13-1 3-2 4-46-11zm0-8 10-38z"
  }))), _mask13 || (_mask13 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__o",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g13 || (_g13 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__o)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m464 155-43 163-3-1 3-12-3-1-3 12v1l-3-1 42-164 4 1-39 150h2l40-149zM361 537l-21 44c-2 5-3 19-3 19v1l-9 19v5h-4l1-6 8-19 4-20 21-45v-4h-2l19-66 1-13 34-128 3 1-33 127-1 13 4-11 33-129 3 1c-12 48-22 98-39 144l-15 59 278-4 48 13-1 3-2 4-46-11zm0-8 10-38z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m421 318-3-1 3-12-3-1-3 12v1l-3-1 42-164 4 1-39 150h2l40-149 3 1zm-81 263c-2 5-3 19-3 19v1l-9 19v5h-4l1-6 8-19 4-20 21-45v-4h-2l19-66 1-13 34-128 3 1-33 127-1 13 4-11 33-129 3 1c-12 48-22 98-39 144l-15 59 278-4 48 13-1 3-2 4-46-11-281 3zm21-52 10-38z"
  }))), _mask14 || (_mask14 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__p",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g14 || (_g14 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__p)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M201 221c3-9 15-57 23-68l33-42s12-14 32-12c19 1 50 12 51 12l39 20q72 17 142 37l153 69 39 18c1 0 5 3 4 9l-31 120-3-1 31-120q-1-6-2-5l-39-18-153-69-54-16-88-21-40-20c-2-1-31-10-49-12-18-1-29 10-29 11l-33 43c-8 10-21 60-23 67z"
  }))), _mask15 || (_mask15 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__q",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g15 || (_g15 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__q)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "M201 221c3-9 15-57 23-68l33-42s12-14 32-12c19 1 50 12 51 12l39 20q72 17 142 37l153 69 39 18c1 0 5 3 4 9l-31 120-3-1 31-120q-1-6-2-5l-39-18-153-69-54-16-88-21-40-20c-2-1-31-10-49-12-18-1-29 10-29 11l-33 43c-8 10-21 60-23 67z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m224 153 33-42s12-14 32-12c19 1 50 12 51 12l39 20q72 17 142 37l153 69 39 18c1 0 5 3 4 9l-31 120-3-1 31-120q-1-6-2-5l-39-18-153-69-54-16-88-21-40-20c-2-1-31-10-49-12-18-1-29 10-29 11l-33 43c-8 10-21 60-23 67l-3-2c3-9 15-57 23-68Z"
  }))), _mask16 || (_mask16 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__r",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g16 || (_g16 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__r)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m793 0-7 19-2 28v1l-68 210-1-1 67-210 2-28v-1l7-18z"
  }))), _mask17 || (_mask17 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__s",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g17 || (_g17 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__s)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m793 0-7 19-2 28v1l-68 210-1-1 67-210 2-28v-1l7-18z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m786 19-2 28v1l-68 210-1-1 67-210 2-28v-1l7-18h2z"
  }))), _mask18 || (_mask18 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__t",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g18 || (_g18 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__t)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M734 392v5l-2-2v-2l-1 2-2-1 3-3 30-109-8-12-37-11-1-1 1-1 38 12 8 11 2-8 23 6v1l-22-5-2 8z"
  }))), _mask19 || (_mask19 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__u",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g19 || (_g19 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__u)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "M734 392v5l-2-2v-2l-1 2-2-1 3-3 30-109-8-12-37-11-1-1 1-1 38 12 8 11 2-8 23 6v1l-22-5-2 8z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m734 397-2-2v-2l-1 2-2-1 3-3 30-109-8-12-37-11-1-1 1-1 38 12 8 11 2-8 23 6v1l-22-5-2 8-30 110z"
  }))), _mask20 || (_mask20 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__v",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g20 || (_g20 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__v)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m726 434 125 30q1-3 13-7l2-1q11-3 21-10l6-5 16-11 2-1 1-1h1l14-5v1l-1 2-12 4h-1l5 4-1 1-6-4-17 11-6 5q-10 7-21 10l-2 1q-11 4-12 7l16 4v1l-143-35z"
  }))), _mask21 || (_mask21 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__w",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g21 || (_g21 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__w)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m726 434 125 30q1-3 13-7l2-1q11-3 21-10l6-5 16-11 2-1 1-1h1l14-5v1l-1 2-12 4h-1l5 4-1 1-6-4-17 11-6 5q-10 7-21 10l-2 1q-11 4-12 7l16 4v1l-143-35z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "M851 464q1-3 13-7l2-1q11-3 21-10l6-5 16-11 2-1 1-1h1l14-5v1l-1 2-12 4h-1l5 4-1 1-6-4-17 11-6 5q-10 7-21 10l-2 1q-11 4-12 7l16 4v1l-143-35v-1z"
  }))), _mask22 || (_mask22 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__x",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g22 || (_g22 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__x)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m684 392-35 135-3-1 32-121-262-65v-3l125 31 3-11 2 1-3 11 136 33 3-11z"
  }))), _mask23 || (_mask23 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__y",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g23 || (_g23 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__y)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m684 392-35 135-3-1 32-121-262-65v-3l125 31 3-11 2 1-3 11 136 33 3-11z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m649 527-3-1 32-121-262-65v-3l125 31 3-11 2 1-3 11 136 33 3-11 2 1z"
  }))), _mask24 || (_mask24 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__z",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g24 || (_g24 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__z)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m401 401 176 43v2l-177-43z"
  }))), _mask25 || (_mask25 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__A",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g25 || (_g25 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__A)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m401 401 176 43v2l-177-43z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "M577 444v2l-177-43 1-2z"
  }))), _mask26 || (_mask26 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__B",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g26 || (_g26 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__B)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m283 319 45 26 11-39 2 1-12 41-48-27z"
  }))), _mask27 || (_mask27 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__C",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g27 || (_g27 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__C)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m283 319 45 26 11-39 2 1-12 41-48-27z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m328 345 11-39 2 1-12 41-48-27 2-2z"
  }))), _mask28 || (_mask28 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__D",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g28 || (_g28 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__D)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m381 434-1 2-30-8-23 3s-16-3-20-6c-5-3-13-28-14-33l-131-6c-2 0-36 3-45 18q-10 16-11 33-2 15 7 25c13 16 30 31 31 32q3 3 28 11l50 11 119 15h17v2l-17 1-119-15h-1l-49-12-29-11s-19-15-32-32q-10-12-8-27 3-18 11-34c10-17 47-20 47-20h1l132 6 1 1s9 30 13 33l19 5 23-3h1z"
  }))), _mask29 || (_mask29 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__E",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g29 || (_g29 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__E)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m381 434-1 2-30-8-23 3s-16-3-20-6c-5-3-13-28-14-33l-131-6c-2 0-36 3-45 18q-10 16-11 33-2 15 7 25c13 16 30 31 31 32q3 3 28 11l50 11 119 15h17v2l-17 1-119-15h-1l-49-12-29-11s-19-15-32-32q-10-12-8-27 3-18 11-34c10-17 47-20 47-20h1l132 6 1 1s9 30 13 33l19 5 23-3h1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m380 436-30-8-23 3s-16-3-20-6c-5-3-13-28-14-33l-131-6c-2 0-36 3-45 18q-10 16-11 33-2 15 7 25c13 16 30 31 31 32q3 3 28 11l50 11 119 15h17v2l-17 1-119-15h-1l-49-12-29-11s-19-15-32-32q-10-12-8-27 3-18 11-34c10-17 47-20 47-20h1l132 6 1 1s9 30 13 33l19 5 23-3h1l30 9z"
  }))), _mask30 || (_mask30 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__F",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g30 || (_g30 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__F)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m23 511 2 1v-3l4-4q-2 4-1 10l43 42 11 10 31 13 140 40 21 5q88-1 175 2c63-1 134-6 197 0v4h-2 1l-1 3-21-3q-176 3-353 1l-63-19-98-28-31-13c-21-17-36-34-55-53l-9 1-1-1 6-4zm417 119-36-2h-1l1 2zm-38-2H274l-22-5-40-11 59 17 131 1zM68 559l-5-4 3 2z"
  }))), _mask31 || (_mask31 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__G",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g31 || (_g31 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__G)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m23 511 2 1v-3l4-4q-2 4-1 10l43 42 11 10 31 13 140 40 21 5q88-1 175 2c63-1 134-6 197 0v4h-2 1l-1 3-21-3q-176 3-353 1l-63-19-98-28-31-13c-21-17-36-34-55-53l-9 1-1-1 6-4zm417 119-36-2h-1l1 2zm-38-2H274l-22-5-40-11 59 17 131 1zM68 559l-5-4 3 2z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "M25 512v-3l4-4q-2 4-1 10l43 42 11 10 31 13 140 40 21 5q88-1 175 2c63-1 134-6 197 0v4h-2 1l-1 3-21-3q-176 3-353 1l-63-19-98-28-31-13c-21-17-36-34-55-53l-9 1-1-1 6-4 4-4zm379 116h-1l1 2h36zm-130 0-22-5-40-11 59 17 131 1v-2zM63 555l3 2 2 2z"
  }))), _mask32 || (_mask32 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__H",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g32 || (_g32 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__H)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m13 507-4-4 1 7-2 2v-11l-7-8v-2l7 8 12 1-2 2-8-1 4 4z"
  }))), _mask33 || (_mask33 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__I",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g33 || (_g33 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__I)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m13 507-4-4 1 7-2 2v-11l-7-8v-2l7 8 12 1-2 2-8-1 4 4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "m9 503 1 7-2 2v-11l-7-8v-2l7 8 12 1-2 2-8-1 4 4-1 2z"
  }))), _mask34 || (_mask34 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__J",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g34 || (_g34 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__J)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m253 643 11-13v1l2 1-11 12 10 4-1 3-11-6-110-28-14 54-1 1s-7 14-30 22a1181 1181 0 0 1-12 128v28l-2 2a282 282 0 0 1 7-93c1-1 5-62 4-66-1-3-8-4-8-4l-5-10-2-33c0-8-4-18-4-18l10-26-86-16v-3l87 17 8-21 2 1-8 21 82 21 7-8 13-5h2l1 1-16 6-4 6zm312-108q2 45 1 89h-2l-1-89zm1 97-1 13 33 1 28 12 4 3-1 2-4-2-27-12-35-2 1-15zm-426-16-52-13-10 25q3 5 4 18l2 32 4 9q5 0 9 5c21-7 28-20 29-21z"
  }))), _mask35 || (_mask35 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__K",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g35 || (_g35 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__K)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m253 643 11-13v1l2 1-11 12 10 4-1 3-11-6-110-28-14 54-1 1s-7 14-30 22a1181 1181 0 0 1-12 128v28l-2 2a282 282 0 0 1 7-93c1-1 5-62 4-66-1-3-8-4-8-4l-5-10-2-33c0-8-4-18-4-18l10-26-86-16v-3l87 17 8-21 2 1-8 21 82 21 7-8 13-5h2l1 1-16 6-4 6zm312-108q2 45 1 89h-2l-1-89zm1 97-1 13 33 1 28 12 4 3-1 2-4-2-27-12-35-2 1-15zm-426-16-52-13-10 25q3 5 4 18l2 32 4 9q5 0 9 5c21-7 28-20 29-21z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "M264 630v1l2 1-11 12 10 4-1 3-11-6-110-28-14 54-1 1s-7 14-30 22a1181 1181 0 0 1-12 128v28l-2 2a282 282 0 0 1 7-93c1-1 5-62 4-66-1-3-8-4-8-4l-5-10-2-33c0-8-4-18-4-18l10-26-86-16v-3l87 17 8-21 2 1-8 21 82 21 7-8 13-5h2l1 1-16 6-4 6 79 21zm302-6h-2l-1-89h2q2 45 1 89Zm-1 21 33 1 28 12 4 3-1 2-4-2-27-12-35-2 1-15h2zM88 603l-10 25q3 5 4 18l2 32 4 9q5 0 9 5c21-7 28-20 29-21l14-55z"
  }))), _mask36 || (_mask36 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__L",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g36 || (_g36 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__L)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m280 819 1-43v-1l38-73 15-63 1-1 3-5h4l-4 7-16 63v1l-37 72-1 42z"
  }))), _mask37 || (_mask37 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__M",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g37 || (_g37 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__M)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "m280 819 1-43v-1l38-73 15-63 1-1 3-5h4l-4 7-16 63v1l-37 72-1 42z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#d8d9da",
    d: "M281 776v-1l38-73 15-63 1-1 3-5h4l-4 7-16 63v1l-37 72-1 42-4 1z"
  }))), _mask38 || (_mask38 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__N",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g38 || (_g38 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__N)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#b01616",
    d: "M725 351q-21-2-23-22 2-21 23-22c12 0 22 9 22 22 0 12-10 22-22 22"
  }))), _mask39 || (_mask39 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__O",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g39 || (_g39 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__O)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M720 341h9v-3h-9zm8-19h-1v-1h1zm0 2h-1v-1h1zm0 2h-1v-1zm0 2h-1v-1zm0 3h-1v-2h1zm0 2h-1v-1h1zm-4-17-6 3h-1v7h3v8h3v-11h-3v-2l4-2h3v15h2v-18z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#b01616",
    d: "M693 274h7v-3h-7v-4h8v-4h-13v18h13v-3h-8zm22-3-2 1h-3v-5h4l1 1h1zm2-6-2-1-2-1h-8v18h4v-5h4l2-1 2-1 2-2v-5zm15 12-1 1h-5v-4h6l1 1v2m-7-10h5l1 1v1l-1 1h-5zm10 6-2-1 1-1 1-1v-4l-1-2-2-1h-11v18h11l2-1 2-4zm18 8h5v-18h-5zm-6-5-1 1h-5v-6h4l1 1h1zm3-6-2-1h-7v-6h-4v18h11a6 6 0 0 0 3-9zm24-7-9 11v-11h-4v18h4l9-11v11h4v-18zm-98 4h4v14h4v-18h-5z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#b01616",
    d: "M668 263v18h4v-14h4l3-4zm107-6-9 2v2h9zm-29 33-2 4q0 3-3 3l-1-2 2-5 2-2h2zm-24-1-2 4-3 3q-3 0-2-2l1-3v-1l2-2 2-1 1-1 1 1zm57-1h-2l-2 5-4 4h-1v-2l3-7h-2l-2 5-1 1-3 2 3-8h2-2l1-4q1 0 0 0h-2v2l-1 2h-2 2l-3 6-2 2-1 1-1-1 4-8h-3l-2 2h-1l1-1v-1h-3l-2 2 1-2h-2l-1 2h-3l-1-2-2-1-2 1a8 8 0 0 0-5 6l-2 2-1 1-1-1 2-5 2-3h-3l-2 2h-1l1-1v-1h-3l-2 2 1-2h-2l-1 3-2-1q0-3-3-3t-4 3l2-4h-3 1l-3 5-2 6-2 5-1 1h-1v1h5v-1h-1v-1l2-5 1-1 2 1 3-1 4-5v-1l2 1-3 6h2l3-6v-1l3-2h1-1v2l1 1 1-1 2-1-1 2-1 3-1 1 1 2h1l2-1 2-1q0 2 3 2l4-1q3-2 3-5v-1l3 1-3 6h2l3-6v-1l3-2h1-1v2l1 1 1-1 2-1-1 2-1 3-1 1 1 2h1l2-1 2-2v1l1 2 2-1 2-2v3h2l4-2-1 3q-2 6-5 5h-1l1-2-1-1-2 1q0 3 3 3 5 0 7-7z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#b01616",
    d: "m738 286 1-1v-1h-2v2zm25 0 1-1v-1h-2v2z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "m522 281 3-2 1-1h1v-1l1-1-1-2h-2l-1 1h-1v-1l2-1h2l2 1v3l-1 1-1 1-3 2h5v1zm13 0v-2h-5v-1l5-6h1v6h1v1h-1v2zm-4-3h4v-5zm12 3v-7h1l2 4 3-4h1v7h-1v-6l-2 4h-1l-2-4zm9 0v-7h1v3h1l2-3h2l-3 4 3 3h-1l-3-3h-1v3zm7 3v-10h1v1l1-1h1l2 1 1 1 1 2-1 2-1 1h-3l-1-1v4zm3-4h2v-4l-2-1-1 1h-1v3zm5 1v-7h1v3h4v-3h1v7h-1v-3h-4v3zm9 0h-1v-1h1zm6 37v-7h1zh2v-6h1v6h3v-6h1v7zm9 0v-5h1v2h1l2-2h1l-2 2 2 3h-1l-2-2h-1v2zm8 0h-1l-1-1-1-1 1-2 1-1h2l1 1v3l-1 1zm0-1v-1h1l-1-1v-1h-2l-1 1v1l1 1zm3 1v-4h4v5h-1v-4h-2v3l-1 1zm8 0h-1l-1-1v-1l1-1h3v-1h-4 1v-1h3v1l1 1v3h-1v-1l-1 1zm0-1h1v-1h-3v1zm7 1v-7h1l3 6v-6h1v7h-1l-4-6zm6-3h3zm2-1h-1l-1-1v-1l1-1h1l1 1v1zm0-1h-1v1zm6 5v-1h-4v-1l4-5h1v5h1v1h-1zm-3-2h3v-4zm5 2 2-1 1-1h1v-3h-2v1h-1v-1l1-1h2l1 1v2l-1 1-1 1-1 1h3v1zm116 102v-1l3-3 1-1 1-1v-2l-2-1h-1l-1 1h-1l1-1 1-1h3l1 1v3l-1 1-1 1-2 2h4v2zm11 0-1-1-1-1v-1h1l1 1 1 1 1-1h1v-3h-5l1-5h5v1h-4l-1 3h4l1 1 1 2-1 1-1 1zm9 0v-7h1l3 3 2-3h2v7h-2v-6l-2 4-3-4v6zm9 0v-7h2v3h1l2-3h1l-2 3 2 4h-1l-2-3h-1v3zm7 2v-9h1l1 1 1-1 1-1 2 1 1 1v4l-1 1-2 1-1-1h-1v3zm4-3 1-1v-2l-1-1-1-1-2 2v3zm4 1v-7h2v3h3v-3h1v7h-1v-3h-3v3zm9 0v-1h1l1 1zM428 256v-7h5v1h-4v2h4v1l1 1-1 1v1zm1-1h4v-2h-4zm8 1h-1l-1-1v-3l1-1h3v1l1 2-1 1v1zm0-1h1l1-1v-1l-1-1h-2v3zm3 1v-4h4v5h-1v-4h-2v3l-1 1zm7 0v-5 2h3l1 1v1l-1 1zm0-1h2v-1h-3zm5 1v-5h1v2h2v-2h1v5h-1v-2h-2zm6 0v-5 4h1v-1l2-3h1v5h-1v-4 1zm10 2v-2h-4v-5 4h3v-4h1v4h1zm3-2-1-1v-1l1-1h3v-1h-3v-1h3l1 1v4h-1v-1l-1 1zm0-1h2v-1h-3zm7 1v-7h1l3 6v-6h1v7h-1l-3-6zm6-3h3zm2-1v-1h-1l1-1v-1h2v2zm0-1h-1zm5 5h-1v-1h3l1-1-1-1-1-1-1 1h-1v-4h4v1h-3v2h2l1 1 1 1-1 1-1 1zm-203-32v-7h1v6h3v-6h1v6h2v-6h1v7zm10 0v-5h1v2h1l1-2h1l-2 2 2 3h-1l-1-2h-1zm7 0h-1l-1-1v-3l1-1h3v1l1 1-1 2v1zm0-1h1l1-1v-2h-1l-1-1-1 1v3zm3 1v-4h4v5h-1v-4h-2v3l-1 1zm8 0h-1l-1-1v-1l1-1h3v-1h-1v-1l-1 1h-1v-1h3l1 1v4h-1v-1l-1 1zm0-1h2v-1h-3zm7 1v-7h1l4 6v-6 7h-1l-3-6zm6-3h3zm2-1v-1l-1-1h1v-1h2v2zm0-1h-2zm4 5v-6h-2 1v-1h2zm2 0 2-1 1-1v-1h1v-1l-1-1h-1l-1 1h-1l1-1v-1h3v1l1 1-1 1v1l-1 1-2 1h4v1zm11-14v-1l3-3 1-1 1-1v-2l-2-1h-1l-1 1h-1l1-1 1-1h3l1 1v3l-1 2-1 1-2 2h4v1zm11 0h-1l-1-1h-1v-2h1v1l1 1h2v-1h1v-2h-1v-1h-2v-1h2l1-1v-1l-1-1h-1l-2 1h-1l1-1 1-1h2l1 1h1v2l-1 2h1v3l-1 1-1 1zm9 0v-7h1l3 3 2-3h1v7h-1v-6l-2 4h-1l-2-4zm9 0v-7h1v3h2l2-3h1l-2 3 2 4h-1l-2-3h-2v3zm7 2v-9h1v1l1-1h3l1 1 1 2-1 2-1 1-1 1h-1l-1-1h-1v3zm4-3v-1l1-1-1-1v-1h-3v1l-1 1 1 1v1zm4 1v-7h1v3h4v-3h1v7h-1v-3h-4v3zm9 0v-1h1l1 1zm-64-49v-7h6v7h-1v-7h-4zm9 0-1-1v-2l1-1 2-1 1 1 1 1v2l-1 1zm0-1h1l1-1v-2l-1-1h-1l-1 1v2zm7 1v-2h-2l-1-1v-3h1v3h2v-3h1v6zm4 0v-5h-2v-1h4v1h-1zm5 0v-1l-1-1v-1h4v-1l-1-1h-2v1h-1l1-1 1-1 2 1v1l1 1v3h-1v-1h-1zm0-1v-1h1v-1h-2l-1 1zm7 1v-7h1l3 5v-5h1v7h-1l-4-6zm6-4h3v1zm2 0-1-1h-1v-2h3v2zm0-1v-1h-1v2zm5 5-1-1h-1l-1-1v-3l1-1 2-1h1l1 1h-1l-1-1-1 1-1 1v1h1v-1h2l1 1v3h-1zm0-1v-1l1-1h-1v-1h-2v1h-1l1 1zm6 1h-1v-5l2-1h2l1 1h-2l-1-1v1h-1v1h-1v1l2-1h2v1l1 1-1 2zm0-1h1l1-1v-1l-1-1h-1l-1 1v2zm6 1-2-1v-1h1v1h2l1-1v-2h-4v-3h5-4v3l1-1h2l1 1v3h-1zm5 0 2-7h-3 4zm6 0-1-1h-1v-1h1v1h3v-2h-1l-1-1h1v-1h1v-1l-1-1h-1l-1 1h-1v-1h4l1 1v1l-1 1 1 1v2h-1l-1 1zm4 0v-1l2-2h1l1-2-1-1-1-1v1h-2l1-1h3l1 2-1 1v1h-1l-2 2h4v1zm58-3 1 1 1-1v-6h1v5l3-4 1 1-3 3v1l-2 1h-2m5 0 1-1 1-1 1-3 4 1-2 5h-1l2-4-2-1-1 1v2l-1 1zm7 2h2zm4 1 2-6h2l1 4 3-3 1 1-2 6h-1l2-6-4 4-1-5-2 5zm8 5h1l-1-6h1l1 5 3-4-2 4h-1l-1 2zm5-1 3-1-1-3h1v2l2-1h1l-2 2 1 3h-1l-1-3zm7 3v-3h4v-1h-3v-1h2l1 1 1 1-1 1v3l-1-1h-2m0-1h2v-1h-2zm4 2 1-5h1v3h2l1-2h1l-2 5h-1l1-2-3-1zm7 3-1-1v-3l1-1 1-1 1 1h1l1 2v1l-1 1-1 1zm1-1 1-1v-2l-1-1h-1l-1 1v2zm3 2 2-5h2l1 1v2h-1l1 1v1h-1v1h-2zm1-1 1 1h1l1-1h-1v-1h-2zm1-2h1v-2h-2zm5 5v-1h-1v-1l1-1h2l1 1 1-1-1-1h-3l1-1h2l1 1v2l-1 3v-1h-2m0-1 1-1v-1h-3zm-315 23-1-1-6-1h6l-4-3 1-1 3 3v1l1 1 1 1zm1-5h-1zl-1-1h-1l-1-1h-1l2-3 5 2-1 1-4-2v2h1l1 1 1 1zm3-6v-2zm4-7h-2l-2 3-3-6 1-1 4 3v-1h1v1zm-4 2 2-3-4-2zm6-6h-2l-1-1h-2v-1l-1-1 1-2 1-1h2l2 1 1 1v3m-1-1-1-1-2-1h-2l-1 1v1l1 1 1 1h3zm4-5-1-1h-1v-1h-1l1-3 5 2v1l-4-2-1 1v1h2v1l1 1zm4-7h-3l-1-1v-3h1l1-1h1l1 1-2 3h2zh1v-1h-1l1-1v3m-4 0 2-3h-2zm6-4-4-2-1 1 2-4-1 2 5 2zm3-6-6-3 2-5 7 3-1 1-5-3-2 4zm5-8-1 1h-3l-1-1-1-1 1-2 1-1h1l1 1h1l1 2zm-1 0v-2l-1-1h-2l-1 1v1l1 1zm3-5h-1l-1-1-3-1v-3l1-1h1-1v4h1v-2l1-1h2l1 1 1 1zm0-1v-1l-1-1h-2v1l-1 1h1v1h1a1 1 0 0 0 2-1m3-4h-2l-2-1v-3l2-1h1l1 1-2 3h2zh1v-1h-1l1-1v3m-3 0 1-3h-2v2zm6-2-2-1v-1l-1-1h-1l-1-1h-1l2-4 4 3v-1l2 1v1l-1-1-2 3zm-2-2 2-3-4-1-1 1 1 1h1v1zm3-5-4-2v-1l2 1v-1h1v-1h2v1h1v1l-1 1zm0-1 1-1v-1h-2v2zm3-3-5-2v-1zm291 235 1-1h1l1-1-1-6 1 1v4l3-4 1 1-3 3v1l-1 1-1 1zm6-1h1v-1l1-1v-2l4 1-2 5 1-5h-2v1h-1l-1 2zm11 3 1-7h1v3h1l3-2h1l-4 3 2 4h-1l-2-4h-1zm5 3 2-7h1v1h3v4l-1 1h-2l-1-1zm3-2h1l1-1v-2l-1-1h-1v1l-1 1v2zm3 4v-1h2v-1l-1-6 1 1 1 4 3-4v1l-2 3-2 2v1zm6-1 1-5 5 1-2 5h-1l1-5h-2zm8 2-2-1v-2l1-2h3l1 1v1h-1v-1l-1-1-1 1h-1v3zh1v1zm3 1 1-5h1l-1 2h1l3-2v1l-2 2 1 3h-1l-1-3h-1zm7 2-1-1-1-1v-2l1-1 1-1h2l1 1v4l-1 1zm0-1h1l1-1v-1l1-1h-1l-1-1h-1v1l-1 1v1zm4 1 1-5 1 1zl4-3h1l-2 6-1-1 1-4v1zm4-5h-2v-1h1zh1l-1 1zm-232-31v-2h-5v-7 6h4v-6h1v6h1zm2-2v-7h5v1h-4v2h3v1h-3zh4v1zm6 0v-7h1v3h4v-3h1v7h-1v-3h-4zm9 0v-6h-2v-1h5v1h-2zm4 0v-7h4l1 1v3l-1 1h-3v2zm1-3h3v-3h-3zm4 3 3-7h1l3 7h-1l-1-1h-3l-1 1zm2-2h3l-2-4zm5 2v-6h5v7h-1v-6h-3v6zm8 0v-7h1v3h3l1 1v2l-1 1zm1-1h3v-2h-3zm5 1v-7h1v3h4v-3h1v7h-1v-3h-4v3zm8 0v-7 3h4v4zm0-1h3l1-1-1-1h-3zm5-6h1v7h-1zm3 7v-7h1v6l4-6h1v7h-1v-5l-4 5zm3-7-1-1h-1v-1h1v1h2v-1h1v1zm-51 19v-7h3l1 1h1v3l-1 1h-3zm1-3h3v-2l-1-1h-2zm4 3 3-7h1l3 7h-1l-1-1h-3zm2-2h3l-2-4zm6 2v-7zl4-6h1v7h-1v-5zm2-7v-2l1 1h1v-1h1v1l-1 1zm8 8-2-1-1-1v-4l1-1 2-1 2 1 1 1v4l-1 1zm0-1 1-1 1-1v-3l-1-1h-1l-1 1-1 1-1 1 1 1 1 1zm5 0v-7h1v4h3v-4h1v7h-1v-3h-3zm-19 105v-7h1v6h3v-6h1v6h2v-6h1v7zm10 0v-5h1v2h1l1-2h1l-2 2 2 3h-1l-1-2h-1zm7 0h-1l-1-1v-3l1-1h3l1 1v3l-1 1zm0 0 1-1h1v-2l-1-1h-2v3zm3 0v-1l1-2v-1h3v5h-1v-4h-2v4h-2m8 0v-1h-1l1-1 1-1h2v-1h-3v-1h3l1 1v4h-3m0 0 1-1h1v-1h-3v1zm7 0v-7h1l4 6v-6h1v7h-2l-3-6zm7-3h2v1zm1-1v-3h2v2zm0 0v-1h-2v1zm4 4v-5h-2v-1h2v-1h1zm6 0v-1h-4v-1l4-5h1v5h1v1h-1zm-3-2h3v-4zm63 16v-1l3-3h1l1-1v-1l1-1-1-1-1-1-1 1h-2v-1h6v3l-1 2-1 1-3 2h5v1zm10 0v-8h-2v-1h2v-1h1v10zm7 0v-7h2l2 3 2-3h2v7h-1v-6l-3 4-3-4v6zm10 0v-7h1v3h1l2-3h1l-2 3 3 4h-2l-2-3h-1zm7 2v-9h1v1l1-1h3l1 1v4l-1 1-2 1h-1l-1-1zm3-3 1-1h1v-3l-1-1h-2l-1 1v3h1zm5 1v-7h1v3h3v-3h2v7h-2v-3h-3zm8 0 1-1h1zm198-15 1-1h1l1-1-1-6 1 1v4l3-4 1 1-3 3v1l-1 1-1 1zm6-1v-1h1v-1l1-1v-2l4 1-2 5 1-5h-2l-1 1v2h-1zm6 1v1zm5 1 1-7 3 1h1v1h1v1l-1 1-1 1h1v2l-1 1h-2zm1 0h3l1-1-1-1h-1l-2-1zm1-3h2v-2h-1l-2-1zm6 5h-1l-1-1v-2l1-1 1-1h2l1 1v4zm0 0h1l1-1 1-1v-1l-1-1h-2l-1 1v1zm6 2h-1v-1h1zh2v-1l-1-1h-1l1-1v1h2v-1l-1-1h-1v1l-1-1 1-1 2 1 1 1-1 1v2l-1 1zm2 2 2-7h1v1h3v4l-1 1h-2l-1-1-1 2zm4-2 1-1v-1l-1-1h-1q0-1 0 0h-1l-1 2 1 1zm5 2h-1l-1-1v-2l1-1 1-1h1l2 1v4zm0 0h1l1-1v-3h-2l-1 1v2zm3 1 2-2-1-3h1l1 3h1l1-2v2h1l1-2 1 1-2 2 1 3-1-1v-2h-1l-1 2h-1l1-2-1-1-2 2zm7 3 1-2h1v-2l1-1v-1l4 1-1 4v3l-1-1v-1l-4-1v2zm2-2 3 1 1-4h-2zm7 3-1-1-1-1v-1l1-2h3l1 1v2l-4-1v1l1 1zh2l-1 1h-2m-1-4 3 1v-1l-1-1h-1zm5 5 1-5h1l-1 2 3 1v-3l1 1-1 5-1-1 1-2h-3zm5 1 1-5h1l-1 4h1v-1l3-2h1l-1 5h-1l1-4h-1zm6 1 2-1-1-1v-2h4l-1 5h-1l1-2h-2zm3-2v-1l-1-1h-1v2zm-136 81h-1zl-1-1-6 1v-1h5l-4-3v-1l4 3h1l1 1zm-1-5h-1v-1h-2l-1-1h-1l1-3 5 1v1l-5-1v2h3v1zm2-11-7-1 1-1 3 1v-1l-3-3 1-1 2 3 5-2-1 1-3 2v1zm2-7h-4l-1-1v-2l1-1h4v3m0-1-1-1-1-1h-1l-1 1v2l1 1h1l1-1zm1-3-5-1v-1l3-1-2-2v-2l5 2v1l-4-1 2 2-3 1zm2-9v1l-1 1h-2l-1-1-1-1v-2l1-1h1v1h-1v3h3zh-1v-1h1zm2-5-1 1-1 1h-2l-1-1-1-1v-1l1-2h4l1 1zm-1 0v-1l-1-1h-2l-1 1v1h1l2 1zm1-4-5-1 1-1 3-1-3-2 1-1 5 1v1l-5-1 3 2-4 2zm3-9-1 2h-4l-1-1v-2l1-1 1-1h2l1 1zm-1 0-1-1-1-1h-1v1h-1v1l1 1h2zm1-3v-1h-2l-1-1h-1l1-3 5 1v1l-4-1-1 2h3l1 1zm2-5-5-2h2v-2h1v-1h1l1 1zm-1-1 1-1-1-1h-1v2zm3-7-1 2h-4l-1-1v-2l1-1 1-1v1l-1 1v1l1 1h2l1-1v-1h-1l1-1zm0-3-5-1v-1l3 1v-1l-2-2v-1l2 2 3-1v1l-2 1-1 1zm2-6h-2v-4h-1v1l-1 1h1v1h-1v-3h6l-1 1zm-1-1v-1h-1v2h1zm2-3-2-1h-3v-2l1-2 5 1v1h-2l-1 1zm-2-3h-2v3l1-1zm-81 219v-2h-1l-6-1h5l-3-3v-1l4 3 1 2h1v1zm0-5-1-1h-1l-2-1 1-4 5 2v1l-4-2-1 2h1v1h2v1l1 1zm3-6h1zm2-5-7-2 1-1 3 1v-1l-2-3 1-1 2 4 4-1v1h-4v1zm3-7v1l-2 1-1-1h-1l-1-2v-1l1-1 2-1 1 1 1 1 1 1zm0 0v-1l-1-1-1-1-1 1h-1v2l1 1h2zm2-3-5-2v-1l4-1-2-2v-1l5 2-4-1 2 3h-4zm4-8-1 1h-3l-1-1v-4h2v1h-1v1l-1 1h1l1 1h1zv-2l1 1v2m2-6-1 2h-2l-2-1v-3l1-1h3l1 1zm-1 0-1-1h-3v2l1 1h2zm3-3-5-2v-1h3l-1-3v-1l5 2v1l-4-2 2 3h-1l-3 1zm3-8h-3l-1-1-1-1v-1l1-2h3l1 1 1 1zm0 0v-1l-1-1v-1h-2l-1 1v2zm2-3h-1zl-1-1h-1l-1-1h-1l2-3 5 2h-1l-4-1-1 1 1 1h1l1 1h1zm2-6-5-2h3v-1l1-1h1l1 1v2zm0-1h1l-1-1h-1v1l-1 1zm3-5h-1l-2-1-1-1v-1l1-1 1-1h1l-1 1-1 1v2h3zl-1-1 1-1v1l1 1zm2-3-5-2v-1l2 1 1-1-2-2 1-1 1 2h3v1h-3v1zm3-6v1h-2v-1h-1v-1l1-1v-1h-2v3-1l-1-1 1-1 1-1h2l3 1-1 1zm-1-1-1-1v1l-1 1v1h2zm2-2-1-3-1 1h-1l-1-1v-2l1-2 5 3h-2l-1 1 1 2zm-1-4h-2v1h-1l1 1h1zm176-37v-2h-1l-6-1h5l-3-3v-1l4 3 1 2 1 1zm0-5-1-1h-1v-1h-1l-1-1 1-3 5 2v1l-4-2-1 2h1v1h2v1l1 1zm3-6h1zm2-5-7-2 1-2h5l-3-3v-2l7 3v1l-6-2 3 3v1h-5zm3-7-4-2v-1l4 2v-1h-1l-2-4h1l4 2-4-1h1zm5-5-7-3h1v-2l1-1h3l1 1v3h-1zm-2-3-1-1h-3a1 1 0 0 0 0 2l1 1h2zm3-4h-1l-1-1v-2l1-1h-2v2h-1v-2l1-1h3l2 1v1h-1v2m0-1-1-1-1 1v2h1zm13 48v-1l3-3h1l1-1v-1l1-1-1-1-1-1h-1l-1 1h-1v-1l1-1h3l1 1 1 2-1 1v1l-2 2-2 2h5v1zm12 0-2-1-1-1v-1l-1-2 1-2v-1l3-2h1l2 1v1h-1l-1-1h-2l-1 1v3l1-1h3l1 1v3l-1 1zm0-1 1-1 1-1v-1l-1-1h-2l-1 1v2h1zm9 1v-7h1l2 3 3-3h1v7h-1v-6l-2 4h-1l-2-4zm9 0v-7h1v3h1l2-3h2l-3 3 3 4h-1l-3-3h-1v3zm7 2v-9h1v1l1-1h3l1 1 1 2-1 2-1 1-2 1h-1v-1h-1v3zm3-3 2-1v-4h-3l-1 1v2zm5 1v-7h1v3h4v-3h1v7h-1v-3h-4v3zm9 0-1-1v-1h1zm-591 31v-2h-6v-1h5l-4-3 1-1 3 3 2 2v2m0-5-1-1-1-1-1-1h-2l2-4 5 2-1 1-4-2-1 2h1v1h1l1 1h1zm2-6h1zm2-4-6-3 1-2v-2h3l1 1v3l-1 1 3 1zm-2-2v-3l-1-1h-1l-1 1v1zm4-4-1-2-1 1h-1l-1-1v-2l1-2 5 2v1l-2-1v2zm-1-3-1-1-1 2v1h1zm5-4-1 1-1 1h-1l-1-1-2-1-1-1v-2l1-1v-1l1 1h-1v3l1 1v-2l1-1h1l2 1 1 1zm-1 0v-1h-3v2l1 1h1zm2-3-5-2v-1l4 2v-1l-2-3v-1l5 2v1l-4-2v1zm2-5-4-2v-1l2 1v-1l-1-2v-1l2 2h3l-3 1v1l2 1zm3-7v1h-3l-1-1-1-1v-1l1-1 2-1 1 1h1l1 2zm0 0v-1l-1-1v-1h-2l-1 1v2h1l1 1zm2-3-5-2 1-2v-1l1-1h1v1h2l1 1v1zm-1-1 1-2v-1h-1l-1 1v1zm-2-1 1-1v-2h-1v1h-1v1zm6-5h-2v-2l1-2h-2v1h-1v1h1l-1 1v-2l1-1 1-1 1 1 3 1h-1v2m-1 0v-2h-1v1l-1 1zm14-6v-1h1v-2l-2-5h1l2 4 1-4h1l-1 4-2 3zm5-3 1-1v-3h3v5l-1-4h-2v4zm11 0v-7h4v1h-3zm6 0v-3h3v-2h-1l-1 1h-1v-1h3l1 1v4h-1v-1 1h-2m1-1v-1h-1l-1 2zm3 1v-5l4-1v1h-3v5zm7 0h-1l-1-1v-2h3v-2h-2v1h-1v-1h1v-1h1l1 1h1v5h-1v-1zm0-1 1-1v-1h-2v1h-1l1 1zm3 2v-7h1v1l1-1h1l1 1 1 1v2l-1 1-1 1h-1l-1-1v2zm3-2v-4h-2l-1 1v2l1 1zm3 0v-5h1v4h1l2-4h1v5h-1v-4 1l-3 3zm7 0-1-5h1v2h3v-2h1v5h-1v-2h-3zm7 0-1-1v-1l1-1h3l-1-1h-3l1-1h3v2l1 3h-1v-1l-1 1zm0-1 1-1h-3v1zM290 280v-1zh1l1-6h1l-1 5 4-3-3 3-1 1-1 1h-2m5 0h1v-1l1-1 1-1 3 2-3 4 2-4-2-1v1h-1v1h-1v1zm10 5 3-6 1 1-1 3h1l3-2 1 1-4 2 1 4-1-1-1-3-1-1zm4 5 4-6h1l-1 1h2l1 1v2l-1 1-1 1h-1l-1-1-1-1-1 2zm4-1h1v-1l1-1-1-1-1-1-1 1h-1v2zm2 4h1v-1l1-6 1 1-1 5 4-4v1l-3 3h-1v1h-1l-1 1zm6 1 2-5 4 2-3 5v-1l2-3-2-2zm7 4-2-1v-2l1-1 1-1h2l1 1v1l-1-1-1-1-1 1-1 1v1zh1l-1 1zm2 1 3-4h1l-1 2h1l2-1 1 1-3 1v3l-1-3h-1l-1 2zm7 4-1-1v-3l1-1h3l1 1v3l-1 1zm0-1h2l1-1v-2h-3v2q-1 0 0 0zm3 2 3-4h1l-2 4 4-2h1l-3 5v-1l2-3h-1zm5-4v-2l1 1zh1v1h-1zM110 180v1l1-1h1v-6l1 1v4l3-3 1 1-3 3h-1l-1 1h-3m6 0v-1h1v-1l1-1v-1l4 2-3 5-1-1 2-4-1-1-1 1v1l-1 1-1 1zm6 4h1q1 0 0 0zm4 2 3-6h1l-2 3h1l4-1h1l-4 2v4h-1v-4h-1zm4 4 4-6v1h2l1 1v3l-1 1h-3l-1-1zm4-1 1-1v-1l-1-1h-1l-1 1v2zm1 5 1-1h2v-6h1v5l3-3h1l-3 3-1 1-1 1zm6 0 3-4 4 2-3 4h-1l3-4-3-1zm7 4v-2l1-1 1-1h2l1 1v2l-1-1v-1h-2l-1 1v2zv1l1-1 1 1h-3m3 2 3-5-1 2 1 1 3-1h1l-3 1v4l-1-1v-2l-1-1zm7 3-1-1-1-1 1-1 1-1 1-1 1 1h1l1 2-1 1-1 1-1 1zm0 0 1-1 1-1v-1l-1-1h-2v1l-1 1v1zm3 2 3-5v1l-2 3h1l4-2 1 1-3 4h-1l2-4zm5-4-1-1v-1h1v1zh1v1zm109 263v-7h1zh2v-7h1v7h3v-7h1v7zm9 0v-5h1v2h1l2-2h1l-2 3 2 2h-1l-2-2h-1v2zm8 0h-2v-1l-1-1 1-2v-1h3l1 1v3l-1 1zm0 0v-3h-2l-1 1v2h1zm3 0v-4h4v5h-1v-4h-2v1zm8 0h-2v-2h1v-1h3l-1-1h-3l1-1h2l1 1v4zm0 0 1-1h-3v2zm6 0v-7h1l4 6v-6h1v7h-1l-4-5v5zm7-3h3v1zm1-1v-2l1-1h1l1 1v2h-2m0 0v-2h-1v2m7 4v-1h-4v-1l3-5h2v5h1v1h-1zm-3-2h3v-4zm8 2h-1l-1-1v-5h1l1-1 2 1 1 2v2l-1 1v1zm0 0 1-1h1v-4l-1-1h-2v1l-1 1v2l1 1zm-133-4v-1l3-3h1l1-1v-1l1-1-1-1-1-1-1 1h-2v-1l1-1 3 1h2v3l-1 2-1 1-3 2h5v1zm8 0v-1l3-3h1l1-1v-1l1-1-1-1-1-1-2 1h-1v-1l1-1 3 1h1l1 2-1 1v2l-2 1-2 2h5v1zm12 0v-7h2l2 3 2-3h2v7h-1v-6l-3 4-3-4v6zm10 0v-7h1v3h1l2-3h1l-2 3 3 4h-2l-2-3h-1zm7 2v-9h1v1l1-1h3l1 1v4l-1 1-2 1h-1l-1-1zm3-3 1-1 1-1v-2l-1-1h-1l-2 1v2l1 1zm5 1v-7h1v3h3v-3h1v7h-1v-3h-3zm8 0v-2h2v2zm-36 225v-3l1-1v-5h4v6h1v3h-1v-2h-5zm1-3h4v-5h-3v3zm9 1h-2l-1-1v-3l1-1h3v1l1 2h-4v1h1zh1l-1 1zm-2-3h3v-1h-3zm6 3v-4h-2v-1h5v1h-2v4zm6 0h-1l-1-1v-3l1-1h2l1 1h-3v3zh1l-1 1zm3 0v-5h1v2h1l2-2h1l-2 2 2 3h-1l-2-2h-1v2zm7 0-1-1v-1l1-1h3v-1h-3v-1h3l1 1v4h-3m0 0 1-1h1v-1h-3v1zm4 0 1-2h-1v-3h4v5h-1v-2h-1zm3-2v-2h-2v1l1 1zm-38 15h-1v-6h2l1-1h1v1h-2l-1 1-1 1h3l1 1v2l-1 1zm0-1v-3l-1-1-1 1-1 1 1 1zm6 1-1-1-1-1-1-1 1-2h1l1-1 1 1h1v3l-1 1zm0-1v-1l1-1-1-1v-1h-2l-1 1v2l1 1zm3 0v-4h4v5h-1v-4h-2v4zm6 0v-5h1v2h2l1 1v2zm1 0h1v-2h-2zm4 0v-5h1v3h3v-3h1v5h-1v-2h-3v2zm6 0v-5h1v4l3-4h1v5h-1v-4 1l-3 3zm10 2v-2h-4v-5h1v5h3v-5h1v7zm4-1h-1v-2h1v-1h3-1v-1h-2v1h-1v-1l1-1h3v5h-1zm0-1a1 1 0 0 0 1-2h-3v2zm77 9h-1v-1l-1-1-6 1v-1h5l-4-3v-1l4 3h1l1 1zm-1-5h-1v-1h-2l-1-1h-1v-4l6 2h-1l-4-1v2l1 1h1l1 1zm1-6h1zm1-5-7-1 1-3v-1l1-1h2l1 1 1 1-1 2v1zm-3-1 1-2v-1l-2-1h-1v2l-1 1zm5-4-2-2-1 1h-2v-4l6 1-1 1-2-1v1l2 2zm-2-3v-1l-2-1v3h1zm3-5v2h-3l-2-1-1-1v-3h1v1l-1 1v1h1l1 1v-3l1-1h2l1 1zm0 0h-1l-1-1h-1v1h-1v1l1 1h2zm1-3-5-1v-1l4 1v-1l-3-3v-1l5 1v1l-4-1v1h1zm2-6-6-1 1-1 2 1v-1l-2-2v-1l3 2 3-1-1 1-2 1v1zm1-7v1l-1 1h-2l-1-1-1-1v-1l1-1 1-1h1l2 1zm0 0v-1l-1-1h-3v2l1 1h2zm1-3-5-2 1-2v-1h2v1l1-1h1l1 1v1zm0-1v-3h-1v1h-1v1zm-2-1v-1h-2v2zm4-5-1 1h-2v-4l-1 1v2h-1v-3l1-1 2 1h3l-1 1zm-1-1v-1h-1v-1 3h1zM168 510h2v-1l-1-5h1l1 5 2-4h1l-2 3-1 2h-1v1h-2m5-1h1v-3l1-1 3 1-1 5h-1l1-4-2-1v2l-1 1v1h-2m7 2h-1zv-1l1 1zm4 1 2-7 5 1-1 1-3-1-2 6zm7 1h-1l-1-1v-1l1-1h3v-1h-3v-1h2l1 1 1 1v1l-1 3-1-1h1zm0-1 1-1h-3zm3 2 2-5 3 1h-3l-1 4zm6 1v-2l1-1h1l2 1v-2h-3l1-1h1l1 1 1 1v1l-1 3h-1v-1l-1 1zm1 0v-1h1v-1h-3v1zm3 3 2-7v1h3l1 1v2l-1 1-1 1h-2v-1h-1zm3-2 1-2v-1l-1-1h-1l-1 1v3zm3 2 1-5h1l-1 4 1-1 3-3 1 1-1 5h-1l1-4h-1zm6 1 1-5h1v2l2 1 1-2h1l-2 5h-1l1-2-3-1zm7 2v-2h4v-1h-1v-1h-1l-1 1v-1h3l1 1-1 2v2h-1v-1 1zm1-1h1v-1h1-1l-2-1v2zm-83 74h2v-1l-1-5h1l1 5 3-4-2 4h-1l-1 2h-2m5-1h1v-2l1-1v-1l3 1-1 5h-1l1-4-2-1v2l-1 1v1h-2m7 2h2zm4 1 2-7 1 1-1 3h1l3-2h1l-3 2 1 5-1-1-1-3-1-1-1 3zm5 4h1l1-1-1-6 1 1v4l3-3h1l-3 3v1l-1 1-1 1h-2m6 1 2-7v1h3l1 2v1l-1 1-1 1h-2v-1h-1zm3-2h1v-3l-1-1h-1l-1 1v3zm6 3 1-2-1-1h-2v-3h1v2l1 1h1l1-3v1zm4 1-1-1 1-1h3l1-1h-1v-1h-1l-1 1-1-1h1l1-1 1 1h1v3l-1 2v-1l-1 1zm0-1h2v-1l-1-1h-1l-1 1zm5 2 1-4-2-1 1-1 4 2h-2zm5 1v-4l1-1h2l1 1 1 1v2l-1 1-1 1zm1 0v-1l1-2-1-1h-1l-1 1-1 1 1 1zm3 1 1-5 2 1h2v2h-1v1h1v1l-1 1h-2zm1 0h3v-1h-1l-2-1zm1-2h1v-1h-1l-1-1zm5 4h-1v-2l1-1h1l1 1 1-1-1-1h-3 1v-1h2l1 1v2l-1 3v-1zm0 0h1l1-1v-1h-2l-1 1zm85 22v-1h1v-1l-2-6h1l2 5 1-5h1l-1 4-1 3h-1zm5-3h1v-4h4l-1 6v-5h-2v1l-1 2v1zm6 1v-1l1 1zm5 0v-7h1v3h1l2-3h1l-2 3 2 4h-1l-2-3h-1zm6 2h1l1-1-3-6h1l2 5 2-4h1l-2 4v1l-1 1-1 1zm5 0v-7h4l1 1v3l-1 1h-2l-1-1v3zm3-3v-3l-1-1-1 1h-1v2l1 1zm7 1v-2h-3l-1-1v-2h1v2h3v-2h1zm4 0h-2a1 1 0 0 1 0-2v-1h3v-1l-1-1-1 1h-1v-1h3l1 1v4h-1v-1zm0-1v-1h-2v1zm5 1v-4h-2v-1h4v1h-1zm5 0-1-1v-3l1-1h3l1 1v3l-1 1zm0-1h2v-2l-1-1h-1l-1 1v1zm4 1v-5h4v3l1 1h-1v1zm1-1h3v-1h-3zm0-2h1v-1h-2zm6 3v-2l1-1h2v-1h-3l1-1h2l1 1v4h-3m1 0h1v-1h-2l-1 1h1v1zm-117-41v-7h5v1h-4v2h3l1 1v2l-1 1zm1-1h3v-2h-3zm8 1h-2v-1l-1-2 1-1v-1h3l1 1v3l-1 1zm0-1v-3h-3v2l1 1zm3 1h1v-4h4v5h-1v-4h-2zm6 0v-5h1v2h3v3zm1-1h1v-1h-2zm4 1v-5h1v2h3v-2h1v5h-1v-2h-3v2zm6 0v-5h1v4-1l3-3h1v5h-1v-4 1zm10 2v-2h-4v-5h1v4h3v-4 4h1v3zm4-2h-1v-2l1-1h3l-1-1h-3l1-1h2l1 1v4-1l-1 1zm0-1 1-1h-3v1zm6 1v-7h1l4 6v-6h1v7h-1l-4-6v6zm7-3h3zm1-1v-1l1-1h1l1 1v1a1 1 0 0 1-2 1m0-1v-1h-1zm6 5h-2l-1-1v-1h1v1zh1v-2l-1-1h-1l-1 1h-1l1-4h4v1h-4v2h3l1 1v2zm-75-201v-1l1-1-2-6h1l2 5 2-5h1l-2 5-1 2zm5-2v-1l1-1v-3h4l-1 5v-5h-2v2l-1 1v2zm6 0v1zm5 0v-7h2l2 4 2-3h1v7h-1v-7l-2 5h-1l-2-5zm10 1v-1h-1v-1l1-1h3v-2h-2v1h-1v-1h3l1 1v4h-1v-1l-1 1zm0-1h2v-2h-2l-1 1zm4 1 1-1v-3h4l-1 5v-4h-2v2h-1v1zm6 0v-5h1v2h2v1h1v1l-1 1zm1 0h1l1-1v-1h-2zm3 0 1-5v6zm3 1v-6h1l-1 5h2l1-4h1l-1 4h2l1-4v5zm10 0h-2v-1l-1-2 1-1 1-1h1l2 1v2h-4l1 1zh1v1zm-2-3h3v-1h-2zm5 3 1-5h3v1l1 1h-1v1h1v1l-1 1zm1 0h2l1-1v-1h-3zm0-3h3v-1h-3zm7 4h-1l-1-1v-2h3v-2h-2v1h-1v-1h1l1-1 2 1v5h-1v-1zm0-1v-2h-2v2zm437 273h1l1-1v-6l1 1v5l3-4 1 1-3 3h-1l-1 1-1 1h-1zm6 1v-1h1v-1h1v-1l1-1v-1l3 2-2 5-1-1 2-4-1-1-1 1-2 3zm6 3h2zm4 2 3-6h1l-2 3h1l4-2 1 1-4 2v4l-1-4-1-1zm4 4h2v-1l1-5h1l-1 5 4-4 1 1-4 3-2 1v1h-1zm5 3 3-7 1 1h2l1 1v2l-1 1v1h-3l-1-1zm3-2 1 1 1-1 1-1v-1l-1-1h-2zm6 4 1-2h-1l-1-1v-2l1-1v1l-1 1 1 1h1v1l1-3 1 1zm3 2 1-1v-1h2l1 1 1-1-1-1h-2v-1h2l1 1 1 1-1 2-1 2h-1v-1h-2m1-1v-1h1l-1-1h-2zm4 3 2-4-1-1 4 2v1l-2-1zm5 3-1-1v-3l1-1h3l1 1v3l-1 1zm0-1 1 1 1-1 1-1v-1l-1-1h-1l-1 1zm3 3 3-5 2 1 1 1v1l-1 1v2h-2zm2-1h1v-1l-1-1h-1zm1-2h2v-1h-1zm4 6v-3h2l2 1v-1l-1-1h-2l1-1 3 1v1l-1 2-1 2h-1l1-1h-2m0-1 1 1 1-1v-1h-2zm-136 52v-8h-2l1-1h1l1-1h1v10zm7 0h-1l-1-1h-1l-1-1h2l1 1h2l1-1v-2h-3v-1l1-1h2v-1l-1-1-1-1-2 1v1h-1v-1l1-1 1-1h2l1 1 1 1v2h-1l-1 1h2v4h-1l-1 1zm9 0v-7h1l2 3 3-3h1v7h-1v-6l-2 4h-1l-2-4zm9 0v-7h1v3h1l3-3h1l-2 3 2 4h-1l-2-3h-2v3zm7 2v-9h1v1l1-1h3l1 2 1 1-1 2-1 1-1 1h-1l-2-1v3zm3-3h2v-1l1-2-1-1v-1h-2l-2 1v3zm5 1v-7h1v3h4v-3h1v7h-1v-3h-4v3zm9 0v-1l1-1v2m182 62v-7h1v6h2v-6h1v6h3v-6h1v7zm9 0v-6h1v3h1l2-3h1l-2 3 2 3h-1l-2-3h-1v3zm8 0-1-1-1-1-1-1 1-1 1-1 1-1 1 1 1 1v2l-1 1zm0-1v-1l1-1-1-1v-1h-2l-1 1v2l1 1zm3 1v-1h1v-5h4v6h-1v-5h-2v4l-1 1zm8 0v-1l-1-1v-1h4v-1l-1-1h-2v1h-1l1-1 1-1 2 1v1l1 1v3h-1v-1h-1zm0-1 1-1v-1h-2l-1 1zm7 1v-7h1l3 5v-5h1v7h-1l-4-6zm6-4h3v1zm2 0-1-1h-1v-2h3v2zm0-1v-1h-1v2zm5 5h-1l-1-1h-1v-1h1v1h3v-2h-1v-1h-1l1-1h1v-1l-1-1-2 1h-1l1-1h3l1 1v1l-1 1h1v3h-1zm6 0h-1l-1-1-1-1h1l1 1h2v-1l1-1-1-1h-3v-3h4-3l-1 3 1-1h2l1 1v3h-1zM380 578v-7h5-4v3h4v3h-1l-1 1zm1-1h2l1-1v-1l-1-1h-2zm5 3v-8h1v1h1l1-1 1 1 1 1v2l-1 1-1 1h-1v-1h-1v3zm3-3v-4h-1l-2 1v2l1 1zm5 1v-1h-1v-2h4v-1l-1-1h-1l-1 1h-1l1-1 1-1 2 1v1l1 1v3h-1v-1h-1zm0-1 1-1v-1h-2l-1 1zm5 1v-5h-2v-1h5v1h-2v5zm6 0-2-1v-3l1-1 1-1 1 1 1 1h-1v-1h-2l-1 1v2l1 1h2v-1h1v1zm3 0v-6h1v3h1l2-3h1l-2 3 2 3h-1l-2-3h-1v3zm5 0v-6h1v4h1l2-4h1v6h-1v-4l-3 4zm6 0v-6h1v4h1l2-4h1v6h-1v-4l-3 4zm3-6-1-1-1-1h1v1zh1v-1h1a1 1 0 0 1-1 2zm-59 18v-5h5v5h-1v-5h-3v5zm9 0h-2l-1-1v-3l1-1h3l1 1v2h-4l1 1zh1v-1h1l-1 1zm-2-3h3v-1h-1l-1-1v1zm4 4v-2h1v-4h4v4h1v2h-1v-1h-4v1zm2-2h2v-4h-2zm7 1h-2v-3h3v-1l-1-1-1 1h-1v-1h3l1 1v4h-1v-1zm0-1v-1h-2v1zm3 1v-5h4-3v5zm7 0h-1l-1-1v-3l1-1h3l1 1v3l-1 1zm0-1h1l1-1v-2h-1l-1-1-1 1v3zm4 1v-5h4-3zm5 0v-5 4l1-1 2-3h1v5h-1v-4zm9 0v-2h-3v-1l-1-1v-1h1v2h3v-2h1zm4 0h-1l-1-1v-3l1-1h3l1 2v1h-4v1zl1-1h1l-1 1-1 1zm-1-3h3v-1h-1l-1-1-1 1zm7 3h-1l-1-1v-3l1-1h3v1h-1l-1-1-1 1v3zv-1h1v1l-1 1zm3 0v-5h1v2h1l2-2h1l-2 2 2 3h-1l-2-2h-1v2zm6 0v-5h1v4-1l2-3h1v5h-1v-4zm6 0v-5h1v4-1l2-3h1v5h-1v-4zm2-6h-1l-1-1h4l-1 1zm-56 18v-5h1v2l2-2h1l-2 2 2 3h-1l-1-2h-1zm7 0h-1l-1-1v-3l1-1h3v1l1 2-1 1v1zm0-1h1l1-1v-1l-1-1h-2v1l-1 1h1zm3 1v-4h4v5h-1v-4h-2v3l-1 1zm6 0v-4h4v5h-1v-4h-2v3zm8 0h-1l-1-1v-3l1-1h2l1 1 1 1v1h-4v1zh2l-1 1h-2m-1-3h3v-1h-3zm4 5v-3h1v-4h4v4h1v3h-1v-2h-4v2zm2-3h2v-3h-2zm4 1 2-3-2-2h1l2 2h1v-2 2h1l2-2h1l-2 2 2 3h-1l-2-2h-1v2-2h-1l-2 2zm125-28v-7h1l3 4 2-4h1v7h-1v-6l-2 4h-1l-2-4zm11 0h-1l-1-1-1-2 1-1 1-1h3v3h-4 1v1zh1v-1h1v1zm-2-3h3v-1l-1-1-1 1zm5 4v-2h1v-4h4v6-1h-4zm1-2h3v-4h-2v3zm5 1v-5h1v4-1h1l2-3h1v5h-1v-4l-3 4zm10 1v-1h-4v-5h1v4h3v-4h1v6zm2-1v-5h1v4-1l3-3h1v5h-1v-4l-3 4zm6 0v-5h1v2h3v-2h1v5h-1v-2h-3v2zm8 0h-1l-1-1v-3l1-1h2l1 1h-1l-1-1-1 1v3zh1l1-1h1l-1 1-1 1zm4 0v-5 2h1l2-2h1l-2 2 2 3h-1l-1-2h-2zm5 0v-5h1v4-1l3-3h1v5h-1v-4h-1zm6 0v-5h1v4-1l3-3h1v5h-1v-4h-1zm2-6v-1zh1l-1 1zm-50 18v-5 2h1l2-2h1l-2 2 2 3h-1l-2-2h-1zm7 0h-1l-1-1-1-1 1-2 1-1h2l1 1 1 2-1 1-1 1zm0-1v-1h1l-1-1v-1h-2l-1 1v1zm3 1v-4h4v5h-1v-4h-2v3l-1 1zm6 0 1-1v-3h4v5h-1v-4h-2v3h-1zm8 0h-1l-1-1v-3l1-1h2l1 2h1v1h-4v1zh1v1h-2m-1-3h3v-1h-3zm4 5v-3h1v-4h4v4h1v3h-1v-2h-4v2zm2-3h2v-3h-2zm4 1 2-3-2-2h1l2 2v-2h1v2h1l1-2h1l-1 2 2 3h-1l-2-2h-1v2h-1v-2h-1l-1 2zM301 761v-7h5-4zm7 0-1-1-1-1v-2l1-1 1-1 2 1v1l1 1-1 1v1zm0-1h1l1-1v-2l-1-1h-2v1l-1 1 1 1zm4 2v-7h1v1l1-1 2 1 1 1v2l-1 1-2 1-1-1zm2-2h1l1-1v-2l-1-1h-2v4zm6 1-1-1-1-1v-2l1-1 1-1 2 1v1l1 1-1 1v1zm0-1h1l1-1v-2l-2-1h-1v4zm3 2v-2h1v-5h4v5h1v2h-1v-1h-4v1zm2-2h2v-4h-2zm7 1-1-1-1-1v-2l1-1 1-1h1l1 1v1h-1v-1h-2v4h2v-1h1v1h-1zm3 0v-6h1v3h1l2-3h1l-2 3 2 3h-1l-2-3h-1v3zm7 0-1-1h-1v-1l1-1h3v-1l-1-1h-1l-1 1v-1l1-1h1l1 1h1v5h-1v-1zm0-1h1l1-1v-1h-2l-1 1zm4 1 1-2-1-1v-2h1v-1h3v6h-1v-2h-1zm3-3v-2h-2v2zm-52 15h-1l-1-1v-1l-1-1 1-3 2-1h2v1h-3l-1 1v1l1-1h2l1 1v3l-1 1zm0-1 1-1v-1l-1-1-1 1h-1v1l1 1zm6 1h-2l-1-1v-3l1-1h3l1 1v3l-1 1zm0-1v-3l-1-1-1 1h-1v2l1 1zm3 1h1v-4h4v5h-1v-5h-2v3l-1 1zm6 0v-5h1v2h3v2l-1 1zm1-1h2v-2h-2zm4 1v-5h1v2h3v-2h1v5h-1v-2h-3v2zm6 0v-5h1v4-1l3-3h1v5h-1v-4zm10 1v-1h-4v-5h1v4h3v-4 4h1v2zm4-1h-2v-3h3v-2h-1l-1 1h-1v-1h3l1 1v4-1zm0-1v-2h-1l-1 1v1zm6 1v-7h1l4 6v-6h1v7h-1l-4-6v6zm7-4h3v1h-3zm1 0v-2h3v2l-1 1zm0-1v-1l-1-1v2m4 5v-6h-1l1-1h1v7zm480 57v-7h-2v-1h1l1-1h1v9zm9 0v-2h-6v-1l5-6h2v6h1v1h-1zm-4-3h4v-5zm11 3v-7h1l3 4 2-4h1v7h-1v-6l-2 4-3-4zm9 0v-7h1v3h2l2-3h1l-2 3 2 4h-1l-2-3h-2v3zm7 3v-10h1v1l1-1h4l1 2v3l-1 2h-3l-2-1v4zm4-4 1-1v-3l-1-1h-3v1l-1 2 1 1v1zm4 1v-7h2v3h3v-3h1v7h-1v-3h-3v3zm9 0h2zm-271 61h-2l-1-1-1-1h1l1 1h3l1-1v-1l-1-1h-2v-1h2v-1l1-1-1-1h-3v1h-1v-1l1-1h4v1l1 1v1l-1 1h-1l1 1h1v3l-1 1zm8 0v-7h2l2 4 3-4h1v7h-1v-5l-3 3-2-3v5zm10 0v-7h1v3h1l2-3h2l-3 4 3 3h-1l-3-3h-1v3zm7 3v-10h1v1l1-1h1l2 1 1 1v4l-1 1h-3l-1-1v4zm3-4h1l1-1v-3h-1l-1-1-2 1v3l1 1zm5 1v-7h1v3h4v-3h1v7h-1v-3h-4v3zm8 0v-1h1v1zm-337 11h-2l-1-1-1-1h2l1 1 2-1 1-1-1-2h-5l1-5h6v1h-5v3h4l1 1v2l-2 2zm8 0v-7h2l2 3 2-3h2v7h-1v-6l-3 4-3-4v6zm10 0v-7h1v3h1l2-3h1l-2 3 3 4h-2l-2-3h-1zm7 2v-9h1v1l1-1h3l1 1v4l-1 1-2 1h-1l-1-1zm3-3 1-1 1-1v-2l-1-1h-2l-1 1v2l1 1zm5 1v-7h1v3h3v-3h2v7h-2v-3h-3zm8 0-1-1 1-1h1v2zm170-28h-1zv-1l-6-1h5l-3-3v-1l3 3 1 1 1 1v2m0-5-1-1-1-1h-1l2-3 4 2v1l-4-2-1 1 1 1h1l1 1v2m3-6q0-1 0 0m3-4-7-3 1-1 3 2v-1l-2-4 1-1 2 4h4v1h-4l-1 1zm4-7-1 1-2 1-1-1-1-1-1-1 1-1 1-1 1-1 1 1 1 1 1 1zm-1 0v-1h-1l-1-1h-1l-1 1v1l1 1v1h2zm2-3-4-2v-1l3-1-1-2v-1l5 2v1l-4-2 1 3h-3zm5-8-1 1h-1l-3-1v-2l1-1 1-1v1h-1v3l2 1v-1zv-1h1zm3-5-1 1-2 1-1-1-1-1-1-1 1-1 1-1 1-1 2 2 1 1zm-1 0v-1h-1l-1-1h-1l-1 1v1l1 1 1 1zm2-3-4-2v-1l3-1-1-2v-1l5 2v1l-4-2 1 3h-3zm5-8-1 1h-3l-1-1v-2l1-2h1l2 1 1 1zm-1 0v-2l-1-1h-2v1l-1 1 1 1h1l1 1zm2-3h-1v-1h-1l-1-1h-1l2-3 5 2-1 1-4-2-1 2h1l1 1h1zm3-5-4-2v-1l2 1v-1l1-1h2l1 1v1h-1zm0-1 1-1v-1h-1v-1l-1 1-1 1zm4-5-1 1h-3l-1-1v-3l1-1h2l-1 1h-1v2l2 1h1zh1l-1-1 1-1v3m1-3-4-3 2 1 1-1-2-3h1l1 2h4l-1 1h-3v1zm4-6h-1l-1-1v-2l1-1h-2v2h-1v-2l1-1h2l3 2h-1v2m-1 0v-3l-1 1v2zm3-3-2-2h-2l-1-1 1-1v-1l1-1 5 2-1 1-2-1v1l1 2zm-1-4-2-1v1h-1v1h2zm226-36v-2h-1l-5 2v-1l4-2-4-1v-1l4 2h2v1h1v2m-2-5h-4v-4h5v1h-4v2h4v2m1-7-1-1h2m0-4-7-1v-1l4-2-4-2v-1h7v1h-6l4 2-5 3h7zm0-9h-5v-1l4 1v-1h-1l-3-3h5v1h-4 1zm2-5-7-1v-1h1-1v-1l1-2h3l1 1 1 1-1 1v1h2zm-2-3h-1l-1-1-1 1h-1v2h1l1 1 1-1zm1-5h-1v1h-2v-4h-1l-1 1v1h1v1h-1l-1-1v-1l1-1 1-1h4v1h-1l1 1zm-1 0v-1l-1-1h-1v2l1 1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M651 777h2v-6l1 1v4l3-3h1l-3 3-1 1-1 1h-3m6 0v-1h1v-1l1-1v-1l3 2-2 4h-1l2-4-2-1v1l-1 1v1zm10 6-2-2v-1l1-2 1-2h3l2 2v3l-2 1-1 1zm0-1h3l1-1v-3l-1-1h-3l-1 1v3zm6 4v-3l2-2 1-1 1 1h2v1h-1a205724600565 205724600565 0 0 0-144469459539 385251892101A205724600565 205724600565 0 0 0 676 782l1 1-1 2-1 1h-2m0-1h2l1-1v-1l-1-1a1 1 0 0 0-2 0v2q-1 0 0 0zm2 4 4-6v1h2l1 1v2l-1 1-1 1h-2v-1l-1-1zm4-1 1-2v-1l-1-1-1 1h-1v2zm2 4 1-1 1-6v5l3-3 1 1-3 3h-1l-1 1zm8 2 1-2h-1l-1-1v-2l1-1v3l2 1 1-3v1zm4 2v-1l1-2 1-1 3 1v3h-1l-3-2v2zh1v-1l1 1h-3m0-3 3 1v-1l-1-1h-1zm3 5 3-5 2 1 1 1v1h-1v2l-1 1h-2zm1-1 2 1h1v-1h-1l-1-1zm1-2 1 1h2v-1h-1l-1-1zm5 6v-3h2l2 1v-1l-1-1h-2l1-1 2 1h1v1l-1 2-1 2h-1l1-1zm0-1h1v-2h-2z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M858 888h2v-6h1v5l3-3h1l-3 3-1 1-1 1h-3m6 0 1-1v-1h1v-1l3 2-2 4h-1l2-4-1-1-1 1v1h-1l-1 1zm10 5-1-1-1-2 1-1 1-2h3l2 1v4l-2 1-1 1zm0 0h2l1-1 1-1v-3h-1l-1-1-2 1-1 1v3zm6 3v-3l2-2 1-1h1l2 1v1h-1v-1h-3v1h2v1l1 1-1 1v1l-2 1zm0 0h2l1-1v-2h-3zm2 4 4-7v2l1-1 1 1 1 1v2l-1 1-1 1-1-1h-1l-1-1-1 2zm4-1 1-1v-3h-2l-1 1v2zm2 4h1l1-6h1l-1 5 3-3h1l-3 3-2 2zm8 2 1-2h-1l-1-1v-2l1-1h1l-1 1v2h2l1-2 1 1-3 4zm4 2-1-1v-3l1-1h3l1 1v3h-1l-3-2v2zh1l1 1h-3m0-4 3 2v-2zm3 5 3-4 2 1 1 1v1h-1v3h-2zm2 0h1v-1l-1-1h-1zm1-2h1v-1l-1-1h-1zm4 6v-2h2l2 1v-2h-3l1-1h2l1 1v1l-1 1-1 3h-1l1-1h-2m0-1h2v-1h-2zM377 794v-1l-6-2 1-1 4 2-2-4 1-1 2 4 1 2zm2-5v-1l-2-1v-1l2-3 4 4v1l-4-3-1 1 1 1 1 1v2m5-4-1-1h2zm1-2-1-3-1 1-2-1v-1l-1-1h1v-1l2-2 5 5-2-2-2 2zm-1-4 1-1-2-2-1 1-1 1v1h1l1 1zm5 0-3-4v-1l2 2 2-2-2-2h1l3 3v1l-2-1-2 1 2 2zm4-5-3-3 2-3 1 1-2 2zm5-4h-4v-2l-1-1 1-1 1-1h1l1 1h1l-3 3 1 1h1zv-1l1-1v2zm-3-1 2-2-1-1h-1v1h-1zm5-1v-1h-1v-1l-1-1-1-1 3-2 3 3v1l-4-3-1 1 1 1 1 1 1 1v1zm4-5v-2h-2l-1-1v-1l1-1 1-1 4 3v1l-2-1h-1zm0-3-2-1-1 1v1h2m-300 86v-1l1-1-2-6h1l2 5 1-5h1l-1 4v1l-1 2zm5-3 1-1v-3h3v6h-1l1-5h-2v1h-1v3zm6 1v-1l1 1zm2 0 2-3-1-1-1-1v-1l1-1h5l-1 7v-3h-2l-2 3zm3-4h2v-2l-2-1-1 1h-1v2zm4 4v-5h1v2h3v-2 5h-1l1-2h-3zm6 0v-5h3-2zm7 0h-2l-1-1v-3l1-1h3v1h1v2h-4l1 1zh1zm-2-3h3v-1h-1v-1l-1 1zm4 3v-1l1-1v-2h3v5h-1v-4h-2v3l-1 1zm6 0 2-2h-1l-1-1 1-1v-1h4v5h-1v-2h-1l-2 2zm3-2v-2h-3v1h1zm566-72v-7h1v6h3v-6h1v6h2v-6h1v7zm10 0v-6h1v3h1l1-3h1l-2 3 2 3h-1l-1-3h-1zm7 0-1-1-1-1v-2l1-1 1-1 2 1 1 1v2l-1 1zm0-1h1l1-1v-2l-1-1h-2v4zm4 1v-3l1-1v-2h3v6h-1v-5h-2v4zm7 0-1-1 1-1h1l1-1h1v-1h-2v1h-1v-1l1-1h1l1 1h1v5h-1v-1zm0-1h1l1-1v-1h-2l-1 1zm7 1v-7h1l4 5v-5h1v7h-2l-3-6zm7-4h2v1zm1 0v-2l1-1 1 1v2zm0-1-1-1-1 1zm5 5v-1h-1v-1h1v1h2l1-1v-1l-1-1h-3v-3h5-4v3-1h3v1l1 1-1 2z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M315 228q11 2 12 12-1 10-12 12-11-1-12-12 2-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m311 240 5 2 4-2v3l-4 2-4-2h-1zm11-2-6 3-6-3 4-2h5zm-15 0v3l-1 2h3l-1-2v-2h2v5l6 2 3-1 3-1v-5l2-1h1l-1-1-8-3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M610 285q11 2 12 12-1 11-12 12-10-1-12-12 1-10 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m606 297 5 2 4-2v3l-4 2-4-1-1-1zm11-2-6 3-7-3 5-2h4l1 1zm-15 0v3l-1 2 1 1v-1l1 1 1-1-1-2zl2 1v4l5 2 3-1 3-1v-4l3-2h-1l-7-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M424 415q11 1 12 12-1 10-12 11-11-1-12-11 1-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m420 427 5 2 4-2v3l-4 2-4-2h-1zm11-2-6 3-6-3 4-3q1-2 4 1h1zm-15 0v3l-1 2h1l1-1v1h1l-1-2v-3l2 1v4l6 3 3-1 3-2v-4l2-1h1l-2-1-7-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M301 433q11 1 12 11-1 11-12 12-10-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m297 444 5 3 4-3v3l-4 2-4-1-1-1zm11-2-6 3-6-3 4-2h4l1 1zm-15 0v3l-1 2 1 1 1-1v1l1-1-1-2v-2l2 1v4l6 3 3-2 3-1v-4l2-1 1-1h-2l-7-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M740 738q10 1 11 11-1 11-11 12-11-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m735 749 5 3 5-3v3l-5 2-3-1-2-1zm11-2-6 3-6-3 4-2h4l1 1zm-15 0v3l-1 2 1 1 1-1v1l1-1-1-2v-2l2 1v4l6 2 3-1 3-1v-4l2-2h1-1l-8-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M904 773q11 1 12 11-1 11-12 12-10-1-12-12 2-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m900 785 5 2 4-2v2l-4 2-4-1-1-1zm11-2-6 3-7-3 5-3q1-2 4 1h1zm-15 0v2l-1 2 1 1v-1l1 1 1-1-1-1zl2 1v4l6 3 2-2 3-1v-4l3-1v-1h-1l-7-4zm-570-57q11 1 12 11-1 11-12 12-10-1-11-12 1-10 11-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#b01616",
    d: "M324 731h5v4h4v5h-4v4h-5v-4h-4v-5h4zm4 1h-3v4h-4v3h4v4h3v-4h4v-3h-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M263 560q11 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#b01616",
    d: "M260 565h5v4h4v5h-4v4h-5v-4h-4v-5h4zm4 1h-3v4h-4v3h4v4h3v-4h4v-3h-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M461 223q11 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#b01616",
    d: "M459 228h5v4h4v5h-4v4h-6v-4h-4v-5h4zm4 1h-4v4h-4v3h4v4h4v-4h4v-3h-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M570 541q11 1 12 11-1 11-12 12-10-1-12-12 2-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m566 553 5 2 4-2v2l-4 2-4-1-1-1zm11-3-6 3-7-3 5-2q1-2 4 1h1zm-15 0v3l-1 2 1 1v-1l1 1 1-1-1-1v-3l2 1v4l6 3 2-2 3-1v-4l3-1v-1h-1l-7-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M402 543q10 1 12 12-1 10-12 11-11-1-12-11 1-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m398 555 4 2 5-2v3l-5 2-3-2h-1zm11-2-7 3-6-3 5-3q1-2 4 1zm-15 0v3l-1 2h1v-1 1h2l-1-2zl2 1v4l5 3 3-1 3-2v-4l3-1-1-1-8-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#172133",
    fillRule: "evenodd",
    d: "M664 389q10 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M662 407v-1zm5 0v-1zm-3-6h2v1h-2zm-2 0h1v1h-1zm2-2h2v1h-2zm5 1h-2v-1zm-8-1h2v1h-2zm3-2h2v1h-2zm-4 0h3v1h-3zm10 1h-3v-1zm-14-4h1l1 1 1 5 1 1v1l-1 2h1l-1 1v1l1 1 2-1v-2h3v1l1 2 1-1v-2h1-8v-2h7l1-1 1-3 1-2-1-1h-10l-1-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#172133",
    fillRule: "evenodd",
    d: "M431 347q11 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M430 365v-1zm5 0v-1zm-3-5h2v1zm4 1v-1h1zm-7-1h2v1zm3-2h2v1zm5 1h-2v-1h2zm-8-1h2v1zm3-3h2v2h-2zm-4 0h3v2h-3zm9 2h-2v-2h3zm-13-4 1 1 2 6h1v1h-1v4l1 1h2v-2h3l-1 1 2 1h1v-2h1v-1h-8v-1h7l1-1 1-4 1-2h-11l-1-2h-1zM229 651q11 1 12 12-1 10-12 12-10-1-12-12 2-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#b01616",
    d: "M227 656h5v4h4v5h-4v4h-5v-4h-4v-5h4zm4 1h-3v4h-4v3h4v5h3v-5h4v-3h-4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#172133",
    fillRule: "evenodd",
    d: "M757 872q11 1 12 11-1 11-12 12-10-1-12-12 2-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m756 890-1-1zm5 0v-1zm-3-5h2v1zm4 1h-1v-1h1zm-7-1h2v1zm3-3h2v2h-2zm5 2h-2v-2h2zm-9-2h3v2h-2v-1zm4-2h2v1h-2zm-4 0h3v1h-3zm9 1h-2v-1zm-13-4 1 1 1 1 2 6 1 1h-1v4l1 1 2-1v-1h3l-1 1 2 1h1v-2l1-1h-8v-1h7l1-1 1-4 1-2-1-1h-11v-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#172133",
    fillRule: "evenodd",
    d: "M678 506q10 1 12 12-1 10-12 11-11-1-12-11 1-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M676 524v-1zm5 0v-1zm-3-5h2v1zm5 1h-2v-1h2zm-7-1h1v1zm2-2h2v1zm5 1h-2v-1h3zm-8-1h2v1zm3-2h2v1zm-4 0h3v1zm10 1h-3v-1h3zm-14-4h1l1 1h1l2 6v1l-1 2 1 1v2h2v-2h3v1l1 1h1l1-2h-1 1v-1h-8v-1h8l1-1 1-4v-2h-11v-1l-1-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M645 423v-7h-3 6-2zm9 2v-2h-5v-7h1v6h3v-6h1v6h1v3zm4-2 3-7h1l3 7h-1l-1-2h-3l-1 2zm2-3h3l-2-4zm6 5v-8 1h1l1-1 1 1 1 1v2l-1 1-1 1h-1v-1h-1zm2-3v-1l1-1-1-1v-1h-2v1l-1 1 1 1zm6 1-1-1-1-1-1-1 1-1 1-1 1-1 1 1h1v2h-4l1 1v1h2v-1h1v1zm-2-3h3v-2h-2v1zm5 3v-6h1v3h3v-3h1v6h-1v-3h-3v3zm8 0-1-1h-1v-2h4l-1-1v-1h-2v1h-1v-1h1l1-1 2 1v5-1h-1zm0-1v-1h1v-1h-3v2zm-276-41v-6h-3v-1h6v1h-2zm9 2v-2h-5v-7h1v6h3v-6h1v6h1v3zm5-2v-7h1v3h1l2-3h1l-2 4 2 3h-1l-2-3h-1zm8 0h-1l-1-1v-3l1-1h3v1l1 2-1 1v1zm0 0 1-1h1v-2l-1-1h-2v3zm3 0v-4h4v5h-1v-4h-2v4h-2m7 0v-5 4h1v-1l2-3h1v5h-1v-4 1zm7 0h-1l-1-1h2zl1-1h1v-1h-2v-1h1l1-1h-4 1l1-1h2v3l1 1-1 1zm6 0h-1l-1-1v-3l1-1h1l2 2v1h-4l1 1zh1l-1 1zm-2-3h4l-1-1h-2zm6 3v-5 4h1v-1l2-3h1v5h-1v-4 1zm2-6h-1l-1-1h1zh1l-1 1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#172133",
    fillRule: "evenodd",
    d: "M272 234q11 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M270 252v-1zm5 0v-1h1zm-3-6h2v1h-2zm5 1h-2v-1zm-7-1h1v1h-1zm2-2h2v2h-2zm5 2h-2v-2h3zm-8-2h2v2h-2zm3-2h2v1h-2zm-4 0h3v1h-2zm10 1h-3v-1zm-14-4 1 1 1 1h1l2 5v2l-1 2h1v3l2-1v-2h3v2l1 1h1l1-2-1-1h1-8v-1l1-1h8l1-4v-2l-1-1h-10v-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M239 267v-7h-2 5-2zm9 2v-2h-5v-7h1v6h4v-6 6h1v3zm7-2v-1h-1v-1h1v1h3v-2h-1l-1-1h-1 1l1-1h1v-1l-1-1h-1l-1 1h-1l1-1h3l1 1v1h-1v1l1 1v2h-1l-1 1zm6 0v-1h-1v-2h4v-1l-1-1h-2v1h-1l1-1 1-1 2 1v1l1 1v3h-1v-1h-1zm0-1v-1h1v-1h-3v2zm9 1-2-1v-3l1-1 1-1 1 1h1v1h-1v-1h-2l-1 1v2l1 1h2v-1h1v1zm4 0v-5h-1v-1h4v1h-2v5zm6 0-1-1-1-1v-2l1-1 1-1 1 1 1 1 1 1h-4v2h2l1-1-1 2zm-1-3h3l-1-1v-1h-2zm5 3v-6h1v3l2-3h1l-2 3 2 3h-1l-1-3h-1zm4 0v-1h1v-3l1-1v-1h3v6h-1v-5h-2v4l-1 1zm9 0-1-1-1-1-1-1 1-1 1-1 1-1 1 1 1 1v2l-1 1zm0-1v-1l1-1-1-1v-1h-2l-1 1v2l1 1zm4 1v-6h1l2 3 1-3h1v6h-1v-5l-1 3h-1l-2-3zm431 641v-6h-2v-1h5v1h-2zm9 2v-2h-5v-7h1v6h4v-6 6h1v3zm5-2v-7h3l1 1h1v3l-1 1h-3v2zm1-3h3v-3h-3zm7 3-1-1v-3l1-1h3l1 1v3l-1 1zm0 0 1-1h1v-2l-1-1h-1l-1 1v2zm6 0-1-1v-3l1-1h3l1 2h-1l-1-1h-1l-1 1v2zl1-1h2l-1 1zm4 0v-5h1zl3-4v5-4l-1 1zm6 0v-5h1v2h2v-2h1v5h-1v-2h-2zm6 0v-5 2h1l2-2h1l-2 3 2 2h-1l-2-2h-1zm6 0v-2l1-1h2v-1h-3l1-1h2l1 1v4h-3m1 0h1v-1h-2l-1 1h1v1zM638 501v-7h5v1h-4v6zm5 0v-5h1v4-1h1l2-3h1v5h-1v-4l-3 4zm6 0v-5h5v5h-1v-5h-3v5zm8 0-1-1v-3l1-1h3l1 1v2h-4l1 1h2v-1h1l-1 1-1 1zm-1-3h3v-1l-1-1h-1v1zm5 5v-7h4l1 1v3l-1 1h-3v-1zm2-3h1l1-1v-2h-1l-1-1v1h-1v2zm6 1h1v-6h5v7h-1v-6h-3v2zm10 0h-1l-1-1v-3l1-1h3v3h-4 1v1zv-1h1v1l-1 1zm-2-3h4l-1-1v-1h-1l-1 1zm6 3v-5 2h3v-2h1v5h-1v-2h-3zm7 0v-5h-2 4-2zm5 0h-1a1 1 0 0 1 0-2v-1h3v-2h-1l-1 1h-1v-1h3l1 1v4-1l-1 1zm0-1v-2h-1l-1 1v1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M121 285h34q3 0 3 2v9q0 2-3 2h-34q-3 0-3-2v-9q0-2 3-2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "M121 285h34q3 0 3 2v9q0 2-3 2h-34q-3 0-3-2v-9q0-2 3-2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#fff",
    d: "M155 285q3 0 3 2v9q0 2-3 2h-34q-3 0-3-2v-9q0-2 3-2z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "m125 295 3-7h1l2 7-1-1h-4zm2-2h3l-2-4zm5-1h3v1zm7 3-1-1v-1l1 1zh1v-2h-3v-1h2v-1h1l-1-1h-2v1h-1v-1l1-1h3v3h-1l2 1v1l-1 1v1h-2m6 0-1-1v-1h1v1zh1v-2h-3v-1h2v-1h1l-1-1h-2v1h-1v-1l1-1h3v3h-1l1 1h1v2l-1 1h-2m5 0v-6h-1 1v-1h1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M252 21h35l2 2v8q0 3-2 3h-35q-2 0-3-3v-8z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "M252 21h35l2 2v8q0 3-2 3h-35q-2 0-3-3v-8z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#fff",
    d: "m287 21 2 2v8q0 3-2 3h-35q-2 0-3-3v-8l3-2z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "m256 31 3-7h1l3 7h-1l-1-2h-3l-1 2zm2-3h3l-2-4zm6 0h3zm6 3-1-1h-1v-1h1v1h3v-2h-2v-1h1v-1h1v-1l-1-1h-1l-1 1h-1l1-1h3l1 1-1 2 1 1v2h-1l-1 1zm7 0h-1l-1-1h-1v-1h1v1h3v-2h-2v-1h1v-1h1v-1l-1-1h-1l-1 1h-1l1-1h3l1 1v1l-1 1 1 1v2h-1zm4 0v-6h-1l1-1h1v7z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M25 473h35q2 0 2 3v8l-2 3H25l-2-3v-8q0-3 2-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "none",
    d: "M25 473h35q2 0 2 3v8l-2 3H25l-2-3v-8q0-3 2-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#fff",
    d: "M60 473q2 0 2 3v8l-2 3H25l-2-3v-8q0-3 2-3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "m30 483 2-7h2l2 7h-1v-1h-4zm1-2h3l-1-4zm6-1h3v1h-3zm7 3h-1l-1-1h2zv-1l1-1h-1v-1h-2v-1h2v-1l-1-1h-1l-1 1v-1l1-1h2v1h1v2l-1 1h1v3zm6 0h-1l-1-1h2zv-1l1-1h-1v-1h-2v-1h2v-2h-2l-1 1v-1l1-1h2l1 1v2l-1 1h1v3zm5 0v-5h-2v-1h2v-1h1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M562 232q11 1 12 12-1 11-12 12-10-1-12-12 2-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m556 247 2 1h10l1-1h1v1h-1l-2 1-11-1zm5 0h2l2 1h-4m-1-10 2 1v4h4l1 2 1 3h-2l-3-2h-2l-2 2h-1v-1l1-4h-1v-1h-2l1-1 3-2zm-1 1-2 1h-1v3h1v4h-1l-2 2 2 1 4 2h4l5-1 1-1v-3h-1v-1l-1-2-3-2h-2v-3h-1v-1l-2-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M649 320q11 1 12 12-1 11-12 12-10-1-11-12 1-10 11-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m643 335 2 1h10l1-1 1 1-1 1h-12l-1-1zm5 1v-2h2l2 1v1zm-1-11 2 2 1 3h4l1 2v3h-2l-3-2-3 2h-2v-1l1-3-1-1-2-1 1-1 3-2zm-1 1-2 1h-1v3l2 1-1 3h-1l-1 2 1 2 4 1h4l5-1h1l1-1-1-2-1-1-1-3-2-2h-3l-1-4-2-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M477 392q11 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M471 407h1l2 1 9-1h1v1l-3 1zm4 0 1-1 1-1 2 1 1 1zm0-10 1 1 1 3 4 1 1 2 1 2h-1l-1 1v-1l-3-2-3 1-1 2-1-1v-5h-1l-1-1 1-1zm-1 0-3 1-1 1 1 2 1 1-1 4-2 1 2 2 4 1h4l4-1h1l1-1v-2h-1l-1-1v-3l-3-2h-2l-2-4h-2z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M637 462q11 1 12 12-1 10-12 12-11-2-12-12 1-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m630 477 2 1h10l2-1v1l-3 1h-8l-2-1zm5 0h1l2 1zm-1-10 2 1 1 4h4l1 2v3h-2l-3-2-3 2h-2v-1l1-4h-1v-1h-1v-1l3-2zm-1 1-2 1h-1v3h2l-1 4h-1l-1 2 1 1 4 2h4l5-1 1-1h1l-1-3h-1v-1l-1-2-2-2h-2l-2-4-2-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M917 505q11 1 12 12-1 10-12 11-10-1-11-11 1-11 11-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m911 520 2 1h10l1-1h1v1h-1l-2 1-10-1zm5 0v-1l2-1 2 1v1zm-1-10 2 1 1 4h4v2l1 2-1 1h-1v-1l-3-2-2 1-1 2-2-1 1-4-1-1-2-1 1-1zm-1 0-2 1-1 1v3h2l-1 4h-1l-1 1 1 2 4 1 3 1 1-1h5l1-1h1l-1-3h-1v-1l-1-3-2-1h-3l-1-4-2-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M726 686q11 2 12 12-2 11-12 12-11-1-12-12 1-10 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m720 701 1 1h10l2-1v1l-3 1h-10l-1-1zm4 0h1l2 1v1zm0-10 1 2 1 3h4l1 2v3h-2q0-2-3-2h-2l-1 2h-2v-1l1-4h-1v-1h-1l1-1 2-2zm-2 1-2 1h-1v3l2 1-1 3h-1l-1 2 1 2 5 1h3l5-1h1l1-1q1-2-1-2l-1-1v-3l-3-2h-2l-1-3-1-1-2-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M626 821q10 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M620 836h1l2 1 8-1h2v1l-3 1-8-1zm4 0 1-1 1-1 2 1v1zm0-10 1 1 1 3 4 1 1 2v2h-1v1l-1-1q0-2-3-2l-2 1-1 2-2-1 1-1v-3l-1-1-1-1 1-1zm-1 0-3 1-1 1v2l2 1-1 4-2 1 1 2 5 1h4l4-1h1l1-1v-2h-2v-4l-3-2h-2l-1-3-1-1-2-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M151 417q11 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M144 432h14v1l-3 1h-8l-2-1zm5 0 1-1 1-1 2 1v1zm-1-10 2 1 1 3 4 1 1 2v2h-1l-1 1v-1q0-2-3-2l-2 1-1 2-2-1v-1l1-3-1-1-1-1 1-1zm-1 0-2 1-1 1v2l2 1-1 4h-1l-1 1 1 2 4 1h4l5-1h1l1-1-1-2h-1v-1l-1-3-2-2h-2l-2-4h-3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M340 471q11 1 12 12-1 10-12 11-11-1-12-11 2-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M334 486h1l2 1q4 1 9-1h1l1 1h-1l-2 1-11-1zm4 0 1-1 2-1 1 1 1 1zm0-10 1 1 1 3 4 1 1 2 1 2-1 1h-1v-1l-3-2-2 1-2 2-1-1v-5h-1l-1-1 1-1zm-1 0-2 1-1 1v2l1 1v4h-1l-2 1 2 2 4 1h4l4-1h2v-3h-1v-1l-1-3-3-2h-2l-1-3h-1l-1-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M299 507v-2l1-1v-6h5v7h1v2h-1v-2h-5zm2-2h3v-6h-3zm8 0h-1l-1-1-1-1 1-2 1-1h2l1 2v1h-4l1 1zv-1h1v1zm-2-3h3v-1h-2zm7 3v-4h-2v-1h4v1h-1zm5 0-1-1v-3l1-1h3v1l1 1h-1l-1-1-2 1v2zl1-1h1l-1 1h-2m4 0v-5h1v2h1l1-2h1l-2 3 2 2h-1l-1-2h-1zm5 0v-5h1zl3-4h1v5h-1v-4 1zm6 0v-5h1zl3-4h1v5h-1v-4 1zm2-6v-1zh1v-1h1v1zm9 6h-1l-1-1v-3l1-1h2l1 1v1h-1v-1h-2v3zv-1h1v1h-2m5 0h-1v-2h1l1-1h2l-1-1h-3 1v-1h3l1 1v4h-3m0 0h1l1-1v-1h-3v1zm4 2v-3h1v-4h3v5h1v2h-1v-2h-4zm1-2h3v-4h-3zm8 0v-7h1l3 6v-6h1v7h-1l-3-5zm6-3h3v1zm2-1h-2v-2h1l1-1 1 1v2zm0 0v-1h-1v2zm6 4v-5h-1v-1h1l1-1v7zm6 0h-2l-1-1v-5h1l2-1 1 1h1v5zm0 0v-5h-2l-1 1v4h1zm4 0 3-6h-4v-1h5v1zm74-77v-3h1v-1l1-1v-4h4v6h1v3h-1v-2h-5v2zm2-3h3v-5h-2l-1 3zm8 1h-1l-1-1v-3l1-1h2l1 1 1 1v1h-4v1zh2l-1 1h-2m-1-3h3v-1h-3zm6 3v-4h-2v-1h5v1h-2zm6 0h-2v-1l-1-2 1-1v-1h3l1 1h-3l-1 1v1l1 1zh1zm3 0v-5h1v2h1l1-2h1l-1 2 2 3h-1l-2-2h-1zm5 0v-5h1v4l1-1 2-3h1v5h-1v-4 1l-3 3zm6 0v-5h1v4l1-1 2-3h1v5h-1v-4 1l-3 3zm3-6h-1l-1-1h4l-1 1zm8 6-1-1v-3l1-1h3v1h1-3l-1 1v1zh3-1l-1 1zm5 0v-3h3v-1h-3l1-1h2l1 1v4h-1v-1 1h-2m1-1v-1h-2l-1 1h2m3 3v-3h1v-4h4v7-2h-4zm1-3h3v-3h-2v3zm8 1v-7h1l4 6v-6h1v7h-1l-4-6zm7-3h3zm1-1v-3h2v1l1 1h-1zm0-1h-2zm7 5v-6h-2 1l1-1zm5 0h-1l-1-1-1-1v-3l1-1 1-1h2l1 1 1 1v3l-1 1zm0-1v-1h1v-2l-1-1v-1h-2l-1 1v3zm6 1h-1l-1-1h4v-2l-2-1v1h-2v-4h5v1h-4v2h3l1 1v2l-1 1zm54 31v-2l1-1v-2l1-2v-2h4v7h1v2h-1v-2h-5v2zm2-2h3v-6h-3zm8 0h-1l-1-1v-3l1-1h1l2 1v1l1 1h-4v2zv-1h1v1h-2m-1-3h3l-1-1h-2zm6 3v-4h-2v-1h5v1h-2zm6 0h-2v-1l-1-1 1-2v-1h3l1 1v1h-1v-1h-2l-1 1v2h1zv-1h1v1zm3 0v-5h1v2h1l1-2h1l-1 3 2 2h-1l-2-2h-1zm5 0v-5h1v4h1l2-4h1v5h-1v-4 1l-3 3zm6 0v-5h1v4h1l2-4h1v5h-1v-4 1l-3 3zm3-6h-2v-1h1zv1zm8 6h-1l-1-1v-3l1-1h2l1 1 1 1h-1l-1-1h-2v3zh1l1-1h1l-1 1zm5 0v-2l1-1h2v-1h-3l1-1h2l1 1v4h-3m0 0h1l1-1v-1h-2l-1 1zm4 2v-2l1-1v-4h4v7-2h-4zm1-2h3v-4h-2v3zm31 267v-3h1v-1l1-1v-4h4v6h1v3h-1v-2h-5v2zm2-3h3v-5h-2l-1 2zm8 1h-1l-1-1v-3l1-1h3l1 1v2h-4v1zh2-1l-1 1zm-1-3h3l-1-1-1-1-1 1zm6 3v-5h-2 5-2zm6 0h-2v-1l-1-2 1-1v-1h4v1h-1l-1-1-1 1h-1v2l1 1zv-1h1v1zm3 0v-5h1v2h1l1-2h1l-1 2 2 3h-1l-2-2h-1zm5 0v-5h1v4-1h1l2-3h1v5h-1v-4l-3 4zm6 0v-5h1v4-1h1l2-3h1v5h-1v-4l-3 4zm3-6h-1l-1-1h4-1zm8 6-1-1v-3l1-1h3l1 1h-2l-1-1v1h-1v2l1 1h1l1-1h1l-1 1-1 1zm5 0v-3h3v-1l-1-1h-1v1h-1v-1h3l1 1v4h-1v-1 1h-2m1-1v-1h-3l1 1zm3 3v-3h1v-4h4v7-2h-4zm1-3h3v-4h-2v4zm8 1v-7h1l4 6v-6h1v7h-1l-4-6zm7-4h3v1h-3zm1 0v-3h2v1h1l-1 1zm0-1v-1h-2zm6 5 3-6h-4v-1h5v1zm7 0h-1l-1-1v-1h1zh1v-1h1v-2l-1 1h-2l-1-1v-2l1-1h2l1 1 1 1v3l-1 1-1 1zm0-3 1-1-1-1h-2l-1 1 1 1zm111-175v-3h1v-6h5v7h1v2h-1v-2h-5zm1-2h4v-6h-3v3zm9 0h-2l-1-1v-1l1-2v-1h3l1 1v2h-4v1h1zh1v1zm-2-3h3l-1-1h-1zm6 3v-4h-1v-1h4v1h-2v4zm6 0h-1l-1-1v-3l1-1h2l1 2-1-1h-2v3zl1-1h1v1zm4 0v-5 2h1l2-2h1l-2 3 2 2h-1l-2-2h-1zm5 0v-5h1zl3-4v5-4l-1 1zm6 0v-5h1zl3-4v5-4l-1 1zm2-6h-1l-1-1zv-1h1v1h-2m9 6h-2v-1l-1-1 1-2 1-1h2l1 1v1h-1v-1h-2l-1 1v2h1zh1v1zm5 0h-1v-2h1v-1h3l-1-1h-3l1-1h3v5h-2m0 0 1-1h-3v2zm3 2v-2l1-1v-4h4v5h1v2h-1v-2h-4v2zm2-2h2v-4h-2zM588 859v-3h1v-6h5v6h1v3h-1v-2h-5zm1-3h4v-5h-3v5zm9 1h-2v-1l-1-1 1-2v-1h3l1 2v1h-4v1h4v1zm-2-3h3v-1h-3zm6 3v-4h-1v-1h4v1h-2v4zm6 0h-1l-1-1v-3l1-1h2l1 1h-2l-1 1v2zh2v1h-2m4 0v-5 2h1l2-2h1l-2 2 2 3h-1l-2-2h-1zm5 0v-5h1v4-1l3-3v5-4h-1v1zm6 0v-5h1v4-1l3-3v5-4h-1v1zm2-6h-1v-1zh1l-1 1zm9 6h-2v-1l-1-1 1-2 1-1h2l1 1h-3l-1 1v1l1 1zh1v1zm5 0-1-1v-1l1-1h3l-1-1h-3l1-1h3v5-1l-1 1zm0-1 1-1h-3v1zm3 3v-3h1v-4h4v4h1v3h-1v-2h-4v2zm2-3h2v-3h-2zm7 1v-7h2l3 6v-6h1v7h-1l-4-6v6zm7-3h3zm2-1h-1l-1-1v-1l1-1h1l1 1v1zm0-1h-1v1zm8 5h-2v-1l-1-1v-3l1-1 2-1h1l1 2h-1v-1h-3v3-1h3l1 1v1zm0-1v-2h-1v-1l-1 1h-1v2h2m4 1v-5h-1v-1h1l1-1v7zM120 454v-3h1v-6h5v6h1v3h-1v-2h-5zm2-3h3v-6h-3zm8 1-1-1-1-1-1-1 1-1 1-1 1-1 2 1v2h-4l1 1v1h2v-1h1zm-2-3h3v-2h-2v1zm7 3v-5h-2v-1h4v1h-1zm5 0-1-1v-2l1-1 2-1 1 1 1 1h-1l-1-1h-1l-1 1v2l1 1h1l1-1h1l-1 1-1 1zm4 0v-6h1v3h1l1-3h1l-2 3 2 3h-1l-1-3h-1zm5 0v-6h1v4l3-4h1v6h-1v-4h-1zm6 0v-6h1v4l3-4h1v6h-1v-4zm2-6v-1h1v1h1v-1h1v1l-1 1zm9 6-1-1-1-1v-2l1-1 1-1 1 1 1 1h-1v-1h-2v4h2v-1h1v1l-1 1zm5 0-1-1h-1v-1l1-1h3v-1l-1-1h-1l-1 1h-1l1-1 2-1 1 1v1l1 1v3h-1v-1h-1zm0-1h1l1-1v-1h-2l-1 1zm4 2v-3l1-1v-3h3v5h1v2h-1v-1h-4zm1-2h3v-4h-3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M289 162q11 1 12 12-1 10-12 11-11-1-12-11 2-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M283 177h1l2 1q4 1 9-1h2v1h-1l-2 1h-9l-2-1zm4 0 1-1 2-1 1 1 1 1zm0-10 1 1 1 3 4 1 1 2 1 2-1 1h-1v-1l-3-2-2 1-2 2-1-1v-5h-1l-1-1 1-1zm-1 0-2 1-1 1v2l1 1v4h-1l-2 1 2 2 4 1h4l4-1h2v-3h-1v-1l-1-3-3-2h-2l-1-3-2-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M238 196v-3h1v-6h5v6h1v3h-1v-2h-5zm2-3h3v-5h-3zm8 1h-2v-1l-1-2 1-1v-1h3l1 1v2h-4l1 1zh2zm-2-3h3v-1l-1-1-1 1zm7 3v-5h-2 4-2zm5 0h-1l-1-1v-3l1-1h2l1 1h-1l-1-1-1 1v3zh1l1-1h1l-1 1-1 1zm4 0v-5 2h1l2-2h1l-2 2 2 3h-1l-1-2h-2zm5 0v-5h1v4-1l3-3h1v5h-1v-4h-1zm6 0v-5h1v4-1l3-3h1v5h-1v-4h-1zm2-6v-1zh2l-1 1zm9 6h-1l-1-1-1-2 1-1 1-1h3v1h-1l-1-1-1 1v3zv-1h1v1zm5 0a1 1 0 0 1-1-2l1-1h3v-1h-1l-1-1-1 1h-1l1-1h3v1l1 1v3h-1v-1l-1 1zm0-1h1v-1h-3zm3 3v-3h1v-2l1-1v-1h3v4h1v3h-1v-2h-4v2zm2-3h2v-4h-2zm8 1v-7h1l3 6v-6h1v7h-1l-4-6zm6-4h3v1h-3zm2 0h-1l-1-1v-1l1-1h1l1 1zm0-1h-1v1zm6 5v-6h-1l1-1h1v7zm5 0h-1v-1l-1-1h1l1 1zh1v-2h-3v-1h2v-2h-2v1h-1v-1l1-1h3v3h-1l1 1 1 1-1 1v1zm7 0v-1h-3v-1l3-5h1v5h1v1h-1v1zm-2-2h2v-4zm201 38v-4h1v-5h4v6h1v3h-1v-2h-5zm1-3h4v-6h-3v4zm9 1-2-1-1-1v-2l2-2 2 1 1 1v1h-4v1l1 1h2v-1h1l-1 1zm-2-3h3l-1-2h-1l-1 1zm6 3v-5h-2v-1h5v1h-2v5zm6 0-1-1-1-1-1-1 1-1 1-1 1-1h1l1 1v1h-1v-1h-2v4h2v-1h1zm3 0v-6h1v3h1l2-3h1l-2 3 2 3h-1l-2-3h-1v3zm6 0v-6 4h1l2-4h1v6h-1v-4zm6 0v-6 4h1l2-4h1v6h-1v-4zm2-6-1-1-1-1h1v1h2v-1h1v1zm9 6-2-1-1-1v-2l1-1 2-1h1v1l1 1h-1l-1-1h-1l-1 1v2l1 1h1l1-1h1l-1 1zm5 0-2-1v-2h3v-2h-2v1h-1v-1h1l1-1 1 1h1v5l-1-1zm0-1v-2h-2v2zm3 2v-2h1v-5h4v5h1v2h-1v-1h-4zm1-2h3v-4h-2v3zm15 130v-3h1v-2l1-2v-2h4v6h1v3h-1v-2h-5v2zm2-3h3v-5h-3zm8 1h-1l-1-1v-3l1-1h3v1l1 1v1h-4v1zl1-1-1 2zm-1-3h3l-1-1-1-1-1 1zm6 3v-5h-2 5-2zm6 0h-2l-1-1v-3l1-1h3l1 1h-1l-1-1-1 1h-1v2l1 1zh1v-1h1l-1 1zm3 0v-5h1v2h1l1-2h1l-1 2 2 3h-1l-2-2h-1zm5 0v-5h1v4-1h1l2-3h1v5h-1v-4l-3 4zm6 0v-5h1v4-1h1l2-3h1v5h-1v-4l-3 4zm3-6h-2v-1h3zm8 6h-1l-1-1v-3l1-1h3l1 1h-2l-1-1-1 1v3zh1l1-1h1l-1 1-1 1zm5 0v-1l-1-1h1v-1h3v-1l-1-1h-1v1h-1v-1h3l1 1v4h-1v-1 1zm0-1h2v-2h-1l-1 1h-1zm4 2v-2h1v-4h4v6-1h-4zm1-2h3v-4h-2v3zm8 1v-7h1l4 6v-6h1v7h-2l-3-6zm7-4h2v1h-2zm1 0v-3h2v2zm0-1v-1h-1v-1 1h-1zm8 5h-1l-1-1-1-1h1l1 1h2v-1l1-1v-1l-1 1h-3v-1l-1-1 2-2h2l1 1v5l-1 1zm0-3v-2h-2l-1 1 1 1zm6 3h-1l-1-1v-1h1v1zh1l1-1v-2l-1 1h-2l-1-1v-2l1-1h2l1 1 1 1v3l-1 1-1 1zm0-3 1-1a1 1 0 0 0-2-1h-1v2z"
  }))), _mask40 || (_mask40 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__P",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g40 || (_g40 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__P)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__Q",
    width: 24,
    height: 23,
    x: 815,
    y: 337,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M815 361h24v-24h-24z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__Q)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M827 338q11 1 12 11-1 11-12 12-11-1-12-12 2-10 12-11"
  })))), _mask41 || (_mask41 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__R",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g41 || (_g41 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__R)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__S",
    width: 16,
    height: 15,
    x: 819,
    y: 341,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M819 356h17v-15h-17z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__S)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M821 353h1l2 1 9-1h1q2 0 0 0v1h-13zm4 0 1-2h2l1 1 1 1zm0-10 1 1q2 2 1 3l4 1 1 1 1 3h-2l-3-2h-2l-2 2h-1v-5h-1l-1-1 1-1zm-1 0-2 1h-2l1 3 1 1v4h-1l-2 1 2 2 4 1h4l4-1h1l1-1v-2h-1v-1l-1-3-3-2h-2l-1-3-1-1-1-1h-1z"
  })))), _mask42 || (_mask42 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__T",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g42 || (_g42 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__T)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M804 321v-7h5v1h-4v2h3l1 1v2h-1l-1 1zm1-1h3v-2h-3zm6 3h1v-1l-2-5h1l2 4 1-4h1l-1 4-1 1v1l-1 1zm4 0v-3h1v-3l1-1h3v4h1v3h-1v-2h-4v2zm2-3h2v-4h-2zm5 3 1-1-3-5h1l2 4 2-4h1l-2 4v1l-1 1v1h-2m12 0v-2h-7v-5h1v4h2v-4h1v4h2v-4h1v4h1zm2-2v-5h1v4-1l2-3h1v5h-1v-4zm6 0v-5h1v4-1l3-3v5-4h-1zm2-6h-1l-1-1h4l-1 1zm-48 20v-4l1-1v-2h3v4h1v3h-1v-2h-4zm1-3h3v-3h-3zm7 1h-1l-1-1v-3l1-1h2l1 1 1 1v1h-4v1zh2l-1 1h-2m-1-3h3v-1h-3zm6 3v-4h-2v-1h5v1h-2zm6 0h-2v-1l-1-1 1-2v-1h3l1 1h-3l-1 1v2h1zh1v1zm3 0v-5h1v2h1l2-2-1 2 2 3h-1l-2-2h-1zm5 0v-5h1v4l1-1 2-3h1v5h-1v-4 1l-3 3zm6 0v-5h1v4l1-1 2-3h1v5h-1v-4 1l-3 3zm3-6h-1l-1-1h1zh1l-1 1zm8 6-1-1v-3l1-1h3v1h1-3l-1 1v2zl1-1h2l-1 1zm5 0v-3h3v-1h-3l1-1h2l1 1v4h-3m1 0h1v-1h-2l-1 1h1zm3 2v-3h1v-4h4v4h1v3h-1v-2h-4zm1-3h3v-3h-2v3z"
  }))), _mask43 || (_mask43 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__U",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g43 || (_g43 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__U)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__V",
    width: 24,
    height: 23,
    x: 886,
    y: 390,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M886 413h24v-23h-24z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__V)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M898 390q11 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  })))), _mask44 || (_mask44 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__W",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g44 || (_g44 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__W)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__X",
    width: 16,
    height: 15,
    x: 890,
    y: 393,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M890 408h17v-15h-17z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__X)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M892 405h1l2 1 8-1h2v1l-3 1zm4 0 1-1 1-1 2 1 1 1zm0-10 1 1 1 3 4 1 1 2v2l-1 1-1-1q0-2-3-2l-2 1-1 2-2-1 1-1v-4h-1l-1-1 1-1zm-1 0-3 1-1 1 1 2 1 1-1 4-2 1 1 2 5 1h4l4-1h1l1-1v-2h-2v-4l-3-2h-2l-2-4-1-1-1 1z"
  })))), _mask45 || (_mask45 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__Y",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g45 || (_g45 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__Y)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#f1f3f3",
    fillRule: "evenodd",
    d: "M880 314q11 1 12 11-1 11-12 12-11-1-12-12 1-10 12-11"
  }))), _mask46 || (_mask46 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__Z",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g46 || (_g46 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__Z)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M860 297v-7h5v1h-4v2h3l1 1v2l-1 1zm1-1h3v-2h-3zm6 3h1v-1l-2-5h1l2 4 1-4h1l-1 4v1h-1v1zm5 0v-3l1-1v-3h3v4h1v3h-1v-2h-4zm1-3h3v-4h-2l-1 2zm5 3h2v-1l-2-5h1l1 4 2-4h1l-2 4v1l-1 1v1h-2m12 0v-2h-6v-5 4h2v-4h1v4h2v-4h1v4h1zm2-2v-5h1v4-1l3-3h1v5h-1v-4h-1zm6 0v-5h1v4-1l3-3h1v5h-1v-4h-1zm2-6v-1zh1l-1 1zm-26 18h-2l-1-1v-3l1-1h2v-1h1v1h2l1 1v3l-3 1zm-1-2v-3h-2l-1 1v1zm2 0h1l1-1v-2h-2zm7 2h-2l-1-1v-4l1-1 2-1 2 1 1 1 1 2-1 2-1 1zm0-1h2l1-1v-2l-1-1-1-1h-2l-1 1v3l1 1zm5 1v-7h1v3h1l2-3h1l-2 4 2 3h-1l-2-3h-1z"
  }))), _mask47 || (_mask47 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__aa",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g47 || (_g47 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__aa)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ab",
    width: 24,
    height: 23,
    x: 920,
    y: 350,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M920 373h24v-23h-24z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ab)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#172133",
    fillRule: "evenodd",
    d: "M932 350q11 1 12 12-1 10-12 11-11-1-12-11 2-11 12-12"
  })))), _mask48 || (_mask48 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ac",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g48 || (_g48 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ac)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M873 373v-7h5v1h-4v2h3l1 1v2l-1 1zm1-1h3v-2h-3zm5 3h2v-1l-2-5h1l2 4 1-4h1l-1 4-1 1v1l-1 1h-2m5 0v-3h1v-4h4v4h1v3h-1v-2h-4v2zm2-3h2v-3h-2zm5 3 1-1-3-5h1l2 4 2-4h1l-2 4v1l-1 1v1h-2m12 0v-2h-7v-5h1v4h2v-4h1v4h2v-4h1v4h1zm2-2v-5 4l1-1 2-3h1v5h-1v-4 1zm6 0v-5h1v4-1l2-3h1v5h-1v-4 1zm2-6h-1l-1-1h4v1zm-48 20v-4h1v-3h3v5h1v2h-1v-2h-4zm1-2h3v-4h-3zm7 0h-1l-1-1v-3l1-1h2l1 1 1 1v1h-4v1zv-1h2l-1 1h-2m-1-3h3v-1h-3zm6 3v-4h-2v-1h5v1h-2zm6 0h-2v-1l-1-1 1-2v-1h3l1 1v1h-1v-1h-2l-1 1v2h1zh1v1zm3 0v-5h1v2h1l1-2h1l-1 3 2 2h-1l-2-2h-1zm5 0v-5h1v4h1l2-4h1v5h-1v-4 1l-3 3zm6 0v-5h1v4h1l2-4h1v5h-1v-4 1l-3 3zm3-6h-1l-1-1h1zh1l-1 1zm8 6-1-1v-3l1-1h3v1l1 1h-1l-1-1h-1l-1 1v2zl1-1h2l-1 1zm5 0v-2l1-1h2v-1h-3l1-1h2l1 1v4h-3m1 0h1v-1h-2l-1 1h1v1zm3 2v-3h1v-4h4v7-2h-4zm1-2h3v-4h-2v3z"
  }))), _mask49 || (_mask49 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ad",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g49 || (_g49 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ad)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ae",
    width: 24,
    height: 23,
    x: 760,
    y: 482,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M760 506h24v-24h-24z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ae)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M772 482q11 1 12 12-1 11-12 12-11-1-12-12 1-10 12-12"
  })))), _mask50 || (_mask50 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__af",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g50 || (_g50 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__af)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ag",
    width: 18,
    height: 12,
    x: 763,
    y: 488,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M763 500h18v-12h-18z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ag)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m768 494 4 2 5-2v3l-5 2-3-1-1-1zm11-2-7 3-6-3 5-2h4l1 1zm-15 0v3l-1 2 1 1v-1l1 1 1-1-1-2zl2 1v4l5 2 3-1 3-1v-4l3-2h-1l-8-4z"
  })))), _mask51 || (_mask51 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ah",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g51 || (_g51 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ah)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M909 332v-7h5v1h-4v2h3l1 1v2h-1v1zm1-1h3v-2l-1-1h-2zm6 3h1v-1l-2-5h1l2 4 1-4h1l-1 4h-1v2zm5-1v-4l1-1v-1h3v4h1v2h-1v-1h-4zm1-2h3v-4h-3zm5 3 1-1-3-5h1l2 4 2-4h1l-2 4v1l-1 1v1h-2m12-1v-1h-6v-5 4h2v-4h1v4h2v-4h1v4h1zm2-1v-5h1v4-1l3-3v5-4h-1zm6 0v-5h1v4-1l3-3v5-4h-1zm2-6-1-1h-1 4l-1 1zm-25 20v-3l1-1v-5h4v6h1v3h-1v-2h-5zm1-3h4v-5h-3v4zm6 1v-7h1v3h1l3-3h1l-3 3 3 4h-1l-3-3h-1v3z"
  }))), _mask52 || (_mask52 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ai",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g52 || (_g52 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ai)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "m873 331 1 2h-1zm-1-3v-1l5 5-1 1zm1-2 1-1h1l5 5v2l-1-1zm6 2-2-1 4-4 1 1zm0-8 2 1 4 4v2h-1l-4-4-1-1zm6-1h1v1zm-3 0 4 4v1l-1 1zm-1 0-1 1-1 1 1 2h1l1 1-4 3-2-2-2 1v2l-1 1v1l1 1-1 1 1 1 1 1 1-1 2 1 1-1h2l1-1-1-2-1-1 4-3 1 1 1 1 1-1 1-1v-1l1-2-2-1 1-1v-1l-1-1-2 1v-1h-1z"
  }))), _mask53 || (_mask53 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__aj",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g53 || (_g53 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__aj)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M926 367h13zm5-11q1 3 2 0zm7 5v5zm-5 0 1-1h2l1 1v5h-4zm-1 0v5h-1zm-4 0h2v6h-3zm-1 0v5zm12-1h-2zm-13 0h2zm5 0h2zm-5-1h13zm6-4 6 3h-11zm-7 3v2l1 1v5l-1 2h14v-10l-1-1-5-3-2 1-5 3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M822 82v-7zh3v-6h1v6h3v-6h1v7zm9 0v-5h1v2h1l1-2h1l-1 2 2 3h-1l-2-2h-1zm8 0h-2l-1-1v-3l1-1h3l1 1v3zm0-1v-3l-1-1-1 1h-1v2l1 1zm3 1 1-1v-3h4v5h-1v-5h-2v2l-1 1v2zm8 0h-2v-3h3v-1l-1-1h-1v1h-1v-1h3l1 1v4h-1v-1zm0-1v-1h-2v1zm-29 32v-3h1v-6h5v6h1v3h-1v-2h-5zm1-3h4v-5h-3v4zm9 1h-2v-1l-1-2 1-1v-1h3l1 1v2h-4l1 1zh2zm-2-3h3v-1l-1-1-1 1zm7 3v-5h-2 4-2zm5 0h-1l-1-1v-3l1-1h3v1h-1l-1-1-1 1v3zh1l1-1v1l-1 1zm4 0v-5 2h1l2-2h1l-2 2 2 3h-1l-2-2h-1zm5 0v-5h1v4-1l3-3h1v5h-1v-4h-1zm6 0v-5h1v4-1l3-3h1v5h-1v-4h-1zm2-6v-1zh1l-1 1zm9 6h-1l-1-1-1-2 1-1 1-1h3v1h-1l-1-1-1 1h-1v2l1 1zv-1h1zm5 0-1-1v-1l1-1h3v-1h-1l-1-1-1 1h-1l1-1h3v1l1 1v3h-1v-1l-1 1zm0-1 1-1h-3zm3 3v-3h1v-4h4v4h1v3h-1v-2h-4v2zm2-3h2v-4h-2zm-54 30v-6h-2v-1h5v1h-2zm6 0h-2v-1l-1-2 1-1v-1h3l1 1v3l-1 1zm0-1v-1l1-1-1-1-1-1-1 1h-1v2l1 1zm4 3v-7 1l1-1h3v1l1 1-1 2v1h-3l-1-1zm2-3h1l1-1v-2h-1l-1-1-1 1-1 1 1 1zm4 1v-5h3v1h-2zm6 0-1-1v-3l1-1h3l1 1v3l-1 1zm0-1h1l1-1v-2h-1l-1-1v1h-1v2zm4 1v-5h4v3h1l-1 1v1zm1-1h3v-1h-3zm0-2h1v-1h-2zm5 3v-5h1v2h2v1h1l-1 1v1zm1-1h1v-1h-1l-1-1zm3-4h1v5h-1zm3 5v-5 4l1-1 2-3h1v5h-1v-4 1zm2-6h-1l-1-1h4zm11 8v-2h-5v-5h1v4h3v-4h1zm4-2h-2l-1-1v-3l1-1h3l1 1v2h-4v1h4-1zm-2-3h3v-1h-1v-1l-1 1zm5 3v-5h1v2h3v-2 5-2h-3zm7 0v-4h-2v-1h5v1h-2zm4 2v-7 1l1-1h2l1 1v3l-1 1h-2l-1-1zm2-3v-3l-1-1-1 1-1 1 1 1zm-73 30v-7h4v1h-4v2h4v1l1 1-1 1v1zm0-1h4v-2h-4zm8 1h-1l-1-1v-3l1-1h3l1 1v3l-1 1zm0-1h1l1-1v-2h-3v3zm3 1v-3l1-1h3v5h-1v-4h-2v1l-1 3zm7 0v-5 2h3l1 1-1 2zm0-1h2v-1h-3zm5 1v-5h1v2h2v-2h1v5h-1v-2h-2zm6 0v-5 4h1v-1l2-3h1v5h-1v-4 1zm10 2v-2h-4v-5 4h3v-4h1v4h1zm3-2h-1l-1-1 1-1v-1h3v-1h-3v-1h3l1 1v4h-1v-1l-1 1zm0-1h2v-1h-3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M796 96q11 2 12 12-1 11-12 12-10-1-12-12 2-10 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m790 111 1 1h11l1-1 1 1h-1l-2 1h-11l-1-1zm4 0 1-1h2l1 1h1l-1 1zm0-10 1 2q2 2 1 3h4l1 2 1 3h-2l-3-2a3 3 0 0 0-4 2h-1v-5q1 0 0 0l-1-1h-1l1-1 3-2zm-1 1-2 1h-1v3l1 1v3h-1l-2 2 2 1 4 2h4l4-1 1-1h1v-3h-1v-1l-1-2-3-2h-2l-1-4-2-1h-1z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M796 68q11 1 12 12-1 10-12 12-10-1-12-12 2-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m792 80 5 2 4-2v3l-4 2-4-2h-1zm11-2-6 3-7-3 5-2h5zm-15 0v3l-1 2h3l-1-2v-2h2v5l6 2 2-1 3-1v-5l3-1-1-1-7-3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#172133",
    fillRule: "evenodd",
    d: "M796 125q11 1 12 12-1 11-12 12-10-2-12-12 2-10 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "M794 144v-1zm6 0v-1zm-3-6h2v1h-2zm4 1h-1v-1zm-7-1h2v1h-2zm3-2h2v1h-2zm5 1h-2v-1zm-9-1h3v1h-2zm4-2h2v1h-2zm-4 0h3v1h-3zm9 1h-2v-1zm-13-4h1v1l2 5v1h1l-1 1v4h2l1-2h-1 4l-1 1 2 2 1-1v-3h-7v-1h7l1-1 1-3 1-2-1-1h-11v-1l-1-1zm7 24q11 2 12 12-1 11-12 12-10-1-12-12 2-11 12-12"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#b01616",
    d: "M794 160h5v5h4v5h-4v4h-5v-4h-5v-5h5zm4 1h-3v4h-5v4h5v4h3v-4h4v-4h-4z"
  }))), _mask54 || (_mask54 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ak",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g54 || (_g54 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ak)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__al",
    width: 24,
    height: 24,
    x: 659,
    y: 96,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M659 120h24V96h-24z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__al)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#7c030c",
    fillRule: "evenodd",
    d: "M671 96q11 1 12 12-1 10-12 12-11-2-12-12 2-11 12-12"
  })))), _mask55 || (_mask55 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__am",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g55 || (_g55 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__am)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__an",
    width: 16,
    height: 15,
    x: 663,
    y: 100,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M663 115h17v-15h-17z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__an)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m665 111 1 1h11l1-1v1q2 0 0 0l-2 1h-11l-1-1zm4 0 1-1h2l1 1h1l-1 1zm0-10 1 2q2 2 1 3h4l1 2 1 3h-2l-3-2h-2l-2 2h-1v-5q1 0 0 0l-1-1h-1l1-1 3-2zm-1 1-2 1h-1v3l1 1v3h-1l-2 2 2 1 4 2h4l4-1 1-1h1v-3h-1v-1l-1-2-3-2h-2l-2-4-1-1h-1z"
  })))), _mask56 || (_mask56 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ao",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g56 || (_g56 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ao)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M691 105v-7h5-4v3h4v1l1 1-1 1-1 1zm1-1h3l1-1v-1h-1l-1-1h-2zm6 3 1-1-3-6h1l2 5 2-5h1l-2 5-1 1v1l-1 1zm5-1v-2l1-1v-4h4v7-1h-4zm1-2h3v-4h-2v3zm6 3h1v-1l-2-6h1l2 5 1-5h1l-1 5h-1v2zm11-1v-1h-6v-6h1v5h2v-5h1v5h2v-5h1v7zm2-1v-6h1v4l3-4h1v6h-1v-4zm6 0v-6h1v4l3-4h1v6h-1v-4zm3-6-2-1v-1h1v1zl1-1v1zm-41 20v-3l1-1v-3h4v7h-1v-2h-3zm1-3h3v-4h-2v3zm7 1-1-1v-3l1-1h3l1 1v2h-4zh2-1l-1 1zm-1-3h3v-1a1 1 0 0 0-2-1v1zm6 3v-5h-2 5-2v5zm6 0h-1l-1-1-1-2 1-1 1-1h3v1h-1l-1-1-1 1v3zv-1h1v1zm3 0v-5h1v2h1l2-2h1l-2 2 2 3h-1l-2-2h-1v2zm6 0v-5 4l1-1 2-3h1v5h-1v-4zm6 0v-5 4l1-1 2-3h1v5h-1v-4zm2-6h-1l-1-1h4-1zm9 6h-2l-1-1v-3l1-1h3l1 1h-2v-1l-1 1h-1v2l1 1zl1-1h1l-1 1zm5 0h-2v-3h3v-1l-1-1-1 1h-1v-1h3l1 1v4h-1v-1zm0-1v-1h-2v1zm3 3v-3h1v-4h4v4h1v3h-1v-2h-4zm1-3h3v-4h-2v4z"
  }))), _mask57 || (_mask57 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ap",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g57 || (_g57 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ap)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__aq",
    width: 24,
    height: 24,
    x: 659,
    y: 68,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M659 92h24V68h-24z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__aq)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "M671 68q11 1 12 12-1 10-12 12-10-1-12-12 2-11 12-12"
  })))), _mask58 || (_mask58 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ar",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g58 || (_g58 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ar)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__as",
    width: 18,
    height: 12,
    x: 662,
    y: 74,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M662 86h18V74h-18z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__as)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    fillRule: "evenodd",
    d: "m667 80 5 2 4-2v3l-4 2-4-2h-1zm11-2-6 3-7-3 5-2h5zm-15 0v3l-1 2h3l-1-2zl2 1v5l6 2 2-1 3-1v-5l3-1-1-1-7-3z"
  })))), _mask59 || (_mask59 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__at",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g59 || (_g59 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__at)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M691 165v-7h5-4v3h4l1 1-1 1v1l-1 1zm1-1h3v-1h1l-1-1v-1h-3zm6 3h1l1-1-3-6h1l2 5 2-5h1l-2 5-1 1v1l-1 1zm5-1v-2l1-1v-4h4v7-1h-4zm1-2h3v-4h-2v3zm6 3h1v-1l-2-6h1l2 5 1-5h1l-1 5h-1v2h-1zm11-1v-1h-6v-6h1v5h2v-5h1v5h2v-5h1v7zm2-1v-6h1v4l3-4h1v6h-1v-4zm6 0v-6h1v4l3-4h1v6h-1v-4zm3-6-2-1v-1h1v1zv-1h1v1zm-38 18v-1h-1l-1-1-1-1v-2l1-1 2-1v-1h1v1h1l1 1 1 1v2l-1 1-1 1h-1v1zm0-2v-4h-1l-1 1v2l1 1zm1 0h1v-1l1-1-1-1v-1h-2zm8 2-2-1-1-1-1-2 1-1 1-2h4l1 2v3l-1 1zm0-1h1l1-1v-3l-1-1h-3v1l-1 1 1 2zm5 1v-7 3h2l2-3h1l-3 3 3 4h-1l-2-3h-2z"
  }))), _mask60 || (_mask60 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__au",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g60 || (_g60 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__au)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#f1f3f3",
    fillRule: "evenodd",
    d: "M671 155q11 2 12 12-1 11-12 12-11-1-12-12 2-10 12-12"
  }))), _mask61 || (_mask61 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__av",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g61 || (_g61 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__av)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#3b5f77",
    fillRule: "evenodd",
    d: "m664 173 1 1v1h-1zm0-3h1l4 4-1 1zm0-2 1-1 1-1v1l5 4v2h-1zm6 1-1-1 3-3 2 1zm0-7q1-2 2 1l5 4-1 2-1-1-4-3-1-1zm6-1 1 1v1h-1zm-3 0 1-1 4 4v1zm0-1h-1l-1 1h-1v1l1 1v1h1l-4 4-1-2q-1-1-3 1v1l-1 2 1 1v3h2l2 1 2-1h1l1-1 1-1-1-1-2-1 4-4 2 2h2v-2l1-2-1-1 1-2-1-1h-1l-1 1-1-1-1-1z"
  }))), _mask62 || (_mask62 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__aw",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g62 || (_g62 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__aw)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#2c2e35",
    d: "M691 134v-7h5-4v2h2l1 1h1l1 1-1 1v1h-1l-1 1zm1-1h3l1-1v-1l-1-1h-3zm6 3h1v-1h1l-3-6h1l2 5 2-5h1l-2 4v2l-1 1-1 1zm5-1v-2l1-1v-4h4v7-1h-4zm1-2h3v-4h-2v3zm6 3 1-1-2-6h1l2 5 1-5h1l-1 4-1 1v2zm11-1v-1h-6v-6h1v5h2v-5h1v5h2v-5h1v7zm2-1v-6h1v4l3-4h1v6h-1v-4zm6 0v-6h1v4l3-4h1v6h-1v-4l-3 4zm3-6-2-1v-1h1v1h1l1-1v2zm-41 20v-3h1v-6h5v9-2h-5zm1-3h4v-5h-3v4zm7 1v-7 3h2l2-3h1l-3 3 3 4h-1l-2-3h-2z"
  }))), _mask63 || (_mask63 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ax",
    width: 956,
    height: 935,
    x: 1,
    y: 0,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M1 935h956V0H1z"
  }))), _g63 || (_g63 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ax)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "mapImage_svg__ay",
    width: 24,
    height: 23,
    x: 659,
    y: 125,
    "mask-type": "alpha",
    maskUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M659 149h24v-24h-24z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#mapImage_svg__ay)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#172133",
    fillRule: "evenodd",
    d: "M671 125q11 1 12 12-1 11-12 12-10-2-12-12 2-10 12-12"
  })))));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NTciIGhlaWdodD0iOTM2IiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgOTU3IDkzNiI+PHBhdGggaWQ9InJlY3QiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZD0iTTAgMWg5NTd2OTM1SDB6Ii8+PG1hc2sgaWQ9Im1hc2syODFfNSIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV81KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNlZWRlY2QiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtMzk4IDQyNy00IDE1IDkgNCA0LTE3ek03OCAxNDMgMTgyIDE3bDE4IDctOSAxNnY1bC0xOCA0MC0yMiAxNC0xNy02LTUgMjItMTggNiA0IDQgMTQgMyA0IDR2NWwtOSAxLTEgMy0yMi02LTYgMTJIODB6TTEgMGgxODBsLTggMTRMNjYgMTQybC0xNy0zLTIgMTAtMjMtNC0yMy05em0yMzIgMGgzNWwtMjAgMzgtMTMtNi04LTIwem0xMDMgMGg2MjF2MzEwbC0xODctNDUtMjUtMTUtMS0xMC0xMy02LTQgMTEtNS0yIDYtMTctNC0zLTIyLTh2LTExbC0yNi04LTkgMzAtMTY3LTc3LTE0LTEyLTM5LTktNyAyaC04bC00IDUtOTctMzMtMi01IDItMTEtOS0xOSA4LTQgNiAzIDMxIDYgOC0zIDItOHptNjIxIDMzOHYxNDlsLTE4LTQtNS0xMnMxMi0yMyAxMS0zOGMtMi0xNC01LTE2LTUtMTZsLTEyIDYtMTIzLTMyLTIgNS0xNC02LTIwLTE4LTIxLTExIDUtMTMgNTYgMTIgMjItNjR6bTAgMjg5djc2bC01LTIgMi05LTI5LTE0LTIzIDMyLTQyLTI3IDEwLTIxLTE0LTggOS0yNi0yOC0yOSAyLTEwIDcwIDE1IDUgMTR6TTcyMyA5MzVoLTRsMzctNjUgMyAyem0tMTA5IDBoLTJsLTkzLTUwIDMtNiA5MSA1MHpNMSAzNTN2LTQwbDggNyA3IDIwLTcgMTZ6bTAtMTAzdi04NGwzNyA2IDI3IDExLTE1IDQ0LTIzIDI5LTktNS0xMSAyem00MzYgMTc0LTQgMjYgNDYgMTIgNC0xNy0yOS03IDItOXptLTg1LTUyLTMgMTEgOSAyIDUtOXptLTE5IDUtNSA3IDIgNCA3IDMgNC00YzIgMCA1LTkgNS05bC00LTMtMyAzLTUtMXptLTU5IDEgMTYtNiA4LTE0IDYtMyAxIDQtNCA0IDcgNS0xNCAxMXptNTA1IDQxMS01IDgtMSAxNC02IDkgOS0xIDUtMTggMS0xMXptMTA1IDQgMzcgMjFzLTcgMTAtMTIgMTFjLTQgMC0yNy0xNC0yNy0xNHMtNC04IDItMThtLTYwMy05OS0zIDggMSA1IDYtMTF6bTEwLTQxdjRsMTEgMiAxLTV6bS05OSAyOC0yIDEzIDE5IDE0LTIgNSA2IDQgNC01IDkgMSAyLTItMi04LTgtMTJ6bTI2IDIxMi0xIDE5IDEyNCAxMyAyLTM0LTUtMjBzLTEwNSAyMi0xMTkgMjJ6bTI4My0yMDQgMSAxMGgxMXYtOGg5djdoMTBsLTEtMTB6bS0xNjUtMTItMyA5IDYgNS0zIDIgMyA2IDExLTYgMTUtMjAtMy0zem0xMy0xMTEgOCAxLTEgNDItNiA2LTMgOGgtMTNsLTQtMSA3LTE5IDUtMjR6bS03NiA0NyAyNCA5IDYtMi0xLTctMTItMTAtMTAtMS02IDZ6bS0xMTctNDkgOCA2LTQgMjAgMTAgMiA1IDQgMTQtNyAxMyA1IDEtMy0xMS02IDEtNCAxMSAzdi0ybC0xLTMgNC0xMC0yNS0xM3YtM2gtNGwtMSAyMS0zLTIgMS03LTUtMTItMTEtMXptLTY1LTUgOC04IDItMTIgNC0yIDExIDcgMzMgMTcgNC0yIDItOC0xOS0xMC03IDQtMjEtMTEtMTYtMi0xNSAxNS0yIDYgMjIgMTdoNWwyMiAxMCAyLTItMjItMTItNy0yem0xOS01MCAxNy0yMSAyNSAyMC0xMiAyNy0xMS0yLTgtMTF6bS03OSAzIDUtNyAxMyAzLTEgMTdoLTZ6bTIzLTMxIDMyLTM1Yy0xIDEgMTQgMTUgMTQgMTVsLTYgMTAgOSA2IDEwLTQgNSA1LTExIDI3LTkgMTEtMTItOCA0LTEwLTE0LTktMTcgMnptNjY4LTE0NyAxNSA2IDYtMjktMTQtM3ptLTU1LTc2LTIgOSAxMiA0IDMtMTB6bS01MyAyNC0xIDYgMTUgNSAyLTd6bS02NS0yMC04IDMwIDQ4IDEzIDctMzJ6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzEwIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzEwKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNOTU3IDYwNnYzbC02OC0xMy0xMi04aC04bC0zNS0xMHYtMWwxLTIgMzQgMTBoOGwxIDEgMTIgNyAyNCA1eiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xNSIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8xNSkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTk1NyA2MDZ2M2wtNjgtMTMtMTItOGgtOGwtMzUtMTB2LTFsMS0yIDM0IDEwaDhsMSAxIDEyIDcgMjQgNXoiLz48cGF0aCBpZD0icGF0aCIgc3Ryb2tlPSIjZDhkOWRhIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJtOTU3IDYwOS02OC0xMy0xMi04aC04bC0zNS0xMHYtMWwxLTIgMzQgMTBoOGwxIDEgMTIgNyAyNCA1IDQzIDh6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzIwIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzIwKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtMSA1MTggMjktMjhjMTgtMjAgMjUtMzYgMzAtNDQgNi03IDEwOS0yMjcgMTA5LTIyN0wyNzEgMGgxMWwtOTQgMjAyLTc0IDE1NS0zNiA3N3MtMTAgMjItMjIgMzljLTExIDE2LTI2IDMyLTMzIDM4TDEgNTMxeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8yNSIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8yNSkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTEgNTE4IDI5LTI4YzE4LTIwIDI1LTM2IDMwLTQ0IDYtNyAxMDktMjI3IDEwOS0yMjdMMjcxIDBoMTFsLTk0IDIwMi03NCAxNTUtMzYgNzdzLTEwIDIyLTIyIDM5Yy0xMSAxNi0yNiAzMi0zMyAzOEwxIDUzMXoiLz48cGF0aCBpZD0icGF0aCIgc3Ryb2tlPSIjZDhkOWRhIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNMzAgNDkwYzE4LTIwIDI1LTM2IDMwLTQ0IDYtNyAxMDktMjI3IDEwOS0yMjdMMjcxIDBoMTFsLTk0IDIwMi03NCAxNTUtMzYgNzdzLTEwIDIyLTIyIDM5Yy0xMSAxNi0yNiAzMi0zMyAzOEwxIDUzMXYtMTN6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzMwIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzMwKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMCAxNTlzMTYgNSAzNSA3bDIzIDIgNDEgNiAzMiAxMCAzNSAxOGMxIDAgOC0xIDEzLTVsLTMgNi02IDIgNCAyLTEgMy0yLTEgMSA0LTMgNmgtMWMyLTYtMy0xMy00LTE0YTM2NSAzNjUgMCAwIDAtNDktMjRsLTE3LTRxLTIxLTQtNDEtNWwtMjItM2MtMTktMi0zNS03LTM1LTd6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzM1IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzM1KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMCAxNTlzMTYgNSAzNSA3bDIzIDIgNDEgNiAzMiAxMCAzNSAxOGMxIDAgOC0xIDEzLTVsLTMgNi02IDIgNCAyLTEgMy0yLTEgMSA0LTMgNmgtMWMyLTYtMy0xMy00LTE0YTM2NSAzNjUgMCAwIDAtNDktMjRsLTE3LTRxLTIxLTQtNDEtNWwtMjItM2MtMTktMi0zNS03LTM1LTd6Ii8+PHBhdGggaWQ9InBhdGgiIHN0cm9rZT0iI2Q4ZDlkYSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMSIgZD0ibTM1IDE2NiAyMyAyIDQxIDYgMzIgMTAgMzUgMThjMSAwIDgtMSAxMy01bC0zIDYtNiAyIDQgMi0xIDMtMi0xIDEgNC0zIDZoLTFjMi02LTMtMTMtNC0xNGEzNjUgMzY1IDAgMCAwLTQ5LTI0bC0xNy00cS0yMS00LTQxLTVsLTIyLTNjLTE5LTItMzUtNy0zNS03di0zczE2IDUgMzUgN1oiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNDAiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNDApIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im0xODQgMjEyIDIgMS0xLTQgMi01IDMgMTEgMTU0IDg0IDM4OCA5NnEzIDEgMyA1bC0zNyAxNDN2MlE1OTggNzQyIDQ5MSA5MzVoLTEwbDQ5LTg2IDk5LTE4NiA2MS0xMjIgMzYtMTM5LTM4NC05NWgtMWwtMTU1LTg1LTkgNCAyLTQgNC0yLTMtMXoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNDUiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNDUpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im0xODQgMjEyIDIgMS0xLTQgMi01IDMgMTEgMTU0IDg0IDM4OCA5NnEzIDEgMyA1bC0zNyAxNDN2MlE1OTggNzQyIDQ5MSA5MzVoLTEwbDQ5LTg2IDk5LTE4NiA2MS0xMjIgMzYtMTM5LTM4NC05NWgtMWwtMTU1LTg1LTkgNCAyLTQgNC0yLTMtMXoiLz48cGF0aCBpZD0icGF0aCIgc3Ryb2tlPSIjZDhkOWRhIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJtMTg2IDIxMy0xLTQgMi01IDMgMTEgMTU0IDg0IDM4OCA5NnEzIDEgMyA1bC0zNyAxNDN2MlE1OTggNzQyIDQ5MSA5MzVoLTEwbDQ5LTg2IDk5LTE4NiA2MS0xMjIgMzYtMTM5LTM4NC05NWgtMWwtMTU1LTg1LTkgNCAyLTQgNC0yLTMtMSA0LTd6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzUwIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzUwKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtNjM2IDY2NSAzIDIgOC0xNCAxLTEgODMgMTEgMjI2IDExOXYzTDczMCA2NjZsLTgxLTExLTkgMTVoLTJsLTMtMnoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNTUiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNTUpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im02MzYgNjY1IDMgMiA4LTE0IDEtMSA4MyAxMSAyMjYgMTE5djNMNzMwIDY2NmwtODEtMTEtOSAxNWgtMmwtMy0yeiIvPjxwYXRoIGlkPSJwYXRoIiBzdHJva2U9IiNkOGQ5ZGEiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEiIGQ9Im02MzkgNjY3IDgtMTQgMS0xIDgzIDExIDIyNiAxMTl2M0w3MzAgNjY2bC04MS0xMS05IDE1aC0ybC0zLTIgMS0zeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV82MCIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV82MCkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTY5OSA1NDAgMTMxIDMzIDI2LTUzIDYyLTg1di0xbDM2LTM5IDMtMXY2bC0zNSAzOC02MiA4NS01MyAxMDl2MWwtMTYgMTU4LTcgMjl2MTJsNCA3IDE2OSA5MnY0aC05bC0xNjQtODlxLTExLTQtMTcgNWwtNDkgODRoLTlsNTAtODdxNi0xMS00LTE4bC0xNjEtODUgNC03IDE2MSA4NXExMiA2IDE3LTYgNS0xMSA2LTIzbDE3LTE2NWgxbDMtNTRxLTEtMy03LTRsLTk5LTI1IDEtMXYtMnpNNTg3IDc0MmwtMjQtMTNjLTMtMS0xOS00LTM2LTUtMTgtMi01NCAzLTU5IDQtNCAyLTMxIDEzLTQzIDIwcS0xMyA4LTMwIDI3bC0xNiAxNmMtMTggMTctNTMgMjctNTMgMjdzLTEzMyAyOS0xNzcgMjlxLTMxLTItNTEgNy0xOSA3LTI3IDI5Yy0xMCAyOSAyMyA1MiAyMyA1MmgxLTEzYy0xMS05LTI3LTMwLTE5LTU1cTktMjUgMzItMzQgMjEtOSA1NS04YzQxIDEgMTY4LTI3IDE3NC0yOCAwIDAgMzMtOSA0OS0yNWwxNi0xNnExNy0xOSAzMi0yOGMxNC04IDQ0LTIxIDQ0LTIxaDFhMjk4IDI5OCAwIDAgMSAxMDAgMWgxbDI0IDEzem0yNDItMTY2LTctMi00IDFxLTQgMS03IDQtNCA0LTMgN2wtNCA0MXptLTU1IDI0OSA1IDJ2LTV6bTggMTQtMiAzaDR6bS0xMyA1LTQtMi0xIDV6bS03LTEyIDMtNGgtNHYxaC0xem0xNi0yYTggOCAwIDAgMC0xNCA1cTAgMyAzIDVhOCA4IDAgMCAwIDExIDBsMi01LTEtMnYtMnptLTI2LTI3MyA0NSAxMXE4IDIgOSA2bDEgNSAyLTIgNi01eiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV82NSIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV82NSkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTY5OSA1NDAgMTMxIDMzIDI2LTUzIDYyLTg1di0xbDM2LTM5IDMtMXY2bC0zNSAzOC02MiA4NS01MyAxMDl2MWwtMTYgMTU4LTcgMjl2MTJsNCA3IDE2OSA5MnY0aC05bC0xNjQtODlxLTExLTQtMTcgNWwtNDkgODRoLTlsNTAtODdxNi0xMS00LTE4bC0xNjEtODUgNC03IDE2MSA4NXExMiA2IDE3LTYgNS0xMSA2LTIzbDE3LTE2NWgxbDMtNTRxLTEtMy03LTRsLTk5LTI1IDEtMXYtMnpNNTg3IDc0MmwtMjQtMTNjLTMtMS0xOS00LTM2LTUtMTgtMi01NCAzLTU5IDQtNCAyLTMxIDEzLTQzIDIwcS0xMyA4LTMwIDI3bC0xNiAxNmMtMTggMTctNTMgMjctNTMgMjdzLTEzMyAyOS0xNzcgMjlxLTMxLTItNTEgNy0xOSA3LTI3IDI5Yy0xMCAyOSAyMyA1MiAyMyA1MmgxLTEzYy0xMS05LTI3LTMwLTE5LTU1cTktMjUgMzItMzQgMjEtOSA1NS04YzQxIDEgMTY4LTI3IDE3NC0yOCAwIDAgMzMtOSA0OS0yNWwxNi0xNnExNy0xOSAzMi0yOGMxNC04IDQ0LTIxIDQ0LTIxaDFhMjk4IDI5OCAwIDAgMSAxMDAgMWgxbDI0IDEzem0yNDItMTY2LTctMi00IDFxLTQgMS03IDQtNCA0LTMgN2wtNCA0MXptLTU1IDI0OSA1IDJ2LTV6bTggMTQtMiAzaDR6bS0xMyA1LTQtMi0xIDV6bS03LTEyIDMtNGgtNHYxaC0xem0xNi0yYTggOCAwIDAgMC0xNCA1cTAgMyAzIDVhOCA4IDAgMCAwIDExIDBsMi01LTEtMnYtMnptLTI2LTI3MyA0NSAxMXE4IDIgOSA2bDEgNSAyLTIgNi01eiIvPjxwYXRoIGlkPSJwYXRoIiBzdHJva2U9IiNkOGQ5ZGEiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEiIGQ9Im04MzAgNTczIDI2LTUzIDYyLTg1di0xbDM2LTM5IDMtMXY2bC0zNSAzOC02MiA4NS01MyAxMDl2MWwtMTYgMTU4LTcgMjl2MTJsNCA3IDE2OSA5MnY0aC05bC0xNjQtODlxLTExLTQtMTcgNWwtNDkgODRoLTlsNTAtODdxNi0xMS00LTE4bC0xNjEtODUgNC03IDE2MSA4NXExMiA2IDE3LTYgNS0xMSA2LTIzbDE3LTE2NWgxbDMtNTRxLTEtMy03LTRsLTk5LTI1IDEtMXYtMmwxLTN6TTU2MyA3MjljLTMtMS0xOS00LTM2LTUtMTgtMi01NCAzLTU5IDQtNCAyLTMxIDEzLTQzIDIwcS0xMyA4LTMwIDI3bC0xNiAxNmMtMTggMTctNTMgMjctNTMgMjdzLTEzMyAyOS0xNzcgMjlxLTMxLTItNTEgNy0xOSA3LTI3IDI5Yy0xMCAyOSAyMyA1MiAyMyA1MmgxLTEzYy0xMS05LTI3LTMwLTE5LTU1cTktMjUgMzItMzQgMjEtOSA1NS04YzQxIDEgMTY4LTI3IDE3NC0yOCAwIDAgMzMtOSA0OS0yNWwxNi0xNnExNy0xOSAzMi0yOGMxNC04IDQ0LTIxIDQ0LTIxaDFhMjk4IDI5OCAwIDAgMSAxMDAgMWgxbDI0IDEzLTQgOHptMjU5LTE1NS00IDFxLTQgMS03IDQtNCA0LTMgN2wtNCA0MSAyNS01MXptLTQzIDI1M3YtNWwtNSAzem0xIDE1aDRsLTItM3ptLTE1IDAtMSA1IDUtM3ptMC0xNGgtNHYxaC0xbDIgM3ptNy0xcS0zIDAtNSAzYTcgNyAwIDAgMCAwIDEwIDggOCAwIDAgMCAxMSAwbDItNS0xLTJ2LTJhOCA4IDAgMCAwLTctNFptMjUtMjU5cTggMiA5IDZsMSA1IDItMiA2LTUtNjMtMTV6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzcwIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzcwKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtNDY0IDE1NS00MyAxNjMtMy0xIDMtMTItMy0xLTMgMTJ2MWwtMy0xIDQyLTE2NCA0IDEtMzkgMTUwaDJsNDAtMTQ5ek0zNjEgNTM3bC0yMSA0NGMtMiA1LTMgMTktMyAxOXYxbC05IDE5djVoLTRsMS02IDgtMTkgNC0yMCAyMS00NXYtNGgtMmwxOS02NiAxLTEzIDM0LTEyOCAzIDEtMzMgMTI3LTEgMTMgNC0xMSAzMy0xMjkgMyAxYy0xMiA0OC0yMiA5OC0zOSAxNDRsLTE1IDU5IDI3OC00IDQ4IDEzLTEgMy0yIDQtNDYtMTF6bTAtOCAxMC0zOHoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNzUiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNzUpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im00NjQgMTU1LTQzIDE2My0zLTEgMy0xMi0zLTEtMyAxMnYxbC0zLTEgNDItMTY0IDQgMS0zOSAxNTBoMmw0MC0xNDl6TTM2MSA1MzdsLTIxIDQ0Yy0yIDUtMyAxOS0zIDE5djFsLTkgMTl2NWgtNGwxLTYgOC0xOSA0LTIwIDIxLTQ1di00aC0ybDE5LTY2IDEtMTMgMzQtMTI4IDMgMS0zMyAxMjctMSAxMyA0LTExIDMzLTEyOSAzIDFjLTEyIDQ4LTIyIDk4LTM5IDE0NGwtMTUgNTkgMjc4LTQgNDggMTMtMSAzLTIgNC00Ni0xMXptMC04IDEwLTM4eiIvPjxwYXRoIGlkPSJwYXRoIiBzdHJva2U9IiNkOGQ5ZGEiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEiIGQ9Im00MjEgMzE4LTMtMSAzLTEyLTMtMS0zIDEydjFsLTMtMSA0Mi0xNjQgNCAxLTM5IDE1MGgybDQwLTE0OSAzIDF6bS04MSAyNjNjLTIgNS0zIDE5LTMgMTl2MWwtOSAxOXY1aC00bDEtNiA4LTE5IDQtMjAgMjEtNDV2LTRoLTJsMTktNjYgMS0xMyAzNC0xMjggMyAxLTMzIDEyNy0xIDEzIDQtMTEgMzMtMTI5IDMgMWMtMTIgNDgtMjIgOTgtMzkgMTQ0bC0xNSA1OSAyNzgtNCA0OCAxMy0xIDMtMiA0LTQ2LTExLTI4MSAzem0yMS01MiAxMC0zOHoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfODAiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfODApIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0yMDEgMjIxYzMtOSAxNS01NyAyMy02OGwzMy00MnMxMi0xNCAzMi0xMmMxOSAxIDUwIDEyIDUxIDEybDM5IDIwcTcyIDE3IDE0MiAzN2wxNTMgNjkgMzkgMThjMSAwIDUgMyA0IDlsLTMxIDEyMC0zLTEgMzEtMTIwcS0xLTYtMi01bC0zOS0xOC0xNTMtNjktNTQtMTYtODgtMjEtNDAtMjBjLTItMS0zMS0xMC00OS0xMi0xOC0xLTI5IDEwLTI5IDExbC0zMyA0M2MtOCAxMC0yMSA2MC0yMyA2N3oiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfODUiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfODUpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0yMDEgMjIxYzMtOSAxNS01NyAyMy02OGwzMy00MnMxMi0xNCAzMi0xMmMxOSAxIDUwIDEyIDUxIDEybDM5IDIwcTcyIDE3IDE0MiAzN2wxNTMgNjkgMzkgMThjMSAwIDUgMyA0IDlsLTMxIDEyMC0zLTEgMzEtMTIwcS0xLTYtMi01bC0zOS0xOC0xNTMtNjktNTQtMTYtODgtMjEtNDAtMjBjLTItMS0zMS0xMC00OS0xMi0xOC0xLTI5IDEwLTI5IDExbC0zMyA0M2MtOCAxMC0yMSA2MC0yMyA2N3oiLz48cGF0aCBpZD0icGF0aCIgc3Ryb2tlPSIjZDhkOWRhIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJtMjI0IDE1MyAzMy00MnMxMi0xNCAzMi0xMmMxOSAxIDUwIDEyIDUxIDEybDM5IDIwcTcyIDE3IDE0MiAzN2wxNTMgNjkgMzkgMThjMSAwIDUgMyA0IDlsLTMxIDEyMC0zLTEgMzEtMTIwcS0xLTYtMi01bC0zOS0xOC0xNTMtNjktNTQtMTYtODgtMjEtNDAtMjBjLTItMS0zMS0xMC00OS0xMi0xOC0xLTI5IDEwLTI5IDExbC0zMyA0M2MtOCAxMC0yMSA2MC0yMyA2N2wtMy0yYzMtOSAxNS01NyAyMy02OFoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfOTAiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfOTApIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im03OTMgMC03IDE5LTIgMjh2MWwtNjggMjEwLTEtMSA2Ny0yMTAgMi0yOHYtMWw3LTE4eiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV85NSIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV85NSkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTc5MyAwLTcgMTktMiAyOHYxbC02OCAyMTAtMS0xIDY3LTIxMCAyLTI4di0xbDctMTh6Ii8+PHBhdGggaWQ9InBhdGgiIHN0cm9rZT0iI2Q4ZDlkYSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMSIgZD0ibTc4NiAxOS0yIDI4djFsLTY4IDIxMC0xLTEgNjctMjEwIDItMjh2LTFsNy0xOGgyeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xMDAiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMTAwKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNzM0IDM5MnY1bC0yLTJ2LTJsLTEgMi0yLTEgMy0zIDMwLTEwOS04LTEyLTM3LTExLTEtMSAxLTEgMzggMTIgOCAxMSAyLTggMjMgNnYxbC0yMi01LTIgOHoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfMTA1IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzEwNSkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTczNCAzOTJ2NWwtMi0ydi0ybC0xIDItMi0xIDMtMyAzMC0xMDktOC0xMi0zNy0xMS0xLTEgMS0xIDM4IDEyIDggMTEgMi04IDIzIDZ2MWwtMjItNS0yIDh6Ii8+PHBhdGggaWQ9InBhdGgiIHN0cm9rZT0iI2Q4ZDlkYSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMSIgZD0ibTczNCAzOTctMi0ydi0ybC0xIDItMi0xIDMtMyAzMC0xMDktOC0xMi0zNy0xMS0xLTEgMS0xIDM4IDEyIDggMTEgMi04IDIzIDZ2MWwtMjItNS0yIDgtMzAgMTEweiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xMTAiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMTEwKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtNzI2IDQzNCAxMjUgMzBxMS0zIDEzLTdsMi0xcTExLTMgMjEtMTBsNi01IDE2LTExIDItMSAxLTFoMWwxNC01djFsLTEgMi0xMiA0aC0xbDUgNC0xIDEtNi00LTE3IDExLTYgNXEtMTAgNy0yMSAxMGwtMiAxcS0xMSA0LTEyIDdsMTYgNHYxbC0xNDMtMzV6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzExNSIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8xMTUpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im03MjYgNDM0IDEyNSAzMHExLTMgMTMtN2wyLTFxMTEtMyAyMS0xMGw2LTUgMTYtMTEgMi0xIDEtMWgxbDE0LTV2MWwtMSAyLTEyIDRoLTFsNSA0LTEgMS02LTQtMTcgMTEtNiA1cS0xMCA3LTIxIDEwbC0yIDFxLTExIDQtMTIgN2wxNiA0djFsLTE0My0zNXoiLz48cGF0aCBpZD0icGF0aCIgc3Ryb2tlPSIjZDhkOWRhIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNODUxIDQ2NHExLTMgMTMtN2wyLTFxMTEtMyAyMS0xMGw2LTUgMTYtMTEgMi0xIDEtMWgxbDE0LTV2MWwtMSAyLTEyIDRoLTFsNSA0LTEgMS02LTQtMTcgMTEtNiA1cS0xMCA3LTIxIDEwbC0yIDFxLTExIDQtMTIgN2wxNiA0djFsLTE0My0zNXYtMXoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfMTIwIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzEyMCkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTY4NCAzOTItMzUgMTM1LTMtMSAzMi0xMjEtMjYyLTY1di0zbDEyNSAzMSAzLTExIDIgMS0zIDExIDEzNiAzMyAzLTExeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xMjUiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMTI1KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtNjg0IDM5Mi0zNSAxMzUtMy0xIDMyLTEyMS0yNjItNjV2LTNsMTI1IDMxIDMtMTEgMiAxLTMgMTEgMTM2IDMzIDMtMTF6Ii8+PHBhdGggaWQ9InBhdGgiIHN0cm9rZT0iI2Q4ZDlkYSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMSIgZD0ibTY0OSA1MjctMy0xIDMyLTEyMS0yNjItNjV2LTNsMTI1IDMxIDMtMTEgMiAxLTMgMTEgMTM2IDMzIDMtMTEgMiAxeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xMzAiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMTMwKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtNDAxIDQwMSAxNzYgNDN2MmwtMTc3LTQzeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xMzUiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMTM1KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtNDAxIDQwMSAxNzYgNDN2MmwtMTc3LTQzeiIvPjxwYXRoIGlkPSJwYXRoIiBzdHJva2U9IiNkOGQ5ZGEiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEiIGQ9Ik01NzcgNDQ0djJsLTE3Ny00MyAxLTJ6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzE0MCIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8xNDApIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im0yODMgMzE5IDQ1IDI2IDExLTM5IDIgMS0xMiA0MS00OC0yN3oiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfMTQ1IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzE0NSkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTI4MyAzMTkgNDUgMjYgMTEtMzkgMiAxLTEyIDQxLTQ4LTI3eiIvPjxwYXRoIGlkPSJwYXRoIiBzdHJva2U9IiNkOGQ5ZGEiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEiIGQ9Im0zMjggMzQ1IDExLTM5IDIgMS0xMiA0MS00OC0yNyAyLTJ6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzE1MCIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8xNTApIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im0zODEgNDM0LTEgMi0zMC04LTIzIDNzLTE2LTMtMjAtNmMtNS0zLTEzLTI4LTE0LTMzbC0xMzEtNmMtMiAwLTM2IDMtNDUgMThxLTEwIDE2LTExIDMzLTIgMTUgNyAyNWMxMyAxNiAzMCAzMSAzMSAzMnEzIDMgMjggMTFsNTAgMTEgMTE5IDE1aDE3djJsLTE3IDEtMTE5LTE1aC0xbC00OS0xMi0yOS0xMXMtMTktMTUtMzItMzJxLTEwLTEyLTgtMjcgMy0xOCAxMS0zNGMxMC0xNyA0Ny0yMCA0Ny0yMGgxbDEzMiA2IDEgMXM5IDMwIDEzIDMzbDE5IDUgMjMtM2gxeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xNTUiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMTU1KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtMzgxIDQzNC0xIDItMzAtOC0yMyAzcy0xNi0zLTIwLTZjLTUtMy0xMy0yOC0xNC0zM2wtMTMxLTZjLTIgMC0zNiAzLTQ1IDE4cS0xMCAxNi0xMSAzMy0yIDE1IDcgMjVjMTMgMTYgMzAgMzEgMzEgMzJxMyAzIDI4IDExbDUwIDExIDExOSAxNWgxN3YybC0xNyAxLTExOS0xNWgtMWwtNDktMTItMjktMTFzLTE5LTE1LTMyLTMycS0xMC0xMi04LTI3IDMtMTggMTEtMzRjMTAtMTcgNDctMjAgNDctMjBoMWwxMzIgNiAxIDFzOSAzMCAxMyAzM2wxOSA1IDIzLTNoMXoiLz48cGF0aCBpZD0icGF0aCIgc3Ryb2tlPSIjZDhkOWRhIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJtMzgwIDQzNi0zMC04LTIzIDNzLTE2LTMtMjAtNmMtNS0zLTEzLTI4LTE0LTMzbC0xMzEtNmMtMiAwLTM2IDMtNDUgMThxLTEwIDE2LTExIDMzLTIgMTUgNyAyNWMxMyAxNiAzMCAzMSAzMSAzMnEzIDMgMjggMTFsNTAgMTEgMTE5IDE1aDE3djJsLTE3IDEtMTE5LTE1aC0xbC00OS0xMi0yOS0xMXMtMTktMTUtMzItMzJxLTEwLTEyLTgtMjcgMy0xOCAxMS0zNGMxMC0xNyA0Ny0yMCA0Ny0yMGgxbDEzMiA2IDEgMXM5IDMwIDEzIDMzbDE5IDUgMjMtM2gxbDMwIDl6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzE2MCIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8xNjApIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im0yMyA1MTEgMiAxdi0zbDQtNHEtMiA0LTEgMTBsNDMgNDIgMTEgMTAgMzEgMTMgMTQwIDQwIDIxIDVxODgtMSAxNzUgMmM2My0xIDEzNC02IDE5NyAwdjRoLTIgMWwtMSAzLTIxLTNxLTE3NiAzLTM1MyAxbC02My0xOS05OC0yOC0zMS0xM2MtMjEtMTctMzYtMzQtNTUtNTNsLTkgMS0xLTEgNi00em00MTcgMTE5LTM2LTJoLTFsMSAyem0tMzgtMkgyNzRsLTIyLTUtNDAtMTEgNTkgMTcgMTMxIDF6TTY4IDU1OWwtNS00IDMgMnoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfMTY1IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzE2NSkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTIzIDUxMSAyIDF2LTNsNC00cS0yIDQtMSAxMGw0MyA0MiAxMSAxMCAzMSAxMyAxNDAgNDAgMjEgNXE4OC0xIDE3NSAyYzYzLTEgMTM0LTYgMTk3IDB2NGgtMiAxbC0xIDMtMjEtM3EtMTc2IDMtMzUzIDFsLTYzLTE5LTk4LTI4LTMxLTEzYy0yMS0xNy0zNi0zNC01NS01M2wtOSAxLTEtMSA2LTR6bTQxNyAxMTktMzYtMmgtMWwxIDJ6bS0zOC0ySDI3NGwtMjItNS00MC0xMSA1OSAxNyAxMzEgMXpNNjggNTU5bC01LTQgMyAyeiIvPjxwYXRoIGlkPSJwYXRoIiBzdHJva2U9IiNkOGQ5ZGEiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEiIGQ9Ik0yNSA1MTJ2LTNsNC00cS0yIDQtMSAxMGw0MyA0MiAxMSAxMCAzMSAxMyAxNDAgNDAgMjEgNXE4OC0xIDE3NSAyYzYzLTEgMTM0LTYgMTk3IDB2NGgtMiAxbC0xIDMtMjEtM3EtMTc2IDMtMzUzIDFsLTYzLTE5LTk4LTI4LTMxLTEzYy0yMS0xNy0zNi0zNC01NS01M2wtOSAxLTEtMSA2LTQgNC00em0zNzkgMTE2aC0xbDEgMmgzNnptLTEzMCAwLTIyLTUtNDAtMTEgNTkgMTcgMTMxIDF2LTJ6TTYzIDU1NWwzIDIgMiAyeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xNzAiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMTcwKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtMTMgNTA3LTQtNCAxIDctMiAydi0xMWwtNy04di0ybDcgOCAxMiAxLTIgMi04LTEgNCA0eiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xNzUiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMTc1KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtMTMgNTA3LTQtNCAxIDctMiAydi0xMWwtNy04di0ybDcgOCAxMiAxLTIgMi04LTEgNCA0eiIvPjxwYXRoIGlkPSJwYXRoIiBzdHJva2U9IiNkOGQ5ZGEiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEiIGQ9Im05IDUwMyAxIDctMiAydi0xMWwtNy04di0ybDcgOCAxMiAxLTIgMi04LTEgNCA0LTEgMnoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfMTgwIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzE4MCkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTI1MyA2NDMgMTEtMTN2MWwyIDEtMTEgMTIgMTAgNC0xIDMtMTEtNi0xMTAtMjgtMTQgNTQtMSAxcy03IDE0LTMwIDIyYTExODEgMTE4MSAwIDAgMS0xMiAxMjh2MjhsLTIgMmEyODIgMjgyIDAgMCAxIDctOTNjMS0xIDUtNjIgNC02Ni0xLTMtOC00LTgtNGwtNS0xMC0yLTMzYzAtOC00LTE4LTQtMThsMTAtMjYtODYtMTZ2LTNsODcgMTcgOC0yMSAyIDEtOCAyMSA4MiAyMSA3LTggMTMtNWgybDEgMS0xNiA2LTQgNnptMzEyLTEwOHEyIDQ1IDEgODloLTJsLTEtODl6bTEgOTctMSAxMyAzMyAxIDI4IDEyIDQgMy0xIDItNC0yLTI3LTEyLTM1LTIgMS0xNXptLTQyNi0xNi01Mi0xMy0xMCAyNXEzIDUgNCAxOGwyIDMyIDQgOXE1IDAgOSA1YzIxLTcgMjgtMjAgMjktMjF6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzE4NSIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8xODUpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im0yNTMgNjQzIDExLTEzdjFsMiAxLTExIDEyIDEwIDQtMSAzLTExLTYtMTEwLTI4LTE0IDU0LTEgMXMtNyAxNC0zMCAyMmExMTgxIDExODEgMCAwIDEtMTIgMTI4djI4bC0yIDJhMjgyIDI4MiAwIDAgMSA3LTkzYzEtMSA1LTYyIDQtNjYtMS0zLTgtNC04LTRsLTUtMTAtMi0zM2MwLTgtNC0xOC00LTE4bDEwLTI2LTg2LTE2di0zbDg3IDE3IDgtMjEgMiAxLTggMjEgODIgMjEgNy04IDEzLTVoMmwxIDEtMTYgNi00IDZ6bTMxMi0xMDhxMiA0NSAxIDg5aC0ybC0xLTg5em0xIDk3LTEgMTMgMzMgMSAyOCAxMiA0IDMtMSAyLTQtMi0yNy0xMi0zNS0yIDEtMTV6bS00MjYtMTYtNTItMTMtMTAgMjVxMyA1IDQgMThsMiAzMiA0IDlxNSAwIDkgNWMyMS03IDI4LTIwIDI5LTIxeiIvPjxwYXRoIGlkPSJwYXRoIiBzdHJva2U9IiNkOGQ5ZGEiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEiIGQ9Ik0yNjQgNjMwdjFsMiAxLTExIDEyIDEwIDQtMSAzLTExLTYtMTEwLTI4LTE0IDU0LTEgMXMtNyAxNC0zMCAyMmExMTgxIDExODEgMCAwIDEtMTIgMTI4djI4bC0yIDJhMjgyIDI4MiAwIDAgMSA3LTkzYzEtMSA1LTYyIDQtNjYtMS0zLTgtNC04LTRsLTUtMTAtMi0zM2MwLTgtNC0xOC00LTE4bDEwLTI2LTg2LTE2di0zbDg3IDE3IDgtMjEgMiAxLTggMjEgODIgMjEgNy04IDEzLTVoMmwxIDEtMTYgNi00IDYgNzkgMjF6bTMwMi02aC0ybC0xLTg5aDJxMiA0NSAxIDg5Wm0tMSAyMSAzMyAxIDI4IDEyIDQgMy0xIDItNC0yLTI3LTEyLTM1LTIgMS0xNWgyek04OCA2MDNsLTEwIDI1cTMgNSA0IDE4bDIgMzIgNCA5cTUgMCA5IDVjMjEtNyAyOC0yMCAyOS0yMWwxNC01NXoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfMTkwIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzE5MCkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTI4MCA4MTkgMS00M3YtMWwzOC03MyAxNS02MyAxLTEgMy01aDRsLTQgNy0xNiA2M3YxbC0zNyA3Mi0xIDQyeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8xOTUiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMTk1KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtMjgwIDgxOSAxLTQzdi0xbDM4LTczIDE1LTYzIDEtMSAzLTVoNGwtNCA3LTE2IDYzdjFsLTM3IDcyLTEgNDJ6Ii8+PHBhdGggaWQ9InBhdGgiIHN0cm9rZT0iI2Q4ZDlkYSIgc3Ryb2tlLW9wYWNpdHk9IjEiIHN0cm9rZS13aWR0aD0iMSIgZD0iTTI4MSA3NzZ2LTFsMzgtNzMgMTUtNjMgMS0xIDMtNWg0bC00IDctMTYgNjN2MWwtMzcgNzItMSA0Mi00IDF6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzIwMCIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8yMDApIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2IwMTYxNiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik03MjUgMzUxcS0yMS0yLTIzLTIyIDItMjEgMjMtMjJjMTIgMCAyMiA5IDIyIDIyIDAgMTItMTAgMjItMjIgMjIiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfMjA1IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzIwNSkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTcyMCAzNDFoOXYtM2gtOXptOC0xOWgtMXYtMWgxem0wIDJoLTF2LTFoMXptMCAyaC0xdi0xem0wIDJoLTF2LTF6bTAgM2gtMXYtMmgxem0wIDJoLTF2LTFoMXptLTQtMTctNiAzaC0xdjdoM3Y4aDN2LTExaC0zdi0ybDQtMmgzdjE1aDJ2LTE4eiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjYjAxNjE2IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTY5MyAyNzRoN3YtM2gtN3YtNGg4di00aC0xM3YxOGgxM3YtM2gtOHptMjItMy0yIDFoLTN2LTVoNGwxIDFoMXptMi02LTItMS0yLTFoLTh2MThoNHYtNWg0bDItMSAyLTEgMi0ydi01em0xNSAxMi0xIDFoLTV2LTRoNmwxIDF2Mm0tNy0xMGg1bDEgMXYxbC0xIDFoLTV6bTEwIDYtMi0xIDEtMSAxLTF2LTRsLTEtMi0yLTFoLTExdjE4aDExbDItMSAyLTR6bTE4IDhoNXYtMThoLTV6bS02LTUtMSAxaC01di02aDRsMSAxaDF6bTMtNi0yLTFoLTd2LTZoLTR2MThoMTFhNiA2IDAgMCAwIDMtOXptMjQtNy05IDExdi0xMWgtNHYxOGg0bDktMTF2MTFoNHYtMTh6bS05OCA0aDR2MTRoNHYtMThoLTV6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNiMDE2MTYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNjY4IDI2M3YxOGg0di0xNGg0bDMtNHptMTA3LTYtOSAydjJoOXptLTI5IDMzLTIgNHEwIDMtMyAzbC0xLTIgMi01IDItMmgyem0tMjQtMS0yIDQtMyAzcS0zIDAtMi0ybDEtM3YtMWwyLTIgMi0xIDEtMSAxIDF6bTU3LTFoLTJsLTIgNS00IDRoLTF2LTJsMy03aC0ybC0yIDUtMSAxLTMgMiAzLThoMi0ybDEtNHExIDAgMCAwaC0ydjJsLTEgMmgtMiAybC0zIDYtMiAyLTEgMS0xLTEgNC04aC0zbC0yIDJoLTFsMS0xdi0xaC0zbC0yIDIgMS0yaC0ybC0xIDJoLTNsLTEtMi0yLTEtMiAxYTggOCAwIDAgMC01IDZsLTIgMi0xIDEtMS0xIDItNSAyLTNoLTNsLTIgMmgtMWwxLTF2LTFoLTNsLTIgMiAxLTJoLTJsLTEgMy0yLTFxMC0zLTMtM3QtNCAzbDItNGgtMyAxbC0zIDUtMiA2LTIgNS0xIDFoLTF2MWg1di0xaC0xdi0xbDItNSAxLTEgMiAxIDMtMSA0LTV2LTFsMiAxLTMgNmgybDMtNnYtMWwzLTJoMS0xdjJsMSAxIDEtMSAyLTEtMSAyLTEgMy0xIDEgMSAyaDFsMi0xIDItMXEwIDIgMyAybDQtMXEzLTIgMy01di0xbDMgMS0zIDZoMmwzLTZ2LTFsMy0yaDEtMXYybDEgMSAxLTEgMi0xLTEgMi0xIDMtMSAxIDEgMmgxbDItMSAyLTJ2MWwxIDIgMi0xIDItMnYzaDJsNC0yLTEgM3EtMiA2LTUgNWgtMWwxLTItMS0xLTIgMXEwIDMgMyAzIDUgMCA3LTd6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNiMDE2MTYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJtNzM4IDI4NiAxLTF2LTFoLTJ2MnptMjUgMCAxLTF2LTFoLTJ2MnoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im01MjIgMjgxIDMtMiAxLTFoMXYtMWwxLTEtMS0yaC0ybC0xIDFoLTF2LTFsMi0xaDJsMiAxdjNsLTEgMS0xIDEtMyAyaDV2MXptMTMgMHYtMmgtNXYtMWw1LTZoMXY2aDF2MWgtMXYyem0tNC0zaDR2LTV6bTEyIDN2LTdoMWwyIDQgMy00aDF2N2gtMXYtNmwtMiA0aC0xbC0yLTR6bTkgMHYtN2gxdjNoMWwyLTNoMmwtMyA0IDMgM2gtMWwtMy0zaC0xdjN6bTcgM3YtMTBoMXYxbDEtMWgxbDIgMSAxIDEgMSAyLTEgMi0xIDFoLTNsLTEtMXY0em0zLTRoMnYtNGwtMi0xLTEgMWgtMXYzem01IDF2LTdoMXYzaDR2LTNoMXY3aC0xdi0zaC00djN6bTkgMGgtMXYtMWgxem02IDM3di03aDF6aDJ2LTZoMXY2aDN2LTZoMXY3em05IDB2LTVoMXYyaDFsMi0yaDFsLTIgMiAyIDNoLTFsLTItMmgtMXYyem04IDBoLTFsLTEtMS0xLTEgMS0yIDEtMWgybDEgMXYzbC0xIDF6bTAtMXYtMWgxbC0xLTF2LTFoLTJsLTEgMXYxbDEgMXptMyAxdi00aDR2NWgtMXYtNGgtMnYzbC0xIDF6bTggMGgtMWwtMS0xdi0xbDEtMWgzdi0xaC00IDF2LTFoM3YxbDEgMXYzaC0xdi0xbC0xIDF6bTAtMWgxdi0xaC0zdjF6bTcgMXYtN2gxbDMgNnYtNmgxdjdoLTFsLTQtNnptNi0zaDN6bTItMWgtMWwtMS0xdi0xbDEtMWgxbDEgMXYxem0wLTFoLTF2MXptNiA1di0xaC00di0xbDQtNWgxdjVoMXYxaC0xem0tMy0yaDN2LTR6bTUgMiAyLTEgMS0xaDF2LTNoLTJ2MWgtMXYtMWwxLTFoMmwxIDF2MmwtMSAxLTEgMS0xIDFoM3Yxem0xMTYgMTAydi0xbDMtMyAxLTEgMS0xdi0ybC0yLTFoLTFsLTEgMWgtMWwxLTEgMS0xaDNsMSAxdjNsLTEgMS0xIDEtMiAyaDR2MnptMTEgMC0xLTEtMS0xdi0xaDFsMSAxIDEgMSAxLTFoMXYtM2gtNWwxLTVoNXYxaC00bC0xIDNoNGwxIDEgMSAyLTEgMS0xIDF6bTkgMHYtN2gxbDMgMyAyLTNoMnY3aC0ydi02bC0yIDQtMy00djZ6bTkgMHYtN2gydjNoMWwyLTNoMWwtMiAzIDIgNGgtMWwtMi0zaC0xdjN6bTcgMnYtOWgxbDEgMSAxLTEgMS0xIDIgMSAxIDF2NGwtMSAxLTIgMS0xLTFoLTF2M3ptNC0zIDEtMXYtMmwtMS0xLTEtMS0yIDJ2M3ptNCAxdi03aDJ2M2gzdi0zaDF2N2gtMXYtM2gtM3Yzem05IDB2LTFoMWwxIDF6TTQyOCAyNTZ2LTdoNXYxaC00djJoNHYxbDEgMS0xIDF2MXptMS0xaDR2LTJoLTR6bTggMWgtMWwtMS0xdi0zbDEtMWgzdjFsMSAyLTEgMXYxem0wLTFoMWwxLTF2LTFsLTEtMWgtMnYzem0zIDF2LTRoNHY1aC0xdi00aC0ydjNsLTEgMXptNyAwdi01IDJoM2wxIDF2MWwtMSAxem0wLTFoMnYtMWgtM3ptNSAxdi01aDF2Mmgydi0yaDF2NWgtMXYtMmgtMnptNiAwdi01IDRoMXYtMWwyLTNoMXY1aC0xdi00IDF6bTEwIDJ2LTJoLTR2LTUgNGgzdi00aDF2NGgxem0zLTItMS0xdi0xbDEtMWgzdi0xaC0zdi0xaDNsMSAxdjRoLTF2LTFsLTEgMXptMC0xaDJ2LTFoLTN6bTcgMXYtN2gxbDMgNnYtNmgxdjdoLTFsLTMtNnptNi0zaDN6bTItMXYtMWgtMWwxLTF2LTFoMnYyem0wLTFoLTF6bTUgNWgtMXYtMWgzbDEtMS0xLTEtMS0xLTEgMWgtMXYtNGg0djFoLTN2MmgybDEgMSAxIDEtMSAxLTEgMXptLTIwMy0zMnYtN2gxdjZoM3YtNmgxdjZoMnYtNmgxdjd6bTEwIDB2LTVoMXYyaDFsMS0yaDFsLTIgMiAyIDNoLTFsLTEtMmgtMXptNyAwaC0xbC0xLTF2LTNsMS0xaDN2MWwxIDEtMSAydjF6bTAtMWgxbDEtMXYtMmgtMWwtMS0xLTEgMXYzem0zIDF2LTRoNHY1aC0xdi00aC0ydjNsLTEgMXptOCAwaC0xbC0xLTF2LTFsMS0xaDN2LTFoLTF2LTFsLTEgMWgtMXYtMWgzbDEgMXY0aC0xdi0xbC0xIDF6bTAtMWgydi0xaC0zem03IDF2LTdoMWw0IDZ2LTYgN2gtMWwtMy02em02LTNoM3ptMi0xdi0xbC0xLTFoMXYtMWgydjJ6bTAtMWgtMnptNCA1di02aC0yIDF2LTFoMnptMiAwIDItMSAxLTF2LTFoMXYtMWwtMS0xaC0xbC0xIDFoLTFsMS0xdi0xaDN2MWwxIDEtMSAxdjFsLTEgMS0yIDFoNHYxem0xMS0xNHYtMWwzLTMgMS0xIDEtMXYtMmwtMi0xaC0xbC0xIDFoLTFsMS0xIDEtMWgzbDEgMXYzbC0xIDItMSAxLTIgMmg0djF6bTExIDBoLTFsLTEtMWgtMXYtMmgxdjFsMSAxaDJ2LTFoMXYtMmgtMXYtMWgtMnYtMWgybDEtMXYtMWwtMS0xaC0xbC0yIDFoLTFsMS0xIDEtMWgybDEgMWgxdjJsLTEgMmgxdjNsLTEgMS0xIDF6bTkgMHYtN2gxbDMgMyAyLTNoMXY3aC0xdi02bC0yIDRoLTFsLTItNHptOSAwdi03aDF2M2gybDItM2gxbC0yIDMgMiA0aC0xbC0yLTNoLTJ2M3ptNyAydi05aDF2MWwxLTFoM2wxIDEgMSAyLTEgMi0xIDEtMSAxaC0xbC0xLTFoLTF2M3ptNC0zdi0xbDEtMS0xLTF2LTFoLTN2MWwtMSAxIDEgMXYxem00IDF2LTdoMXYzaDR2LTNoMXY3aC0xdi0zaC00djN6bTkgMHYtMWgxbDEgMXptLTY0LTQ5di03aDZ2N2gtMXYtN2gtNHptOSAwLTEtMXYtMmwxLTEgMi0xIDEgMSAxIDF2MmwtMSAxem0wLTFoMWwxLTF2LTJsLTEtMWgtMWwtMSAxdjJ6bTcgMXYtMmgtMmwtMS0xdi0zaDF2M2gydi0zaDF2NnptNCAwdi01aC0ydi0xaDR2MWgtMXptNSAwdi0xbC0xLTF2LTFoNHYtMWwtMS0xaC0ydjFoLTFsMS0xIDEtMSAyIDF2MWwxIDF2M2gtMXYtMWgtMXptMC0xdi0xaDF2LTFoLTJsLTEgMXptNyAxdi03aDFsMyA1di01aDF2N2gtMWwtNC02em02LTRoM3Yxem0yIDAtMS0xaC0xdi0yaDN2MnptMC0xdi0xaC0xdjJ6bTUgNS0xLTFoLTFsLTEtMXYtM2wxLTEgMi0xaDFsMSAxaC0xbC0xLTEtMSAxLTEgMXYxaDF2LTFoMmwxIDF2M2gtMXptMC0xdi0xbDEtMWgtMXYtMWgtMnYxaC0xbDEgMXptNiAxaC0xdi01bDItMWgybDEgMWgtMmwtMS0xdjFoLTF2MWgtMXYxbDItMWgydjFsMSAxLTEgMnptMC0xaDFsMS0xdi0xbC0xLTFoLTFsLTEgMXYyem02IDEtMi0xdi0xaDF2MWgybDEtMXYtMmgtNHYtM2g1LTR2M2wxLTFoMmwxIDF2M2gtMXptNSAwIDItN2gtMyA0em02IDAtMS0xaC0xdi0xaDF2MWgzdi0yaC0xbC0xLTFoMXYtMWgxdi0xbC0xLTFoLTFsLTEgMWgtMXYtMWg0bDEgMXYxbC0xIDEgMSAxdjJoLTFsLTEgMXptNCAwdi0xbDItMmgxbDEtMi0xLTEtMS0xdjFoLTJsMS0xaDNsMSAyLTEgMXYxaC0xbC0yIDJoNHYxem01OC0zIDEgMSAxLTF2LTZoMXY1bDMtNCAxIDEtMyAzdjFsLTIgMWgtMm01IDAgMS0xIDEtMSAxLTMgNCAxLTIgNWgtMWwyLTQtMi0xLTEgMXYybC0xIDF6bTcgMmgyem00IDEgMi02aDJsMSA0IDMtMyAxIDEtMiA2aC0xbDItNi00IDQtMS01LTIgNXptOCA1aDFsLTEtNmgxbDEgNSAzLTQtMiA0aC0xbC0xIDJ6bTUtMSAzLTEtMS0zaDF2MmwyLTFoMWwtMiAyIDEgM2gtMWwtMS0zem03IDN2LTNoNHYtMWgtM3YtMWgybDEgMSAxIDEtMSAxdjNsLTEtMWgtMm0wLTFoMnYtMWgtMnptNCAyIDEtNWgxdjNoMmwxLTJoMWwtMiA1aC0xbDEtMi0zLTF6bTcgMy0xLTF2LTNsMS0xIDEtMSAxIDFoMWwxIDJ2MWwtMSAxLTEgMXptMS0xIDEtMXYtMmwtMS0xaC0xbC0xIDF2MnptMyAyIDItNWgybDEgMXYyaC0xbDEgMXYxaC0xdjFoLTJ6bTEtMSAxIDFoMWwxLTFoLTF2LTFoLTJ6bTEtMmgxdi0yaC0yem01IDV2LTFoLTF2LTFsMS0xaDJsMSAxIDEtMS0xLTFoLTNsMS0xaDJsMSAxdjJsLTEgM3YtMWgtMm0wLTEgMS0xdi0xaC0zem0tMzE1IDIzLTEtMS02LTFoNmwtNC0zIDEtMSAzIDN2MWwxIDEgMSAxem0xLTVoLTF6bC0xLTFoLTFsLTEtMWgtMWwyLTMgNSAyLTEgMS00LTJ2MmgxbDEgMSAxIDF6bTMtNnYtMnptNC03aC0ybC0yIDMtMy02IDEtMSA0IDN2LTFoMXYxem0tNCAyIDItMy00LTJ6bTYtNmgtMmwtMS0xaC0ydi0xbC0xLTEgMS0yIDEtMWgybDIgMSAxIDF2M20tMS0xLTEtMS0yLTFoLTJsLTEgMXYxbDEgMSAxIDFoM3ptNC01LTEtMWgtMXYtMWgtMWwxLTMgNSAydjFsLTQtMi0xIDF2MWgydjFsMSAxem00LTdoLTNsLTEtMXYtM2gxbDEtMWgxbDEgMS0yIDNoMnpoMXYtMWgtMWwxLTF2M20tNCAwIDItM2gtMnptNi00LTQtMi0xIDEgMi00LTEgMiA1IDJ6bTMtNi02LTMgMi01IDcgMy0xIDEtNS0zLTIgNHptNS04LTEgMWgtM2wtMS0xLTEtMSAxLTIgMS0xaDFsMSAxaDFsMSAyem0tMSAwdi0ybC0xLTFoLTJsLTEgMXYxbDEgMXptMy01aC0xbC0xLTEtMy0xdi0zbDEtMWgxLTF2NGgxdi0ybDEtMWgybDEgMSAxIDF6bTAtMXYtMWwtMS0xaC0ydjFsLTEgMWgxdjFoMWExIDEgMCAwIDAgMi0xbTMtNGgtMmwtMi0xdi0zbDItMWgxbDEgMS0yIDNoMnpoMXYtMWgtMWwxLTF2M20tMyAwIDEtM2gtMnYyem02LTItMi0xdi0xbC0xLTFoLTFsLTEtMWgtMWwyLTQgNCAzdi0xbDIgMXYxbC0xLTEtMiAzem0tMi0yIDItMy00LTEtMSAxIDEgMWgxdjF6bTMtNS00LTJ2LTFsMiAxdi0xaDF2LTFoMnYxaDF2MWwtMSAxem0wLTEgMS0xdi0xaC0ydjJ6bTMtMy01LTJ2LTF6bTI5MSAyMzUgMS0xaDFsMS0xLTEtNiAxIDF2NGwzLTQgMSAxLTMgM3YxbC0xIDEtMSAxem02LTFoMXYtMWwxLTF2LTJsNCAxLTIgNSAxLTVoLTJ2MWgtMWwtMSAyem0xMSAzIDEtN2gxdjNoMWwzLTJoMWwtNCAzIDIgNGgtMWwtMi00aC0xem01IDMgMi03aDF2MWgzdjRsLTEgMWgtMmwtMS0xem0zLTJoMWwxLTF2LTJsLTEtMWgtMXYxbC0xIDF2MnptMyA0di0xaDJ2LTFsLTEtNiAxIDEgMSA0IDMtNHYxbC0yIDMtMiAydjF6bTYtMSAxLTUgNSAxLTIgNWgtMWwxLTVoLTJ6bTggMi0yLTF2LTJsMS0yaDNsMSAxdjFoLTF2LTFsLTEtMS0xIDFoLTF2M3poMXYxem0zIDEgMS01aDFsLTEgMmgxbDMtMnYxbC0yIDIgMSAzaC0xbC0xLTNoLTF6bTcgMi0xLTEtMS0xdi0ybDEtMSAxLTFoMmwxIDF2NGwtMSAxem0wLTFoMWwxLTF2LTFsMS0xaC0xbC0xLTFoLTF2MWwtMSAxdjF6bTQgMSAxLTUgMSAxemw0LTNoMWwtMiA2LTEtMSAxLTR2MXptNC01aC0ydi0xaDF6aDFsLTEgMXptLTIzMi0zMXYtMmgtNXYtNyA2aDR2LTZoMXY2aDF6bTItMnYtN2g1djFoLTR2MmgzdjFoLTN6aDR2MXptNiAwdi03aDF2M2g0di0zaDF2N2gtMXYtM2gtNHptOSAwdi02aC0ydi0xaDV2MWgtMnptNCAwdi03aDRsMSAxdjNsLTEgMWgtM3Yyem0xLTNoM3YtM2gtM3ptNCAzIDMtN2gxbDMgN2gtMWwtMS0xaC0zbC0xIDF6bTItMmgzbC0yLTR6bTUgMnYtNmg1djdoLTF2LTZoLTN2NnptOCAwdi03aDF2M2gzbDEgMXYybC0xIDF6bTEtMWgzdi0yaC0zem01IDF2LTdoMXYzaDR2LTNoMXY3aC0xdi0zaC00djN6bTggMHYtNyAzaDR2NHptMC0xaDNsMS0xLTEtMWgtM3ptNS02aDF2N2gtMXptMyA3di03aDF2Nmw0LTZoMXY3aC0xdi01bC00IDV6bTMtNy0xLTFoLTF2LTFoMXYxaDJ2LTFoMXYxem0tNTEgMTl2LTdoM2wxIDFoMXYzbC0xIDFoLTN6bTEtM2gzdi0ybC0xLTFoLTJ6bTQgMyAzLTdoMWwzIDdoLTFsLTEtMWgtM3ptMi0yaDNsLTItNHptNiAydi03emw0LTZoMXY3aC0xdi01em0yLTd2LTJsMSAxaDF2LTFoMXYxbC0xIDF6bTggOC0yLTEtMS0xdi00bDEtMSAyLTEgMiAxIDEgMXY0bC0xIDF6bTAtMSAxLTEgMS0xdi0zbC0xLTFoLTFsLTEgMS0xIDEtMSAxIDEgMSAxIDF6bTUgMHYtN2gxdjRoM3YtNGgxdjdoLTF2LTNoLTN6bS0xOSAxMDV2LTdoMXY2aDN2LTZoMXY2aDJ2LTZoMXY3em0xMCAwdi01aDF2MmgxbDEtMmgxbC0yIDIgMiAzaC0xbC0xLTJoLTF6bTcgMGgtMWwtMS0xdi0zbDEtMWgzbDEgMXYzbC0xIDF6bTAgMCAxLTFoMXYtMmwtMS0xaC0ydjN6bTMgMHYtMWwxLTJ2LTFoM3Y1aC0xdi00aC0ydjRoLTJtOCAwdi0xaC0xbDEtMSAxLTFoMnYtMWgtM3YtMWgzbDEgMXY0aC0zbTAgMCAxLTFoMXYtMWgtM3Yxem03IDB2LTdoMWw0IDZ2LTZoMXY3aC0ybC0zLTZ6bTctM2gydjF6bTEtMXYtM2gydjJ6bTAgMHYtMWgtMnYxem00IDR2LTVoLTJ2LTFoMnYtMWgxem02IDB2LTFoLTR2LTFsNC01aDF2NWgxdjFoLTF6bS0zLTJoM3YtNHptNjMgMTZ2LTFsMy0zaDFsMS0xdi0xbDEtMS0xLTEtMS0xLTEgMWgtMnYtMWg2djNsLTEgMi0xIDEtMyAyaDV2MXptMTAgMHYtOGgtMnYtMWgydi0xaDF2MTB6bTcgMHYtN2gybDIgMyAyLTNoMnY3aC0xdi02bC0zIDQtMy00djZ6bTEwIDB2LTdoMXYzaDFsMi0zaDFsLTIgMyAzIDRoLTJsLTItM2gtMXptNyAydi05aDF2MWwxLTFoM2wxIDF2NGwtMSAxLTIgMWgtMWwtMS0xem0zLTMgMS0xaDF2LTNsLTEtMWgtMmwtMSAxdjNoMXptNSAxdi03aDF2M2gzdi0zaDJ2N2gtMnYtM2gtM3ptOCAwIDEtMWgxem0xOTgtMTUgMS0xaDFsMS0xLTEtNiAxIDF2NGwzLTQgMSAxLTMgM3YxbC0xIDEtMSAxem02LTF2LTFoMXYtMWwxLTF2LTJsNCAxLTIgNSAxLTVoLTJsLTEgMXYyaC0xem02IDF2MXptNSAxIDEtNyAzIDFoMXYxaDF2MWwtMSAxLTEgMWgxdjJsLTEgMWgtMnptMSAwaDNsMS0xLTEtMWgtMWwtMi0xem0xLTNoMnYtMmgtMWwtMi0xem02IDVoLTFsLTEtMXYtMmwxLTEgMS0xaDJsMSAxdjR6bTAgMGgxbDEtMSAxLTF2LTFsLTEtMWgtMmwtMSAxdjF6bTYgMmgtMXYtMWgxemgydi0xbC0xLTFoLTFsMS0xdjFoMnYtMWwtMS0xaC0xdjFsLTEtMSAxLTEgMiAxIDEgMS0xIDF2MmwtMSAxem0yIDIgMi03aDF2MWgzdjRsLTEgMWgtMmwtMS0xLTEgMnptNC0yIDEtMXYtMWwtMS0xaC0xcTAtMSAwIDBoLTFsLTEgMiAxIDF6bTUgMmgtMWwtMS0xdi0ybDEtMSAxLTFoMWwyIDF2NHptMCAwaDFsMS0xdi0zaC0ybC0xIDF2MnptMyAxIDItMi0xLTNoMWwxIDNoMWwxLTJ2MmgxbDEtMiAxIDEtMiAyIDEgMy0xLTF2LTJoLTFsLTEgMmgtMWwxLTItMS0xLTIgMnptNyAzIDEtMmgxdi0ybDEtMXYtMWw0IDEtMSA0djNsLTEtMXYtMWwtNC0xdjJ6bTItMiAzIDEgMS00aC0yem03IDMtMS0xLTEtMXYtMWwxLTJoM2wxIDF2MmwtNC0xdjFsMSAxemgybC0xIDFoLTJtLTEtNCAzIDF2LTFsLTEtMWgtMXptNSA1IDEtNWgxbC0xIDIgMyAxdi0zbDEgMS0xIDUtMS0xIDEtMmgtM3ptNSAxIDEtNWgxbC0xIDRoMXYtMWwzLTJoMWwtMSA1aC0xbDEtNGgtMXptNiAxIDItMS0xLTF2LTJoNGwtMSA1aC0xbDEtMmgtMnptMy0ydi0xbC0xLTFoLTF2MnptLTEzNiA4MWgtMXpsLTEtMS02IDF2LTFoNWwtNC0zdi0xbDQgM2gxbDEgMXptLTEtNWgtMXYtMWgtMmwtMS0xaC0xbDEtMyA1IDF2MWwtNS0xdjJoM3Yxem0yLTExLTctMSAxLTEgMyAxdi0xbC0zLTMgMS0xIDIgMyA1LTItMSAxLTMgMnYxem0yLTdoLTRsLTEtMXYtMmwxLTFoNHYzbTAtMS0xLTEtMS0xaC0xbC0xIDF2MmwxIDFoMWwxLTF6bTEtMy01LTF2LTFsMy0xLTItMnYtMmw1IDJ2MWwtNC0xIDIgMi0zIDF6bTItOXYxbC0xIDFoLTJsLTEtMS0xLTF2LTJsMS0xaDF2MWgtMXYzaDN6aC0xdi0xaDF6bTItNS0xIDEtMSAxaC0ybC0xLTEtMS0xdi0xbDEtMmg0bDEgMXptLTEgMHYtMWwtMS0xaC0ybC0xIDF2MWgxbDIgMXptMS00LTUtMSAxLTEgMy0xLTMtMiAxLTEgNSAxdjFsLTUtMSAzIDItNCAyem0zLTktMSAyaC00bC0xLTF2LTJsMS0xIDEtMWgybDEgMXptLTEgMC0xLTEtMS0xaC0xdjFoLTF2MWwxIDFoMnptMS0zdi0xaC0ybC0xLTFoLTFsMS0zIDUgMXYxbC00LTEtMSAyaDNsMSAxem0yLTUtNS0yaDJ2LTJoMXYtMWgxbDEgMXptLTEtMSAxLTEtMS0xaC0xdjJ6bTMtNy0xIDJoLTRsLTEtMXYtMmwxLTEgMS0xdjFsLTEgMXYxbDEgMWgybDEtMXYtMWgtMWwxLTF6bTAtMy01LTF2LTFsMyAxdi0xbC0yLTJ2LTFsMiAyIDMtMXYxbC0yIDEtMSAxem0yLTZoLTJ2LTRoLTF2MWwtMSAxaDF2MWgtMXYtM2g2bC0xIDF6bS0xLTF2LTFoLTF2Mmgxem0yLTMtMi0xaC0zdi0ybDEtMiA1IDF2MWgtMmwtMSAxem0tMi0zaC0ydjNsMS0xem0tODEgMjE5di0yaC0xbC02LTFoNWwtMy0zdi0xbDQgMyAxIDJoMXYxem0wLTUtMS0xaC0xbC0yLTEgMS00IDUgMnYxbC00LTItMSAyaDF2MWgydjFsMSAxem0zLTZoMXptMi01LTctMiAxLTEgMyAxdi0xbC0yLTMgMS0xIDIgNCA0LTF2MWgtNHYxem0zLTd2MWwtMiAxLTEtMWgtMWwtMS0ydi0xbDEtMSAyLTEgMSAxIDEgMSAxIDF6bTAgMHYtMWwtMS0xLTEtMS0xIDFoLTF2MmwxIDFoMnptMi0zLTUtMnYtMWw0LTEtMi0ydi0xbDUgMi00LTEgMiAzaC00em00LTgtMSAxaC0zbC0xLTF2LTRoMnYxaC0xdjFsLTEgMWgxbDEgMWgxenYtMmwxIDF2Mm0yLTYtMSAyaC0ybC0yLTF2LTNsMS0xaDNsMSAxem0tMSAwLTEtMWgtM3YybDEgMWgyem0zLTMtNS0ydi0xaDNsLTEtM3YtMWw1IDJ2MWwtNC0yIDIgM2gtMWwtMyAxem0zLThoLTNsLTEtMS0xLTF2LTFsMS0yaDNsMSAxIDEgMXptMCAwdi0xbC0xLTF2LTFoLTJsLTEgMXYyem0yLTNoLTF6bC0xLTFoLTFsLTEtMWgtMWwyLTMgNSAyaC0xbC00LTEtMSAxIDEgMWgxbDEgMWgxem0yLTYtNS0yaDN2LTFsMS0xaDFsMSAxdjJ6bTAtMWgxbC0xLTFoLTF2MWwtMSAxem0zLTVoLTFsLTItMS0xLTF2LTFsMS0xIDEtMWgxbC0xIDEtMSAxdjJoM3psLTEtMSAxLTF2MWwxIDF6bTItMy01LTJ2LTFsMiAxIDEtMS0yLTIgMS0xIDEgMmgzdjFoLTN2MXptMy02djFoLTJ2LTFoLTF2LTFsMS0xdi0xaC0ydjMtMWwtMS0xIDEtMSAxLTFoMmwzIDEtMSAxem0tMS0xLTEtMXYxbC0xIDF2MWgyem0yLTItMS0zLTEgMWgtMWwtMS0xdi0ybDEtMiA1IDNoLTJsLTEgMSAxIDJ6bS0xLTRoLTJ2MWgtMWwxIDFoMXptMTc2LTM3di0yaC0xbC02LTFoNWwtMy0zdi0xbDQgMyAxIDIgMSAxem0wLTUtMS0xaC0xdi0xaC0xbC0xLTEgMS0zIDUgMnYxbC00LTItMSAyaDF2MWgydjFsMSAxem0zLTZoMXptMi01LTctMiAxLTJoNWwtMy0zdi0ybDcgM3YxbC02LTIgMyAzdjFoLTV6bTMtNy00LTJ2LTFsNCAydi0xaC0xbC0yLTRoMWw0IDItNC0xaDF6bTUtNS03LTNoMXYtMmwxLTFoM2wxIDF2M2gtMXptLTItMy0xLTFoLTNhMSAxIDAgMCAwIDAgMmwxIDFoMnptMy00aC0xbC0xLTF2LTJsMS0xaC0ydjJoLTF2LTJsMS0xaDNsMiAxdjFoLTF2Mm0wLTEtMS0xLTEgMXYyaDF6bTEzIDQ4di0xbDMtM2gxbDEtMXYtMWwxLTEtMS0xLTEtMWgtMWwtMSAxaC0xdi0xbDEtMWgzbDEgMSAxIDItMSAxdjFsLTIgMi0yIDJoNXYxem0xMiAwLTItMS0xLTF2LTFsLTEtMiAxLTJ2LTFsMy0yaDFsMiAxdjFoLTFsLTEtMWgtMmwtMSAxdjNsMS0xaDNsMSAxdjNsLTEgMXptMC0xIDEtMSAxLTF2LTFsLTEtMWgtMmwtMSAxdjJoMXptOSAxdi03aDFsMiAzIDMtM2gxdjdoLTF2LTZsLTIgNGgtMWwtMi00em05IDB2LTdoMXYzaDFsMi0zaDJsLTMgMyAzIDRoLTFsLTMtM2gtMXYzem03IDJ2LTloMXYxbDEtMWgzbDEgMSAxIDItMSAyLTEgMS0yIDFoLTF2LTFoLTF2M3ptMy0zIDItMXYtNGgtM2wtMSAxdjJ6bTUgMXYtN2gxdjNoNHYtM2gxdjdoLTF2LTNoLTR2M3ptOSAwLTEtMXYtMWgxem0tNTkxIDMxdi0yaC02di0xaDVsLTQtMyAxLTEgMyAzIDIgMnYybTAtNS0xLTEtMS0xLTEtMWgtMmwyLTQgNSAyLTEgMS00LTItMSAyaDF2MWgxbDEgMWgxem0yLTZoMXptMi00LTYtMyAxLTJ2LTJoM2wxIDF2M2wtMSAxIDMgMXptLTItMnYtM2wtMS0xaC0xbC0xIDF2MXptNC00LTEtMi0xIDFoLTFsLTEtMXYtMmwxLTIgNSAydjFsLTItMXYyem0tMS0zLTEtMS0xIDJ2MWgxem01LTQtMSAxLTEgMWgtMWwtMS0xLTItMS0xLTF2LTJsMS0xdi0xbDEgMWgtMXYzbDEgMXYtMmwxLTFoMWwyIDEgMSAxem0tMSAwdi0xaC0zdjJsMSAxaDF6bTItMy01LTJ2LTFsNCAydi0xbC0yLTN2LTFsNSAydjFsLTQtMnYxem0yLTUtNC0ydi0xbDIgMXYtMWwtMS0ydi0xbDIgMmgzbC0zIDF2MWwyIDF6bTMtN3YxaC0zbC0xLTEtMS0xdi0xbDEtMSAyLTEgMSAxaDFsMSAyem0wIDB2LTFsLTEtMXYtMWgtMmwtMSAxdjJoMWwxIDF6bTItMy01LTIgMS0ydi0xbDEtMWgxdjFoMmwxIDF2MXptLTEtMSAxLTJ2LTFoLTFsLTEgMXYxem0tMi0xIDEtMXYtMmgtMXYxaC0xdjF6bTYtNWgtMnYtMmwxLTJoLTJ2MWgtMXYxaDFsLTEgMXYtMmwxLTEgMS0xIDEgMSAzIDFoLTF2Mm0tMSAwdi0yaC0xdjFsLTEgMXptMTQtNnYtMWgxdi0ybC0yLTVoMWwyIDQgMS00aDFsLTEgNC0yIDN6bTUtMyAxLTF2LTNoM3Y1bC0xLTRoLTJ2NHptMTEgMHYtN2g0djFoLTN6bTYgMHYtM2gzdi0yaC0xbC0xIDFoLTF2LTFoM2wxIDF2NGgtMXYtMSAxaC0ybTEtMXYtMWgtMWwtMSAyem0zIDF2LTVsNC0xdjFoLTN2NXptNyAwaC0xbC0xLTF2LTJoM3YtMmgtMnYxaC0xdi0xaDF2LTFoMWwxIDFoMXY1aC0xdi0xem0wLTEgMS0xdi0xaC0ydjFoLTFsMSAxem0zIDJ2LTdoMXYxbDEtMWgxbDEgMSAxIDF2MmwtMSAxLTEgMWgtMWwtMS0xdjJ6bTMtMnYtNGgtMmwtMSAxdjJsMSAxem0zIDB2LTVoMXY0aDFsMi00aDF2NWgtMXYtNCAxbC0zIDN6bTcgMC0xLTVoMXYyaDN2LTJoMXY1aC0xdi0yaC0zem03IDAtMS0xdi0xbDEtMWgzbC0xLTFoLTNsMS0xaDN2MmwxIDNoLTF2LTFsLTEgMXptMC0xIDEtMWgtM3Yxek0yOTAgMjgwdi0xemgxbDEtNmgxbC0xIDUgNC0zLTMgMy0xIDEtMSAxaC0ybTUgMGgxdi0xbDEtMSAxLTEgMyAyLTMgNCAyLTQtMi0xdjFoLTF2MWgtMXYxem0xMCA1IDMtNiAxIDEtMSAzaDFsMy0yIDEgMS00IDIgMSA0LTEtMS0xLTMtMS0xem00IDUgNC02aDFsLTEgMWgybDEgMXYybC0xIDEtMSAxaC0xbC0xLTEtMS0xLTEgMnptNC0xaDF2LTFsMS0xLTEtMS0xLTEtMSAxaC0xdjJ6bTIgNGgxdi0xbDEtNiAxIDEtMSA1IDQtNHYxbC0zIDNoLTF2MWgtMWwtMSAxem02IDEgMi01IDQgMi0zIDV2LTFsMi0zLTItMnptNyA0LTItMXYtMmwxLTEgMS0xaDJsMSAxdjFsLTEtMS0xLTEtMSAxLTEgMXYxemgxbC0xIDF6bTIgMSAzLTRoMWwtMSAyaDFsMi0xIDEgMS0zIDF2M2wtMS0zaC0xbC0xIDJ6bTcgNC0xLTF2LTNsMS0xaDNsMSAxdjNsLTEgMXptMC0xaDJsMS0xdi0yaC0zdjJxLTEgMCAwIDB6bTMgMiAzLTRoMWwtMiA0IDQtMmgxbC0zIDV2LTFsMi0zaC0xem01LTR2LTJsMSAxemgxdjFoLTF6TTExMCAxODB2MWwxLTFoMXYtNmwxIDF2NGwzLTMgMSAxLTMgM2gtMWwtMSAxaC0zbTYgMHYtMWgxdi0xbDEtMXYtMWw0IDItMyA1LTEtMSAyLTQtMS0xLTEgMXYxbC0xIDEtMSAxem02IDRoMXExIDAgMCAwem00IDIgMy02aDFsLTIgM2gxbDQtMWgxbC00IDJ2NGgtMXYtNGgtMXptNCA0IDQtNnYxaDJsMSAxdjNsLTEgMWgtM2wtMS0xem00LTEgMS0xdi0xbC0xLTFoLTFsLTEgMXYyem0xIDUgMS0xaDJ2LTZoMXY1bDMtM2gxbC0zIDMtMSAxLTEgMXptNiAwIDMtNCA0IDItMyA0aC0xbDMtNC0zLTF6bTcgNHYtMmwxLTEgMS0xaDJsMSAxdjJsLTEtMXYtMWgtMmwtMSAxdjJ6djFsMS0xIDEgMWgtM20zIDIgMy01LTEgMiAxIDEgMy0xaDFsLTMgMXY0bC0xLTF2LTJsLTEtMXptNyAzLTEtMS0xLTEgMS0xIDEtMSAxLTEgMSAxaDFsMSAyLTEgMS0xIDEtMSAxem0wIDAgMS0xIDEtMXYtMWwtMS0xaC0ydjFsLTEgMXYxem0zIDIgMy01djFsLTIgM2gxbDQtMiAxIDEtMyA0aC0xbDItNHptNS00LTEtMXYtMWgxdjF6aDF2MXptMTA5IDI2M3YtN2gxemgydi03aDF2N2gzdi03aDF2N3ptOSAwdi01aDF2MmgxbDItMmgxbC0yIDMgMiAyaC0xbC0yLTJoLTF2MnptOCAwaC0ydi0xbC0xLTEgMS0ydi0xaDNsMSAxdjNsLTEgMXptMCAwdi0zaC0ybC0xIDF2Mmgxem0zIDB2LTRoNHY1aC0xdi00aC0ydjF6bTggMGgtMnYtMmgxdi0xaDNsLTEtMWgtM2wxLTFoMmwxIDF2NHptMCAwIDEtMWgtM3Yyem02IDB2LTdoMWw0IDZ2LTZoMXY3aC0xbC00LTV2NXptNy0zaDN2MXptMS0xdi0ybDEtMWgxbDEgMXYyaC0ybTAgMHYtMmgtMXYybTcgNHYtMWgtNHYtMWwzLTVoMnY1aDF2MWgtMXptLTMtMmgzdi00em04IDJoLTFsLTEtMXYtNWgxbDEtMSAyIDEgMSAydjJsLTEgMXYxem0wIDAgMS0xaDF2LTRsLTEtMWgtMnYxbC0xIDF2MmwxIDF6bS0xMzMtNHYtMWwzLTNoMWwxLTF2LTFsMS0xLTEtMS0xLTEtMSAxaC0ydi0xbDEtMSAzIDFoMnYzbC0xIDItMSAxLTMgMmg1djF6bTggMHYtMWwzLTNoMWwxLTF2LTFsMS0xLTEtMS0xLTEtMiAxaC0xdi0xbDEtMSAzIDFoMWwxIDItMSAxdjJsLTIgMS0yIDJoNXYxem0xMiAwdi03aDJsMiAzIDItM2gydjdoLTF2LTZsLTMgNC0zLTR2NnptMTAgMHYtN2gxdjNoMWwyLTNoMWwtMiAzIDMgNGgtMmwtMi0zaC0xem03IDJ2LTloMXYxbDEtMWgzbDEgMXY0bC0xIDEtMiAxaC0xbC0xLTF6bTMtMyAxLTEgMS0xdi0ybC0xLTFoLTFsLTIgMXYybDEgMXptNSAxdi03aDF2M2gzdi0zaDF2N2gtMXYtM2gtM3ptOCAwdi0yaDJ2MnptLTM2IDIyNXYtM2wxLTF2LTVoNHY2aDF2M2gtMXYtMmgtNXptMS0zaDR2LTVoLTN2M3ptOSAxaC0ybC0xLTF2LTNsMS0xaDN2MWwxIDJoLTR2MWgxemgxbC0xIDF6bS0yLTNoM3YtMWgtM3ptNiAzdi00aC0ydi0xaDV2MWgtMnY0em02IDBoLTFsLTEtMXYtM2wxLTFoMmwxIDFoLTN2M3poMWwtMSAxem0zIDB2LTVoMXYyaDFsMi0yaDFsLTIgMiAyIDNoLTFsLTItMmgtMXYyem03IDAtMS0xdi0xbDEtMWgzdi0xaC0zdi0xaDNsMSAxdjRoLTNtMCAwIDEtMWgxdi0xaC0zdjF6bTQgMCAxLTJoLTF2LTNoNHY1aC0xdi0yaC0xem0zLTJ2LTJoLTJ2MWwxIDF6bS0zOCAxNWgtMXYtNmgybDEtMWgxdjFoLTJsLTEgMS0xIDFoM2wxIDF2MmwtMSAxem0wLTF2LTNsLTEtMS0xIDEtMSAxIDEgMXptNiAxLTEtMS0xLTEtMS0xIDEtMmgxbDEtMSAxIDFoMXYzbC0xIDF6bTAtMXYtMWwxLTEtMS0xdi0xaC0ybC0xIDF2MmwxIDF6bTMgMHYtNGg0djVoLTF2LTRoLTJ2NHptNiAwdi01aDF2MmgybDEgMXYyem0xIDBoMXYtMmgtMnptNCAwdi01aDF2M2gzdi0zaDF2NWgtMXYtMmgtM3Yyem02IDB2LTVoMXY0bDMtNGgxdjVoLTF2LTQgMWwtMyAzem0xMCAydi0yaC00di01aDF2NWgzdi01aDF2N3ptNC0xaC0xdi0yaDF2LTFoMy0xdi0xaC0ydjFoLTF2LTFsMS0xaDN2NWgtMXptMC0xYTEgMSAwIDAgMCAxLTJoLTN2MnptNzcgOWgtMXYtMWwtMS0xLTYgMXYtMWg1bC00LTN2LTFsNCAzaDFsMSAxem0tMS01aC0xdi0xaC0ybC0xLTFoLTF2LTRsNiAyaC0xbC00LTF2MmwxIDFoMWwxIDF6bTEtNmgxem0xLTUtNy0xIDEtM3YtMWwxLTFoMmwxIDEgMSAxLTEgMnYxem0tMy0xIDEtMnYtMWwtMi0xaC0xdjJsLTEgMXptNS00LTItMi0xIDFoLTJ2LTRsNiAxLTEgMS0yLTF2MWwyIDJ6bS0yLTN2LTFsLTItMXYzaDF6bTMtNXYyaC0zbC0yLTEtMS0xdi0zaDF2MWwtMSAxdjFoMWwxIDF2LTNsMS0xaDJsMSAxem0wIDBoLTFsLTEtMWgtMXYxaC0xdjFsMSAxaDJ6bTEtMy01LTF2LTFsNCAxdi0xbC0zLTN2LTFsNSAxdjFsLTQtMXYxaDF6bTItNi02LTEgMS0xIDIgMXYtMWwtMi0ydi0xbDMgMiAzLTEtMSAxLTIgMXYxem0xLTd2MWwtMSAxaC0ybC0xLTEtMS0xdi0xbDEtMSAxLTFoMWwyIDF6bTAgMHYtMWwtMS0xaC0zdjJsMSAxaDJ6bTEtMy01LTIgMS0ydi0xaDJ2MWwxLTFoMWwxIDF2MXptMC0xdi0zaC0xdjFoLTF2MXptLTItMXYtMWgtMnYyem00LTUtMSAxaC0ydi00bC0xIDF2MmgtMXYtM2wxLTEgMiAxaDNsLTEgMXptLTEtMXYtMWgtMXYtMSAzaDF6TTE2OCA1MTBoMnYtMWwtMS01aDFsMSA1IDItNGgxbC0yIDMtMSAyaC0xdjFoLTJtNS0xaDF2LTNsMS0xIDMgMS0xIDVoLTFsMS00LTItMXYybC0xIDF2MWgtMm03IDJoLTF6di0xbDEgMXptNCAxIDItNyA1IDEtMSAxLTMtMS0yIDZ6bTcgMWgtMWwtMS0xdi0xbDEtMWgzdi0xaC0zdi0xaDJsMSAxIDEgMXYxbC0xIDMtMS0xaDF6bTAtMSAxLTFoLTN6bTMgMiAyLTUgMyAxaC0zbC0xIDR6bTYgMXYtMmwxLTFoMWwyIDF2LTJoLTNsMS0xaDFsMSAxIDEgMXYxbC0xIDNoLTF2LTFsLTEgMXptMSAwdi0xaDF2LTFoLTN2MXptMyAzIDItN3YxaDNsMSAxdjJsLTEgMS0xIDFoLTJ2LTFoLTF6bTMtMiAxLTJ2LTFsLTEtMWgtMWwtMSAxdjN6bTMgMiAxLTVoMWwtMSA0IDEtMSAzLTMgMSAxLTEgNWgtMWwxLTRoLTF6bTYgMSAxLTVoMXYybDIgMSAxLTJoMWwtMiA1aC0xbDEtMi0zLTF6bTcgMnYtMmg0di0xaC0xdi0xaC0xbC0xIDF2LTFoM2wxIDEtMSAydjJoLTF2LTEgMXptMS0xaDF2LTFoMS0xbC0yLTF2MnptLTgzIDc0aDJ2LTFsLTEtNWgxbDEgNSAzLTQtMiA0aC0xbC0xIDJoLTJtNS0xaDF2LTJsMS0xdi0xbDMgMS0xIDVoLTFsMS00LTItMXYybC0xIDF2MWgtMm03IDJoMnptNCAxIDItNyAxIDEtMSAzaDFsMy0yaDFsLTMgMiAxIDUtMS0xLTEtMy0xLTEtMSAzem01IDRoMWwxLTEtMS02IDEgMXY0bDMtM2gxbC0zIDN2MWwtMSAxLTEgMWgtMm02IDEgMi03djFoM2wxIDJ2MWwtMSAxLTEgMWgtMnYtMWgtMXptMy0yaDF2LTNsLTEtMWgtMWwtMSAxdjN6bTYgMyAxLTItMS0xaC0ydi0zaDF2MmwxIDFoMWwxLTN2MXptNCAxLTEtMSAxLTFoM2wxLTFoLTF2LTFoLTFsLTEgMS0xLTFoMWwxLTEgMSAxaDF2M2wtMSAydi0xbC0xIDF6bTAtMWgydi0xbC0xLTFoLTFsLTEgMXptNSAyIDEtNC0yLTEgMS0xIDQgMmgtMnptNSAxdi00bDEtMWgybDEgMSAxIDF2MmwtMSAxLTEgMXptMSAwdi0xbDEtMi0xLTFoLTFsLTEgMS0xIDEgMSAxem0zIDEgMS01IDIgMWgydjJoLTF2MWgxdjFsLTEgMWgtMnptMSAwaDN2LTFoLTFsLTItMXptMS0yaDF2LTFoLTFsLTEtMXptNSA0aC0xdi0ybDEtMWgxbDEgMSAxLTEtMS0xaC0zIDF2LTFoMmwxIDF2MmwtMSAzdi0xem0wIDBoMWwxLTF2LTFoLTJsLTEgMXptODUgMjJ2LTFoMXYtMWwtMi02aDFsMiA1IDEtNWgxbC0xIDQtMSAzaC0xem01LTNoMXYtNGg0bC0xIDZ2LTVoLTJ2MWwtMSAydjF6bTYgMXYtMWwxIDF6bTUgMHYtN2gxdjNoMWwyLTNoMWwtMiAzIDIgNGgtMWwtMi0zaC0xem02IDJoMWwxLTEtMy02aDFsMiA1IDItNGgxbC0yIDR2MWwtMSAxLTEgMXptNSAwdi03aDRsMSAxdjNsLTEgMWgtMmwtMS0xdjN6bTMtM3YtM2wtMS0xLTEgMWgtMXYybDEgMXptNyAxdi0yaC0zbC0xLTF2LTJoMXYyaDN2LTJoMXptNCAwaC0yYTEgMSAwIDAgMSAwLTJ2LTFoM3YtMWwtMS0xLTEgMWgtMXYtMWgzbDEgMXY0aC0xdi0xem0wLTF2LTFoLTJ2MXptNSAxdi00aC0ydi0xaDR2MWgtMXptNSAwLTEtMXYtM2wxLTFoM2wxIDF2M2wtMSAxem0wLTFoMnYtMmwtMS0xaC0xbC0xIDF2MXptNCAxdi01aDR2M2wxIDFoLTF2MXptMS0xaDN2LTFoLTN6bTAtMmgxdi0xaC0yem02IDN2LTJsMS0xaDJ2LTFoLTNsMS0xaDJsMSAxdjRoLTNtMSAwaDF2LTFoLTJsLTEgMWgxdjF6bS0xMTctNDF2LTdoNXYxaC00djJoM2wxIDF2MmwtMSAxem0xLTFoM3YtMmgtM3ptOCAxaC0ydi0xbC0xLTIgMS0xdi0xaDNsMSAxdjNsLTEgMXptMC0xdi0zaC0zdjJsMSAxem0zIDFoMXYtNGg0djVoLTF2LTRoLTJ6bTYgMHYtNWgxdjJoM3Yzem0xLTFoMXYtMWgtMnptNCAxdi01aDF2Mmgzdi0yaDF2NWgtMXYtMmgtM3Yyem02IDB2LTVoMXY0LTFsMy0zaDF2NWgtMXYtNCAxem0xMCAydi0yaC00di01aDF2NGgzdi00IDRoMXYzem00LTJoLTF2LTJsMS0xaDNsLTEtMWgtM2wxLTFoMmwxIDF2NC0xbC0xIDF6bTAtMSAxLTFoLTN2MXptNiAxdi03aDFsNCA2di02aDF2N2gtMWwtNC02djZ6bTctM2gzem0xLTF2LTFsMS0xaDFsMSAxdjFhMSAxIDAgMCAxLTIgMW0wLTF2LTFoLTF6bTYgNWgtMmwtMS0xdi0xaDF2MXpoMXYtMmwtMS0xaC0xbC0xIDFoLTFsMS00aDR2MWgtNHYyaDNsMSAxdjJ6bS03NS0yMDF2LTFsMS0xLTItNmgxbDIgNSAyLTVoMWwtMiA1LTEgMnptNS0ydi0xbDEtMXYtM2g0bC0xIDV2LTVoLTJ2MmwtMSAxdjJ6bTYgMHYxem01IDB2LTdoMmwyIDQgMi0zaDF2N2gtMXYtN2wtMiA1aC0xbC0yLTV6bTEwIDF2LTFoLTF2LTFsMS0xaDN2LTJoLTJ2MWgtMXYtMWgzbDEgMXY0aC0xdi0xbC0xIDF6bTAtMWgydi0yaC0ybC0xIDF6bTQgMSAxLTF2LTNoNGwtMSA1di00aC0ydjJoLTF2MXptNiAwdi01aDF2MmgydjFoMXYxbC0xIDF6bTEgMGgxbDEtMXYtMWgtMnptMyAwIDEtNXY2em0zIDF2LTZoMWwtMSA1aDJsMS00aDFsLTEgNGgybDEtNHY1em0xMCAwaC0ydi0xbC0xLTIgMS0xIDEtMWgxbDIgMXYyaC00bDEgMXpoMXYxem0tMi0zaDN2LTFoLTJ6bTUgMyAxLTVoM3YxbDEgMWgtMXYxaDF2MWwtMSAxem0xIDBoMmwxLTF2LTFoLTN6bTAtM2gzdi0xaC0zem03IDRoLTFsLTEtMXYtMmgzdi0yaC0ydjFoLTF2LTFoMWwxLTEgMiAxdjVoLTF2LTF6bTAtMXYtMmgtMnYyem00MzcgMjczaDFsMS0xdi02bDEgMXY1bDMtNCAxIDEtMyAzaC0xbC0xIDEtMSAxaC0xem02IDF2LTFoMXYtMWgxdi0xbDEtMXYtMWwzIDItMiA1LTEtMSAyLTQtMS0xLTEgMS0yIDN6bTYgM2gyem00IDIgMy02aDFsLTIgM2gxbDQtMiAxIDEtNCAydjRsLTEtNC0xLTF6bTQgNGgydi0xbDEtNWgxbC0xIDUgNC00IDEgMS00IDMtMiAxdjFoLTF6bTUgMyAzLTcgMSAxaDJsMSAxdjJsLTEgMXYxaC0zbC0xLTF6bTMtMiAxIDEgMS0xIDEtMXYtMWwtMS0xaC0yem02IDQgMS0yaC0xbC0xLTF2LTJsMS0xdjFsLTEgMSAxIDFoMXYxbDEtMyAxIDF6bTMgMiAxLTF2LTFoMmwxIDEgMS0xLTEtMWgtMnYtMWgybDEgMSAxIDEtMSAyLTEgMmgtMXYtMWgtMm0xLTF2LTFoMWwtMS0xaC0yem00IDMgMi00LTEtMSA0IDJ2MWwtMi0xem01IDMtMS0xdi0zbDEtMWgzbDEgMXYzbC0xIDF6bTAtMSAxIDEgMS0xIDEtMXYtMWwtMS0xaC0xbC0xIDF6bTMgMyAzLTUgMiAxIDEgMXYxbC0xIDF2MmgtMnptMi0xaDF2LTFsLTEtMWgtMXptMS0yaDJ2LTFoLTF6bTQgNnYtM2gybDIgMXYtMWwtMS0xaC0ybDEtMSAzIDF2MWwtMSAyLTEgMmgtMWwxLTFoLTJtMC0xIDEgMSAxLTF2LTFoLTJ6bS0xMzYgNTJ2LThoLTJsMS0xaDFsMS0xaDF2MTB6bTcgMGgtMWwtMS0xaC0xbC0xLTFoMmwxIDFoMmwxLTF2LTJoLTN2LTFsMS0xaDJ2LTFsLTEtMS0xLTEtMiAxdjFoLTF2LTFsMS0xIDEtMWgybDEgMSAxIDF2MmgtMWwtMSAxaDJ2NGgtMWwtMSAxem05IDB2LTdoMWwyIDMgMy0zaDF2N2gtMXYtNmwtMiA0aC0xbC0yLTR6bTkgMHYtN2gxdjNoMWwzLTNoMWwtMiAzIDIgNGgtMWwtMi0zaC0ydjN6bTcgMnYtOWgxdjFsMS0xaDNsMSAyIDEgMS0xIDItMSAxLTEgMWgtMWwtMi0xdjN6bTMtM2gydi0xbDEtMi0xLTF2LTFoLTJsLTIgMXYzem01IDF2LTdoMXYzaDR2LTNoMXY3aC0xdi0zaC00djN6bTkgMHYtMWwxLTF2Mm0xODIgNjJ2LTdoMXY2aDJ2LTZoMXY2aDN2LTZoMXY3em05IDB2LTZoMXYzaDFsMi0zaDFsLTIgMyAyIDNoLTFsLTItM2gtMXYzem04IDAtMS0xLTEtMS0xLTEgMS0xIDEtMSAxLTEgMSAxIDEgMXYybC0xIDF6bTAtMXYtMWwxLTEtMS0xdi0xaC0ybC0xIDF2MmwxIDF6bTMgMXYtMWgxdi01aDR2NmgtMXYtNWgtMnY0bC0xIDF6bTggMHYtMWwtMS0xdi0xaDR2LTFsLTEtMWgtMnYxaC0xbDEtMSAxLTEgMiAxdjFsMSAxdjNoLTF2LTFoLTF6bTAtMSAxLTF2LTFoLTJsLTEgMXptNyAxdi03aDFsMyA1di01aDF2N2gtMWwtNC02em02LTRoM3Yxem0yIDAtMS0xaC0xdi0yaDN2MnptMC0xdi0xaC0xdjJ6bTUgNWgtMWwtMS0xaC0xdi0xaDF2MWgzdi0yaC0xdi0xaC0xbDEtMWgxdi0xbC0xLTEtMiAxaC0xbDEtMWgzbDEgMXYxbC0xIDFoMXYzaC0xem02IDBoLTFsLTEtMS0xLTFoMWwxIDFoMnYtMWwxLTEtMS0xaC0zdi0zaDQtM2wtMSAzIDEtMWgybDEgMXYzaC0xek0zODAgNTc4di03aDUtNHYzaDR2M2gtMWwtMSAxem0xLTFoMmwxLTF2LTFsLTEtMWgtMnptNSAzdi04aDF2MWgxbDEtMSAxIDEgMSAxdjJsLTEgMS0xIDFoLTF2LTFoLTF2M3ptMy0zdi00aC0xbC0yIDF2MmwxIDF6bTUgMXYtMWgtMXYtMmg0di0xbC0xLTFoLTFsLTEgMWgtMWwxLTEgMS0xIDIgMXYxbDEgMXYzaC0xdi0xaC0xem0wLTEgMS0xdi0xaC0ybC0xIDF6bTUgMXYtNWgtMnYtMWg1djFoLTJ2NXptNiAwLTItMXYtM2wxLTEgMS0xIDEgMSAxIDFoLTF2LTFoLTJsLTEgMXYybDEgMWgydi0xaDF2MXptMyAwdi02aDF2M2gxbDItM2gxbC0yIDMgMiAzaC0xbC0yLTNoLTF2M3ptNSAwdi02aDF2NGgxbDItNGgxdjZoLTF2LTRsLTMgNHptNiAwdi02aDF2NGgxbDItNGgxdjZoLTF2LTRsLTMgNHptMy02LTEtMS0xLTFoMXYxemgxdi0xaDFhMSAxIDAgMCAxLTEgMnptLTU5IDE4di01aDV2NWgtMXYtNWgtM3Y1em05IDBoLTJsLTEtMXYtM2wxLTFoM2wxIDF2MmgtNGwxIDF6aDF2LTFoMWwtMSAxem0tMi0zaDN2LTFoLTFsLTEtMXYxem00IDR2LTJoMXYtNGg0djRoMXYyaC0xdi0xaC00djF6bTItMmgydi00aC0yem03IDFoLTJ2LTNoM3YtMWwtMS0xLTEgMWgtMXYtMWgzbDEgMXY0aC0xdi0xem0wLTF2LTFoLTJ2MXptMyAxdi01aDQtM3Y1em03IDBoLTFsLTEtMXYtM2wxLTFoM2wxIDF2M2wtMSAxem0wLTFoMWwxLTF2LTJoLTFsLTEtMS0xIDF2M3ptNCAxdi01aDQtM3ptNSAwdi01IDRsMS0xIDItM2gxdjVoLTF2LTR6bTkgMHYtMmgtM3YtMWwtMS0xdi0xaDF2Mmgzdi0yaDF6bTQgMGgtMWwtMS0xdi0zbDEtMWgzbDEgMnYxaC00djF6bDEtMWgxbC0xIDEtMSAxem0tMS0zaDN2LTFoLTFsLTEtMS0xIDF6bTcgM2gtMWwtMS0xdi0zbDEtMWgzdjFoLTFsLTEtMS0xIDF2M3p2LTFoMXYxbC0xIDF6bTMgMHYtNWgxdjJoMWwyLTJoMWwtMiAyIDIgM2gtMWwtMi0yaC0xdjJ6bTYgMHYtNWgxdjQtMWwyLTNoMXY1aC0xdi00em02IDB2LTVoMXY0LTFsMi0zaDF2NWgtMXYtNHptMi02aC0xbC0xLTFoNGwtMSAxem0tNTYgMTh2LTVoMXYybDItMmgxbC0yIDIgMiAzaC0xbC0xLTJoLTF6bTcgMGgtMWwtMS0xdi0zbDEtMWgzdjFsMSAyLTEgMXYxem0wLTFoMWwxLTF2LTFsLTEtMWgtMnYxbC0xIDFoMXptMyAxdi00aDR2NWgtMXYtNGgtMnYzbC0xIDF6bTYgMHYtNGg0djVoLTF2LTRoLTJ2M3ptOCAwaC0xbC0xLTF2LTNsMS0xaDJsMSAxIDEgMXYxaC00djF6aDJsLTEgMWgtMm0tMS0zaDN2LTFoLTN6bTQgNXYtM2gxdi00aDR2NGgxdjNoLTF2LTJoLTR2MnptMi0zaDJ2LTNoLTJ6bTQgMSAyLTMtMi0yaDFsMiAyaDF2LTIgMmgxbDItMmgxbC0yIDIgMiAzaC0xbC0yLTJoLTF2Mi0yaC0xbC0yIDJ6bTEyNS0yOHYtN2gxbDMgNCAyLTRoMXY3aC0xdi02bC0yIDRoLTFsLTItNHptMTEgMGgtMWwtMS0xLTEtMiAxLTEgMS0xaDN2M2gtNCAxdjF6aDF2LTFoMXYxem0tMi0zaDN2LTFsLTEtMS0xIDF6bTUgNHYtMmgxdi00aDR2Ni0xaC00em0xLTJoM3YtNGgtMnYzem01IDF2LTVoMXY0LTFoMWwyLTNoMXY1aC0xdi00bC0zIDR6bTEwIDF2LTFoLTR2LTVoMXY0aDN2LTRoMXY2em0yLTF2LTVoMXY0LTFsMy0zaDF2NWgtMXYtNGwtMyA0em02IDB2LTVoMXYyaDN2LTJoMXY1aC0xdi0yaC0zdjJ6bTggMGgtMWwtMS0xdi0zbDEtMWgybDEgMWgtMWwtMS0xLTEgMXYzemgxbDEtMWgxbC0xIDEtMSAxem00IDB2LTUgMmgxbDItMmgxbC0yIDIgMiAzaC0xbC0xLTJoLTJ6bTUgMHYtNWgxdjQtMWwzLTNoMXY1aC0xdi00aC0xem02IDB2LTVoMXY0LTFsMy0zaDF2NWgtMXYtNGgtMXptMi02di0xemgxbC0xIDF6bS01MCAxOHYtNSAyaDFsMi0yaDFsLTIgMiAyIDNoLTFsLTItMmgtMXptNyAwaC0xbC0xLTEtMS0xIDEtMiAxLTFoMmwxIDEgMSAyLTEgMS0xIDF6bTAtMXYtMWgxbC0xLTF2LTFoLTJsLTEgMXYxem0zIDF2LTRoNHY1aC0xdi00aC0ydjNsLTEgMXptNiAwIDEtMXYtM2g0djVoLTF2LTRoLTJ2M2gtMXptOCAwaC0xbC0xLTF2LTNsMS0xaDJsMSAyaDF2MWgtNHYxemgxdjFoLTJtLTEtM2gzdi0xaC0zem00IDV2LTNoMXYtNGg0djRoMXYzaC0xdi0yaC00djJ6bTItM2gydi0zaC0yem00IDEgMi0zLTItMmgxbDIgMnYtMmgxdjJoMWwxLTJoMWwtMSAyIDIgM2gtMWwtMi0yaC0xdjJoLTF2LTJoLTFsLTEgMnpNMzAxIDc2MXYtN2g1LTR6bTcgMC0xLTEtMS0xdi0ybDEtMSAxLTEgMiAxdjFsMSAxLTEgMXYxem0wLTFoMWwxLTF2LTJsLTEtMWgtMnYxbC0xIDEgMSAxem00IDJ2LTdoMXYxbDEtMSAyIDEgMSAxdjJsLTEgMS0yIDEtMS0xem0yLTJoMWwxLTF2LTJsLTEtMWgtMnY0em02IDEtMS0xLTEtMXYtMmwxLTEgMS0xIDIgMXYxbDEgMS0xIDF2MXptMC0xaDFsMS0xdi0ybC0yLTFoLTF2NHptMyAydi0yaDF2LTVoNHY1aDF2MmgtMXYtMWgtNHYxem0yLTJoMnYtNGgtMnptNyAxLTEtMS0xLTF2LTJsMS0xIDEtMWgxbDEgMXYxaC0xdi0xaC0ydjRoMnYtMWgxdjFoLTF6bTMgMHYtNmgxdjNoMWwyLTNoMWwtMiAzIDIgM2gtMWwtMi0zaC0xdjN6bTcgMC0xLTFoLTF2LTFsMS0xaDN2LTFsLTEtMWgtMWwtMSAxdi0xbDEtMWgxbDEgMWgxdjVoLTF2LTF6bTAtMWgxbDEtMXYtMWgtMmwtMSAxem00IDEgMS0yLTEtMXYtMmgxdi0xaDN2NmgtMXYtMmgtMXptMy0zdi0yaC0ydjJ6bS01MiAxNWgtMWwtMS0xdi0xbC0xLTEgMS0zIDItMWgydjFoLTNsLTEgMXYxbDEtMWgybDEgMXYzbC0xIDF6bTAtMSAxLTF2LTFsLTEtMS0xIDFoLTF2MWwxIDF6bTYgMWgtMmwtMS0xdi0zbDEtMWgzbDEgMXYzbC0xIDF6bTAtMXYtM2wtMS0xLTEgMWgtMXYybDEgMXptMyAxaDF2LTRoNHY1aC0xdi01aC0ydjNsLTEgMXptNiAwdi01aDF2MmgzdjJsLTEgMXptMS0xaDJ2LTJoLTJ6bTQgMXYtNWgxdjJoM3YtMmgxdjVoLTF2LTJoLTN2MnptNiAwdi01aDF2NC0xbDMtM2gxdjVoLTF2LTR6bTEwIDF2LTFoLTR2LTVoMXY0aDN2LTQgNGgxdjJ6bTQtMWgtMnYtM2gzdi0yaC0xbC0xIDFoLTF2LTFoM2wxIDF2NC0xem0wLTF2LTJoLTFsLTEgMXYxem02IDF2LTdoMWw0IDZ2LTZoMXY3aC0xbC00LTZ2NnptNy00aDN2MWgtM3ptMSAwdi0yaDN2MmwtMSAxem0wLTF2LTFsLTEtMXYybTQgNXYtNmgtMWwxLTFoMXY3em00ODAgNTd2LTdoLTJ2LTFoMWwxLTFoMXY5em05IDB2LTJoLTZ2LTFsNS02aDJ2NmgxdjFoLTF6bS00LTNoNHYtNXptMTEgM3YtN2gxbDMgNCAyLTRoMXY3aC0xdi02bC0yIDQtMy00em05IDB2LTdoMXYzaDJsMi0zaDFsLTIgMyAyIDRoLTFsLTItM2gtMnYzem03IDN2LTEwaDF2MWwxLTFoNGwxIDJ2M2wtMSAyaC0zbC0yLTF2NHptNC00IDEtMXYtM2wtMS0xaC0zdjFsLTEgMiAxIDF2MXptNCAxdi03aDJ2M2gzdi0zaDF2N2gtMXYtM2gtM3Yzem05IDBoMnptLTI3MSA2MWgtMmwtMS0xLTEtMWgxbDEgMWgzbDEtMXYtMWwtMS0xaC0ydi0xaDJ2LTFsMS0xLTEtMWgtM3YxaC0xdi0xbDEtMWg0djFsMSAxdjFsLTEgMWgtMWwxIDFoMXYzbC0xIDF6bTggMHYtN2gybDIgNCAzLTRoMXY3aC0xdi01bC0zIDMtMi0zdjV6bTEwIDB2LTdoMXYzaDFsMi0zaDJsLTMgNCAzIDNoLTFsLTMtM2gtMXYzem03IDN2LTEwaDF2MWwxLTFoMWwyIDEgMSAxdjRsLTEgMWgtM2wtMS0xdjR6bTMtNGgxbDEtMXYtM2gtMWwtMS0xLTIgMXYzbDEgMXptNSAxdi03aDF2M2g0di0zaDF2N2gtMXYtM2gtNHYzem04IDB2LTFoMXYxem0tMzM3IDExaC0ybC0xLTEtMS0xaDJsMSAxIDItMSAxLTEtMS0yaC01bDEtNWg2djFoLTV2M2g0bDEgMXYybC0yIDJ6bTggMHYtN2gybDIgMyAyLTNoMnY3aC0xdi02bC0zIDQtMy00djZ6bTEwIDB2LTdoMXYzaDFsMi0zaDFsLTIgMyAzIDRoLTJsLTItM2gtMXptNyAydi05aDF2MWwxLTFoM2wxIDF2NGwtMSAxLTIgMWgtMWwtMS0xem0zLTMgMS0xIDEtMXYtMmwtMS0xaC0ybC0xIDF2MmwxIDF6bTUgMXYtN2gxdjNoM3YtM2gydjdoLTJ2LTNoLTN6bTggMC0xLTEgMS0xaDF2MnptMTcwLTI4aC0xenYtMWwtNi0xaDVsLTMtM3YtMWwzIDMgMSAxIDEgMXYybTAtNS0xLTEtMS0xaC0xbDItMyA0IDJ2MWwtNC0yLTEgMSAxIDFoMWwxIDF2Mm0zLTZxMC0xIDAgMG0zLTQtNy0zIDEtMSAzIDJ2LTFsLTItNCAxLTEgMiA0aDR2MWgtNGwtMSAxem00LTctMSAxLTIgMS0xLTEtMS0xLTEtMSAxLTEgMS0xIDEtMSAxIDEgMSAxIDEgMXptLTEgMHYtMWgtMWwtMS0xaC0xbC0xIDF2MWwxIDF2MWgyem0yLTMtNC0ydi0xbDMtMS0xLTJ2LTFsNSAydjFsLTQtMiAxIDNoLTN6bTUtOC0xIDFoLTFsLTMtMXYtMmwxLTEgMS0xdjFoLTF2M2wyIDF2LTF6di0xaDF6bTMtNS0xIDEtMiAxLTEtMS0xLTEtMS0xIDEtMSAxLTEgMS0xIDIgMiAxIDF6bS0xIDB2LTFoLTFsLTEtMWgtMWwtMSAxdjFsMSAxIDEgMXptMi0zLTQtMnYtMWwzLTEtMS0ydi0xbDUgMnYxbC00LTIgMSAzaC0zem01LTgtMSAxaC0zbC0xLTF2LTJsMS0yaDFsMiAxIDEgMXptLTEgMHYtMmwtMS0xaC0ydjFsLTEgMSAxIDFoMWwxIDF6bTItM2gtMXYtMWgtMWwtMS0xaC0xbDItMyA1IDItMSAxLTQtMi0xIDJoMWwxIDFoMXptMy01LTQtMnYtMWwyIDF2LTFsMS0xaDJsMSAxdjFoLTF6bTAtMSAxLTF2LTFoLTF2LTFsLTEgMS0xIDF6bTQtNS0xIDFoLTNsLTEtMXYtM2wxLTFoMmwtMSAxaC0xdjJsMiAxaDF6aDFsLTEtMSAxLTF2M20xLTMtNC0zIDIgMSAxLTEtMi0zaDFsMSAyaDRsLTEgMWgtM3Yxem00LTZoLTFsLTEtMXYtMmwxLTFoLTJ2MmgtMXYtMmwxLTFoMmwzIDJoLTF2Mm0tMSAwdi0zbC0xIDF2MnptMy0zLTItMmgtMmwtMS0xIDEtMXYtMWwxLTEgNSAyLTEgMS0yLTF2MWwxIDJ6bS0xLTQtMi0xdjFoLTF2MWgyem0yMjYtMzZ2LTJoLTFsLTUgMnYtMWw0LTItNC0xdi0xbDQgMmgydjFoMXYybS0yLTVoLTR2LTRoNXYxaC00djJoNHYybTEtNy0xLTFoMm0wLTQtNy0xdi0xbDQtMi00LTJ2LTFoN3YxaC02bDQgMi01IDNoN3ptMC05aC01di0xbDQgMXYtMWgtMWwtMy0zaDV2MWgtNCAxem0yLTUtNy0xdi0xaDEtMXYtMWwxLTJoM2wxIDEgMSAxLTEgMXYxaDJ6bS0yLTNoLTFsLTEtMS0xIDFoLTF2MmgxbDEgMSAxLTF6bTEtNWgtMXYxaC0ydi00aC0xbC0xIDF2MWgxdjFoLTFsLTEtMXYtMWwxLTEgMS0xaDR2MWgtMWwxIDF6bS0xIDB2LTFsLTEtMWgtMXYybDEgMXoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik02NTEgNzc3aDJ2LTZsMSAxdjRsMy0zaDFsLTMgMy0xIDEtMSAxaC0zbTYgMHYtMWgxdi0xbDEtMXYtMWwzIDItMiA0aC0xbDItNC0yLTF2MWwtMSAxdjF6bTEwIDYtMi0ydi0xbDEtMiAxLTJoM2wyIDJ2M2wtMiAxLTEgMXptMC0xaDNsMS0xdi0zbC0xLTFoLTNsLTEgMXYzem02IDR2LTNsMi0yIDEtMSAxIDFoMnYxaC0xYTIwNTcyNDYwMDU2NSAyMDU3MjQ2MDA1NjUgMCAwIDAtMTQ0NDY5NDU5NTM5IDM4NTI1MTg5MjEwMUEyMDU3MjQ2MDA1NjUgMjA1NzI0NjAwNTY1IDAgMCAwIDY3NiA3ODJsMSAxLTEgMi0xIDFoLTJtMC0xaDJsMS0xdi0xbC0xLTFhMSAxIDAgMCAwLTIgMHYycS0xIDAgMCAwem0yIDQgNC02djFoMmwxIDF2MmwtMSAxLTEgMWgtMnYtMWwtMS0xem00LTEgMS0ydi0xbC0xLTEtMSAxaC0xdjJ6bTIgNCAxLTEgMS02djVsMy0zIDEgMS0zIDNoLTFsLTEgMXptOCAyIDEtMmgtMWwtMS0xdi0ybDEtMXYzbDIgMSAxLTN2MXptNCAydi0xbDEtMiAxLTEgMyAxdjNoLTFsLTMtMnYyemgxdi0xbDEgMWgtM20wLTMgMyAxdi0xbC0xLTFoLTF6bTMgNSAzLTUgMiAxIDEgMXYxaC0xdjJsLTEgMWgtMnptMS0xIDIgMWgxdi0xaC0xbC0xLTF6bTEtMiAxIDFoMnYtMWgtMWwtMS0xem01IDZ2LTNoMmwyIDF2LTFsLTEtMWgtMmwxLTEgMiAxaDF2MWwtMSAyLTEgMmgtMWwxLTF6bTAtMWgxdi0yaC0yeiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMmMyZTM1IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTg1OCA4ODhoMnYtNmgxdjVsMy0zaDFsLTMgMy0xIDEtMSAxaC0zbTYgMCAxLTF2LTFoMXYtMWwzIDItMiA0aC0xbDItNC0xLTEtMSAxdjFoLTFsLTEgMXptMTAgNS0xLTEtMS0yIDEtMSAxLTJoM2wyIDF2NGwtMiAxLTEgMXptMCAwaDJsMS0xIDEtMXYtM2gtMWwtMS0xLTIgMS0xIDF2M3ptNiAzdi0zbDItMiAxLTFoMWwyIDF2MWgtMXYtMWgtM3YxaDJ2MWwxIDEtMSAxdjFsLTIgMXptMCAwaDJsMS0xdi0yaC0zem0yIDQgNC03djJsMS0xIDEgMSAxIDF2MmwtMSAxLTEgMS0xLTFoLTFsLTEtMS0xIDJ6bTQtMSAxLTF2LTNoLTJsLTEgMXYyem0yIDRoMWwxLTZoMWwtMSA1IDMtM2gxbC0zIDMtMiAyem04IDIgMS0yaC0xbC0xLTF2LTJsMS0xaDFsLTEgMXYyaDJsMS0yIDEgMS0zIDR6bTQgMi0xLTF2LTNsMS0xaDNsMSAxdjNoLTFsLTMtMnYyemgxbDEgMWgtM20wLTQgMyAydi0yem0zIDUgMy00IDIgMSAxIDF2MWgtMXYzaC0yem0yIDBoMXYtMWwtMS0xaC0xem0xLTJoMXYtMWwtMS0xaC0xem00IDZ2LTJoMmwyIDF2LTJoLTNsMS0xaDJsMSAxdjFsLTEgMS0xIDNoLTFsMS0xaC0ybTAtMWgydi0xaC0yek0zNzcgNzk0di0xbC02LTIgMS0xIDQgMi0yLTQgMS0xIDIgNCAxIDJ6bTItNXYtMWwtMi0xdi0xbDItMyA0IDR2MWwtNC0zLTEgMSAxIDEgMSAxdjJtNS00LTEtMWgyem0xLTItMS0zLTEgMS0yLTF2LTFsLTEtMWgxdi0xbDItMiA1IDUtMi0yLTIgMnptLTEtNCAxLTEtMi0yLTEgMS0xIDF2MWgxbDEgMXptNSAwLTMtNHYtMWwyIDIgMi0yLTItMmgxbDMgM3YxbC0yLTEtMiAxIDIgMnptNC01LTMtMyAyLTMgMSAxLTIgMnptNS00aC00di0ybC0xLTEgMS0xIDEtMWgxbDEgMWgxbC0zIDMgMSAxaDF6di0xbDEtMXYyem0tMy0xIDItMi0xLTFoLTF2MWgtMXptNS0xdi0xaC0xdi0xbC0xLTEtMS0xIDMtMiAzIDN2MWwtNC0zLTEgMSAxIDEgMSAxIDEgMXYxem00LTV2LTJoLTJsLTEtMXYtMWwxLTEgMS0xIDQgM3YxbC0yLTFoLTF6bTAtMy0yLTEtMSAxdjFoMm0tMzAwIDg2di0xbDEtMS0yLTZoMWwyIDUgMS01aDFsLTEgNHYxbC0xIDJ6bTUtMyAxLTF2LTNoM3Y2aC0xbDEtNWgtMnYxaC0xdjN6bTYgMXYtMWwxIDF6bTIgMCAyLTMtMS0xLTEtMXYtMWwxLTFoNWwtMSA3di0zaC0ybC0yIDN6bTMtNGgydi0ybC0yLTEtMSAxaC0xdjJ6bTQgNHYtNWgxdjJoM3YtMiA1aC0xbDEtMmgtM3ptNiAwdi01aDMtMnptNyAwaC0ybC0xLTF2LTNsMS0xaDN2MWgxdjJoLTRsMSAxemgxem0tMi0zaDN2LTFoLTF2LTFsLTEgMXptNCAzdi0xbDEtMXYtMmgzdjVoLTF2LTRoLTJ2M2wtMSAxem02IDAgMi0yaC0xbC0xLTEgMS0xdi0xaDR2NWgtMXYtMmgtMWwtMiAyem0zLTJ2LTJoLTN2MWgxem01NjYtNzJ2LTdoMXY2aDN2LTZoMXY2aDJ2LTZoMXY3em0xMCAwdi02aDF2M2gxbDEtM2gxbC0yIDMgMiAzaC0xbC0xLTNoLTF6bTcgMC0xLTEtMS0xdi0ybDEtMSAxLTEgMiAxIDEgMXYybC0xIDF6bTAtMWgxbDEtMXYtMmwtMS0xaC0ydjR6bTQgMXYtM2wxLTF2LTJoM3Y2aC0xdi01aC0ydjR6bTcgMC0xLTEgMS0xaDFsMS0xaDF2LTFoLTJ2MWgtMXYtMWwxLTFoMWwxIDFoMXY1aC0xdi0xem0wLTFoMWwxLTF2LTFoLTJsLTEgMXptNyAxdi03aDFsNCA1di01aDF2N2gtMmwtMy02em03LTRoMnYxem0xIDB2LTJsMS0xIDEgMXYyem0wLTEtMS0xLTEgMXptNSA1di0xaC0xdi0xaDF2MWgybDEtMXYtMWwtMS0xaC0zdi0zaDUtNHYzLTFoM3YxbDEgMS0xIDJ6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMzYjVmNzciIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMzE1IDIyOHExMSAyIDEyIDEyLTEgMTAtMTIgMTItMTEtMS0xMi0xMiAyLTExIDEyLTEyIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtMzExIDI0MCA1IDIgNC0ydjNsLTQgMi00LTJoLTF6bTExLTItNiAzLTYtMyA0LTJoNXptLTE1IDB2M2wtMSAyaDNsLTEtMnYtMmgydjVsNiAyIDMtMSAzLTF2LTVsMi0xaDFsLTEtMS04LTN6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMzYjVmNzciIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNjEwIDI4NXExMSAyIDEyIDEyLTEgMTEtMTIgMTItMTAtMS0xMi0xMiAxLTEwIDEyLTEyIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtNjA2IDI5NyA1IDIgNC0ydjNsLTQgMi00LTEtMS0xem0xMS0yLTYgMy03LTMgNS0yaDRsMSAxem0tMTUgMHYzbC0xIDIgMSAxdi0xbDEgMSAxLTEtMS0yemwyIDF2NGw1IDIgMy0xIDMtMXYtNGwzLTJoLTFsLTctNHoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzNiNWY3NyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MjQgNDE1cTExIDEgMTIgMTItMSAxMC0xMiAxMS0xMS0xLTEyLTExIDEtMTEgMTItMTIiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im00MjAgNDI3IDUgMiA0LTJ2M2wtNCAyLTQtMmgtMXptMTEtMi02IDMtNi0zIDQtM3ExLTIgNCAxaDF6bS0xNSAwdjNsLTEgMmgxbDEtMXYxaDFsLTEtMnYtM2wyIDF2NGw2IDMgMy0xIDMtMnYtNGwyLTFoMWwtMi0xLTctNHoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzNiNWY3NyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMDEgNDMzcTExIDEgMTIgMTEtMSAxMS0xMiAxMi0xMC0xLTEyLTEyIDEtMTAgMTItMTEiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im0yOTcgNDQ0IDUgMyA0LTN2M2wtNCAyLTQtMS0xLTF6bTExLTItNiAzLTYtMyA0LTJoNGwxIDF6bS0xNSAwdjNsLTEgMiAxIDEgMS0xdjFsMS0xLTEtMnYtMmwyIDF2NGw2IDMgMy0yIDMtMXYtNGwyLTEgMS0xaC0ybC03LTR6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMzYjVmNzciIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNzQwIDczOHExMCAxIDExIDExLTEgMTEtMTEgMTItMTEtMS0xMi0xMiAxLTEwIDEyLTExIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtNzM1IDc0OSA1IDMgNS0zdjNsLTUgMi0zLTEtMi0xem0xMS0yLTYgMy02LTMgNC0yaDRsMSAxem0tMTUgMHYzbC0xIDIgMSAxIDEtMXYxbDEtMS0xLTJ2LTJsMiAxdjRsNiAyIDMtMSAzLTF2LTRsMi0yaDEtMWwtOC00eiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjM2I1Zjc3IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkwNCA3NzNxMTEgMSAxMiAxMS0xIDExLTEyIDEyLTEwLTEtMTItMTIgMi0xMCAxMi0xMSIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTkwMCA3ODUgNSAyIDQtMnYybC00IDItNC0xLTEtMXptMTEtMi02IDMtNy0zIDUtM3ExLTIgNCAxaDF6bS0xNSAwdjJsLTEgMiAxIDF2LTFsMSAxIDEtMS0xLTF6bDIgMXY0bDYgMyAyLTIgMy0xdi00bDMtMXYtMWgtMWwtNy00em0tNTcwLTU3cTExIDEgMTIgMTEtMSAxMS0xMiAxMi0xMC0xLTExLTEyIDEtMTAgMTEtMTEiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2IwMTYxNiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0zMjQgNzMxaDV2NGg0djVoLTR2NGgtNXYtNGgtNHYtNWg0em00IDFoLTN2NGgtNHYzaDR2NGgzdi00aDR2LTNoLTR6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjYzIDU2MHExMSAxIDEyIDExLTEgMTEtMTIgMTItMTEtMS0xMi0xMiAxLTEwIDEyLTExIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNiMDE2MTYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMjYwIDU2NWg1djRoNHY1aC00djRoLTV2LTRoLTR2LTVoNHptNCAxaC0zdjRoLTR2M2g0djRoM3YtNGg0di0zaC00eiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQ2MSAyMjNxMTEgMSAxMiAxMS0xIDExLTEyIDEyLTExLTEtMTItMTIgMS0xMCAxMi0xMSIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjYjAxNjE2IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTQ1OSAyMjhoNXY0aDR2NWgtNHY0aC02di00aC00di01aDR6bTQgMWgtNHY0aC00djNoNHY0aDR2LTRoNHYtM2gtNHoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzNiNWY3NyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01NzAgNTQxcTExIDEgMTIgMTEtMSAxMS0xMiAxMi0xMC0xLTEyLTEyIDItMTAgMTItMTEiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im01NjYgNTUzIDUgMiA0LTJ2MmwtNCAyLTQtMS0xLTF6bTExLTMtNiAzLTctMyA1LTJxMS0yIDQgMWgxem0tMTUgMHYzbC0xIDIgMSAxdi0xbDEgMSAxLTEtMS0xdi0zbDIgMXY0bDYgMyAyLTIgMy0xdi00bDMtMXYtMWgtMWwtNy00eiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjM2I1Zjc3IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQwMiA1NDNxMTAgMSAxMiAxMi0xIDEwLTEyIDExLTExLTEtMTItMTEgMS0xMSAxMi0xMiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTM5OCA1NTUgNCAyIDUtMnYzbC01IDItMy0yaC0xem0xMS0yLTcgMy02LTMgNS0zcTEtMiA0IDF6bS0xNSAwdjNsLTEgMmgxdi0xIDFoMmwtMS0yemwyIDF2NGw1IDMgMy0xIDMtMnYtNGwzLTEtMS0xLTgtNHoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzE3MjEzMyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NjQgMzg5cTEwIDEgMTIgMTEtMSAxMS0xMiAxMi0xMS0xLTEyLTEyIDEtMTAgMTItMTEiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NjIgNDA3di0xem01IDB2LTF6bS0zLTZoMnYxaC0yem0tMiAwaDF2MWgtMXptMi0yaDJ2MWgtMnptNSAxaC0ydi0xem0tOC0xaDJ2MWgtMnptMy0yaDJ2MWgtMnptLTQgMGgzdjFoLTN6bTEwIDFoLTN2LTF6bS0xNC00aDFsMSAxIDEgNSAxIDF2MWwtMSAyaDFsLTEgMXYxbDEgMSAyLTF2LTJoM3YxbDEgMiAxLTF2LTJoMS04di0yaDdsMS0xIDEtMyAxLTItMS0xaC0xMGwtMS0xeiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMTcyMTMzIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQzMSAzNDdxMTEgMSAxMiAxMS0xIDExLTEyIDEyLTExLTEtMTItMTIgMS0xMCAxMi0xMSIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTQzMCAzNjV2LTF6bTUgMHYtMXptLTMtNWgydjF6bTQgMXYtMWgxem0tNy0xaDJ2MXptMy0yaDJ2MXptNSAxaC0ydi0xaDJ6bS04LTFoMnYxem0zLTNoMnYyaC0yem0tNCAwaDN2MmgtM3ptOSAyaC0ydi0yaDN6bS0xMy00IDEgMSAyIDZoMXYxaC0xdjRsMSAxaDJ2LTJoM2wtMSAxIDIgMWgxdi0yaDF2LTFoLTh2LTFoN2wxLTEgMS00IDEtMmgtMTFsLTEtMmgtMXpNMjI5IDY1MXExMSAxIDEyIDEyLTEgMTAtMTIgMTItMTAtMS0xMi0xMiAyLTExIDEyLTEyIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNiMDE2MTYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMjI3IDY1Nmg1djRoNHY1aC00djRoLTV2LTRoLTR2LTVoNHptNCAxaC0zdjRoLTR2M2g0djVoM3YtNWg0di0zaC00eiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMTcyMTMzIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTc1NyA4NzJxMTEgMSAxMiAxMS0xIDExLTEyIDEyLTEwLTEtMTItMTIgMi0xMCAxMi0xMSIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTc1NiA4OTAtMS0xem01IDB2LTF6bS0zLTVoMnYxem00IDFoLTF2LTFoMXptLTctMWgydjF6bTMtM2gydjJoLTJ6bTUgMmgtMnYtMmgyem0tOS0yaDN2MmgtMnYtMXptNC0yaDJ2MWgtMnptLTQgMGgzdjFoLTN6bTkgMWgtMnYtMXptLTEzLTQgMSAxIDEgMSAyIDYgMSAxaC0xdjRsMSAxIDItMXYtMWgzbC0xIDEgMiAxaDF2LTJsMS0xaC04di0xaDdsMS0xIDEtNCAxLTItMS0xaC0xMXYtMWgtMXoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzE3MjEzMyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NzggNTA2cTEwIDEgMTIgMTItMSAxMC0xMiAxMS0xMS0xLTEyLTExIDEtMTEgMTItMTIiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NzYgNTI0di0xem01IDB2LTF6bS0zLTVoMnYxem01IDFoLTJ2LTFoMnptLTctMWgxdjF6bTItMmgydjF6bTUgMWgtMnYtMWgzem0tOC0xaDJ2MXptMy0yaDJ2MXptLTQgMGgzdjF6bTEwIDFoLTN2LTFoM3ptLTE0LTRoMWwxIDFoMWwyIDZ2MWwtMSAyIDEgMXYyaDJ2LTJoM3YxbDEgMWgxbDEtMmgtMSAxdi0xaC04di0xaDhsMS0xIDEtNHYtMmgtMTF2LTFsLTEtMXoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik02NDUgNDIzdi03aC0zIDYtMnptOSAydi0yaC01di03aDF2Nmgzdi02aDF2NmgxdjN6bTQtMiAzLTdoMWwzIDdoLTFsLTEtMmgtM2wtMSAyem0yLTNoM2wtMi00em02IDV2LTggMWgxbDEtMSAxIDEgMSAxdjJsLTEgMS0xIDFoLTF2LTFoLTF6bTItM3YtMWwxLTEtMS0xdi0xaC0ydjFsLTEgMSAxIDF6bTYgMS0xLTEtMS0xLTEtMSAxLTEgMS0xIDEtMSAxIDFoMXYyaC00bDEgMXYxaDJ2LTFoMXYxem0tMi0zaDN2LTJoLTJ2MXptNSAzdi02aDF2M2gzdi0zaDF2NmgtMXYtM2gtM3Yzem04IDAtMS0xaC0xdi0yaDRsLTEtMXYtMWgtMnYxaC0xdi0xaDFsMS0xIDIgMXY1LTFoLTF6bTAtMXYtMWgxdi0xaC0zdjJ6bS0yNzYtNDF2LTZoLTN2LTFoNnYxaC0yem05IDJ2LTJoLTV2LTdoMXY2aDN2LTZoMXY2aDF2M3ptNS0ydi03aDF2M2gxbDItM2gxbC0yIDQgMiAzaC0xbC0yLTNoLTF6bTggMGgtMWwtMS0xdi0zbDEtMWgzdjFsMSAyLTEgMXYxem0wIDAgMS0xaDF2LTJsLTEtMWgtMnYzem0zIDB2LTRoNHY1aC0xdi00aC0ydjRoLTJtNyAwdi01IDRoMXYtMWwyLTNoMXY1aC0xdi00IDF6bTcgMGgtMWwtMS0xaDJ6bDEtMWgxdi0xaC0ydi0xaDFsMS0xaC00IDFsMS0xaDJ2M2wxIDEtMSAxem02IDBoLTFsLTEtMXYtM2wxLTFoMWwyIDJ2MWgtNGwxIDF6aDFsLTEgMXptLTItM2g0bC0xLTFoLTJ6bTYgM3YtNSA0aDF2LTFsMi0zaDF2NWgtMXYtNCAxem0yLTZoLTFsLTEtMWgxemgxbC0xIDF6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMxNzIxMzMiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjcyIDIzNHExMSAxIDEyIDExLTEgMTEtMTIgMTItMTEtMS0xMi0xMiAxLTEwIDEyLTExIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjcwIDI1MnYtMXptNSAwdi0xaDF6bS0zLTZoMnYxaC0yem01IDFoLTJ2LTF6bS03LTFoMXYxaC0xem0yLTJoMnYyaC0yem01IDJoLTJ2LTJoM3ptLTgtMmgydjJoLTJ6bTMtMmgydjFoLTJ6bS00IDBoM3YxaC0yem0xMCAxaC0zdi0xem0tMTQtNCAxIDEgMSAxaDFsMiA1djJsLTEgMmgxdjNsMi0xdi0yaDN2MmwxIDFoMWwxLTItMS0xaDEtOHYtMWwxLTFoOGwxLTR2LTJsLTEtMWgtMTB2LTFoLTF6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMyYzJlMzUiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMjM5IDI2N3YtN2gtMiA1LTJ6bTkgMnYtMmgtNXYtN2gxdjZoNHYtNiA2aDF2M3ptNy0ydi0xaC0xdi0xaDF2MWgzdi0yaC0xbC0xLTFoLTEgMWwxLTFoMXYtMWwtMS0xaC0xbC0xIDFoLTFsMS0xaDNsMSAxdjFoLTF2MWwxIDF2MmgtMWwtMSAxem02IDB2LTFoLTF2LTJoNHYtMWwtMS0xaC0ydjFoLTFsMS0xIDEtMSAyIDF2MWwxIDF2M2gtMXYtMWgtMXptMC0xdi0xaDF2LTFoLTN2MnptOSAxLTItMXYtM2wxLTEgMS0xIDEgMWgxdjFoLTF2LTFoLTJsLTEgMXYybDEgMWgydi0xaDF2MXptNCAwdi01aC0xdi0xaDR2MWgtMnY1em02IDAtMS0xLTEtMXYtMmwxLTEgMS0xIDEgMSAxIDEgMSAxaC00djJoMmwxLTEtMSAyem0tMS0zaDNsLTEtMXYtMWgtMnptNSAzdi02aDF2M2wyLTNoMWwtMiAzIDIgM2gtMWwtMS0zaC0xem00IDB2LTFoMXYtM2wxLTF2LTFoM3Y2aC0xdi01aC0ydjRsLTEgMXptOSAwLTEtMS0xLTEtMS0xIDEtMSAxLTEgMS0xIDEgMSAxIDF2MmwtMSAxem0wLTF2LTFsMS0xLTEtMXYtMWgtMmwtMSAxdjJsMSAxem00IDF2LTZoMWwyIDMgMS0zaDF2NmgtMXYtNWwtMSAzaC0xbC0yLTN6bTQzMSA2NDF2LTZoLTJ2LTFoNXYxaC0yem05IDJ2LTJoLTV2LTdoMXY2aDR2LTYgNmgxdjN6bTUtMnYtN2gzbDEgMWgxdjNsLTEgMWgtM3Yyem0xLTNoM3YtM2gtM3ptNyAzLTEtMXYtM2wxLTFoM2wxIDF2M2wtMSAxem0wIDAgMS0xaDF2LTJsLTEtMWgtMWwtMSAxdjJ6bTYgMC0xLTF2LTNsMS0xaDNsMSAyaC0xbC0xLTFoLTFsLTEgMXYyemwxLTFoMmwtMSAxem00IDB2LTVoMXpsMy00djUtNGwtMSAxem02IDB2LTVoMXYyaDJ2LTJoMXY1aC0xdi0yaC0yem02IDB2LTUgMmgxbDItMmgxbC0yIDMgMiAyaC0xbC0yLTJoLTF6bTYgMHYtMmwxLTFoMnYtMWgtM2wxLTFoMmwxIDF2NGgtM20xIDBoMXYtMWgtMmwtMSAxaDF2MXpNNjM4IDUwMXYtN2g1djFoLTR2NnptNSAwdi01aDF2NC0xaDFsMi0zaDF2NWgtMXYtNGwtMyA0em02IDB2LTVoNXY1aC0xdi01aC0zdjV6bTggMC0xLTF2LTNsMS0xaDNsMSAxdjJoLTRsMSAxaDJ2LTFoMWwtMSAxLTEgMXptLTEtM2gzdi0xbC0xLTFoLTF2MXptNSA1di03aDRsMSAxdjNsLTEgMWgtM3YtMXptMi0zaDFsMS0xdi0yaC0xbC0xLTF2MWgtMXYyem02IDFoMXYtNmg1djdoLTF2LTZoLTN2MnptMTAgMGgtMWwtMS0xdi0zbDEtMWgzdjNoLTQgMXYxenYtMWgxdjFsLTEgMXptLTItM2g0bC0xLTF2LTFoLTFsLTEgMXptNiAzdi01IDJoM3YtMmgxdjVoLTF2LTJoLTN6bTcgMHYtNWgtMiA0LTJ6bTUgMGgtMWExIDEgMCAwIDEgMC0ydi0xaDN2LTJoLTFsLTEgMWgtMXYtMWgzbDEgMXY0LTFsLTEgMXptMC0xdi0yaC0xbC0xIDF2MXoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMjEgMjg1aDM0cTMgMCAzIDJ2OXEwIDItMyAyaC0zNHEtMyAwLTMtMnYtOXEwLTIgMy0yIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTIxIDI4NWgzNHEzIDAgMyAydjlxMCAyLTMgMmgtMzRxLTMgMC0zLTJ2LTlxMC0yIDMtMiIvPjxwYXRoIGlkPSJwYXRoIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIxIiBzdHJva2Utd2lkdGg9IjEiIGQ9Ik0xNTUgMjg1cTMgMCAzIDJ2OXEwIDItMyAyaC0zNHEtMyAwLTMtMnYtOXEwLTIgMy0yeiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMmMyZTM1IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0ibTEyNSAyOTUgMy03aDFsMiA3LTEtMWgtNHptMi0yaDNsLTItNHptNS0xaDN2MXptNyAzLTEtMXYtMWwxIDF6aDF2LTJoLTN2LTFoMnYtMWgxbC0xLTFoLTJ2MWgtMXYtMWwxLTFoM3YzaC0xbDIgMXYxbC0xIDF2MWgtMm02IDAtMS0xdi0xaDF2MXpoMXYtMmgtM3YtMWgydi0xaDFsLTEtMWgtMnYxaC0xdi0xbDEtMWgzdjNoLTFsMSAxaDF2MmwtMSAxaC0ybTUgMHYtNmgtMSAxdi0xaDF6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjUyIDIxaDM1bDIgMnY4cTAgMy0yIDNoLTM1cS0yIDAtMy0zdi04eiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTI1MiAyMWgzNWwyIDJ2OHEwIDMtMiAzaC0zNXEtMiAwLTMtM3YtOHoiLz48cGF0aCBpZD0icGF0aCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJtMjg3IDIxIDIgMnY4cTAgMy0yIDNoLTM1cS0yIDAtMy0zdi04bDMtMnoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im0yNTYgMzEgMy03aDFsMyA3aC0xbC0xLTJoLTNsLTEgMnptMi0zaDNsLTItNHptNiAwaDN6bTYgMy0xLTFoLTF2LTFoMXYxaDN2LTJoLTJ2LTFoMXYtMWgxdi0xbC0xLTFoLTFsLTEgMWgtMWwxLTFoM2wxIDEtMSAyIDEgMXYyaC0xbC0xIDF6bTcgMGgtMWwtMS0xaC0xdi0xaDF2MWgzdi0yaC0ydi0xaDF2LTFoMXYtMWwtMS0xaC0xbC0xIDFoLTFsMS0xaDNsMSAxdjFsLTEgMSAxIDF2MmgtMXptNCAwdi02aC0xbDEtMWgxdjd6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjUgNDczaDM1cTIgMCAyIDN2OGwtMiAzSDI1bC0yLTN2LThxMC0zIDItMyIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTI1IDQ3M2gzNXEyIDAgMiAzdjhsLTIgM0gyNWwtMi0zdi04cTAtMyAyLTMiLz48cGF0aCBpZD0icGF0aCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMSIgc3Ryb2tlLXdpZHRoPSIxIiBkPSJNNjAgNDczcTIgMCAyIDN2OGwtMiAzSDI1bC0yLTN2LThxMC0zIDItM3oiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Im0zMCA0ODMgMi03aDJsMiA3aC0xdi0xaC00em0xLTJoM2wtMS00em02LTFoM3YxaC0zem03IDNoLTFsLTEtMWgyenYtMWwxLTFoLTF2LTFoLTJ2LTFoMnYtMWwtMS0xaC0xbC0xIDF2LTFsMS0xaDJ2MWgxdjJsLTEgMWgxdjN6bTYgMGgtMWwtMS0xaDJ6di0xbDEtMWgtMXYtMWgtMnYtMWgydi0yaC0ybC0xIDF2LTFsMS0xaDJsMSAxdjJsLTEgMWgxdjN6bTUgMHYtNWgtMnYtMWgydi0xaDF6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiM3YzAzMGMiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNTYyIDIzMnExMSAxIDEyIDEyLTEgMTEtMTIgMTItMTAtMS0xMi0xMiAyLTExIDEyLTEyIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtNTU2IDI0NyAyIDFoMTBsMS0xaDF2MWgtMWwtMiAxLTExLTF6bTUgMGgybDIgMWgtNG0tMS0xMCAyIDF2NGg0bDEgMiAxIDNoLTJsLTMtMmgtMmwtMiAyaC0xdi0xbDEtNGgtMXYtMWgtMmwxLTEgMy0yem0tMSAxLTIgMWgtMXYzaDF2NGgtMWwtMiAyIDIgMSA0IDJoNGw1LTEgMS0xdi0zaC0xdi0xbC0xLTItMy0yaC0ydi0zaC0xdi0xbC0yLTFoLTF6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiM3YzAzMGMiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNjQ5IDMyMHExMSAxIDEyIDEyLTEgMTEtMTIgMTItMTAtMS0xMS0xMiAxLTEwIDExLTEyIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtNjQzIDMzNSAyIDFoMTBsMS0xIDEgMS0xIDFoLTEybC0xLTF6bTUgMXYtMmgybDIgMXYxem0tMS0xMSAyIDIgMSAzaDRsMSAydjNoLTJsLTMtMi0zIDJoLTJ2LTFsMS0zLTEtMS0yLTEgMS0xIDMtMnptLTEgMS0yIDFoLTF2M2wyIDEtMSAzaC0xbC0xIDIgMSAyIDQgMWg0bDUtMWgxbDEtMS0xLTItMS0xLTEtMy0yLTJoLTNsLTEtNC0yLTFoLTF6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiM3YzAzMGMiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNDc3IDM5MnExMSAxIDEyIDExLTEgMTEtMTIgMTItMTEtMS0xMi0xMiAxLTEwIDEyLTExIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNDcxIDQwN2gxbDIgMSA5LTFoMXYxbC0zIDF6bTQgMCAxLTEgMS0xIDIgMSAxIDF6bTAtMTAgMSAxIDEgMyA0IDEgMSAyIDEgMmgtMWwtMSAxdi0xbC0zLTItMyAxLTEgMi0xLTF2LTVoLTFsLTEtMSAxLTF6bS0xIDAtMyAxLTEgMSAxIDIgMSAxLTEgNC0yIDEgMiAyIDQgMWg0bDQtMWgxbDEtMXYtMmgtMWwtMS0xdi0zbC0zLTJoLTJsLTItNGgtMnoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzdjMDMwYyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02MzcgNDYycTExIDEgMTIgMTItMSAxMC0xMiAxMi0xMS0yLTEyLTEyIDEtMTEgMTItMTIiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im02MzAgNDc3IDIgMWgxMGwyLTF2MWwtMyAxaC04bC0yLTF6bTUgMGgxbDIgMXptLTEtMTAgMiAxIDEgNGg0bDEgMnYzaC0ybC0zLTItMyAyaC0ydi0xbDEtNGgtMXYtMWgtMXYtMWwzLTJ6bS0xIDEtMiAxaC0xdjNoMmwtMSA0aC0xbC0xIDIgMSAxIDQgMmg0bDUtMSAxLTFoMWwtMS0zaC0xdi0xbC0xLTItMi0yaC0ybC0yLTQtMi0xaC0xeiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjN2MwMzBjIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkxNyA1MDVxMTEgMSAxMiAxMi0xIDEwLTEyIDExLTEwLTEtMTEtMTEgMS0xMSAxMS0xMiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTkxMSA1MjAgMiAxaDEwbDEtMWgxdjFoLTFsLTIgMS0xMC0xem01IDB2LTFsMi0xIDIgMXYxem0tMS0xMCAyIDEgMSA0aDR2MmwxIDItMSAxaC0xdi0xbC0zLTItMiAxLTEgMi0yLTEgMS00LTEtMS0yLTEgMS0xem0tMSAwLTIgMS0xIDF2M2gybC0xIDRoLTFsLTEgMSAxIDIgNCAxIDMgMSAxLTFoNWwxLTFoMWwtMS0zaC0xdi0xbC0xLTMtMi0xaC0zbC0xLTQtMi0xaC0xeiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjN2MwMzBjIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTcyNiA2ODZxMTEgMiAxMiAxMi0yIDExLTEyIDEyLTExLTEtMTItMTIgMS0xMCAxMi0xMiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTcyMCA3MDEgMSAxaDEwbDItMXYxbC0zIDFoLTEwbC0xLTF6bTQgMGgxbDIgMXYxem0wLTEwIDEgMiAxIDNoNGwxIDJ2M2gtMnEwLTItMy0yaC0ybC0xIDJoLTJ2LTFsMS00aC0xdi0xaC0xbDEtMSAyLTJ6bS0yIDEtMiAxaC0xdjNsMiAxLTEgM2gtMWwtMSAyIDEgMiA1IDFoM2w1LTFoMWwxLTFxMS0yLTEtMmwtMS0xdi0zbC0zLTJoLTJsLTEtMy0xLTEtMi0xaC0xeiIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjN2MwMzBjIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTYyNiA4MjFxMTAgMSAxMiAxMS0xIDExLTEyIDEyLTExLTEtMTItMTIgMS0xMCAxMi0xMSIvPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTYyMCA4MzZoMWwyIDEgOC0xaDJ2MWwtMyAxLTgtMXptNCAwIDEtMSAxLTEgMiAxdjF6bTAtMTAgMSAxIDEgMyA0IDEgMSAydjJoLTF2MWwtMS0xcTAtMi0zLTJsLTIgMS0xIDItMi0xIDEtMXYtM2wtMS0xLTEtMSAxLTF6bS0xIDAtMyAxLTEgMXYybDIgMS0xIDQtMiAxIDEgMiA1IDFoNGw0LTFoMWwxLTF2LTJoLTJ2LTRsLTMtMmgtMmwtMS0zLTEtMS0yLTF6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiM3YzAzMGMiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTUxIDQxN3ExMSAxIDEyIDExLTEgMTEtMTIgMTItMTEtMS0xMi0xMiAxLTEwIDEyLTExIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMTQ0IDQzMmgxNHYxbC0zIDFoLThsLTItMXptNSAwIDEtMSAxLTEgMiAxdjF6bS0xLTEwIDIgMSAxIDMgNCAxIDEgMnYyaC0xbC0xIDF2LTFxMC0yLTMtMmwtMiAxLTEgMi0yLTF2LTFsMS0zLTEtMS0xLTEgMS0xem0tMSAwLTIgMS0xIDF2MmwyIDEtMSA0aC0xbC0xIDEgMSAyIDQgMWg0bDUtMWgxbDEtMS0xLTJoLTF2LTFsLTEtMy0yLTJoLTJsLTItNGgtM3oiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzdjMDMwYyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zNDAgNDcxcTExIDEgMTIgMTItMSAxMC0xMiAxMS0xMS0xLTEyLTExIDItMTEgMTItMTIiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMzQgNDg2aDFsMiAxcTQgMSA5LTFoMWwxIDFoLTFsLTIgMS0xMS0xem00IDAgMS0xIDItMSAxIDEgMSAxem0wLTEwIDEgMSAxIDMgNCAxIDEgMiAxIDItMSAxaC0xdi0xbC0zLTItMiAxLTIgMi0xLTF2LTVoLTFsLTEtMSAxLTF6bS0xIDAtMiAxLTEgMXYybDEgMXY0aC0xbC0yIDEgMiAyIDQgMWg0bDQtMWgydi0zaC0xdi0xbC0xLTMtMy0yaC0ybC0xLTNoLTFsLTEtMWgtMXoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0yOTkgNTA3di0ybDEtMXYtNmg1djdoMXYyaC0xdi0yaC01em0yLTJoM3YtNmgtM3ptOCAwaC0xbC0xLTEtMS0xIDEtMiAxLTFoMmwxIDJ2MWgtNGwxIDF6di0xaDF2MXptLTItM2gzdi0xaC0yem03IDN2LTRoLTJ2LTFoNHYxaC0xem01IDAtMS0xdi0zbDEtMWgzdjFsMSAxaC0xbC0xLTEtMiAxdjJ6bDEtMWgxbC0xIDFoLTJtNCAwdi01aDF2MmgxbDEtMmgxbC0yIDMgMiAyaC0xbC0xLTJoLTF6bTUgMHYtNWgxemwzLTRoMXY1aC0xdi00IDF6bTYgMHYtNWgxemwzLTRoMXY1aC0xdi00IDF6bTItNnYtMXpoMXYtMWgxdjF6bTkgNmgtMWwtMS0xdi0zbDEtMWgybDEgMXYxaC0xdi0xaC0ydjN6di0xaDF2MWgtMm01IDBoLTF2LTJoMWwxLTFoMmwtMS0xaC0zIDF2LTFoM2wxIDF2NGgtM20wIDBoMWwxLTF2LTFoLTN2MXptNCAydi0zaDF2LTRoM3Y1aDF2MmgtMXYtMmgtNHptMS0yaDN2LTRoLTN6bTggMHYtN2gxbDMgNnYtNmgxdjdoLTFsLTMtNXptNi0zaDN2MXptMi0xaC0ydi0yaDFsMS0xIDEgMXYyem0wIDB2LTFoLTF2MnptNiA0di01aC0xdi0xaDFsMS0xdjd6bTYgMGgtMmwtMS0xdi01aDFsMi0xIDEgMWgxdjV6bTAgMHYtNWgtMmwtMSAxdjRoMXptNCAwIDMtNmgtNHYtMWg1djF6bTc0LTc3di0zaDF2LTFsMS0xdi00aDR2NmgxdjNoLTF2LTJoLTV2MnptMi0zaDN2LTVoLTJsLTEgM3ptOCAxaC0xbC0xLTF2LTNsMS0xaDJsMSAxIDEgMXYxaC00djF6aDJsLTEgMWgtMm0tMS0zaDN2LTFoLTN6bTYgM3YtNGgtMnYtMWg1djFoLTJ6bTYgMGgtMnYtMWwtMS0yIDEtMXYtMWgzbDEgMWgtM2wtMSAxdjFsMSAxemgxem0zIDB2LTVoMXYyaDFsMS0yaDFsLTEgMiAyIDNoLTFsLTItMmgtMXptNSAwdi01aDF2NGwxLTEgMi0zaDF2NWgtMXYtNCAxbC0zIDN6bTYgMHYtNWgxdjRsMS0xIDItM2gxdjVoLTF2LTQgMWwtMyAzem0zLTZoLTFsLTEtMWg0bC0xIDF6bTggNi0xLTF2LTNsMS0xaDN2MWgxLTNsLTEgMXYxemgzLTFsLTEgMXptNSAwdi0zaDN2LTFoLTNsMS0xaDJsMSAxdjRoLTF2LTEgMWgtMm0xLTF2LTFoLTJsLTEgMWgybTMgM3YtM2gxdi00aDR2Ny0yaC00em0xLTNoM3YtM2gtMnYzem04IDF2LTdoMWw0IDZ2LTZoMXY3aC0xbC00LTZ6bTctM2gzem0xLTF2LTNoMnYxbDEgMWgtMXptMC0xaC0yem03IDV2LTZoLTIgMWwxLTF6bTUgMGgtMWwtMS0xLTEtMXYtM2wxLTEgMS0xaDJsMSAxIDEgMXYzbC0xIDF6bTAtMXYtMWgxdi0ybC0xLTF2LTFoLTJsLTEgMXYzem02IDFoLTFsLTEtMWg0di0ybC0yLTF2MWgtMnYtNGg1djFoLTR2MmgzbDEgMXYybC0xIDF6bTU0IDMxdi0ybDEtMXYtMmwxLTJ2LTJoNHY3aDF2MmgtMXYtMmgtNXYyem0yLTJoM3YtNmgtM3ptOCAwaC0xbC0xLTF2LTNsMS0xaDFsMiAxdjFsMSAxaC00djJ6di0xaDF2MWgtMm0tMS0zaDNsLTEtMWgtMnptNiAzdi00aC0ydi0xaDV2MWgtMnptNiAwaC0ydi0xbC0xLTEgMS0ydi0xaDNsMSAxdjFoLTF2LTFoLTJsLTEgMXYyaDF6di0xaDF2MXptMyAwdi01aDF2MmgxbDEtMmgxbC0xIDMgMiAyaC0xbC0yLTJoLTF6bTUgMHYtNWgxdjRoMWwyLTRoMXY1aC0xdi00IDFsLTMgM3ptNiAwdi01aDF2NGgxbDItNGgxdjVoLTF2LTQgMWwtMyAzem0zLTZoLTJ2LTFoMXp2MXptOCA2aC0xbC0xLTF2LTNsMS0xaDJsMSAxIDEgMWgtMWwtMS0xaC0ydjN6aDFsMS0xaDFsLTEgMXptNSAwdi0ybDEtMWgydi0xaC0zbDEtMWgybDEgMXY0aC0zbTAgMGgxbDEtMXYtMWgtMmwtMSAxem00IDJ2LTJsMS0xdi00aDR2Ny0yaC00em0xLTJoM3YtNGgtMnYzem0zMSAyNjd2LTNoMXYtMWwxLTF2LTRoNHY2aDF2M2gtMXYtMmgtNXYyem0yLTNoM3YtNWgtMmwtMSAyem04IDFoLTFsLTEtMXYtM2wxLTFoM2wxIDF2MmgtNHYxemgyLTFsLTEgMXptLTEtM2gzbC0xLTEtMS0xLTEgMXptNiAzdi01aC0yIDUtMnptNiAwaC0ydi0xbC0xLTIgMS0xdi0xaDR2MWgtMWwtMS0xLTEgMWgtMXYybDEgMXp2LTFoMXYxem0zIDB2LTVoMXYyaDFsMS0yaDFsLTEgMiAyIDNoLTFsLTItMmgtMXptNSAwdi01aDF2NC0xaDFsMi0zaDF2NWgtMXYtNGwtMyA0em02IDB2LTVoMXY0LTFoMWwyLTNoMXY1aC0xdi00bC0zIDR6bTMtNmgtMWwtMS0xaDQtMXptOCA2LTEtMXYtM2wxLTFoM2wxIDFoLTJsLTEtMXYxaC0xdjJsMSAxaDFsMS0xaDFsLTEgMS0xIDF6bTUgMHYtM2gzdi0xbC0xLTFoLTF2MWgtMXYtMWgzbDEgMXY0aC0xdi0xIDFoLTJtMS0xdi0xaC0zbDEgMXptMyAzdi0zaDF2LTRoNHY3LTJoLTR6bTEtM2gzdi00aC0ydjR6bTggMXYtN2gxbDQgNnYtNmgxdjdoLTFsLTQtNnptNy00aDN2MWgtM3ptMSAwdi0zaDJ2MWgxbC0xIDF6bTAtMXYtMWgtMnptNiA1IDMtNmgtNHYtMWg1djF6bTcgMGgtMWwtMS0xdi0xaDF6aDF2LTFoMXYtMmwtMSAxaC0ybC0xLTF2LTJsMS0xaDJsMSAxIDEgMXYzbC0xIDEtMSAxem0wLTMgMS0xLTEtMWgtMmwtMSAxIDEgMXptMTExLTE3NXYtM2gxdi02aDV2N2gxdjJoLTF2LTJoLTV6bTEtMmg0di02aC0zdjN6bTkgMGgtMmwtMS0xdi0xbDEtMnYtMWgzbDEgMXYyaC00djFoMXpoMXYxem0tMi0zaDNsLTEtMWgtMXptNiAzdi00aC0xdi0xaDR2MWgtMnY0em02IDBoLTFsLTEtMXYtM2wxLTFoMmwxIDItMS0xaC0ydjN6bDEtMWgxdjF6bTQgMHYtNSAyaDFsMi0yaDFsLTIgMyAyIDJoLTFsLTItMmgtMXptNSAwdi01aDF6bDMtNHY1LTRsLTEgMXptNiAwdi01aDF6bDMtNHY1LTRsLTEgMXptMi02aC0xbC0xLTF6di0xaDF2MWgtMm05IDZoLTJ2LTFsLTEtMSAxLTIgMS0xaDJsMSAxdjFoLTF2LTFoLTJsLTEgMXYyaDF6aDF2MXptNSAwaC0xdi0yaDF2LTFoM2wtMS0xaC0zbDEtMWgzdjVoLTJtMCAwIDEtMWgtM3Yyem0zIDJ2LTJsMS0xdi00aDR2NWgxdjJoLTF2LTJoLTR2MnptMi0yaDJ2LTRoLTJ6TTU4OCA4NTl2LTNoMXYtNmg1djZoMXYzaC0xdi0yaC01em0xLTNoNHYtNWgtM3Y1em05IDFoLTJ2LTFsLTEtMSAxLTJ2LTFoM2wxIDJ2MWgtNHYxaDR2MXptLTItM2gzdi0xaC0zem02IDN2LTRoLTF2LTFoNHYxaC0ydjR6bTYgMGgtMWwtMS0xdi0zbDEtMWgybDEgMWgtMmwtMSAxdjJ6aDJ2MWgtMm00IDB2LTUgMmgxbDItMmgxbC0yIDIgMiAzaC0xbC0yLTJoLTF6bTUgMHYtNWgxdjQtMWwzLTN2NS00aC0xdjF6bTYgMHYtNWgxdjQtMWwzLTN2NS00aC0xdjF6bTItNmgtMXYtMXpoMWwtMSAxem05IDZoLTJ2LTFsLTEtMSAxLTIgMS0xaDJsMSAxaC0zbC0xIDF2MWwxIDF6aDF2MXptNSAwLTEtMXYtMWwxLTFoM2wtMS0xaC0zbDEtMWgzdjUtMWwtMSAxem0wLTEgMS0xaC0zdjF6bTMgM3YtM2gxdi00aDR2NGgxdjNoLTF2LTJoLTR2MnptMi0zaDJ2LTNoLTJ6bTcgMXYtN2gybDMgNnYtNmgxdjdoLTFsLTQtNnY2em03LTNoM3ptMi0xaC0xbC0xLTF2LTFsMS0xaDFsMSAxdjF6bTAtMWgtMXYxem04IDVoLTJ2LTFsLTEtMXYtM2wxLTEgMi0xaDFsMSAyaC0xdi0xaC0zdjMtMWgzbDEgMXYxem0wLTF2LTJoLTF2LTFsLTEgMWgtMXYyaDJtNCAxdi01aC0xdi0xaDFsMS0xdjd6TTEyMCA0NTR2LTNoMXYtNmg1djZoMXYzaC0xdi0yaC01em0yLTNoM3YtNmgtM3ptOCAxLTEtMS0xLTEtMS0xIDEtMSAxLTEgMS0xIDIgMXYyaC00bDEgMXYxaDJ2LTFoMXptLTItM2gzdi0yaC0ydjF6bTcgM3YtNWgtMnYtMWg0djFoLTF6bTUgMC0xLTF2LTJsMS0xIDItMSAxIDEgMSAxaC0xbC0xLTFoLTFsLTEgMXYybDEgMWgxbDEtMWgxbC0xIDEtMSAxem00IDB2LTZoMXYzaDFsMS0zaDFsLTIgMyAyIDNoLTFsLTEtM2gtMXptNSAwdi02aDF2NGwzLTRoMXY2aC0xdi00aC0xem02IDB2LTZoMXY0bDMtNGgxdjZoLTF2LTR6bTItNnYtMWgxdjFoMXYtMWgxdjFsLTEgMXptOSA2LTEtMS0xLTF2LTJsMS0xIDEtMSAxIDEgMSAxaC0xdi0xaC0ydjRoMnYtMWgxdjFsLTEgMXptNSAwLTEtMWgtMXYtMWwxLTFoM3YtMWwtMS0xaC0xbC0xIDFoLTFsMS0xIDItMSAxIDF2MWwxIDF2M2gtMXYtMWgtMXptMC0xaDFsMS0xdi0xaC0ybC0xIDF6bTQgMnYtM2wxLTF2LTNoM3Y1aDF2MmgtMXYtMWgtNHptMS0yaDN2LTRoLTN6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiM3YzAzMGMiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjg5IDE2MnExMSAxIDEyIDEyLTEgMTAtMTIgMTEtMTEtMS0xMi0xMSAyLTExIDEyLTEyIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjgzIDE3N2gxbDIgMXE0IDEgOS0xaDJ2MWgtMWwtMiAxaC05bC0yLTF6bTQgMCAxLTEgMi0xIDEgMSAxIDF6bTAtMTAgMSAxIDEgMyA0IDEgMSAyIDEgMi0xIDFoLTF2LTFsLTMtMi0yIDEtMiAyLTEtMXYtNWgtMWwtMS0xIDEtMXptLTEgMC0yIDEtMSAxdjJsMSAxdjRoLTFsLTIgMSAyIDIgNCAxaDRsNC0xaDJ2LTNoLTF2LTFsLTEtMy0zLTJoLTJsLTEtMy0yLTFoLTF6Ii8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMyYzJlMzUiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMjM4IDE5NnYtM2gxdi02aDV2NmgxdjNoLTF2LTJoLTV6bTItM2gzdi01aC0zem04IDFoLTJ2LTFsLTEtMiAxLTF2LTFoM2wxIDF2MmgtNGwxIDF6aDJ6bS0yLTNoM3YtMWwtMS0xLTEgMXptNyAzdi01aC0yIDQtMnptNSAwaC0xbC0xLTF2LTNsMS0xaDJsMSAxaC0xbC0xLTEtMSAxdjN6aDFsMS0xaDFsLTEgMS0xIDF6bTQgMHYtNSAyaDFsMi0yaDFsLTIgMiAyIDNoLTFsLTEtMmgtMnptNSAwdi01aDF2NC0xbDMtM2gxdjVoLTF2LTRoLTF6bTYgMHYtNWgxdjQtMWwzLTNoMXY1aC0xdi00aC0xem0yLTZ2LTF6aDJsLTEgMXptOSA2aC0xbC0xLTEtMS0yIDEtMSAxLTFoM3YxaC0xbC0xLTEtMSAxdjN6di0xaDF2MXptNSAwYTEgMSAwIDAgMS0xLTJsMS0xaDN2LTFoLTFsLTEtMS0xIDFoLTFsMS0xaDN2MWwxIDF2M2gtMXYtMWwtMSAxem0wLTFoMXYtMWgtM3ptMyAzdi0zaDF2LTJsMS0xdi0xaDN2NGgxdjNoLTF2LTJoLTR2MnptMi0zaDJ2LTRoLTJ6bTggMXYtN2gxbDMgNnYtNmgxdjdoLTFsLTQtNnptNi00aDN2MWgtM3ptMiAwaC0xbC0xLTF2LTFsMS0xaDFsMSAxem0wLTFoLTF2MXptNiA1di02aC0xbDEtMWgxdjd6bTUgMGgtMXYtMWwtMS0xaDFsMSAxemgxdi0yaC0zdi0xaDJ2LTJoLTJ2MWgtMXYtMWwxLTFoM3YzaC0xbDEgMSAxIDEtMSAxdjF6bTcgMHYtMWgtM3YtMWwzLTVoMXY1aDF2MWgtMXYxem0tMi0yaDJ2LTR6bTIwMSAzOHYtNGgxdi01aDR2NmgxdjNoLTF2LTJoLTV6bTEtM2g0di02aC0zdjR6bTkgMS0yLTEtMS0xdi0ybDItMiAyIDEgMSAxdjFoLTR2MWwxIDFoMnYtMWgxbC0xIDF6bS0yLTNoM2wtMS0yaC0xbC0xIDF6bTYgM3YtNWgtMnYtMWg1djFoLTJ2NXptNiAwLTEtMS0xLTEtMS0xIDEtMSAxLTEgMS0xaDFsMSAxdjFoLTF2LTFoLTJ2NGgydi0xaDF6bTMgMHYtNmgxdjNoMWwyLTNoMWwtMiAzIDIgM2gtMWwtMi0zaC0xdjN6bTYgMHYtNiA0aDFsMi00aDF2NmgtMXYtNHptNiAwdi02IDRoMWwyLTRoMXY2aC0xdi00em0yLTYtMS0xLTEtMWgxdjFoMnYtMWgxdjF6bTkgNi0yLTEtMS0xdi0ybDEtMSAyLTFoMXYxbDEgMWgtMWwtMS0xaC0xbC0xIDF2MmwxIDFoMWwxLTFoMWwtMSAxem01IDAtMi0xdi0yaDN2LTJoLTJ2MWgtMXYtMWgxbDEtMSAxIDFoMXY1bC0xLTF6bTAtMXYtMmgtMnYyem0zIDJ2LTJoMXYtNWg0djVoMXYyaC0xdi0xaC00em0xLTJoM3YtNGgtMnYzem0xNSAxMzB2LTNoMXYtMmwxLTJ2LTJoNHY2aDF2M2gtMXYtMmgtNXYyem0yLTNoM3YtNWgtM3ptOCAxaC0xbC0xLTF2LTNsMS0xaDN2MWwxIDF2MWgtNHYxemwxLTEtMSAyem0tMS0zaDNsLTEtMS0xLTEtMSAxem02IDN2LTVoLTIgNS0yem02IDBoLTJsLTEtMXYtM2wxLTFoM2wxIDFoLTFsLTEtMS0xIDFoLTF2MmwxIDF6aDF2LTFoMWwtMSAxem0zIDB2LTVoMXYyaDFsMS0yaDFsLTEgMiAyIDNoLTFsLTItMmgtMXptNSAwdi01aDF2NC0xaDFsMi0zaDF2NWgtMXYtNGwtMyA0em02IDB2LTVoMXY0LTFoMWwyLTNoMXY1aC0xdi00bC0zIDR6bTMtNmgtMnYtMWgzem04IDZoLTFsLTEtMXYtM2wxLTFoM2wxIDFoLTJsLTEtMS0xIDF2M3poMWwxLTFoMWwtMSAxLTEgMXptNSAwdi0xbC0xLTFoMXYtMWgzdi0xbC0xLTFoLTF2MWgtMXYtMWgzbDEgMXY0aC0xdi0xIDF6bTAtMWgydi0yaC0xbC0xIDFoLTF6bTQgMnYtMmgxdi00aDR2Ni0xaC00em0xLTJoM3YtNGgtMnYzem04IDF2LTdoMWw0IDZ2LTZoMXY3aC0ybC0zLTZ6bTctNGgydjFoLTJ6bTEgMHYtM2gydjJ6bTAtMXYtMWgtMXYtMSAxaC0xem04IDVoLTFsLTEtMS0xLTFoMWwxIDFoMnYtMWwxLTF2LTFsLTEgMWgtM3YtMWwtMS0xIDItMmgybDEgMXY1bC0xIDF6bTAtM3YtMmgtMmwtMSAxIDEgMXptNiAzaC0xbC0xLTF2LTFoMXYxemgxbDEtMXYtMmwtMSAxaC0ybC0xLTF2LTJsMS0xaDJsMSAxIDEgMXYzbC0xIDEtMSAxem0wLTMgMS0xYTEgMSAwIDAgMC0yLTFoLTF2MnoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfMzQ4IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzM0OCkiPjxtYXNrIGlkPSJtYXNrMjgxXzM1MyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjIzIiB4PSI4MTUiIHk9IjMzNyIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNODE1IDM2MWgyNHYtMjRoLTI0eiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMzUzKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiM3YzAzMGMiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNODI3IDMzOHExMSAxIDEyIDExLTEgMTEtMTIgMTItMTEtMS0xMi0xMiAyLTEwIDEyLTExIi8+PC9nPjwvZz48bWFzayBpZD0ibWFzazI4MV8zNTgiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMzU4KSI+PG1hc2sgaWQ9Im1hc2syODFfMzYzIiB3aWR0aD0iMTYiIGhlaWdodD0iMTUiIHg9IjgxOSIgeT0iMzQxIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik04MTkgMzU2aDE3di0xNWgtMTd6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8zNjMpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04MjEgMzUzaDFsMiAxIDktMWgxcTIgMCAwIDB2MWgtMTN6bTQgMCAxLTJoMmwxIDEgMSAxem0wLTEwIDEgMXEyIDIgMSAzbDQgMSAxIDEgMSAzaC0ybC0zLTJoLTJsLTIgMmgtMXYtNWgtMWwtMS0xIDEtMXptLTEgMC0yIDFoLTJsMSAzIDEgMXY0aC0xbC0yIDEgMiAyIDQgMWg0bDQtMWgxbDEtMXYtMmgtMXYtMWwtMS0zLTMtMmgtMmwtMS0zLTEtMS0xLTFoLTF6Ii8+PC9nPjwvZz48bWFzayBpZD0ibWFzazI4MV8zNjgiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMzY4KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMyYzJlMzUiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNODA0IDMyMXYtN2g1djFoLTR2MmgzbDEgMXYyaC0xbC0xIDF6bTEtMWgzdi0yaC0zem02IDNoMXYtMWwtMi01aDFsMiA0IDEtNGgxbC0xIDQtMSAxdjFsLTEgMXptNCAwdi0zaDF2LTNsMS0xaDN2NGgxdjNoLTF2LTJoLTR2MnptMi0zaDJ2LTRoLTJ6bTUgMyAxLTEtMy01aDFsMiA0IDItNGgxbC0yIDR2MWwtMSAxdjFoLTJtMTIgMHYtMmgtN3YtNWgxdjRoMnYtNGgxdjRoMnYtNGgxdjRoMXptMi0ydi01aDF2NC0xbDItM2gxdjVoLTF2LTR6bTYgMHYtNWgxdjQtMWwzLTN2NS00aC0xem0yLTZoLTFsLTEtMWg0bC0xIDF6bS00OCAyMHYtNGwxLTF2LTJoM3Y0aDF2M2gtMXYtMmgtNHptMS0zaDN2LTNoLTN6bTcgMWgtMWwtMS0xdi0zbDEtMWgybDEgMSAxIDF2MWgtNHYxemgybC0xIDFoLTJtLTEtM2gzdi0xaC0zem02IDN2LTRoLTJ2LTFoNXYxaC0yem02IDBoLTJ2LTFsLTEtMSAxLTJ2LTFoM2wxIDFoLTNsLTEgMXYyaDF6aDF2MXptMyAwdi01aDF2MmgxbDItMi0xIDIgMiAzaC0xbC0yLTJoLTF6bTUgMHYtNWgxdjRsMS0xIDItM2gxdjVoLTF2LTQgMWwtMyAzem02IDB2LTVoMXY0bDEtMSAyLTNoMXY1aC0xdi00IDFsLTMgM3ptMy02aC0xbC0xLTFoMXpoMWwtMSAxem04IDYtMS0xdi0zbDEtMWgzdjFoMS0zbC0xIDF2MnpsMS0xaDJsLTEgMXptNSAwdi0zaDN2LTFoLTNsMS0xaDJsMSAxdjRoLTNtMSAwaDF2LTFoLTJsLTEgMWgxem0zIDJ2LTNoMXYtNGg0djRoMXYzaC0xdi0yaC00em0xLTNoM3YtM2gtMnYzeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8zNzMiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMzczKSI+PG1hc2sgaWQ9Im1hc2syODFfMzc4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjMiIHg9Ijg4NiIgeT0iMzkwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik04ODYgNDEzaDI0di0yM2gtMjR6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8zNzgpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzdjMDMwYyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04OTggMzkwcTExIDEgMTIgMTEtMSAxMS0xMiAxMi0xMS0xLTEyLTEyIDEtMTAgMTItMTEiLz48L2c+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzM4MyIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV8zODMpIj48bWFzayBpZD0ibWFzazI4MV8zODgiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNSIgeD0iODkwIiB5PSIzOTMiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTg5MCA0MDhoMTd2LTE1aC0xN3oiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzM4OCkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTg5MiA0MDVoMWwyIDEgOC0xaDJ2MWwtMyAxem00IDAgMS0xIDEtMSAyIDEgMSAxem0wLTEwIDEgMSAxIDMgNCAxIDEgMnYybC0xIDEtMS0xcTAtMi0zLTJsLTIgMS0xIDItMi0xIDEtMXYtNGgtMWwtMS0xIDEtMXptLTEgMC0zIDEtMSAxIDEgMiAxIDEtMSA0LTIgMSAxIDIgNSAxaDRsNC0xaDFsMS0xdi0yaC0ydi00bC0zLTJoLTJsLTItNC0xLTEtMSAxeiIvPjwvZz48L2c+PG1hc2sgaWQ9Im1hc2syODFfMzkzIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzM5MykiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZjFmM2YzIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTg4MCAzMTRxMTEgMSAxMiAxMS0xIDExLTEyIDEyLTExLTEtMTItMTIgMS0xMCAxMi0xMSIvPjwvZz48bWFzayBpZD0ibWFzazI4MV8zOTgiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfMzk4KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMyYzJlMzUiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNODYwIDI5N3YtN2g1djFoLTR2MmgzbDEgMXYybC0xIDF6bTEtMWgzdi0yaC0zem02IDNoMXYtMWwtMi01aDFsMiA0IDEtNGgxbC0xIDR2MWgtMXYxem01IDB2LTNsMS0xdi0zaDN2NGgxdjNoLTF2LTJoLTR6bTEtM2gzdi00aC0ybC0xIDJ6bTUgM2gydi0xbC0yLTVoMWwxIDQgMi00aDFsLTIgNHYxbC0xIDF2MWgtMm0xMiAwdi0yaC02di01IDRoMnYtNGgxdjRoMnYtNGgxdjRoMXptMi0ydi01aDF2NC0xbDMtM2gxdjVoLTF2LTRoLTF6bTYgMHYtNWgxdjQtMWwzLTNoMXY1aC0xdi00aC0xem0yLTZ2LTF6aDFsLTEgMXptLTI2IDE4aC0ybC0xLTF2LTNsMS0xaDJ2LTFoMXYxaDJsMSAxdjNsLTMgMXptLTEtMnYtM2gtMmwtMSAxdjF6bTIgMGgxbDEtMXYtMmgtMnptNyAyaC0ybC0xLTF2LTRsMS0xIDItMSAyIDEgMSAxIDEgMi0xIDItMSAxem0wLTFoMmwxLTF2LTJsLTEtMS0xLTFoLTJsLTEgMXYzbDEgMXptNSAxdi03aDF2M2gxbDItM2gxbC0yIDQgMiAzaC0xbC0yLTNoLTF6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzQwMyIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV80MDMpIj48bWFzayBpZD0ibWFzazI4MV80MDgiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyMyIgeD0iOTIwIiB5PSIzNTAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTkyMCAzNzNoMjR2LTIzaC0yNHoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzQwOCkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMTcyMTMzIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkzMiAzNTBxMTEgMSAxMiAxMi0xIDEwLTEyIDExLTExLTEtMTItMTEgMi0xMSAxMi0xMiIvPjwvZz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNDEzIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzQxMykiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMmMyZTM1IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTg3MyAzNzN2LTdoNXYxaC00djJoM2wxIDF2MmwtMSAxem0xLTFoM3YtMmgtM3ptNSAzaDJ2LTFsLTItNWgxbDIgNCAxLTRoMWwtMSA0LTEgMXYxbC0xIDFoLTJtNSAwdi0zaDF2LTRoNHY0aDF2M2gtMXYtMmgtNHYyem0yLTNoMnYtM2gtMnptNSAzIDEtMS0zLTVoMWwyIDQgMi00aDFsLTIgNHYxbC0xIDF2MWgtMm0xMiAwdi0yaC03di01aDF2NGgydi00aDF2NGgydi00aDF2NGgxem0yLTJ2LTUgNGwxLTEgMi0zaDF2NWgtMXYtNCAxem02IDB2LTVoMXY0LTFsMi0zaDF2NWgtMXYtNCAxem0yLTZoLTFsLTEtMWg0djF6bS00OCAyMHYtNGgxdi0zaDN2NWgxdjJoLTF2LTJoLTR6bTEtMmgzdi00aC0zem03IDBoLTFsLTEtMXYtM2wxLTFoMmwxIDEgMSAxdjFoLTR2MXp2LTFoMmwtMSAxaC0ybS0xLTNoM3YtMWgtM3ptNiAzdi00aC0ydi0xaDV2MWgtMnptNiAwaC0ydi0xbC0xLTEgMS0ydi0xaDNsMSAxdjFoLTF2LTFoLTJsLTEgMXYyaDF6aDF2MXptMyAwdi01aDF2MmgxbDEtMmgxbC0xIDMgMiAyaC0xbC0yLTJoLTF6bTUgMHYtNWgxdjRoMWwyLTRoMXY1aC0xdi00IDFsLTMgM3ptNiAwdi01aDF2NGgxbDItNGgxdjVoLTF2LTQgMWwtMyAzem0zLTZoLTFsLTEtMWgxemgxbC0xIDF6bTggNi0xLTF2LTNsMS0xaDN2MWwxIDFoLTFsLTEtMWgtMWwtMSAxdjJ6bDEtMWgybC0xIDF6bTUgMHYtMmwxLTFoMnYtMWgtM2wxLTFoMmwxIDF2NGgtM20xIDBoMXYtMWgtMmwtMSAxaDF2MXptMyAydi0zaDF2LTRoNHY3LTJoLTR6bTEtMmgzdi00aC0ydjN6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzQxOCIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV80MTgpIj48bWFzayBpZD0ibWFzazI4MV80MjMiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyMyIgeD0iNzYwIiB5PSI0ODIiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTc2MCA1MDZoMjR2LTI0aC0yNHoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzQyMykiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjM2I1Zjc3IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTc3MiA0ODJxMTEgMSAxMiAxMi0xIDExLTEyIDEyLTExLTEtMTItMTIgMS0xMCAxMi0xMiIvPjwvZz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNDI4IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzQyOCkiPjxtYXNrIGlkPSJtYXNrMjgxXzQzMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjEyIiB4PSI3NjMiIHk9IjQ4OCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNzYzIDUwMGgxOHYtMTJoLTE4eiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNDMzKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtNzY4IDQ5NCA0IDIgNS0ydjNsLTUgMi0zLTEtMS0xem0xMS0yLTcgMy02LTMgNS0yaDRsMSAxem0tMTUgMHYzbC0xIDIgMSAxdi0xbDEgMSAxLTEtMS0yemwyIDF2NGw1IDIgMy0xIDMtMXYtNGwzLTJoLTFsLTgtNHoiLz48L2c+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzQzOCIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV80MzgpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik05MDkgMzMydi03aDV2MWgtNHYyaDNsMSAxdjJoLTF2MXptMS0xaDN2LTJsLTEtMWgtMnptNiAzaDF2LTFsLTItNWgxbDIgNCAxLTRoMWwtMSA0aC0xdjJ6bTUtMXYtNGwxLTF2LTFoM3Y0aDF2MmgtMXYtMWgtNHptMS0yaDN2LTRoLTN6bTUgMyAxLTEtMy01aDFsMiA0IDItNGgxbC0yIDR2MWwtMSAxdjFoLTJtMTItMXYtMWgtNnYtNSA0aDJ2LTRoMXY0aDJ2LTRoMXY0aDF6bTItMXYtNWgxdjQtMWwzLTN2NS00aC0xem02IDB2LTVoMXY0LTFsMy0zdjUtNGgtMXptMi02LTEtMWgtMSA0bC0xIDF6bS0yNSAyMHYtM2wxLTF2LTVoNHY2aDF2M2gtMXYtMmgtNXptMS0zaDR2LTVoLTN2NHptNiAxdi03aDF2M2gxbDMtM2gxbC0zIDMgMyA0aC0xbC0zLTNoLTF2M3oiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNDQzIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzQ0MykiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjM2I1Zjc3IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTg3MyAzMzEgMSAyaC0xem0tMS0zdi0xbDUgNS0xIDF6bTEtMiAxLTFoMWw1IDV2MmwtMS0xem02IDItMi0xIDQtNCAxIDF6bTAtOCAyIDEgNCA0djJoLTFsLTQtNC0xLTF6bTYtMWgxdjF6bS0zIDAgNCA0djFsLTEgMXptLTEgMC0xIDEtMSAxIDEgMmgxbDEgMS00IDMtMi0yLTIgMXYybC0xIDF2MWwxIDEtMSAxIDEgMSAxIDEgMS0xIDIgMSAxLTFoMmwxLTEtMS0yLTEtMSA0LTMgMSAxIDEgMSAxLTEgMS0xdi0xbDEtMi0yLTEgMS0xdi0xbC0xLTEtMiAxdi0xaC0xeiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV80NDgiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNDQ4KSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTkyNiAzNjdoMTN6bTUtMTFxMSAzIDIgMHptNyA1djV6bS01IDAgMS0xaDJsMSAxdjVoLTR6bS0xIDB2NWgtMXptLTQgMGgydjZoLTN6bS0xIDB2NXptMTItMWgtMnptLTEzIDBoMnptNSAwaDJ6bS01LTFoMTN6bTYtNCA2IDNoLTExem0tNyAzdjJsMSAxdjVsLTEgMmgxNHYtMTBsLTEtMS01LTMtMiAxLTUgM3oiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNODIyIDgydi03emgzdi02aDF2Nmgzdi02aDF2N3ptOSAwdi01aDF2MmgxbDEtMmgxbC0xIDIgMiAzaC0xbC0yLTJoLTF6bTggMGgtMmwtMS0xdi0zbDEtMWgzbDEgMXYzem0wLTF2LTNsLTEtMS0xIDFoLTF2MmwxIDF6bTMgMSAxLTF2LTNoNHY1aC0xdi01aC0ydjJsLTEgMXYyem04IDBoLTJ2LTNoM3YtMWwtMS0xaC0xdjFoLTF2LTFoM2wxIDF2NGgtMXYtMXptMC0xdi0xaC0ydjF6bS0yOSAzMnYtM2gxdi02aDV2NmgxdjNoLTF2LTJoLTV6bTEtM2g0di01aC0zdjR6bTkgMWgtMnYtMWwtMS0yIDEtMXYtMWgzbDEgMXYyaC00bDEgMXpoMnptLTItM2gzdi0xbC0xLTEtMSAxem03IDN2LTVoLTIgNC0yem01IDBoLTFsLTEtMXYtM2wxLTFoM3YxaC0xbC0xLTEtMSAxdjN6aDFsMS0xdjFsLTEgMXptNCAwdi01IDJoMWwyLTJoMWwtMiAyIDIgM2gtMWwtMi0yaC0xem01IDB2LTVoMXY0LTFsMy0zaDF2NWgtMXYtNGgtMXptNiAwdi01aDF2NC0xbDMtM2gxdjVoLTF2LTRoLTF6bTItNnYtMXpoMWwtMSAxem05IDZoLTFsLTEtMS0xLTIgMS0xIDEtMWgzdjFoLTFsLTEtMS0xIDFoLTF2MmwxIDF6di0xaDF6bTUgMC0xLTF2LTFsMS0xaDN2LTFoLTFsLTEtMS0xIDFoLTFsMS0xaDN2MWwxIDF2M2gtMXYtMWwtMSAxem0wLTEgMS0xaC0zem0zIDN2LTNoMXYtNGg0djRoMXYzaC0xdi0yaC00djJ6bTItM2gydi00aC0yem0tNTQgMzB2LTZoLTJ2LTFoNXYxaC0yem02IDBoLTJ2LTFsLTEtMiAxLTF2LTFoM2wxIDF2M2wtMSAxem0wLTF2LTFsMS0xLTEtMS0xLTEtMSAxaC0xdjJsMSAxem00IDN2LTcgMWwxLTFoM3YxbDEgMS0xIDJ2MWgtM2wtMS0xem0yLTNoMWwxLTF2LTJoLTFsLTEtMS0xIDEtMSAxIDEgMXptNCAxdi01aDN2MWgtMnptNiAwLTEtMXYtM2wxLTFoM2wxIDF2M2wtMSAxem0wLTFoMWwxLTF2LTJoLTFsLTEtMXYxaC0xdjJ6bTQgMXYtNWg0djNoMWwtMSAxdjF6bTEtMWgzdi0xaC0zem0wLTJoMXYtMWgtMnptNSAzdi01aDF2MmgydjFoMWwtMSAxdjF6bTEtMWgxdi0xaC0xbC0xLTF6bTMtNGgxdjVoLTF6bTMgNXYtNSA0bDEtMSAyLTNoMXY1aC0xdi00IDF6bTItNmgtMWwtMS0xaDR6bTExIDh2LTJoLTV2LTVoMXY0aDN2LTRoMXptNC0yaC0ybC0xLTF2LTNsMS0xaDNsMSAxdjJoLTR2MWg0LTF6bS0yLTNoM3YtMWgtMXYtMWwtMSAxem01IDN2LTVoMXYyaDN2LTIgNS0yaC0zem03IDB2LTRoLTJ2LTFoNXYxaC0yem00IDJ2LTcgMWwxLTFoMmwxIDF2M2wtMSAxaC0ybC0xLTF6bTItM3YtM2wtMS0xLTEgMS0xIDEgMSAxem0tNzMgMzB2LTdoNHYxaC00djJoNHYxbDEgMS0xIDF2MXptMC0xaDR2LTJoLTR6bTggMWgtMWwtMS0xdi0zbDEtMWgzbDEgMXYzbC0xIDF6bTAtMWgxbDEtMXYtMmgtM3Yzem0zIDF2LTNsMS0xaDN2NWgtMXYtNGgtMnYxbC0xIDN6bTcgMHYtNSAyaDNsMSAxLTEgMnptMC0xaDJ2LTFoLTN6bTUgMXYtNWgxdjJoMnYtMmgxdjVoLTF2LTJoLTJ6bTYgMHYtNSA0aDF2LTFsMi0zaDF2NWgtMXYtNCAxem0xMCAydi0yaC00di01IDRoM3YtNGgxdjRoMXptMy0yaC0xbC0xLTEgMS0xdi0xaDN2LTFoLTN2LTFoM2wxIDF2NGgtMXYtMWwtMSAxem0wLTFoMnYtMWgtM3oiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzdjMDMwYyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNzk2IDk2cTExIDIgMTIgMTItMSAxMS0xMiAxMi0xMC0xLTEyLTEyIDItMTAgMTItMTIiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtNzkwIDExMSAxIDFoMTFsMS0xIDEgMWgtMWwtMiAxaC0xMWwtMS0xem00IDAgMS0xaDJsMSAxaDFsLTEgMXptMC0xMCAxIDJxMiAyIDEgM2g0bDEgMiAxIDNoLTJsLTMtMmEzIDMgMCAwIDAtNCAyaC0xdi01cTEgMCAwIDBsLTEtMWgtMWwxLTEgMy0yem0tMSAxLTIgMWgtMXYzbDEgMXYzaC0xbC0yIDIgMiAxIDQgMmg0bDQtMSAxLTFoMXYtM2gtMXYtMWwtMS0yLTMtMmgtMmwtMS00LTItMWgtMXoiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzNiNWY3NyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNzk2IDY4cTExIDEgMTIgMTItMSAxMC0xMiAxMi0xMC0xLTEyLTEyIDItMTEgMTItMTIiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtNzkyIDgwIDUgMiA0LTJ2M2wtNCAyLTQtMmgtMXptMTEtMi02IDMtNy0zIDUtMmg1em0tMTUgMHYzbC0xIDJoM2wtMS0ydi0yaDJ2NWw2IDIgMi0xIDMtMXYtNWwzLTEtMS0xLTctM3oiLz48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzE3MjEzMyIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNzk2IDEyNXExMSAxIDEyIDEyLTEgMTEtMTIgMTItMTAtMi0xMi0xMiAyLTEwIDEyLTEyIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTc5NCAxNDR2LTF6bTYgMHYtMXptLTMtNmgydjFoLTJ6bTQgMWgtMXYtMXptLTctMWgydjFoLTJ6bTMtMmgydjFoLTJ6bTUgMWgtMnYtMXptLTktMWgzdjFoLTJ6bTQtMmgydjFoLTJ6bS00IDBoM3YxaC0zem05IDFoLTJ2LTF6bS0xMy00aDF2MWwyIDV2MWgxbC0xIDF2NGgybDEtMmgtMSA0bC0xIDEgMiAyIDEtMXYtM2gtN3YtMWg3bDEtMSAxLTMgMS0yLTEtMWgtMTF2LTFsLTEtMXptNyAyNHExMSAyIDEyIDEyLTEgMTEtMTIgMTItMTAtMS0xMi0xMiAyLTExIDEyLTEyIi8+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNiMDE2MTYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTc5NCAxNjBoNXY1aDR2NWgtNHY0aC01di00aC01di01aDV6bTQgMWgtM3Y0aC01djRoNXY0aDN2LTRoNHYtNGgtNHoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNDYzIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzQ2MykiPjxtYXNrIGlkPSJtYXNrMjgxXzQ2OCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB4PSI2NTkiIHk9Ijk2IiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik02NTkgMTIwaDI0Vjk2aC0yNHoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzQ2OCkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjN2MwMzBjIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTY3MSA5NnExMSAxIDEyIDEyLTEgMTAtMTIgMTItMTEtMi0xMi0xMiAyLTExIDEyLTEyIi8+PC9nPjwvZz48bWFzayBpZD0ibWFzazI4MV80NzMiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNDczKSI+PG1hc2sgaWQ9Im1hc2syODFfNDc4IiB3aWR0aD0iMTYiIGhlaWdodD0iMTUiIHg9IjY2MyIgeT0iMTAwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik02NjMgMTE1aDE3di0xNWgtMTd6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV80NzgpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Im02NjUgMTExIDEgMWgxMWwxLTF2MXEyIDAgMCAwbC0yIDFoLTExbC0xLTF6bTQgMCAxLTFoMmwxIDFoMWwtMSAxem0wLTEwIDEgMnEyIDIgMSAzaDRsMSAyIDEgM2gtMmwtMy0yaC0ybC0yIDJoLTF2LTVxMSAwIDAgMGwtMS0xaC0xbDEtMSAzLTJ6bS0xIDEtMiAxaC0xdjNsMSAxdjNoLTFsLTIgMiAyIDEgNCAyaDRsNC0xIDEtMWgxdi0zaC0xdi0xbC0xLTItMy0yaC0ybC0yLTQtMS0xaC0xeiIvPjwvZz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNDgzIiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzQ4MykiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjMmMyZTM1IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTY5MSAxMDV2LTdoNS00djNoNHYxbDEgMS0xIDEtMSAxem0xLTFoM2wxLTF2LTFoLTFsLTEtMWgtMnptNiAzIDEtMS0zLTZoMWwyIDUgMi01aDFsLTIgNS0xIDF2MWwtMSAxem01LTF2LTJsMS0xdi00aDR2Ny0xaC00em0xLTJoM3YtNGgtMnYzem02IDNoMXYtMWwtMi02aDFsMiA1IDEtNWgxbC0xIDVoLTF2MnptMTEtMXYtMWgtNnYtNmgxdjVoMnYtNWgxdjVoMnYtNWgxdjd6bTItMXYtNmgxdjRsMy00aDF2NmgtMXYtNHptNiAwdi02aDF2NGwzLTRoMXY2aC0xdi00em0zLTYtMi0xdi0xaDF2MXpsMS0xdjF6bS00MSAyMHYtM2wxLTF2LTNoNHY3aC0xdi0yaC0zem0xLTNoM3YtNGgtMnYzem03IDEtMS0xdi0zbDEtMWgzbDEgMXYyaC00emgyLTFsLTEgMXptLTEtM2gzdi0xYTEgMSAwIDAgMC0yLTF2MXptNiAzdi01aC0yIDUtMnY1em02IDBoLTFsLTEtMS0xLTIgMS0xIDEtMWgzdjFoLTFsLTEtMS0xIDF2M3p2LTFoMXYxem0zIDB2LTVoMXYyaDFsMi0yaDFsLTIgMiAyIDNoLTFsLTItMmgtMXYyem02IDB2LTUgNGwxLTEgMi0zaDF2NWgtMXYtNHptNiAwdi01IDRsMS0xIDItM2gxdjVoLTF2LTR6bTItNmgtMWwtMS0xaDQtMXptOSA2aC0ybC0xLTF2LTNsMS0xaDNsMSAxaC0ydi0xbC0xIDFoLTF2MmwxIDF6bDEtMWgxbC0xIDF6bTUgMGgtMnYtM2gzdi0xbC0xLTEtMSAxaC0xdi0xaDNsMSAxdjRoLTF2LTF6bTAtMXYtMWgtMnYxem0zIDN2LTNoMXYtNGg0djRoMXYzaC0xdi0yaC00em0xLTNoM3YtNGgtMnY0eiIvPjwvZz48bWFzayBpZD0ibWFzazI4MV80ODgiIHdpZHRoPSI5NTYiIGhlaWdodD0iOTM1IiB4PSIxIiB5PSIwIiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xIDkzNWg5NTZWMEgxeiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNDg4KSI+PG1hc2sgaWQ9Im1hc2syODFfNDkzIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHg9IjY1OSIgeT0iNjgiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTY1OSA5MmgyNFY2OGgtMjR6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV80OTMpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzNiNWY3NyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NzEgNjhxMTEgMSAxMiAxMi0xIDEwLTEyIDEyLTEwLTEtMTItMTIgMi0xMSAxMi0xMiIvPjwvZz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNDk4IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzQ5OCkiPjxtYXNrIGlkPSJtYXNrMjgxXzUwMyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjEyIiB4PSI2NjIiIHk9Ijc0IiBtYXNrLXR5cGU9ImFscGhhIiBtYXNrVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik02NjIgODZoMThWNzRoLTE4eiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNTAzKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtNjY3IDgwIDUgMiA0LTJ2M2wtNCAyLTQtMmgtMXptMTEtMi02IDMtNy0zIDUtMmg1em0tMTUgMHYzbC0xIDJoM2wtMS0yemwyIDF2NWw2IDIgMi0xIDMtMXYtNWwzLTEtMS0xLTctM3oiLz48L2c+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzUwOCIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV81MDgpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik02OTEgMTY1di03aDUtNHYzaDRsMSAxLTEgMXYxbC0xIDF6bTEtMWgzdi0xaDFsLTEtMXYtMWgtM3ptNiAzaDFsMS0xLTMtNmgxbDIgNSAyLTVoMWwtMiA1LTEgMXYxbC0xIDF6bTUtMXYtMmwxLTF2LTRoNHY3LTFoLTR6bTEtMmgzdi00aC0ydjN6bTYgM2gxdi0xbC0yLTZoMWwyIDUgMS01aDFsLTEgNWgtMXYyaC0xem0xMS0xdi0xaC02di02aDF2NWgydi01aDF2NWgydi01aDF2N3ptMi0xdi02aDF2NGwzLTRoMXY2aC0xdi00em02IDB2LTZoMXY0bDMtNGgxdjZoLTF2LTR6bTMtNi0yLTF2LTFoMXYxenYtMWgxdjF6bS0zOCAxOHYtMWgtMWwtMS0xLTEtMXYtMmwxLTEgMi0xdi0xaDF2MWgxbDEgMSAxIDF2MmwtMSAxLTEgMWgtMXYxem0wLTJ2LTRoLTFsLTEgMXYybDEgMXptMSAwaDF2LTFsMS0xLTEtMXYtMWgtMnptOCAyLTItMS0xLTEtMS0yIDEtMSAxLTJoNGwxIDJ2M2wtMSAxem0wLTFoMWwxLTF2LTNsLTEtMWgtM3YxbC0xIDEgMSAyem01IDF2LTcgM2gybDItM2gxbC0zIDMgMyA0aC0xbC0yLTNoLTJ6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzUxMyIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV81MTMpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iI2YxZjNmMyIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NzEgMTU1cTExIDIgMTIgMTItMSAxMS0xMiAxMi0xMS0xLTEyLTEyIDItMTAgMTItMTIiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNTE4IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzUxOCkiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjM2I1Zjc3IiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTY2NCAxNzMgMSAxdjFoLTF6bTAtM2gxbDQgNC0xIDF6bTAtMiAxLTEgMS0xdjFsNSA0djJoLTF6bTYgMS0xLTEgMy0zIDIgMXptMC03cTEtMiAyIDFsNSA0LTEgMi0xLTEtNC0zLTEtMXptNi0xIDEgMXYxaC0xem0tMyAwIDEtMSA0IDR2MXptMC0xaC0xbC0xIDFoLTF2MWwxIDF2MWgxbC00IDQtMS0ycS0xLTEtMyAxdjFsLTEgMiAxIDF2M2gybDIgMSAyLTFoMWwxLTEgMS0xLTEtMS0yLTEgNC00IDIgMmgydi0ybDEtMi0xLTEgMS0yLTEtMWgtMWwtMSAxLTEtMS0xLTF6Ii8+PC9nPjxtYXNrIGlkPSJtYXNrMjgxXzUyMyIgd2lkdGg9Ijk1NiIgaGVpZ2h0PSI5MzUiIHg9IjEiIHk9IjAiIG1hc2stdHlwZT0iYWxwaGEiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGlkPSJwYXRoIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjEiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEgOTM1aDk1NlYwSDF6Ii8+PC9tYXNrPjxnIG1hc2s9InVybCgjbWFzazI4MV81MjMpIj48cGF0aCBpZD0icGF0aCIgZmlsbD0iIzJjMmUzNSIgZmlsbC1vcGFjaXR5PSIxIiBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik02OTEgMTM0di03aDUtNHYyaDJsMSAxaDFsMSAxLTEgMXYxaC0xbC0xIDF6bTEtMWgzbDEtMXYtMWwtMS0xaC0zem02IDNoMXYtMWgxbC0zLTZoMWwyIDUgMi01aDFsLTIgNHYybC0xIDEtMSAxem01LTF2LTJsMS0xdi00aDR2Ny0xaC00em0xLTJoM3YtNGgtMnYzem02IDMgMS0xLTItNmgxbDIgNSAxLTVoMWwtMSA0LTEgMXYyem0xMS0xdi0xaC02di02aDF2NWgydi01aDF2NWgydi01aDF2N3ptMi0xdi02aDF2NGwzLTRoMXY2aC0xdi00em02IDB2LTZoMXY0bDMtNGgxdjZoLTF2LTRsLTMgNHptMy02LTItMXYtMWgxdjFoMWwxLTF2MnptLTQxIDIwdi0zaDF2LTZoNXY5LTJoLTV6bTEtM2g0di01aC0zdjR6bTcgMXYtNyAzaDJsMi0zaDFsLTMgMyAzIDRoLTFsLTItM2gtMnoiLz48L2c+PG1hc2sgaWQ9Im1hc2syODFfNTI4IiB3aWR0aD0iOTU2IiBoZWlnaHQ9IjkzNSIgeD0iMSIgeT0iMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMSA5MzVoOTU2VjBIMXoiLz48L21hc2s+PGcgbWFzaz0idXJsKCNtYXNrMjgxXzUyOCkiPjxtYXNrIGlkPSJtYXNrMjgxXzUzMyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjIzIiB4PSI2NTkiIHk9IjEyNSIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNNjU5IDE0OWgyNHYtMjRoLTI0eiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI21hc2syODFfNTMzKSI+PHBhdGggaWQ9InBhdGgiIGZpbGw9IiMxNzIxMzMiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNjcxIDEyNXExMSAxIDEyIDEyLTEgMTEtMTIgMTItMTAtMi0xMi0xMiAyLTEwIDEyLTEyIi8+PC9nPjwvZz48L3N2Zz4=");

/***/ },

/***/ "./src/map/index.js"
/*!**************************!*\
  !*** ./src/map/index.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @hello-pangea/dnd */ "./node_modules/@hello-pangea/dnd/dist/dnd.esm.js");
/* harmony import */ var _snd_components_SNDMediaUpload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../snd-components/SNDMediaUpload */ "./src/snd-components/SNDMediaUpload/index.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/map/editor.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./style.scss */ "./src/map/style.scss");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./block.json */ "./src/map/block.json");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);









(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_7__.name, {
  edit: ({
    attributes,
    setAttributes
  }) => {
    const {
      title_01,
      title_02,
      image,
      map,
      showMap
    } = attributes;
    const mapImage = (__webpack_require__(/*! ./mapImage.svg */ "./src/map/mapImage.svg")["default"]);
    const ALLOWED_MEDIA_TYPES = ['image'];
    const onChangeText = (field, value) => {
      setAttributes({
        [field]: value
      });
    };
    const onClickAddMapItem = () => {
      const newItem = {
        coordinates_xy: '',
        address: '',
        icon: {
          id: 0,
          url: '',
          alt: '',
          size: 'full',
          sizes: {}
        }
      };
      setAttributes({
        map: [...map, newItem]
      });
    };
    const onRemoveItem = index => {
      const newMap = map.filter((_, i) => i !== index);
      setAttributes({
        map: newMap
      });
    };
    const onDragEnd = result => {
      if (!result.destination) return;
      const newMap = [...map];
      const [movedItem] = newMap.splice(result.source.index, 1);
      newMap.splice(result.destination.index, 0, movedItem);
      setAttributes({
        map: newMap
      });
    };
    const updateMapItem = (index, field, value) => {
      const updatedMap = [...map];
      updatedMap[index] = {
        ...updatedMap[index],
        [field]: value
      };
      setAttributes({
        map: updatedMap
      });
    };
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0435\u043A\u0446\u0438\u0438",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 1 \u0441\u0442\u0440\u043E\u043A\u0430",
            value: title_01,
            __nextHasNoMarginBottom: true,
            onChange: value => onChangeText('title_01', value)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
            label: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 2 \u0441\u0442\u0440\u043E\u043A\u0430",
            value: title_02,
            __nextHasNoMarginBottom: true,
            onChange: value => onChangeText('title_02', value)
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
          title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u0430\u0440\u0442\u044B",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
            label: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u0443",
            checked: showMap,
            onChange: value => setAttributes({
              showMap: value
            })
          }), showMap ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_3__.DragDropContext, {
              onDragEnd: onDragEnd,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_3__.Droppable, {
                droppableId: "map-list-droppable",
                children: provided => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                  ...provided.droppableProps,
                  ref: provided.innerRef,
                  className: "components-list-control components-list-control--mix",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                    className: "components-list-control__label",
                    children: "\u041A\u0430\u0440\u0442\u0430"
                  }), map?.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_hello_pangea_dnd__WEBPACK_IMPORTED_MODULE_3__.Draggable, {
                    draggableId: `map-${index}`,
                    index: index,
                    children: provided => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("details", {
                      className: "components-list-control__item",
                      ref: provided.innerRef,
                      ...provided.draggableProps,
                      ...provided.dragHandleProps,
                      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("summary", {
                        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                          className: "dragabble-element"
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
                          children: ["\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u043A\u0430\u0440\u0442\u044B\"", ' ', index + 1]
                        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                          __next40pxDefaultSize: true,
                          __nextHasNoMarginBottom: true,
                          className: "is-secondary is-destructive is-small",
                          title: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442",
                          onClick: e => {
                            e.stopPropagation(); // чтобы не срабатывал toggle
                            onRemoveItem(index);
                          }
                        })]
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_snd_components_SNDMediaUpload__WEBPACK_IMPORTED_MODULE_4__["default"], {
                        onSelect: media => {
                          const size = item.icon?.size || 'full';
                          const url = media?.sizes?.[size]?.url || media?.url || '';
                          const updatedMap = JSON.parse(JSON.stringify(map));
                          updatedMap[index].icon = {
                            id: media?.id || 0,
                            url: url,
                            alt: media?.alt || '',
                            size: size,
                            sizes: media?.sizes || {},
                            type: 'image'
                          };
                          setAttributes({
                            map: updatedMap
                          });
                        },
                        allowedTypes: ['image'],
                        value: item?.icon?.id || 0,
                        media: item?.icon,
                        onChangeMedia: newImage => {
                          const updatedMap = JSON.parse(JSON.stringify(map));
                          updatedMap[index].icon = newImage;
                          setAttributes({
                            map: updatedMap
                          });
                        },
                        label: `Выбрать иконку`,
                        labelButton: `${item.icon?.url ? 'Изменить' : 'Выбрать'} иконку`
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                        label: "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B (\u0448\u0438\u0440\u043E\u0442\u0430, \u0434\u043E\u043B\u0433\u043E\u0442\u0430)",
                        __next40pxDefaultSize: true,
                        __nextHasNoMarginBottom: true,
                        value: item.coordinates_xy,
                        onChange: value => updateMapItem(index, 'coordinates_xy', value),
                        help: "\u0424\u043E\u0440\u043C\u0430\u0442: 00.000000, 00.000000"
                      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                        __next40pxDefaultSize: true,
                        __nextHasNoMarginBottom: true,
                        label: "\u0410\u0434\u0440\u0435\u0441",
                        value: item.address,
                        onChange: value => updateMapItem(index, 'address', value)
                      })]
                    })
                  }, `map-${index}`)), provided.placeholder, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("hr", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    __next40pxDefaultSize: true,
                    __nextHasNoMarginBottom: true,
                    variant: "primary",
                    onClick: onClickAddMapItem,
                    children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u044D\u043B\u0435\u043C\u0435\u043D\u0442"
                  })]
                })
              })
            })
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUploadCheck, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.MediaUpload, {
              onSelect: media => {
                const url = media?.sizes?.full?.url || media?.url || '';
                setAttributes({
                  image: {
                    id: media?.id || 0,
                    url: url,
                    alt: media?.alt || ''
                  }
                });
              },
              allowedTypes: ALLOWED_MEDIA_TYPES,
              value: image.id,
              render: ({
                open
              }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                className: "components-base-control",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("label", {
                  className: "components-base-control__label-media-button",
                  children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"
                }), image.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                  className: "components-base-control__media-preview",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                    src: image.url,
                    alt: image.alt
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
                  className: "components-base-control__media-buttons",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    variant: "primary",
                    onClick: open,
                    children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435"
                  }), image.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    className: "is-secondary is-destructive",
                    onClick: () => {
                      setAttributes({
                        image: {
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
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("section", {
        ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
          className: 'sd-map'
        }),
        children: [(title_01 || title_02) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "container",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("h2", {
            className: "fade-in-left wow",
            children: [title_01 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
              tagName: "span",
              value: title_01,
              onChange: value => onChangeText('title_01', value)
            }), title_02 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {
              tagName: "span",
              value: title_02,
              className: "fade-in-right-05 wow",
              onChange: value => onChangeText('title_02', value)
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "sd-map__wrapper",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "container",
            children: [showMap ? map && map.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
              className: "sd-contacts__map-wrapper",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                id: "ymaptop",
                className: "sd-contacts__map",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                  src: mapImage,
                  alt: "",
                  style: {
                    opacity: 0.7
                  },
                  loading: "lazy"
                })
              }), map.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
                className: "map-point",
                "data-coordinates": item.coordinates_xy,
                "data-address": item.address,
                "data-icon": item.icon.url
              }, index))]
            }) : image.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
              src: image.url,
              alt: image.alt,
              loading: "lazy"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "sd-map__text",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {
                allowedBlocks: ['core/paragraph', 'core/heading'],
                template: [['core/heading', {
                  content: 'В шаговой доступности — детские сады, школы, торговые центры.',
                  level: 3
                }], ['core/paragraph', {
                  content: 'Путь до ключевых точек деловой активности города займёт не больше 10-15 минут.'
                }], ['core/paragraph', {
                  content: 'А вечером можно не только разнообразно провести досуг в закрытом многофункциональном дворе, но и прогуляться по пешеходной тропе к Всехсвятской церкви. И до залива Курчатова — не более 10 минут на авто.'
                }]]
              })
            })]
          })
        })]
      })]
    });
  },
  save: () => {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.Content, {});
  }
});

/***/ },

/***/ "./src/snd-components/SNDMediaUpload/index.js"
/*!****************************************************!*\
  !*** ./src/snd-components/SNDMediaUpload/index.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/snd-components/SNDMediaUpload/style.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);




const SNDMediaUpload = ({
  onSelect,
  allowedTypes,
  value,
  media,
  onChangeMedia,
  label = 'Select media',
  labelButton = 'Select media',
  isRenderPhp = false
}) => {
  const type = media?.type || 'other';
  const onDeleteMedia = () => {
    let defaultMedia = {
      id: 0,
      url: '',
      filename: '',
      type: 'other'
    };
    onChangeMedia(defaultMedia);
  };
  const sizeOptions = [{
    disabled: true,
    label: 'Choose size',
    value: ''
  }, {
    label: 'Thumbnail size',
    value: 'thumbnail'
  }, {
    label: 'Medium size',
    value: 'medium'
  }, {
    label: 'Large size',
    value: 'large'
  }, {
    label: 'Full size',
    value: 'full'
  }];
  if (isRenderPhp) {
    sizeOptions.push({
      label: 'Medium Large',
      value: 'medium_large'
    }, {
      label: '1536x1536',
      value: '1536x1536'
    }, {
      label: '2048x2048',
      value: '2048x2048'
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUploadCheck, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
      onSelect: onSelect,
      allowedTypes: allowedTypes,
      value: value,
      render: ({
        open
      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "snd-media-upload",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
          className: "snd-media-upload__label-button",
          children: label
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "snd-media-upload__content",
          children: [media?.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [type === 'image' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "snd-media-upload__preview",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
                src: media.url,
                alt: media?.alt || '',
                loading: "lazy"
              })
            }), type !== 'image' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
              className: "snd-media-upload__preview",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "snd-media-upload__preview-file",
                children: media?.type || 'File'
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
            className: "snd-media-upload__controls",
            children: [media?.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
              children: [type === 'image' && media?.size && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
                __next40pxDefaultSize: true,
                __nextHasNoMarginBottom: true,
                size: "small",
                value: media.size,
                onChange: value => {
                  const newUrl = media?.sizes?.[value]?.url || media?.sizes?.full?.url || media?.url;
                  onChangeMedia({
                    ...media,
                    size: value,
                    url: newUrl
                  });
                },
                options: sizeOptions
              }), type !== 'image' && media?.filename && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
                className: "snd-media-upload__filename",
                children: media?.filename
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
              className: "snd-media-upload__buttons",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                size: "small",
                variant: media?.url ? 'secondary' : 'primary',
                onClick: open,
                children: labelButton
              }), media?.url && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                isDestructive: true,
                size: "small",
                variant: "secondary",
                onClick: onDeleteMedia
              })]
            })]
          })]
        })]
      })
    })
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SNDMediaUpload);

/***/ },

/***/ "./node_modules/css-box-model/dist/css-box-model.esm.js"
/*!**************************************************************!*\
  !*** ./node_modules/css-box-model/dist/css-box-model.esm.js ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateBox: () => (/* binding */ calculateBox),
/* harmony export */   createBox: () => (/* binding */ createBox),
/* harmony export */   expand: () => (/* binding */ expand),
/* harmony export */   getBox: () => (/* binding */ getBox),
/* harmony export */   getRect: () => (/* binding */ getRect),
/* harmony export */   offset: () => (/* binding */ offset),
/* harmony export */   shrink: () => (/* binding */ shrink),
/* harmony export */   withScroll: () => (/* binding */ withScroll)
/* harmony export */ });
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");


var getRect = function getRect(_ref) {
  var top = _ref.top,
      right = _ref.right,
      bottom = _ref.bottom,
      left = _ref.left;
  var width = right - left;
  var height = bottom - top;
  var rect = {
    top: top,
    right: right,
    bottom: bottom,
    left: left,
    width: width,
    height: height,
    x: left,
    y: top,
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2
    }
  };
  return rect;
};
var expand = function expand(target, expandBy) {
  return {
    top: target.top - expandBy.top,
    left: target.left - expandBy.left,
    bottom: target.bottom + expandBy.bottom,
    right: target.right + expandBy.right
  };
};
var shrink = function shrink(target, shrinkBy) {
  return {
    top: target.top + shrinkBy.top,
    left: target.left + shrinkBy.left,
    bottom: target.bottom - shrinkBy.bottom,
    right: target.right - shrinkBy.right
  };
};

var shift = function shift(target, shiftBy) {
  return {
    top: target.top + shiftBy.y,
    left: target.left + shiftBy.x,
    bottom: target.bottom + shiftBy.y,
    right: target.right + shiftBy.x
  };
};

var noSpacing = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
var createBox = function createBox(_ref2) {
  var borderBox = _ref2.borderBox,
      _ref2$margin = _ref2.margin,
      margin = _ref2$margin === void 0 ? noSpacing : _ref2$margin,
      _ref2$border = _ref2.border,
      border = _ref2$border === void 0 ? noSpacing : _ref2$border,
      _ref2$padding = _ref2.padding,
      padding = _ref2$padding === void 0 ? noSpacing : _ref2$padding;
  var marginBox = getRect(expand(borderBox, margin));
  var paddingBox = getRect(shrink(borderBox, border));
  var contentBox = getRect(shrink(paddingBox, padding));
  return {
    marginBox: marginBox,
    borderBox: getRect(borderBox),
    paddingBox: paddingBox,
    contentBox: contentBox,
    margin: margin,
    border: border,
    padding: padding
  };
};

var parse = function parse(raw) {
  var value = raw.slice(0, -2);
  var suffix = raw.slice(-2);

  if (suffix !== 'px') {
    return 0;
  }

  var result = Number(value);
  !!isNaN(result) ?  true ? (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(false, "Could not parse value [raw: " + raw + ", without suffix: " + value + "]") : 0 : void 0;
  return result;
};

var getWindowScroll = function getWindowScroll() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
};

var offset = function offset(original, change) {
  var borderBox = original.borderBox,
      border = original.border,
      margin = original.margin,
      padding = original.padding;
  var shifted = shift(borderBox, change);
  return createBox({
    borderBox: shifted,
    border: border,
    margin: margin,
    padding: padding
  });
};
var withScroll = function withScroll(original, scroll) {
  if (scroll === void 0) {
    scroll = getWindowScroll();
  }

  return offset(original, scroll);
};
var calculateBox = function calculateBox(borderBox, styles) {
  var margin = {
    top: parse(styles.marginTop),
    right: parse(styles.marginRight),
    bottom: parse(styles.marginBottom),
    left: parse(styles.marginLeft)
  };
  var padding = {
    top: parse(styles.paddingTop),
    right: parse(styles.paddingRight),
    bottom: parse(styles.paddingBottom),
    left: parse(styles.paddingLeft)
  };
  var border = {
    top: parse(styles.borderTopWidth),
    right: parse(styles.borderRightWidth),
    bottom: parse(styles.borderBottomWidth),
    left: parse(styles.borderLeftWidth)
  };
  return createBox({
    borderBox: borderBox,
    margin: margin,
    padding: padding,
    border: border
  });
};
var getBox = function getBox(el) {
  var borderBox = el.getBoundingClientRect();
  var styles = window.getComputedStyle(el);
  return calculateBox(borderBox, styles);
};




/***/ },

/***/ "./src/map/editor.scss"
/*!*****************************!*\
  !*** ./src/map/editor.scss ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/map/style.scss"
/*!****************************!*\
  !*** ./src/map/style.scss ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/snd-components/SNDMediaUpload/style.scss"
/*!******************************************************!*\
  !*** ./src/snd-components/SNDMediaUpload/style.scss ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./node_modules/raf-schd/dist/raf-schd.esm.js"
/*!****************************************************!*\
  !*** ./node_modules/raf-schd/dist/raf-schd.esm.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var rafSchd = function rafSchd(fn) {
  var lastArgs = [];
  var frameId = null;

  var wrapperFn = function wrapperFn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;

    if (frameId) {
      return;
    }

    frameId = requestAnimationFrame(function () {
      frameId = null;
      fn.apply(void 0, lastArgs);
    });
  };

  wrapperFn.cancel = function () {
    if (!frameId) {
      return;
    }

    cancelAnimationFrame(frameId);
    frameId = null;
  };

  return wrapperFn;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rafSchd);


/***/ },

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js"
/*!*******************************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js ***!
  \*******************************************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {

/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


 true &&
  (function () {
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __webpack_require__(/*! react */ "react"),
      objectIs = "function" === typeof Object.is ? Object.is : is,
      useSyncExternalStore = React.useSyncExternalStore,
      useRef = React.useRef,
      useEffect = React.useEffect,
      useMemo = React.useMemo,
      useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function (
      subscribe,
      getSnapshot,
      getServerSnapshot,
      selector,
      isEqual
    ) {
      var instRef = useRef(null);
      if (null === instRef.current) {
        var inst = { hasValue: !1, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo(
        function () {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = !0;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return (memoizedSelection = currentSelection);
              }
              return (memoizedSelection = nextSnapshot);
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot))
              return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return (memoizedSnapshot = nextSnapshot), currentSelection;
            memoizedSnapshot = nextSnapshot;
            return (memoizedSelection = nextSelection);
          }
          var hasMemo = !1,
            memoizedSnapshot,
            memoizedSelection,
            maybeGetServerSnapshot =
              void 0 === getServerSnapshot ? null : getServerSnapshot;
          return [
            function () {
              return memoizedSelector(getSnapshot());
            },
            null === maybeGetServerSnapshot
              ? void 0
              : function () {
                  return memoizedSelector(maybeGetServerSnapshot());
                }
          ];
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      );
      var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
      useEffect(
        function () {
          inst.hasValue = !0;
          inst.value = value;
        },
        [value]
      );
      useDebugValue(value);
      return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();


/***/ },

/***/ "./node_modules/use-sync-external-store/with-selector.js"
/*!***************************************************************!*\
  !*** ./node_modules/use-sync-external-store/with-selector.js ***!
  \***************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {



if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/use-sync-external-store-with-selector.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-with-selector.development.js");
}


/***/ },

/***/ "react"
/*!************************!*\
  !*** external "React" ***!
  \************************/
(module) {

module.exports = window["React"];

/***/ },

/***/ "react-dom"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = window["ReactDOM"];

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

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js"
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


/***/ },

/***/ "./node_modules/react-redux/dist/react-redux.mjs"
/*!*******************************************************!*\
  !*** ./node_modules/react-redux/dist/react-redux.mjs ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Provider: () => (/* binding */ Provider_default),
/* harmony export */   ReactReduxContext: () => (/* binding */ ReactReduxContext),
/* harmony export */   batch: () => (/* binding */ batch),
/* harmony export */   connect: () => (/* binding */ connect_default),
/* harmony export */   createDispatchHook: () => (/* binding */ createDispatchHook),
/* harmony export */   createSelectorHook: () => (/* binding */ createSelectorHook),
/* harmony export */   createStoreHook: () => (/* binding */ createStoreHook),
/* harmony export */   shallowEqual: () => (/* binding */ shallowEqual),
/* harmony export */   useDispatch: () => (/* binding */ useDispatch),
/* harmony export */   useSelector: () => (/* binding */ useSelector),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var use_sync_external_store_with_selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! use-sync-external-store/with-selector.js */ "./node_modules/use-sync-external-store/with-selector.js");
// src/utils/react.ts


// src/utils/react-is.ts
var IS_REACT_19 = /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.version.startsWith("19");
var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for(
  IS_REACT_19 ? "react.transitional.element" : "react.element"
);
var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for(
  "react.suspense_list"
);
var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var REACT_OFFSCREEN_TYPE = /* @__PURE__ */ Symbol.for("react.offscreen");
var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for(
  "react.client.reference"
);
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Memo = REACT_MEMO_TYPE;
function isValidElementType(type) {
  return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE || type.getModuleId !== void 0) ? true : false;
}
function typeOf(object) {
  if (typeof object === "object" && object !== null) {
    const { $$typeof } = object;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        switch (object = object.type, object) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return object;
          default:
            switch (object = object && object.$$typeof, object) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
                return object;
              case REACT_CONSUMER_TYPE:
                return object;
              default:
                return $$typeof;
            }
        }
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }
}
function isContextConsumer(object) {
  return IS_REACT_19 ? typeOf(object) === REACT_CONSUMER_TYPE : typeOf(object) === REACT_CONTEXT_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}

// src/utils/warning.ts
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}

// src/connect/verifySubselectors.ts
function verify(selector, methodName) {
  if (!selector) {
    throw new Error(`Unexpected value for ${methodName} in connect.`);
  } else if (methodName === "mapStateToProps" || methodName === "mapDispatchToProps") {
    if (!Object.prototype.hasOwnProperty.call(selector, "dependsOnOwnProps")) {
      warning(
        `The selector for ${methodName} of connect did not specify a value for dependsOnOwnProps.`
      );
    }
  }
}
function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps) {
  verify(mapStateToProps, "mapStateToProps");
  verify(mapDispatchToProps, "mapDispatchToProps");
  verify(mergeProps, "mergeProps");
}

// src/connect/selectorFactory.ts
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, {
  areStatesEqual,
  areOwnPropsEqual,
  areStatePropsEqual
}) {
  let hasRunAtLeastOnce = false;
  let state;
  let ownProps;
  let stateProps;
  let dispatchProps;
  let mergedProps;
  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }
  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps)
      dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps)
      stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps)
      dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleNewState() {
    const nextStateProps = mapStateToProps(state, ownProps);
    const statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged)
      mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }
  function handleSubsequentCalls(nextState, nextOwnProps) {
    const propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    const stateChanged = !areStatesEqual(
      nextState,
      state,
      nextOwnProps,
      ownProps
    );
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }
  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}
function finalPropsSelectorFactory(dispatch, {
  initMapStateToProps,
  initMapDispatchToProps,
  initMergeProps,
  ...options
}) {
  const mapStateToProps = initMapStateToProps(dispatch, options);
  const mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  const mergeProps = initMergeProps(dispatch, options);
  if (true) {
    verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps);
  }
  return pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

// src/utils/bindActionCreators.ts
function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = (...args) => dispatch(actionCreator(...args));
    }
  }
  return boundActionCreators;
}

// src/utils/isPlainObject.ts
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) return false;
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;
  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }
  return proto === baseProto;
}

// src/utils/verifyPlainObject.ts
function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject(value)) {
    warning(
      `${methodName}() in ${displayName} must return a plain object. Instead received ${value}.`
    );
  }
}

// src/connect/wrapMapToProps.ts
function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch) {
    const constant = getConstant(dispatch);
    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, { displayName }) {
    const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch, void 0);
    };
    proxy.dependsOnOwnProps = true;
    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      let props = proxy(stateOrDispatch, ownProps);
      if (typeof props === "function") {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }
      if (true)
        verifyPlainObject(props, displayName, methodName);
      return props;
    };
    return proxy;
  };
}

// src/connect/invalidArgFactory.ts
function createInvalidArgFactory(arg, name) {
  return (dispatch, options) => {
    throw new Error(
      `Invalid value of type ${typeof arg} for ${name} argument when connecting component ${options.wrappedComponentName}.`
    );
  };
}

// src/connect/mapDispatchToProps.ts
function mapDispatchToPropsFactory(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === "object" ? wrapMapToPropsConstant(
    (dispatch) => (
      // @ts-ignore
      bindActionCreators(mapDispatchToProps, dispatch)
    )
  ) : !mapDispatchToProps ? wrapMapToPropsConstant((dispatch) => ({
    dispatch
  })) : typeof mapDispatchToProps === "function" ? (
    // @ts-ignore
    wrapMapToPropsFunc(mapDispatchToProps, "mapDispatchToProps")
  ) : createInvalidArgFactory(mapDispatchToProps, "mapDispatchToProps");
}

// src/connect/mapStateToProps.ts
function mapStateToPropsFactory(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(() => ({})) : typeof mapStateToProps === "function" ? (
    // @ts-ignore
    wrapMapToPropsFunc(mapStateToProps, "mapStateToProps")
  ) : createInvalidArgFactory(mapStateToProps, "mapStateToProps");
}

// src/connect/mergeProps.ts
function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return { ...ownProps, ...stateProps, ...dispatchProps };
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, { displayName, areMergedPropsEqual }) {
    let hasRunOnce = false;
    let mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);
      if (hasRunOnce) {
        if (!areMergedPropsEqual(nextMergedProps, mergedProps))
          mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (true)
          verifyPlainObject(mergedProps, displayName, "mergeProps");
      }
      return mergedProps;
    };
  };
}
function mergePropsFactory(mergeProps) {
  return !mergeProps ? () => defaultMergeProps : typeof mergeProps === "function" ? wrapMergePropsFunc(mergeProps) : createInvalidArgFactory(mergeProps, "mergeProps");
}

// src/utils/batch.ts
function defaultNoopBatch(callback) {
  callback();
}

// src/utils/Subscription.ts
function createListenerCollection() {
  let first = null;
  let last = null;
  return {
    clear() {
      first = null;
      last = null;
    },
    notify() {
      defaultNoopBatch(() => {
        let listener = first;
        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get() {
      const listeners = [];
      let listener = first;
      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }
      return listeners;
    },
    subscribe(callback) {
      let isSubscribed = true;
      const listener = last = {
        callback,
        next: null,
        prev: last
      };
      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null) return;
        isSubscribed = false;
        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }
        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}
var nullListeners = {
  notify() {
  },
  get: () => []
};
function createSubscription(store, parentSub) {
  let unsubscribe;
  let listeners = nullListeners;
  let subscriptionsAmount = 0;
  let selfSubscribed = false;
  function addNestedSub(listener) {
    trySubscribe();
    const cleanupListener = listeners.subscribe(listener);
    let removed = false;
    return () => {
      if (!removed) {
        removed = true;
        cleanupListener();
        tryUnsubscribe();
      }
    };
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return selfSubscribed;
  }
  function trySubscribe() {
    subscriptionsAmount++;
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    subscriptionsAmount--;
    if (unsubscribe && subscriptionsAmount === 0) {
      unsubscribe();
      unsubscribe = void 0;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  function trySubscribeSelf() {
    if (!selfSubscribed) {
      selfSubscribed = true;
      trySubscribe();
    }
  }
  function tryUnsubscribeSelf() {
    if (selfSubscribed) {
      selfSubscribed = false;
      tryUnsubscribe();
    }
  }
  const subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe: trySubscribeSelf,
    tryUnsubscribe: tryUnsubscribeSelf,
    getListeners: () => listeners
  };
  return subscription;
}

// src/utils/useIsomorphicLayoutEffect.ts
var canUseDOM = () => !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isDOM = /* @__PURE__ */ canUseDOM();
var isRunningInReactNative = () => typeof navigator !== "undefined" && navigator.product === "ReactNative";
var isReactNative = /* @__PURE__ */ isRunningInReactNative();
var getUseIsomorphicLayoutEffect = () => isDOM || isReactNative ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
var useIsomorphicLayoutEffect = /* @__PURE__ */ getUseIsomorphicLayoutEffect();

// src/utils/shallowEqual.ts
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

// src/utils/hoistStatics.ts
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  $$typeof: true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  $$typeof: true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {
  [ForwardRef]: FORWARD_REF_STATICS,
  [Memo]: MEMO_STATICS
};
function getStatics(component) {
  if (isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      const inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent);
      }
    }
    let keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    const targetStatics = getStatics(targetComponent);
    const sourceStatics = getStatics(sourceComponent);
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      if (!KNOWN_STATICS[key] && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        const descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {
        }
      }
    }
  }
  return targetComponent;
}

// src/components/Context.ts
var ContextKey = /* @__PURE__ */ Symbol.for(`react-redux-context`);
var gT = typeof globalThis !== "undefined" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function getContext() {
  if (!react__WEBPACK_IMPORTED_MODULE_0__.createContext) return {};
  const contextMap = gT[ContextKey] ??= /* @__PURE__ */ new Map();
  let realContext = contextMap.get(react__WEBPACK_IMPORTED_MODULE_0__.createContext);
  if (!realContext) {
    realContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
      null
    );
    if (true) {
      realContext.displayName = "ReactRedux";
    }
    contextMap.set(react__WEBPACK_IMPORTED_MODULE_0__.createContext, realContext);
  }
  return realContext;
}
var ReactReduxContext = /* @__PURE__ */ getContext();

// src/components/connect.tsx
var NO_SUBSCRIPTION_ARRAY = [null, null];
var stringifyComponent = (Comp) => {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};
function useIsomorphicLayoutEffectWithArgs(effectFunc, effectArgs, dependencies) {
  useIsomorphicLayoutEffect(() => effectFunc(...effectArgs), dependencies);
}
function captureWrapperProps(lastWrapperProps, lastChildProps, renderIsScheduled, wrapperProps, childPropsFromStoreUpdate, notifyNestedSubs) {
  lastWrapperProps.current = wrapperProps;
  renderIsScheduled.current = false;
  if (childPropsFromStoreUpdate.current) {
    childPropsFromStoreUpdate.current = null;
    notifyNestedSubs();
  }
}
function subscribeUpdates(shouldHandleStateChanges, store, subscription, childPropsSelector, lastWrapperProps, lastChildProps, renderIsScheduled, isMounted, childPropsFromStoreUpdate, notifyNestedSubs, additionalSubscribeListener) {
  if (!shouldHandleStateChanges) return () => {
  };
  let didUnsubscribe = false;
  let lastThrownError = null;
  const checkForUpdates = () => {
    if (didUnsubscribe || !isMounted.current) {
      return;
    }
    const latestStoreState = store.getState();
    let newChildProps, error;
    try {
      newChildProps = childPropsSelector(
        latestStoreState,
        lastWrapperProps.current
      );
    } catch (e) {
      error = e;
      lastThrownError = e;
    }
    if (!error) {
      lastThrownError = null;
    }
    if (newChildProps === lastChildProps.current) {
      if (!renderIsScheduled.current) {
        notifyNestedSubs();
      }
    } else {
      lastChildProps.current = newChildProps;
      childPropsFromStoreUpdate.current = newChildProps;
      renderIsScheduled.current = true;
      additionalSubscribeListener();
    }
  };
  subscription.onStateChange = checkForUpdates;
  subscription.trySubscribe();
  checkForUpdates();
  const unsubscribeWrapper = () => {
    didUnsubscribe = true;
    subscription.tryUnsubscribe();
    subscription.onStateChange = null;
    if (lastThrownError) {
      throw lastThrownError;
    }
  };
  return unsubscribeWrapper;
}
function strictEqual(a, b) {
  return a === b;
}
var hasWarnedAboutDeprecatedPureOption = false;
function connect(mapStateToProps, mapDispatchToProps, mergeProps, {
  // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
  // @ts-ignore
  pure,
  areStatesEqual = strictEqual,
  areOwnPropsEqual = shallowEqual,
  areStatePropsEqual = shallowEqual,
  areMergedPropsEqual = shallowEqual,
  // use React's forwardRef to expose a ref of the wrapped component
  forwardRef = false,
  // the context consumer to use
  context = ReactReduxContext
} = {}) {
  if (true) {
    if (pure !== void 0 && !hasWarnedAboutDeprecatedPureOption) {
      hasWarnedAboutDeprecatedPureOption = true;
      warning(
        'The `pure` option has been removed. `connect` is now always a "pure/memoized" component'
      );
    }
  }
  const Context = context;
  const initMapStateToProps = mapStateToPropsFactory(mapStateToProps);
  const initMapDispatchToProps = mapDispatchToPropsFactory(mapDispatchToProps);
  const initMergeProps = mergePropsFactory(mergeProps);
  const shouldHandleStateChanges = Boolean(mapStateToProps);
  const wrapWithConnect = (WrappedComponent) => {
    if (true) {
      const isValid = /* @__PURE__ */ isValidElementType(WrappedComponent);
      if (!isValid)
        throw new Error(
          `You must pass a component to the function returned by connect. Instead received ${stringifyComponent(
            WrappedComponent
          )}`
        );
    }
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component";
    const displayName = `Connect(${wrappedComponentName})`;
    const selectorFactoryOptions = {
      shouldHandleStateChanges,
      displayName,
      wrappedComponentName,
      WrappedComponent,
      // @ts-ignore
      initMapStateToProps,
      initMapDispatchToProps,
      initMergeProps,
      areStatesEqual,
      areStatePropsEqual,
      areOwnPropsEqual,
      areMergedPropsEqual
    };
    function ConnectFunction(props) {
      const [propsContext, reactReduxForwardedRef, wrapperProps] = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        const { reactReduxForwardedRef: reactReduxForwardedRef2, ...wrapperProps2 } = props;
        return [props.context, reactReduxForwardedRef2, wrapperProps2];
      }, [props]);
      const ContextToUse = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        let ResultContext = Context;
        if (propsContext?.Consumer) {
          if (true) {
            const isValid = /* @__PURE__ */ isContextConsumer(
              // @ts-ignore
              /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(propsContext.Consumer, null)
            );
            if (!isValid) {
              throw new Error(
                "You must pass a valid React context consumer as `props.context`"
              );
            }
            ResultContext = propsContext;
          }
        }
        return ResultContext;
      }, [propsContext, Context]);
      const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useContext(ContextToUse);
      const didStoreComeFromProps = Boolean(props.store) && Boolean(props.store.getState) && Boolean(props.store.dispatch);
      const didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
      if ( true && !didStoreComeFromProps && !didStoreComeFromContext) {
        throw new Error(
          `Could not find "store" in the context of "${displayName}". Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider> and the corresponding React context consumer to ${displayName} in connect options.`
        );
      }
      const store = didStoreComeFromProps ? props.store : contextValue.store;
      const getServerState = didStoreComeFromContext ? contextValue.getServerState : store.getState;
      const childPropsSelector = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        return finalPropsSelectorFactory(store.dispatch, selectorFactoryOptions);
      }, [store]);
      const [subscription, notifyNestedSubs] = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY;
        const subscription2 = createSubscription(
          store,
          didStoreComeFromProps ? void 0 : contextValue.subscription
        );
        const notifyNestedSubs2 = subscription2.notifyNestedSubs.bind(subscription2);
        return [subscription2, notifyNestedSubs2];
      }, [store, didStoreComeFromProps, contextValue]);
      const overriddenContextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        if (didStoreComeFromProps) {
          return contextValue;
        }
        return {
          ...contextValue,
          subscription
        };
      }, [didStoreComeFromProps, contextValue, subscription]);
      const lastChildProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0);
      const lastWrapperProps = react__WEBPACK_IMPORTED_MODULE_0__.useRef(wrapperProps);
      const childPropsFromStoreUpdate = react__WEBPACK_IMPORTED_MODULE_0__.useRef(void 0);
      const renderIsScheduled = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
      const isMounted = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
      const latestSubscriptionCallbackError = react__WEBPACK_IMPORTED_MODULE_0__.useRef(
        void 0
      );
      useIsomorphicLayoutEffect(() => {
        isMounted.current = true;
        return () => {
          isMounted.current = false;
        };
      }, []);
      const actualChildPropsSelector = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        const selector = () => {
          if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
            return childPropsFromStoreUpdate.current;
          }
          return childPropsSelector(store.getState(), wrapperProps);
        };
        return selector;
      }, [store, wrapperProps]);
      const subscribeForReact = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        const subscribe = (reactListener) => {
          if (!subscription) {
            return () => {
            };
          }
          return subscribeUpdates(
            shouldHandleStateChanges,
            store,
            subscription,
            // @ts-ignore
            childPropsSelector,
            lastWrapperProps,
            lastChildProps,
            renderIsScheduled,
            isMounted,
            childPropsFromStoreUpdate,
            notifyNestedSubs,
            reactListener
          );
        };
        return subscribe;
      }, [subscription]);
      useIsomorphicLayoutEffectWithArgs(captureWrapperProps, [
        lastWrapperProps,
        lastChildProps,
        renderIsScheduled,
        wrapperProps,
        childPropsFromStoreUpdate,
        notifyNestedSubs
      ]);
      let actualChildProps;
      try {
        actualChildProps = react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore(
          // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
          subscribeForReact,
          // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
          // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
          actualChildPropsSelector,
          getServerState ? () => childPropsSelector(getServerState(), wrapperProps) : actualChildPropsSelector
        );
      } catch (err) {
        if (latestSubscriptionCallbackError.current) {
          ;
          err.message += `
The error may be correlated with this previous error:
${latestSubscriptionCallbackError.current.stack}

`;
        }
        throw err;
      }
      useIsomorphicLayoutEffect(() => {
        latestSubscriptionCallbackError.current = void 0;
        childPropsFromStoreUpdate.current = void 0;
        lastChildProps.current = actualChildProps;
      });
      const renderedWrappedComponent = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        return (
          // @ts-ignore
          /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(
            WrappedComponent,
            {
              ...actualChildProps,
              ref: reactReduxForwardedRef
            }
          )
        );
      }, [reactReduxForwardedRef, WrappedComponent, actualChildProps]);
      const renderedChild = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
        if (shouldHandleStateChanges) {
          return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ContextToUse.Provider, { value: overriddenContextValue }, renderedWrappedComponent);
        }
        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    }
    const _Connect = react__WEBPACK_IMPORTED_MODULE_0__.memo(ConnectFunction);
    const Connect = _Connect;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = ConnectFunction.displayName = displayName;
    if (forwardRef) {
      const _forwarded = react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(
        function forwardConnectRef(props, ref) {
          return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Connect, { ...props, reactReduxForwardedRef: ref });
        }
      );
      const forwarded = _forwarded;
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return /* @__PURE__ */ hoistNonReactStatics(forwarded, WrappedComponent);
    }
    return /* @__PURE__ */ hoistNonReactStatics(Connect, WrappedComponent);
  };
  return wrapWithConnect;
}
var connect_default = connect;

// src/components/Provider.tsx
function Provider(providerProps) {
  const { children, context, serverState, store } = providerProps;
  const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    const subscription = createSubscription(store);
    const baseContextValue = {
      store,
      subscription,
      getServerState: serverState ? () => serverState : void 0
    };
    if (false) // removed by dead control flow
{} else {
      const { identityFunctionCheck = "once", stabilityCheck = "once" } = providerProps;
      return /* @__PURE__ */ Object.assign(baseContextValue, {
        stabilityCheck,
        identityFunctionCheck
      });
    }
  }, [store, serverState]);
  const previousState = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => store.getState(), [store]);
  useIsomorphicLayoutEffect(() => {
    const { subscription } = contextValue;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();
    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = void 0;
    };
  }, [contextValue, previousState]);
  const Context = context || ReactReduxContext;
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(Context.Provider, { value: contextValue }, children);
}
var Provider_default = Provider;

// src/hooks/useReduxContext.ts
function createReduxContextHook(context = ReactReduxContext) {
  return function useReduxContext2() {
    const contextValue = react__WEBPACK_IMPORTED_MODULE_0__.useContext(context);
    if ( true && !contextValue) {
      throw new Error(
        "could not find react-redux context value; please ensure the component is wrapped in a <Provider>"
      );
    }
    return contextValue;
  };
}
var useReduxContext = /* @__PURE__ */ createReduxContextHook();

// src/hooks/useStore.ts
function createStoreHook(context = ReactReduxContext) {
  const useReduxContext2 = context === ReactReduxContext ? useReduxContext : (
    // @ts-ignore
    createReduxContextHook(context)
  );
  const useStore2 = () => {
    const { store } = useReduxContext2();
    return store;
  };
  Object.assign(useStore2, {
    withTypes: () => useStore2
  });
  return useStore2;
}
var useStore = /* @__PURE__ */ createStoreHook();

// src/hooks/useDispatch.ts
function createDispatchHook(context = ReactReduxContext) {
  const useStore2 = context === ReactReduxContext ? useStore : createStoreHook(context);
  const useDispatch2 = () => {
    const store = useStore2();
    return store.dispatch;
  };
  Object.assign(useDispatch2, {
    withTypes: () => useDispatch2
  });
  return useDispatch2;
}
var useDispatch = /* @__PURE__ */ createDispatchHook();

// src/hooks/useSelector.ts

var refEquality = (a, b) => a === b;
function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext2 = context === ReactReduxContext ? useReduxContext : createReduxContextHook(context);
  const useSelector2 = (selector, equalityFnOrOptions = {}) => {
    const { equalityFn = refEquality } = typeof equalityFnOrOptions === "function" ? { equalityFn: equalityFnOrOptions } : equalityFnOrOptions;
    if (true) {
      if (!selector) {
        throw new Error(`You must pass a selector to useSelector`);
      }
      if (typeof selector !== "function") {
        throw new Error(`You must pass a function as a selector to useSelector`);
      }
      if (typeof equalityFn !== "function") {
        throw new Error(
          `You must pass a function as an equality function to useSelector`
        );
      }
    }
    const reduxContext = useReduxContext2();
    const { store, subscription, getServerState } = reduxContext;
    const firstRun = react__WEBPACK_IMPORTED_MODULE_0__.useRef(true);
    const wrappedSelector = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
      {
        [selector.name](state) {
          const selected = selector(state);
          if (true) {
            const { devModeChecks = {} } = typeof equalityFnOrOptions === "function" ? {} : equalityFnOrOptions;
            const { identityFunctionCheck, stabilityCheck } = reduxContext;
            const {
              identityFunctionCheck: finalIdentityFunctionCheck,
              stabilityCheck: finalStabilityCheck
            } = {
              stabilityCheck,
              identityFunctionCheck,
              ...devModeChecks
            };
            if (finalStabilityCheck === "always" || finalStabilityCheck === "once" && firstRun.current) {
              const toCompare = selector(state);
              if (!equalityFn(selected, toCompare)) {
                let stack = void 0;
                try {
                  throw new Error();
                } catch (e) {
                  ;
                  ({ stack } = e);
                }
                console.warn(
                  "Selector " + (selector.name || "unknown") + " returned a different result when called with the same parameters. This can lead to unnecessary rerenders.\nSelectors that return a new reference (such as an object or an array) should be memoized: https://redux.js.org/usage/deriving-data-selectors#optimizing-selectors-with-memoization",
                  {
                    state,
                    selected,
                    selected2: toCompare,
                    stack
                  }
                );
              }
            }
            if (finalIdentityFunctionCheck === "always" || finalIdentityFunctionCheck === "once" && firstRun.current) {
              if (selected === state) {
                let stack = void 0;
                try {
                  throw new Error();
                } catch (e) {
                  ;
                  ({ stack } = e);
                }
                console.warn(
                  "Selector " + (selector.name || "unknown") + " returned the root state when called. This can lead to unnecessary rerenders.\nSelectors that return the entire state are almost certainly a mistake, as they will cause a rerender whenever *anything* in state changes.",
                  { stack }
                );
              }
            }
            if (firstRun.current) firstRun.current = false;
          }
          return selected;
        }
      }[selector.name],
      [selector]
    );
    const selectedState = (0,use_sync_external_store_with_selector_js__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStoreWithSelector)(
      subscription.addNestedSub,
      store.getState,
      getServerState || store.getState,
      wrappedSelector,
      equalityFn
    );
    react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue(selectedState);
    return selectedState;
  };
  Object.assign(useSelector2, {
    withTypes: () => useSelector2
  });
  return useSelector2;
}
var useSelector = /* @__PURE__ */ createSelectorHook();

// src/exports.ts
var batch = defaultNoopBatch;

//# sourceMappingURL=react-redux.mjs.map

/***/ },

/***/ "./node_modules/redux/dist/redux.mjs"
/*!*******************************************!*\
  !*** ./node_modules/redux/dist/redux.mjs ***!
  \*******************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __DO_NOT_USE__ActionTypes: () => (/* binding */ actionTypes_default),
/* harmony export */   applyMiddleware: () => (/* binding */ applyMiddleware),
/* harmony export */   bindActionCreators: () => (/* binding */ bindActionCreators),
/* harmony export */   combineReducers: () => (/* binding */ combineReducers),
/* harmony export */   compose: () => (/* binding */ compose),
/* harmony export */   createStore: () => (/* binding */ createStore),
/* harmony export */   isAction: () => (/* binding */ isAction),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   legacy_createStore: () => (/* binding */ legacy_createStore)
/* harmony export */ });
// src/utils/formatProdErrorMessage.ts
function formatProdErrorMessage(code) {
  return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}

// src/utils/symbol-observable.ts
var $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var symbol_observable_default = $$observable;

// src/utils/actionTypes.ts
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var ActionTypes = {
  INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
var actionTypes_default = ActionTypes;

// src/utils/isPlainObject.ts
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}

// src/utils/kindOf.ts
function miniKindOf(val) {
  if (val === void 0)
    return "undefined";
  if (val === null)
    return "null";
  const type = typeof val;
  switch (type) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function": {
      return type;
    }
  }
  if (Array.isArray(val))
    return "array";
  if (isDate(val))
    return "date";
  if (isError(val))
    return "error";
  const constructorName = ctorName(val);
  switch (constructorName) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return constructorName;
  }
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function ctorName(val) {
  return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
  if (val instanceof Date)
    return true;
  return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function kindOf(val) {
  let typeOfVal = typeof val;
  if (true) {
    typeOfVal = miniKindOf(val);
  }
  return typeOfVal;
}

// src/createStore.ts
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error( false ? 0 : `Expected the root reducer to be a function. Instead, received: '${kindOf(reducer)}'`);
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error( false ? 0 : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error( false ? 0 : `Expected the enhancer to be a function. Instead, received: '${kindOf(enhancer)}'`);
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = /* @__PURE__ */ new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = /* @__PURE__ */ new Map();
      currentListeners.forEach((listener, key) => {
        nextListeners.set(key, listener);
      });
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error( false ? 0 : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error( false ? 0 : `Expected the listener to be a function. Instead, received: '${kindOf(listener)}'`);
    }
    if (isDispatching) {
      throw new Error( false ? 0 : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error( false ? 0 : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( false ? 0 : `Actions must be plain objects. Instead, the actual type was: '${kindOf(action)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    }
    if (typeof action.type === "undefined") {
      throw new Error( false ? 0 : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    }
    if (typeof action.type !== "string") {
      throw new Error( false ? 0 : `Action "type" property must be a string. Instead, the actual type was: '${kindOf(action.type)}'. Value was: '${action.type}' (stringified)`);
    }
    if (isDispatching) {
      throw new Error( false ? 0 : "Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = currentListeners = nextListeners;
    listeners.forEach((listener) => {
      listener();
    });
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error( false ? 0 : `Expected the nextReducer to be a function. Instead, received: '${kindOf(nextReducer)}`);
    }
    currentReducer = nextReducer;
    dispatch({
      type: actionTypes_default.REPLACE
    });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error( false ? 0 : `Expected the observer to be an object. Instead, received: '${kindOf(observer)}'`);
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      },
      [symbol_observable_default]() {
        return this;
      }
    };
  }
  dispatch({
    type: actionTypes_default.INIT
  });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable_default]: observable
  };
  return store;
}
function legacy_createStore(reducer, preloadedState, enhancer) {
  return createStore(reducer, preloadedState, enhancer);
}

// src/utils/warning.ts
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}

// src/combineReducers.ts
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  const reducerKeys = Object.keys(reducers);
  const argumentName = action && action.type === actionTypes_default.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (reducerKeys.length === 0) {
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  }
  if (!isPlainObject(inputState)) {
    return `The ${argumentName} has unexpected type of "${kindOf(inputState)}". Expected argument to be an object with the following keys: "${reducerKeys.join('", "')}"`;
  }
  const unexpectedKeys = Object.keys(inputState).filter((key) => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]);
  unexpectedKeys.forEach((key) => {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === actionTypes_default.REPLACE)
    return;
  if (unexpectedKeys.length > 0) {
    return `Unexpected ${unexpectedKeys.length > 1 ? "keys" : "key"} "${unexpectedKeys.join('", "')}" found in ${argumentName}. Expected to find one of the known reducer keys instead: "${reducerKeys.join('", "')}". Unexpected keys will be ignored.`;
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(void 0, {
      type: actionTypes_default.INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error( false ? 0 : `The slice reducer for key "${key}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    }
    if (typeof reducer(void 0, {
      type: actionTypes_default.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error( false ? 0 : `The slice reducer for key "${key}" returned undefined when probed with a random type. Don't try to handle '${actionTypes_default.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
    }
  });
}
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (true) {
      if (typeof reducers[key] === "undefined") {
        warning(`No reducer provided for key "${key}"`);
      }
    }
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let unexpectedKeyCache;
  if (true) {
    unexpectedKeyCache = {};
  }
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (true) {
      const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        const actionType = action && action.type;
        throw new Error( false ? 0 : `When called with an action of type ${actionType ? `"${String(actionType)}"` : "(unknown type)"}, the slice reducer for key "${key}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

// src/bindActionCreators.ts
function bindActionCreator(actionCreator, dispatch) {
  return function(...args) {
    return dispatch(actionCreator.apply(this, args));
  };
}
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error( false ? 0 : `bindActionCreators expected an object or a function, but instead received: '${kindOf(actionCreators)}'. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`);
  }
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

// src/compose.ts
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// src/applyMiddleware.ts
function applyMiddleware(...middlewares) {
  return (createStore2) => (reducer, preloadedState) => {
    const store = createStore2(reducer, preloadedState);
    let dispatch = () => {
      throw new Error( false ? 0 : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}

// src/utils/isAction.ts
function isAction(action) {
  return isPlainObject(action) && "type" in action && typeof action.type === "string";
}

//# sourceMappingURL=redux.mjs.map

/***/ },

/***/ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js"
/*!****************************************************************!*\
  !*** ./node_modules/tiny-invariant/dist/esm/tiny-invariant.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ invariant)
/* harmony export */ });
var isProduction = "development" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
    throw new Error(value);
}




/***/ },

/***/ "./src/map/block.json"
/*!****************************!*\
  !*** ./src/map/block.json ***!
  \****************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"snd/map","version":"0.1.1","title":"Карта","category":"snd-blocks","icon":"location-alt","example":{"viewportWidth":1200},"attributes":{"title_01":{"type":"string","default":"Место, где расположен клубный дом, —"},"title_02":{"type":"string","default":"лучшее место Центрального района."},"image":{"type":"object","default":{"id":0,"url":"","alt":""}},"map":{"type":"array","default":[{"coordinates_xy":"56.175387, 101.624279","address":"Первый Приорити, улица Металлургов, 16","icon":{"id":0,"url":"","alt":"","size":"full"}}]},"showMap":{"type":"boolean","default":true},"align":{"type":"string","default":"full"}},"supports":{"html":false,"anchor":true,"align":true},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":["ymap","glightbox","file:./view.js"],"viewStyle":["glightbox"]}');

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
/******/ 			"map/index": 0,
/******/ 			"about-grid/style-index": 0,
/******/ 			"map/style-index": 0
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["about-grid/style-index","map/style-index"], () => (__webpack_require__("./src/map/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map