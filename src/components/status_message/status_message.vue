<template>
  <div class="ods-status-message" :class="variantClass" :role="role">
    <h2 v-if="hasHeading" class="ods-status-message__heading">
      <span :class="iconClasses" aria-hidden="true"></span>
      <slot name="heading">{{ heading }}</slot>
    </h2>
    <p v-if="hasContent" class="ods-status-message__content">
      <span v-if="!hasHeading" :class="iconClasses" aria-hidden="true"></span>
      <slot>{{ content }}</slot>
    </p>
    <p v-if="hasDate" class="ods-status-message__date">
      <slot name="date">{{ date }}</slot>
    </p>
  </div>
</template>

<script>
/**
 * Icon of every variant. The variant decides the icon, it cannot be changed.
 */
const ICON_VARIANTS = {
  '': 'exclamation-mark-circle',
  info: 'information',
  success: 'success-square',
  warning: 'warning-triangle',
  danger: 'error-hexa',
};

const DEFAULT_VARIANT = '';
const ALERT_VARIANT = 'danger';

export default {
  name: 'OdsStatusMessage',

  props: {
    /**
     * Type of message.
     * Available: info, success, warning, danger
     * Without a variant the message is gray.
     */
    variant: {
      type: String,
      default: DEFAULT_VARIANT,
      validator: (value) => Object.keys(ICON_VARIANTS).includes(value),
    },

    /**
     * Title of the message.
     * Can also be set with the heading slot.
     */
    heading: {
      type: String,
      default: '',
    },

    /**
     * Text of the message.
     * Can also be set with the default slot.
     */
    content: {
      type: String,
      default: '',
    },

    /**
     * Date of the message, shown under the text.
     * Only used together with a heading.
     * Can also be set with the date slot.
     */
    date: {
      type: String,
      default: '',
    },
  },

  computed: {
    /**
     * The danger variant is used for errors, which a screen reader reads out
     * right away. The other variants wait until the screen reader is done with
     * what it is reading.
     */
    role() {
      return this.variant === ALERT_VARIANT ? 'alert' : 'status';
    },

    variantClass() {
      return this.variant ? `ods-status-message--${this.variant}` : null;
    },

    iconClasses() {
      return ['ods-status-message__icon', `ods-icon--${ICON_VARIANTS[this.variant] || ICON_VARIANTS[DEFAULT_VARIANT]}`];
    },

    hasHeading() {
      return Boolean(this.heading || this.$slots.heading);
    },

    hasContent() {
      return Boolean(this.content || this.$slots.default);
    },

    hasDate() {
      return Boolean(this.hasHeading && (this.date || this.$slots.date));
    },
  },
};
</script>
