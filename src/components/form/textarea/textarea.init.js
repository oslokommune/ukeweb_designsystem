import Vue from 'vue';
import OdsTextarea from './textarea.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('ods-textarea-vue-1')) {
    Vue.component('ods-textarea', OdsTextarea);
    const vm = new Vue();
    vm.$mount('#ods-textarea-vue-1');
  }
});
