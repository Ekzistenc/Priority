import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { image_logo, image_bg, title } = attributes;

	return (
		<>
			<dialog id="modalDialog" { ...useBlockProps.save() }>
				<div className="sd-dialog__wrapper">
					<div className="sd-dialog__grid">
						<a className="sd-dialog__close">
							<svg
								width="32.527344"
								height="32.526855"
								viewBox="0 0 32.5273 32.5269"
								fill="none"
							>
								<desc>Created with Pixso.</desc>
								<defs />
								<rect
									id="Прямоугольник 115"
									x="9.035156"
									y="7.228149"
									rx="1.000000"
									width="23.000000"
									height="2.555555"
									transform="rotate(45 9.035156 7.228149)"
									fill="#EEDECD"
									fill-opacity="1.000000"
								/>
								<rect
									id="Прямоугольник 117"
									x="7.228516"
									y="23.491638"
									rx="1.000000"
									width="23.000000"
									height="2.555555"
									transform="rotate(-45 7.228516 23.491638)"
									fill="#EEDECD"
									fill-opacity="1.000000"
								/>
							</svg>
						</a>

						{ image_logo.url && (
							<img
								src={ image_logo.url }
								alt={ image_logo.alt }
								loading="lazy"
								className="sd-dialog__logo"
							/>
						) }

						{ image_bg.url && (
							<img
								src={ image_bg.url }
								alt={ image_bg.alt }
								loading="lazy"
								className="modal__img"
							/>
						) }

						<div className="inline-inner">
							{ title && (
								<RichText.Content
									tagName="h2"
									value={ title }
									className="text-center"
								/>
							) }

							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</dialog>
		</>
	);
}
