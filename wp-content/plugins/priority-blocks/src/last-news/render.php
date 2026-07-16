<?php
$title = !empty($attributes['title']) ? wp_kses_post($attributes['title']) : '';
$button = !empty($attributes['button']) ? $attributes['button'] : [];
$count = !empty($attributes['count']) ? absint($attributes['count']) : 3;
$anchor = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$category = !empty($attributes['category']) ? esc_attr($attributes['category']) : '';

$category_link = '#';
if ($category) {
	$term = get_category_by_slug($category);

	if ($term) {
		$category_link = get_category_link($term->term_id);
	}
}

$posts_page_id = absint(get_option('page_for_posts'));
$posts_page_link = $posts_page_id ? get_permalink($posts_page_id) : '';

$get_posts_args = [
	'posts_per_page' => $count,
	'post_type' => 'post',
	'exclude' => is_single() ? get_the_ID() : ''
];

if ($category) {
	$get_posts_args['category_name'] = $category;
}

$get_posts = get_posts($get_posts_args);

?>

<section <?php echo get_block_wrapper_attributes(['id' => $anchor, 'class' => 'sd-news']); ?>>
	<div class="container">
		<?php if ($title) : ?>
			<h2><?php echo $title; ?></h2>
		<?php endif; ?>

		<?php if ($get_posts) : ?>
			<?php global $post; ?>
			<div class="sd-news__grid">
				<?php foreach ($get_posts as $post) : ?>
					<?php
					setup_postdata($post);
					$post_id = get_the_ID();
					$post_url = get_permalink();
					$post_title = get_the_title();
					$post_thumbnail = get_the_post_thumbnail($post_id, 'large', ['alt' => esc_attr($post_title)]);
					?>
					<a href="<?php echo esc_url($post_url); ?>" class="sd-news__card">
						<?php echo $post_thumbnail ?: '<div class="no-thumb"></div>'; ?>

						<?php if ($post_title): ?>
							<p><?php echo esc_html($post_title) ?></p>
						<?php endif; ?>
					</a>
				<?php endforeach; ?>
			</div>
			<?php wp_reset_postdata(); ?>
		<?php else : ?>
			<p style="margin-bottom: 60px;">Записи отсутствуют</p>
		<?php endif; ?>

		<?php if ($button && !empty($button['show'])) : ?>
			<?php
			$button_text = !empty($button['text']) ? esc_html($button['text']) : 'Смотреть все новости';
			$should_render_button = !empty($category) || !empty($posts_page_id);
			$computed_button_link = !empty($category) ? $category_link : ($posts_page_link ?: '#');
			$button_link = !empty($button['link']) ? esc_url($button['link']) : $computed_button_link;
			$button_target = !empty($button['target']) ? '_blank' : '_self';
			$button_classes = 'sd-news__lik';

			if (!empty($button['modal'])) {
				$button_link = '#';
				$button_target = '_self';
				$button_classes .= ' sd-modal-link';
			} else {
				$button_classes .= ' sd-button-link';
			}
			?>
			<?php if ($should_render_button) : ?>
			<a
				href="<?php echo esc_url($button_link); ?>"
				target="<?php echo esc_attr($button_target); ?>"
				class="<?php echo esc_attr($button_classes); ?>"><?php echo $button_text; ?></a>
			<?php endif; ?>
		<?php endif; ?>
	</div>
</section>