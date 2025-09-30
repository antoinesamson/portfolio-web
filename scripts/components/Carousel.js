import Swiper from 'swiper/bundle';

export default class Carousel {
  constructor(element) {
    this.element = element;
    this.options = {
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
      },
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };
    this.init();
  }

  init() {
    console.log('initialisation de ma composante Carousel');
    this.setOptions();
    const swiper = new Swiper(this.element, this.options, {});
  }

  setOptions() {
    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      };

      this.options.loop = true;
    }

    if ('slides' in this.element.dataset) {

      this.options.spaceBetween = 40;
      this.options.breakpoints = {
        1080: {
          slidesPerView: 2,
        },
      };
    }
  }
}
