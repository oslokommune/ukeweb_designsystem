import Vue from 'vue';
import OdsMap from '../../map/map.vue';
import contactbox from './contactbox';
import OdsBreakpoints from '../../../general/breakpoints/breakpoints';

const contactboxInit = {
  init() {
    window.addEventListener('OdsBreakpointChange', this.breakpointChange, false);
    this.breakpointChange({ detail: { breakpoint: OdsBreakpoints.getBreakpoint() } });
  },

  breakpointChange(e) {
    const { breakpoint } = e.detail;

    if (breakpoint === 'small') {
      contactbox.addCollapse();
    } else {
      contactbox.removeCollapse();
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const mapElement = document.getElementById('ods-contactbox-custom-content-map');

  if (mapElement) {
    Vue.component('ods-map', OdsMap);
    const vm = new Vue();
    vm.$mount(mapElement);
  }

  contactboxInit.init();
});
