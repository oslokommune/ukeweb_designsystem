import { createApp } from 'vue';
import OdsInput from './input';
import OdsInputVue from './input.vue';

document.addEventListener('DOMContentLoaded', () => {
  OdsInput.init();

  if (document.getElementById('ods-input-vue-1')) {
    const app = createApp({
      components: {
        OdsInput,
      },
    });
    app.mount('#ods-input-vue-1');
  }
});
