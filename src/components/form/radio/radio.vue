<template>
  <div class="ods-radio" :class="{ 'ods-radio--error': hasError }">
    <span v-if="label" class="ods-radio__label">{{ label }}</span>
    <label class="ods-radio__input">
      <input type="radio" v-model="selectedModel" :value="value" :name="name" />
      <span class="ods-radio__control"></span>
      <span class="ods-radio__text">{{ text }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'OdsRadio',

  props: {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    selectedModel: {
      get() {
        return this.selected;
      },
      set(value) {
        this.$emit('select', value);
      },
    },
  },
};
</script>
