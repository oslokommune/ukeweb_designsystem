/**
 * If a component needs javascript keep in mind that javascript is run on all pages.
 * This makes it important to test for presence of HTML elements of which the javascript
 * is often bound to or querying for.
 *
 * Wrap the javascript in a DOMContentLoaded listener to make sure all the markup is loaded
 * before the script runs.
 */
import { createApp } from 'vue';
import OdsExampleComponent from './component.vue';

document.addEventListener('DOMContentLoaded', () => {
  const exampleComponent = document.getElementById('ods-example-component-vue');
  if (exampleComponent) {
    const app = createApp({
      name: 'OdsExampleComponentApp',
      components: {
        OdsExampleComponent,
      },
    });
    app.mount(exampleComponent);
  }
});
