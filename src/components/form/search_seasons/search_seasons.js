import Vue from "vue";
import OsgSearchSeasons from "./search_seasons.vue";

export function OsgSearchSeasonsJs() {
  let searchSeasonsDropdownTriggers = document.querySelectorAll(".components-form-search-seasons-dropdown");
  if (searchSeasonsDropdownTriggers) {
    searchSeasonsDropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("change", function () {
        let dropdowns = document.querySelectorAll(".osg-search-seasons__dropdown");
        let searchForms = document.querySelectorAll(".osg-search-seasons__input-wrapper");

        dropdowns.forEach((dropdown) => {
          dropdown.style.display = this.checked ? "block" : "none";
        });

        searchForms.forEach((searchForm) => {
          this.checked ? searchForm.setAttribute("aria-expanded", "true") : searchForm.setAttribute("aria-expanded", "false");
        });
      });
    });
  }
}

export const OsgSearchSeasonsInit = () => {
  const container = document.getElementById("osg-search-seasons");
  if (container) {
    new Vue({
      el: container,
      components: {
        OsgSearchSeasons
      },
      mounted() {
        this.event("input-change", this.value);
      },
      data: () => ({
        value: "h",
        items: [],
        season: {
          title: "What are you looking for today?",
          endpoint: "http://oslo.kommune.local/sokeresultater/",
          input: {
            id: "search-seasons-1",
            name: "osg-search-seasons-vue",
            placeholder: "Type a word"
          },
          ariaLabel: "Search",
          heroFigure: {
            defaultUrl: "https://ukeweb-public.s3.eu-central-1.amazonaws.com/images/800x800/1.jpg",
            alt: "A lighthouse in the sea"
          },
          theme: "green-dark",
          hiddenFields: [
            {
              name: "name-1",
              value: "value-1"
            }
          ],
          imageShape: "circle",
          shapePosition: "right"
        }
      }),
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
                },
                {
                  text: "Hei",
                  subtext: "Greetings",
                }
              ];
            } else {
              this.items = [];
            }
            this.value = payload;
          } else if (event === "item-focus") {
            this.value = this.items[payload].text;
          } else if (event === "itemlist-blur") {
            this.items = [];
          } else if (event === "submit") {
            console.log(payload);
          }
        },
      },
    });
  }
};
