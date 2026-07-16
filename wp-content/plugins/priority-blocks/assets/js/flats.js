document.addEventListener( 'DOMContentLoaded', () => {
	// AJAX Подробнее
	( function () {
		const modal = document.querySelector( '.sd-modal_form' );
		if ( ! modal ) return;

		const openButtons = document.querySelectorAll( '.sd-modal-link-l' );
		const closeButton = document.querySelector( '.sd-modal__close_form' );
		const overlay = document.querySelector( '.sd-modal__overlay_form' );
		const body = document.body;

		// Функция открытия
		function openModal() {
			modal.classList.add( 'open' );
			document
				.querySelector( '.sd-modal__body_form' )
				.classList.add( 'open' );
			body.classList.add( 'body-overflow' ); // Блокируем скролл
		}

		// Функция закрытия
		function closeModal() {
			modal.classList.remove( 'open' );
			document
				.querySelector( '.sd-modal__body_form' )
				.classList.remove( 'open' );
			body.classList.remove( 'body-overflow' );
		}

		// Открытие по всем кнопкам
		document.addEventListener( 'click', ( e ) => {
			if ( e.target.classList.contains( 'sd-modal-link-l' ) ) {
				e.preventDefault();
				ajaxLoadFlat( e.target );
			}
		} );

		// Закрытие по крестику
		if ( closeButton ) {
			closeButton.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				closeModal();
			} );
		}

		// Закрытие по клику на оверлей
		if ( overlay ) {
			overlay.addEventListener( 'click', () => {
				closeModal();
			} );
		}

		// Закрытие по Escape
		document.addEventListener( 'keydown', ( e ) => {
			if ( e.key === 'Escape' && modal.classList.contains( 'open' ) ) {
				closeModal();
			}
		} );

		function ajaxLoadFlat( button ) {
			const parent = button.closest( '.sd-layouts__table' );
			const modalFormContent = document.querySelector(
				'.sd-modal_form .sd-modal__content_form'
			);
			const ajaxurl = flats_ajax_object.ajaxurl;
			const nonce = flats_ajax_object.nonce;
			const id = Number( button.getAttribute( 'data-id' ) ) || 0;

			const formData = new FormData();
			formData.append( 'action', 'loading_flat_content' );
			formData.append( 'nonce', nonce );
			formData.append( 'id', id );

			parent.classList.add( 'loading' );

			fetch( ajaxurl, {
				method: 'POST',
				body: formData,
			} )
				.then( ( response ) => response.json() )
				.then( ( response ) => {
					modalFormContent.innerHTML = response.data.html;
					if ( ! response.success ) {
						console.log( 'Ответ сервера:', response.data.console );
					}
				} )
				.catch( ( error ) => {
					// Если запрос не произошел
					console.error( 'Error:', error );
				} )
				.finally( () => {
					parent.classList.remove( 'loading' );
					openModal();
					initFlatSwiper();
					initGlightboxGallery();
				} );
		}
	} )();

	function initFlatSwiper() {
		const swiperCardSmall = new Swiper( '.swiper-card-small', {
			spaceBetween: 10,
			slidesPerView: 3,
			slideThumbActiveClass: 'sd-card__slide-small_active',

			navigation: {
				nextEl: '.swiper-card-small-next',
				prevEl: '.swiper-card-small-prev',
			},
		} );

		const swiperCardBig = new Swiper( '.swiper-card', {
			spaceBetween: 10,

			thumbs: {
				swiper: swiperCardSmall,
			},
			navigation: {
				nextEl: '.swiper-card-next',
				prevEl: '.swiper-card-prev',
			},
			pagination: {
				el: '.swiper-pagination-card',
				clickable: true,
			},
		} );
	}

	function initGlightboxGallery() {
		GLightbox( {
			selector: '.glightbox-gallery',
		} );
	}

	// AJAX Показать еще
	( function () {
		const buttons = document.querySelectorAll( '.sd-layouts__more-button' );
		let glightboxInstance = null;

		const initLightbox = ( selector ) => {
			if ( ! glightboxInstance ) {
				glightboxInstance = GLightbox( { selector } );
			} else {
				glightboxInstance.reload();
			}
		};

		initLightbox( '.glightbox2' );

		buttons.forEach( ( button ) => {
			button.addEventListener( 'click', () => {
				const parent = button.closest( '.sd-layouts__table' );
				const list = parent.querySelector( '.sd-layouts__grid' );
				const count =
					Number( button.getAttribute( 'data-count' ) ) || 0;
				const offset =
					Number( button.getAttribute( 'data-offset' ) ) || 0;
				const cardTextButton =
					button.getAttribute( 'data-card-text-button' ) ||
					'Подробнее';
				const ajaxurl = flats_ajax_object.ajaxurl;
				const nonce = flats_ajax_object.nonce;

				const data = {
					action: 'ajax_flats',
					count,
					offset,
					cardTextButton,
					nonce,
				};

				parent.classList.add( 'loading' );

				fetch( ajaxurl, {
					method: 'POST',
					headers: {
						'Content-Type':
							'application/x-www-form-urlencoded; charset=UTF-8',
					},
					body: new URLSearchParams( data ),
				} )
					.then( ( response ) => {
						if ( ! response.ok ) throw new Error( 'Ошибка сети' );
						return response.json();
					} )
					.then( ( result ) => {
						if ( result.success ) {
							list.insertAdjacentHTML(
								'beforeend',
								result.data.flats
							);

							if ( ! result.data.button_delete ) {
								button.setAttribute(
									'data-offset',
									offset + count
								);
							} else {
								button.remove();
							}

							initLightbox( '.glightbox2' );
						} else {
							console.log( 'Ответ сервера:', result );
						}
					} )
					.catch( ( error ) => {
						console.error( 'Произошла ошибка:', error );
					} )
					.finally( () => {
						parent.classList.remove( 'loading' );
					} );
			} );
		} );
	} )();
} );
