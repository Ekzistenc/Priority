import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	RichText,
	InnerBlocks,
	useBlockProps,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	Button
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import SNDMediaUpload from '../snd-components/SNDMediaUpload';
import './editor.scss';
import './style.scss';
import metadata from './block.json';

registerBlockType(metadata.name, {

	edit: ({ attributes, setAttributes }) => {
		const { title_01, title_02, image, map, showMap } = attributes;
		const mapImage = require('./mapImage.svg').default;
		const ALLOWED_MEDIA_TYPES = ['image'];
		const onChangeText = (field, value) => {
			setAttributes({ [field]: value });
		};

		const onClickAddMapItem = () => {
			const newItem = {
				coordinates_xy: '',
				address: '',
				icon: {
					id: 0,
					url: '',
					alt: '',
					size: 'full',
					sizes: {}
				}
			};

			setAttributes({ map: [...map, newItem] });
		};

		const onRemoveItem = (index) => {
			const newMap = map.filter((_, i) => i !== index);
			setAttributes({ map: newMap });
		};

		const onDragEnd = (result) => {
			if (!result.destination) return;

			const newMap = [...map];
			const [movedItem] = newMap.splice(result.source.index, 1);
			newMap.splice(result.destination.index, 0, movedItem);

			setAttributes({ map: newMap });
		};

		const updateMapItem = (index, field, value) => {
			const updatedMap = [...map];

			updatedMap[index] = {
				...updatedMap[index],
				[field]: value,
			};

			setAttributes({
				map: updatedMap,
			});
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки секции">
						<TextControl
							label="Заголовок 1 строка"
							value={title_01}
							__nextHasNoMarginBottom={true}
							onChange={(value) =>
								onChangeText('title_01', value)
							}
						/>

						<TextControl
							label="Заголовок 2 строка"
							value={title_02}
							__nextHasNoMarginBottom={true}
							onChange={(value) =>
								onChangeText('title_02', value)
							}
						/>
					</PanelBody>
					<PanelBody title="Настройки карты">
						<ToggleControl
							label="Отображать карту"
							checked={showMap}
							onChange={(value) => setAttributes({ showMap: value })}
						/>
						{showMap ? (
							<>
								<DragDropContext onDragEnd={onDragEnd}>
									<Droppable droppableId="map-list-droppable">
										{(provided) => (
											<div
												{...provided.droppableProps}
												ref={provided.innerRef}
												className="components-list-control components-list-control--mix"
											>
												<label className="components-list-control__label">
													Карта
												</label>

												{map?.map((item, index) => (
													<Draggable
														key={`map-${index}`}
														draggableId={`map-${index}`}
														index={index}
													>
														{(provided) => (
															<details
																className="components-list-control__item"
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
															>
																<summary>
																	<div className="dragabble-element"></div>
																	<span>Элемент карты" {index + 1}</span>

																	<Button
																		__next40pxDefaultSize
																		__nextHasNoMarginBottom={true}
																		className="is-secondary is-destructive is-small"
																		title="Удалить элемент"
																		onClick={(e) => {
																			e.stopPropagation(); // чтобы не срабатывал toggle
																			onRemoveItem(index);
																		}}
																	></Button>
																</summary>


																<SNDMediaUpload
																	onSelect={(media) => {
																		const size = item.icon?.size || 'full';
																		const url = media?.sizes?.[size]?.url || media?.url || '';
																		const updatedMap = JSON.parse(JSON.stringify(map));

																		updatedMap[index].icon = {
																			id: media?.id || 0,
																			url: url,
																			alt: media?.alt || '',
																			size: size,
																			sizes: media?.sizes || {},
																			type: 'image',
																		};

																		setAttributes({ map: updatedMap });
																	}}
																	allowedTypes={['image']}
																	value={item?.icon?.id || 0}
																	media={item?.icon}
																	onChangeMedia={(newImage) => {
																		const updatedMap = JSON.parse(JSON.stringify(map));
																		updatedMap[index].icon = newImage;
																		setAttributes({ map: updatedMap });
																	}}
																	label={`Выбрать иконку`}
																	labelButton={`${item.icon?.url ? 'Изменить' : 'Выбрать'} иконку`}
																/>
																<TextControl
																	label="Координаты (широта, долгота)"
																	__next40pxDefaultSize
																	__nextHasNoMarginBottom={true}
																	value={item.coordinates_xy}
																	onChange={(value) =>
																		updateMapItem(index, "coordinates_xy", value)
																	}
																	help="Формат: 00.000000, 00.000000"
																/>
																<TextControl
																	__next40pxDefaultSize
																	__nextHasNoMarginBottom={true}
																	label="Адрес"
																	value={item.address}
																	onChange={(value) =>
																		updateMapItem(index, "address", value)
																	}
																/>
															</details>
														)}
													</Draggable>
												))}

												{provided.placeholder}

												<hr />
												<Button
													__next40pxDefaultSize
													__nextHasNoMarginBottom={true}
													variant="primary"
													onClick={onClickAddMapItem}
												>
													Добавить элемент
												</Button>
											</div>
										)}
									</Droppable>
								</DragDropContext>
							</>
						) : (
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(media) => {
										const url =
											media?.sizes?.full?.url || media?.url || '';
										setAttributes({
											image: {
												id: media?.id || 0,
												url: url,
												alt: media?.alt || '',
											},
										});
									}}
									allowedTypes={ALLOWED_MEDIA_TYPES}
									value={image.id}
									render={({ open }) => (
										<div className="components-base-control">
											<label className="components-base-control__label-media-button">
												Выбрать изображение
											</label>
											{image.url && (
												<div className="components-base-control__media-preview">
													<img
														src={image.url}
														alt={image.alt}
													/>
												</div>
											)}

											<div className="components-base-control__media-buttons">
												<Button
													variant="primary"
													onClick={open}
												>
													Выбрать изображение
												</Button>

												{image.url && (
													<Button
														className="is-secondary is-destructive"
														onClick={() => {
															setAttributes({
																image: {
																	id: 0,
																	url: '',
																	alt: '',
																},
															});
														}}
													>
														x
													</Button>
												)}
											</div>
										</div>
									)}
								/>
							</MediaUploadCheck>
						)}
					</PanelBody>
				</InspectorControls>

				<section {...useBlockProps({ className: 'sd-map' })}>
					{(title_01 || title_02) && (
						<div className="container">
							<h2 className="fade-in-left wow">
								{title_01 && (
									<RichText
										tagName="span"
										value={title_01}
										onChange={(value) =>
											onChangeText('title_01', value)
										}
									/>
								)}

								{title_02 && (
									<RichText
										tagName="span"
										value={title_02}
										className="fade-in-right-05 wow"
										onChange={(value) =>
											onChangeText('title_02', value)
										}
									/>
								)}
							</h2>
						</div>
					)}

					<div className="sd-map__wrapper">
						<div className="container">
							{showMap ? (
								map && map.length > 0 && (
									<div className="sd-contacts__map-wrapper">
										<div id="ymaptop" className="sd-contacts__map">
											<img
												src={mapImage}
												alt=""
												loading="lazy"
											/>
										</div>

										{map.map((item, index) => (
											<div
												key={index}
												className="map-point"
												data-coordinates={item.coordinates_xy}
												data-address={item.address}
												data-icon={item.icon.url}
											/>
										))}
									</div>
								)
							) : (
								image.url && (
									<img
										src={image.url}
										alt={image.alt}
										loading="lazy"
									/>
								)
							)}

							<div className="sd-map__text">
								<InnerBlocks
									allowedBlocks={[
										'core/paragraph',
										'core/heading',
									]}
									template={[
										[
											'core/heading',
											{
												content:
													'В шаговой доступности — детские сады, школы, торговые центры.',
												level: 3,
											},
										],
										[
											'core/paragraph',
											{
												content:
													'Путь до ключевых точек деловой активности города займёт не больше 10-15 минут.',
											},
										],
										[
											'core/paragraph',
											{
												content:
													'А вечером можно не только разнообразно провести досуг в закрытом многофункциональном дворе, но и прогуляться по пешеходной тропе к Всехсвятской церкви. И до залива Курчатова — не более 10 минут на авто.',
											},
										],
									]}
								/>
							</div>
						</div>
					</div>
				</section>
			</>

		);
	},

	save: () => {
		return <InnerBlocks.Content />;
	},
});
