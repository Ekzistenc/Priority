<?php
$title = !empty($attributes['title']) ? wp_kses_post($attributes['title']) : '';
$subtitle = !empty($attributes['subtitle']) ? wp_kses_post($attributes['subtitle']) : '';
$description = !empty($attributes['description']) ? wp_kses_post($attributes['description']) : '';
$table_button_text = !empty($attributes['table']['button_text']) ? esc_html($attributes['table']['button_text']) : 'Показать еще';
$table_count_el = !empty($attributes['table']['count_el']) ? absint($attributes['table']['count_el']) : 4;
$aftertext = !empty($attributes['aftertext']) ? wp_kses_post($attributes['aftertext']) : '';
$image_url = !empty($attributes['image']['url']) ? esc_url($attributes['image']['url']) : '';
$image_alt = !empty($attributes['image']['alt']) ? esc_attr($attributes['image']['alt']) : '';
$text_button = !empty($attributes['textButton']) ? esc_html($attributes['textButton']) : 'Подробнее';
$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';

$get_flats = get_posts([
	'posts_per_page' => $table_count_el,
	'post_type' => 'flats',
	'post_status' => 'publish'
]);
$all_count_flats = (int)wp_count_posts('flats')->publish;

?>

<section <?php echo get_block_wrapper_attributes(['id' => $anchor, 'class' => 'sd-layouts']); ?>>
	<div class="container">
		<?php
		if ($title) {
			echo "<h2>$title</h2>";
		}

		if ($subtitle) {
			echo "<h3 class=\"fade-in-right-05 wow\">$subtitle</h3>";
		}

		if ($description) {
			echo "<p class=\"sd-layouts__text\">$description</p>";
		}
		?>

		<?php if ($get_flats) : ?>
			<?php global $post; ?>

			<div class="sd-layouts__table">
				<div class="sd-layouts__grid">
					<?php foreach ($get_flats as $post) : ?>
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
							<?php else : ?>
								<div class="sd-layouts__image-placeholder"></div>
							<?php endif; ?>

							<?php if ($meta_snd_count_room && $meta_snd_flat_size) : ?>
								<?php echo "<h4>{$meta_snd_count_room}-к квартира {$meta_snd_flat_size}&nbsp;м<sup>2</sup></h4>"; ?>
							<?php else : ?>
								<h4><?php echo wp_kses_post($title); ?></h4>
							<?php endif; ?>

							<?php if ($content) : ?>
								<p><?php echo strip_tags($content); ?></p>
							<?php endif; ?>

							<a class="sd-modal-link-l" data-id="<?php echo $post_id; ?>">
								<?php echo $text_button; ?>
							</a>

						</div>
					<?php endforeach; ?>
				</div>

				<?php if ($all_count_flats > $table_count_el) : ?>
					<button 
						class="sd-layouts__more-button" 
						data-count="<?php echo $table_count_el; ?>" 
						data-offset="<?php echo $table_count_el; ?>"
						data-card-text-button="<?php echo $text_button; ?>"
					>
						<?php echo $table_button_text; ?>
					</button>
				<?php endif; ?>
			</div>

			<?php wp_reset_postdata(); ?>
		<?php endif; ?>

		<?php
		if ($aftertext) {
			echo "<p class=\"sd-layouts__text\">$aftertext</p>";
		}
		?>
	</div>

	<?php
	if ($image_url) {
		echo "<img src=\"$image_url\" alt=\"$image_alt\" class=\"sd-layouts__img\">";
	}
	?>
</section>

<div class="sd-modal_form">
	<div class="sd-modal__overlay_form"></div>
	<div class="sd-modal__body_form container">
		<div class="sd-modal__content_form"></div>

		<div class="sd-modal__close_form"></div>
	</div>
</div>