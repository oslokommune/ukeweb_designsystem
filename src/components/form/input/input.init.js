import Vue from 'vue';
import OdsInput from './input';
import OdsInputVue from './input.vue';

document.addEventListener('DOMContentLoaded', () => {
  OdsInput();

  if (document.getElementById('ods-input-vue-1')) {
    Vue.component('ods-input', OdsInputVue);
    const vm = new Vue();
    vm.$mount('#ods-input-vue-1');
  }
});
