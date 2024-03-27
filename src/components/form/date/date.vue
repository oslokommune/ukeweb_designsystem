<template>
  <div class="ods-date" :class="{ 'ods-date--error': hasError }">
    <label class="ods-date__label">
      {{ label }}
      <input type="text" class="ods-date__input" :value="displayDate" autocomplete="off" v-on:focus="toggleDatepicker(true)" @keyup="handleKeyboardInput" />
    </label>
    <div role="alert" class="ods-status-message ods-status-message--danger" v-if="hasError">
      <h2 class="ods-status-message__heading"><span class="ods-status-message__icon ods-icon--error-hexa" aria-hidden="true"></span>{{ errorMessage }}</h2>
    </div>

    <nrk-core-datepicker class="ods-date__datepicker" ref="datepicker" v-show="showDatepicker" :days="days" :months="months">
      <fieldset class="ods-date__datepicker__nav">
        <button class="ods-date__datepicker__button ods-date__datepicker__button--prev" :value="browseMonth(-1)" :disabled="browseMonthDisabled(-1)" :aria-label="btnPrevMonthLabel"></button>
        <button class="ods-date__datepicker__button ods-date__datepicker__button--next" :value="browseMonth(+1)" :disabled="browseMonthDisabled(+1)" :aria-label="btnNextMonthLabel"></button>
      </fieldset>
      <table class="ods-date__datepicker__calendar"></table>
    </nrk-core-datepicker>
  </div>
</template>

<script>
import CoreDatepicker from '@nrk/core-datepicker';

window.customElements.define('nrk-core-datepicker', CoreDatepicker);

export default {
  name: 'OdsDate',
  props: {
    label: {
      type: String,
      default: 'Pick a date',
    },
    date: {
      type: Date,
      default: null,
    },
    displayDate: {
      type: String,
      default: '',
    },
    min: {
      type: Date,
      default: () => new Date('1900-01-01'),
    },
    max: {
      type: Date,
      default: () => new Date('2100-01-01'),
    },
    days: {
      type: String,
      default: 'mon,tue,wed,thu,fri,sat,sun',
    },
    months: {
      type: String,
      default: 'January,February,March,April,May,June,July,August,September,October,November,December',
    },
    btnPrevMonthLabel: {
      type: String,
      default: 'Last month',
    },
    btnNextMonthLabel: {
      type: String,
      default: 'Next month',
    },
    minDateErrorMessage: {
      type: String,
      default: 'Date is before the earliest allowed date.',
    },
    maxDateErrorMessage: {
      type: String,
      default: 'Date is after the latest allowed date',
    },
    invalidInputErrorMessage: {
      type: String,
      default: 'Invalid date or format. Try dd.mm.yyyy',
    },
  },

  data: () => ({
    datepicker: null,
    showDatepicker: false,
    browseDate: new Date(Date.now()),
    errorMessage: '',
  }),

  computed: {
    hasError() {
      return this.errorMessage !== '';
    },
  },

  mounted() {
    this.datepicker = this.$refs.datepicker;
    this.datepicker.date = this.date ? this.date : new Date();
    this.datepicker.disabled = (date) => (this.max && date > this.max.setHours(23, 59, 59, 999)) || (this.min && date < this.min);

    this.datepicker.addEventListener('datepicker.change', this.onDatepickerChange);
    this.datepicker.addEventListener('datepicker.click.day', this.onDatepickerClickDay);
    window.addEventListener('click', this.onDatepickerOutside);
    window.addEventListener('keyup', this.onDatepickerOutside);
  },

  unmounted() {
    this.datepicker.removeEventListener('datepicker.change', this.onDatepickerChange);
    this.datepicker.removeEventListener('datepicker.click.day', this.onDatepickerClickDay);
    window.removeEventListener('click', this.onDatepickerOutside);
    window.removeEventListener('keyup', this.onDatepickerOutside);
  },

  methods: {
    browseMonth(direction) {
      const next = new Date(this.browseDate).setMonth(this.browseDate.getMonth() + direction);
      return Math.max(this.min || 0, Math.min(this.max.setHours(23, 59, 59, 999) || Infinity, next));
    },
    browseMonthDisabled(direction) {
      if (this.datepicker) {
        let next = new Date(this.browseDate).setMonth(this.browseDate.getMonth() + direction);
        next = new Date(next).setDate(1);
        return (direction > 0 && next > this.max) || next < this.min;
      }
      return false;
    },
    toggleDatepicker(bool) {
      this.showDatepicker = bool;
    },
    onDatepickerOutside(event) {
      if (!this.$el.contains(event.target) || event.keyCode === 27) {
        this.toggleDatepicker(false);
      }
    },
    onDatepickerClickDay() {
      this.$emit('set', this.datepicker.date);
      this.toggleDatepicker(false);
      this.errorMessage = '';
    },
    onDatepickerChange(event) {
      this.browseDate = event.detail;
    },
    handleKeyboardInput(event) {
      if (event.key === 'Enter' || event.keyCode === 13) {
        const [day, month, year] = event.target.value.split('.').map(Number);
        const inputDate = new Date(year, month - 1, day);
        const minFormatted = `${this.min.getDate().toString().padStart(2, '0')}.${(this.min.getMonth() + 1).toString().padStart(2, '0')}.${this.min.getFullYear()}`;
        const maxFormatted = `${this.max.getDate().toString().padStart(2, '0')}.${(this.max.getMonth() + 1).toString().padStart(2, '0')}.${this.max.getFullYear()}`;

        if (!day || !month || !year || !this.isValidDate(inputDate)) {
          this.errorMessage = `${this.invalidInputErrorMessage}`;
          this.$emit('set', null);
        } else if (inputDate < this.min) {
          this.errorMessage = `${this.minDateErrorMessage} (${minFormatted}).`;
          this.$emit('set', null);
        } else if (inputDate > this.max) {
          this.errorMessage = `${this.maxDateErrorMessage} (${maxFormatted}).`;
          this.$emit('set', null);
        } else {
          this.datepicker.date = inputDate;
          this.$emit('set', this.datepicker.date);
          this.toggleDatepicker(false);
          this.errorMessage = '';
        }
      }
    },

    isValidDate(date) {
      return !Number.isNaN(date.getTime());
    },

    isWithinRange(date) {
      return date >= this.min && date <= this.max;
    },
  },
};
</script>
