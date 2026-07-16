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
import SNDMediaUpload from '../snd-components/SNDMediaUpload';
import { SNDModalButton, SNDRichTextModalButton } from '../snd-components/SNDModalButton';
import { useRef, useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const {
		title_01,
		title_02,
		title_03,
		image,
		description_01,
		description_02,
		video,
		button
	} = attributes;
	const ALLOWED_MEDIA_TYPES = ['image'];
	const onChangeText = (field, value) => {
		setAttributes({ [field]: value });
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
				<PanelBody title="Настройки блока">
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
					<TextControl
						label="Заголовок 3 строка"
						value={title_03}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('title_03', value)
						}
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
					<TextareaControl
						label="Описание 1"
						value={description_01}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('description_01', value)
						}
					/>
					<TextareaControl
						label="Описание 2"
						value={description_02}
						__nextHasNoMarginBottom={true}
						onChange={(value) =>
							onChangeText('description_02', value)
						}
					/>
					<SNDModalButton
						button={button}
						setText={(value) => setAttributes({ button: { ...button, text: value } })}
						setLink={(value) => setAttributes({ button: { ...button, link: value } })}
						setTarget={(value) => setAttributes({ button: { ...button, target: value } })}
						setModal={(value) => setAttributes({ button: { ...button, modal: value } })}
						setShow={(value) => setAttributes({ button: { ...button, show: value } })}
					/>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ className: 'sd-club-home' })}>
				{(title_01 || title_02 || title_03) && (
					<div className="container">
						<h2>
							{title_01 && (
								<RichText
									tagName="span"
									value={title_01}
									className="fade-in-left wow"
									onChange={(value) =>
										onChangeText('title_01', value)
									}
								/>
							)}
							{title_02 && (
								<RichText
									tagName="span"
									value={title_02}
									className="fade-in-left-05 wow"
									onChange={(value) =>
										onChangeText('title_02', value)
									}
								/>
							)}
							{title_03 && (
								<RichText
									tagName="span"
									value={title_03}
									className="fade-in-right-1 wow"
									onChange={(value) =>
										onChangeText('title_03', value)
									}
								/>
							)}
						</h2>
					</div>
				)}
				{video?.url && (
					<video
						// ref={videoRef}
						src={video.url}
						poster={video?.poster?.url || false}
						controls
						playsinline
					>
					</video>
				)}

				{(description_01 || description_02 || button) && (
					<div className="sd-club-home__text">
						<div className="container">
							{description_01 && (
								<RichText
									tagName="h3"
									value={description_01}
									onChange={(value) =>
										onChangeText('description_01', value)
									}
								/>
							)}
							{description_02 && (
								<RichText
									tagName="p"
									value={description_02}
									className="fade-in-right wow"
									onChange={(value) =>
										onChangeText('description_02', value)
									}
								/>
							)}
							<SNDRichTextModalButton
								button={button}
								allowedFormats={[]}
								className={`${button.modal ? 'sd-modal-link wp-block-snd-button-modal' : 'sd-button-link'} `}
								setText={(value) => setAttributes({ button: { ...button, text: value } })}
							/>
						</div>
					</div>
				)}
			</section>
		</>
	);
}
