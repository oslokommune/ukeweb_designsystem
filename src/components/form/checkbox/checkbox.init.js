import Vue from 'vue';
import OdsCheckbox from './checkbox.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('ods-checkbox-vue-1')) {
    Vue.component('ods-checkbox', OdsCheckbox);
    const vm = new Vue();
    vm.$mount('#ods-checkbox-vue-1');
  }
});
