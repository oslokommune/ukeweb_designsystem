<template>
  <div class="osg-date">
    <label class="osg-date__label">
      {{ label }}
      <input type="text" class="osg-date__input" :value="displayDate" autocomplete="off" v-on:focus="toggleDatepicker(true)" />
    </label>
    <nrk-core-datepicker class="osg-date__datepicker" ref="datepicker" v-show="showDatepicker" :days="days" :months="months">
      <fieldset class="osg-date__datepicker__nav">
        <button class="osg-date__datepicker__button osg-date__datepicker__button--prev" :value="browseMonth(-1)" :disabled="browseMonthDisabled(-1)" :aria-label="btnPrevMonthLabel"></button>
        <button class="osg-date__datepicker__button osg-date__datepicker__button--next" :value="browseMonth(+1)" :disabled="browseMonthDisabled(+1)" :aria-label="btnNextMonthLabel"></button>
      </fieldset>
      <table class="osg-date__datepicker__calendar"></table>
    </nrk-core-datepicker>
  </div>
</template>

<script>
import CoreDatepicker from "@nrk/core-datepicker";
window.customElements.define("nrk-core-datepicker", CoreDatepicker);

export default {
  name: "OsgDate",
  props: {
    label: {
      type: String,
      default: "Pick a date",
    },
    date: {
      type: Date,
      default: null,
    },
    displayDate: {
      type: String,
      default: "",
    },
    min: {
      type: Date,
      default: () => {
        return new Date("1900-01-01");
      },
    },
    max: {
      type: Date,
      default: () => {
        return new Date("2100-01-01");
      },
    },
    days: {
      type: String,
      default: "man,tir,ons,tor,fre,lør,søn",
    },
    months: {
      type: String,
      default: "januar,februar,mars,april,mai,juni,juli,august,september,oktober,november,desember",
    },
    btnPrevMonthLabel: {
      type: String,
      default: "Forrige måned",
    },
    btnNextMonthLabel: {
      type: String,
      default: "Neste måned",
    },
  },

  data: () => ({
    datepicker: null,
    showDatepicker: false,
    browseDate: new Date(Date.now()),
  }),

  mounted() {
    this.datepicker = this.$refs.datepicker;
    this.datepicker.date = this.date ? this.date : new Date();
    this.datepicker.disabled = (date) => {
      return (this.max && date > this.max.setHours(23, 59, 59, 999)) || (this.min && date < this.min);
    };

    this.datepicker.addEventListener("datepicker.change", this.onDatepickerChange);
    this.datepicker.addEventListener("datepicker.click.day", this.onDatepickerClickDay);
    window.addEventListener("click", this.onDatepickerOutside);
    window.addEventListener("keyup", this.onDatepickerOutside);
  },

  destroyed() {
    this.datepicker.removeEventListener("datepicker.change", this.onDatepickerChange);
    this.datepicker.removeEventListener("datepicker.click.day", this.onDatepickerClickDay);
    window.removeEventListener("click", this.onDatepickerOutside);
    window.removeEventListener("keyup", this.onDatepickerOutside);
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
      this.$emit("set", this.datepicker.date);
      this.toggleDatepicker(false);
    },
    onDatepickerChange(event) {
      this.browseDate = event.detail;
    },
  },
};
</script>
