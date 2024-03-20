import { createApp } from 'vue';
import OdsDate from './date.vue';

document.addEventListener('DOMContentLoaded', () => {
  const odsDatePlaceholderElements = ['ods-date-vue', 'ods-date-vue-dev'];
  odsDatePlaceholderElements.forEach((elementName) => {
    const odsDatePlaceholder = document.getElementById(elementName);
    if (odsDatePlaceholder) {
      const app = createApp({
        name: 'OdsDateApp',
        components: {
          OdsDate,
        },
        data: () => ({
          date: null,
          minDate: new Date('2022-10-01'),
          maxDate: new Date('2025-10-15'),
        }),

        computed: {
          displayDate() {
            if (this.date) {
              const day = this.date.getDate() > 9 ? this.date.getDate() : `0${this.date.getDate()}`;
              const month = this.date.getMonth() + 1 > 9 ? this.date.getMonth() + 1 : `0${this.date.getMonth() + 1}`;
              const year = this.date.getFullYear();

              return `${day}.${month}.${year}`;
            }
            return null;
          },
        },

        methods: {
          setDate(date) {
            this.date = date;
          },
        },
      });
      app.mount(odsDatePlaceholder);
    }
  });
});
