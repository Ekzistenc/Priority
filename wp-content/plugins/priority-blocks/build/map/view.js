/******/ (() => { // webpackBootstrap
/*!*************************!*\
  !*** ./src/map/view.js ***!
  \*************************/
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sd-map').forEach((mapSection, index) => {
    mapSection.classList.add(`sd-ymap-${index}`);
    (function () {
      const mapWrapper = mapSection.querySelector('.sd-contacts__map');
      if (!mapWrapper) {
        return;
      }
      mapWrapper.setAttribute('id', `sd-map-ymap-${index}`);

      // Собираем все точки из data-атрибутов
      const points = [];
      mapSection.querySelectorAll('.map-point').forEach(function (element) {
        const coordinates = element.getAttribute('data-coordinates');
        const address = element.getAttribute('data-address');
        const icon = element.getAttribute('data-icon');
        if (coordinates) {
          const coordArray = coordinates.split(',').map(Number);
          points.push({
            coordinates: coordArray,
            address: address || 'Адрес не указан',
            icon: icon // иконка по умолчанию
          });
        }
      });

      // Если точек нет, выходим
      if (points.length === 0) {
        console.warn('Точки для карты не найдены');
        return;
      }

      // Определяем центр карты (по первой точке или вычисляем среднее)
      const centerCoords = points[0].coordinates;

      // Инициализация Яндекс.Карт
      ymaps.ready(function () {
        // Создаем карту
        const map = new ymaps.Map(`sd-map-ymap-${index}`, {
          center: centerCoords,
          zoom: 17 // или можно вынести в data-атрибут контейнера
        });

        // Отключаем скролл зума
        map.behaviors.disable('scrollZoom');

        // Добавляем все точки
        points.forEach(function (point) {
          const placemark = new ymaps.Placemark(point.coordinates, {
            hintContent: point.address,
            // Можно добавить balloonContent для более подробной информации
            balloonContent: point.address
          }, {
            iconLayout: 'default#image',
            iconImageHref: point.icon,
            iconImageSize: [30, 30],
            iconImageOffset: [-20, -50]
          });
          map.geoObjects.add(placemark);
        });

        // Опционально: автоматически подгоняем карту под все точки
        if (points.length > 1) {
          const bounds = ymaps.geoQuery(map.geoObjects).getBounds();
          if (bounds) {
            map.setBounds(bounds, {
              checkZoomRange: true,
              zoomMargin: 0
            });
          }
        }
      });
    })();
    const initLightbox = selector => {
      const element = document.querySelector(selector);
      if (!element) return;
      const lightbox = GLightbox({
        selector
      });
      lightbox.on('open', () => {});
    };
    initLightbox(`.sd-ymap-${index} .glightbox-map`);
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map