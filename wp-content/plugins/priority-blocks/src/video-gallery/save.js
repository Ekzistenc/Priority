import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save() {

	return (
		<section {...useBlockProps.save({ className: 'sd-exterier sd-exterier--video' })}>
			<div className="container">
				<div className="sd-exterier__heading">
					<div className="sd-compromises__slider-buttons">
						<div className="swiper-button-prev swiper-video-gallery-prev"></div>
						<div className="swiper-counter-video-gallery"></div>
						<div className="swiper-button-next swiper-video-gallery-next"></div>
					</div>
				</div>

				<div className="swiper swiper-video-gallery">
					<div className="swiper-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>

				<div className="swiper-pagination-video-gallery"></div>
			</div>
		</section>
	);
}
