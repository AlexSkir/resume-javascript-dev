$(document).ready(function () {

  var path = window.location.href;
  $('a.lang__link').each(function (i, elem) {
    var shortHref = elem.href.split('index.html')[0];
    if (elem.href === path || shortHref === path) {
      $(elem).addClass('lang__item_active');
    }
  });

  //console.log(navigator.userAgent)
  if (navigator.userAgent.indexOf(' UBrowser/') >= 0
    || navigator.userAgent.indexOf(' UCBrowser/') >= 0) {

    navigator.userAgent.indexOf(' UBrowser/') >= 0
      ? console.log('UBrowser: ', navigator.userAgent.indexOf(' UBrowser/') >= 0)
      : console.log('UCBrowser: ', navigator.userAgent.indexOf(' UCBrowser/') >= 0);

    $('body').addClass('UCBrowser');
  }

  if (window.CSS) {
    if (!CSS.supports("display", "grid")) {
      console.log('support grid: ', CSS.supports("display", "grid"));
      if (!CSS.supports("display", "-ms-grid")) {
        console.log('support -ms-grid: ', CSS.supports("display", "-ms-grid"));
        $('.main-block').append('<div class="left-block"></div>').append('<div class="right-block"></div>');
        $('.left-block').append($('.contact')).append($('.skills')).append($('.portfolio'));
        $('.right-block').append($('.summary')).append($('.experience')).append($('.courses')).append($('.education'));

        $(window).on('beforeprint', function () {
          $('.left-block').append($('.contact')).append($('.skills')).append($('.courses')).append($('.education'));
          $('.right-block').append($('.summary')).append($('.experience'));
        })

        $(window).on('afterprint', function () {
          $('.left-block').append($('.contact')).append($('.skills')).append($('.portfolio'));
          $('.right-block').append($('.summary')).append($('.experience')).append($('.courses')).append($('.education'));
        })

        if ($(window).width() < 800) {
          $('.left-block').append($('.contact')).append($('.summary')).append($('.experience'));
          $('.right-block').append($('.skills')).append($('.portfolio')).append($('.courses')).append($('.education'));
        }
      }
    }
  }

  $('.portfolio__item').on('click', function (e) {
    if ($(e.target).hasClass('portfolio__item-header')
      || $(e.target).hasClass('portfolio__item')
      || $(e.target).hasClass('portfolio__item-name')) {
      if ($(e.currentTarget).hasClass('portfolio_open')) {
        $(e.currentTarget).removeClass('portfolio_open');
        $(e.currentTarget).find('.portfolio__item-wrapper').removeClass('slide-in');
        $(e.currentTarget).find('.portfolio__item-wrapper').addClass('slide-out');
      } else {
        $(e.currentTarget).addClass('portfolio_open');
        $(e.currentTarget).find('.portfolio__item-wrapper').addClass('slide-in');
        $(e.currentTarget).find('.portfolio__item-wrapper').removeClass('slide-out');
      }
    }
  });
})

function fullscreenModeOn(image) {
  $('#fullscreen-image').attr('src', image);
  $('#fullscreen-mode-block').css({ 'display': 'flex' });
  if ($('#fullscreen-image').width() > $('#fullscreen-image').height()) {
    $('#fullscreen-image').addClass('fill-width');
  } else {
    $('#fullscreen-image').addClass('fill-height');
  }
}

function closeFullscreen() {
  $('#fullscreen-image').attr('src', '');;
  $('#fullscreen-image').attr('class', '');
  $('#fullscreen-mode-block').css({ 'display': 'none' });;
}