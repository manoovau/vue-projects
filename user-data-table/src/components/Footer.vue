<template>
  <p class="footer-text">JobLeaders have been hired by:</p>
  <div id="companies-logos">
    <a
      v-for="logo in logos"
      :href="logo.url"
      :aria-label="'Go to ' + logo.name + ' website'"
      class="logo-container"
    >
      <img
        :src="getImageSource(logo.name)"
        :class="['logo', logo.class]"
        :alt="logo.name + ' logo'"
        :height="logo.height + 'px'"
        :width="logo.width + 'px'"
        loading="lazy"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      logos: [
        {
          name: "Nike",
          url: "https://www.nike.com/de/",
          height: 28,
          width: 63,
        },
        {
          name: "Amazon",
          url: "https://www.amazon.de/",
          height: 33,
          width: 72,
        },
        {
          class: "logo-apple",
          name: "Apple",
          url: "https://www.apple.com/",
          height: 37,
          width: 41,
        },
        {
          class: "logo-netflix",
          name: "Netflix",
          url: "https://www.netflix.com/de-en/",
          height: 24,
          width: 64,
        },
        {
          class: "logo-paypal",
          name: "PayPal",
          url: "https://www.paypal.com/de/home",
          height: 32,
          width: 96,
        },
        {
          class: "logo-microsoft",
          name: "Microsoft",
          url: "https://www.microsoft.com/de-de/",
          height: 30,
          width: 106,
        },
        {
          class: "logo-visa",
          name: "Visa",
          url: "https://www.visa.de/",
          height: 25,
          width: 59,
        },
      ],
    };
  },
  methods: {
    /**
     * Get the image source for the company logo
     * @param name - The name of the company
     */
    getImageSource(name: string): string {
      return new URL(
        `../assets/logos/${name.toLowerCase()}-logo.webp`,
        import.meta.url
      ).href;
    },
  },
});
</script>

<!-- To optimize the performance, a svg sprite could be added with all logos instead of having multiple files -->
<style scoped lang="scss">
@use "../styles/utilities/_variables.scss" as variables;

#companies-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1.5rem 3rem;

  .logo-container {
    flex: 25%;
    margin-bottom: 1rem; /* Adjust spacing between logos */
  }

  @media (min-width: variables.$breakpoint-lg) {
    padding: 1.5rem 0;

    .logo-container {
      flex: 14%;
    }
  }
}

.footer-text {
  color: variables.$text-primary;
  margin-top: 4rem;

  @media (min-width: variables.$breakpoint-md) {
    margin-top: 0;
  }
}
</style>
