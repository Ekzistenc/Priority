import { registerBlockType, createBlock } from '@wordpress/blocks';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ( { clientId } ) => {
		const { insertBlock } = useDispatch( 'core/block-editor' );
		const innerBlocksCount = useSelect(
			( select ) => select( 'core/block-editor' ).getBlockCount( clientId ),
			[ clientId ]
		);

		const blockProps = useBlockProps( { className: 'sd-about__grid' } );
		const innerBlocksProps = useInnerBlocksProps( blockProps, {
			template: [
				[ 'snd/about-grid-item' ],
				[ 'snd/about-grid-item' ],
				[ 'snd/about-grid-item' ],
			],
			allowedBlocks: [ 'snd/about-grid-item' ],
			orientation: 'horizontal',
			renderAppender: () => (
				<Button
					variant="primary"
					onClick={ () => {
						insertBlock(
							createBlock( 'snd/about-grid-item' ),
							innerBlocksCount,
							clientId
						);
					} }
				>
					Добавить проект
				</Button>
			),
		} );

		return <section { ...innerBlocksProps } />;
	},

	save: () => {
		return <InnerBlocks.Content />;
	},
} );
