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
	TextareaControl,
	ToggleControl,
	Notice,
	Button,
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		number_phone,
		number_phone_href,
		button,
		socs_title,
		socs,
		copyright,
		links,
	} = attributes;
	const ALLOWED_MEDIA_TYPES = [ 'image' ];
	const [ linkError, setLinkError ] = useState( false );

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

	const onChangeLinksItem = ( index, value, field ) => {
		const updatedLinks = [ ...links ];
		updatedLinks[ index ][ field ] = value;
		setAttributes( { links: updatedLinks } );
	};

	const onClickAddLinksItem = () => {
		const newItem = {
			href: '',
			title: '',
			target: false,
		};
		const updatedLinks = [ ...links, newItem ];
		setAttributes( { links: updatedLinks } );
	};

	const onLinksDragEnd = ( result ) => {
		if ( ! result.destination ) return;

		const newLinks = Array.from( links );
		const [ movedItem ] = newLinks.splice( result.source.index, 1 );
		newLinks.splice( result.destination.index, 0, movedItem );

		setAttributes( { links: newLinks } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки Ссылки" initialOpen={ false }>
					<DragDropContext onDragEnd={ onLinksDragEnd }>
						<Droppable droppableId="links-list-droppable">
							{ ( provided ) => (
								<div
									{ ...provided.droppableProps }
									ref={ provided.innerRef }
									className="components-list-control components-list-control--mix"
								>
									<label className="components-list-control__label">
										Ссылки список
									</label>

									{ links?.map( ( item, index ) => (
										<Draggable
											key={ index }
											draggableId={ `link-${ index }` }
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
															{ item?.title
																? item?.title
																: `Ссылка ${
																		index +
																		1
																  }` }
														</span>

														<Button
															className="is-secondary is-destructive is-small"
															title="Удалить сслыку"
															onClick={ () => {
																const updatedLinks =
																	[
																		...links,
																	];
																updatedLinks.splice(
																	index,
																	1
																);
																setAttributes( {
																	links: updatedLinks,
																} );
															} }
														>
															x
														</Button>
													</summary>

													<TextControl
														label="Название ссылки"
														value={ item.title }
														onChange={ ( value ) =>
															onChangeLinksItem(
																index,
																value,
																'title'
															)
														}
														__nextHasNoMarginBottom={
															true
														}
													/>

													<TextControl
														label="Ссылка"
														type="url"
														value={ item.href }
														onChange={ ( value ) =>
															onChangeLinksItem(
																index,
																value,
																'href'
															)
														}
														__nextHasNoMarginBottom={
															true
														}
													/>

													<ToggleControl
														label="Открыть в новом окне"
														checked={ item.target }
														onChange={ ( value ) =>
															onChangeLinksItem(
																index,
																value,
																'target'
															)
														}
													/>
												</details>
											) }
										</Draggable>
									) ) }

									{ provided.placeholder }

									<hr />

									<Button
										variant="primary"
										onClick={ onClickAddLinksItem }
									>
										Добавить
									</Button>
								</div>
							) }
						</Droppable>
					</DragDropContext>
				</PanelBody>

				<PanelBody title="Настройки блока" initialOpen={ false }>
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

					<hr />

					<TextareaControl
						label="Текст копирайта"
						value={ copyright }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) =>
							onChangeText( 'copyright', value )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<footer { ...useBlockProps( { className: 'sd-footer' } ) }>
				<div className="container">
					<div className="sd-footer__main">
						<div className="sd-footer__logo-box">
							<InnerBlocks
								allowedBlocks={ [
									'core/image',
									'core/site-logo',
								] }
							/>

							<div className="sd-footer__links">
								{ links && links.length > 0 && (
									<>
										{ links.map( ( item, index ) => {
											if ( item?.title && item?.href ) {
												return (
													<a
														key={ index }
														href={ item.href }
														target={
															item.target
																? '_blank'
																: '_self'
														}
													>
														{ item.title }
													</a>
												);
											} else {
												return null;
											}
										} ) }
									</>
								) }
								<a
									href="http://sitesanddesign.ru/"
									target="_blank"
								>
									Разработка сайта - СайтыиДизайн.рф
								</a>
							</div>
						</div>

						<div className="sd-footer__contacts">
							<RichText
								tagName="a"
								className="sd-footer__tel"
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
											if (
												item?.icon?.id &&
												item?.link
											) {
												return (
													<a
														key={ index }
														href={ item.link }
														title={ item.name }
													>
														<img
															src={
																item.icon.url
															}
															alt={ item.name }
														/>
													</a>
												);
											} else {
												return (
													<div key={ index }></div>
												);
											}
										} ) }
									</div>
								</>
							) }
						</div>

						<div className="sd-footer__links sd-footer__links_mob">
							{ links && links.length > 0 && (
								<>
									{ links.map( ( item, index ) => {
										if ( item?.title && item?.href ) {
											return (
												<a
													key={ index }
													href={ item.href }
													target={
														item.target
															? '_blank'
															: '_self'
													}
												>
													{ item.title }
												</a>
											);
										} else {
											return null;
										}
									} ) }
								</>
							) }
							<a href="http://sitesanddesign.ru/" target="_blank">
								Разработка сайта - СайтыиДизайн.рф
							</a>
						</div>
					</div>

					{ copyright && (
						<div className="sd-footer__copy">
							<RichText
								tagName="p"
								value={ copyright }
								onChange={ ( value ) =>
									onChangeText( 'copyright', value )
								}
							/>
						</div>
					) }
				</div>
			</footer>
		</>
	);
}
