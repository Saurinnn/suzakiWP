//ここに追加したいJavaScript、jQueryを記入してください。
//このJavaScriptファイルは、親テーマのJavaScriptファイルのあとに呼び出されます。
//JavaScriptやjQueryで親テーマのjavascript.jsに加えて関数を記入したい時に使用します。
document.addEventListener('DOMContentLoaded', function () {
  const speedMs = 10;
  const texts = document.querySelectorAll('.announce-text');

  texts.forEach(el => {
    el.dataset.text = el.textContent.trim();
    el.textContent = '';
  });

  /* =========================
     タイピング用 Observer
  ========================= */
  const announceList = document.querySelector('.announce-list');

  if (announceList && texts.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startSequentialTyping(texts);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    });

    observer.observe(announceList);
  }

  function startSequentialTyping(elements) {
    let index = 0;
    const next = () => {
      if (index >= elements.length) return;
      startTyping(elements[index], () => {
        index++;
        next();
      });
    };
    next();
  }

  function startTyping(el, callback) {
    const str = el.dataset.text;
    el.textContent = '';
    el.classList.add('typing');

    let i = 0;
    const timer = setInterval(() => {
      if (i < str.length) {
        el.textContent += str.charAt(i);
        i++;
      } else {
        clearInterval(timer);
        el.classList.remove('typing');
        if (callback) callback();
      }
    }, speedMs);
  }

  /* =========================
     fade-in 用 Observer
  ========================= */
  const images = document.querySelectorAll(
    ".my-cover-text01, .my-cover-text02, .my-cover-text03, .my-cover-info, .my-title-area, .about-article01, .about-image-right01, .about-image-left02, .about-article02, .slide-left-text, .slide-rigit-img, .slide-left-img, .slide-right-text, .inquire-contents,.inquire-text,.inquire-button,.inquire-tel"
  );

  if (images.length > 0) {
    const observer02 = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    images.forEach(img => observer02.observe(img));
  }

  
});

/**
 * Cocoon 子テーマ用
 * トップへ戻る / 目次へ戻る
 * jQuery noConflict / DOM後生成 / 存在チェック 対応版
 */
jQuery(function ($) {

  /////////////////////////////////
  // 設定値
  /////////////////////////////////
  var THRESHOLD = 600; // 表示切り替えスクロール量(px)

  /////////////////////////////////
  // 変数
  /////////////////////////////////
  var prevScrollTop = -1;
  var $win = $(window);
  var $body = $('body');

  /////////////////////////////////
  // スクロール監視
  /////////////////////////////////
  $win.on('scroll', function () {

    var scrollTop = $win.scrollTop();
    var s1 = prevScrollTop > THRESHOLD;
    var s2 = scrollTop > THRESHOLD;

    // スレッショルドを跨いだ時のみ処理
    if (s1 !== s2) {

      if (s2) {
        // トップへ戻るボタン表示
        $body.addClass('go-to-top-visible');

      } else {
        // 非表示
        $body.removeClass('go-to-top-visible');
        $('.go-to-top-common').removeClass('go-to-top-up');
      }
    }

    prevScrollTop = scrollTop;
  });

  /////////////////////////////////
  // トップへ戻るボタン
  /////////////////////////////////
  $(document).on('click', '.go-to-top-common', function (e) {
    e.preventDefault();

    $(this).addClass('go-to-top-up');

    $('html, body').animate(
      { scrollTop: 0 },
      800
    );
  });

  /////////////////////////////////
  // 目次へ戻るボタン
  /////////////////////////////////
  $(document).on('click', '.go-to-toc-common', function (e) {
    e.preventDefault();

    var $toc = $('.entry-content .toc');

    // 目次が存在する場合のみ処理
    if ($toc.length) {
      $('html, body').animate(
        { scrollTop: $toc.offset().top },
        800
      );
    }
  });

});

jQuery(function ($) {

  /////////////////////////////////
  // TOPへ戻るボタン
  /////////////////////////////////
  var prevScrollTop = -1;
  var $window = $(window);

  $window.on('scroll', function () {
    var scrollTop = $window.scrollTop();
    var threshold = 600;

    var s1 = (prevScrollTop > threshold);
    var s2 = (scrollTop > threshold);

    if (s1 ^ s2) {
      if (s2) {
        $('body').addClass('go-to-top-visible');
      } else {
        $('.go-to-top-common').removeClass('go-to-top-up');
        $('body').removeClass('go-to-top-visible');
      }
    }
    prevScrollTop = scrollTop;
  });

  $('.go-to-top-common').on('click', function () {
    $(this).addClass('go-to-top-up');
    $('html, body').animate({ scrollTop: 0 }, 800);
  });

  $('.go-to-toc-common').on('click', function () {
    const toc = $('.entry-content .toc');
    if (toc.length) {
      $('html, body').animate({
        scrollTop: toc.offset().top
      }, 800);
    }
  });

});
