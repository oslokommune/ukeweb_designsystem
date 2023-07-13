<template>
  <div>
    <fieldset class="osg-fieldset osg-fieldset--no-border" :aria-describedby="conditionalErrorId">
      <legend>{{ fieldsetText }}</legend>
      <osg-radio
        v-for="(label, value, index) in items"
        :key="index"
        :name="name"
        :label="label"
        :value="value"
        :selected="selectedModel"
        :has-error="errorMessage.length > 0 ? true : false"
        v-on:select="
          (value) => {
            selectedModel = value;
          }
        "
      ></osg-radio>
    </fieldset>
    <div v-if="errorMessage" class="osg-radio__error-message" :id="errorId">{{ errorMessage }}</div>
  </div>
</template>
<script>
import OsgRadio from './radio.vue';

export default {
  name: 'OsgRadioGroup',

  components: { OsgRadio },

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
