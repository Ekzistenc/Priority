import {
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

export default function Edit({ attributes, setAttributes }) {
	const { text, thumbnailUrl } = attributes

	const postThumbnailId = useSelect((select) => {
		return select('core/editor').getEditedPostAttribute('featured_media');
	}, []);

	// Получаем URL изображения по ID
	const postThumbnailUrl = useSelect((select) => {
		if (postThumbnailId) {
			const media = select('core').getMedia(postThumbnailId);

			if (media) {
				return media?.media_details?.sizes["1536x1536"]?.source_url || media.source_url || null;
			}

			return null;
		}
		return null;
	}, [postThumbnailId]);

	// Устанавливаем URL изображения в атрибут
	useEffect(() => {
		if (postThumbnailUrl !== thumbnailUrl) {
			setAttributes({ thumbnailUrl: postThumbnailUrl });
		}

	}, [postThumbnailUrl])

	return (
		<div {...useBlockProps({ className: 'sd-new__grid' })}>

			{thumbnailUrl && (
				<img src={thumbnailUrl} alt="" />
			)}

			<RichText
				tagName='p'
				placeholder='Введите текст новости'
				value={text}
				onChange={(value) => setAttributes({ text: value })}
			/>

		</div>
	);
}
