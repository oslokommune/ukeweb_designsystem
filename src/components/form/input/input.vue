<template>
  <div class="ods-input" :class="{ 'ods-input--error': errorMessage }">
    <label class="ods-input__label">
      {{ label }} <span v-if="ariaRequired" aria-hidden="true">*</span>
      <input class="ods-input__input" v-model="valueModel" :type="type" :name="name" :autocomplete="autocomplete" :placeholder="placeholder" :aria-describedby="errorMessage ? errorId : null" :aria-required="ariaRequired ? 'true' : null" />
      <span v-if="errorMessage" class="ods-icon ods-icon--exclamation-mark-circle"></span>
    </label>
  </div>
  <div class="ods-status-message ods-status-message--danger" v-if="errorMessage">
    <p class="ods-status-message__content" :id="errorId"><span class="ods-status-message__icon ods-icon--error-hexa" aria-hidden="true"></span>{{ errorMessage }}</p>
  </div>
  <div v-if="ariaRequired" class="ods-input__required" aria-hidden="true">{{ requiredText }}</div>
</template>
<script>
export default {
  name: 'OdsInput',

  emits: ['input'],

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
    requiredText: {
      type: String,
      default: '',
    },
  },

  computed: {
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
