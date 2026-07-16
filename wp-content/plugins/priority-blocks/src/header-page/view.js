document.addEventListener( 'DOMContentLoaded', () => {
	const body = document.querySelector( 'body' );

	// бургер
	( function () {
		if ( ! document.querySelector( '.sd-burger-button' ) ) {
			return;
		}

		const burgerButton = document.querySelector( '.sd-burger-button' );
		const burgerClose = document.querySelector( '.sd-burger__close' );
		const burgerMenu = document.querySelector( '.sd-burger' );
		const burgerLink = document.querySelectorAll( 'ul.wp-block-navigation .wp-block-navigation-item a' );
		const headerTel = document.querySelector( '.sd-header__tel' );
		const close = document.querySelector( '.sd-burger__close' );
		const toggleMenu = () => {
			headerTel.classList.toggle( 'none' );
			body.classList.toggle( 'body-overflow' );
			burgerMenu.classList.toggle( 'open' );
			burgerButton.classList.toggle( 'sd-burger-button-open' );
		};

		close.addEventListener( 'click', ( e ) => {
			e.stopPropagation();
			toggleMenu();
		} );

		burgerLink.forEach( ( link ) => {
			link.addEventListener( 'click', ( e ) => {
				e.stopPropagation();
				toggleMenu();
			} );
		} );

		burgerButton.addEventListener('click', (e) => {
			
			e.stopPropagation();
			toggleMenu();
		} );

		document.addEventListener( 'click', ( e ) => {
			let target = e.target;
			let its_burgerMenu =
				target == burgerMenu || burgerMenu.contains( target );
			let its_burgerButton = target == burgerButton;
			let burgerMenu_is_open = burgerMenu.classList.contains( 'open' );

			if (
				! its_burgerMenu &&
				! its_burgerButton &&
				burgerMenu_is_open
			) {
				toggleMenu();
			}
		} );
	} )();
} );
