import { createApp } from 'vue';
import OdsSearchInline from './inline.vue';

function OdsSearchVue() {
  const vueElements = ['ods-search-inline-vue-1', 'ods-search-inline-vue-2'];
  vueElements.forEach((element) => {
    const odsSearchPlaceholder = document.getElementById(element);
    if (odsSearchPlaceholder) {
      const app = createApp({
        name: 'OdsSearchInlineApp',
        components: {
          OdsSearchInline,
        },
        data: () => ({
          value: 'h',
          items: [],
        }),
        mounted() {
          this.event('input-change', this.value);
        },
        methods: {
          event(event, payload) {
            if (event === 'input-change') {
              if (payload[0] && payload[0].toLowerCase() === 'h') {
                this.items = [
                  {
                    text: 'Hi',
                  },
                  {
                    text: 'Hello',
                  },
                  {
                    text: 'Halo',
                    subtext: 'Greetings',
                  },
                ];
              } else {
                this.items = [];
              }
              this.value = payload;
            } else if (event === 'item-focus') {
              this.value = this.items[payload].text;
            } else if (event === 'itemlist-blur') {
              this.items = [];
            }
          },
        },
      });
      app.mount(odsSearchPlaceholder);
    }
  });
}

export default OdsSearchVue;
