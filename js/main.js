$(function() {
  $('.deals-slider').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-circle-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-circle-chevron-right"></i></i></button>',
  });
})