import { createApp } from 'vue';
import OdsCheckbox from './checkbox.vue';

document.addEventListener('DOMContentLoaded', () => {
  const checkboxElement1 = document.getElementById('ods-checkbox-vue-1');
  const checkboxElement2 = document.getElementById('ods-checkbox-vue-2');

  if (checkboxElement1) {
    const app1 = createApp({
      name: 'OdsCheckboxApp',
      components: {
        OdsCheckbox,
      },
    });
    app1.mount(checkboxElement1);
  }

  if (checkboxElement2) {
    const app2 = createApp({
      name: 'OdsCheckboxApp',
      components: {
        OdsCheckbox,
      },
    });
    app2.mount(checkboxElement2);
  }
});
