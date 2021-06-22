import ImageCarousel from './image_carousel.vue';

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('vue')) {
    Vue.component('osg-image-carousel', ImageCarousel);
    new Vue({ el: '#vue' });
  }
});
