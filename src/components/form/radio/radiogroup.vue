<template>
  <div>
    <fieldset class="ods-fieldset ods-fieldset--no-border" :aria-describedby="conditionalErrorId">
      <legend>{{ fieldsetText }}</legend>
      <ods-radio
        v-for="(label, value, index) in items"
        :key="index"
        :name="name"
        :text="label"
        :value="value"
        :selected="selectedModel"
        :has-error="errorMessage.length > 0 ? true : false"
        v-on:select="
          (value) => {
            selectedModel = value;
          }
        "
      ></ods-radio>
    </fieldset>
    <div role="alert" class="ods-status-message ods-status-message--danger" v-if="errorMessage">
      <p class="ods-status-message__content" :id="errorId"><span class="ods-status-message__icon ods-icon--error-hexa" aria-hidden="true"></span>{{ errorMessage }}</p>
    </div>
  </div>
</template>
<script>
import OdsRadio from './radio.vue';

export default {
  name: 'OdsRadioGroup',

  components: { OdsRadio },

  props: {
    name: {
      type: String,
      required: true,
    },

    items: {
      type: Object,
      required: true,
    },

    fieldsetText: {
      type: String,
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

    selected: {
      type: String,
      required: true,
    },
  },

  computed: {
    conditionalErrorId() {
      return this.errorMessage ? this.errorId : '';
    },
    selectedModel: {
      get() {
        return this.selected;
      },
      set(value) {
        this.$emit('select', value);
      },
    },
  },
};
</script>
