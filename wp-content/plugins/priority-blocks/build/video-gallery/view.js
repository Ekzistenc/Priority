/******/ (() => { // webpackBootstrap
/*!***********************************!*\
  !*** ./src/video-gallery/view.js ***!
  \***********************************/
document.addEventListener('DOMContentLoaded', () => {
  (function () {
    document.querySelectorAll('.wp-block-snd-video-gallery').forEach((swiperItem, index) => {
      addIndexClass(swiperItem, index, 'swiper-video-gallery');
      addIndexClass(swiperItem, index, 'swiper-video-gallery-next');
      addIndexClass(swiperItem, index, 'swiper-video-gallery-prev');
      addIndexClass(swiperItem, index, 'swiper-pagination-video-gallery');
      addIndexClass(swiperItem, index, 'swiper-counter-video-gallery');
      const swiperExterier = new Swiper(`.swiper-video-gallery-${index}`, {
        spaceBetween: 10,
        direction: 'horizontal',
        navigation: {
          nextEl: `.swiper-video-gallery-next-${index}`,
          prevEl: `.swiper-video-gallery-prev-${index}`
        },
        pagination: {
          el: `.swiper-pagination-video-gallery-${index}`,
          clickable: true
        },
        breakpoints: {
          1200: {
            pagination: {
              el: `.swiper-counter-video-gallery-${index}`,
              type: 'fraction',
              clickable: true,
              renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>';
              }
            }
          }
        }
      });
    });
    function addIndexClass(parent, index, selector) {
      const element = parent.querySelector(`.${selector}`);
      if (!element) return;
      element.classList.add(`${selector}-${index}`);
    }
  })();
});
/******/ })()
;
//# sourceMappingURL=view.js.map