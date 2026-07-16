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
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { category, title, button, count } = attributes;

	const onChangeButtonProp = (field, value) => {
		setAttributes({
			button: {
				...button,
				[field]: value,
			},
		});
	};

	const categories = useSelect((select) => {
		return select('core').getEntityRecords('taxonomy', 'category', {
			per_page: -1,
		});
	}, []);
	const categoryId = categories?.find(
		(item) => item.slug === category
	)?.id;

	const news = useSelect((select) => {
		const { getEntityRecords } = select('core');
		const posts = getEntityRecords('postType', 'post', {
			per_page: count || 3,
			status: 'publish',
			categories: categoryId ? [categoryId] : undefined,
			_embed: true,
		});

		return posts
			? posts.map((item) => {
				const media = item?._embedded?.['wp:featuredmedia']?.[0];

				return {
					title: item.title.rendered,
					image: {
						thumb_url:
							media?.media_details?.sizes?.large?.source_url ||
							media?.source_url ||
							''
					},
				};
			})
			: [];
	}, [count, categoryId]);


	return (
		<>
			<InspectorControls>
				<PanelBody title="Настройки блока">
					<SelectControl
						__next40pxDefaultSize
						label="Рубрика"
						value={category}
						options={categories?.map((item) => ({
							label: item.name,
							value: item.slug,
						})) || []}
						onChange={(value) => setAttributes({ category: value })}
					/>
					<TextControl
						label="Заголовок"
						value={title}
						__nextHasNoMarginBottom={true}
						__next40pxDefaultSize
						onChange={(value) => setAttributes({ title: value })}
					/>

					<TextControl
						type="number"
						min="1"
						label="Количество новостей"
						value={count}
						__nextHasNoMarginBottom={true}
						__next40pxDefaultSize
						onChange={(value) => setAttributes({ count: Number(value) })}
					/>

					<div className="components-base-control">
						<label className="components-base-control__label">
							Кнопка
						</label>

						<ToggleControl
							__nextHasNoMarginBottom={true}
							checked={button.show}
							label="Показывать кнопку"
							onChange={() =>
								onChangeButtonProp('show', !button.show)
							}
						/>

						<ToggleControl
							__nextHasNoMarginBottom={true}
							checked={button.modal}
							label="Модальное окно"
							onChange={() =>
								onChangeButtonProp('modal', !button.modal)
							}
						/>

						<TextControl
							value={button.text}
							label="Текст кнопки"
							__nextHasNoMarginBottom={true}
							__next40pxDefaultSize
							onChange={(value) =>
								onChangeButtonProp('text', value)
							}
						/>

						{!button.modal && (
							<>
								<ToggleControl
									__nextHasNoMarginBottom={true}
									checked={button.target}
									label="Открывать в новой вкладке"
									onChange={() =>
										onChangeButtonProp(
											'target',
											!button.target
										)
									}
								/>
							</>
						)}
					</div>
				</PanelBody>
			</InspectorControls>

			<section {...useBlockProps({ className: 'sd-news' })}>
				<div className="container">
					<RichText
						tagName="h2"
						value={title}
						placeholder="Введите заголовок"
						onChange={(value) => setAttributes({ title: value })}
					/>

					{news && news.length > 0 && (
						<div className="sd-news__grid">
							{news.map((item, index) => (
								<a
									key={index}
									className="sd-news__card"
								>
									{item?.image?.thumb_url && (
										<img
											src={item.image.thumb_url}
											href="#"
											alt=""
										/>
									)}

									{item?.title && (
										<p>{item.title}</p>
									)}
								</a>
							))}
						</div>
					)}


					{button.show && (
						<RichText
							tagName="div"
							value={button.text}
							placeholder="Введите текст кнопки"
							onChange={(value) =>
								onChangeButtonProp('text', value)
							}
							className={`sd-news__lik ${button.modal ? 'sd-modal-link' : 'sd-button-link'}`}
							href="#"
							target={
								!button.modal && button.target
									? '_blank'
									: '_self'
							}
						/>
					)}
				</div>
			</section>
		</>
	);
}
