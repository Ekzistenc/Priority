<?php

/**
 * Plugin Name:       Priority Blocks
 * Description:       Блоки для Priority Theme
 * Version:           0.1.2
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Команда СайтыиДизайн.рф
 * Author URI:        https://sitesanddesign.ru
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

if (! defined('ABSPATH')) {
  exit; // Exit if accessed directly.
}

define("SND_PRTY_BLOCKS_DIR", plugin_dir_path(__FILE__));
define("SND_PRTY_BLOCKS_URL", plugin_dir_url(__FILE__));

require_once SND_PRTY_BLOCKS_DIR . 'includes/ajax_flats.php';
require_once SND_PRTY_BLOCKS_DIR . 'includes/ajax_loading_flat.php';
require_once SND_PRTY_BLOCKS_DIR . 'includes/breadcrumbs.php';

function snd_block_categories($categories)
{
  $custom = [
    [
      'slug'  => 'snd-blocks',
      'title' => 'Priority Blocks',
    ],
    [
      'slug'  => 'snd-theme',
      'title' => 'Priority Theme',
    ],
  ];

  $existing_slugs = array_column($categories, 'slug');
  $to_prepend = array_filter(
    $custom,
    static fn($category) => !in_array($category['slug'], $existing_slugs, true)
  );

  if ($to_prepend) {
    $categories = array_merge(array_values($to_prepend), $categories);
  }

  return $categories;
}
add_filter('block_categories_all', 'snd_block_categories');

function snd_create_blocks_priority_blocks_init()
{
  if (function_exists('wp_register_block_types_from_metadata_collection')) {
    wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
    return;
  }

  if (function_exists('wp_register_block_metadata_collection')) {
    wp_register_block_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
  }

  $manifest_data = require __DIR__ . '/build/blocks-manifest.php';
  foreach (array_keys($manifest_data) as $block_type) {
    register_block_type(__DIR__ . "/build/{$block_type}");
  }
}
add_action('init', 'snd_create_blocks_priority_blocks_init');

function snd_register_priority_blocks_assets()
{
  wp_register_script(
    'ymap',
		'https://api-maps.yandex.ru/2.1/?apikey=81bc14a3-f1f5-4f98-8da8-6f4ecb7abefc&lang=ru_RU',
    [],
    false,
    true
  );
  wp_register_script(
    'glightbox',
    plugins_url('assets/js/glightbox.min.js', __FILE__),
    [],
    false,
    true
  );
  wp_register_script(
    'swiper',
    plugins_url('assets/js/swiper-bundle.min.js', __FILE__),
    [],
    false,
    true
  );
  wp_register_script(
    'dialog-polyfill',
    plugins_url('assets/js/dialog-polyfill.min.js', __FILE__),
    [],
    false,
    true
  );
  wp_register_script(
    'flats',
    plugins_url('assets/js/flats.js', __FILE__),
    ['glightbox'],
    filemtime(__DIR__ . '/assets/js/flats.js'),
    true
  );
  wp_localize_script(
    'flats',
    'flats_ajax_object',
    [
      'ajaxurl' => admin_url('admin-ajax.php'),
      'nonce' => wp_create_nonce('flats_nonce')
    ]
  );

  wp_register_style(
    'glightbox',
    plugins_url('assets/css/glightbox.min.css', __FILE__)
  );
  wp_register_style(
    'swiper',
    plugins_url('assets/css/swiper-bundle.min.css', __FILE__)
  );
  wp_register_style(
    'dialog-polyfill',
    plugins_url('assets/css/dialog-polyfill.min.css', __FILE__)
  );
}
add_action('wp_enqueue_scripts', 'snd_register_priority_blocks_assets');


add_filter('get_the_archive_title_prefix', function($prefix) {
	return '';
});

add_filter('register_post_type_args', function ($args, $post_type) {
	if ($post_type === 'post') {
		$args['template'] = [
			['snd/single-new', [], [
				['core/heading', [
					'level' => 1,
					'placeholder' => 'Введите заголовок',
					'content' => 'Заголовок'
				]],
				['snd/single-new-grid', [
					'text' => 'Добро пожаловать в WordPress. Это ваша первая запись.',
					'thumbnailUrl' => ''
				]],
				['snd/exterier', [
					'title' => '',
					'slider' => [
						[
							'image1' => ['url' => 'http://priority.local/wp-content/uploads/2025/04/6-scaled.jpg'],
							'image2' => ['url' => 'http://priority.local/wp-content/uploads/2025/04/4-scaled.jpg']
						],
						[
							'image1' => ['url' => 'http://priority.local/wp-content/uploads/2025/04/2.1-scaled.jpg'],
							'image2' => ['url' => 'http://priority.local/wp-content/uploads/2025/04/1-1-scaled.jpg']
						]
					]
				]]
			]]
		];
		$args['template_lock'] = true; // Можно поставить true, если хочешь запретить удаление блоков
	}

	return $args;
}, 10, 2);