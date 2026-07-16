import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { title, description, subtitle } = attributes;

	return (
		<section { ...useBlockProps.save( { className: 'sd-about' } ) }>
			<div className="container">
				{ title && (
					<RichText.Content
						tagName="h2"
						value={ title }
						className="fade-in-left wow"
					/>
				) }

				{ description && (
					<RichText.Content tagName="p" value={ description } />
				) }

				{ subtitle && (
					<RichText.Content
						tagName="h3"
						value={ subtitle }
						className="fade-in-right-05 wow"
					/>
				) }
			</div>
		</section>
	);
}
