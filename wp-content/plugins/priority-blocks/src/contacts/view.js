document.addEventListener('DOMContentLoaded', () => {


	document.querySelectorAll(".sd-contacts").forEach((map, index) => {
		map.classList.add(`sd-contacts-${index}`);
		const mapWrapper = map.querySelector(".sd-contacts__map");
		if (!mapWrapper) return;

		mapWrapper.setAttribute('id', `sd-contacts-ymap-${index}`);

		const coordinates = mapWrapper.getAttribute('data-coordinates');
		if (coordinates === null) {
			return;
		}

		const zoom = mapWrapper.getAttribute('data-zoom');
		const address = mapWrapper.getAttribute('data-address');
		const icon = mapWrapper.getAttribute('data-icon');

		const coordArray = coordinates.split(',').map(Number);

		ymaps.ready(function () {
			var map = new ymaps.Map(`sd-contacts-ymap-${index}`, {
				center: coordArray,
				zoom: zoom,
			});
			map.behaviors.disable('scrollZoom');
			var shop_2 = new ymaps.Placemark(
				coordArray,
				{
					hintContent: address
				},
				{
					iconLayout: 'default#image',
					iconImageHref: icon,
					iconImageSize: [48, 48],
					iconImageOffset: [-20, -50]
				}
			);
			map.geoObjects.add(shop_2);
		});
	});
});