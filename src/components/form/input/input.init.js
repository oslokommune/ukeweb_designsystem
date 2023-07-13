import Vue from 'vue';
import { OsgInput } from './input.js';
import OsgInputVue from './input.vue';

document.addEventListener('DOMContentLoaded', () => {
  OsgInput();

  if (document.getElementById('osg-input-vue-1')) {
    Vue.component('osg-input', OsgInputVue);
    new Vue({ el: '#osg-input-vue-1' });
  }
});
