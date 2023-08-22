import Vue from 'vue';
import './date_and_time.vue'; // For Vue filters
import OsgDateTime from './date_and_time'; // For JS

document.addEventListener('DOMContentLoaded', () => {
  const testCasesElement = document.getElementById('testcases');
  if (testCasesElement) {
    const testCases = [
      {
        dateFrom: new Date(2021, 11, 30, 8, 5, 32),
        dateTo: null,
        dateFromOptions: {},
        dateToOptions: {},
        toString: 'OsgDateTime.format(new Date(2021, 11, 30, 8, 5, 32))',
      },
      {
        dateFrom: new Date(2021, 11, 30, 8, 5, 32),
        dateTo: new Date(2022, 0, 5, 8, 5, 32),
        dateFromOptions: {},
        dateToOptions: {},
        toString: 'OsgDateTime.format(new Date(2021, 11, 30, 8, 5, 32), new Date(2022, 0, 5, 8, 5, 32))',
      },
      {
        dateFrom: new Date(2021, 11, 30, 8, 5, 32),
        dateTo: new Date(2021, 11, 30, 16, 32, 50),
        dateFromOptions: {
          format: 'time',
        },
        dateToOptions: {
          format: 'time',
        },
        toString: 'OsgDateTime.format(new Date(2021, 11, 30, 8, 5, 32), new Date(2021, 11, 30, 16, 32, 50), {format: "time"}, {format: "time"})',
      },
      {
        dateFrom: new Date(2021, 11, 30, 8, 0, 0),
        dateTo: new Date(2021, 11, 30, 16, 0, 0),
        dateFromOptions: {
          format: 'time',
          prefix: 'kl. ',
        },
        dateToOptions: {
          format: 'time',
        },
        toString: 'OsgDateTime.format(new Date(2021, 11, 30, 8, 0, 0), new Date(2021, 11, 30, 16, 0, 0), {format: "time", prefix: "kl. "}, {format: "time"})',
      },
      {
        dateFrom: new Date(2022, 4, 15, 8, 0, 0),
        dateTo: new Date(2022, 4, 15, 16, 0, 0),
        dateFromOptions: {
          format: 'datetime',
          time: {
            prefix: ' kl. ',
          },
        },
        dateToOptions: {
          format: 'time',
        },
        toString: 'OsgDateTime.format(new Date(2022, 4, 15, 8, 0, 0), new Date(2022, 4, 15, 16, 0, 0), {format: "datetime", time: {prefix: " kl. "}}, {format: "time"})',
      },
      {
        dateFrom: new Date(2022, 4, 15, 8, 0, 0),
        dateTo: new Date(2022, 4, 15, 16, 0, 0),
        dateFromOptions: {
          format: 'datetime',
          time: {
            prefix: ' kl. ',
          },
          localeOptions: {
            weekday: 'long',
          },
        },
        dateToOptions: {
          format: 'time',
        },
        toString: 'OsgDateTime.format(new Date(2022, 4, 15, 8, 0, 0), new Date(2022, 4, 15, 16, 0, 0), {format: "datetime", time: {prefix: " kl. "}, localeOptions: {weekday: "long"}}, {format: "time"})',
      },
      {
        dateFrom: new Date(2022, 4, 15, 8, 0, 0),
        dateTo: new Date(2022, 4, 20, 16, 0, 0),
        dateFromOptions: {
          prefix: 'Fra ',
          localeOptions: {
            weekday: 'long',
          },
        },
        dateToOptions: {
          prefix: ' til ',
          localeOptions: {
            weekday: 'long',
          },
        },
        toString: 'OsgDateTime.format(new Date(2022, 4, 15, 8, 0, 0), new Date(2022, 4, 20, 16, 0, 0), {prefix: "Fra ", localeOptions: {weekday: "long"}}, {prefix: " til ", localeOptions: {weekday: "long"}})',
      },
      {
        dateFrom: new Date(2022, 4, 15, 8, 0, 0),
        dateTo: null,
        dateFromOptions: {
          format: 'daytime',
          time: {
            prefix: ', kl. ',
          },
        },
        toString: 'OsgDateTime.format(new Date(2022, 4, 15, 8, 0, 0), null, {format: "daytime", time: {prefix: ", kl. "}}, {})',
      },
    ];
    testCases.forEach((testCase) => {
      if (!testCase.dateToOptions) {
        testCase.dateToOptions = {};
      }

      const testCaseElement = document.createElement('div');
      testCaseElement.classList.add('ods-margin-bottom-8');
      testCaseElement.innerHTML = `<div>no-NO: ${OsgDateTime.format(testCase.dateFrom, testCase.dateTo, testCase.dateFromOptions, testCase.dateToOptions)}</div>`;

      testCase.dateFromOptions.locale = 'en-GB';
      testCase.dateToOptions.locale = 'en-GB';

      if (testCase.dateFromOptions.prefix) {
        testCase.dateFromOptions.prefix = testCase.dateFromOptions.prefix.replace(/Fra/, 'From').replace(/kl./, 'at');
      }
      if (testCase.dateFromOptions.time && testCase.dateFromOptions.time.prefix) {
        testCase.dateFromOptions.time.prefix = testCase.dateFromOptions.time.prefix.replace(/kl./, 'at');
      }
      if (testCase.dateToOptions.prefix) {
        testCase.dateToOptions.prefix = testCase.dateToOptions.prefix.replace(/til/, 'to');
      }

      testCaseElement.innerHTML += `<div>en-GB: ${OsgDateTime.format(testCase.dateFrom, testCase.dateTo, testCase.dateFromOptions, testCase.dateToOptions)}</div>`;

      testCaseElement.innerHTML += `<code class="ods-code" class="ods-code ods-block ods-margin-top-10">${testCase.toString}</code>`;
      testCasesElement.appendChild(testCaseElement);
    });
  }

  if (document.getElementById('date-time-vue-examples')) {
    const vm = new Vue({
      data: () => ({
        testDate: new Date(2021, 11, 31, 23, 59, 59),
      }),
      template: '<div><p>Date: {{ testDate | OsgDateTimeFormat() }}, DateTime: {{ testDate | OsgDateTimeFormat(null, { format: "datetime" }) }}, <span v-html="\'DoubleDate: \' + $options.filters.OsgDateTimeFormat(testDate, new Date())"></span></p></div>',
    });
    vm.$mount('#date-time-vue-examples');
  }
});
