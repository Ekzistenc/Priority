import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( {} ) {
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'container' },
		{
			templateLock: false,
		}
	);

	return (
		<section { ...useBlockProps( { className: 'sd-new' } ) }>
			<div { ...innerBlocksProps } />
		</section>
	);
}
