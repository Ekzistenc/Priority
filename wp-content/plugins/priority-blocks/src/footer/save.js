import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		number_phone,
		number_phone_href,
		button,
		socs_title,
		socs,
		copyright,
		links,
	} = attributes;

	return (
		<footer { ...useBlockProps.save( { className: 'sd-footer' } ) }>
			<div className="container">
				<div className="sd-footer__main">
					<div className="sd-footer__logo-box">
						<InnerBlocks.Content />

						<div className="sd-footer__links">
							{ links && links.length > 0 && (
								<>
									{ links.map( ( item, index ) => {
										if ( item?.title && item?.href ) {
											return (
												<a
													key={ index }
													href={ item.href }
													target={
														item.target
															? '_blank'
															: '_self'
													}
												>
													{ item.title }
												</a>
											);
										} else {
											return null;
										}
									} ) }
								</>
							) }
							<a href="http://sitesanddesign.ru/" target="_blank">
								Разработка сайта - СайтыиДизайн.рф
							</a>
						</div>
					</div>

					<div className="sd-footer__contacts">
						<RichText.Content
							tagName="a"
							className="sd-footer__tel"
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
					</div>

					<div className="sd-footer__links sd-footer__links_mob">
						{ links && links.length > 0 && (
							<>
								{ links.map( ( item, index ) => {
									if ( item?.title && item?.href ) {
										return (
											<a
												key={ index }
												href={ item.href }
												target={
													item.target
														? '_blank'
														: '_self'
												}
											>
												{ item.title }
											</a>
										);
									} else {
										return null;
									}
								} ) }
							</>
						) }
						<a href="http://sitesanddesign.ru/" target="_blank">
							Разработка сайта - СайтыиДизайн.рф
						</a>
					</div>
				</div>

				{ copyright && (
					<div className="sd-footer__copy">
						<RichText.Content tagName="p" value={ copyright } />
					</div>
				) }
			</div>
		</footer>
	);
}
