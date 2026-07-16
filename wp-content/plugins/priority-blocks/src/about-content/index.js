import { registerBlockType } from '@wordpress/blocks';
import {
	InnerBlocks,
	useInnerBlocksProps,
	InspectorControls,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';

import { PanelBody, TextareaControl } from '@wordpress/components';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ( { attributes, setAttributes } ) => {
		const { title } = attributes;
		const innerBlocksProps = useInnerBlocksProps(
			{},
			{
				template: [ [ 'core/paragraph' ], [ 'snd/about-grid' ] ],
				orientation: 'gorizontal',
				allowedBlocks: [ 'core/paragraph', 'snd/about-grid' ],
			}
		);
		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки блока">
						<TextareaControl
							label="Заголовок"
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
							__nextHasNoMarginBottom={ true }
							__next40pxDefaultSize
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...useBlockProps( { className: 'container' } ) }>
					<RichText
						tagName="h2"
						className="fade-in-left wow"
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
					/>
					<div { ...innerBlocksProps } />
				</div>
			</>
		);
	},

	save: () => {
		return <InnerBlocks.Content />;
	},
} );
