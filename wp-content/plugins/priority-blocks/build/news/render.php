  <section class="sd-news">
  	<div class="container">
  		<h2><?php echo is_archive() ? get_the_archive_title() : get_the_title(); ?></h2>
  		<?php if (have_posts()) : ?>
  			<div class="sd-news__grid sd-news__grid_all">
  				<?php while (have_posts()) : ?>
  					<?php
						the_post();
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
  				<?php endwhile; ?>
  			</div>
  			<?php
				the_posts_pagination([
					'mid_size'  => 2,
					'prev_text' => '',
					'next_text' => '',
				]);
				?>
  		<?php else : ?>
  			<p>Записи отсутствуют.</p>
  		<?php endif; ?>
  	</div>
  </section>