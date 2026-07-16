import { useBlockProps, RichText } from '@wordpress/block-editor';
import iconBaloon from './baloon.png';

export default function save( { attributes } ) {
	const {
		title,
		title_phone,
		number_phone,
		number_phone_href,
		title_address,
		desc_address,
		title_socs,
		socs,
		button,
		map,
	} = attributes;

	return (
		<section { ...useBlockProps.save( { className: 'sd-contacts' } ) }>
			<div className="container">
				<div className="sd-contacts__text">
					{ title && (
						<RichText.Content tagName="h2" value={ title } />
					) }

					{ title_phone && (
						<RichText.Content
							tagName="p"
							className="sd-contacts__discription"
							value={ title_phone }
						/>
					) }

					{ number_phone_href && (
						<RichText.Content
							tagName="a"
							className="sd-contacts__tel"
							href={ `tel:+${ number_phone_href }` }
							value={ number_phone }
						/>
					) }

					{ title_address && (
						<RichText.Content
							tagName="p"
							className="sd-contacts__discription"
							value={ title_address }
						/>
					) }

					{ desc_address && (
						<RichText.Content
							tagName="p"
							className="sd-contacts__tel"
							value={ desc_address }
						/>
					) }

					{ Array.isArray( socs ) && socs.length > 0 && (
						<>
							{ title_socs && (
								<RichText.Content
									tagName="p"
									className="sd-contacts__discription"
									value={ title_socs }
								/>
							) }

							<div className="sd-footer__socials">
								{ socs.map( ( item, index ) => {
									const hasIcon = item.icon?.url?.trim();
									return (
										<a
											key={ index }
											href={ item.link }
											title={ item.name }
										>
											{ hasIcon && (
												<img
													src={ item.icon.url }
													alt={ item.name }
												/>
											) }
										</a>
									);
								} ) }
							</div>
						</>
					) }

					{ button.show && (
						<RichText.Content
							tagName="a"
							value={ button?.text || 'Заказать звонок' }
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
				</div>

				<div
					className="sd-contacts__map"
					data-coordinates={ map.coordinates_xy }
					data-zoom={ map.zoom }
					data-address={ map.address }
					data-icon={ iconBaloon }
				></div>
			</div>
		</section>
	);
}
