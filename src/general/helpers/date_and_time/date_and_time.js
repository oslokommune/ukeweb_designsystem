function formatDateTime(dateFrom, dateTo, dateFromOptions, dateToOptions) {
  let dateToString = "";

  let dateFromString = dateFrom.toLocaleString(dateFromOptions.locale, dateFromOptions.localeOptions);
  let timePrefix = dateFromOptions.time.prefix ? dateFromOptions.time.prefix : " ";
  dateFromString = replaceLast(dateFromString, ", ", timePrefix);
  dateFromString = dateFromOptions.prefix + dateFromString + dateFromOptions.suffix;

  if (dateTo) {
    dateToString = dateTo.toLocaleString(dateToOptions.locale, dateToOptions.localeOptions);

    timePrefix = dateToOptions.time.prefix ? dateToOptions.time.prefix : " ";
    dateToString = replaceLast(dateToString, ", ", timePrefix);
    dateToString = dateToOptions.prefix + dateToString + dateToOptions.suffix;
  }


  return dateFromString + dateToString;
}

function replaceLast(initialString, stringToReplace, replaceString){
  var a = initialString.split("");
  var length = stringToReplace.length;
  if(initialString.lastIndexOf(stringToReplace) != -1) {
      for(var i = initialString.lastIndexOf(stringToReplace); i < initialString.lastIndexOf(stringToReplace) + length; i++) {
          if(i == initialString.lastIndexOf(stringToReplace)) {
              a[i] = replaceString;
          }
          else {
              delete a[i];
          }
      }
  }

  return a.join("");
}

export const OsgDateTime = {
  format(dateFrom, dateTo = null, dateFromOptions = {}, dateToOptions = {}) {
    let defaults = {
      locale: "no-NO",
      prefix: "",
      suffix: "",
      time: {
        prefix: "",
      },
      localeOptions: {
        hourCycle: "h24",
        calendar: "gregory",
        timeZone: "Europe/Oslo"
      }
    }
    dateFromOptions.type = "from";
    dateToOptions.type = "to";

    [dateFromOptions, dateToOptions].forEach(options => {
      if (typeof options.localeOptions !== "object") {
        options.localeOptions = {};
      }

      switch (options.format) {
        case "time":
          options.localeOptions = Object.assign({
            hour: "numeric",
            minute: "numeric",
          }, options.localeOptions);

          if (options.type === "to" && typeof options.prefix === "undefined") {
            options.prefix = "&mdash;";
          }
          break;
        case "datetime":
          options.localeOptions = Object.assign({
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }, options.localeOptions);

          if (options.type === "to" && options.format === "time" && typeof options.prefix === "undefined") {
            options.prefix = "&mdash;";
          }
          break;
        case "daytime":
          options.localeOptions = Object.assign({
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
          }, options.localeOptions);
          break;
        case "custom":
          options.localeOptions = Object.assign({}, options.localeOptions);
          break;
        default:
          options.localeOptions = Object.assign({
            year: "numeric",
            month: "numeric",
            day: "numeric"
          }, options.localeOptions);

          if (options.type === "to" && typeof options.prefix === "undefined") {
            options.prefix = "&mdash;";
          }
      }
    });

    return formatDateTime(dateFrom, dateTo, Object.assign({}, defaults, dateFromOptions), Object.assign({}, defaults, dateToOptions));
  }
};