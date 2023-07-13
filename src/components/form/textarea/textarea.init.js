import Vue from 'vue';
import OsgTextarea from './textarea.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('osg-textarea-vue-1')) {
    Vue.component('osg-textarea', OsgTextarea);
    Vue({ el: '#osg-textarea-vue-1' });
  }
});
