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
	TextareaControl,
	Button,
} from '@wordpress/components';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import SNDMediaUpload from '../snd-components/SNDMediaUpload';
import { useRef, useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, youList, image_url, image_alt, image_id, video } = attributes;
	const ALLOWED_MEDIA_TYPES = ['image'];

	const onChangeTitle = (title) => {
		setAttributes({ title });
	};

	const onChangeYouListItem = (index, value) => {
		const updatedList = [...youList];
		updatedList[index] = value;
		setAttributes({ youList: updatedList });
	};

	const onClickAddYouListItem = () => {
		const newItem = '';
		const updatedList = [...youList, newItem];
		setAttributes({ youList: updatedList });
	};

	const onDragEnd = (result) => {
		if (!result.destination) return;

		const newList = Array.from(youList);
		const [movedItem] = newList.splice(result.source.index, 1);
		newList.splice(result.destination.index, 0, movedItem);

		setAttributes({ youList: newList });
	};

	const onRemoveItem = (index) => {
		const newList = youList.filter((_, i) => i !== index);
		setAttributes({ youList: newList });
	};

	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.load();
		}
	}, [video.url]);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки секции YOU">
					<TextareaControl
						label="Заголовок"
						value={title}
						onChange={onChangeTitle}
						__nextHasNoMarginBottom={true}
					/>
					<hr />
					<SNDMediaUpload
						onSelect={(media) => {
							const updateVideo = JSON.parse(JSON.stringify(video));

							setAttributes({
								video: {
									...updateVideo,
									id: media?.id || 0,
									url: media?.url || '',
									type: media?.mime || 'video/mp4',
								},
							});
						}}
						allowedTypes={['video']}
						value={video?.id || 0}
						media={video}
						onChangeMedia={(newVideo) => {
							const updateVideo = JSON.parse(JSON.stringify(video));

							setAttributes({
								video: {
									...updateVideo,
									id: newVideo?.id || 0,
									url: newVideo?.url || '',
									type: newVideo?.type || 'video/mp4',
								}
							});
						}}
						label='Выбрать видео'
						labelButton={`${video?.url ? 'Изменить' : 'Выбрать'} видео`}
					/>

					<SNDMediaUpload
						onSelect={(media) => {
							const size = 'large';
							const url = media?.sizes?.[size]?.url || media?.url || '';
							const updateVideo = JSON.parse(JSON.stringify(video));

							setAttributes({
								video: {
									...updateVideo,
									poster: {
										id: media?.id || 0,
										url: url,
										type: 'image',
									}
								},
							});
						}}
						allowedTypes={['image']}
						value={video?.poster?.id || null}
						media={video?.poster || {}}
						onChangeMedia={(newPoster) => {
							const updateVideo = JSON.parse(JSON.stringify(video));
							setAttributes({
								video: {
									...updateVideo,
									poster: newPoster
								}
							});
						}}
						label='Выбрать постер'
						labelButton={`${video?.poster?.url ? 'Изменить' : 'Выбрать'} постер`}
					/>
					<hr />

					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => {
								const url =
									media?.sizes?.full?.url || media?.url || '';
								setAttributes({
									image_url: url,
									image_alt: media?.alt || '',
									image_id: media?.id || 0,
								});
							}}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							value={image_id}
							render={({ open }) => (
								<div className="components-base-control">
									<label className="components-base-control__label-media-button">
										Выбрать изображение
									</label>
									{image_url && (
										<div className="components-base-control__media-preview">
											<img
												src={image_url}
												alt={image_alt}
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

										{image_url && (
											<Button
												className="is-secondary is-destructive"
												onClick={() => {
													setAttributes({
														image_url: '',
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

					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="you-list-droppable">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="components-list-control components-list-control--mix"
								>
									<label className="components-list-control__label">
										Список
									</label>

									{youList?.map((item, index) => (
										<Draggable
											key={index}
											draggableId={`you-${index}`}
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

													<TextareaControl
														value={item}
														onChange={(item) => onChangeYouListItem(index,item)}
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
										onClick={onClickAddYouListItem}
									>
										Добавить пункт
									</Button>
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ className: 'sd-you' })}>
				<div className="container">
					{title && (
						<RichText
							tagName="h2"
							value={title}
							onChange={onChangeTitle}
						/>
					)}
					<div className="sd-you__wrapper">
						{video?.url && (
							<a
								class="glightbox5"
								href={video.url}
							>
								<img src={video?.poster?.url} loading="lazy" />
							</a>
						)}
						<ul className="sd-you__ul">
							{youList && youList.length > 0 && (
								<>
									{youList?.map((item, index) => {
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
													onChangeYouListItem(
														index,
														item
													)
												}
											/>
										);
									})}
								</>
							)}
							<li>
								<Button
									className="is-priority-button"
									onClick={onClickAddYouListItem}
								>
									Добавить
								</Button>
							</li>
						</ul>
					</div>
				</div>

				{image_url && (
					<img src={image_url} alt={image_alt} loading="lazy" />
				)}
			</section>
		</>
	);
}
