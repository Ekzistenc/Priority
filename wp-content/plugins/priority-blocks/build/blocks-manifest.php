<?php
// This file is generated. Do not modify it manually.
return array(
	'about-blue' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/about-blue',
		'version' => '0.1.1',
		'title' => 'О компании миссия',
		'category' => 'snd-blocks',
		'icon' => 'editor-paste-text',
		'parent' => array(
			'snd/about-wrapper'
		),
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Мы делаем то, что делаем, потому что верим в свою миссию:'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'изменяя городское пространство, мы изменяем будущее городов к лучшему. А значит — и ваше тоже!'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./render.php'
	),
	'about-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/about-content',
		'version' => '0.1.1',
		'title' => 'О компании контент',
		'category' => 'snd-blocks',
		'icon' => 'media-code',
		'parent' => array(
			'snd/about-wrapper'
		),
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'ГК «Вместе» работает в сфере девелопмента с 2012 года'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./render.php'
	),
	'about-grid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/about-grid',
		'version' => '0.1.0',
		'title' => 'Сетка проектов',
		'category' => 'snd-blocks',
		'icon' => 'grid-view',
		'parent' => array(
			'snd/about-content'
		),
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./render.php'
	),
	'about-grid-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/about-grid-item',
		'version' => '0.1.0',
		'title' => 'Проект',
		'category' => 'snd-blocks',
		'icon' => 'plus',
		'parent' => array(
			'snd/about-grid'
		),
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Название проекта'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Описание проекта'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => '',
					'size' => 'large',
					'sizes' => array(
						
					)
				)
			),
			'link' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'target' => true
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./render.php'
	),
	'about-wrapper' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/about-wrapper',
		'version' => '0.1.1',
		'title' => 'О компании',
		'category' => 'snd-blocks',
		'icon' => 'media-code',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./render.php'
	),
	'breadcrumbs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/breadcrumbs',
		'version' => '0.1.0',
		'title' => 'Хлебные крошки',
		'category' => 'snd-theme',
		'icon' => 'ellipsis',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css'
	),
	'club-home' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/club-home',
		'version' => '0.1.0',
		'title' => 'Клубный дом',
		'category' => 'snd-blocks',
		'icon' => 'align-center',
		'example' => array(
			
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title_01' => array(
				'type' => 'string',
				'default' => 'Запишитесь на экскурсию'
			),
			'title_02' => array(
				'type' => 'string',
				'default' => 'Собственными глазами увидите стройплошадку,'
			),
			'title_03' => array(
				'type' => 'string',
				'default' => 'сможете подняться на любой этаж и&nbsp;протестировать любую планировку'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'video' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'poster' => array(
						'id' => 0,
						'url' => ''
					)
				)
			),
			'description_01' => array(
				'type' => 'string',
				'default' => 'Видео помогает представить будущий дом, '
			),
			'description_02' => array(
				'type' => 'string',
				'default' => 'но личная экскурсия даёт совершенно другие ощущения!'
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'text' => 'Записаться на экскурсию',
					'link' => '/',
					'target' => false,
					'modal' => true,
					'show' => true
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'compromises' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/compromises',
		'version' => '0.1.0',
		'title' => 'Галерея',
		'category' => 'snd-blocks',
		'icon' => 'format-gallery',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Оставьте компромиссы в прошлом. Привилегии — они в настоящем.'
			),
			'slider' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => array(
			'swiper',
			'glightbox',
			'file:./view.js'
		),
		'viewStyle' => array(
			'swiper',
			'glightbox'
		)
	),
	'contacts' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/contacts',
		'version' => '0.1.0',
		'title' => 'Контакты',
		'category' => 'snd-blocks',
		'icon' => 'location-alt',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Контакты'
			),
			'title_phone' => array(
				'type' => 'string',
				'default' => 'Телефон'
			),
			'number_phone' => array(
				'type' => 'string',
				'default' => '+7 (999) 999-99-99'
			),
			'number_phone_href' => array(
				'type' => 'string',
				'default' => '+79999999999'
			),
			'title_address' => array(
				'type' => 'string',
				'default' => 'Адрес'
			),
			'desc_address' => array(
				'type' => 'string',
				'default' => 'г. Братск, ул. Металлургов, д. 16'
			),
			'title_socs' => array(
				'type' => 'string',
				'default' => 'Мы в соцсетях'
			),
			'socs' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'text' => 'Заказать звонок',
					'link' => '',
					'target' => true,
					'modal' => true,
					'show' => true
				)
			),
			'map' => array(
				'type' => 'object',
				'default' => array(
					'coordinates_xy' => '56.175387, 101.624279',
					'zoom' => '15',
					'address' => 'г. Братск, ул. Металлургов, д. 16'
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => array(
			'ymap',
			'file:./view.js'
		)
	),
	'exterier' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/exterier',
		'version' => '0.1.0',
		'title' => 'Галерея 2',
		'category' => 'snd-blocks',
		'icon' => 'images-alt2',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Вид на башню Priority снаружи'
			),
			'slider' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => array(
			'swiper',
			'glightbox',
			'file:./view.js'
		),
		'viewStyle' => array(
			'swiper',
			'glightbox'
		)
	),
	'footer' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/footer',
		'version' => '0.1.0',
		'title' => 'FOOTER',
		'category' => 'snd-theme',
		'icon' => 'editor-table',
		'example' => array(
			
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'number_phone' => array(
				'type' => 'string',
				'default' => '+7 (999) 999-99-99'
			),
			'number_phone_href' => array(
				'type' => 'string',
				'default' => '+79999999999'
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'text' => 'Заказать звонок',
					'link' => '',
					'target' => true,
					'modal' => true,
					'show' => true
				)
			),
			'socs_title' => array(
				'type' => 'string',
				'default' => 'Соц сети'
			),
			'socs' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'copyright' => array(
				'type' => 'string',
				'default' => ''
			),
			'links' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'header' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/header',
		'version' => '0.1.0',
		'title' => 'HEADER',
		'category' => 'snd-theme',
		'icon' => 'menu-alt3',
		'example' => array(
			
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'number_phone' => array(
				'type' => 'string',
				'default' => '+7 (999) 999-99-99'
			),
			'number_phone_href' => array(
				'type' => 'string',
				'default' => '+79999999999'
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'text' => 'Заказать звонок',
					'link' => '',
					'target' => true,
					'modal' => true,
					'show' => true
				)
			),
			'socs_title' => array(
				'type' => 'string',
				'default' => 'Соц сети'
			),
			'socs' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'header-page' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/header-page',
		'version' => '0.1.0',
		'title' => 'HEADER for Pages',
		'category' => 'snd-theme',
		'icon' => 'menu-alt2',
		'example' => array(
			
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'number_phone' => array(
				'type' => 'string',
				'default' => '+7 (999) 999-99-99'
			),
			'number_phone_href' => array(
				'type' => 'string',
				'default' => '+79999999999'
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'text' => 'Заказать звонок',
					'link' => '',
					'target' => true,
					'modal' => true,
					'show' => true
				)
			),
			'socs_title' => array(
				'type' => 'string',
				'default' => 'Соц сети'
			),
			'socs' => array(
				'type' => 'array',
				'default' => array(
					array(
						'name' => 'Telegram',
						'link' => '#',
						'icon' => array(
							'id' => 0,
							'url' => ''
						)
					),
					array(
						'name' => 'WhatsApp',
						'link' => '#',
						'icon' => array(
							'id' => 0,
							'url' => ''
						)
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'last-news' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/last-news',
		'version' => '0.1.0',
		'title' => 'Последние новости',
		'category' => 'snd-blocks',
		'icon' => 'format-aside',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'category' => array(
				'type' => 'string',
				'default' => ''
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Последние новости'
			),
			'count' => array(
				'type' => 'number',
				'default' => '3'
			),
			'anchor' => array(
				'type' => 'string'
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'text' => 'Смотреть все новости',
					'link' => '',
					'target' => false,
					'modal' => false,
					'show' => true
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'layouts' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/layouts',
		'version' => '0.1.0',
		'title' => 'Квартиры',
		'category' => 'snd-blocks',
		'icon' => 'store',
		'example' => array(
			
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'Ваша квартира — <br> это не просто пространство для жизни.'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Каждая квартира — отдельный мир.'
			),
			'description' => array(
				'type' => 'string',
				'default' => 'Разнообразные планировки — от студий до 6-комнатных квартир...'
			),
			'table' => array(
				'type' => 'object',
				'default' => array(
					'count_el' => 4,
					'button_text' => 'Показать ещё'
				)
			),
			'aftertext' => array(
				'type' => 'string',
				'default' => 'Бюро Urban plan, создавшее архитектурную концепцию...'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'textButton' => array(
				'type' => 'string',
				'default' => 'Подробнее'
			),
			'anchor' => array(
				'type' => 'string'
			),
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewStyle' => array(
			'glightbox'
		),
		'viewScript' => array(
			'glightbox',
			'flats'
		)
	),
	'main-swiper-slide' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/main-swiper-slide',
		'version' => '0.1.1',
		'title' => 'Посадочный блок слайд',
		'category' => 'snd-blocks',
		'icon' => 'format-image',
		'parent' => array(
			'snd/main-swiper-wrapper'
		),
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title_01' => array(
				'type' => 'string',
				'default' => 'Единственный дом',
				'selector' => 'span'
			),
			'title_02' => array(
				'type' => 'string',
				'default' => 'бизнес-класса<br>в&nbsp;Братске',
				'selector' => 'span'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Ипотека от 32 575 рублей в месяц'
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'name' => 'Выбрать квартиру',
					'href' => '/#layouts',
					'target' => false
				)
			),
			'imageLogo' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => '',
					'size' => 'medium'
				)
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => '',
					'size' => '2048x2048',
					'sizes' => array(
						
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./render.php'
	),
	'main-swiper-wrapper' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/main-swiper-wrapper',
		'version' => '0.1.1',
		'title' => 'Посадочный блок обертка',
		'category' => 'snd-blocks',
		'icon' => 'cover-image',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'swiper',
			'file:./style-index.css'
		),
		'viewScript' => array(
			'swiper',
			'file:./view.js'
		),
		'render' => 'file:./render.php'
	),
	'map' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/map',
		'version' => '0.1.1',
		'title' => 'Карта',
		'category' => 'snd-blocks',
		'icon' => 'location-alt',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'title_01' => array(
				'type' => 'string',
				'default' => 'Место, где расположен клубный дом, —'
			),
			'title_02' => array(
				'type' => 'string',
				'default' => 'лучшее место Центрального района.'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'map' => array(
				'type' => 'array',
				'default' => array(
					array(
						'coordinates_xy' => '56.175387, 101.624279',
						'address' => 'Первый Приорити, улица Металлургов, 16',
						'icon' => array(
							'id' => 0,
							'url' => '',
							'alt' => '',
							'size' => 'full'
						)
					)
				)
			),
			'showMap' => array(
				'type' => 'boolean',
				'default' => true
			),
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => array(
			'ymap',
			'glightbox',
			'file:./view.js'
		),
		'viewStyle' => array(
			'glightbox'
		)
	),
	'modal' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/modal',
		'version' => '0.1.0',
		'title' => 'Модальное окно',
		'category' => 'snd-theme',
		'icon' => 'button',
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'image_logo' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'image_bg' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => ''
				)
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Пожалуйста, укажите номер...'
			)
		),
		'supports' => array(
			'html' => false
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => array(
			'dialog-polyfill',
			'file:./view.js'
		),
		'viewStyle' => array(
			'dialog-polyfill'
		)
	),
	'news' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/news',
		'version' => '0.1.0',
		'title' => 'Новости',
		'category' => 'snd-theme',
		'icon' => 'grid-view',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css'
	),
	'preloader' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/preloader',
		'version' => '0.1.0',
		'title' => 'Прелоадер',
		'category' => 'snd-theme',
		'icon' => 'welcome-view-site',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'purpose' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/purpose',
		'version' => '0.1.0',
		'title' => 'Цель (Паралакс)',
		'category' => 'snd-blocks',
		'icon' => 'building',
		'example' => array(
			
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title_01' => array(
				'type' => 'string',
				'default' => 'Гармония —'
			),
			'title_02' => array(
				'type' => 'string',
				'default' => 'вот главное слово'
			),
			'title_03' => array(
				'type' => 'string',
				'default' => 'для вашего Дома.'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true,
			'background' => array(
				'backgroundImage' => true,
				'backgroundSize' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'purpose-text' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/purpose-text',
		'version' => '0.1.0',
		'title' => 'Цель Текст',
		'category' => 'snd-blocks',
		'icon' => 'heading',
		'example' => array(
			
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title_01' => array(
				'type' => 'string',
				'default' => 'Эта Цель — быть лучшим.'
			),
			'title_02' => array(
				'type' => 'string',
				'default' => 'Быть первым.'
			),
			'title_03' => array(
				'type' => 'string',
				'default' => 'Быть исключительным.'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Поэтому мы строим клубный дом «Первый Priority» для Вас.'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'single-new' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/single-new',
		'version' => '0.1.0',
		'title' => 'Обертка новости',
		'category' => 'snd-theme',
		'icon' => 'visibility',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'single-new-grid' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/single-new-grid',
		'version' => '0.1.0',
		'title' => 'Колонки новости',
		'category' => 'snd-theme',
		'icon' => 'align-left',
		'example' => array(
			
		),
		'parent' => array(
			'snd/single-new'
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'text' => array(
				'type' => 'string',
				'default' => ''
			),
			'thumbnailUrl' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'tower' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/tower',
		'version' => '0.1.0',
		'title' => 'Башня «Первый Priority»',
		'category' => 'snd-blocks',
		'icon' => 'text-page',
		'example' => array(
			
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Башня «Первый Priority»'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'станет доминантой локации, расположенной особняком от оживлённой трассы и поблизости к огромному лесному массиву.'
			),
			'list' => array(
				'type' => 'array',
				'default' => array(
					'Сдержанные благородные цветовые решения фасада скрывают от посторонних глаз тихую роскошь внутреннего убранства.',
					'А рядом поистине есть всё, что вам только может понадобиться для жизни в этом Доме и в этом городе.'
				)
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'text' => 'Узнать все подробности',
					'link' => '',
					'target' => true,
					'modal' => true,
					'show' => true
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'video-gallery' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/video-gallery',
		'version' => '0.1.0',
		'title' => 'Видеогалерея',
		'category' => 'snd-blocks',
		'icon' => 'format-video',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Видеогалерея'
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => array(
			'swiper',
			'file:./view.js'
		),
		'viewStyle' => array(
			'swiper'
		)
	),
	'you' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/you',
		'version' => '0.1.0',
		'title' => 'You',
		'category' => 'snd-blocks',
		'icon' => 'admin-users',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Вы разбираетесь в жизни.'
			),
			'youList' => array(
				'type' => 'array',
				'default' => array(
					'Умеете отличить мимолётное от фундаментального.',
					'Знаете цену качеству и надёжности.',
					'Видите цель и видите путь к ней.'
				)
			),
			'image_url' => array(
				'type' => 'string',
				'default' => ''
			),
			'image_alt' => array(
				'type' => 'string',
				'default' => ''
			),
			'image_id' => array(
				'type' => 'number',
				'default' => 0
			),
			'video' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'poster' => array(
						'id' => 0,
						'url' => ''
					)
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => array(
			'glightbox',
			'file:./view.js'
		),
		'viewStyle' => array(
			'glightbox'
		)
	)
);
