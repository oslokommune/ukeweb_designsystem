<template>
  <div>
    <label class="osg-checkbox" :class="{ 'osg-checkbox--error': errorMessage }">
      <input type="checkbox" v-model="valueModel" :name="name" :aria-describedby="conditionalErrorId" />
      <span class="osg-checkbox__checkmark"></span>
      <span class="osg-checkbox__text">{{ label }}</span>
    </label>
    <div v-if="errorMessage" class="osg-checkbox osg-checkbox--error-message" :id="errorId">{{ errorMessage }}</div>
  </div>
</template>
<script>
export default {
  name: "OsgCheckbox",

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
      default: "",
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
    valueModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("check", value);
      }
    }
  },
}
</script>
