document.addEventListener( 'DOMContentLoaded', () => {
	( function () {
		document
			.querySelectorAll( '.sd-exterier' )
			.forEach( ( swiperItem, index ) => {
				addIndexClass( swiperItem, index, 'swiper-exterier' );
				addIndexClass( swiperItem, index, 'swiper-exterier-next' );
				addIndexClass( swiperItem, index, 'swiper-exterier-prev' );
				addIndexClass( swiperItem, index, 'swiper-pagination-exterier' );
				addIndexClass( swiperItem, index, 'swiper-counter-exterier' );

				const swiperExterier = new Swiper(`.swiper-exterier-${index}`, {
					spaceBetween: 10,
					direction: 'horizontal',
					navigation: {
						nextEl: `.swiper-exterier-next-${index}`,
						prevEl: `.swiper-exterier-prev-${index}`,
					},
					pagination: {
						el: `.swiper-pagination-exterier-${index}`,
						clickable: true,
					},

					breakpoints: {
						1200: {
							pagination: {
								el: `.swiper-counter-exterier-${index}`,
								type: 'fraction',
								clickable: true,
								renderFraction: function (currentClass, totalClass) {
									return '<span class="' + currentClass + '"></span>';
								}
							},
						}
					},
				});
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

		document.querySelectorAll('.sd-exterier').forEach((swiperItem, index) => {
			initLightbox( `.swiper-exterier-${index} .glightbox3` );
		});
	} )();
} );
