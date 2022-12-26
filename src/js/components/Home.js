import { templates, select, settings } from '../settings.js';
import utils from '../utils.js';
import app from '../app.js';
import Carousel from './Carousel.js';

class Home {
  constructor(element) {
    const thisHome = this;
    thisHome.element = element;
    thisHome.render(element);
    thisHome.initData();
    thisHome.initLinks();
  }
  render(element) {
    const thisHome = this;
    thisHome.dom = {};
    /* generate HTML based on temlate */
    const generatedHTML = templates.home();
    /* find home container */
    thisHome.dom.wrapper = element;
    /* add HTML to home container */
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }
  renderGallery(element) {
    const thisHome = this;
    /* generate HTML based on template */
    const generatedHTML = templates.homeGalleryImage(element);
    /* create element using utils.createElementFromHTML */
    thisHome.galleryImage = utils.createDOMFromHTML(generatedHTML);
    /* find gallery container */
    const galleryContainer = document.querySelector(select.home.gallery);
    /* add element to gallery */
    galleryContainer.appendChild(thisHome.galleryImage);
  }
  initData() {
    const thisHome = this;
    const urls = {
      galleryImages: settings.db.url + '/' + settings.db.homeGalleryImages,
      reviews: settings.db.url + '/' + settings.db.reviews,
    };
    thisHome.galleryImages = {};
    thisHome.reviews = {};
    Promise.all([fetch(urls.galleryImages), fetch(urls.reviews)])
      .then(function (allResponses) {
        const galleryImagesResponse = allResponses[0];
        const reviewsResponse = allResponses[1];
        return Promise.all([galleryImagesResponse.json(), reviewsResponse.json()]);
      })
      .then(function ([galleryImages, reviews]) {
        thisHome.galleryImages = galleryImages;
        thisHome.reviews = reviews;
        thisHome.initGallery();
        thisHome.initReviews(reviews);
      });
  }
  initGallery() {
    const thisHome = this;
    for (let image of thisHome.galleryImages) {
      thisHome.renderGallery(image);
    }
  }
  initLinks() {
    const thisHome = this;
    thisHome.orderLinks = document.querySelectorAll(select.home.orderLinks);
    for (let link of thisHome.orderLinks) {
      link.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();
        /* get page id from href attribute */
        const id = clickedElement.getAttribute('href').replace('#', '');
        /* run app.activatePage with that id */
        app.activatePage(id);
        /* change URL hash */
        window.location.hash = '#/' + id;
      });
    }
  }
  initReviews() {
    const thisHome = this;
    new Carousel(thisHome.reviews);
  }
}
export default Home;
