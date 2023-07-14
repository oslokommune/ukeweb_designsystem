import Vue from 'vue';
import OsgMap from '../../map/map.vue';
import contactbox from './contactbox';
import OsgBreakpoints from '../../../general/breakpoints/breakpoints';

const contactboxInit = {
  init() {
    window.addEventListener('OsgBreakpointChange', this.breakpointChange, false);
    this.breakpointChange({ detail: { breakpoint: OsgBreakpoints.getBreakpoint() } });
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
  const mapElement = document.getElementById('osg-contactbox-custom-content-map');

  if (mapElement) {
    Vue.component('osg-map', OsgMap);
    Vue({ el: mapElement });
  }

  contactboxInit.init();
});
