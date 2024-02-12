import Vue from 'vue';
import OdsCombobox from './combobox.vue';

document.addEventListener('DOMContentLoaded', () => {
  const vueElements = ['ods-combobox-vue-1', 'ods-combobox-vue-2'];

  // This is a "dummy" logic to simulate how to show the result of a search in the combobox.
  // In a real world scenario, the consumer must implement or hook into a service like Algolia.

  vueElements.forEach((element) => {
    const odsComboboxPlaceholder = document.getElementById(element);

    if (odsComboboxPlaceholder) {
      const vm = new Vue({
        components: {
          OdsCombobox,
        },
        data: () => ({
          addresses: [],
          id: `combobox-${element}`,
          inputId: `input-${element}`,
          items: [],
          listboxId: `listbox-${element}`,
          value: '',
        }),
        mounted() {
          this.event('input-change', this.value);
          this.fetchAddresses();
        },
        methods: {
          fetchAddresses() {
            if (this.items.length) {
              return;
            }
            this.items =
              element === 'ods-combobox-vue-1'
                ? [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }, { text: 'Item 4' }]
                : [
                    { text: 'Item 1', description: 'Description 1' },
                    { text: 'Item 2', description: 'Description 2' },
                    { text: 'Item 3', description: 'Description 3' },
                    { text: 'Item 4', description: 'Description 4' },
                  ];
          },
          event(event, payload) {
            // if text starts with 'm' or 'ba', it shows dropdown, otherwise it hides it
            switch (event) {
              case 'input-change':
                if (payload.length === 0 || (payload[0] && payload[0].toLowerCase() === 'i')) {
                  this.fetchAddresses();
                } else {
                  this.items = [];
                }
                if (payload[1] && payload[1].toLowerCase() !== 't') {
                  console.log('no items found');
                  this.items = [];
                }
                this.value = payload;
                break;
              case 'input-enter':
              case 'input-escape':
                this.value = payload;
                break;
              case 'item-focus':
                this.fetchAddresses();
                this.value = this.items[payload].text;
                break;
              case 'itemlist-blur':
                this.items = [];
                break;
              case 'submit':
                console.log('submit');
                break;
              default:
                console.log('event not found');
            }
          },
        },
      });
      vm.$mount(odsComboboxPlaceholder);
    }
  });
});
