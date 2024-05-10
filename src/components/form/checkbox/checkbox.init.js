import { createApp } from 'vue';
import OdsCheckbox from './checkbox.vue';
import OdsCheckboxEvents from './checkboxEvents';

document.addEventListener('DOMContentLoaded', () => {
  const checkboxElement = document.getElementById('ods-checkbox-vue-1');

  if (checkboxElement) {
    const app = createApp({
      name: 'OdsCheckboxApp',
      components: {
        OdsCheckbox,
      },
    });
    app.mount(checkboxElement);
  }
});
