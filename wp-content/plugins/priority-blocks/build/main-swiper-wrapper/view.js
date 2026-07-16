/******/ (() => { // webpackBootstrap
/*!*****************************************!*\
  !*** ./src/main-swiper-wrapper/view.js ***!
  \*****************************************/
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sd-main-slider').forEach((main, index) => {
    main.classList.add(`sd-main-slider-${index}`);
    const swiperMain = new Swiper(`.sd-main-slider-${index} .swiper-main`, {
      direction: 'horizontal',
      navigation: {
        nextEl: `.sd-main-slider-${index} .swiper-main-next`,
        prevEl: `.sd-main-slider-${index} .swiper-main-prev`
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: `.sd-main-slider-${index} .swiper-pagination-main`,
        clickable: true
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map