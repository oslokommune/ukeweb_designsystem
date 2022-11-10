<template>
  <div class="osg-carousel">
    <div class="osg-carousel__content" ref="content">
      <div class="osg-carousel__navigation" v-if="images.length > 1">
        <button class="osg-button osg-button--circle osg-button--yellow" :aria-label="prev" @click="goToPrev">
          <span class="osg-button__icon osg-icons--chevron-left"></span>
        </button>
        <button class="osg-button osg-button--circle osg-button--yellow" :aria-label="next" @click="goToNext">
          <span class="osg-button__icon osg-icons--chevron-right"></span>
        </button>
      </div>
      <div ref="track" class="osg-carousel__track" :style="{ transform: `translate(${translateX}px)`, transition: `transform ${settings.timing} ${transitionDelay}ms` }">
        <div class="osg-carousel__slides" ref="slides">
          <figure v-for="(image, index) in images" v-bind:key="index">
            <picture v-if="image.sources.length">
              <source v-for="(source, sourceIndex) in image.sources" :key="sourceIndex" :srcset="source.src" :media="source.media" />
              <img :src="image.sources[0].src" :alt="image.alt" />
            </picture>
          </figure>
        </div>
      </div>
    </div>
    <div v-if="currentImage" class="osg-carousel__info">
      <span v-if="currentImage.description.length" class="osg-carousel__info__description">{{ currentImage.description }}</span
      ><span v-if="currentImage.credits.length">{{ currentImage.credits }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageCarousel",

  props: {
    /**
     * Slide number to start on.
     */
    initialSlide: {
      type: Number,
      default: 1,
    },

    /**
     * Slide animation speed in milliseconds
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
      default: "ease-in-out",
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

    next: {
      type: String,
      default: "Next image",
    },

    prev: {
      type: String,
      default: "Previous image",
    },
  },

  data() {
    return {
      slides: [],
      currentSlide: null,
      transitionDelay: 0,
      translateX: 0,
      widthContainer: 0,
      widthSlide: 0,
      isSlideChanging: false,
      settings: {},
      initialSettings: {
        initialSlide: this.initialSlide,
        speed: this.speed,
        timing: this.timing,
      },
    };
  },

  created() {
    // Read settings from options object
    if (this.options) {
      for (const key in this.options) {
        this.initialSettings[key] = this.options[key];
      }
    }

    // Load settings
    Object.assign(this.settings, this.initialSettings);
  },

  mounted() {
    // Windows resize listener
    window.addEventListener("resize", this.calculateWidthSlide);

    // Init carousel
    this.reload();
  },

  beforeDestroy() {
    // Remove resize listener
    window.removeEventListener("resize", this.calculateWidthSlide);
  },

  computed: {
    currentImage: function () {
      if (!this.images) {
        return;
      }

      return this.images[this.currentSlide - 1];
    },
  },

  methods: {
    // Reload carousel
    reload() {
      this.calculateWidthSlide();
      this.prepareSettings();
      this.prepareSlides();
      this.prepareCarousel();
    },

    /**
     * Set window & container width, remove transition and calculate transition offset
     */
    calculateWidthSlide() {
      this.widthContainer = this.$refs.content.clientWidth;
      this.widthSlide = this.widthContainer;

      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].style.width = this.widthSlide + "px";
      }

      this.transitionDelay = 0;
      this.translateX = this.currentSlide * this.widthSlide * -1;
    },

    /**
     * Convert HTML Collection to JS Array
     */
    htmlCollectionToArray(collection) {
      return Array.prototype.slice.call(collection, 0);
    },

    /**
     * Prepare settings object
     */
    prepareSettings() {
      this.settings = Object.assign({}, this.initialSettings);
    },

    /**
     * Prepare slides classes and styles
     */
    prepareSlides() {
      const slideLenth = this.$refs.slides.children.length;
      const firstSlideClone = this.$refs.slides.children[0].cloneNode(true);
      firstSlideClone.id = "carousel-end-clone";
      const lastSlideClone = this.$refs.slides.children[slideLenth - 1].cloneNode(true);
      lastSlideClone.id = "carousel-start-clone";

      this.$refs.slides.insertBefore(lastSlideClone, this.$refs.slides.children[0]);
      this.$refs.slides.appendChild(firstSlideClone);

      this.slides = this.htmlCollectionToArray(this.$refs.slides.children);
    },

    /**
     * Prepare carousel styles
     */
    prepareCarousel() {
      this.widthSlide = this.widthContainer;

      for (let i = 0; i < this.slides.length; i++) {
        this.slides[i].style.width = this.widthSlide + "px";
      }

      if (this.currentSlide === null) {
        this.currentSlide = this.settings.initialSlide;
      }

      this.goTo(this.currentSlide, false);
    },

    getNextSlide(index) {
      switch (this.slides[index].id) {
        case "carousel-start-clone":
          return this.slides.length - 2;
        case "carousel-end-clone":
          return 1;
        default:
          return index;
      }
    },

    // Go to next slide
    goToNext() {
      this.goTo(this.currentSlide + 1);
    },
    // Go to previous slide
    goToPrev() {
      this.goTo(this.currentSlide - 1);
    },

    // Go to slide
    goTo(index, transition = true) {
      if (index < 0 || index > this.slides.length - 1 || this.isSlideChanging) {
        return;
      }

      if (transition) {
        this.isSlideChanging = true;
        const nextSlide = this.getNextSlide(index);

        setTimeout(() => {
          this.isSlideChanging = false;
        }, this.settings.speed);

        if (index !== nextSlide) {
          setTimeout(() => {
            this.goTo(nextSlide, false);
          }, this.settings.speed);
        }
      }
      this.transitionDelay = transition ? this.settings.speed : 0;
      this.translateX = index * this.widthSlide * -1;

      this.updateCurrentSlideIndex(index);
    },

    updateCurrentSlideIndex(index) {
      if (index === 0) {
        this.currentSlide = this.images.length;
      } else if (index > this.images.length) {
        this.currentSlide = 1;
      } else {
        this.currentSlide = index;
      }
    },
  },
};
</script>
