<template>
  <div class="ods-carousel" :class="settings.modifier">
    <div class="ods-carousel__content" ref="content">
      <div class="ods-carousel__navigation" v-if="images.length > 1">
        <button class="ods-button ods-button--circle ods-button--yellow" :aria-label="i18n.previousButton" @click="goToPrev">
          <span class="ods-button__icon ods-icon--chevron-left"></span>
        </button>
        <button class="ods-button ods-button--circle ods-button--yellow" :aria-label="i18n.nextButton" @click="goToNext">
          <span class="ods-button__icon ods-icon--chevron-right"></span>
        </button>
      </div>
      <div ref="track" class="ods-carousel__track" :style="trackStyle">
        <div class="ods-carousel__slides" ref="slides">
          <figure v-for="slide in displaySlides" v-bind:key="slide.key" :style="slideStyle" :aria-hidden="slide.isClone ? 'true' : null">
            <picture v-if="slide.image.sources.length">
              <source v-for="(source, sourceIndex) in slide.image.sources" :key="sourceIndex" :srcset="source.src" :media="source.media" />
              <img :src="slide.image.sources[0].src" :alt="slide.image.alt" />
            </picture>
          </figure>
        </div>
      </div>
    </div>
    <!-- Centered ratios keep the text of every image under its own image, cut off at the edges of the carousel -->
    <div v-if="hasSlideCaptions" class="ods-carousel__captions">
      <div class="ods-carousel__captions__track" :style="captionsTrackStyle">
        <div v-for="slide in displaySlides" v-bind:key="slide.key" class="ods-carousel__captions__item" :style="slideStyle" :aria-hidden="slide.isClone ? 'true' : null">
          <span v-if="slide.image.description" class="ods-carousel__captions__item__description">{{ slide.image.description }}</span
          ><span v-if="slide.image.credits">{{ slide.image.credits }}</span>
        </div>
      </div>
    </div>
    <div v-else-if="currentImage" class="ods-carousel__info">
      <span v-if="currentImage.description.length" class="ods-carousel__info__description">{{ currentImage.description }}</span
      ><span v-if="currentImage.credits.length">{{ currentImage.credits }}</span>
    </div>
    <div v-if="images.length > 1" class="ods-carousel__pagination" aria-hidden="true">
      <span v-for="slideNumber in images.length" v-bind:key="`pagination-${slideNumber}`" class="ods-carousel__pagination__item" :class="{ 'ods-carousel__pagination__item--current': slideNumber === currentSlide }"></span>
    </div>
  </div>
</template>

<script>
/**
 * Ratio modifiers of the component, mapped to their width / height value.
 */
const MODIFIER_RATIOS = {
  'ods-carousel--ratio-1-1': 1,
  'ods-carousel--ratio-9-16': 9 / 16,
};

/**
 * Ratio used when no ratio modifier is set.
 */
const DEFAULT_RATIO = 16 / 9;

export default {
  name: 'ImageCarousel',

  props: {
    /**
     * Slide number to start on.
     */
    initialSlide: {
      type: Number,
      default: 1,
    },

    /**
     * Slide animation duration in milliseconds
     */
    speed: {
      type: Number,
      default: 300,
    },

    /**
     * Transition timing function
     * Available: ease, linear, ease-in, ease-out, ease-in-out
     */
    timing: {
      type: String,
      default: 'ease-in-out',
    },

    /**
     * Modifier class of the carousel.
     * Available: ods-carousel--ratio-1-1, ods-carousel--ratio-9-16
     * Without a modifier the images are 16:9 and fill the whole carousel width.
     * The ratio modifiers show the whole image in the middle and use the space
     * left on both sides to show the previous and the next image.
     */
    modifier: {
      type: String,
      default: '',
      validator: (value) => value === '' || Object.keys(MODIFIER_RATIOS).includes(value),
    },

    /**
     * Settings object.
     * Used as an alternative to setting individual props.
     */
    options: {
      type: Object,
      default: () => null,
    },

    images: {
      type: Array,
      required: true,
    },

    i18n: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      currentSlide: null,
      position: 0,
      clonesPerSide: 0,
      transitionDelay: 0,
      translateX: 0,
      widthContainer: 0,
      heightContainer: 0,
      widthSlide: 0,
      gapSlide: 0,
      isSlideChanging: false,
      settings: {},
      initialSettings: {
        initialSlide: this.initialSlide,
        speed: this.speed,
        timing: this.timing,
        modifier: this.modifier,
      },
    };
  },

  created() {
    if (this.options) {
      Object.keys(this.options).forEach((key) => {
        this.initialSettings[key] = this.options[key];
      });
    }

    // Load settings
    Object.assign(this.settings, this.initialSettings);

    this.currentSlide = this.settings.initialSlide;
  },

  mounted() {
    // Windows resize listener
    window.addEventListener('resize', this.calculateSizes);

    // Init carousel
    this.reload();
  },

  beforeUnmount() {
    // Remove resize listener
    window.removeEventListener('resize', this.calculateSizes);
  },

  computed: {
    currentImage() {
      if (!this.images) {
        return null;
      }

      return this.images[this.currentSlide - 1];
    },

    /**
     * Ratio of the images as a width / height value
     */
    ratioValue() {
      return MODIFIER_RATIOS[this.settings.modifier] || DEFAULT_RATIO;
    },

    /**
     * Without a ratio modifier the images take the full carousel width,
     * the ratio modifiers center the image instead
     */
    isFullWidthRatio() {
      return !MODIFIER_RATIOS[this.settings.modifier];
    },

    /**
     * Centered ratios show the text of every image under its own image,
     * instead of only the text of the current image under the carousel
     */
    hasSlideCaptions() {
      return !this.isFullWidthRatio;
    },

    /**
     * Images to render, surrounded by as many clones as needed to fill
     * the space on both sides of the centered image.
     */
    displaySlides() {
      const images = this.images || [];
      const total = images.length;

      if (total < 2 || this.clonesPerSide === 0) {
        return images.map((image, index) => ({ image, index, key: `slide-${index}`, isClone: false }));
      }

      const slides = [];

      for (let i = this.clonesPerSide * -1; i < total + this.clonesPerSide; i += 1) {
        const index = ((i % total) + total) % total;

        slides.push({ image: images[index], index, key: `slide-${i}`, isClone: i < 0 || i >= total });
      }

      return slides;
    },

    /**
     * The images and their text move together
     */
    trackStyle() {
      return { transform: `translate(${this.translateX}px)`, transition: `transform ${this.settings.timing} ${this.transitionDelay}ms` };
    },

    /**
     * The text follows the gap of the images, whatever the ratio sets in CSS
     */
    captionsTrackStyle() {
      return { ...this.trackStyle, gap: `${this.gapSlide}px` };
    },

    slideStyle() {
      return { width: `${this.widthSlide}px` };
    },

    /**
     * Distance from one slide to the next one, gap included
     */
    widthStep() {
      return this.widthSlide + this.gapSlide;
    },
  },

  methods: {
    // Reload carousel
    reload() {
      this.prepareSettings();
      this.calculateSizes();
      this.goTo(this.position, false);
    },

    /**
     * Prepare settings object
     */
    prepareSettings() {
      this.settings = { ...this.initialSettings };
    },

    /**
     * Set container size, slide width and clone amount,
     * remove transition and calculate transition offset
     */
    calculateSizes() {
      if (!this.$refs.content) {
        return;
      }

      this.widthContainer = this.$refs.content.clientWidth;
      this.heightContainer = this.$refs.content.clientHeight;

      // The space between the slides is set by the ratio modifier in CSS
      this.gapSlide = this.$refs.slides ? parseFloat(window.getComputedStyle(this.$refs.slides).columnGap) || 0 : 0;

      // The container height is set by the ratio modifier in CSS,
      // the centered image is as wide as that height allows
      this.widthSlide = this.isFullWidthRatio ? this.widthContainer : Math.min(this.widthContainer, Math.round(this.heightContainer * this.ratioValue));

      this.updateClones();

      this.transitionDelay = 0;
      this.translateX = this.offsetOf(this.position);
    },

    /**
     * Amount of clones needed on each side to never run out of images
     * in the space next to the centered image.
     * Enough clones to fill that space, plus one extra for the position the
     * carousel moves to before it jumps back to the original image.
     */
    updateClones() {
      const total = this.images.length;
      let clonesPerSide = 0;

      if (total > 1 && this.widthStep > 0) {
        const spaceOnSide = Math.max(0, (this.widthContainer - this.widthSlide) / 2);

        clonesPerSide = Math.ceil(spaceOnSide / this.widthStep) + 1;
      }

      if (clonesPerSide !== this.clonesPerSide) {
        this.clonesPerSide = clonesPerSide;
        this.position = clonesPerSide + this.currentSlide - 1;
      }
    },

    /**
     * Track offset for a slide position, centered in the container
     */
    offsetOf(position) {
      return position * this.widthStep * -1 + (this.widthContainer - this.widthSlide) / 2;
    },

    /**
     * Position of the original image a clone position refers to
     */
    normalizePosition(position) {
      const total = this.images.length;

      if (total < 2 || this.clonesPerSide === 0) {
        return position;
      }

      return this.clonesPerSide + ((((position - this.clonesPerSide) % total) + total) % total);
    },

    // Go to next slide
    goToNext() {
      this.goTo(this.position + 1);
    },
    // Go to previous slide
    goToPrev() {
      this.goTo(this.position - 1);
    },

    // Go to slide
    goTo(position, transition = true) {
      if (position < 0 || position > this.displaySlides.length - 1 || this.isSlideChanging) {
        return;
      }

      if (transition) {
        this.isSlideChanging = true;
        const nextPosition = this.normalizePosition(position);

        setTimeout(() => {
          this.isSlideChanging = false;
        }, this.settings.speed);

        if (position !== nextPosition) {
          setTimeout(() => {
            this.goTo(nextPosition, false);
          }, this.settings.speed);
        }
      }
      this.transitionDelay = transition ? this.settings.speed : 0;
      this.position = position;
      this.translateX = this.offsetOf(position);

      this.updateCurrentSlideIndex(position);
    },

    updateCurrentSlideIndex(position) {
      const slide = this.displaySlides[position];

      if (slide) {
        this.currentSlide = slide.index + 1;
      }
    },
  },
};
</script>
