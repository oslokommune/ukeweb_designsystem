<template>
  <div class="osg-date">
    <label class="osg-date__label">
      Pick a date
      <input type="text" pattern="\d{2}-\d{2}-\d{4}" class="osg-date__input" :value="value" autocomplete="off" />
    </label>
    <nrk-core-datepicker class="osg-input-datepicker__datepicker" ref="datepicker" v-show="isDatepickerOpen" days="mån,tir,ons,tor,fre,lør,søn">
      <fieldset class="osg-input-datepicker__datepicker-nav">
        <button class="osg-input-datepicker__datepicker-nav-button osg-input-datepicker__datepicker-nav-button--prev" :value="datepickerPaginateMonth(-1)" :disabled="datepickerPaginateMonthDisabled(-1)" aria-label="Forrige måned">
          <osg-icon class="osg-input-datepicker__datepicker-nav-icon" icon-name="chevron-thin-down" aria-hidden="true" />
        </button>
        <button class="osg-input-datepicker__datepicker-nav-button osg-input-datepicker__datepicker-nav-button--next" :value="datepickerPaginateMonth(+1)" :disabled="datepickerPaginateMonthDisabled(+1)" aria-label="Neste måned">
          <osg-icon class="osg-input-datepicker__datepicker-nav-icon" icon-name="chevron-thin-up" aria-hidden="true" />
        </button>
      </fieldset>
      <table class="osg-input-datepicker__datepicker-calendar"></table>
    </nrk-core-datepicker>
  </div>
</template>
<script>
import CoreDatepicker from "@nrk/core-datepicker";
window.customElements.define("nrk-core-datepicker", CoreDatepicker);

export default {
  name: "OsgDate",
  props: {
    value: {
      type: String,
      default: "",
    },
  },

  mounted: function () {
    this.datepicker = this.$refs.datepicker;
    this.datepicker.disabled = (date) => {
      return (this.maxDate && date > this.maxDate.setHours(23, 59, 59, 999)) || (this.minDate && date < this.minDate);
    };
    this.datepicker.addEventListener("datepicker.change", this.onDatepickerChange);
    this.datepicker.addEventListener("datepicker.click.day", this.onDatepickerClickDay);
    window.addEventListener("click", this.onDatepickerOutside);
    window.addEventListener("keyup", this.onDatepickerOutside);
  },
  destroyed: function () {
    this.datepicker.removeEventListener("datepicker.change", this.onDatepickerChange);
    this.datepicker.removeEventListener("datepicker.click.day", this.onDatepickerClickDay);
    window.removeEventListener("click", this.onDatepickerOutside);
    window.removeEventListener("keyup", this.onDatepickerOutside);
  },
};
</script>
