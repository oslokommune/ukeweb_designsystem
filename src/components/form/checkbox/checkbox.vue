<template>
  <div>
    <label class="ods-checkbox" :class="{ 'ods-checkbox--error': errorMessage }">
      <input type="checkbox" v-model="checkedModel" :value="value" :name="name" :aria-describedby="conditionalErrorId" :aria-required="ariaReq ? 'true' : null" />
      <span class="ods-checkbox__checkmark"></span>
      <span class="ods-checkbox__text">{{ label }}</span>
    </label>
    <div v-if="errorMessage" class="ods-checkbox ods-checkbox--error-message" :id="errorId">{{ errorMessage }}</div>
  </div>
</template>
<script>
export default {
  name: 'OdsCheckbox',

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
    checked: {
      type: Boolean,
      required: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
    errorId: {
      type: String,
      required: true,
    },
    ariaReq: {
      type: Boolean,
    },
  },

  computed: {
    conditionalErrorId() {
      return this.errorMessage ? this.errorId : '';
    },
    checkedModel: {
      get() {
        return this.checked;
      },
      set(value) {
        this.$emit('check', value);
      },
    },
  },
};
</script>
