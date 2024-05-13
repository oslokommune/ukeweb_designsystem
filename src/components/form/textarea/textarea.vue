<template>
  <div class="ods-textarea" :class="{ 'ods-textarea--error': errorMessage }">
    <label class="ods-textarea__label">
      {{ label }}
      <textarea v-model="textModel" :name="name" :aria-describedby="conditionalErrorId" :aria-required="ariaRequired ? 'true' : null" class="ods-textarea__textarea" :rows="rows" :placeholder="placeholder"></textarea>
    </label>
    <div class="ods-status-message ods-status-message--danger" v-if="errorMessage">
      <h2 class="ods-status-message__heading" :id="errorId"><span class="ods-status-message__icon ods-icon--error-hexa" aria-hidden="true"></span>{{ errorMessage }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OdsTextarea',

  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 4,
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
    textModel: {
      get() {
        return this.text;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
