<template>
  <div ref="search" class="osg-search osg-search--inline">
    <div class="osg-search__form">
      <input
        v-on:keyup="inputChange($event)"
        v-on:keyup.enter="submit($event.target.value)"
        v-on:keyup.down="setFocus($event)"
        v-on:keyup.up="setFocus($event)"
        v-on:focus="resetIndex()"
        :value="value"
        :aria-expanded="items.length"
        class="osg-search__input"
        type="search"
        ref="input"
        autocomplete="off"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
        aria-haspopup="listbox"
        :aria-owns="id"
        role="combobox"
      />
    </div>
    <ul v-show="items.length" ref="list" class="osg-search__dropdown" :class="{ 'osg-search__dropdown--scroll': itemListScroll }" :id="id" role="listbox" :aria-label="ariaLabelResults">
      <li
        v-for="(item, itemIndex) of items"
        :tabindex="-1"
        :key="itemIndex"
        v-on:click.prevent="itemSelect(itemIndex)"
        v-on:keyup.enter.prevent="itemSelect(itemIndex)"
        v-on:keyup.space.prevent="itemSelect(itemIndex)"
        v-on:keyup.down.prevent.stop="setFocus($event)"
        v-on:keyup.up.prevent.stop="setFocus($event)"
        v-on:keyup.esc.prevent="resetAndFocus()"
        :class="{ 'osg-search__dropdown__item--focus': itemIndex === index }"
        class="osg-search__dropdown__item"
        role="option"
      >
        <slot name="listitem" :item="item">
          <span class="osg-text-5">{{ item.text }}</span>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OsgSearch",

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
    placeholder: {
      type: String,
      default: "Search",
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
    window.addEventListener("keydown", (e) => {
      if (this.index !== null && (e.code === "ArrowDown" || e.code === "ArrowUp")) {
        e.preventDefault();
      }
    });
    this.$refs.search.addEventListener("focusout", (e) => {
      if (!this.$refs.search.contains(e.relatedTarget)) {
        this.resetIndex();
        this.$emit("itemlist-blur");
      }
    });
  },

  beforeDestroy() {
    window.removeEventListener("keydown");
    window.removeEventListener("focusout");
  },

  watch: {
    items(newValue) {
      this.resetIndex();
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
            if (!this.keepInputFocusOnItemNav) {
              this.resetIndex();
            }
        }
      }
    },
  },
};
</script>
