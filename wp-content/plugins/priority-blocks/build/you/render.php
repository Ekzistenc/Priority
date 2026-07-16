<?php
$title     = ! empty( $attributes['title'] ) ? wp_kses_post( $attributes['title'] ) : '';
$you_list  = ! empty( $attributes['youList'] ) && is_array( $attributes['youList'] ) ? $attributes['youList'] : [];
$image_url = ! empty( $attributes['image_url'] ) ? esc_url( $attributes['image_url'] ) : '';
$image_alt = ! empty( $attributes['image_alt'] ) ? esc_attr( $attributes['image_alt'] ) : '';
$video_url = ! empty( $attributes['video']['url'] ) ? esc_url( $attributes['video']['url'] ) : '';
$poster_url = ! empty( $attributes['video']['poster']['url'] ) ? esc_url( $attributes['video']['poster']['url'] ) : '';
?>

<section <?php echo get_block_wrapper_attributes( [ 'class' => 'sd-you' ] ); ?>>
	<div class="container">
		<?php if ( $title ) : ?>
			<h2><?php echo $title; ?></h2>
		<?php endif; ?>

		<div class="sd-you__wrapper">
			<?php if ( $video_url ) : ?>
				<a class="glightbox5" href="<?php echo $video_url; ?>">
					<?php if ( $poster_url ) : ?>
						<img src="<?php echo $poster_url; ?>" loading="lazy" alt="">
					<?php else : ?>
						<div class="sd-you__poster-placeholder"></div>
					<?php endif; ?>
				</a>
			<?php else : ?>
				<div></div>
			<?php endif; ?>

			<?php if ( $you_list ) : ?>
				<ul class="sd-you__ul">
					<?php foreach ( $you_list as $index => $item ) : ?>
						<?php
						switch ( $index % 3 ) {
							case 0:
								$fade_class = 'fade-in-right';
								break;
							case 1:
								$fade_class = 'fade-in-right-05';
								break;
							default:
								$fade_class = 'fade-in-right-1';
								break;
						}
						?>
						<li class="<?php echo esc_attr( $fade_class ); ?> wow">
							<?php echo wp_kses_post( $item ); ?>
						</li>
					<?php endforeach; ?>
				</ul>
			<?php endif; ?>
		</div>
	</div>

	<?php if ( $image_url ) : ?>
		<img src="<?php echo $image_url; ?>" alt="<?php echo $image_alt; ?>" loading="lazy">
	<?php endif; ?>
</section>
