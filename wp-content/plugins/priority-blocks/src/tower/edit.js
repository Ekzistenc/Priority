import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	ToggleControl,
	Notice,
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, list, button } = attributes;

	const isValidUrl = (url) => {
		try {
			new URL(url);
			return true;
		} catch (_) {
			return false;
		}
	};

	const [linkError, setLinkError] = useState(false);

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const onChangeButtonProp = (field, value) => {
		setAttributes({
			button: {
				...button,
				[field]: value,
			},
		});
	};

	const onChangeListItem = (index, value) => {
		const updatedList = [...list];
		updatedList[index] = value;
		setAttributes({ list: updatedList });
	};

	const onClickAddListItem = () => {
		const newItem = '';
		const updatedList = [...list, newItem];
		setAttributes({ list: updatedList });
	};

	const onDragEnd = (result) => {
		if (!result.destination) return;

		const newList = Array.from(list);
		const [movedItem] = newList.splice(result.source.index, 1);
		newList.splice(result.destination.index, 0, movedItem);

		setAttributes({ list: newList });
	};

	const onRemoveItem = (index) => {
		const newList = list.filter((_, i) => i !== index);
		setAttributes({ list: newList });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<TextControl
						label="Заголовок"
						value={title}
						__nextHasNoMarginBottom={true}
						onChange={(value) => onChangeText('title', value)}
					/>
					<TextControl
						label="Подзаголовок"
						value={subtitle}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('subtitle', value)
						}
					/>

					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="tower-list-droppable">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="components-list-control components-list-control--mix"
								>
									<label className="components-list-control__label">
										Список
									</label>

									{list?.map((item, index) => (
										<Draggable
											key={index}
											draggableId={`tower-list-${index}`}
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
														<span>Пункт {index + 1}</span>

														<Button
															__next40pxDefaultSize
															__nextHasNoMarginBottom={true}
															className="is-secondary is-destructive is-small"
															title="Удалить пункт"
															onClick={(e) => {
																e.stopPropagation(); // чтобы не срабатывал toggle
																onRemoveItem(index);
															}}
														></Button>
													</summary>
													<TextControl
														value={item}
														onChange={(item) => onChangeListItem(index, item)}
														__nextHasNoMarginBottom={true}
														__next40pxDefaultSize
													/>
												</details>
											)}
										</Draggable>
									))}

									{provided.placeholder}
									<hr />
									<Button
										variant="primary"
										onClick={onClickAddListItem}
									>
										Добавить пункт
									</Button>
								</div>
							)}
						</Droppable>
					</DragDropContext>

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
			</InspectorControls>

			<section {...useBlockProps({ className: 'sd-tower' })}>
				<div className="container">
					{button.show && (
						<RichText
							tagName="a"
							value={button.text}
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

					{title && (
						<RichText
							tagName="h2"
							value={title}
							onChange={(value) =>
								onChangeText('title', value)
							}
						/>
					)}

					{subtitle && (
						<RichText
							tagName="h3"
							value={subtitle}
							onChange={(value) =>
								onChangeText('subtitle', value)
							}
						/>
					)}

					<ul className="sd-you__ul">
						{list && list.length > 0 && (
							<>
								{list?.map((item, index) => {
									let fadeClassName = '';

									switch (index % 3) {
										case 0:
											fadeClassName = 'fade-in-right';
											break;
										case 1:
											fadeClassName = 'fade-in-right-05';
											break;
										case 2:
											fadeClassName = 'fade-in-right-1';
											break;
									}

									return (
										<RichText
											tagName="li"
											key={index}
											className={`${fadeClassName} wow`}
											value={item}
											onChange={(item) =>
												onChangeListItem(index, item)
											}
										/>
									);
								})}
							</>
						)}
						<li>
							<Button
								className="is-priority-button"
								onClick={onClickAddListItem}
							>
								Добавить
							</Button>
						</li>
					</ul>
				</div>
			</section>
		</>
	);
}
