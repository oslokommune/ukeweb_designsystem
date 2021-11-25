import Vue from "vue";
import "./date_and_time.vue.js"; // For Vue filters
import { OsgDateTime } from "./date_and_time.js"; // For JS

document.addEventListener("DOMContentLoaded", function () {
  const tableBody = document.getElementById("date-time-examples");

  const testCases = [new Date(2021, 11, 31, 23, 59, 59), new Date(2009, 3, 5, 2, 9, 7)];

  testCases.forEach(function (testCase) {
    tableBody.innerHTML += `<tr class="osg-table__row">
                              <td class="osg-table__cell">Norwegian</td>
                              <td class="osg-table__cell">${OsgDateTime.formatDate(testCase)}</td>
                              <td class="osg-table__cell">${OsgDateTime.formatDate(testCase, true)}</td>
                              <td class="osg-table__cell">${OsgDateTime.formatTime(testCase)}</td>
                              <td class="osg-table__cell">${OsgDateTime.formatDateTime(testCase)}</td>
                              <td class="osg-table__cell">${OsgDateTime.formatDateTime(testCase, true)}</td>
                            </tr>`;
  });

  testCases.forEach(function (testCase) {
    tableBody.innerHTML += `<tr class="osg-table__row">
                              <td class="osg-table__cell">English</td>
                              <td class="osg-table__cell">${OsgDateTime.formatDate(testCase, false, "en")}</td>
                              <td class="osg-table__cell">${OsgDateTime.formatDate(testCase, true, "en")}</td>
                              <td class="osg-table__cell">${OsgDateTime.formatTime(testCase)}</td>
                              <td class="osg-table__cell">${OsgDateTime.formatDateTime(testCase, false, "en")}</td>
                              <td class="osg-table__cell">${OsgDateTime.formatDateTime(testCase, true, "en")}</td>
                            </tr>`;
  });

  new Vue({
    el: "#date-time-vue-examples",
    data: () => ({
      testDate: new Date(2021, 11, 31, 23, 59, 59),
    }),
    template: "<div><p>{{ testDate | OsgFormatDate() }}, {{ testDate | OsgFormatDate(true) }}, {{ testDate | OsgFormatDate(true, 'en') }}</p><p>{{ testDate | OsgFormatTime() }}, {{ testDate | OsgFormatDateTime() }}, {{ testDate | OsgFormatDateTime(true, 'en') }}</p></div>",
  });
});
