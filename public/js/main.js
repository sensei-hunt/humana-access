/* Homepage interactions: carousel */
(function () {
  'use strict';

  var carousel = document.getElementById('carousel');
  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('.slide'));
    var index = 0;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        s.classList.toggle('is-active', n === index);
      });
    }

    var nextBtn = carousel.querySelector('.carousel-arrow.next');
    var prevBtn = carousel.querySelector('.carousel-arrow.prev');
    if (nextBtn) nextBtn.addEventListener('click', function () { show(index + 1); });
    if (prevBtn) prevBtn.addEventListener('click', function () { show(index - 1); });
  }
})();
