<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$link_url = !empty($attributes['link']['url']) ? esc_url($attributes['link']['url']) : 'https://гк-вместе.рф/#projects';
$link_target = !empty($attributes['link']['target']) ? '_blank' : '_self';
$title = !empty($attributes['title']) ? esc_html($attributes['title']) : '';
$description = !empty($attributes['description']) ? wp_kses_post($attributes['description']) : '';
$image = !empty($attributes['image']['url']) ? esc_url($attributes['image']['url']) : '';
?>
<a
	<?php echo get_block_wrapper_attributes([
		'id' => $id,
		'href' => $link_url,
		'target' => $link_target,
		'style' => "background-image: url($image)"
	]); ?>
>
	<?php
	if ($title) {
		echo "<h4>{$title}</h4>";
	}
	if ($description) {
		echo "<span>{$description}</span>";
	}
	?>
</a>