<template>
  <div class="osg-input" :class="{ 'osg-input--error': errorMessage }">
    <label class="osg-input__label">
      {{ label }}
      <input class="osg-input__input" v-model="valueModel" :type="type" :name="name" :autocomplete="autocomplete" :placeholder="placeholder" :aria-describedby="conditionalErrorId" />
      <span v-if="errorMessage" class="osg-icon osg-icon--exclamation-mark-circle"></span>
    </label>
    <div v-if="errorMessage" class="osg-input__error-message" :id="errorId">{{ errorMessage }}</div>
  </div>
</template>
<script>
export default {
  name: 'OsgInput',

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
