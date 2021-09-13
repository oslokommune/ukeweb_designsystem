import pagination from './pagination.vue';

document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('vue-pagination1')) {
    Vue.component('osg-pagination', pagination);
    new Vue({ el: '#vue-pagination1' });
  }
});
