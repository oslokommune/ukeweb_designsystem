function replaceLast(initialString, stringToReplace, replaceString) {
  const a = initialString.split('');
  const { length } = stringToReplace;
  if (initialString.lastIndexOf(stringToReplace) !== -1) {
    for (let i = initialString.lastIndexOf(stringToReplace); i < initialString.lastIndexOf(stringToReplace) + length; i += 1) {
      if (i === initialString.lastIndexOf(stringToReplace)) {
        a[i] = replaceString;
      } else {
        delete a[i];
      }
    }
  }

  return a.join('');
}

function formatDateTime(dateFrom, dateTo, dateFromOptions, dateToOptions) {
  let dateToString = '';

  let dateFromString = dateFrom.toLocaleString(dateFromOptions.locale, dateFromOptions.localeOptions);
  let timePrefix = dateFromOptions.time.prefix ? dateFromOptions.time.prefix : ' ';
  dateFromString = replaceLast(dateFromString, ', ', timePrefix);
  dateFromString = dateFromOptions.prefix + dateFromString + dateFromOptions.suffix;

  if (dateTo) {
    dateToString = dateTo.toLocaleString(dateToOptions.locale, dateToOptions.localeOptions);

    timePrefix = dateToOptions.time.prefix ? dateToOptions.time.prefix : ' ';
    dateToString = replaceLast(dateToString, ', ', timePrefix);
    dateToString = dateToOptions.prefix + dateToString + dateToOptions.suffix;
  }

  return dateFromString + dateToString;
}

const OdsDateTime = {
  format(dateFrom, dateTo = null, dateFromOptions = {}, dateToOptions = {}) {
    const defaults = {
      locale: 'no-NO',
      prefix: '',
      suffix: '',
      time: {
        prefix: '',
      },
      localeOptions: {
        hourCycle: 'h24',
        calendar: 'gregory',
        timeZone: 'Europe/Oslo',
      },
    };
    dateFromOptions.type = 'from';
    dateToOptions.type = 'to';

    [dateFromOptions, dateToOptions].forEach((options) => {
      if (typeof options.localeOptions !== 'object') {
        options.localeOptions = {};
      }

      switch (options.format) {
        case 'time':
          options.localeOptions = { hour: 'numeric', minute: 'numeric', ...options.localeOptions };

          if (options.type === 'to' && typeof options.prefix === 'undefined') {
            options.prefix = '–';
          }
          break;
        case 'datetime':
          options.localeOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', ...options.localeOptions };

          if (options.type === 'to' && options.format === 'time' && typeof options.prefix === 'undefined') {
            options.prefix = '–';
          }
          break;
        case 'daytime':
          options.localeOptions = { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', ...options.localeOptions };
          break;
        case 'custom':
          options.localeOptions = { ...options.localeOptions };
          break;
        default:
          options.localeOptions = { year: 'numeric', month: '2-digit', day: '2-digit', ...options.localeOptions };

          if (options.type === 'to' && typeof options.prefix === 'undefined') {
            options.prefix = '–';
          }
      }
    });

    return formatDateTime(dateFrom, dateTo, { ...defaults, ...dateFromOptions }, { ...defaults, ...dateToOptions });
  },
};

export default OdsDateTime;
