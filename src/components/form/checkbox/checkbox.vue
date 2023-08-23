<template>
  <div>
    <div class="osg-checkbox">
      <label class="osg-checkbox__wrapper">
        <input type="checkbox" v-model="checkedModel" :value="value" :name="name" :aria-describedby="conditionalErrorId" />
        <span class="osg-checkbox__checkmark"></span>
        <span class="osg-checkbox__text">{{ text }}</span>
      </label>
    </div>
    <div v-if="errorMessage" class="osg-checkbox osg-checkbox--error-message" :id="errorId">{{ errorMessage }}</div>
  </div>
</template>
<script>
export default {
  name: 'OsgCheckbox',

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
