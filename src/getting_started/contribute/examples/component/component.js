/**
 * If a component needs javascript keep in mind that javascript is run on all pages.
 * This makes it important to test for presence of HTML elements of which the javascript
 * is often bound to or querying for.
 *
 * Wrap the javascript in a DOMContentLoaded listener to make sure all the markup is loaded
 * before the script runs.
 */
import Vue from 'vue';
import OsgExampleComponent from './component.vue';

document.addEventListener('DOMContentLoaded', () => {
  const exampleComponent = document.getElementById('osg-example-component-vue');
  if (exampleComponent) {
    new Vue({
      el: exampleComponent,
      components: {
        OsgExampleComponent,
      },
    });
  }
});
