<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title_01 = !empty($attributes['title_01']) ? wp_kses_post($attributes['title_01']) : '';
$title_02 = !empty($attributes['title_02']) ? wp_kses_post($attributes['title_02']) : '';
$subtitle = !empty($attributes['subtitle']) ? wp_kses_post($attributes['subtitle']) : '';
$image = !empty($attributes['image']) ? (array)$attributes['image'] : [];
$imageLogo = !empty($attributes['imageLogo']) ? (array)$attributes['imageLogo'] : [];
$button = !empty($attributes['button']) ? (array)$attributes['button'] : [];

?>

<div <?php echo get_block_wrapper_attributes(['id' => $id, 'class' => 'swiper-slide']); ?>>
	<div class="sd-main" style="background-image: linear-gradient(rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.2)), url(<?php echo !empty($image['url']) ? esc_url($image['url']) : ''; ?>);">
		<div class="container">
			<?php if (!empty($imageLogo['url'])) : ?>
				<img
					src="<?php echo esc_url($imageLogo['url']); ?>"
					alt=""
					loading="lazy">
			<?php endif; ?>

			<?php
			if ($title_01 || $title_02) : ?>
				<h1>
					<span class="fade-in-left wow">
						<?php echo $title_01; ?>
					</span>
					<span class="fade-in-right-1 wow">
						<?php
						echo $title_02;
						if ($subtitle) {
							echo "<h2>{$subtitle}</h3>";
						}
						?>
					</span>
				</h1>
			<?php endif; ?>
			<a
				href="<?php echo esc_url($button['href']); ?>"
				target="<?php echo !empty($button['target']) ? '_blank' : '_self'; ?>"
				class="sd-main-link">
				<?php echo esc_html($button['name']); ?>
			</a>
		</div>
	</div>
</div>