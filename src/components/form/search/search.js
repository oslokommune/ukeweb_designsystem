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
    new Vue({
      el: osgSearchPlaceholder,
      components: {
        OsgSearch,
      },
      data: () => ({
        value: "h",
        items: [],
      }),
      mounted() {
        this.event("input-change", this.value);
      },
      methods: {
        event(event, payload) {
          if (event === "input-change") {
            if (payload[0] && payload[0].toLowerCase() === "h") {
              this.items = [
                {
                  text: "Hi",
                },
                {
                  text: "Hello",
                },
                {
                  text: "Halo",
                  subtext: "Greetings",
                },
                {
                  text: "Halo",
                  subtext: "Greetings",
                },
                {
                  text: "Halo",
                  subtext: "Greetings",
                },
                {
                  text: "Halo",
                  subtext: "Greetings",
                },
                {
                  text: "Halo",
                  subtext: "Greetings",
                },
                {
                  text: "Halo",
                  subtext: "Greetings",
                },
              ];
            } else {
              this.items = [];
            }
            this.value = payload;
          } else if (event === "item-select") {
            this.value = this.items[payload].text;
            this.items = [];
          } else if (event === "itemlist-blur") {
            this.items = [];
          }
        },
      },
    });
  }
}
