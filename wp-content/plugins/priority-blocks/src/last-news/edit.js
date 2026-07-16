import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	ProgressBar,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { category, title, button, count } = attributes;

	const onChangeButtonProp = ( field, value ) => {
		setAttributes( {
			button: {
				...button,
				[ field ]: value,
			},
		} );
	};

	const categories = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'taxonomy', 'category', {
			per_page: -1,
		} );
	}, [] );

	const { postsPageUrl, isPostsPageMissing } = useSelect( ( select ) => {
		const { getEntityRecord, hasFinishedResolution } = select( 'core' );
		const site = getEntityRecord( 'root', 'site' );
		const siteResolved = hasFinishedResolution( 'getEntityRecord', [
			'root',
			'site',
		] );

		if ( ! siteResolved ) {
			return { postsPageUrl: '', isPostsPageMissing: false };
		}

		const pageForPostsId = parseInt( site?.page_for_posts, 10 ) || 0;

		if ( ! pageForPostsId ) {
			return { postsPageUrl: '', isPostsPageMissing: true };
		}

		const page = getEntityRecord( 'postType', 'page', pageForPostsId );
		const pageResolved = hasFinishedResolution( 'getEntityRecord', [
			'postType',
			'page',
			pageForPostsId,
		] );

		if ( ! pageResolved ) {
			return { postsPageUrl: '', isPostsPageMissing: false };
		}

		const link = page?.link || '';

		return {
			postsPageUrl: link,
			isPostsPageMissing: ! link,
		};
	}, [] );

	const shouldHideButtonUi = ! category && isPostsPageMissing;

	const categoryId = categories?.find(
		( item ) => item.slug === category
	)?.id;

	const categoryUrl =
		categories?.find( ( item ) => item.slug === category )?.link || '';

	const allNewsUrl = category ? categoryUrl : postsPageUrl;

	useEffect( () => {
		if ( shouldHideButtonUi || ! allNewsUrl ) return;

		const currentLink = button?.link;

		if ( ! currentLink || currentLink === '#' ) {
			onChangeButtonProp( 'link', allNewsUrl );
		}
	}, [ shouldHideButtonUi, allNewsUrl, button?.link ] );

	const { news, isLoading } = useSelect(
		( select ) => {
			const {
				getEntityRecords,
				isResolving,
				hasFinishedResolution,
			} = select( 'core' );

			const query = {
				per_page: count || 3,
				status: 'publish',
				_embed: true,
			};

			if ( categoryId ) {
				query.categories = [ categoryId ];
			}

			const posts = getEntityRecords( 'postType', 'post', query );
			const queryArgs = [ 'postType', 'post', query ];
			const isLoadingNews =
				isResolving( 'getEntityRecords', queryArgs ) ||
				! hasFinishedResolution( 'getEntityRecords', queryArgs );

			return {
				isLoading: isLoadingNews,
				news: posts
					? posts.map( ( item ) => {
							const media =
								item?._embedded?.[ 'wp:featuredmedia' ]?.[ 0 ];

							return {
								title: item.title.rendered,
								image: {
									thumb_url:
										media?.media_details?.sizes?.large
											?.source_url ||
										media?.source_url ||
										'',
								},
							};
					  } )
					: [],
			};
		},
		[ count, categoryId ]
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<SelectControl
						__next40pxDefaultSize
						label="Рубрика"
						value={ category }
						options={ [
							{ label: 'Последние записи', value: '' },

							...( categories?.map( ( item ) => ( {
								label: item.name,

								value: item.slug,
							} ) ) || [] ),
						] }
						onChange={ ( value ) => {
							setAttributes( { category: value } );

							if ( value ) {
								const nextTerm = categories?.find(
									( item ) => item.slug === value
								);

								onChangeButtonProp(
									'link',

									nextTerm?.link || ''
								);
							} else {
								onChangeButtonProp(
									'link',
									postsPageUrl || ''
								);
							}
						} }
					/>

					<TextControl
						label="Заголовок"
						value={ title }
						__nextHasNoMarginBottom={ true }
						__next40pxDefaultSize
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
					/>

					<TextControl
						type="number"
						min="1"
						label="Количество новостей"
						value={ count }
						__nextHasNoMarginBottom={ true }
						__next40pxDefaultSize
						onChange={ ( value ) =>
							setAttributes( { count: Number( value ) } )
						}
					/>

					{ ! shouldHideButtonUi && (
						<div className="components-base-control">
							<label className="components-base-control__label">
								Кнопка
							</label>

							<ToggleControl
								__nextHasNoMarginBottom={ true }
								checked={ button.show }
								label="Показывать кнопку"
								onChange={ () =>
									onChangeButtonProp( 'show', ! button.show )
								}
							/>

							<ToggleControl
								__nextHasNoMarginBottom={ true }
								checked={ button.modal }
								label="Модальное окно"
								onChange={ () =>
									onChangeButtonProp(
										'modal',
										! button.modal
									)
								}
							/>

							<TextControl
								value={ button.text }
								label="Текст кнопки"
								__nextHasNoMarginBottom={ true }
								__next40pxDefaultSize
								onChange={ ( value ) =>
									onChangeButtonProp( 'text', value )
								}
							/>

							{ ! button.modal && (
								<>
									<TextControl
										type="url"
										value={ button.link }
										label="URL кнопки"
										__nextHasNoMarginBottom={ true }
										__next40pxDefaultSize
										onChange={ ( value ) =>
											onChangeButtonProp( 'link', value )
										}
									/>

									<ToggleControl
										__nextHasNoMarginBottom={ true }
										checked={ button.target }
										label="Открывать в новой вкладке"
										onChange={ () =>
											onChangeButtonProp(
												'target',

												! button.target
											)
										}
									/>
								</>
							) }
						</div>
					) }
				</PanelBody>
			</InspectorControls>

			<section { ...useBlockProps( { className: 'sd-news' } ) }>
				<div className="container">
					<RichText
						tagName="h2"
						value={ title }
						placeholder="Введите заголовок"
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
					/>

					{ isLoading ? (
						<div className="sd-news__loader">
							<ProgressBar />
						</div>
					) : (
						news &&
						news.length > 0 && (
							<div className="sd-news__grid">
								{ news.map( ( item, index ) => (
									<a
										key={ index }
										className="sd-news__card"
									>
										{ item?.image?.thumb_url ? (
											<img
												src={ item.image.thumb_url }
												href="#"
												alt=""
											/>
										) : (
											<div className="no-thumb"></div>
										) }

										{ item?.title && (
											<p>{ item.title }</p>
										) }
									</a>
								) ) }
							</div>
						)
					)}

					{ button.show && ! shouldHideButtonUi && (
						<RichText
							tagName="div"
							value={ button.text }
							placeholder="Введите текст кнопки"
							onChange={ ( value ) =>
								onChangeButtonProp( 'text', value )
							}
							className={ `sd-news__lik ${
								button.modal
									? 'sd-modal-link'
									: 'sd-button-link'
							}` }
							href={ button.modal ? '#' : button.link || '#' }
							target={
								! button.modal && button.target
									? '_blank'
									: '_self'
							}
						/>
					) }
				</div>
			</section>
		</>
	);
}
