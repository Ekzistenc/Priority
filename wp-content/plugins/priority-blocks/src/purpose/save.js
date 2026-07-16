import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title_01, title_02, title_03 } = attributes;

	return (
		<section { ...useBlockProps.save( { className: 'sd-purpose' } ) }>
			{ ( title_01 || title_02 || title_03 ) && (
				<h4 className="container sd-purpose__h4">
					{ title_01 && (
						<RichText.Content tagName="span" value={ title_01 } />
					) }
					{ title_02 && (
						<RichText.Content tagName="span" value={ title_02 } />
					) }
					{ title_03 && (
						<RichText.Content tagName="span" value={ title_03 } />
					) }
				</h4>
			) }
		</section>
	);
}
