<template>
  <div class="osg-search osg-search--inline">
    <div
      class="osg-search__form"
      role="combobox"
      aria-expanded="true"
      aria-haspopup="listbox"
      aria-owns="id-results">
      <input
        v-on:keyup="$emit('change', $event.target.value)"
        v-on:keyup.enter="$emit('enter', $event.target.value)"
        v-on:keyup.down="setFocus($event)"
        v-on:keyup.up="setFocus($event)"
        :value="value"
        class="osg-search__input"
        type="search"
        aria-label="Search"
        ref="input"
        autocomplete="off"
        placeholder="Type a word">
    </div>
    <ul
      v-if="items.length"
      ref="list"
      class="osg-search__dropdown"
      id="id-results"
      role="listbox">
      <li
        v-for="(item, index) of items" :key="index"
        v-on:click.prevent="itemClick(index)"
        v-on:keyup.enter.prevent="itemClick(index)"
        v-on:keyup.down.prevent="setFocus($event)"
        v-on:keyup.up.prevent="setFocus($event)"
        :class="{ 'osg-search__dropdown__item--focus': index === focus }"
        class="osg-search__dropdown__item"
        role="option"
        tabindex="0">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'OsgSearch',
  props: {
    value: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    inputFocusAfterItemClick: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      focus: null
    }
  },
  methods: {
    itemClick(index) {
      this.$emit('item', index);
      this.focus = null;
      if (this.inputFocusAfterItemClick) {
        this.$refs.input.focus()
      }
    },
    setFocus(event) {
      const lastItem = this.items.length - 1;

      switch (event.code) {
        case 'ArrowUp':
          if (this.focus === null || this.focus === 0) {
            this.focus = lastItem;
            this.$refs.list.lastChild.focus();
          } else if (this.focus > 0) {
            this.focus--;
          }
          break;
        case 'ArrowDown':
          if (this.focus === null || this.focus === lastItem) {
            this.focus = 0;
            this.$refs.list.firstChild.focus();
          } else if (this.focus < lastItem) {
            this.focus++;
          }
          break;
      }
      this.$refs.list.childNodes[this.focus].focus();
    }
  }
}
</script>
