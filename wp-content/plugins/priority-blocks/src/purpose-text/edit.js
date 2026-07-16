import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title_01, title_02, title_03, subtitle } = attributes;

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
						onChange={ ( value ) =>
							onChangeTitle( 'title_01', value )
						}
						__nextHasNoMarginBottom={ true }
					/>
					<TextControl
						label="Заголовок 2 строка"
						value={ title_02 }
						onChange={ ( value ) =>
							onChangeTitle( 'title_02', value )
						}
						__nextHasNoMarginBottom={ true }
					/>
					<TextControl
						label="Заголовок 3 строка"
						value={ title_03 }
						onChange={ ( value ) =>
							onChangeTitle( 'title_03', value )
						}
						__nextHasNoMarginBottom={ true }
					/>
					<TextControl
						label="Подзаголовок"
						value={ subtitle }
						onChange={ ( value ) =>
							onChangeTitle( 'subtitle', value )
						}
						__nextHasNoMarginBottom={ true }
					/>
				</PanelBody>
			</InspectorControls>

			<section { ...useBlockProps( { className: 'sd-purpose-text' } ) }>
				<div className="container">
					{ ( title_01 || title_02 || title_03 ) && (
						<h2>
							{ title_01 && (
								<RichText
									tagName="span"
									className="wow fade-in-left"
									value={ title_01 }
									onChange={ ( value ) =>
										onChangeTitle( 'title_01', value )
									}
								/>
							) }

							{ ( title_02 || title_03 ) && (
								<span className="wow fade-in-right-05">
									{ title_02 && (
										<RichText
											tagName="span"
											value={ title_02 }
											onChange={ ( value ) =>
												onChangeTitle(
													'title_02',
													value
												)
											}
										/>
									) }
									{ title_03 && (
										<>
											<br />
											<RichText
												tagName="span"
												className="fade-in-right-1"
												value={ title_03 }
												onChange={ ( value ) =>
													onChangeTitle(
														'title_03',
														value
													)
												}
											/>
										</>
									) }
								</span>
							) }
						</h2>
					) }

					{ subtitle && (
						<RichText
							tagName="h3"
							value={ subtitle }
							onChange={ ( value ) =>
								onChangeTitle( 'subtitle', value )
							}
						/>
					) }
				</div>
			</section>
		</>
	);
}
