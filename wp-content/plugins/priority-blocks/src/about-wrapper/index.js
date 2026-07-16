import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ( {} ) => {
		const innerBlocksProps = useInnerBlocksProps(
			{},
			{
				template: [ [ 'snd/about-content' ], [ 'snd/about-blue' ] ],
				orientation: 'vertical',
				allowedBlocks: [ 'snd/about-content', 'snd/about-blue' ],
			}
		);
		return (
			<>
				<section { ...useBlockProps( { className: 'sd-about' } ) }>
					<div { ...innerBlocksProps } />
				</section>
			</>
		);
	},

	save: () => {
		return <InnerBlocks.Content />;
	},
} );
