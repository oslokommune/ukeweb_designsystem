<template>
  <div class="osg-search-seasons" :class="searchSeasonsModifiers" ref="search">
    <div class="osg-search-seasons__main">
      <div class="osg-search-seasons__content">
        <h2 class="osg-text-size-golf osg-text-size-delta-breakpoint-medium osg-text-size-charlie-breakpoint-large" v-html="title"></h2>
        <div class="osg-search-seasons__search">
          <form class="osg-search-seasons__form" :action="action" method="GET">
            <div class="osg-search-seasons__input-wrapper" id="osg-search__form" aria-expanded="true" role="combobox" aria-haspopup="listbox" aria-owns="id-results">
              <input
                v-on:keyup="inputChange($event)"
                v-on:keyup.enter="submit($event.target.value)"
                v-on:keyup.down="setFocus($event)"
                v-on:keyup.up="setFocus($event)"
                v-on:focus="resetIndex()"
                class="osg-search-seasons__input"
                type="search"
                autocomplete="off"
                aria-haspopup="listbox"
                role="combobox"
                ref="input"
                :aria-label="ariaLabel"
                :value="value"
                :name="inputName"
                :placeholder="inputPlaceholder"
                :aria-expanded="items.length"
                :aria-owns="id"
              />
              <input type="hidden" v-for="field in hiddenFields" :key="field.name" :name="field.name" :value="field.value" />
              <ul v-show="items.length" ref="list" class="osg-search-seasons__dropdown" role="listbox" :class="{ 'osg-search-seasons__dropdown--scroll': itemListScroll }" :id="id" :aria-label="ariaLabelResults">
                <li
                  v-on:click.prevent="itemSelect(itemIndex)"
                  v-on:keyup.enter.prevent="itemSelect(itemIndex)"
                  v-on:keyup.space.prevent="itemSelect(itemIndex)"
                  v-on:keyup.down.prevent.stop="setFocus($event)"
                  v-on:keyup.up.prevent.stop="setFocus($event)"
                  v-on:keyup.esc.prevent="resetAndFocus()"
                  v-for="(item, itemIndex) of items"
                  :tabindex="-1"
                  :key="itemIndex"
                  :class="{ 'osg-search-seasons__dropdown__item--focus': itemIndex === index }"
                  class="osg-search-seasons__dropdown__item"
                  role="option"
                >
                  <slot name="listitem" :item="item">
                    <span class="osg-text-size-kilo osg-text-size-juliett-breakpoint-large osg-text-weight-light">{{ item.text }}</span>
                  </slot>
                </li>
              </ul>
            </div>
            <button type="submit" class="osg-search-seasons__button">
              <span class="osg-sr-only">{{ ariaLabel }}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
    <div class="osg-search-seasons__image">
      <figure :class="searchSeasonsFigureModifiers">
        <img :class="searchSeasonsImageModifiers" :src="imageUrl" :alt="imageAlt" />
      </figure>
    </div>
  </div>
</template>
<script>
export default {
  name: "OsgSearchSeasons",
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    keepInputFocusOnItemNav: {
      type: Boolean,
      default: true,
    },
    inputFocusAfterItemSelect: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
    inputPlaceholder: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      required: true,
    },
    hiddenFields: {
      type: Array,
      default: function () {
        return [];
      },
    },
    theme: {
      type: String,
      default: "",
    },
    figureShape: {
      type: String,
      default: "",
    },
    figureShapePosition: {
      type: String,
      default: "",
    },
    ariaLabel: {
      type: String,
      default: "Search",
    },
    ariaLabelResults: {
      type: String,
      default: "Search results",
    },
    itemListScroll: {
      type: Boolean,
      default: false,
    },
    itemListScrollOffset: {
      type: Number,
      default: 100,
    },
  },

  data: () => ({
    index: null,
    selectedIndex: null,
  }),

  mounted() {
    window.addEventListener("keydown", this.eventKeyDown);
    this.$refs.search.addEventListener("focusout", this.eventFocusOut);
  },

  beforeDestroy() {
    window.removeEventListener("keydown", this.eventKeyDown);
    window.removeEventListener("focusout", this.eventFocusOut);
  },

  watch: {
    items() {
      this.resetIndex();
    },
  },

  computed: {
    searchSeasonsModifiers() {
      switch (this.theme) {
        case "red":
          return "osg-search-seasons--red";
        case "green-dark":
          return "osg-search-seasons--green-dark";
        case "blue-dark":
          return "osg-search-seasons--blue-dark";
        default:
          return "";
      }
    },

    searchSeasonsFigureModifiers() {
      let classes = "";

      switch (this.figureShape) {
        case "none":
          break;
        default:
          classes = "osg-image osg-image--shape";
      }

      if (this.figureShape !== "none") {
        switch (this.figureShapePosition) {
          case "top-right":
            classes = classes + " osg-image--shape-top-right";
            break;
          case "bottom-left":
            classes = classes + " osg-image--shape-bottom-left";
            break;
          case "bottom-right":
            classes = classes + " osg-image--shape-bottom-right";
            break;
          default:
            classes = classes + " osg-image--shape-top-left";
        }
      }

      switch (this.theme) {
        case "red":
          break;
        case "green-dark":
          classes = classes + " osg-image--shape-green-light";
          break;
        default:
          classes = classes + " osg-image--shape-red";
      }

      return classes;
    },

    searchSeasonsImageModifiers() {
      let classes = "";

      switch (this.figureShape) {
        case "none":
          classes = "osg-image";
          break;
        case "none-image-circle":
          classes = "osg-image osg-image--circle";
          break;
        default:
      }

      return classes;
    },
  },

  methods: {
    itemSelect(index) {
      this.$emit("item-select", index);
      this.selectedIndex = index;
      if (this.inputFocusAfterItemSelect) {
        this.resetIndex();
        this.inputFocus();
      }
    },
    setFocus(event) {
      const lastItem = this.items.length - 1;

      switch (event.code) {
        case "ArrowUp":
          if (this.index === null || this.index === 0) {
            this.$refs.input.focus();
          } else if (this.index > 0) {
            this.index--;
          }
          break;
        case "ArrowDown":
          if (this.index === null) {
            this.index = 0;
          } else if (this.index < lastItem) {
            this.index++;
          }
          break;
      }

      if (this.$refs.list && this.$refs.list.childNodes[this.index]) {
        if (!this.keepInputFocusOnItemNav) {
          this.$refs.list.childNodes[this.index].focus();
        } else {
          this.selectedIndex = this.index;
        }

        if (this.keepInputFocusOnItemNav && this.itemListScroll) {
          this.$refs.list.scrollTop = this.$refs.list.childNodes[this.index].offsetTop - this.itemListScrollOffset;
        }

        this.$emit("item-focus", this.index);
      }
    },
    resetIndex() {
      this.index = null;
      this.selectedIndex = null;

      if (this.itemListScroll && this.$refs.list) {
        this.$refs.list.scrollTop = 0;
      }
    },
    resetAndFocus() {
      this.resetIndex();
      this.inputFocus();
      this.$emit("itemlist-blur");
    },
    inputFocus() {
      this.$refs.input.focus();
      this.$emit("input-focus");
    },
    submit(value) {
      this.$emit("submit", {
        value: value,
        index: this.selectedIndex,
      });
    },
    inputChange(event) {
      if (this.value !== event.target.value) {
        switch (event.code) {
          case "ArrowUp":
          case "ArrowDown":
          case "Enter":
            break;
          default:
            this.$emit("input-change", event.target.value);
            this.resetIndex();
        }
      }
    },
    eventFocusOut(event) {
      if (!this.$refs.search.contains(event.relatedTarget)) {
        this.resetIndex();
        this.$emit("itemlist-blur");
      }
    },
    eventKeyDown(event) {
      if (this.index !== null && (event.code === "ArrowDown" || event.code === "ArrowUp")) {
        event.preventDefault();
      }
    },
  },
};
</script>
