import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title_01, title_02, title_03, subtitle } = attributes;

	return (
		<>
			<section
				{ ...useBlockProps.save( { className: 'sd-purpose-text' } ) }
			>
				<div className="container">
					{ ( title_01 || title_02 || title_03 ) && (
						<h2>
							{ title_01 && (
								<RichText.Content
									tagName="span"
									className="wow fade-in-left"
									value={ title_01 }
								/>
							) }

							{ ( title_02 || title_03 ) && (
								<span className="wow fade-in-right-05">
									{ title_02 && (
										<RichText.Content
											tagName="span"
											value={ title_02 }
										/>
									) }
									{ title_03 && (
										<>
											<br />
											<RichText.Content
												tagName="span"
												className="fade-in-right-1"
												value={ title_03 }
											/>
										</>
									) }
								</span>
							) }
						</h2>
					) }

					{ subtitle && (
						<RichText.Content tagName="h3" value={ subtitle } />
					) }
				</div>
			</section>
		</>
	);
}
