<template>
  <label class="osg-radio" :class="{ 'osg-radio--error': hasError }">
    <span class="osg-radio__input">
      <input type="radio" v-model="selectedModel" :value="value" :name="name" />
      <span class="osg-radio__control"></span>    
    <span class="osg-radio__label">{{ label }}</span>
  </span>
  </label>
</template>

<script>
export default {
  name: "OsgRadio",

  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
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
    }
  },

  computed: {
    selectedModel: {
      get() {
        return this.selected;
      },
      set(value) {
        this.$emit("select", value);
      }
    }
  },
}
</script>
