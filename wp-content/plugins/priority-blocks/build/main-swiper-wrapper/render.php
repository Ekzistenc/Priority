<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
?>

<main <?php echo get_block_wrapper_attributes([
	'id' => $id,
	'class' => 'sd-main-slider',
]); ?>>


	<div class="swiper swiper-main">
		<div class="swiper-wrapper">
			<?php echo !empty($content) ? $content : ''; ?>
		</div>

		<div class="swiper-pagination-main swiper-pagination"></div>
	</div>
</main>