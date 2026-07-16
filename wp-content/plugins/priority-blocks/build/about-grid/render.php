<?php
$id = !empty($attributes['anchor']) ? esc_attr($attributes['anchor']) : '';
$projects = !empty($attributes['projects']) ? (array)$attributes['projects'] : [];
?>

<div <?php echo get_block_wrapper_attributes(['id' => $id, 'class' => 'sd-about__grid']); ?>>
	<?php foreach ($projects as $project) : ?>
		<?php
		$project_link_url = !empty($project['link']['url']) ? esc_url($project['link']['url']) : 'https://гк-вместе.рф/#projects';
		$project_link_target = !empty($project['link']['target']) ? esc_attr($project['link']['target']) : '';
		$project_title = !empty($project['title']) ? wp_kses_post($project['title']) : '';
		$project_description = !empty($project['description']) ? wp_kses_post($project['description']) : '';
		$project_image = !empty($project['image']['url']) ? esc_url($project['image']['url']) : '';
		?>
		<a href="<?php echo $project_link_url; ?>" target="<?php echo $project_link_target; ?>" style="background-image: url('<?php echo $project_image; ?>')">
			<?php
			if ($project_title) {
				echo "<h4>{$project_title}</h4>";
			}
			if ($project_description) {
				echo "<span>{$project_description}</span>";
			}
			?>
		</a>
	<?php endforeach; ?>

</div>