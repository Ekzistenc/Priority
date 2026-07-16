import {
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Notice,
	Button,
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { number_phone, number_phone_href, button, socs_title, socs } =
		attributes;
	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	const [ linkError, setLinkError ] = useState( false );
	const [ showBurger, setShowBurger ] = useState( false );

	const isValidUrl = ( url ) => {
		try {
			new URL( url );
			return true;
		} catch ( _ ) {
			return false;
		}
	};

	const onChangeText = ( field, value ) => {
		setAttributes( { [ field ]: value } );
	};

	const onChangeButtonProp = ( field, value ) => {
		setAttributes( {
			button: {
				...button,
				[ field ]: value,
			},
		} );
	};

	const onChangeSocsItem = ( index, value, field ) => {
		const updatedSocs = [ ...socs ];
		updatedSocs[ index ][ field ] = value;
		setAttributes( { socs: updatedSocs } );
	};

	const onClickAddSocsItem = () => {
		const newItem = {
			name: '',
			link: '',
			icon: {
				id: 0,
				url: '',
			},
		};
		const updatedSocs = [ ...socs, newItem ];
		setAttributes( { socs: updatedSocs } );
	};

	const onDragEnd = ( result ) => {
		if ( ! result.destination ) return;

		const newSocs = Array.from( socs );
		const [ movedItem ] = newSocs.splice( result.source.index, 1 );
		newSocs.splice( result.destination.index, 0, movedItem );

		setAttributes( { socs: newSocs } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<ToggleControl
						label="Показать мобильное меню"
						__nextHasNoMarginBottom={ true }
						checked={ showBurger }
						onChange={ ( value ) => setShowBurger( value ) }
					/>

					<TextControl
						label="Телефон"
						type="tel"
						value={ number_phone }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) => {
							onChangeText( 'number_phone', value );
							onChangeText(
								'number_phone_href',
								value.replace( /[^0-9]/g, '' )
							);
						} }
					/>

					<TextControl
						label="Телефон для ссылки"
						value={ number_phone_href }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) => {
							onChangeText(
								'number_phone_href',
								value.replace( /[^0-9]/g, '' )
							);
						} }
					/>

					<div className="components-base-control">
						<label className="components-base-control__label">
							Кнопка
						</label>

						<ToggleControl
							__nextHasNoMarginBottom={ true }
							checked={ button.show }
							label="Показывать кнопку"
							onChange={ () =>
								onChangeButtonProp( 'show', ! button.show )
							}
						/>

						<ToggleControl
							__nextHasNoMarginBottom={ true }
							checked={ button.modal }
							label="Модальное окно"
							onChange={ () =>
								onChangeButtonProp( 'modal', ! button.modal )
							}
						/>

						<TextControl
							value={ button.text }
							label="Текст кнопки"
							__nextHasNoMarginBottom={ true }
							onChange={ ( value ) =>
								onChangeButtonProp( 'text', value )
							}
						/>

						{ ! button.modal && (
							<>
								<TextControl
									value={ button.link }
									label="URL кнопки"
									__nextHasNoMarginBottom={ true }
									onChange={ ( value ) => {
										onChangeButtonProp( 'link', value );
										setLinkError(
											value && ! isValidUrl( value )
										);
									} }
								/>

								{ linkError && (
									<Notice
										status="error"
										isDismissible={ false }
									>
										Введите корректный URL, например:
										https://example.com
									</Notice>
								) }

								<ToggleControl
									__nextHasNoMarginBottom={ true }
									checked={ button.target }
									label="Открывать в новой вкладке"
									onChange={ () =>
										onChangeButtonProp(
											'target',
											! button.target
										)
									}
								/>
							</>
						) }
					</div>

					<TextControl
						label="Соцсети Заголовок"
						value={ socs_title }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) => {
							onChangeText( 'socs_title', value );
						} }
					/>

					<DragDropContext onDragEnd={ onDragEnd }>
						<Droppable droppableId="socs-list-droppable">
							{ ( provided ) => (
								<div
									{ ...provided.droppableProps }
									ref={ provided.innerRef }
									className="components-list-control components-list-control--mix"
								>
									<label className="components-list-control__label">
										Соцсети список
									</label>

									{ socs?.map( ( item, index ) => (
										<Draggable
											key={ index }
											draggableId={ `soc-${ index }` }
											index={ index }
										>
											{ ( provided ) => (
												<details
													className="components-list-control__item"
													ref={ provided.innerRef }
													{ ...provided.draggableProps }
													{ ...provided.dragHandleProps }
												>
													<summary>
														<div className="dragabble-element">
															=
														</div>
														<span>
															{ item?.name
																? item?.name
																: `Ссылка ${
																		index +
																		1
																  }` }
														</span>

														<Button
															className="is-secondary is-destructive is-small"
															title="Удалить сслыку"
															onClick={ () => {
																const updatedSocs =
																	[ ...socs ];
																updatedSocs.splice(
																	index,
																	1
																);
																setAttributes( {
																	socs: updatedSocs,
																} );
															} }
														>
															x
														</Button>
													</summary>

													<TextControl
														label="Имя"
														value={ item.name }
														onChange={ ( value ) =>
															onChangeSocsItem(
																index,
																value,
																'name'
															)
														}
														__nextHasNoMarginBottom={
															true
														}
													/>

													<hr />

													<TextControl
														label="Ссылка"
														type="url"
														value={ item.link }
														onChange={ ( value ) =>
															onChangeSocsItem(
																index,
																value,
																'link'
															)
														}
														__nextHasNoMarginBottom={
															true
														}
													/>

													<hr />

													<MediaUploadCheck>
														<MediaUpload
															onSelect={ (
																media
															) => {
																const id =
																	media?.id ||
																	0;
																const thumb_url =
																	media?.sizes
																		?.thumbnail
																		?.url ||
																	media?.url ||
																	'';

																const image = {
																	...socs[
																		index
																	].icon,
																	id: id,
																	url: thumb_url,
																};

																onChangeSocsItem(
																	index,
																	image,
																	'icon'
																);
															} }
															allowedTypes={
																ALLOWED_MEDIA_TYPES
															}
															value={
																socs[ index ]
																	.icon.id
															}
															render={ ( {
																open,
															} ) => (
																<div className="components-base-control">
																	<label className="components-base-control__label-media-button">
																		Выбрать
																		иконку
																	</label>
																	{ socs[
																		index
																	]?.icon
																		?.url && (
																		<>
																			<div className="components-base-control__media-preview">
																				<img
																					src={
																						socs[
																							index
																						]
																							.icon
																							.url
																					}
																					alt=""
																				/>
																			</div>
																		</>
																	) }

																	<div className="components-base-control__media-buttons">
																		<Button
																			variant={
																				socs[
																					index
																				]
																					?.icon
																					?.id
																					? 'secondary'
																					: 'primary'
																			}
																			onClick={
																				open
																			}
																		>
																			{ socs[
																				index
																			]
																				?.icon
																				?.id
																				? 'Изменить'
																				: 'Выбрать' }{ ' ' }
																			иконку
																		</Button>

																		{ socs[
																			index
																		]?.icon
																			?.url && (
																			<Button
																				className="is-secondary is-destructive"
																				onClick={ () => {
																					const image =
																						{
																							...socs[
																								index
																							]
																								.icon,
																							id: 0,
																							url: '',
																						};

																					onChangeSocsItem(
																						index,
																						image,
																						'icon'
																					);
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
												</details>
											) }
										</Draggable>
									) ) }

									{ provided.placeholder }

									<hr />
									<Button
										variant="primary"
										onClick={ onClickAddSocsItem }
									>
										Добавить
									</Button>
								</div>
							) }
						</Droppable>
					</DragDropContext>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'sd-header-wrapper' } ) }>
				<header className="sd-header">
					<div className="container">
						<a className="sd-burger-button">
							<span></span>
							<span></span>
							<span></span>
						</a>

						<RichText
							tagName="a"
							className="sd-header__tel"
							href={ `tel:+${ number_phone_href }` }
							value={ number_phone }
							onChange={ ( value ) =>
								onChangeText( 'number_phone', value )
							}
						/>
					</div>
				</header>

				<nav className={ `sd-burger ${ showBurger ? 'open' : '' }` }>
					<a className="sd-burger__close">
						<svg
							width="32.527344"
							height="32.526855"
							viewBox="0 0 32.5273 32.5269"
							fill="none"
						>
							<desc>Created with Pixso.</desc>
							<rect
								x="9.035156"
								y="7.228149"
								rx="1"
								width="23"
								height="2.555555"
								transform="rotate(45 9.035156 7.228149)"
								fill="#EEDECD"
								fillOpacity="1"
							/>
							<rect
								x="7.228516"
								y="23.491638"
								rx="1"
								width="23"
								height="2.555555"
								transform="rotate(-45 7.228516 23.491638)"
								fill="#EEDECD"
								fillOpacity="1"
							/>
						</svg>
					</a>

					<div className="sd-burger__innerBlocks">
						<InnerBlocks
							allowedBlocks={ [
								'core/site-logo',
								'core/image',
								'core/navigation',
							] }
							template={ [
								[
									'core/navigation',
									{
										orientation: 'vertical',
										overlayMenu: false,
									},
								],
							] }
							templateLock={ false }
						/>
					</div>

					<RichText
						tagName="a"
						className="sd-header__tel"
						href={ `tel:+${ number_phone_href }` }
						value={ number_phone }
						onChange={ ( value ) =>
							onChangeText( 'number_phone', value )
						}
					/>

					{ button.show && (
						<RichText
							tagName="a"
							value={ button.text }
							onChange={ ( value ) =>
								onChangeButtonProp( 'text', value )
							}
							className={
								button.modal
									? 'sd-modal-link'
									: 'sd-button-link'
							}
							href={
								! button.modal && button.link
									? button.link
									: '#'
							}
							target={
								! button.modal && button.target
									? '_blank'
									: '_self'
							}
						/>
					) }

					{ socs && socs.length > 0 && (
						<>
							<RichText
								tagName="p"
								value={ socs_title }
								onChange={ ( value ) =>
									onChangeText( 'socs_title', value )
								}
							/>

							<div className="sd-footer__socials">
								{ socs.map( ( item, index ) => {
									if ( item?.icon?.id && item?.link ) {
										return (
											<a
												key={ index }
												href={ item.link }
												title={ item.name }
											>
												<img
													src={ item.icon.url }
													alt={ item.name }
												/>
											</a>
										);
									} else {
										return <div key={ index }></div>;
									}
								} ) }
							</div>
						</>
					) }
				</nav>
			</div>
		</>
	);
}
