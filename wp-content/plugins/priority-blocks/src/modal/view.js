document.addEventListener( 'DOMContentLoaded', () => {
	if ( ! document.getElementById( 'modalDialog' ) ) return;

	const body = document.querySelector( 'body' );
	const dialog = document.getElementById( 'modalDialog' );
	const open = document.querySelectorAll( '.sd-modal-link' );
	const close = document.querySelector( '.sd-dialog__close' );

	if ( ! dialog.showModal ) {
		dialogPolyfill.registerDialog( dialog );
	}

	document.body.addEventListener( 'click', ( e ) => {
		const el = e.target.closest( '.sd-modal-link' );

		if ( el ) {
			e.preventDefault();

			const title = el.getAttribute( 'data-title' );
			const subject_field = dialog.querySelector(
				'input[name="text-subject"]'
			);

			if ( title && subject_field ) {
				subject_field.value = title;
			} else if ( subject_field ) {
				subject_field.value = 'Заявка из формы обратной связи';
			}

			setTimeout( () => {
				dialog.show();
				body.classList.add( 'body-overflow' );
			}, 0 );
		}
	} );

	function handleClose() {
		const keyFrame = new KeyframeEffect(
			dialog,
			[
				{
					translate: '0 -100%',
					opacity: '0',
				},
			],
			{
				duration: 500,
				easing: 'ease',
				direction: 'normal',
			}
		);

		const animation = new Animation( keyFrame, document.timeline );
		animation.play();
		animation.onfinish = () => dialog.close();
		body.classList.remove( 'body-overflow' );
	}

	close.addEventListener( 'click', handleClose );

	document.addEventListener( 'click', ( el ) => {
		if ( ! dialog.hasAttribute( 'open' ) ) return;

		let target = el.target;
		const it_elems_not_close = [
			target == dialog || dialog.contains( target ),
		];

		for ( let i = 0; i < open.length; i++ ) {
			it_elems_not_close.push( target == open[ i ] );
		}

		const hasTrue = it_elems_not_close.some( Boolean );

		if ( ! hasTrue ) {
			handleClose();
		}
	} );
} );
