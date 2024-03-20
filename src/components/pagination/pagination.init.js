import { createApp } from 'vue';
import pagination from './pagination.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vue-pagination')) {
    const app = createApp({
      components: {
        'ods-pagination': pagination,
      },
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
    app.mount('#vue-pagination');
  }
});
