import OsgSearch from "./search.vue";

document.addEventListener("DOMContentLoaded", function () {
  let searchDropdownTriggers = document.querySelectorAll(".components-form-search-dropdown");
  if (searchDropdownTriggers) {
    searchDropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("change", function () {
        let dropdown = document.getElementById(this.getAttribute("aria-controls"));
        if (dropdown) {
          let searchForm = dropdown.previousElementSibling;

          if (this.checked) {
            dropdown.style.display = "block";
            searchForm.setAttribute("aria-expanded", "true");
          } else {
            dropdown.style.display = "none";
            searchForm.setAttribute("aria-expanded", "false");
          }
        }
      });
    });
  }

  let osgSearchPlaceholder = document.getElementById("osg-search-vue");
  if (osgSearchPlaceholder) {
    Vue.component("osg-search", OsgSearch);
    new Vue({
      el: osgSearchPlaceholder,
      data: () => ({
        value: "h",
        items: [],
        focus: null,
        ariaExpanded: "false"
      }),
      mounted() {
        this.event("change", this.value);
      },
      methods: {
        event(event, payload) {
          if (event === "change") {
            if (payload[0] && payload[0].toLowerCase() === "h") {
              this.items = [
                {
                  item1: "Hi",
                },
                {
                  item1: "Hello",
                },
                {
                  item1: "Halo",
                  item2: "Greetings",
                },
              ];
              this.ariaExpanded = "true";
            } else {
              this.items = [];
              this.ariaExpanded = "false";
            }
            this.value = payload;
          } else if (event === "item") {
            this.value = this.items[payload].item1;
          }
          console.log(event, payload);
        },
      },
    });
  }
});
