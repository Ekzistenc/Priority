<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

// SCF exists
if (!is_plugin_active('secure-custom-fields/secure-custom-fields.php')) {
	return;
}

add_action('acf/include_fields', function () {
	if (! function_exists('acf_add_local_field_group')) {
		return;
	}

	acf_add_local_field_group(
		array(
			'key' => 'group_6a563e95d061b',
			'title' => 'Галерея квартиры',
			'fields' => array(
				array(
					'key' => 'field_6a563ef8341c0',
					'label' => 'Галерея',
					'name' => 'gallery',
					'aria-label' => '',
					'type' => 'gallery',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'return_format' => 'id',
					'library' => 'all',
					'min' => '',
					'max' => '',
					'min_width' => '',
					'min_height' => '',
					'min_size' => '',
					'max_width' => '',
					'max_height' => '',
					'max_size' => '',
					'mime_types' => '',
					'insert' => 'append',
					'preview_size' => 'medium',
				),
			),
			'location' => array(
				array(
					array(
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'flats',
					),
				),
			),
			'menu_order' => 0,
			'position' => 'normal',
			'style' => 'default',
			'label_placement' => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen' => '',
			'active' => true,
			'description' => '',
			'show_in_rest' => 1,
			'display_title' => '',
			'allow_ai_access' => false,
			'ai_description' => '',
		)
	);

	acf_add_local_field_group(
		array(
			'key' => 'group_6a563fsdlkjhfl1',
			'title' => 'Дополнительные настройки квартиры',
			'fields' => array(
				array(
					'key' => 'field_6a5gjfdklgj4234lf',
					'label' => 'Текст кнопки Оставить заявку',
					'name' => 'text_button',
					'aria-label' => '',
					'type' => 'text',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => 'Оставить заявку',
					'allow_in_bindings' => 1,
					'placeholder' => '',
				),
				array(
					'key' => 'field_6a563e96f2025',
					'label' => 'Цена',
					'name' => 'price',
					'aria-label' => '',
					'type' => 'number',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array(
						'width' => '',
						'class' => '',
						'id' => '',
					),
					'default_value' => 0,
					'min' => 0,
					'max' => '',
					'allow_in_bindings' => 1,
					'placeholder' => '',
					'step' => '',
					'prepend' => '',
					'append' => 'руб.',
				),
			),
			'location' => array(
				array(
					array(
						'param' => 'post_type',
						'operator' => '==',
						'value' => 'flats',
					),
				),
			),
			'menu_order' => 0,
			'position' => 'side',
			'style' => 'default',
			'label_placement' => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen' => '',
			'active' => true,
			'description' => '',
			'show_in_rest' => 1,
			'display_title' => '',
			'allow_ai_access' => false,
			'ai_description' => '',
		)
	);
});
