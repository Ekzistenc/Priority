import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save( {} ) {
	return (
		<section { ...useBlockProps.save( { className: 'sd-new' } ) }>
			<div className="container">
				<InnerBlocks.Content />
			</div>
		</section>
	);
}
