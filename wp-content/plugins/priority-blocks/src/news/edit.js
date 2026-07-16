import {
	useBlockProps
} from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import './editor.scss';

export default function Edit({ }) {
	return (
		<section {...useBlockProps({ className: 'sd-news' })}>
			<ServerSideRender block="snd/news" attributes={attributes} />
		</section>
	);
}
