let previousBreakpoint = null;
const OdsBreakpoints = {
  init() {
    window.addEventListener('resize', OdsBreakpoints.emitWindowSizeIfChanged);
    OdsBreakpoints.emitWindowSizeIfChanged();
  },

  unbind() {
    window.removeEventListener('resize', OdsBreakpoints.emitWindowSizeIfChanged);
  },

  emitWindowSizeIfChanged() {
    const data = {
      detail: {
        width: window.innerWidth,
        height: window.innerHeight,
        breakpoint: OdsBreakpoints.getBreakpoint(),
      },
    };

    if (data.detail.breakpoint !== previousBreakpoint) {
      previousBreakpoint = data.detail.breakpoint;
      window.dispatchEvent(new CustomEvent('OdsBreakpointChange', data));
    }
  },

  getBreakpoint() {
    if (window.innerWidth < 769) {
      return 'small';
    }
    if (window.innerWidth < 1024) {
      return 'medium';
    }
    return 'large';
  },
};

export default OdsBreakpoints;
