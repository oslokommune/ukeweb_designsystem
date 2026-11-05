import { createApp } from 'vue';
import OdsImageCarousel from './image_carousel.vue';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[id^="vue"]').forEach((element, index) => {
    if (!element.querySelector('ods-image-carousel')) {
      return;
    }

    const app = createApp({
      name: `OdsImageCarouselApp${index + 1}`,
      components: { OdsImageCarousel },
    });

    app.mount(element);
  });
});
