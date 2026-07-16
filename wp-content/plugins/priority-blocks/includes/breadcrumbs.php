<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

function snd_breadcrumbs()
{

	// получаем номер текущей страницы
	$page_num = (get_query_var('paged')) ? get_query_var('paged') : 1;
	$separator = '<span> / </span>';

	ob_start();
	// если главная страница сайта
	if (is_front_page()) {
		if ($page_num > 1) {
			echo '<a href="' . site_url() . '">Главная</a>' . $separator . '<p>' . $page_num . '-я страница </p>';
		} else {
			echo '<p>Главная страница</p>';
		}
	} else { // не главная
		echo '<a href="' . site_url() . '">Главная</a>' . $separator;
		if (is_home()) {
			$homepage_ID = get_option('page_for_posts');
			echo '<p>' . get_the_title($homepage_ID) . '</p>';
		} elseif (is_single()) { // записи
			if ($page_for_posts_id = get_option('page_for_posts')) {
				echo '<a href="' . esc_url(get_permalink($page_for_posts_id)) . '">' . get_the_title($page_for_posts_id) . '</a>' . $separator;
			}
			the_category($separator);
			echo $separator;
			the_title('<p>', '</p>');
		} elseif (is_page()) { // страницы WordPress
			the_title('<p>', '</p>');
		} elseif (is_category()) { // архивы
			if ($page_for_posts_id = get_option('page_for_posts')) {
				echo '<a href="' . esc_url(get_permalink($page_for_posts_id)) . '">' . get_the_title($page_for_posts_id) . '</a>' . $separator;
			}
			echo '<p>';
			single_cat_title();
			echo '</p>';
		} elseif (is_tag()) {
			if ($page_for_posts_id = get_option('page_for_posts')) {
				echo '<a href="' . esc_url(get_permalink($page_for_posts_id)) . '">' . get_the_title($page_for_posts_id) . '</a>' . $separator;
			}
			echo '<p>';
			single_tag_title();
			echo '</p>';
		} elseif (is_day()) { // архивы (по дням)
			if ($page_for_posts_id = get_option('page_for_posts')) {
				echo '<a href="' . esc_url(get_permalink($page_for_posts_id)) . '">' . get_the_title($page_for_posts_id) . '</a>' . $separator;
			}
			echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a>' . $separator;
			echo '<a href="' . get_month_link(get_the_time('Y'), get_the_time('m')) . '">' . get_the_time('F') . '</a>' . $separator;
			echo '<p>' . get_the_time('d') . '</p>';
		} elseif (is_month()) { // архивы (по месяцам)
			if ($page_for_posts_id = get_option('page_for_posts')) {
				echo '<a href="' . esc_url(get_permalink($page_for_posts_id)) . '">' . get_the_title($page_for_posts_id) . '</a>' . $separator;
			}
			echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a>' . $separator;
			echo '<p>' . get_the_time('F') . '</p>';
		} elseif (is_year()) { // архивы (по годам)
			if ($page_for_posts_id = get_option('page_for_posts')) {
				echo '<a href="' . esc_url(get_permalink($page_for_posts_id)) . '">' . get_the_title($page_for_posts_id) . '</a>' . $separator;
			}
			echo '<p>' . get_the_time('Y') . '</p>';
		} elseif (is_author()) { // архивы по авторам
			if ($page_for_posts_id = get_option('page_for_posts')) {
				echo '<a href="' . esc_url(get_permalink($page_for_posts_id)) . '">' . get_the_title($page_for_posts_id) . '</a>' . $separator;
			}
			global $author;
			$userdata = get_userdata($author);
			echo '<p>Опубликовал(а) ' . $userdata->display_name . '</p>';
		} elseif (is_404()) { // если страницы не существует
			echo '<p>Ошибка 404</p>';
		} elseif (is_search()) { // поиск
			echo '<p>Поиск "' . get_search_query() . '"</p>';
		} elseif (is_archive()) { // для остальных арзивных страниц
			echo '<p>';
			post_type_archive_title();
			echo '</p>';
		}

		if ($page_num > 1) { // номер текущей страницы
			echo  $separator . '<p> (' . $page_num . '-я страница)</p>';
		}
	}

	$links = ob_get_contents();
	ob_end_clean();

	echo '<div class="b-bread-crumbs"><div class="container">' . $links . '</div></div>';
}
