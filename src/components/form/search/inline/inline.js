import Vue from 'vue';
import OsgSearchInline from './inline.vue';

function OsgSearchVue() {
  const vueElements = ['ods-search-inline-vue-1', 'ods-search-inline-vue-2'];
  vueElements.forEach((element) => {
    const odsSearchPlaceholder = document.getElementById(element);
    if (odsSearchPlaceholder) {
      const vm = new Vue({
        components: {
          OsgSearchInline,
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
      vm.$mount(odsSearchPlaceholder);
    }
  });
}

export default OsgSearchVue;
