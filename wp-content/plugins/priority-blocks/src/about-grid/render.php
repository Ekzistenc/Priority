<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
?>

<div <?php echo get_block_wrapper_attributes(['id' => $id, 'class' => 'sd-about__grid']); ?>>
	<?php echo !empty($content) ? $content : ''; ?>
</div>