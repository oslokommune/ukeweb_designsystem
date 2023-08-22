import Vue from 'vue';
import OsgTextarea from './textarea.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('ods-textarea-vue-1')) {
    Vue.component('ods-textarea', OsgTextarea);
    const vm = new Vue();
    vm.$mount('#ods-textarea-vue-1');
  }
});
