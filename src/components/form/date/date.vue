<template>
  <div class="ods-date" :class="{ 'ods-date--error': isError }">
    <label class="ods-date__label">
      {{ label }}
      <input type="text" class="ods-date__input" placeholder="dd.mm.åååå" :value="displayDate" autocomplete="off" v-on:focus="toggleDatepicker(true)" @keyup="handleKeyboardInput" />
    </label>
    <div class="ods-date__error-message" v-if="isError">{{ isError }}</div>
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
  },

  data: () => ({
    datepicker: null,
    showDatepicker: false,
    browseDate: new Date(Date.now()),
    isError: '',
  }),

  mounted() {
    this.datepicker = this.$refs.datepicker;
    this.datepicker.date = this.date ? this.date : new Date();
    this.datepicker.disabled = (date) => (this.max && date > this.max.setHours(23, 59, 59, 999)) || (this.min && date < this.min);

    this.datepicker.addEventListener('datepicker.change', this.onDatepickerChange);
    this.datepicker.addEventListener('datepicker.click.day', this.onDatepickerClickDay);
    window.addEventListener('click', this.onDatepickerOutside);
    window.addEventListener('keyup', this.onDatepickerOutside);
  },

  destroyed() {
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
      this.isError = '';
    },
    onDatepickerChange(event) {
      this.browseDate = event.detail;
    },
    handleKeyboardInput(event) {
      if (event.key === 'Enter' || event.keyCode === 13) {
        const [day, month, year] = event.target.value.split('.').map(Number);
        if (day && month && year) {
          const inputDate = new Date(year, month - 1, day);
          if (this.isValidDate(inputDate)) {
            // Formatting the min and max dates
            const minFormatted = `${this.min.getDate().toString().padStart(2, '0')}.${(this.min.getMonth() + 1).toString().padStart(2, '0')}.${this.min.getFullYear()}`;
            const maxFormatted = `${this.max.getDate().toString().padStart(2, '0')}.${(this.max.getMonth() + 1).toString().padStart(2, '0')}.${this.max.getFullYear()}`;

            if (inputDate < this.min) {
              this.isError = `Valgt dato er før tidligst mulig dato. (${minFormatted}).`; // Error message for date before minDate
              this.resetDatepicker();
            } else if (inputDate > this.max) {
              this.isError = `Valgt dato er etter senest mulig dato. (${maxFormatted}).`; // Error message for date after maxDate
              this.resetDatepicker();
            } else {
              this.datepicker.date = inputDate;
              this.$emit('set', this.datepicker.date);
              this.toggleDatepicker(false);
              this.isError = '';
            }
          } else {
            this.isError = 'Ugyldig dato eller format. Prøv dd.mm.åååå'; // Error message for invalid format or date
            this.resetDatepicker();
          }
        } else {
          this.isError = 'Ugyldig dato eller format. Prøv dd.mm.åååå'; // Error message for empty or incorrect fields
          this.resetDatepicker();
        }
      }
    },

    isValidDate(date) {
      return !Number.isNaN(date.getTime());
    },

    isWithinRange(date) {
      return date >= this.min && date <= this.max;
    },
    resetDatepicker() {
      this.$emit('set', null);
    },
  },
};
</script>
