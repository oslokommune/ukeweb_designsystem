<template>
  <div class="osg-search osg-search--inline">
    <div class="osg-search__form" aria-expanded="true" role="combobox" aria-haspopup="listbox" aria-owns="id-results">
      <input class="osg-search__input" ref="input" :value="value" type="search" autocomplete="off" placeholder="Search" aria-label="Search" @keyup="$emit('change', $event.target.value)" v-on:keyup.enter="$emit('enter', $event.target.value)">
    </div>
    <ul v-if="items.length" class="osg-search__dropdown" role="listbox" id="id-results">
      <li v-for="(item, index) of items" :key="index" role="option">
        <a @click.prevent="itemClick(index)" class="osg-search__dropdown__item">{{ item }}</a>
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
  methods: {
    itemClick(index) {
      this.$emit('item', index)
      if (this.inputFocusAfterItemClick) {
        this.$refs.input.focus()
      }
    }
  }
}
</script>
