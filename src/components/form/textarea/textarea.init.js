import { createApp } from 'vue';
import OdsTextarea from './textarea.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('ods-textarea-vue-1')) {
    const app = createApp({
      components: {
        OdsTextarea,
      },
    });
    app.mount('#ods-textarea-vue-1');
  }
});
