import dispatchCustomEvent from '../../utils/js/events/dispatchCustomEvent';

let previousBreakpoint = null;
const OsgBreakpoints = {
  init() {
    window.addEventListener('resize', OsgBreakpoints.emitWindowSizeIfChanged);
    OsgBreakpoints.emitWindowSizeIfChanged();
  },

  unbind() {
    window.removeEventListener('resize', OsgBreakpoints.emitWindowSizeIfChanged);
  },

  emitWindowSizeIfChanged() {
    const currentBreakpoint = OsgBreakpoints.getBreakpoint();
    const eventData = {
      width: window.innerWidth,
      height: window.innerHeight,
      breakpoint: currentBreakpoint,
    };

    if (currentBreakpoint !== previousBreakpoint) {
      previousBreakpoint = currentBreakpoint;
      dispatchCustomEvent('OsgBreakPointChange', eventData, window);
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

export default OsgBreakpoints;
