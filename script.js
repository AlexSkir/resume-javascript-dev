function makeMonth(text) {
  const lang = $('html').attr('lang');
  if (!lang) {
    return
  }
  const monthNamesEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthNamesRU = ['Январь', 'Февраль', 'Март', 'Апрель',
    'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  return lang === 'en' ? monthNamesEN.indexOf(text) : monthNamesRU.indexOf(text);
}

function countExp(time) {
  const lang = $('html').attr('lang');
  if (!lang) {
    return
  }
  const months = Math.floor(time / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));
  const resultEN =
    years ?
      months ?
        `${years} ${years > 1 ? 'years' : 'year'} and ${months - years * 12} ${months - years * 12 > 1 ? 'months' : 'month'}`
        : 'less than 1 month'
      : `${months} ${months > 1 ? 'months' : 'month'}`

  const resultRU =
    years ?
      months ?
        `${years} ${years > 1 ?
          years > 4 ?
            'лет'
            : 'года'
          : 'год'} и ${months - years * 12} ${months - years * 12 > 1 ?
            months - years * 12 > 4 ? 'месяцев' : 'месяца' : 'месяц'}`
        : 'меньше 1 месяца'
      : `${months} ${months > 1 ?
        months > 4 ?
          'месяцев'
          : 'месяца'
        : 'месяц'}`
  return lang == 'en' ? resultEN : resultRU;
}

function makeDate(item) {
  let end, end_day, end_month, end_year;
  if ($(item).find('.date_end').text() == 'Today' || $(item).find('.date_end').text() == 'наст. вр.') {
    end_day = new Date().getDate();
    end_month = new Date().getMonth();
    end_year = new Date().getFullYear();
  } else {
    end = $(item).find('.date_end').text().split(' ');
    end_day = 28;
    end_month = makeMonth(end[0]);
    end_year = end[1]
  }

  const start = $(item).find('.date_start').text().split(' ');
  const start_month = makeMonth(start[0]);
  const start_date = new Date(start[1], start_month, 1);

  const end_date = new Date(end_year, end_month, end_day);

  const result = {
    total_time: end_date - start_date,
    total_html: countExp(end_date - start_date)
  }
  return result
}

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

$(document).ready(() => {

  var path = window.location.href;
  $('a.lang__link').each((i, elem) => {
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

        $(window).on('beforeprint', () => {
          $('.left-block').append($('.contact')).append($('.skills')).append($('.courses')).append($('.education'));
          $('.right-block').append($('.summary')).append($('.experience'));
        })

        $(window).on('afterprint', () => {
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

  $('.portfolio__item').on('click', (e) => {
    if ($(e.target).hasClass('portfolio__item-header')
      || $(e.target).hasClass('portfolio__item')
      || $(e.target).hasClass('portfolio__item-name')) {
      $(e.currentTarget).toggleClass('portfolio_open');
    }
  });

  $('#total_work_exp').html(() => {
    const total_dates = $('.experience__dates')
      .map((i, el) => {
        if (makeDate(el).total_html) {
          $(el).find('.total_work_exp_item').html(' (' + makeDate(el).total_html + ')')
        }
        return makeDate(el)
      })
      .toArray()
      .reduce((acc, cur) => acc + cur.total_time, 0);
    return countExp(total_dates)
  })
})
