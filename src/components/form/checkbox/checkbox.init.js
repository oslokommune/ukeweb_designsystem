import { createApp } from 'vue';
import OdsCheckbox from './checkbox.vue';
import OdsCheckboxEvents from './checkboxEvents';

document.addEventListener('DOMContentLoaded', () => {
  OdsCheckboxEvents.init();
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
