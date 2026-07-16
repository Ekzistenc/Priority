document.addEventListener('DOMContentLoaded', () => {
	(function () {
		// Находим все элементы, класс которых начинается с "glightbox" и содержит цифру
		const allElements = document.querySelectorAll('[class*="glightbox"]');

		// Собираем уникальные селекторы
		const selectors = new Set();

		allElements.forEach(el => {
			// Проходим по всем классам элемента
			el.classList.forEach(className => {
				// Проверяем, подходит ли класс под шаблон: начинается с "glightbox" и заканчивается цифрой
				if (/^glightbox\d+$/.test(className)) {
					selectors.add('.' + className);
				}
			});
		});

		// Инициализируем GLightbox для каждого найденного селектора
		selectors.forEach(selector => {
			GLightbox({
				selector: selector
			});
		});
	})();

});
