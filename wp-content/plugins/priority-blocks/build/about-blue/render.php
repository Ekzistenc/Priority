<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title = !empty($attributes['title']) ? wp_kses_post($attributes['title']) : '';
$subtitle = !empty($attributes['subtitle']) ? wp_kses_post($attributes['subtitle']) : '';
?>

<div <?php echo get_block_wrapper_attributes(['id' => $id, 'class' => 'sd-about__blue-block']); ?>>
	<div class="container">
		<?php if ($title) : ?>
			<h3><?php echo $title; ?></h3>
			<?php endif; ?>

			<?php if ($subtitle) : ?>
				<h4 class="fade-in-right wow"><?php echo $subtitle; ?></h4>
			<?php endif; ?>
	</div>
</div>