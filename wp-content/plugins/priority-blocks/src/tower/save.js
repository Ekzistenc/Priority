import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, subtitle, list, button } = attributes;

	return (
		<section { ...useBlockProps.save( { className: 'sd-tower' } ) }>
			<div className="container">
				{ button.show && (
					<RichText.Content
						tagName="a"
						value={ button.text }
						className={
							button.modal ? 'sd-modal-link' : 'sd-button-link'
						}
						href={
							! button.modal && button.link ? button.link : '#'
						}
						target={
							! button.modal && button.target ? '_blank' : '_self'
						}
					/>
				) }

				{ title && <RichText.Content tagName="h2" value={ title } /> }

				{ subtitle && (
					<RichText.Content tagName="h3" value={ subtitle } />
				) }

				{ list && list.length > 0 && (
					<ul className="sd-you__ul">
						{ list?.map( ( item, index ) => {
							let fadeClassName = '';

							switch ( index % 3 ) {
								case 0:
									fadeClassName = 'fade-in-right';
									break;
								case 1:
									fadeClassName = 'fade-in-right-05';
									break;
								case 2:
									fadeClassName = 'fade-in-right-1';
									break;
							}

							return (
								<RichText.Content
									tagName="li"
									key={ index }
									className={ `${ fadeClassName } wow` }
									value={ item }
								/>
							);
						} ) }
					</ul>
				) }
			</div>
		</section>
	);
}
