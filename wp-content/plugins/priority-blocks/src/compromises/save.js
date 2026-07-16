import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, slider } = attributes;

	return (
		<section { ...useBlockProps.save( { className: 'sd-compromises' } ) }>
			<div className="container">
				{ title && (
					<RichText.Content
						tagName="h2"
						value={ title }
						className="fade-in-left wow"
					/>
				) }

				{ slider && slider.length > 0 && (
					<div className="sd-compromises__slider">
						<div
							thumbsSlider=""
							className="swiper swiper-compromises-small"
						>
							<div className="swiper-wrapper">
								{ slider.map( ( item, index ) => {
									let src = '';
									let alt = '';

									if ( item.image2.is_preview ) {
										src = item?.image2?.thumb_url;
										alt = item?.image2?.alt;
									} else {
										src = item?.image1?.thumb_url;
										alt = item?.image1?.alt;
									}

									if ( ! src ) {
										return null;
									}

									return (
										<div
											key={ index }
											className="swiper-slide"
										>
											<img
												src={ src }
												alt={
													alt ? `Превью ${ alt }` : ''
												}
												loading="lazy"
											/>
										</div>
									);
								} ) }
							</div>
						</div>

						<div className="sd-compromises__slider-buttons">
							<div className="swiper-button-prev swiper-compromises-prev"></div>
							<div className="swiper-counter-compromises"></div>
							<div className="swiper-button-next swiper-compromises-next"></div>
						</div>

						<div className="swiper swiper-compromises">
							<div className="swiper-wrapper">
								{ slider.map( ( item, index ) => (
									<div key={ index } className="swiper-slide">
										{ item.description && (
											<RichText.Content
												tagName="h3"
												value={ item.description }
											/>
										) }

										{ ( item.image1.id ||
											item.image2.id ) && (
											<div className="sd-compromises__slide-box">
												{ item.image1.id && (
													<a
														href={
															item.image1.full_url
														}
														className="glightbox"
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
												{ item.image2.id && (
													<a
														href={
															item.image2.full_url
														}
														className="glightbox"
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
							<div className="swiper-pagination swiper-pagination_quick-card"></div>
						</div>

						<div className="swiper-pagination-compromises"></div>
					</div>
				) }
			</div>
		</section>
	);
}
