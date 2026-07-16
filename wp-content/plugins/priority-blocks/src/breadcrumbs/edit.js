import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( {} ) {
	return (
		<div { ...useBlockProps( { className: 'sd-bread-crumbs' } ) }>
			<div className="container">
				<p>Главная</p>
				<span>/</span>
				<p>Хлебные крошки</p>
			</div>
		</div>
	);
}
