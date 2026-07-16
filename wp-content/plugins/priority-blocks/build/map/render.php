<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$title_01 = !empty($attributes['title_01']) ? wp_kses_post($attributes['title_01']) : '';
$title_02 = !empty($attributes['title_02']) ? wp_kses_post($attributes['title_02']) : '';
$image = !empty($attributes['image']) ? (array)$attributes['image'] : [];
$map = !empty($attributes['map']) ? (array)$attributes['map'] : [];
$showMap = !empty($attributes['showMap']) ? (int)$attributes['showMap'] : 0;
$icon_baloon = SND_PRTY_BLOCKS_URL . 'assets/img/baloon.png';
?>

<section <?php echo get_block_wrapper_attributes(['id' => $id, 'class' => 'sd-map']); ?>>
	<?php if ($title_01 || $title_02) : ?>
		<div class="container">
			<h2 class="fade-in-left wow">
				<?php if ($title_01) : ?>
					<span>
						<?php echo $title_01; ?>
					</span>
				<?php endif; ?>

				<?php if ($title_02) : ?>
					<span class="fade-in-right-05 wow">
						<?php echo $title_02; ?>
					</span>
				<?php endif; ?>
			</h2>
		</div>
	<?php endif; ?>

	<div class="sd-map__wrapper">
		<div class="container">
			<?php if ($showMap) : ?>

				<?php if (!empty($map)) : ?>
					<div class="sd-contacts__map-wrapper">
						<div class="sd-contacts__map"></div>

						<?php foreach ($map as $item) : ?>
							<div
								class="map-point"
								data-coordinates="<?php echo esc_attr($item['coordinates_xy'] ?? ''); ?>"
								data-address="<?php echo esc_html($item['address'] ?? ''); ?>"
								data-icon="<?php echo esc_url(!empty($item['icon']['url']) ? $item['icon']['url'] : $icon_baloon); ?>">
							</div>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

			<?php elseif (!empty($image['url'])) : ?>
				<img
					src="<?php echo esc_url($image['url']); ?>"
					alt="<?php echo esc_attr($image['alt'] ?? ''); ?>"
					loading="lazy" />
			<?php endif; ?>

			<div class="sd-map__text">
				<?php echo !empty($content) ? $content : ''; ?>
			</div>
		</div>
	</div>
</section>