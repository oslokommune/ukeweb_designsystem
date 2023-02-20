import Vue from "vue";
import OsgSearchInline from "./inline.vue";

export function OsgSearchVue() {
  const vueElements = ["osg-search-inline-vue-1", "osg-search-inline-vue-2"];
  vueElements.forEach((element) => {
    let osgSearchPlaceholder = document.getElementById(element);
    if (osgSearchPlaceholder) {
      new Vue({
        el: osgSearchPlaceholder,
        components: {
          OsgSearchInline,
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
  });
}
