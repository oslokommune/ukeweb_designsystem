import OsgDate from "./date.vue";

document.addEventListener("DOMContentLoaded", function () {
  const osgDatePlaceholderElements = ["osg-date-vue", "osg-date-vue-dev"];
  osgDatePlaceholderElements.forEach(function (elementName) {
    let osgDatePlaceholder = document.getElementById(elementName);
    if (osgDatePlaceholder) {
      Vue.component("osg-date", OsgDate);
      new Vue({
        el: osgDatePlaceholder,

        data: () => ({
          date: null,
          minDate: new Date("2020-10-01"),
          maxDate: new Date("2022-10-15"),
        }),

        computed: {
          displayDate() {
            if (this.date) {
              const day = this.date.getDate() > 9 ? this.date.getDate() : "0" + this.date.getDate();
              const month = this.date.getMonth() + 1 > 9 ? this.date.getMonth() + 1 : "0" + (this.date.getMonth() + 1);
              const year = this.date.getFullYear();

              return `${day}.${month}.${year}`;
            }
            return null;
          },
        },

        methods: {
          setDate(date) {
            this.date = date;
          },
        },
      });
    }
  });
});
