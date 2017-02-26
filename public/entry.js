require('./less/common.less');
var Masonry = require('masonry-layout');

const openPage = page => {
  // const page = $(pageName).parents('.page');

  if (!page.length || page.hasClass('active') || page.hasClass('single')) {
    return;
  }

  $('.page').removeClass('active');
  page.addClass('active');
  window.location.hash = page.data('page');

  event.preventDefault();
}

$(document).on('click', '.page', event => {
  openPage($(event.target).parents('.page'));
});

if (window.location.hash) {
  const pageName = window.location.hash.substr(1);
  // debugger;
  openPage($('.page.' + pageName));
}


const initM = () => {
  setTimeout(() => {
    const elem = document.querySelector('.articles');
    if (elem) {
      var msnry = new Masonry(elem, {
        itemSelector: '.article',
        columnWidth: '.article-sizer',
        percentPosition: true
      });
    }
  }, 100)
}
$(document).ready(initM)