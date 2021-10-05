<template>
  <div class="osg-date">
    <label class="osg-date__label">
      Pick a date
      <input type="text" pattern="\d{2}-\d{2}-\d{4}" class="osg-date__input" :value="value" autocomplete="off" />
    </label>
    <nrk-core-datepicker class="osg-input-datepicker__datepicker" ref="datepicker" v-show="isDatepickerOpen" days="man,tir,ons,tor,fre,lør,søn">
      <fieldset class="osg-input-datepicker__datepicker-nav">
        <button class="osg-input-datepicker__datepicker-nav-button osg-input-datepicker__datepicker-nav-button--prev" :value="datepickerPaginateMonth(-1)" :disabled="datepickerPaginateMonthDisabled(-1)" aria-label="Forrige måned"></button>
        <button class="osg-input-datepicker__datepicker-nav-button osg-input-datepicker__datepicker-nav-button--next" :value="datepickerPaginateMonth(+1)" :disabled="datepickerPaginateMonthDisabled(+1)" aria-label="Neste måned"></button>
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

  data: () => ({
    isDatepickerOpen: true,
  }),

  mounted: function () {},
  destroyed: function () {},

  methods: {
    datepickerPaginateMonth() {},
    datepickerPaginateMonthDisabled() {},
  },
};
</script>
