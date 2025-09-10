<template>
  <div class="ods-date__datepicker">
    <fieldset class="ods-date__datepicker__nav">
      <button class="ods-date__datepicker__button ods-date__datepicker__button--prev" type="button" :disabled="isPrevDisabled" :aria-label="btnPrevMonthLabel" @click="goMonth(-1)" />
      <button class="ods-date__datepicker__button ods-date__datepicker__button--next" type="button" :disabled="isNextDisabled" :aria-label="btnNextMonthLabel" @click="goMonth(1)" />
    </fieldset>
    <table class="ods-date__datepicker__calendar" @keydown.stop="onCalendarKeydown" ref="grid">
      <caption>
        {{
          monthsArr[currentMonth]
        }},
        {{
          currentYear
        }}
      </caption>
      <thead>
        <tr>
          <th v-for="(dayLabel, headerIndex) in daysArr" :key="headerIndex">
            {{ dayLabel }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
          <td v-for="(cell, dayIndex) in week" :key="dayIndex">
            <button type="button" :value="buttonValue(cell.date)" :disabled="isDisabled(cell.date)" :data-adjacent="!cell.inMonth" :aria-current="isToday(cell.date) ? 'date' : null" :aria-selected="isSelected(cell.date)" :tabindex="isFocused(cell.date) ? 0 : -1" @click="onClickDay(cell.date)" @focus="focusDate = new Date(cell.date)">
              {{ cell.date.getDate() }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'odsDatepicker',
  props: {
    modelValue: { type: Date, default: null },
    browseDate: { type: Date, default: () => new Date() },
    min: { type: Date, default: () => new Date('1900-01-01') },
    max: { type: Date, default: () => new Date('2100-01-01') },
    months: {
      type: [String, Array],
      default: () => 'January,February,March,April,May,June,July,August,September,October,November,December',
    },
    days: { type: [String, Array], default: () => 'mon,tue,wed,thu,fri,sat,sun' },
    btnPrevMonthLabel: { type: String, default: 'Last month' },
    btnNextMonthLabel: { type: String, default: 'Next month' },
  },
  emits: ['update:modelValue', 'change', 'click-day'],

  data() {
    const base = this.browseDate || this.modelValue || new Date();
    return {
      visibleYear: base.getFullYear(),
      visibleMonth: base.getMonth(),
      focusDate: new Date(this.modelValue || base),
    };
  },

  computed: {
    monthsArr() {
      return Array.isArray(this.months)
        ? this.months
        : String(this.months)
            .split(',')
            .map((s) => s.trim());
    },
    daysArr() {
      return Array.isArray(this.days)
        ? this.days
        : String(this.days)
            .split(',')
            .map((s) => s.trim());
    },

    currentYear() {
      return this.visibleYear;
    },
    currentMonth() {
      return this.visibleMonth;
    },
    firstOfMonth() {
      return new Date(this.currentYear, this.currentMonth, 1);
    },

    weeks() {
      const start = this.startOfCalendar(this.firstOfMonth);
      const weeksArray = [];
      const currentDate = new Date(start);

      for (let weekIndex = 0; weekIndex < 6; weekIndex += 1) {
        const week = [];
        for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
          week.push({
            date: new Date(currentDate),
            inMonth: currentDate.getMonth() === this.currentMonth,
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
        weeksArray.push(week);
      }
      return weeksArray;
    },

    isPrevDisabled() {
      const next = new Date(this.browseDate);
      next.setMonth(this.browseDate.getMonth() - 1);
      next.setDate(1);
      return next > this.max || next < this.min;
    },
    isNextDisabled() {
      const next = new Date(this.browseDate);
      next.setMonth(this.browseDate.getMonth() + 1);
      next.setDate(1);
      return next > this.max || next < this.min;
    },
  },

  watch: {
    browseDate(newBrowseDate) {
      if (!newBrowseDate) return;
      this.visibleYear = newBrowseDate.getFullYear();
      this.visibleMonth = newBrowseDate.getMonth();

      const firstOfVisible = new Date(this.visibleYear, this.visibleMonth, 1);
      if (this.focusDate.getMonth() !== this.visibleMonth || this.focusDate.getFullYear() !== this.visibleYear) {
        this.focusDate = firstOfVisible;
        this.$nextTick(() => this.focusButton());
      }
    },

    modelValue(newValue) {
      if (!newValue) return;
      this.focusDate = new Date(newValue);
      this.visibleYear = newValue.getFullYear();
      this.visibleMonth = newValue.getMonth();
      this.$nextTick(() => this.focusButton());
    },
  },

  mounted() {
    this.$nextTick(() => this.focusButton());
  },

  methods: {
    startOfCalendar(firstOfMonth) {
      const dayOfWeek = firstOfMonth.getDay() || 7;
      const start = new Date(firstOfMonth);
      start.setDate(firstOfMonth.getDate() - (dayOfWeek - 1));
      return start;
    },

    isToday(dateObj) {
      const today = new Date();
      return dateObj.getFullYear() === today.getFullYear() && dateObj.getMonth() === today.getMonth() && dateObj.getDate() === today.getDate();
    },

    isSelected(dateObj) {
      const selected = this.modelValue;
      if (!selected) return false;
      return dateObj.getFullYear() === selected.getFullYear() && dateObj.getMonth() === selected.getMonth() && dateObj.getDate() === selected.getDate();
    },

    isFocused(dateObj) {
      return dateObj.getFullYear() === this.focusDate.getFullYear() && dateObj.getMonth() === this.focusDate.getMonth() && dateObj.getDate() === this.focusDate.getDate();
    },

    stripTime(dateObj) {
      return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
    },

    endOfDay(dateObj) {
      return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 23, 59, 59, 999);
    },

    inRange(dateObj) {
      const afterMin = this.min ? dateObj >= this.stripTime(this.min) : true;
      const beforeMax = this.max ? dateObj <= this.endOfDay(this.max) : true;
      return afterMin && beforeMax;
    },

    isDisabled(dateObj) {
      return !this.inRange(dateObj);
    },

    buttonValue(dateObj) {
      return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
    },

    focusButton() {
      const gridEl = this.$refs.grid;
      if (!gridEl) return;
      const focusable = gridEl.querySelector('button[tabindex="0"]:not(:disabled)');
      if (focusable) focusable.focus();
    },

    goMonth(delta) {
      const next = new Date(this.currentYear, this.currentMonth + delta, 1);
      this.visibleYear = next.getFullYear();
      this.visibleMonth = next.getMonth();

      const clampedDay = Math.min(this.focusDate.getDate(), 28);
      this.focusDate = new Date(this.visibleYear, this.visibleMonth, clampedDay);

      this.$emit('change', new Date(this.visibleYear, this.visibleMonth, 1));
      this.$nextTick(() => this.focusButton());
    },

    onClickDay(dateObj) {
      if (this.isDisabled(dateObj)) return;
      const picked = new Date(dateObj);
      this.$emit('update:modelValue', picked);
      this.$emit('click-day', picked);
    },

    onCalendarKeydown(event) {
      const keyMap = {
        ArrowLeft: -1,
        ArrowUp: -7,
        ArrowRight: 1,
        ArrowDown: 7,
      };

      const action = keyMap[event.key];
      if (action === undefined) return;

      event.preventDefault();

      const newFocusDate = new Date(this.focusDate);
      newFocusDate.setDate(newFocusDate.getDate() + action);

      const prevMonthIndex = this.currentMonth;
      const prevYear = this.currentYear;
      const newMonthIndex = newFocusDate.getMonth();
      const newYear = newFocusDate.getFullYear();

      this.focusDate = newFocusDate;

      if (newMonthIndex !== prevMonthIndex || newYear !== prevYear) {
        this.visibleMonth = newMonthIndex;
        this.visibleYear = newYear;
        this.$emit('change', new Date(this.visibleYear, this.visibleMonth, 1));
      }

      this.$nextTick(() => this.focusButton());
    },
  },
};
</script>
