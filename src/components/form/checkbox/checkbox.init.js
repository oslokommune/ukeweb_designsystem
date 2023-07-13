import Vue from 'vue';
import OsgCheckbox from './checkbox.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('osg-checkbox-vue-1')) {
    Vue.component('osg-checkbox', OsgCheckbox);
    Vue({ el: '#osg-checkbox-vue-1' });
  }
});
