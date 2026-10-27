<template>
  <div class="ods-carousel" :class="{ 'ods-carousel--centered': isCentered }">
    <div class="ods-carousel__content" ref="content">
      <div class="ods-carousel__navigation" v-if="images.length > 1">
        <button class="ods-button ods-button--circle" :class="buttonClass" :aria-label="i18n.previousButton" @click="goToPrev">
          <span class="ods-button__icon ods-icon--chevron-left"></span>
        </button>
        <button class="ods-button ods-button--circle" :class="buttonClass" :aria-label="i18n.nextButton" @click="goToNext">
          <span class="ods-button__icon ods-icon--chevron-right"></span>
        </button>
      </div>
      <div ref="track" class="ods-carousel__track" :style="trackStyle">
        <div class="ods-carousel__slides" ref="slides">
          <!-- The text of an image travels with it, so it keeps the same distance to its own image whatever ratio the image has -->
          <figure v-for="slide in displaySlides" v-bind:key="slide.key" class="ods-carousel__slide" :style="slideStyle" :aria-hidden="slide.isClone ? 'true' : null">
            <div class="ods-carousel__slide__image" :class="slide.ratioClass">
              <picture v-if="slide.image.sources.length">
                <source v-for="(source, sourceIndex) in slide.image.sources" :key="sourceIndex" :srcset="source.src" :media="source.media" />
                <img :src="slide.image.sources[0].src" :alt="slide.image.alt" />
              </picture>
            </div>
            <figcaption v-if="hasSlideCaptions" class="ods-carousel__slide__caption">
              <span v-if="slide.image.description" class="ods-carousel__slide__caption__description">{{ slide.image.description }}</span
              ><span v-if="slide.image.credits">{{ slide.image.credits }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
    <div v-if="!hasSlideCaptions && currentImage" class="ods-carousel__info">
      <span v-if="currentImage.description.length" class="ods-carousel__info__description">{{ currentImage.description }}</span
      ><span v-if="currentImage.credits.length">{{ currentImage.credits }}</span>
    </div>
    <div v-if="hasPagination" class="ods-carousel__pagination" aria-hidden="true">
      <span v-for="slideNumber in images.length" v-bind:key="`pagination-${slideNumber}`" class="ods-carousel__pagination__item" :class="{ 'ods-carousel__pagination__item--current': slideNumber === currentSlide }"></span>
    </div>
  </div>
</template>

<script>
/**
 * Layouts the carousel can use.
 * The full layout gives the whole carousel width to one image at a time and
 * lets the image keep its own shape. The centered layout shows the whole image
 * in the middle and uses the space left on both sides to show the previous and
 * the next image.
 */
const LAYOUTS = ['full', 'centered'];

const DEFAULT_LAYOUT = 'full';

/**
 * Ratios an image can be shown in, in the centered layout. An image can pick
 * one of these for itself, so a carousel can mix them.
 */
const RATIOS = ['1:1', '9:16'];

const DEFAULT_RATIO = '1:1';

/**
 * Colours the buttons that move the carousel can take.
 */
const BUTTONS = ['yellow', 'gray'];

const DEFAULT_BUTTON = 'yellow';

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
     * Carousel layout.
     * Available: full, centered
     * full gives the whole carousel width to one image at a time. centered
     * caps the width of its images and uses the space left on both sides to
     * show the previous and the next image.
     */
    layout: {
      type: String,
      default: DEFAULT_LAYOUT,
      validator: (value) => LAYOUTS.includes(value),
    },

    /**
     * Ratio an image is shown in when it sets none of its own.
     * Available: 1:1, 9:16
     * Only the centered layout reads it, the full layout lets every image keep
     * its own shape.
     */
    defaultRatio: {
      type: String,
      default: DEFAULT_RATIO,
      validator: (value) => RATIOS.includes(value),
    },

    /**
     * Colour of the buttons that move the carousel.
     * Available: yellow, gray
     */
    button: {
      type: String,
      default: DEFAULT_BUTTON,
      validator: (value) => BUTTONS.includes(value),
    },

    /**
     * Show the pagination pills under the carousel.
     * Off by default, the centered layout uses them.
     */
    pagination: {
      type: Boolean,
      default: false,
    },

    /**
     * Settings object.
     * Used as an alternative to setting individual props.
     */
    options: {
      type: Object,
      default: () => null,
    },

    /**
     * Images to show. Every image takes sources, alt, description and credits,
     * and can take a ratio of 1:1 or 9:16 to be shown in a ratio of its own.
     * Images without one fall back to the default ratio of the carousel.
     */
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
      widthSlide: 0,
      gapSlide: 0,
      isSlideChanging: false,
      settings: {},
      initialSettings: {
        initialSlide: this.initialSlide,
        speed: this.speed,
        timing: this.timing,
        layout: this.layout,
        defaultRatio: this.defaultRatio,
        button: this.button,
        pagination: this.pagination,
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
     * Selected layout, falls back to the default one
     */
    currentLayout() {
      return LAYOUTS.includes(this.settings.layout) ? this.settings.layout : DEFAULT_LAYOUT;
    },

    /**
     * The centered layout caps the width of its images, the full layout gives
     * every image the whole carousel width
     */
    isCentered() {
      return this.currentLayout === 'centered';
    },

    /**
     * Ratio an image falls back to when it sets none of its own
     */
    currentDefaultRatio() {
      return RATIOS.includes(this.settings.defaultRatio) ? this.settings.defaultRatio : DEFAULT_RATIO;
    },

    /**
     * Class that gives the buttons their colour, falls back to the default one
     */
    buttonClass() {
      return `ods-button--${BUTTONS.includes(this.settings.button) ? this.settings.button : DEFAULT_BUTTON}`;
    },

    /**
     * The centered layout shows the text of every image under its own image,
     * instead of only the text of the current image under the carousel
     */
    hasSlideCaptions() {
      return this.isCentered;
    },

    /**
     * The pagination pills only make sense when there is more than one image to show
     */
    hasPagination() {
      return this.settings.pagination && this.images.length > 1;
    },

    /**
     * Images to render, surrounded by as many clones as needed to fill
     * the space on both sides of the centered image.
     */
    displaySlides() {
      const images = this.images || [];
      const total = images.length;

      if (total < 2 || this.clonesPerSide === 0) {
        return images.map((image, index) => ({ image, index, key: `slide-${index}`, isClone: false, ratioClass: this.ratioClassOf(image) }));
      }

      const slides = [];

      for (let i = this.clonesPerSide * -1; i < total + this.clonesPerSide; i += 1) {
        const index = ((i % total) + total) % total;

        slides.push({ image: images[index], index, key: `slide-${i}`, isClone: i < 0 || i >= total, ratioClass: this.ratioClassOf(images[index]) });
      }

      return slides;
    },

    /**
     * The images and their text move together
     */
    trackStyle() {
      return { transform: `translate(${this.translateX}px)`, transition: `transform ${this.settings.timing} ${this.transitionDelay}ms` };
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

      // The space between the slides is set by the ratio modifier in CSS
      this.gapSlide = this.$refs.slides ? parseFloat(window.getComputedStyle(this.$refs.slides).columnGap) || 0 : 0;

      // A centered image fills the carousel until it reaches the max width the
      // layout gives it. The ratio turns that width into the height the image
      // takes, and the carousel is as high as the image.
      this.widthSlide = this.isCentered ? Math.min(this.widthContainer, this.maxWidthOfSlide()) : this.widthContainer;

      this.updateClones();

      this.transitionDelay = 0;
      this.translateX = this.offsetOf(this.position);
    },

    /**
     * Class that gives an image its ratio. An image can set a ratio of its
     * own, so one carousel can mix them, and falls back to the default ratio
     * of the carousel. The full layout leaves its images alone.
     */
    ratioClassOf(image) {
      if (!this.isCentered) {
        return null;
      }

      const ratio = image && RATIOS.includes(image.ratio) ? image.ratio : this.currentDefaultRatio;

      return `ods-carousel__slide__image--ratio-${ratio.replace(':', '-')}`;
    },

    /**
     * Widest a centered image is allowed to get, read back from the max width
     * the ratio modifier puts on a slide, so the value only lives in the SCSS.
     * Falls back to no limit when CSS sets none.
     */
    maxWidthOfSlide() {
      const slide = this.$refs.slides ? this.$refs.slides.firstElementChild : null;
      const maxWidth = slide ? parseFloat(window.getComputedStyle(slide).maxWidth) : NaN;

      return Number.isNaN(maxWidth) ? Infinity : maxWidth;
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
