import { createApp } from 'vue';
import OdsPagination from './pagination.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vue-pagination')) {
    const app = createApp({
      name: 'OdsPaginationApp',
      components: { OdsPagination },
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
