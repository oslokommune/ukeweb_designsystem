<template>
  <div ref="combobox" class="ods-combobox" :id="id">
    <label :for="inputId" class="ods-combobox__label">{{ i18n.label }}</label>
    <div class="ods-combobox__select">
      <input
        v-on:input="onInputChange($event)"
        v-on:click.prevent="openDropdown($event)"
        v-on:focus="resetIndex()"
        v-on:blur="handleClickEvent($event)"
        v-on:keyup.enter="onInputEnter()"
        v-on:keyup.down="onInputKeyArrowUpDown($event)"
        v-on:keyup.up="onInputKeyArrowUpDown($event)"
        v-on:keyup.esc="onInputEscape($event)"
        :aria-controls="listboxId"
        :aria-expanded="dropdownOpen ? 'true' : 'false'"
        :aria-label="ariaLabelInputText"
        :placeholder="i18n.placeholder"
        :id="inputId"
        :aria-activedescendant="lisItemId"
        :items="items"
        :value="value"
        aria-autocomplete="both"
        class="ods-combobox__input"
        ref="input"
        role="combobox"
        type="text"
      />
      <button v-on:click="setInputFocus" class="ods-combobox__toggle" type="button" :aria-label="i18n.buttonLabel" :aria-expanded="dropdownOpen ? 'true' : 'false'" :aria-controls="listboxId" tabindex="-1">
        <span class="ods-icon ods-icon--size-juliett" :class="toggleBtnClass" aria-hidden="true" tabindex="-1"> </span>
      </button>
    </div>

    <div class="ods-combobox__dropdown">
      <ul v-show="dropdownOpen" ref="list" :id="listboxId" class="ods-combobox__dropdown-list" :class="{ 'ods-combobox__dropdown--scroll': itemListScroll }" role="listbox" :aria-label="i18n.ariaLabelListBox">
        <li
          v-for="(item, itemIndex) of items"
          v-on:click.prevent="itemSelectClick(itemIndex)"
          v-on:keyup.enter.prevent="itemSelect(itemIndex)"
          v-on:keyup.esc.prevent="resetAndFocus()"
          v-on:keyup.down.prevent.stop="setFocus($event)"
          v-on:keyup.up.prevent.stop="setFocus($event)"
          :class="{ 'ods-combobox__dropdown-item--focus': itemIndex === index }"
          :key="itemIndex"
          :aria-selected="itemIndex === index ? 'true' : 'false'"
          :id="`${listboxId}-${itemIndex}`"
          class="ods-combobox__dropdown-item"
          role="option"
        >
          <slot name="listitem" :item="item">
            <span class="ods-text-5">{{ item.text }}</span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OdsCombobox',

  props: {
    id: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
    },
    inputFocusAfterItemSelect: {
      type: Boolean,
      default: true,
    },
    itemListScroll: {
      type: Boolean,
      default: false,
    },
    itemListScrollOffset: {
      type: Number,
      default: 100,
    },
    i18n: {
      required: true,
      type: Object,
    },
    keepInputFocusOnItemNav: {
      type: Boolean,
      default: true,
    },
    listboxId: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },

  data: () => ({
    index: null,
    selectedIndex: null,
    isDropdownOpen: false,
    ariaActiveDescendant: null,
  }),

  computed: {
    ariaLabelInputText() {
      return this.i18n.ariaLabelInput;
    },
    toggleBtnClass() {
      return `ods-icon--chevron-thin-${this.dropdownOpen ? 'up' : 'down'}`;
    },
    dropdownOpen() {
      return this.isDropdownOpen;
    },
    lisItemId() {
      return this.selectedIndex !== null ? `${this.listboxId}-${this.selectedIndex}` : '';
    },
  },

  mounted() {
    window.addEventListener('click', this.handleClickEvent);
  },

  beforeDestroy() {
    window.removeEventListener('click', this.eventFocusOut);
  },

  watch: {
    items() {
      this.resetIndex();
    },
  },

  methods: {
    openDropdown(event) {
      if (this.$refs.input.value !== '') {
        this.isDropdownOpen = this.items.length > 0;
      } else if (this.$refs.input.value === '' && this.dropdownOpen === false) {
        this.$emit('input-arrow-up-down', event);
        this.isDropdownOpen = true;
      }
    },
    itemSelectClick(itemIndex) {
      this.$emit('item-focus', itemIndex);
      this.itemSelect(itemIndex);
    },
    onInputEnter() {
      const filter = this.$refs.input.value;
      this.$emit('input-enter', filter);
      this.resetAndFocus();
      this.isDropdownOpen = false;
    },
    onInputKeyArrowUpDown(event) {
      this.setFocus(event);
      if (this.$refs.input.value !== '') {
        this.isDropdownOpen = this.items.length > 0;
      } else if (this.$refs.input.value === '' && this.dropdownOpen === false) {
        this.$emit('input-arrow-up-down', event);
        this.isDropdownOpen = true;
      }
    },
    onInputBlur(event) {
      this.$emit('input-blur', event);
      this.handleClickEvent(event);
    },
    onInputChange(event) {
      const { target, ctrlKey, shiftKey, inputType } = event;
      const filter = target.value;

      if (ctrlKey || shiftKey) {
        return;
      }

      if (this.value !== filter) {
        switch (inputType) {
          case 'deleteContentBackward':
            this.resetIndex();
            if (this.$refs.input.value === '') {
              this.isDropdownOpen = false;
              this.$emit('input-change', filter);
            }
            break;
          case 'insertText':
            this.$emit('input-change', filter);
            this.resetIndex();
            this.$nextTick(() => {
              if (this.items.length === 0) {
                this.isDropdownOpen = false;
                return;
              }
              const firstItem = this.items[0];
              const inputElement = this.$refs.input;
              this.isDropdownOpen = true;

              this.$nextTick(() => {
                const isSubstringMatch = firstItem.text.toLowerCase().includes(inputElement.value.toLowerCase()) && firstItem.text.toLowerCase().startsWith(inputElement.value.toLowerCase());

                if (isSubstringMatch) {
                  inputElement.value = firstItem.text;
                  inputElement.setSelectionRange(filter.length, firstItem.text.length, 'forward');
                } else {
                  this.isDropdownOpen = false;
                }
              });
            });
            break;
          default:
            this.$emit('input-change', filter);
            this.resetIndex();
            break;
        }
      }
    },

    onInputEscape() {
      if (this.dropdownOpen === true) {
        this.isDropdownOpen = false;
      } else {
        this.resetAndFocus();
        this.$nextTick(() => {
          this.$refs.input.value = '';
          this.$emit('input-change', '');
        });
      }
      this.onInputEnter();
    },

    itemSelect(index) {
      this.$emit('item-select', index);
      this.selectedIndex = index;
      if (this.inputFocusAfterItemSelect) {
        this.resetIndex();
        this.setInputFocus();
      }
    },

    // changes the index value depending on the item selected
    setFocus(event) {
      const lastItem = this.items.length - 1;

      switch (event.code) {
        case 'ArrowUp':
          if (this.index === null || this.index === 0) {
            this.index = lastItem;
          } else if (this.index > 0) {
            this.index -= 1;
          }
          break;
        case 'ArrowDown':
          if (this.index === null || this.index === lastItem) {
            this.index = 0;
          } else if (this.index < lastItem) {
            this.index += 1;
          }
          break;
        default:
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

        this.$emit('item-focus', this.index);
      }
    },
    resetIndex() {
      this.index = null;
      this.selectedIndex = null;

      this.$nextTick(() => {
        if (this.itemListScroll && this.$refs.list) {
          this.$refs.list.scrollTop = 0;
        }
      });
    },
    resetAndFocus() {
      this.resetIndex();
      this.setInputFocus();
      this.$emit('itemlist-blur');
    },
    setInputFocus() {
      this.$refs.input.focus();
      this.$emit('input-focus');
    },
    submit(value) {
      this.$emit('submit', {
        value,
        index: this.selectedIndex,
      });
    },
    eventKeyDown(event) {
      const { code } = event;

      if (this.index !== null && (code === 'ArrowDown' || code === 'ArrowUp')) {
        event.preventDefault();
      }
    },
    handleClickEvent(event) {
      const { target } = event;
      const isOption = (target.parentElement && target.parentElement.role === 'option') || target.role === 'option';
      const { combobox } = this.$refs;

      if (isOption || (combobox && !combobox.contains(target))) {
        this.isDropdownOpen = false;
      }
    },
  },
};
</script>
