import pagination from "./pagination.vue";

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("vue-pagination")) {
    Vue.component("osg-pagination", pagination);
    new Vue({
      el: "#vue-pagination",
      data: () => ({
        currentIndex: 1,
        limit: 2,
        totalPages: 160,
      }),
      methods: {
        page: function (value) {
          this.currentIndex = value;
        },
      },
    });
  }
});
