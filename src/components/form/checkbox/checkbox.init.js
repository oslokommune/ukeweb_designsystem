import { createApp } from 'vue';
import OdsCheckbox from './checkbox.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('ods-checkbox-vue-1')) {
    const app = createApp({
      name: 'OdsCheckboxApp',
      components: {
        OdsCheckbox,
      },
    });
    app.mount('#ods-checkbox-vue-1');
  }
});
