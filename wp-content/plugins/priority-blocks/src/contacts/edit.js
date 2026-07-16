import {
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
	Button
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import iconBaloon from './baloon.png';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		title_phone,
		number_phone,
		number_phone_href,
		title_address,
		desc_address,
		title_socs,
		socs,
		button,
		map
	} = attributes;

	// Формирование URL для карты
	const [lat, long] = map.coordinates_xy.split(',').map(coord => coord.trim());
	const mapUrl = `https://yandex.ru/map-widget/v1/?ll=${long}%2C${lat}&mode=whatshere&whatshere[point]=${long}%2C${lat}&whatshere[zoom]=${map.zoom}&z=${map.zoom}`;

	const ALLOWED_MEDIA_TYPES = ['image'];

	const [linkError, setLinkError] = useState(false);

	const isValidUrl = (url) => {
		try {
			new URL(url);
			return true;
		} catch (_) {
			return false;
		}
	};

	const onChangeButtonProp = (field, value) => {
		setAttributes({
			button: {
				...button,
				[field]: value,
			},
		});
	};

	const onChangeMapProp = (field, value) => {
		setAttributes({
			map: {
				...map,
				[field]: value,
			},
		});
	};

	const onChangeSocsItem = (index, value, field) => {
		const updatedSocs = [...socs];
		updatedSocs[index][field] = value;
		setAttributes({ socs: updatedSocs });
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
		const updatedSocs = [...socs, newItem];
		setAttributes({ socs: updatedSocs });
	};

	const onDragEnd = (result) => {
		if (!result.destination) return;

		const newSocs = Array.from(socs);
		const [movedItem] = newSocs.splice(result.source.index, 1);
		newSocs.splice(result.destination.index, 0, movedItem);

		setAttributes({ socs: newSocs });
	};

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока" initialOpen={false}>
					<TextControl
						label="Заголовок"
						value={title}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('title', value)
						}
					/>
					<hr />

					<TextControl
						label="Заголовок телефон"
						value={title_phone}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('title_phone', value)
						}
					/>
					<TextControl
						label="Телефон"
						type="tel"
						value={number_phone}
						__nextHasNoMarginBottom={true}
						onChange={(value) => {
							onChangeText('number_phone', value);
							onChangeText(
								'number_phone_href',
								value.replace(/[^0-9]/g, '')
							);
						}}
					/>

					<TextControl
						label="Телефон для ссылки"
						value={number_phone_href}
						__nextHasNoMarginBottom={true}
						onChange={(value) => {
							onChangeText(
								'number_phone_href',
								value.replace(/[^0-9]/g, '')
							);
						}}
					/>

					<hr />
					<TextControl
						label="Заголовок адрес"
						value={title_address}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('title_address', value)
						}
					/>
					<TextControl
						label="Адрес"
						value={desc_address}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('desc_address', value)
						}
					/>

					<hr />

					<TextControl
						label="Соцсети Заголовок"
						value={title_socs}
						__nextHasNoMarginBottom={true}
						onChange={(value) => {
							onChangeText('title_socs', value);
						}}
					/>

					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="socs-list-droppable">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="components-list-control components-list-control--mix"
								>
									<label className="components-list-control__label">
										Соцсети список
									</label>

									{socs?.map((item, index) => (
										<Draggable
											key={index}
											draggableId={`soc-${index}`}
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
														<span>{item?.name ? item?.name : `Ссылка ${index + 1}`}</span>

														<Button
															className="is-secondary is-destructive is-small"
															title="Удалить ссылку"
															onClick={() => {
																const updatedSocs = [...socs];
																updatedSocs.splice(index, 1);
																setAttributes({ socs: updatedSocs, });
															}}
														></Button>
													</summary>

													<TextControl
														label="Имя"
														value={item.name}
														onChange={(value) => onChangeSocsItem(index, value, 'name')}
														__nextHasNoMarginBottom={true}
													/>

													<hr />

													<TextControl
														label="Ссылка"
														type="url"
														value={item.link}
														onChange={(value) => onChangeSocsItem(index, value, 'link')}
														__nextHasNoMarginBottom={true}
													/>

													<hr />

													<MediaUploadCheck>
														<MediaUpload
															onSelect={(media) => {
																const id = media?.id || 0;
																const thumb_url = media?.sizes?.thumbnail?.url || media?.url || '';

																const image = {
																	id: id,
																	url: thumb_url,
																};

																onChangeSocsItem(index, image, 'icon');
															}}
															allowedTypes={ALLOWED_MEDIA_TYPES}
															value={socs[index].icon.id}
															render={({ open }) => (
																<div className="components-base-control">
																	<label className="components-base-control__label-media-button">
																		Выбрать иконку
																	</label>
																	{socs[index]?.icon?.url && (
																		<>
																			<div className="components-base-control__media-preview">
																				<img
																					src={socs[index].icon.url}
																					alt=""
																				/>
																			</div>
																		</>
																	)}

																	<div className="components-base-control__media-buttons">
																		<Button
																			variant={socs[index]?.icon?.id ? 'secondary' : 'primary'}
																			onClick={open}
																		>
																			{socs[index]?.icon?.id ? 'Изменить' : 'Выбрать'}{' '}
																			иконку
																		</Button>

																		{socs[index]?.icon?.url && (
																			<Button
																				className="is-secondary is-destructive"
																				onClick={() => {
																					const image = {
																						...socs[index].icon,
																						id: 0,
																						url: '',
																					};

																					onChangeSocsItem(index, image, 'icon');
																				}}
																			>x</Button>
																		)}
																	</div>
																</div>
															)}
														/>
													</MediaUploadCheck>
												</details>
											)}
										</Draggable>
									))}

									{provided.placeholder}

									<hr />
									<Button
										variant="primary"
										onClick={onClickAddSocsItem}
									>
										Добавить
									</Button>
								</div>
							)}
						</Droppable>
					</DragDropContext>
					<hr />

					<div className="components-base-control">
						<label className="components-base-control__label">
							Кнопка
						</label>

						<ToggleControl
							__nextHasNoMarginBottom={true}
							checked={button.show}
							label="Показывать кнопку"
							onChange={() =>
								onChangeButtonProp('show', !button.show)
							}
						/>

						<ToggleControl
							__nextHasNoMarginBottom={true}
							checked={button.modal}
							label="Модальное окно"
							onChange={() =>
								onChangeButtonProp('modal', !button.modal)
							}
						/>

						<TextControl
							value={button.text}
							label="Текст кнопки"
							__nextHasNoMarginBottom={true}
							onChange={(value) =>
								onChangeButtonProp('text', value)
							}
						/>

						{!button.modal && (
							<>
								<TextControl
									value={button.link}
									label="URL кнопки"
									__nextHasNoMarginBottom={true}
									onChange={(value) => {
										onChangeButtonProp('link', value);
										setLinkError(
											value && !isValidUrl(value)
										);
									}}
								/>

								{linkError && (
									<Notice
										status="error"
										isDismissible={false}
									>
										Введите корректный URL, например:
										https://example.com
									</Notice>
								)}

								<ToggleControl
									__nextHasNoMarginBottom={true}
									checked={button.target}
									label="Открывать в новой вкладке"
									onChange={() =>
										onChangeButtonProp(
											'target',
											!button.target
										)
									}
								/>
							</>
						)}
					</div>
				</PanelBody>

				<PanelBody title="Настройки карты" initialOpen={false}>
					<TextControl
						label="Координаты (широта, долгота)"
						value={map.coordinates_xy}
						onChange={(value) => onChangeMapProp("coordinates_xy", value)} // Убрать "="
						help="Формат: 00.000000, 00.000000"
					/>

					<TextControl
						label="Уровень масштабирования"
						value={map.zoom}
						type="number"
						min="1"
						onChange={(value) => onChangeMapProp("zoom", value)}
					/>

					<TextControl
						label="Адрес"
						value={map.address}
						onChange={(value) => onChangeMapProp("address", value)}
					/>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ className: 'sd-contacts' })}>
				<div className="container">
					<div className="sd-contacts__text">

						<RichText
							tagName="h2"
							value={title}
							placeholder="Введите заголовок"
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>

						<RichText
							tagName="p"
							className="sd-contacts__discription"
							placeholder="Введите заголовок телефона"
							value={title_phone}
							onChange={(value) =>
								onChangeText('title_phone', value)
							}
						/>

						<RichText
							tagName="a"
							className="sd-contacts__tel"
							href={`tel:+${number_phone_href}`}
							placeholder="Введите отображаемый телефон"
							value={number_phone}
							onChange={(value) =>
								onChangeText('number_phone', value)
							}
						/>

						<RichText
							tagName="p"
							className="sd-contacts__discription"
							placeholder="Введите заголовок адреса"
							value={title_address}
							onChange={(value) =>
								onChangeText('title_address', value)
							}
						/>

						<RichText
							tagName="p"
							className="sd-contacts__tel"
							placeholder="Введите адрес"
							value={desc_address}
							onChange={(value) =>
								onChangeText('desc_address', value)
							}
						/>

						{socs && socs.length > 0 && (
							<>
								<RichText
									tagName="p"
									className="sd-contacts__discription"
									placeholder="Введите заголовок соцсетей"
									value={title_socs}
									onChange={(value) =>
										onChangeText('title_socs', value)
									}
								/>

								<div className="sd-footer__socials">
									{socs.map((item, index) => {
										return (
											<a
												key={index}
												href={item.link}
												title={item.name}
											>
												<img
													src={item.icon.url}
													alt={item.name}
												/>
											</a>
										);
									})}
								</div>
							</>
						)}

						{button.show && (
							<RichText
								tagName="a"
								value={button.text}
								placeholder="Введите текст кнопки"
								onChange={(value) =>
									onChangeButtonProp('text', value)
								}
								className={
									button.modal
										? 'sd-modal-link'
										: 'sd-button-link'
								}
								href={
									!button.modal && button.link
										? button.link
										: '#'
								}
								target={
									!button.modal && button.target
										? '_blank'
										: '_self'
								}
							/>
						)}
					</div>

					<div
						id="ymap"
						className="sd-contacts__map"
						data-coordinates={map.coordinates_xy}
						data-zoom={map.zoom}
						data-address={map.address}
						data-icon={iconBaloon}
					>
						<iframe src={mapUrl} width="560" height="400" frameborder="1" allowfullscreen="true" style={{pointerEvents: "none", width: "100%", height: "100%", opacity: "0.8"}}></iframe>
					</div>
				</div>
			</section>
		</>
	);
}
