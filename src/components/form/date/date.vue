<template>
  <div class="ods-date" :class="{ 'ods-date--error': hasError }">
    <label class="ods-date__label">
      {{ label }}
      <input type="text" class="ods-date__input" :value="displayDate" :placeholder="placeholder" autocomplete="off" @focus="toggleDatepicker(true)" @keyup="handleKeyboardInput" />
    </label>
    <div role="alert" class="ods-status-message ods-status-message--danger" v-if="hasError">
      <h2 class="ods-status-message__heading">
        <span class="ods-status-message__icon ods-icon--error-hexa" aria-hidden="true"></span>
        {{ errorMessage }}
      </h2>
    </div>
    <ods-datepicker v-show="showDatepicker" :model-value="datepicker.date" :browse-date="browseDate" :min="min" :max="max" :days="days" :months="months" :btn-prev-month-label="btnPrevMonthLabel" :btn-next-month-label="btnNextMonthLabel" @update:modelValue="onDatepickerClickDay" @change="onDatepickerChange" />
  </div>
</template>

<script>
import odsDatepicker from './datepicker.vue';

export default {
  name: 'OdsDate',
  components: {
    odsDatepicker,
  },
  props: {
    placeholder: {
      type: String,
      default: 'dd.mm.yyyy',
    },
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
    datepicker: { date: null },
    showDatepicker: false,
    browseDate: new Date(),
    errorMessage: '',
  }),
  computed: {
    hasError() {
      return this.errorMessage !== '';
    },
  },
  mounted() {
    this.datepicker.date = this.date || new Date();
    window.addEventListener('click', this.onDatepickerOutside);
    window.addEventListener('keyup', this.onDatepickerOutside);
  },
  unmounted() {
    window.removeEventListener('click', this.onDatepickerOutside);
    window.removeEventListener('keyup', this.onDatepickerOutside);
  },
  methods: {
    browseMonth(direction) {
      const next = new Date(this.browseDate).setMonth(this.browseDate.getMonth() + direction);
      return Math.max(this.min || 0, Math.min(this.max.setHours(23, 59, 59, 999) || Infinity, next));
    },
    browseMonthDisabled(direction) {
      let next = new Date(this.browseDate).setMonth(this.browseDate.getMonth() + direction);
      next = new Date(next).setDate(1);
      return (direction > 0 && next > this.max) || next < this.min;
    },
    toggleDatepicker(bool) {
      this.showDatepicker = bool;
    },
    onDatepickerOutside(event) {
      if (!this.$el.contains(event.target) || event.keyCode === 27) {
        this.toggleDatepicker(false);
      }
    },
    onDatepickerClickDay(date) {
      this.datepicker.date = date;
      this.$emit('set', date);
      this.toggleDatepicker(false);
      this.errorMessage = '';
    },
    onDatepickerChange(newBrowseDate) {
      this.browseDate = newBrowseDate;
    },
    handleKeyboardInput(event) {
      if (event.key !== 'Enter' || event.keyCode !== 13) {
        return;
      }

      const [day, month, year] = event.target.value.split('.').map(Number);
      const inputDate = new Date(year, month - 1, day);

      if (!day || !month || !year || !this.isValidDate(inputDate)) {
        this.errorMessage = this.invalidInputErrorMessage;
        this.$emit('set', null);
      } else if (inputDate < this.min) {
        this.errorMessage = `${this.minDateErrorMessage} (${this.min.toLocaleDateString().replaceAll('/', '.')}).`;
        this.$emit('set', null);
      } else if (inputDate > this.max) {
        this.errorMessage = `${this.maxDateErrorMessage} (${this.max.toLocaleDateString().replaceAll('/', '.')}).`;
        this.$emit('set', null);
      } else {
        this.datepicker.date = inputDate;
        this.$emit('set', this.datepicker.date);
        this.toggleDatepicker(false);
        this.errorMessage = '';
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
