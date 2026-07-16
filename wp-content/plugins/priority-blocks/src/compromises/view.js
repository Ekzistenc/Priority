document.addEventListener( 'DOMContentLoaded', () => {
	( function () {
		document
			.querySelectorAll( '.sd-compromises__slider' )
			.forEach( ( swiperItem, index ) => {
				addIndexClass( swiperItem, index, 'swiper-compromises-small' );
				addIndexClass( swiperItem, index, 'swiper-compromises' );
				addIndexClass( swiperItem, index, 'swiper-compromises-next' );
				addIndexClass( swiperItem, index, 'swiper-compromises-prev' );
				addIndexClass(
					swiperItem,
					index,
					'swiper-pagination-compromises'
				);
				addIndexClass(
					swiperItem,
					index,
					'swiper-counter-compromises'
				);

				const swiperQuick1 = new Swiper(
					`.swiper-compromises-small-${ index }`,
					{
						direction: 'vertical',
						spaceBetween: 2,
						slidesPerView: 4,
						slideThumbActiveClass: 'b-card__slide-small_active',
					}
				);

				const swiperQuick2 = new Swiper(
					`.swiper-compromises-${ index }`,
					{
						spaceBetween: 10,
						direction: 'horizontal',

						thumbs: {
							swiper: swiperQuick1,
						},
						navigation: {
							nextEl: `.swiper-compromises-next-${ index }`,
							prevEl: `.swiper-compromises-prev-${ index }`,
						},
						pagination: {
							el: `.swiper-pagination-compromises-${ index }`,
							clickable: true,
						},

						breakpoints: {
							1200: {
								direction: 'vertical',
								pagination: {
									el: `.swiper-counter-compromises-${ index }`,
									type: 'fraction',
									clickable: true,
									renderFraction: function (
										currentClass,
										totalClass
									) {
										return (
											'<span class="' +
											currentClass +
											'"></span>'
										);
									},
								},
							},
						},
					}
				);
			} );

		function addIndexClass( parent, index, selector ) {
			const element = parent.querySelector( `.${ selector }` );
			if ( ! element ) return;

			element.classList.add( `${ selector }-${ index }` );
		}
	} )();

	( function () {
		const initLightbox = ( selector ) => {
			const element = document.querySelector( selector );
			if ( ! element ) return;

			const lightbox = GLightbox( { selector } );
			lightbox.on( 'open', () => {} );
		};

		initLightbox( '.glightbox' );
	} )();
} );
