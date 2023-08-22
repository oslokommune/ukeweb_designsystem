<template>
  <nav class="ods-pagination" :aria-label="ariaLabel">
    <button class="ods-pagination__previous" v-show="showArrows && currentIndex > 1" @click.prevent="paginate(currentIndex - 1)">
      <span class="ods-sr-only">{{ i18n.previousButton }} {{ currentIndex - 1 }}</span>
    </button>
    <template v-for="index in totalPages">
      <button v-if="showItem(index)" class="ods-pagination__item" v-bind:class="{ 'ods-pagination__item--current': index === currentIndex, 'ods-pagination__item--rectangle': index >= 100 }" :key="index" :disabled="index === currentIndex && disableCurrentIndexBtn" @click.prevent="paginate(index)">
        <span class="ods-sr-only">{{ i18n.showPage }} {{ index }}</span>
        {{ index }}
      </button>
      <span v-else-if="showSpacer(index)" :key="index" class="ods-pagination__spacer" aria-hidden="true">&hellip;</span>
    </template>
    <button class="ods-pagination__next" v-show="showArrows && currentIndex < totalPages" @click.prevent="paginate(currentIndex + 1)">
      <span class="ods-sr-only">{{ i18n.nextButton }} {{ currentIndex + 1 }}</span>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'OdsPagination',
  props: {
    ariaLabel: {
      type: String,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    disableCurrentIndexBtn: {
      type: Boolean,
      default: true,
    },
    showArrows: {
      type: Boolean,
      default: true,
    },
    threshold: {
      type: Number,
      default: 10,
    },
    limit: {
      type: Number,
      default: 2,
    },
    i18n: {
      type: Object,
      default: () => ({
        previousButton: 'Show previous page',
        nextButton: 'Show next page',
        showPage: 'Show page',
      }),
    },
  },
  computed: {
    limitMax() {
      return this.currentIndex + this.limit;
    },
    limitMin() {
      return this.currentIndex - this.limit;
    },
  },
  methods: {
    showItem(index) {
      const isFirst = index === 1;
      const isLast = index === this.totalPages;
      const isWithinLimit = index >= this.limitMin && index <= this.limitMax;
      const threshold = this.totalPages <= this.threshold;

      return isFirst || isLast || isWithinLimit || threshold;
    },
    showSpacer(index) {
      return this.totalPages > this.threshold && index >= this.limitMin - 1 && index <= this.limitMax + 1;
    },
    paginate(value) {
      this.$emit('paginate', value);
    },
  },
};
</script>
