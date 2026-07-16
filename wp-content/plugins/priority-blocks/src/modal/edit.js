import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	RichText,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	TextareaControl,
	ToggleControl,
	PanelBody,
	Notice,
	Button,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { image_logo, image_bg, title } = attributes;
	const [ showDialog, setShowDialog ] = useState( false );
	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	const onChangeText = ( field, value ) => {
		setAttributes( { [ field ]: value } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<ToggleControl
						label="Показать всплывающее окно для настройки"
						__nextHasNoMarginBottom={ true }
						checked={ showDialog }
						onChange={ ( value ) => setShowDialog( value ) }
					/>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => {
								const url =
									media?.sizes?.medium?.url ||
									media?.url ||
									'';
								setAttributes( {
									image_logo: {
										id: media?.id || 0,
										url: url,
										alt: media?.alt || '',
									},
								} );
							} }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ image_logo.id }
							render={ ( { open } ) => (
								<div className="components-base-control">
									<label className="components-base-control__label-media-button">
										Выбрать логотип
									</label>
									{ image_logo.url && (
										<div className="components-base-control__media-preview">
											<img
												src={ image_logo.url }
												alt={ image_logo.alt }
											/>
										</div>
									) }

									<div className="components-base-control__media-buttons">
										<Button
											variant="primary"
											onClick={ open }
										>
											Выбрать логотип
										</Button>

										{ image_logo.url && (
											<Button
												className="is-secondary is-destructive"
												onClick={ () => {
													setAttributes( {
														image_logo: {
															id: 0,
															url: '',
															alt: '',
														},
													} );
												} }
											>
												x
											</Button>
										) }
									</div>
								</div>
							) }
						/>
					</MediaUploadCheck>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => {
								const url =
									media?.sizes?.large?.url ||
									media?.url ||
									'';
								setAttributes( {
									image_bg: {
										id: media?.id || 0,
										url: url,
										alt: media?.alt || '',
									},
								} );
							} }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ image_bg.id }
							render={ ( { open } ) => (
								<div className="components-base-control">
									<label className="components-base-control__label-media-button">
										Выбрать фон
									</label>
									{ image_bg.url && (
										<div className="components-base-control__media-preview">
											<img
												src={ image_bg.url }
												alt={ image_bg.alt }
											/>
										</div>
									) }

									<div className="components-base-control__media-buttons">
										<Button
											variant="primary"
											onClick={ open }
										>
											Выбрать фон
										</Button>

										{ image_bg.url && (
											<Button
												className="is-secondary is-destructive"
												onClick={ () => {
													setAttributes( {
														image_bg: {
															id: 0,
															url: '',
															alt: '',
														},
													} );
												} }
											>
												x
											</Button>
										) }
									</div>
								</div>
							) }
						/>
					</MediaUploadCheck>

					<TextareaControl
						label="Заголовок"
						value={ title }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) => onChangeText( 'title', value ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'dialog-block' } ) }>
				{ ! showDialog && (
					<Notice status="warning" isDismissible={ false }>
						Здесь показывается всплывающее окно
					</Notice>
				) }

				<dialog id="modalDialog" open={ showDialog }>
					<div className="sd-dialog__wrapper">
						<div className="sd-dialog__grid">
							<a className="sd-dialog__close">
								<svg
									width="32.527344"
									height="32.526855"
									viewBox="0 0 32.5273 32.5269"
									fill="none"
								>
									<desc>Created with Pixso.</desc>
									<defs />
									<rect
										id="Прямоугольник 115"
										x="9.035156"
										y="7.228149"
										rx="1.000000"
										width="23.000000"
										height="2.555555"
										transform="rotate(45 9.035156 7.228149)"
										fill="#EEDECD"
										fill-opacity="1.000000"
									/>
									<rect
										id="Прямоугольник 117"
										x="7.228516"
										y="23.491638"
										rx="1.000000"
										width="23.000000"
										height="2.555555"
										transform="rotate(-45 7.228516 23.491638)"
										fill="#EEDECD"
										fill-opacity="1.000000"
									/>
								</svg>
							</a>

							{ image_logo.url && (
								<img
									src={ image_logo.url }
									alt={ image_logo.alt }
									loading="lazy"
									className="sd-dialog__logo"
								/>
							) }

							{ image_bg.url && (
								<img
									src={ image_bg.url }
									alt={ image_bg.alt }
									loading="lazy"
									className="modal__img"
								/>
							) }

							<div className="inline-inner">
								{ title && (
									<RichText
										tagName="h2"
										value={ title }
										className="text-center"
										onChange={ ( value ) =>
											onChangeText( 'title', value )
										}
									/>
								) }

								<InnerBlocks
									allowedBlocks={ [
										'contact-form-7/contact-form-selector',
									] }
								/>
							</div>
						</div>
					</div>
				</dialog>
			</div>
		</>
	);
}
