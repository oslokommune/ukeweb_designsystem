import dispatchCustomEvent from '../../utils/js/events/dispatchCustomEvent';

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
    const currentBreakpoint = OdsBreakpoints.getBreakpoint();
    const eventData = {
      width: window.innerWidth,
      height: window.innerHeight,
      breakpoint: currentBreakpoint,
    };

    if (currentBreakpoint !== previousBreakpoint) {
      previousBreakpoint = currentBreakpoint;
      dispatchCustomEvent('OdsBreakPointChange', eventData, window);
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
