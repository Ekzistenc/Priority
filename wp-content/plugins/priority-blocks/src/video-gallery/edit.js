import {
	useBlockProps,
	useInnerBlocksProps
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import './editor.scss';

export default function Edit({ clientId }) {
	const { updateBlockAttributes } = useDispatch('core/block-editor');
	const innerBlocks = useSelect(
		(select) => select('core/block-editor')
			.getBlock(clientId)?.innerBlocks ?? [],
		[clientId]
	);

	useEffect(() => {
		innerBlocks.forEach((block) => {
			if (
				block.name === 'core/video' &&
				block.attributes.className !== 'swiper-slide'
			) {
				updateBlockAttributes(block.clientId, { className: 'swiper-slide' });
			}
		});
	}, [innerBlocks, updateBlockAttributes]);

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'swiper-wrapper',
		},
		{
			allowedBlocks: ['core/video'],
			template: [['core/video', {className: 'swiper-slide'}]],
			orientation: 'vertical'
		}
	);

	return (
		<>
			<section {...useBlockProps({ className: 'sd-exterier sd-exterier--video' })}>
				<div className="container">
					<div className="sd-exterier__heading">
						<div className="sd-compromises__slider-buttons">
							<div className="swiper-button-prev swiper-video-gallery-prev"></div>
							<div className="swiper-counter-video-gallery"></div>
							<div className="swiper-button-next swiper-video-gallery-next"></div>
						</div>
					</div>

					<div className="swiper swiper-video-gallery">
						<div {...innerBlocksProps} />
					</div>

					<div className="swiper-pagination-video-gallery"></div>
				</div>
			</section>
		</>
	);
}
