import Vue from 'vue';
import OsgInput from './input';
import OsgInputVue from './input.vue';

document.addEventListener('DOMContentLoaded', () => {
  OsgInput();

  if (document.getElementById('ods-input-vue-1')) {
    Vue.component('ods-input', OsgInputVue);
    const vm = new Vue();
    vm.$mount('#ods-input-vue-1');
  }
});
