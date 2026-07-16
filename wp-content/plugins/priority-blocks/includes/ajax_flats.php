<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function snd_ajax_flats()
{
	if (!empty($_POST['nonce']) && !wp_verify_nonce($_POST['nonce'], 'flats_nonce')) {
		wp_send_json_error([
			'message' => 'Произошла ошибка. Обратитесь к администратору'
		]);
	}

	if (!empty($_POST['count'])) {
		$count = absint($_POST['count']);
	} else {
		$count = 4;
	}

	$offset = !empty($_POST['offset']) ? absint($_POST['offset']) : 0;
	$all_count_flats = (int)wp_count_posts('flats')->publish;

	if (!$offset) {
		wp_send_json_error([
			'message' => 'Произошла ошибка. Попробуйте обновить страницу'
		]);
	}

	$get_flats = get_posts([
		'posts_per_page' => $count,
		'post_type' => 'flats',
		'offset' => $offset
	]);

	if (!$get_flats) {
		wp_send_json_error([
			'message' => 'Нет доступных квартир'
		]);
	}

	global $post;
	ob_start();

	foreach ($get_flats as $post) : ?>
		<?php
		setup_postdata($post);

		$post_id = get_the_ID();
		$title = get_the_title() ? str_replace(' м2', '&nbsp;м<sup>2</sup>', get_the_title()) : '';
		$content = get_the_content();
		$thumbnail_id = get_post_thumbnail_id();
		$thumbnail_image = wp_get_attachment_image($thumbnail_id, 'medium')
			? wp_get_attachment_image($thumbnail_id, 'medium')
			: wp_get_attachment_image($thumbnail_id, 'full');
		$thumbnail_full_url = wp_get_attachment_url($thumbnail_id, '1536x1536')
			? wp_get_attachment_url($thumbnail_id, '1536x1536')
			: wp_get_attachment_url($thumbnail_id, 'full');

		$meta_snd_count_room = get_post_meta($post_id, 'snd_count_room', true);
		$meta_snd_flat_size = get_post_meta($post_id, 'snd_flat_size', true);
		?>

		<div class="sd-layouts__grid-item">
			<?php if ($thumbnail_id) : ?>
				<a href="<?php echo esc_url($thumbnail_full_url); ?>" class="glightbox2">
					<?php echo $thumbnail_image; ?>
				</a>
			<?php endif; ?>

			<?php if ($meta_snd_count_room && $meta_snd_flat_size) : ?>
				<?php echo "<h4>{$meta_snd_count_room}-к квартира {$meta_snd_flat_size}&nbsp;м<sup>2</sup></h4>"; ?>
			<?php else : ?>
				<h4><?php echo wp_kses_post($title); ?></h4>
			<?php endif; ?>

			<?php if ($content) : ?>
				<p><?php echo strip_tags($content); ?></p>
			<?php endif; ?>

			<a class="sd-modal-link" data-title="<?php echo esc_attr(get_the_title()); ?>">
				Оставить заявку
			</a>
		</div>
<?php endforeach;

	$flats_html = ob_get_contents();
	ob_end_clean();
	wp_reset_postdata();

	wp_send_json_success([
		'flats' => $flats_html,
		'button_delete' => ($offset + $count >= $all_count_flats) ? true : false
	]);
}
add_action('wp_ajax_nopriv_ajax_flats', 'snd_ajax_flats');
add_action('wp_ajax_ajax_flats', 'snd_ajax_flats');
