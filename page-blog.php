<?php
/**
 * Cocoon WordPress Theme
 * @author: yhira
 * @link: https://wp-cocoon.com/
 * @license: http://www.gnu.org/licenses/gpl-2.0.html GPL v2 or later
 */
if ( !defined( 'ABSPATH' ) ) exit;
get_header();
?>

<article class="news-archive">

  <!-- ▼ 見出し ▼ -->
  <header class="news-archive__header">
    <h2 class="news-archive__title">NEWS</h2>
  </header>
  <!-- ▲ 見出し ▲ -->

  <?php
  // 現在のページ番号
  $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

  // 投稿クエリ
  $args = array(
    'post_type'      => 'post',
    'posts_per_page' => 5,
    'paged'          => $paged,
    'orderby'        => 'date',
    'order'          => 'DESC'
  );

  $the_query = new WP_Query($args);
  ?>

  <!-- ▼ 記事一覧 ▼ -->
  <section class="news-archive__list-wrapper">

    <ul class="news-archive__list">
      <?php if ($the_query->have_posts()) : ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post(); ?>
          <li class="news-archive__item">
            <a href="<?php the_permalink(); ?>" class="news-archive__link">
              <time class="news-archive__date" datetime="<?php echo get_the_date('Y-m-d'); ?>">
                <?php the_time('Y/n/j'); ?>
              </time>
              <span class="news-archive__text">
                <?php the_title(); ?>
              </span>
            </a>
          </li>
        <?php endwhile; ?>
      <?php else : ?>
        <li class="news-archive__item news-archive__item--empty">
          お探しの記事はありませんでした
        </li>
      <?php endif; ?>
    </ul>

  </section>
  <!-- ▲ 記事一覧 ▲ -->

  <!-- ▼ ページネーション ▼ -->
  <nav class="news-archive__pagination">
    <?php
    if ($the_query->max_num_pages > 1) {
      echo paginate_links(array(
        'base'      => get_pagenum_link(1) . '%_%',
        'format'    => 'page/%#%/',
        'current'   => max(1, $paged),
        'total'     => $the_query->max_num_pages,
        'mid_size'  => 1,
        'prev_text' => '«',
        'next_text' => '»',
      ));
    }
    ?>
  </nav>
  <!-- ▲ ページネーション ▲ -->

  <?php wp_reset_postdata(); ?>

</article>

<?php get_footer(); ?>
