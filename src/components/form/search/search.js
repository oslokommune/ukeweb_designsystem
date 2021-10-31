import OsgSearch from "./search.vue";

export function OsgSearchJs(triggerDropdownId, inputId, dropdownId) {
  let trigger = document.getElementById(triggerDropdownId);

  if (!trigger) {
    return;
  }

  trigger.addEventListener("change", function () {
      let searchInput = document.getElementById(inputId);
      let dropdown = document.getElementById(dropdownId);

      if (this.checked) {
        dropdown.style.display = "block";
        searchInput.setAttribute("aria-expanded", "true");
      } else {
        dropdown.style.display = "none";
        searchInput.setAttribute("aria-expanded", "false");
      }
  });
}

export function OsgSearchVue() {
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
}
