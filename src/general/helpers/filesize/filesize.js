const OdsFileSize = {
  format(bytes, options = {}) {
    const settings = {
      locale: 'no-NO',
      // Move to the next unit when the value reaches the threshold
      threshold: 500,
      units: ['bytes', 'KB', 'MB', 'GB', 'TB'],
      ...options,
    };

    if (typeof bytes !== 'number' || Number.isNaN(bytes) || !Number.isFinite(bytes) || bytes < 0) {
      return '';
    }

    let value = bytes;
    let unitIndex = 0;
    while (value >= settings.threshold && unitIndex < settings.units.length - 1) {
      value /= 1024;
      unitIndex += 1;
    }

    // Values below 5 are shown with one decimal, values above without decimals
    const decimals = value < 5 && unitIndex > 0 ? 1 : 0;
    const formattedNumber = new Intl.NumberFormat(settings.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(value);

    let unit = settings.units[unitIndex];
    if (unitIndex === 0 && Math.round(value) === 1) {
      unit = 'byte';
    }

    return `${formattedNumber}\u00a0${unit}`;
  },
};

export default OdsFileSize;
