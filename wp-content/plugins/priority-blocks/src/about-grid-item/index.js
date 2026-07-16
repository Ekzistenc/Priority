import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

import SNDMediaUpload from '../snd-components/SNDMediaUpload';

import metadata from './block.json';

registerBlockType(metadata.name, {
	edit: ({ attributes, setAttributes }) => {
		const { title, description, image, link } = attributes;

		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки проекта">
						<TextControl
							label="Ссылка"
							type="url"
							value={ link.url || 'https://гк-вместе.рф/#projects' }
							onChange={(value) =>
								setAttributes({
									link: {
										...link,
										url: value,
									},
								})
							}
							__nextHasNoMarginBottom
							__next40pxDefaultSize
						/>

						<ToggleControl
							__nextHasNoMarginBottom
							checked={link.target}
							label="Открывать в новой вкладке"
							onChange={(value) =>
								setAttributes({
									link: {
										...link,
										target: value,
									},
								})
							}
						/>

						<SNDMediaUpload
							onSelect={(media) => {
								const size = image?.size || 'large';
								const url = media?.sizes?.[size]?.url || media?.url || '';

								const newImage = {
									id: media?.id || 0,
									url: url,
									alt: media?.alt || '',
									size: size,
									sizes: media?.sizes || {},
									type: 'image',
								};

								setAttributes({ image: newImage });
							}}
							allowedTypes={['image',]}
							value={ image?.id || 0}
							media={image}
							onChangeMedia={(newImage) => {
								setAttributes({image: newImage});
							}}
							label={'Выбрать изображение'}
							labelButton={`${image?.url ? 'Изменить' : 'Выбрать'} изображение`}
						/>

						<TextControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Заголовок"
							value={title || ''}
							onChange={(value) => setAttributes({title: value})}
						/>

						<TextareaControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label="Описание"
							value={description ||''}
							onChange={(value) => setAttributes({description: value})}
						/>
					</PanelBody>
				</InspectorControls>

				<div
					{...useBlockProps({
						style: {
							backgroundImage: `url(${image.url})`,
						}
					})}
				>
					<RichText
						tagName="h4"
						value={title || ''}
						onChange={(value) => setAttributes({title: value})}
						allowedFormats={[]}
					/>
					<RichText
						tagName="span"
						value={description || ''}
						onChange={(value) => setAttributes({description: value})}
						allowedFormats={['core/bold', 'core/italic']}
					/>
				</div>
			</>
		);
	},

	save: () => {
		return null;
	},
});