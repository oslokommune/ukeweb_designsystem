import { createApp } from 'vue';
import OdsImageCarousel from './image_carousel.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vue1')) {
    const app1 = createApp({
      components: { OdsImageCarousel },
    });
    app1.mount('#vue1');
  }
  if (document.getElementById('vue2')) {
    const app2 = createApp({
      components: { OdsImageCarousel },
    });
    app2.mount('#vue2');
  }
  if (document.getElementById('vue3')) {
    const app3 = createApp({
      components: { OdsImageCarousel },
    });
    app3.mount('#vue3');
  }
});
