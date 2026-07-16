import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	useBlockProps,
	RichText
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
} from '@wordpress/components';

import SNDMediaUpload from '../snd-components/SNDMediaUpload';
import { SNDModalButton, SNDRichTextModalButton } from '../snd-components/SNDModalButton';

import metadata from './block.json';

registerBlockType(metadata.name, {

	edit: ({ attributes, setAttributes }) => {
		const { title_01, title_02, subtitle, button, image, imageLogo } = attributes;
		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки блока">
						<SNDMediaUpload
							onSelect={(media) => {
								const size = imageLogo?.size || 'full';
								const url = media?.sizes?.[size]?.url || media?.url || '';

								setAttributes({
									imageLogo: {
										id: media?.id || 0,
										url: url,
										alt: media?.alt || '',
										size: size,
										sizes: media?.sizes || {},
										type: 'image',
									},
								});
							}}
							allowedTypes={['image']}
							value={imageLogo.id}
							media={imageLogo}
							onChangeMedia={(newImage) => {
								setAttributes({
									imageLogo: newImage
								});
							}}
							label='Выбрать логотип'
							labelButton={`${imageLogo?.url ? 'Изменить' : 'Выбрать'} логотип`}
						/>
						<TextControl
							label="Заголовок 1 строка"
							value={title_01}
							onChange={(value) =>
								setAttributes({ title_01: value })
							}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
						/>
						<TextControl
							label="Заголовок 2 строка"
							value={title_02}
							onChange={(value) =>
								setAttributes({title_02: value})
							}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
						/>
						<TextControl
							label="Подзаголовок"
							value={subtitle}
							onChange={(value) => setAttributes({ subtitle: value })}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
						/>
						<hr />

						<SNDMediaUpload
							onSelect={(media) => {
								const size = image?.size || 'full';
								const url = media?.sizes?.[size]?.url || media?.url || '';

								setAttributes({
									image: {
										id: media?.id || 0,
										url: url,
										alt: media?.alt || '',
										size: size,
										sizes: media?.sizes || {},
										type: 'image',
									},
								});
							}}
							allowedTypes={['image']}
							value={image.id}
							media={image}
							onChangeMedia={(newImage) => {
								setAttributes({
									image: newImage
								});
							}}
							label='Выбрать изображение'
							labelButton={`${image?.url ? 'Изменить' : 'Выбрать'} изображение`}
						/>

						<TextControl
							label="Текст кнопки"
							value={button?.name}
							onChange={(value) =>
								setAttributes({
									button: {
										...button,
										name: value
									}
								})
							}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
						/>
						<TextControl
							label="URL кнопки"
							type="url"
							value={button?.href}
							onChange={(value) =>
								setAttributes({
									button: {
										...button,
										href: value
									}
								})
							}
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
						/>
					</PanelBody>
				</InspectorControls>

				<div {...useBlockProps({ className: 'swiper-slide' })}>
					<div className="sd-main" style={{ backgroundImage: `url(${image?.url})` }}>
						<div className="container">
							{imageLogo?.url && (
								<img src={imageLogo.url} alt="" />
							)}
							{(title_01 || title_02) && (
								<h1>
									{title_01 && (
										<RichText
											tagName="span"
											className="fade-in-left wow"
											value={title_01}
											allowedFormats={[]}
											placeholder="Введите заголовок 1 строка..."
											onChange={(value) =>
												setAttributes({ title_01: value })
											}
										/>
									)}
									{title_02 && (
										<RichText
											tagName="span"
											className="fade-in-right-1 wow"
											value={title_02}
											allowedFormats={[]}
											placeholder="Введите заголовок 2 строка..."
											onChange={(value) =>
												setAttributes({ title_02: value })
											}
										/>
									)}
									{subtitle && (
										<RichText
											tagName="h2"
											value={subtitle}
											allowedFormats={[]}
											onChange={(value) => setAttributes({ subtitle: value })}
											placeholder="Введите подзаголовок..."
										/>
									)}

								</h1>
							)}
							<a className="sd-main-link" href={button?.href} target="_blank">{button?.name}</a>

						</div>
					</div>
				</div>
			</>

		);
	},

	save: () => {
		return null;
	},
});
