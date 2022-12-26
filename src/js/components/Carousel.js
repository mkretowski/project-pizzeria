import { templates } from '../settings.js';
import utils from '../utils.js';

class Carousel {
  constructor(element) {
    const thisCarousel = this;
    thisCarousel.initCarousel(element);
  }
  render(element) {
    const thisCarousel = this;
    /* generate HTML based on template */
    const generatedHTML = templates.carouselCell(element);
    /* create element using utils.createElementFromHTML */
    thisCarousel.element = utils.createDOMFromHTML(generatedHTML);
    /* find carousel container */
    const carouselContainer = document.querySelector('.main-carousel');
    /* add element to carousel */
    carouselContainer.appendChild(thisCarousel.element);
  }
  initCarousel(element) {
    const thisCarousel = this;
    for (let review in element) {
      thisCarousel.render(element[review]);
    }
    thisCarousel.initPlugin();
  }
  initPlugin() {
    var carousel = document.querySelector('.main-carousel');
    // eslint-disable-next-line no-undef
    var flkty = new Flickity(carousel, {
      imagesLoaded: true,
      percentPosition: false,
      wrapAround: true,
      autoPlay: true,
    });
    var imgs = carousel.querySelectorAll('.carousel-inner-cell');
    // get transform property
    var docStyle = document.documentElement.style;
    var transformProp = typeof docStyle.transform == 'string' ? 'transform' : 'WebkitTransform';

    flkty.on('scroll', function () {
      flkty.slides.forEach(function (slide, i) {
        var img = imgs[i];
        var x = ((slide.target + flkty.x) * -1) / 3;
        img.style[transformProp] = 'translateX(' + x + 'px)';
      });
    });
  }
}

export default Carousel;
