import Vue from 'vue';
import OsgImageCarousel from './image_carousel.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vue1')) {
    Vue.component('osg-image-carousel', OsgImageCarousel);
    const vm1 = new Vue();
    vm1.$mount('#vue1');
  }
  if (document.getElementById('vue2')) {
    Vue.component('osg-image-carousel', OsgImageCarousel);
    const vm2 = new Vue();
    vm2.$mount('#vue2');
  }
  if (document.getElementById('vue3')) {
    Vue.component('osg-image-carousel', OsgImageCarousel);
    const vm3 = new Vue();
    vm3.$mount('#vue3');
  }
});
