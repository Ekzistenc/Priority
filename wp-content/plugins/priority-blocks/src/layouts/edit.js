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
	Button,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { SNDModalButton, SNDRichTextModalButton } from '../snd-components/SNDModalButton';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { title, subtitle, description, table, aftertext, image, textButton } =
		attributes;
	const ALLOWED_MEDIA_TYPES = ['image'];

	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
	};

	const flats = useSelect((select) => {
		const { getEntityRecords } = select('core');
		const flats = getEntityRecords('postType', 'flats', {
			per_page: table?.count_el || 4,
			status: 'publish',
			_embed: true,
		});

		return flats
			? flats.map((flat) => ({
				title: flat.title.rendered,
				description: flat.content.raw,
				image: {
					thumb_url:
						flat?._embedded['wp:featuredmedia'][0]
							?.media_details?.sizes?.medium?.source_url ||
						flat?._embedded['wp:featuredmedia'][0]
							?.source_url ||
						'',
					full_url:
						flat?._embedded['wp:featuredmedia'][0]
							?.media_details?.sizes['1536x1536']
							?.source_url ||
						flat?._embedded['wp:featuredmedia'][0]
							?.source_url ||
						'',
				},
			}))
			: [];
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<TextControl
						label="Заголовок"
						value={title}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						onChange={(value) => onChangeText('title', value)}
					/>

					<TextControl
						label="Подзаголовок"
						value={subtitle}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						onChange={(value) =>
							onChangeText('subtitle', value)
						}
					/>

					<TextareaControl
						label="Описание"
						value={description}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('description', value)
						}
					/>

					<TextControl
						type="number"
						min="1"
						label="Количество квартир"
						value={table.count_el}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						onChange={(value) => {
							setAttributes({
								table: {
									...table,
									count_el: value,
								},
							});
						}}
					/>

					<hr />

					<TextControl
						label="Текст кнопки Подробнее"
						value={textButton}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						onChange={(value) => {
							setAttributes({
								textButton: value
							});
						}}
					/>

					<TextControl
						label="Текст кнопки внизу"
						value={table.button_text}
						__nextHasNoMarginBottom
						__next40pxDefaultSize
						onChange={(value) => {
							setAttributes({
								table: {
									...table,
									button_text: value,
								},
							});
						}}
					/>
					<TextareaControl
						label="Описание после таблицы"
						value={aftertext}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('aftertext', value)
						}
					/>

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
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ className: 'sd-layouts' })}>
				<div className="container">
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
							className="fade-in-right-05 wow"
							value={subtitle}
							onChange={(value) =>
								onChangeText('subtitle', value)
							}
						/>
					)}

					{description && (
						<RichText
							tagName="p"
							className="sd-layouts__text"
							value={description}
							onChange={(value) =>
								onChangeText('description', value)
							}
						/>
					)}

					{flats && flats.length > 0 && (
						<div className="sd-layouts__table">
							<div className="sd-layouts__grid">
								{flats.map((flat, index) => (
									<div
										key={index}
										className="sd-layouts__grid-item"
									>
										{flat.image.full_url && (
											<a
												href={flat.image.full_url}
												className="glightbox2"
											>
												<img
													src={flat.image.thumb_url}
													alt=""
												/>
											</a>
										)}

										{flat.title && (
											<h4>{flat.title}</h4>
										)}

										{flat.description && (
											<p className="sd-layouts__grid-item-content">
												{flat.description}
											</p>
										)}

										{textButton && (
											<a className="sd-modal-link-l">
												{textButton}
											</a>
										)}
									</div>
								))}
							</div>

							{table?.button_text && (
								<RichText
									tagName="button"
									className="sd-layouts__more-button"
									data-count={
										table?.count_el ? table.count_el : 4
									}
									value={table.button_text}
									onChange={(value) => {
										setAttributes({
											table: {
												...table,
												button_text: value,
											},
										});
									}}
								/>
							)}
						</div>
					)}

					{aftertext && (
						<RichText
							tagName="p"
							className="sd-layouts__text"
							value={aftertext}
							onChange={(value) =>
								onChangeText('aftertext', value)
							}
						/>
					)}
				</div>

				{image.url && (
					<img
						src={image.url}
						alt={image.alt}
						loading="lazy"
						className="sd-layouts__img"
					/>
				)}
			</section>
		</>
	);
}
