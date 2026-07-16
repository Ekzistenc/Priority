<?php
function priority_theme_assets() {
  wp_enqueue_style('priority-theme-style', get_template_directory_uri() . '/style.css', [], '1.0.0', 'all');

  wp_enqueue_script('wow', get_template_directory_uri() . '/assets/js/wow.min.js', [], '1.0.0', true);
  wp_enqueue_script('priority-theme-script', get_template_directory_uri() . '/assets/js/main.js', [], '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'priority_theme_assets');
