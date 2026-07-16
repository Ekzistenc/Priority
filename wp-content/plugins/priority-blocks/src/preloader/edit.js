import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { ToggleControl, PanelBody, Notice } from '@wordpress/components';
import { useState } from '@wordpress/element';
import './editor.scss';

export default function Edit() {
	const [ showPreloader, setShowPreloader ] = useState( false );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<ToggleControl
						label="Показать прелоадер для настройки"
						__nextHasNoMarginBottom={ true }
						checked={ showPreloader }
						onChange={ ( value ) => setShowPreloader( value ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps( { className: 'preloader-block' } ) }>
				{ ! showPreloader && (
					<Notice status="warning" isDismissible={ false }>
						Здесь показывается прелоадер
					</Notice>
				) }

				<div className={ `preloader ${ showPreloader ? 'open' : '' }` }>
					<InnerBlocks
						allowedBlocks={ [ 'core/site-logo', 'core/image' ] }
					/>
				</div>
			</div>
		</>
	);
}
