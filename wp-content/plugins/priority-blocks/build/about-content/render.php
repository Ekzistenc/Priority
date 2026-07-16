<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title = !empty($attributes['title']) ? wp_kses_post($attributes['title']) : '';
?>

<div <?php echo get_block_wrapper_attributes([
				'id' => $id,
				'class' => 'container',
			]); ?>>

	<?php if ($title) : ?>
		<h2 class="fade-in-left wow">
			<?php echo $title; ?>
		</h2>
	<?php endif; ?>

	<?php echo !empty($content) ? $content : ''; ?>

</div>