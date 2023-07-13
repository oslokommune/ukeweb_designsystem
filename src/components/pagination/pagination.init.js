import Vue from 'vue';
import pagination from './pagination.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vue-pagination')) {
    Vue.component('osg-pagination', pagination);
    Vue({
      el: '#vue-pagination',
      data: () => ({
        currentIndex: 99,
        limit: 2,
        totalPages: 160,
      }),
      methods: {
        paginate(value) {
          this.currentIndex = value;
        },
      },
    });
  }
});
