import Vue from 'vue';
import OsgCheckbox from './checkbox.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('osg-checkbox-vue-1')) {
    Vue.component('osg-checkbox', OsgCheckbox);
    const vm = new Vue();
    vm.$mount('#osg-checkbox-vue-1');
  }
});
