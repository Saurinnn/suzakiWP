<?php //子テーマ用関数
if ( !defined( 'ABSPATH' ) ) exit;

//子テーマ用のビジュアルエディタースタイルを適用
add_editor_style();

//以下に子テーマ用の関数を書く
function my_front_page_styles() {
  if ( is_front_page() ) {
    wp_enqueue_style(
      'child-front-page', // ハンドル名
      get_stylesheet_directory_uri() . '/front-page.css',
      array(), // 親や子テーマのCSSを依存関係にするなら array('child-style')
      filemtime( get_stylesheet_directory() . '/front-page.css' ) // 更新日時をバージョンに
    );
  }
}
add_action( 'wp_enqueue_scripts', 'my_front_page_styles' );

function cocoon_child_enqueue_page_faq_style() {

  if (is_page('faq')) {

    wp_enqueue_style(
      'cocoon-child-page-faq',
      get_stylesheet_directory_uri() . '/page-faq.css',
      array('cocoon-child-style'),
      filemtime(get_stylesheet_directory() . '/page-faq.css')
    );

  }
}

add_action('wp_enqueue_scripts', 'cocoon_child_enqueue_page_faq_style');