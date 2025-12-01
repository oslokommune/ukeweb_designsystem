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

function shortenNbShortWeekday(initialString, options, overrideNorwegianShortDayFormat = false) {
  if (!initialString || !options || !options.localeOptions || overrideNorwegianShortDayFormat === true) {
    return initialString;
  }

  const locale = options.locale || 'no-NO';
  const localeLower = locale.toLowerCase();
  if (!localeLower.startsWith('no') && !localeLower.startsWith('nb')) {
    return initialString;
  }

  // Replace Norwegian short weekdays: man, tir, ons, tor, fre, lør, søn → strip last letter
  // https://regex101.com/r/vPFAGB/1
  const regex = /\b(man|tir|ons|tor|fre|lør|søn)\b/g;

  return initialString.replace(regex, (match) => match.slice(0, -1));
}

function formatDateTime(dateFrom, dateTo, dateFromOptions, dateToOptions, overrideNorwegianShortDayFormat = false) {
  let dateToString = '';
  let dateFromString = dateFrom.toLocaleString(dateFromOptions.locale, dateFromOptions.localeOptions);
  let timePrefix = dateFromOptions.time.prefix ? dateFromOptions.time.prefix : ' ';
  dateFromString = replaceLast(dateFromString, ', ', timePrefix);
  dateFromString = dateFromOptions.prefix + dateFromString + dateFromOptions.suffix;
  if (dateFromOptions.localeOptions.weekday === 'short') {
    dateFromString = shortenNbShortWeekday(dateFromString, dateFromOptions, overrideNorwegianShortDayFormat);
  }

  if (dateTo) {
    dateToString = dateTo.toLocaleString(dateToOptions.locale, dateToOptions.localeOptions);

    timePrefix = dateToOptions.time.prefix ? dateToOptions.time.prefix : ' ';
    dateToString = replaceLast(dateToString, ', ', timePrefix);
    dateToString = dateToOptions.prefix + dateToString + dateToOptions.suffix;
    if (dateToOptions.localeOptions.weekday === 'short') {
      dateToString = shortenNbShortWeekday(dateToString, dateToOptions, overrideNorwegianShortDayFormat);
    }
  }

  return dateFromString + dateToString;
}

const OdsDateTime = {
  format(dateFrom, dateTo = null, dateFromOptions = {}, dateToOptions = {}, overrideNorwegianShortDayFormat = false) {
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
            options.prefix = '&ndash;';
          }
          break;
        case 'datetime':
          options.localeOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', ...options.localeOptions };

          if (options.type === 'to' && options.format === 'time' && typeof options.prefix === 'undefined') {
            options.prefix = '&ndash;';
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
            options.prefix = '&ndash;';
          }
      }
    });

    return formatDateTime(dateFrom, dateTo, { ...defaults, ...dateFromOptions }, { ...defaults, ...dateToOptions }, overrideNorwegianShortDayFormat);
  },
};

export default OdsDateTime;
