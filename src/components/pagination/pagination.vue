<template>
  <nav class="osg-pagination" :aria-label="navLabel(currentIndex)">
    <button
      class="osg-pagination__previous"
      v-show="currentIndex !== firstPage"
      @click="paginate(currentIndex - 1)">
      <span class="osg-sr-only">Show previous page</span>
    </button>
    <template v-for="index in totalPages">
      <button
        v-if="showItem(index)"
        class="osg-pagination__item"
        v-bind:class="{ 'osg-pagination__item--current': index === currentIndex, 'osg-pagination__item--rectangle': index > 99 }"
        :key="index"
        :disabled="index === currentIndex"
        @click="paginate(index)"
      >
        <span class="osg-sr-only">Show page </span>
        {{ index }}
      </button>
      <span v-else-if="showSpacer(index)" class="osg-pagination__spacer" :key="index" aria-hidden="true">
        &hellip;
      </span>
    </template>
    <button
      class="osg-pagination__next"
      v-show="currentIndex !== totalPages"
      @click="paginate(currentIndex + 1)">
      <span class="osg-sr-only">Show next page</span>
    </button>
  </nav>
</template>

<script>
export default {
  name: 'OsgPagination',
  props: {
    totalPages: {
      type: Number,
      required: true
    },
    firstPage: {
      type: Number,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    },
    paginate: {
      type: Function,
      required: true
    },
    limit: {
      type: Number,
      default: 2
    }
  },
  computed: {
    limitMax: function () {
      return this.currentIndex + this.limit
    },
    limitMin: function () {
      return this.currentIndex - this.limit
    }
  },
  methods: {
    showItem: function (index) {
      const isFirst = index === 1
      const isLast = index === this.totalPages
      const isWithinLimit = index >= this.limitMin && index <= this.limitMax

      return isFirst || isLast || isWithinLimit
    },
    showSpacer: function (index) {
      return index >= this.limitMin - 1 && index <= this.limitMax + 1
    },

    navLabel: function (index) {
      const isFirst = index === 1
      const isLast = index === this.totalPages

      if (index === isFirst) {
        return 'first page'
      } else if (index === isLast) {
        return 'last page'
      } else {
        return 'page ' + index
      }
    }
  }
}
</script>
