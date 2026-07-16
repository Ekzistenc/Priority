import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { text, thumbnailUrl } = attributes;
	return (
		<div { ...useBlockProps.save( { className: 'sd-new__grid' } ) }>
			{ thumbnailUrl && <img src={ thumbnailUrl } alt="" /> }

			<RichText.Content tagName="p" value={ text } />
		</div>
	);
}
