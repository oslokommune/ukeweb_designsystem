import Vue from 'vue';
import OdsCombobox from './combobox.vue';

document.addEventListener('DOMContentLoaded', () => {
  const vueElements = ['ods-combobox-vue-1'];

  vueElements.forEach((element) => {
    const odsComboboxPlaceholder = document.getElementById(element);

    if (odsComboboxPlaceholder) {
      const vm = new Vue({
        components: {
          OdsCombobox,
        },
        data: () => ({
          addressesURL: 'https://ukeweb-public.s3.eu-central-1.amazonaws.com/experiments/addresses/addresses.json',
          addresses: [],
          id: 'combobox_id_vue',
          inputId: 'input_id_vue',
          items: [],
          listboxId: 'listbox_id_vue',
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
            this.items = [
              {
                text: 'Maridalsveien 11',
              },
              {
                text: 'Maridalsveien 12',
              },
              {
                text: 'Maridalsveien 13',
              },
              {
                text: 'Maridalsveien 14',
              },
            ];
          },
          event(event, payload) {
            // if text starts with 'm' or 'ba', it shows dropdown, otherwise it hides it
            switch (event) {
              case 'input-change':
                if (payload.length === 0 || (payload[0] && payload[0].toLowerCase() === 'm')) {
                  this.fetchAddresses();
                } else {
                  this.items = [];
                }
                if (payload[1] && payload[1].toLowerCase() !== 'a') {
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
              case 'input-arrow-up-down':
                this.fetchAddresses();
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
