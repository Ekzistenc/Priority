<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function snd_loading_flat_content()
{
	check_ajax_referer('flats_nonce', 'nonce');

	$post_id = !empty($_POST['id']) ? absint($_POST['id']) : 0;
	if (empty($post_id)) {
		wp_send_json_error([
			'console' => 'Пустой ID или ID равен нулю',
			'html' => '<p>Запись не найдена. Обратитесь к администратору</p>'
		]);
	}

	$post = get_post($post_id);
	if (empty($post)) {
		wp_send_json_error([
			'console' => 'Запись не найдена',
			'html' => '<p>Запись не найдена. Обратитесь к администратору</p>'
		]);
	}

	$is_publish = $post->post_status == 'publish';
	if (empty($is_publish)) {
		wp_send_json_error([
			'console' => 'Запись не опубликована',
			'html' => '<p>Запись не найдена. Обратитесь к администратору</p>'
		]);
	}

	$title = esc_html($post->post_title);
	$description = strip_tags($post->post_content);

	$get_fields = function_exists('get_fields') ? get_fields($post_id) : [];
	$price = !empty($get_fields['price']) ? absint($get_fields['price']) : 0;
	$gallery = !empty($get_fields['gallery']) ? (array)$get_fields['gallery'] : [];
	$text_button = !empty($get_fields['text_button']) ? esc_html($get_fields['text_button']) : 'Оставить заявку';

	$html = '';

	if ($gallery) {
		$big_slides_html = '';
		$small_slides_html = '';

		foreach ($gallery as $image_id) {
			$preview_image_url = wp_get_attachment_image_url($image_id, '1536x1536');
			$big_image_url = wp_get_attachment_image_url($image_id, '2048x2048');
			$small_image_url = wp_get_attachment_image_url($image_id, 'thumbnail');

			$big_slides_html .= <<<BIG_SLIDE
			<div class="swiper-slide">
				<a href="$big_image_url" class="glightbox-gallery">
					<img src="$preview_image_url" alt="" loading="lazy">
				</a>
			</div>
			BIG_SLIDE;

			$small_slides_html .= <<<SML_SLIDE
			<div class="swiper-slide">
				<img src="$small_image_url" alt="" loading="lazy">
			</div>
			SML_SLIDE;
		}

		$html .= <<<GALLERY
		<div class="sd-card__slider">
			<div class="swiper swiper-card">
				<div class="swiper-wrapper">
					$big_slides_html
				</div>
				<div class="swiper-button-prev swiper-card-prev"></div>
				<div class="swiper-button-next swiper-card-next"></div>
				<div class="swiper-pagination swiper-pagination-card"></div>
			</div>
			<div class="swiper-card-small__wrapper">
				<div class="swiper-button-prev swiper-card-small-prev"></div>
				<div thumbsSlider="" class="swiper swiper-card-small">
					<div class="swiper-wrapper">
						$small_slides_html
					</div>
				</div>
				<div class="swiper-button-next swiper-card-small-next"></div>
			</div>
		</div>
		GALLERY;
	}

	$price_html = '';
	if ($price) {
		$price = number_format($price, 0, ' ', ' ');
		$price_html = "<h4>Цена: $price руб.</h4>";
	}

	$html .= <<<CONTENT
	<div class="sd-modal__content-text">
		<h2>$title</h2>
		<h3>$description</h3>
		$price_html
		<a class="sd-modal-link">
			$text_button
		</a>
	</div>
	CONTENT;

	wp_send_json_success([
		'html' => $html
	]);
}
add_action('wp_ajax_nopriv_loading_flat_content', 'snd_loading_flat_content');
add_action('wp_ajax_loading_flat_content', 'snd_loading_flat_content');