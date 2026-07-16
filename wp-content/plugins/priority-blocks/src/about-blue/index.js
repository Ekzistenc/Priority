import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: ( { attributes, setAttributes } ) => {
		const { title, subtitle } = attributes;
		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки блока">
						<TextControl
							label="Заголовок"
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
							__nextHasNoMarginBottom={ true }
							__next40pxDefaultSize
						/>
						<TextareaControl
							label="Подзаголовок"
							value={ subtitle }
							onChange={ ( value ) =>
								setAttributes( { subtitle: value } )
							}
							__nextHasNoMarginBottom={ true }
							__next40pxDefaultSize
						/>
					</PanelBody>
				</InspectorControls>

				<div
					{ ...useBlockProps( {
						className: 'sd-about__blue-block',
					} ) }
				>
					<div className="container">
						<RichText
							tagName="h3"
							allowedFormats={ [] }
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
							placeholder="Введите заголовок..."
						/>
						<RichText
							tagName="h4"
							allowedFormats={ [] }
							value={ subtitle }
							className="fade-in-right wow"
							onChange={ ( value ) =>
								setAttributes( { subtitle: value } )
							}
							placeholder="Введите подзаголовок..."
						/>
					</div>
				</div>
			</>
		);
	},

	save: () => {
		return null;
	},
} );
