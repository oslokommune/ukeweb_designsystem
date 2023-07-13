import Vue from 'vue';
import OsgRadiogroup from './radiogroup.vue';

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('osg-radio-vue-1')) {
    new Vue({
      el: '#osg-radio-vue-1',
      components: { OsgRadiogroup },
      data: () => ({
        selectedValue: '40',
        items: {
          20: 'Item 20',
          40: 'Item 40',
          60: 'Item 60',
        },
        fieldsetText: 'Select an option: ',
      }),
    });
  }
});
