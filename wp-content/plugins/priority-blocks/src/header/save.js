import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( { attributes } ) {
	const { number_phone, number_phone_href, button, socs_title, socs } =
		attributes;

	return (
		<>
			<div
				{ ...useBlockProps.save( { className: 'sd-header-wrapper' } ) }
			>
				<header className="sd-header">
					<div className="container">
						<a className="sd-burger-button">
							<span></span>
							<span></span>
							<span></span>
						</a>

						<RichText.Content
							tagName="a"
							className="sd-header__tel"
							href={ `tel:+${ number_phone_href }` }
							value={ number_phone }
						/>
					</div>
				</header>

				<nav className="sd-burger">
					<a className="sd-burger__close">
						<svg
							width="32.527344"
							height="32.526855"
							viewBox="0 0 32.5273 32.5269"
							fill="none"
						>
							<desc>Created with Pixso.</desc>
							<rect
								x="9.035156"
								y="7.228149"
								rx="1"
								width="23"
								height="2.555555"
								transform="rotate(45 9.035156 7.228149)"
								fill="#EEDECD"
								fillOpacity="1"
							/>
							<rect
								x="7.228516"
								y="23.491638"
								rx="1"
								width="23"
								height="2.555555"
								transform="rotate(-45 7.228516 23.491638)"
								fill="#EEDECD"
								fillOpacity="1"
							/>
						</svg>
					</a>

					<div className="sd-burger__innerBlocks">
						<InnerBlocks.Content />
					</div>

					<RichText.Content
						tagName="a"
						className="sd-header__tel"
						href={ `tel:+${ number_phone_href }` }
						value={ number_phone }
					/>

					{ button.show && (
						<RichText.Content
							tagName="a"
							value={ button.text }
							className={
								button.modal
									? 'sd-modal-link'
									: 'sd-button-link'
							}
							href={
								! button.modal && button.link
									? button.link
									: '#'
							}
							target={
								! button.modal && button.target
									? '_blank'
									: '_self'
							}
						/>
					) }

					{ socs && socs.length > 0 && (
						<>
							<RichText.Content
								tagName="p"
								value={ socs_title }
							/>

							<div className="sd-footer__socials">
								{ socs.map( ( item, index ) => {
									if ( item?.icon?.id && item?.link ) {
										return (
											<a
												key={ index }
												href={ item.link }
												title={ item.name }
											>
												<img
													src={ item.icon.url }
													alt={ item.name }
												/>
											</a>
										);
									} else {
										return <div key={ index }></div>;
									}
								} ) }
							</div>
						</>
					) }
				</nav>
			</div>
		</>
	);
}
