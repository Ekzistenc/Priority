import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	RichText
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	Button
} from '@wordpress/components';

import SNDMediaUpload from '../snd-components/SNDMediaUpload';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import './editor.scss';
import './style.scss';

import metadata from './block.json';

registerBlockType(metadata.name, {

	edit: ({ attributes, setAttributes }) => {
		const { projects } = attributes;

		const onChangeProjectsItem = (index, value, field) => {
			const newList = JSON.parse(JSON.stringify(projects));
			newList[index] = { ...newList[index], [field]: value };
			setAttributes({ projects: newList });
		};

		const onClickAddProjectsItem = () => {
			setAttributes({
				projects: [
					...projects,
					{
						link: {
							id: 0,
							url: '',
							target: true
						},
						image: {
							id: 0,
							url: '',
							alt: '',
							size: 'large',
							sizes: {}
						},
						title: '',
						description: ''
					}]
			});
		};

		const onRemoveItem = (index) => {
			const newProjects = projects.filter((_, i) => i !== index);
			setAttributes({ projects: newProjects });
		};

		const onDragEnd = (result) => {
			if (!result.destination) return;

			const newProjects = [...projects];
			const [movedItem] = newProjects.splice(result.source.index, 1);

			newProjects.splice(result.destination.index, 0, movedItem);

			setAttributes({ projects: newProjects });
		};

		const updateLink = (index, value) => {
			const newList = [...projects];

			newList[index] = {
				...newList[index],
				link: {
					...newList[index].link,
					url: value,
				},
			};

			setAttributes({ projects: newList });
		};

		const updateLinkTarget = (index, value) => {
			const newList = [...projects];

			newList[index] = {
				...newList[index],
				link: {
					...newList[index].link,
					target: value,
				},
			};

			setAttributes({ projects: newList });
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title="Настройки проектов">
						<DragDropContext onDragEnd={onDragEnd}>
							<Droppable droppableId="project-list-droppable">
								{(provided) => (
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										className="components-list-control components-list-control--mix"
									>
										<label className="components-list-control__label">
											Проекты
										</label>

										{projects?.map((item, index) => (
											<Draggable
												key={`project-${index}`}
												draggableId={`project-${index}`}
												index={index}
											>
												{(provided) => (
													<details
														className="components-list-control__item"
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<summary>
															<div className="dragabble-element"></div>
															<span>Проект {index + 1}</span>

															<Button
																__next40pxDefaultSize
																__nextHasNoMarginBottom={true}
																className="is-secondary is-destructive is-small"
																title="Удалить проект"
																onClick={(e) => {
																	e.stopPropagation(); // чтобы не срабатывал toggle
																	onRemoveItem(index);
																}}
															></Button>
														</summary>

														<TextControl
															label="Ссылка"
															type="url"
															value={item.link.url || 'https://гк-вместе.рф/#projects'}
															onChange={(value) => updateLink(index, value)
															}
															__nextHasNoMarginBottom={true}
															__next40pxDefaultSize
														/>
														<ToggleControl
															__nextHasNoMarginBottom={true}
															checked={item.link.target}
															label="Открывать в новой вкладке"
															onChange={(value) => updateLinkTarget(index, value)
															}
														/>

														<SNDMediaUpload
															onSelect={(media) => {
																const size = item.image?.size || 'large';
																const url = media?.sizes?.[size]?.url || media?.url || '';
																const updatedProjects = JSON.parse(JSON.stringify(projects));

																updatedProjects[index].image = {
																	id: media?.id || 0,
																	url: url,
																	alt: media?.alt || '',
																	size: size,
																	sizes: media?.sizes || {},
																	type: 'image',
																};

																setAttributes({ projects: updatedProjects });
															}}
															allowedTypes={['image']}
															value={item?.image?.id || 0}
															media={item?.image}
															onChangeMedia={(newImage) => {
																const updatedProjects = JSON.parse(JSON.stringify(projects));
																updatedProjects[index].image = newImage;
																setAttributes({ projects: updatedProjects });
															}}
															label={'Выбрать изображение'}
															labelButton={`${item.image?.url ? 'Изменить' : 'Выбрать'} изображение`}
														/>

														<TextControl
															__next40pxDefaultSize
															__nextHasNoMarginBottom={true}
															label="Заголовок"
															value={item.title || ''}
															onChange={(value) =>
																onChangeProjectsItem(index, value, "title" )
															}
														/>
														<TextareaControl
															__next40pxDefaultSize
															__nextHasNoMarginBottom={true}
															label="Описание"
															value={item.description || ''}
															onChange={(value) =>
																onChangeProjectsItem(index, value, "description")
															}
														/>
													</details>
												)}
											</Draggable>
										))}

										{provided.placeholder}

										<hr />
										<Button
											__next40pxDefaultSize
											__nextHasNoMarginBottom={true}
											variant="primary"
											onClick={onClickAddProjectsItem}
										>
											Добавить проект
										</Button>
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</PanelBody>
				</InspectorControls>

				<section {...useBlockProps({ className: 'sd-about__grid' })}>
					{projects && projects.length > 0 &&
						projects.map((item, index) => {
							return (
								<a href={item.link.url} target={item.link.target ? '_blank' : '_self'} key={index} style={{ backgroundImage: `url(${item.image.url})` }}>
									<h4>{item.title}</h4>
									<span>{item.description}</span>
								</a>
							);
						})
					}
				</section>
			</>

		);
	},

	save: () => {
		return null;
	},
});
