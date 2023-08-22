import Vue from 'vue';
import OsgCheckbox from './checkbox.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('ods-checkbox-vue-1')) {
    Vue.component('ods-checkbox', OsgCheckbox);
    const vm = new Vue();
    vm.$mount('#ods-checkbox-vue-1');
  }
});
