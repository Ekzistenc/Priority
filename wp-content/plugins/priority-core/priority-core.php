<?php

/**
 * Plugin Name:       Priority Core
 * Description:       Дополнительный функционал для Priority Theme
 * Version:           0.1.1
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Команда СайтыиДизайн.рф
 * Author URI:        https://sitesanddesign.ru
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Requires Plugins: secure-custom-fields
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

define("SND_PRTY_CORE_DIR", plugin_dir_path(__FILE__));
define("SND_PRTY_CORE_URL", plugin_dir_url(__FILE__));

require_once SND_PRTY_CORE_DIR . 'includes/acf.php';

function snd_core_enqueue_blocks_editor_assets() {
  wp_enqueue_script(
    'insert-nbsp-button',
    plugins_url('assets/js/insert-nbsp-button.js', __FILE__),
    ['wp-blocks', 'wp-element', 'wp-block-editor', 'wp-rich-text']
  );
}
add_action('enqueue_block_editor_assets', 'snd_core_enqueue_blocks_editor_assets');

function snd_core_register_post_types() {
  register_post_type('flats', [
    'labels' => [
      'name' => 'Квартиры',
      'singular_name' => 'Квартира'
    ],
    'public' => false,
    'show_ui' => true,
    "show_in_rest" => true,
    'has_archive' => false,
    'menu_position' => 6,
    'menu_icon' => 'dashicons-store',
    'supports' => ['title', 'editor', 'thumbnail']
  ]);
}
add_action('init', 'snd_core_register_post_types');

add_filter( 'use_block_editor_for_post_type', function( $use_block_editor, $post_type ) {
    if ( $post_type === 'flats' ) {
        return false; // отключаем Gutenberg только для flats
    }
    return $use_block_editor;
}, 10, 2 );

add_filter( 'wpcf7_autop_or_not', '__return_false' );