import Vue from 'vue';
import { OsgInput } from './input';
import OsgInputVue from './input.vue';

document.addEventListener('DOMContentLoaded', () => {
  OsgInput();

  if (document.getElementById('osg-input-vue-1')) {
    Vue.component('osg-input', OsgInputVue);
    Vue({ el: '#osg-input-vue-1' });
  }
});
