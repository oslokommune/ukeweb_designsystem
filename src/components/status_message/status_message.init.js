import { createApp } from 'vue';
import OdsStatusMessage from './status_message.vue';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[id^="ods-status-message-vue"]').forEach((element, index) => {
    if (!element.querySelector('ods-status-message')) {
      return;
    }

    const app = createApp({
      name: `OdsStatusMessageApp${index + 1}`,
      components: {
        OdsStatusMessage,
      },
    });

    app.mount(element);
  });
});
