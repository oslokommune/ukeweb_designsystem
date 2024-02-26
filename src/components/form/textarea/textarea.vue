<template>
  <div class="ods-textarea" :class="{ 'ods-textarea--error': errorMessage }">
    <label class="ods-textarea__label">
      {{ label }}
      <textarea v-model="textModel" :name="name" :aria-describedby="conditionalErrorId" :aria-required="ariaRequired ? 'true' : null" class="ods-textarea__textarea" :rows="rows" :placeholder="placeholder"></textarea>
    </label>
    <div v-if="errorMessage" class="ods-input__error-message" :id="errorId">{{ errorMessage }}</div>
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
