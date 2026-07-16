<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
?>

<section <?php echo get_block_wrapper_attributes([
						'id' => $id,
						'class' => 'sd-about',
					]); ?>>

		<?php echo !empty($content) ? $content : ''; ?>
</section>