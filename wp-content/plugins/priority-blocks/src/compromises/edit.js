import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	Button,
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title, slider } = attributes;
	const ALLOWED_MEDIA_TYPES = [ 'image' ];

	const onChangeText = ( field, value ) => {
		setAttributes( { [ field ]: value } );
	};

	const onChangeSliderItem = ( index, value, field ) => {
		const updatedSlider = JSON.parse( JSON.stringify( slider ) );
		updatedSlider[ index ][ field ] = value;
		setAttributes( { slider: updatedSlider } );
	};

	const onClickAddSliderItem = () => {
		const newItem = {
			description: 'Описание',
			image1: {
				id: 0,
				url: '',
				full_url: '',
				thumb_url: '',
				alt: '',
				is_preview: true,
			},
			image2: {
				id: 0,
				url: '',
				full_url: '',
				thumb_url: '',
				alt: '',
				is_preview: false,
			},
		};
		const updatedSlider = JSON.parse( JSON.stringify( slider ) );
		updatedSlider.push( newItem );
		setAttributes( { slider: updatedSlider } );
	};

	const onDragEnd = ( result ) => {
		if ( ! result.destination ) return;

		const newSlider = Array.from( slider );
		const [ movedItem ] = newSlider.splice( result.source.index, 1 );
		newSlider.splice( result.destination.index, 0, movedItem );

		setAttributes( { slider: newSlider } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<TextareaControl
						label="Заголовок"
						value={ title }
						__nextHasNoMarginBottom={ true }
						onChange={ ( value ) => onChangeText( 'title', value ) }
					/>

					<DragDropContext onDragEnd={ onDragEnd }>
						<Droppable droppableId="slider-list-droppable">
							{ ( provided ) => (
								<div
									{ ...provided.droppableProps }
									ref={ provided.innerRef }
									className="components-list-control components-list-control--mix"
								>
									<label className="components-list-control__label">
										Слайдер
									</label>

									{ slider?.map( ( item, index ) => (
										<Draggable
											key={ index }
											draggableId={ `slide-${ index }` }
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
														<div className="dragabble-element"></div>
														<span>
															Слайд { index + 1 }
														</span>

														<Button
															className="is-secondary is-destructive is-small"
															title="Удалить слайд"
															onClick={ () => {
																const updatedSlider =
																	JSON.parse(
																		JSON.stringify(
																			slider
																		)
																	);
																updatedSlider.splice(
																	index,
																	1
																);
																setAttributes( {
																	slider: updatedSlider,
																} );
															} }
														></Button>
													</summary>

													<TextControl
														label="Описание"
														value={
															item.description
														}
														onChange={ ( value ) =>
															onChangeSliderItem(
																index,
																value,
																'description'
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
																const url =
																	media?.sizes
																		?.full
																		?.url ||
																	media?.url ||
																	'';
																const full_url =
																	media?.sizes
																		?.full
																		?.url ||
																	media?.url ||
																	'';
																const thumb_url =
																	media?.sizes
																		?.thumbnail
																		?.url ||
																	media?.url ||
																	'';
																const alt =
																	media?.alt ||
																	'';

																const image = {
																	...slider[
																		index
																	].image1,
																	id: id,
																	url: url,
																	full_url:
																		full_url,
																	thumb_url:
																		thumb_url,
																	alt: alt,
																};

																onChangeSliderItem(
																	index,
																	image,
																	'image1'
																);
															} }
															allowedTypes={
																ALLOWED_MEDIA_TYPES
															}
															value={
																slider[ index ]
																	.image1.id
															}
															render={ ( {
																open,
															} ) => (
																<div className="components-base-control">
																	<label className="components-base-control__label-media-button">
																		Выбрать
																		изображение
																	</label>
																	{ slider[
																		index
																	]?.image1
																		?.url && (
																		<>
																			<div className="components-base-control__media-preview">
																				<img
																					src={
																						slider[
																							index
																						]
																							.image1
																							.url
																					}
																					alt={
																						slider[
																							index
																						]
																							.image1
																							.alt
																					}
																				/>
																			</div>
																		</>
																	) }

																	<div className="components-base-control__media-buttons">
																		<Button
																			variant={
																				slider[index]?.image1?.id ? 'secondary' : 'primary'
																			}
																			onClick={open}
																		>
																			{ slider[index]?.image1?.id ? 'Изменить' : 'Выбрать' }{ ' ' }
																			изображение
																		</Button>

																		{ slider[
																			index
																		]
																			?.image1
																			?.url && (
																			<Button
																				className="is-secondary is-destructive"
																				onClick={ () => {
																					const image =
																						{
																							...slider[
																								index
																							]
																								.image1,
																							id: 0,
																							url: '',
																							full_url:
																								'',
																							thumb_url:
																								'',
																							alt: '',
																						};

																					onChangeSliderItem(
																						index,
																						image,
																						'image1'
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

													<hr />

													<MediaUploadCheck>
														<MediaUpload
															onSelect={ (
																media
															) => {
																const id =
																	media?.id ||
																	0;
																const url =
																	media?.sizes
																		?.full
																		?.url ||
																	media?.url ||
																	'';
																const full_url =
																	media?.sizes
																		?.full
																		?.url ||
																	media?.url ||
																	'';
																const thumb_url =
																	media?.sizes
																		?.thumbnail
																		?.url ||
																	media?.url ||
																	'';
																const alt =
																	media?.alt ||
																	'';

																const image = {
																	...slider[
																		index
																	].image2,
																	id: id,
																	url: url,
																	full_url:
																		full_url,
																	thumb_url:
																		thumb_url,
																	alt: alt,
																};

																onChangeSliderItem(
																	index,
																	image,
																	'image2'
																);
															} }
															allowedTypes={
																ALLOWED_MEDIA_TYPES
															}
															value={
																slider[ index ]
																	.image2.id
															}
															render={ ( {
																open,
															} ) => (
																<div className="components-base-control">
																	<label className="components-base-control__label-media-button">
																		Выбрать
																		изображение
																	</label>
																	{ slider[
																		index
																	]?.image2
																		?.url && (
																		<>
																			<div className="components-base-control__media-preview">
																				<img
																					src={
																						slider[
																							index
																						]
																							.image2
																							.url
																					}
																					alt={
																						slider[
																							index
																						]
																							.image2
																							.alt
																					}
																				/>
																			</div>
																		</>
																	) }

																	<div className="components-base-control__media-buttons">
																		<Button
																			variant={
																				slider[
																					index
																				]
																					?.image2
																					?.id
																					? 'secondary'
																					: 'primary'
																			}
																			onClick={
																				open
																			}
																		>
																			{ slider[
																				index
																			]
																				?.image2
																				?.id
																				? 'Изменить'
																				: 'Выбрать' }{ ' ' }
																			изображение
																		</Button>

																		{ slider[
																			index
																		]
																			?.image2
																			?.url && (
																			<Button
																				className="is-secondary is-destructive"
																				onClick={ () => {
																					const image =
																						{
																							...slider[
																								index
																							]
																								.image2,
																							id: 0,
																							url: '',
																							full_url:
																								'',
																							thumb_url:
																								'',
																							alt: '',
																						};

																					onChangeSliderItem(
																						index,
																						image,
																						'image2'
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

													<hr />

													<ToggleControl
														__nextHasNoMarginBottom={
															true
														}
														checked={
															slider[
																index
															]
																?.image2
																?.is_preview
														}
														label="Использовать второе фото, как превью"
														onChange={ (value) => {
															const image_01 =
																{
																	...slider[index].image1,
																	is_preview: !value,
																};

															const image_02 =
																{
																	...slider[index].image2,
																	is_preview: value,
																};

															onChangeSliderItem(
																index,
																image_01,
																'image1'
															);
															onChangeSliderItem(
																index,
																image_02,
																'image2'
															);
														} }
													/>
												</details>
											) }
										</Draggable>
									) ) }

									{ provided.placeholder }

									<hr />
									<Button
										variant="primary"
										onClick={ onClickAddSliderItem }
									>
										Добавить
									</Button>
								</div>
							) }
						</Droppable>
					</DragDropContext>
				</PanelBody>
			</InspectorControls>

			<section { ...useBlockProps( { className: 'sd-compromises' } ) }>
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

					{ slider && slider.length > 0 && (
						<div className="sd-compromises__slider">
							<div
								thumbsSlider=""
								className="swiper swiper-compromises-small"
							>
								<div className="swiper-wrapper">
									{ slider.map( ( item, index ) => {
										let src = '';
										let alt = '';

										if ( item.image2.is_preview ) {
											src = item?.image2?.thumb_url;
											alt = item?.image2?.alt;
										} else {
											src = item?.image1?.thumb_url;
											alt = item?.image1?.alt;
										}

										if ( ! src ) {
											return null;
										}

										return (
											<div
												key={ index }
												className="swiper-slide"
											>
												<img
													src={ src }
													alt={
														alt
															? `Превью ${ alt }`
															: ''
													}
													loading="lazy"
												/>
											</div>
										);
									} ) }
								</div>
							</div>

							<div className="sd-compromises__slider-buttons">
								<div className="swiper-button-prev swiper-compromises-prev"></div>
								<div className="swiper-counter-compromises"></div>
								<div className="swiper-button-next swiper-compromises-next"></div>
							</div>

							<div className="swiper swiper-compromises">
								<div className="swiper-wrapper">
									{ slider.map( ( item, index ) => (
										<div
											key={ index }
											className="swiper-slide"
										>
											{ item.description && (
												<RichText
													tagName="h3"
													value={ item.description }
													onChange={ ( value ) =>
														onChangeSliderItem(
															index,
															value,
															'description'
														)
													}
												/>
											) }

											{ ( item.image1.id ||
												item.image2.id ) && (
												<div className="sd-compromises__slide-box">
													{ item.image1.id && (
														<a
															href={
																item.image1
																	.full_url
															}
															className="glightbox"
														>
															<img
																src={
																	item.image1
																		.url
																}
																alt={
																	item.image1
																		.alt
																}
																loading="lazy"
															/>
														</a>
													) }
													{ item.image2.id && (
														<a
															href={
																item.image2
																	.full_url
															}
															className="glightbox"
														>
															<img
																src={
																	item.image2
																		.url
																}
																alt={
																	item.image2
																		.alt
																}
																loading="lazy"
															/>
														</a>
													) }
												</div>
											) }
										</div>
									) ) }
								</div>
								<div className="swiper-pagination swiper-pagination_quick-card"></div>
							</div>

							<div className="swiper-pagination-compromises"></div>
						</div>
					) }
				</div>
			</section>
		</>
	);
}
