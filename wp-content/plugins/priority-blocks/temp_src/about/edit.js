import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title, description, subtitle } = attributes;
	const onChangeText = ( field, value ) => {
		setAttributes( { [ field ]: value } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<TextControl
						label="Заголовок"
						value={ title }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) => onChangeText( 'title', value ) }
					/>
					<TextareaControl
						label="Описание"
						value={ description }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) =>
							onChangeText( 'description', value )
						}
					/>
					<TextareaControl
						label="Подзаголовок"
						value={ subtitle }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) =>
							onChangeText( 'subtitle', value )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...useBlockProps( { className: 'sd-about' } ) }>
				<div className="container">
					{ title && (
						<RichText
							tagName="h2"
							value={ title }
							className="fade-in-left wow"
							onChange={ ( value ) =>
								onChangeText( 'title', value )
							}
						/>
					) }

					{ description && (
						<RichText
							tagName="p"
							value={ description }
							onChange={ ( value ) =>
								onChangeText( 'description', value )
							}
						/>
					) }

					{ subtitle && (
						<RichText
							tagName="h3"
							value={ subtitle }
							className="fade-in-right-05 wow"
							onChange={ ( value ) =>
								onChangeText( 'subtitle', value )
							}
						/>
					) }
				</div>
			</section>
		</>
	);
}
