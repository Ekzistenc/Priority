import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';


import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {

	edit: ({ }) => {
		const innerBlocksProps = useInnerBlocksProps({
			className: 'swiper-wrapper'
		}, {
			template: [
				['snd/main-swiper-slide', {}],
			],
			orientation: 'horizontal',
			allowedBlocks: [
				'snd/main-swiper-slide'
			]
		});
		return (
			<>


				<main {...useBlockProps({ className: 'sd-main-slider' })}>
						<div className="swiper swiper-main">
							<div {...innerBlocksProps} />
					</div>
				</main>
			</>

		);
	},

	save: () => {
		return <InnerBlocks.Content />;
	},
});
