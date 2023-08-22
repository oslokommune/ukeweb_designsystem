import Vue from 'vue';
import pagination from './pagination.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vue-pagination')) {
    Vue.component('ods-pagination', pagination);
    const vm = new Vue({
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
    vm.$mount('#vue-pagination');
  }
});
