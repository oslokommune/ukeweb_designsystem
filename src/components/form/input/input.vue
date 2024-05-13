<template>
  <div class="ods-input" :class="{ 'ods-input--error': errorMessage }">
    <label class="ods-input__label">
      {{ label }}
      <input class="ods-input__input" v-model="valueModel" :type="type" :name="name" :autocomplete="autocomplete" :placeholder="placeholder" :aria-describedby="conditionalErrorId" :aria-required="ariaRequired ? 'true' : null" />
      <span v-if="errorMessage" class="ods-icon ods-icon--exclamation-mark-circle"></span>
    </label>
  </div>
  <div class="ods-status-message ods-status-message--danger" v-if="errorMessage">
    <h2 class="ods-status-message__heading" :id="errorId"><span class="ods-status-message__icon ods-icon--error-hexa" aria-hidden="true"></span>{{ errorMessage }}</h2>
  </div>
</template>
<script>
export default {
  name: 'OdsInput',

  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    autocomplete: {
      type: String,
      default: 'on',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
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
      return this.errorMessage ? this.errorId : '';
    },
    valueModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
