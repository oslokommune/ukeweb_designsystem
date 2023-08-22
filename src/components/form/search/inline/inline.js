import Vue from 'vue';
import OsgSearchInline from './inline.vue';

function OsgSearchVue() {
  const vueElements = ['osg-search-inline-vue-1', 'osg-search-inline-vue-2'];
  vueElements.forEach((element) => {
    const osgSearchPlaceholder = document.getElementById(element);
    if (osgSearchPlaceholder) {
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
      vm.$mount(osgSearchPlaceholder);
    }
  });
}

export default OsgSearchVue;
