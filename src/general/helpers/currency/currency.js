const OdsCurrency = {
  format(amount, options = {}) {
    const settings = {
      locale: 'no-NO',
      // Amounts are rounded to the nearest whole krone by default, as established for calculators on www.oslo.kommune.no
      decimals: 0,
      // 'kroner', 'kr' or '' (no unit)
      unit: 'kroner',
      prefix: '',
      suffix: '',
      ...options,
    };

    // Strips all whitespace (e.g. thousand separators), see https://regex101.com/r/6cb9bd/1
    const number = typeof amount === 'string' ? Number(amount.replace(/\s/g, '').replace(',', '.')) : amount;

    if (typeof number !== 'number' || Number.isNaN(number) || !Number.isFinite(number)) {
      return '';
    }

    const formattedNumber = new Intl.NumberFormat(settings.locale, {
      minimumFractionDigits: settings.decimals,
      maximumFractionDigits: settings.decimals,
    }).format(number);

    const unit = settings.unit ? `\u00a0${settings.unit}` : '';

    return settings.prefix + formattedNumber + unit + settings.suffix;
  },
};

export default OdsCurrency;
