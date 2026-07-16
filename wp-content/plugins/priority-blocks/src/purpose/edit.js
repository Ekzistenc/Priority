import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title_01, title_02, title_03 } = attributes;

	const onChangeTitle = ( field, value ) => {
		setAttributes( { [ field ]: value } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<TextControl
						label="Заголовок 1 строка"
						value={ title_01 }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) =>
							onChangeTitle( 'title_01', value )
						}
					/>
					<TextControl
						label="Заголовок 2 строка"
						value={ title_02 }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) =>
							onChangeTitle( 'title_02', value )
						}
					/>
					<TextControl
						label="Заголовок 3 строка"
						value={ title_03 }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) =>
							onChangeTitle( 'title_03', value )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...useBlockProps( { className: 'sd-purpose' } ) }>
				{ ( title_01 || title_02 || title_03 ) && (
					<h4 className="container sd-purpose__h4">
						{ title_01 && (
							<RichText
								tagName="span"
								value={ title_01 }
								onChange={ ( value ) =>
									onChangeTitle( 'title_01', value )
								}
							/>
						) }
						{ title_02 && (
							<RichText
								tagName="span"
								value={ title_02 }
								onChange={ ( value ) =>
									onChangeTitle( 'title_02', value )
								}
							/>
						) }
						{ title_03 && (
							<RichText
								tagName="span"
								value={ title_03 }
								onChange={ ( value ) =>
									onChangeTitle( 'title_03', value )
								}
							/>
						) }
					</h4>
				) }
			</section>
		</>
	);
}
