import Vue from 'vue';
import OdsImageCarousel from './image_carousel.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vue1')) {
    Vue.component('ods-image-carousel', OdsImageCarousel);
    const vm1 = new Vue();
    vm1.$mount('#vue1');
  }
  if (document.getElementById('vue2')) {
    Vue.component('ods-image-carousel', OdsImageCarousel);
    const vm2 = new Vue();
    vm2.$mount('#vue2');
  }
  if (document.getElementById('vue3')) {
    Vue.component('ods-image-carousel', OdsImageCarousel);
    const vm3 = new Vue();
    vm3.$mount('#vue3');
  }
});
