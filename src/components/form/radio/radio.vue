<template>
  <div>
    <label class="osg-radio" :class="{ 'osg-radio--error': errorMessage }">
      <span class="osg-radio__input">
        <input type="radio" v-model="selectedModel" :value="value" :name="name" :aria-describedby="conditionalErrorId" />
        <span class="osg-radio__control"></span>
      </span>
      <span class="osg-radio__label">{{ label }}</span>
    </label>
    <div v-if="errorMessage" class="osg-radio__error-message" :id="errorId">{{ errorMessage }}</div>
  </div>
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
    errorMessage: {
      type: String,
      default: ""
    },
    errorId: {
      type: String,
      required: true
    }
  },

  computed: {
    conditionalErrorId() {
      return this.errorMessage ? this.errorId : "";
    },
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
