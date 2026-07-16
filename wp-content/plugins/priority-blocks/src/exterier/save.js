import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, slider } = attributes;

	return (
		<section { ...useBlockProps.save( { className: 'sd-exterier' } ) }>
			<div className="container">
				<div className="sd-exterier__heading">
					{ title && (
						<RichText.Content tagName="h2" value={ title } />
					) }

					{ slider && slider.length > 0 && (
						<div className="sd-compromises__slider-buttons">
							<div className="swiper-button-prev swiper-exterier-prev"></div>
							<div className="swiper-counter-exterier"></div>
							<div className="swiper-button-next swiper-exterier-next"></div>
						</div>
					) }
				</div>

				{ slider && slider.length > 0 && (
					<>
						<div className="swiper swiper-exterier">
							<div className="swiper-wrapper">
								{ slider.map( ( item, index ) => (
									<div key={ index } className="swiper-slide">
										{ ( item.image1.url ||
											item.image2.url ) && (
											<div className="sd-compromises__slide-box">
												{ item.image1.url && (
													<a
														href={
															item.image1.full_url
														}
														className="glightbox3"
													>
														<img
															src={
																item.image1.url
															}
															alt={
																item.image1.alt
															}
															loading="lazy"
														/>
													</a>
												) }

												{ item.image2.url && (
													<a
														href={
															item.image2.full_url
														}
														className="glightbox3"
													>
														<img
															src={
																item.image2.url
															}
															alt={
																item.image2.alt
															}
															loading="lazy"
														/>
													</a>
												) }
											</div>
										) }
									</div>
								) ) }
							</div>
						</div>

						<div className="swiper-pagination-exterier"></div>
					</>
				) }
			</div>
		</section>
	);
}
