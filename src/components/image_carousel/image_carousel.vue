<template>
  <div class="ods-carousel" role="group" aria-roledescription="carousel" :aria-label="i18n.carousel || null">
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
          <figure v-for="(slide, slidePosition) in displaySlides" v-bind:key="slide.key" class="ods-carousel__slide" :class="slide.slideClass" :style="slideStyles[slidePosition]" role="group" aria-roledescription="slide" :aria-label="slide.label" :aria-hidden="isSlideHidden(slide) ? 'true' : null">
            <div class="ods-carousel__slide__image" :class="slide.imageClass">
              <picture v-if="slide.image.sources.length">
                <source v-for="(source, sourceIndex) in slide.image.sources" :key="sourceIndex" :srcset="source.src" :media="source.media" />
                <img :src="slide.image.sources[0].src" :alt="slide.image.alt || ''" />
              </picture>
            </div>
            <figcaption class="ods-carousel__slide__caption">
              <span v-if="slide.image.description" class="ods-carousel__slide__caption__description">{{ slide.image.description }}</span
              ><span v-if="slide.image.credits">{{ slide.image.credits }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
    <div class="ods-sr-only" role="status" aria-live="polite">{{ announcement }}</div>
    <div v-if="hasPagination" class="ods-carousel__pagination" aria-hidden="true">
      <span v-for="slideNumber in images.length" v-bind:key="`pagination-${slideNumber}`" class="ods-carousel__pagination__item" :class="{ 'ods-carousel__pagination__item--current': slideNumber === currentSlide }"></span>
    </div>
  </div>
</template>

<script>
/**
 * Ratios an image can be shown in. An image can pick one of these for itself,
 * so a carousel can mix them. 1:1 and 9:16 show the whole image in the middle
 * and use the space left on both sides to show the previous and the next
 * image, 16:9 takes the whole visible width of the carousel.
 */
const RATIOS = ['16:9', '1:1', '9:16'];

const DEFAULT_RATIO = '16:9';

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
     * Ratio an image is shown in when it sets none of its own.
     * Available: 16:9, 1:1, 9:16
     */
    defaultRatio: {
      type: String,
      default: DEFAULT_RATIO,
      validator: (value) => RATIOS.includes(value),
    },

    /**
     * Ratio every image is shown in, whatever ratio the image asks for itself.
     * Available: 16:9, 1:1, 9:16
     * Left out, every image keeps its own ratio and falls back to defaultRatio.
     */
    ratio: {
      type: String,
      default: null,
      validator: (value) => value === null || RATIOS.includes(value),
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
     * and can take a ratio of 16:9, 1:1 or 9:16 to be shown in a ratio of its own.
     * Images without one fall back to the default ratio of the carousel, and a
     * carousel that sets a ratio itself overrules all of them.
     */
    images: {
      type: Array,
      required: true,
    },

    /**
     * Texts the carousel needs.
     * previousButton and nextButton name the buttons that move it. carousel
     * names the carousel itself, and of joins the number of an image and the
     * amount of images, as in "3 of 8". Both are left out of what the screen
     * reader reads when they are not given.
     */
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
      maxWidthSlide: Infinity,
      gapSlide: 0,
      isSlideChanging: false,
      settings: {},
      initialSettings: {
        initialSlide: this.initialSlide,
        speed: this.speed,
        timing: this.timing,
        defaultRatio: this.defaultRatio,
        ratio: this.ratio,
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
    /**
     * Ratio an image falls back to when it sets none of its own
     */
    currentDefaultRatio() {
      return RATIOS.includes(this.settings.defaultRatio) ? this.settings.defaultRatio : DEFAULT_RATIO;
    },

    /**
     * Ratio the carousel puts on every image, when it asks for one itself
     */
    currentRatio() {
      return RATIOS.includes(this.settings.ratio) ? this.settings.ratio : null;
    },

    /**
     * Class that gives the buttons their colour, falls back to the default one
     */
    buttonClass() {
      return `ods-button--${BUTTONS.includes(this.settings.button) ? this.settings.button : DEFAULT_BUTTON}`;
    },

    /**
     * What the screen reader reads once the carousel has moved. The number of
     * the image is part of it, so that two images with the same text still
     * read as a change and the carousel is not silent.
     */
    announcement() {
      const image = this.images ? this.images[this.currentSlide - 1] : null;

      if (!image) {
        return '';
      }

      return [this.positionLabel(this.currentSlide), image.alt, image.description, image.credits].filter(Boolean).join('. ');
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
        return images.map((image, index) => this.slideOf(image, index, `slide-${index}`, false));
      }

      const slides = [];

      for (let i = this.clonesPerSide * -1; i < total + this.clonesPerSide; i += 1) {
        const index = ((i % total) + total) % total;

        slides.push(this.slideOf(images[index], index, `slide-${i}`, i < 0 || i >= total));
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
     * Width of every slide. A 16:9 image takes the whole visible width of the
     * carousel, the ratios that leave room on both sides stay under the max
     * width the stylesheet gives them, so the slides are not all as wide.
     */
    slideWidths() {
      return this.displaySlides.map((slide) => this.widthForRatio(slide.ratio));
    },

    /**
     * Left edge of every slide in the track, the gaps between them included
     */
    slideOffsets() {
      const offsets = [];
      let left = 0;

      this.slideWidths.forEach((width) => {
        offsets.push(left);
        left += width + this.gapSlide;
      });

      return offsets;
    },

    slideStyles() {
      return this.slideWidths.map((width) => ({ width: `${width}px` }));
    },

    /**
     * Width of the narrowest slide in the carousel. It sets how many clones
     * the space on both sides needs, so that the widest gap never runs out of
     * images.
     */
    narrowestSlideWidth() {
      const widths = (this.images || []).map((image) => this.widthForRatio(this.ratioOf(image)));

      return widths.length ? Math.min(...widths) : this.widthContainer;
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

      // The max width a capped image may take is set by the ratio modifier in
      // CSS, so the value only lives in the SCSS
      this.maxWidthSlide = this.maxWidthOfSlides();

      this.updateClones();

      this.transitionDelay = 0;
      this.translateX = this.offsetOf(this.position);
    },

    /**
     * Ratio an image is shown in. A carousel that asks for a ratio of its own
     * puts it on every image. Otherwise an image can set a ratio of its own,
     * so one carousel can mix them, and falls back to the default ratio of
     * the carousel.
     */
    ratioOf(image) {
      if (this.currentRatio) {
        return this.currentRatio;
      }

      return image && RATIOS.includes(image.ratio) ? image.ratio : this.currentDefaultRatio;
    },

    /**
     * Where an image is in the carousel, as "3 of 8". Without a word to join
     * the two numbers it falls back to a form that needs none.
     */
    positionLabel(number) {
      const total = this.images ? this.images.length : 0;

      return this.i18n.of ? `${number} ${this.i18n.of} ${total}` : `${number}/${total}`;
    },

    /**
     * Only the image in the middle is read. The clones and the images waiting
     * on both sides of the carousel are left out, so the screen reader does
     * not walk through images that are not in view.
     */
    isSlideHidden(slide) {
      return slide.isClone || slide.index !== this.currentSlide - 1;
    },

    /**
     * One slide to render, with the classes and the ratio its image asks for
     */
    slideOf(image, index, key, isClone) {
      const ratio = this.ratioOf(image);
      const modifier = ratio.replace(':', '-');

      return {
        image,
        index,
        key,
        isClone,
        ratio,
        label: this.positionLabel(index + 1),
        slideClass: `ods-carousel__slide--ratio-${modifier}`,
        imageClass: `ods-carousel__slide__image--ratio-${modifier}`,
      };
    },

    /**
     * Width a slide takes for a ratio. 16:9 fills the whole visible width of
     * the carousel, the other ratios stop at their max width, and neither ever
     * gets wider than the carousel itself.
     */
    widthForRatio(ratio) {
      if (ratio === '16:9') {
        return this.widthContainer;
      }

      return Math.min(this.widthContainer, this.maxWidthSlide);
    },

    /**
     * Widest a capped image is allowed to get, read back from the max width
     * the ratio modifier puts on a slide. A 16:9 slide sets no limit, so the
     * narrowest limit the slides carry is the one that counts.
     */
    maxWidthOfSlides() {
      const slides = this.$refs.slides ? Array.from(this.$refs.slides.children) : [];
      const limits = slides.map((slide) => parseFloat(window.getComputedStyle(slide).maxWidth)).filter((limit) => !Number.isNaN(limit));

      return limits.length ? Math.min(...limits) : Infinity;
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

      const widthStep = this.narrowestSlideWidth + this.gapSlide;

      if (total > 1 && widthStep > 0) {
        const spaceOnSide = Math.max(0, (this.widthContainer - this.narrowestSlideWidth) / 2);

        clonesPerSide = Math.ceil(spaceOnSide / widthStep) + 1;
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
      const left = this.slideOffsets[position] || 0;
      const width = this.slideWidths[position] || 0;

      return left * -1 + (this.widthContainer - width) / 2;
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
