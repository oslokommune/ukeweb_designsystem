<template>
  <div>
    <div class="ods-checkbox" :class="{ 'ods-checkbox--error': errorMessage }">
      <label class="ods-checkbox__wrapper">
        <input type="checkbox" v-model="checkedModel" :value="value" :name="name" :aria-describedby="conditionalErrorId" :aria-required="ariaRequired ? 'true' : null" />
        <span class="ods-checkbox__checkmark"></span>
        <span class="ods-checkbox__text">{{ text }}</span>
      </label>
      <div role="alert" class="ods-status-message ods-status-message--danger" v-if="errorMessage">
        <p class="ods-status-message__content" :id="errorId"><span class="ods-status-message__icon ods-icon--error-hexa" aria-hidden="true"></span>{{ errorMessage }}</p>
      </div>
    </div>
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
    text: {
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
    ariaRequired: {
      type: Boolean,
    },
  },

  computed: {
    conditionalErrorId() {
      return this.hasError ? this.errorId : '';
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
