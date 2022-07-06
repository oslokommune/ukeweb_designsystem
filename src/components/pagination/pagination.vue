<template>
  <nav class="osg-pagination" :aria-label="ariaLabel">
    <button class="osg-pagination__previous" v-show="showArrows && currentIndex > 1" @click.prevent="paginate(currentIndex - 1)">
      <span class="osg-sr-only">{{ i18n.previousBtn }} {{ currentIndex - 1 }}</span>
    </button>
    <template v-for="index in totalPages">
      <button v-if="showItem(index)" class="osg-pagination__item" v-bind:class="{ 'osg-pagination__item--current': index === currentIndex, 'osg-pagination__item--rectangle': index >= 100 }" :key="index" :disabled="index === currentIndex && disableCurrentIndexBtn" @click.prevent="paginate(index)">
        <span class="osg-sr-only">{{ i18n.showPage }} {{ index }}</span>
        {{ index }}
      </button>
      <span v-else-if="showSpacer(index)" :key="index" class="osg-pagination__spacer" aria-hidden="true">&hellip;</span>
    </template>
    <button class="osg-pagination__next" v-show="showArrows && currentIndex < totalPages" @click.prevent="paginate(currentIndex + 1)">
      <span class="osg-sr-only">{{ i18n.nextBtn }} {{ currentIndex + 1 }}</span>
    </button>
  </nav>
</template>

<script>
export default {
  name: "OsgPagination",
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
      default: () => {
        return {
          previousBtn: "Show previous page",
          nextBtn: "Show next page",
          showPage: "Show page",
        };
      },
    },
  },
  computed: {
    limitMax: function () {
      return this.currentIndex + this.limit;
    },
    limitMin: function () {
      return this.currentIndex - this.limit;
    },
  },
  methods: {
    showItem: function (index) {
      const isFirst = index === 1;
      const isLast = index === this.totalPages;
      const isWithinLimit = index >= this.limitMin && index <= this.limitMax;
      const isWithinThredhold = this.totalPages <= this.threshold;

      return isFirst || isLast || isWithinLimit || isWithinThredhold;
    },
    showSpacer: function (index) {
      return this.totalPages > this.threshold && index >= this.limitMin - 1 && index <= this.limitMax + 1;
    },
    paginate: function (value) {
      this.$emit("paginate", value);
    },
  },
};
</script>
