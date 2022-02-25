<template>
  <v-card>
    <v-carousel height="200" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item
        v-for="(img, i) in product.images"
        :key="i"
        :src="img"
        reverse-transition="fade-transition"
        transition="fade-transition"
        @click="details(product._id)"
      ></v-carousel-item>
    </v-carousel>
    <v-card-text class="card-text" @click="details(product._id)">
      {{ product.name }}
    </v-card-text>
    <v-card-actions>
      <slot name="button"></slot>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    product: Object,
  },
  data() {
    return {
    };
  },
  
  methods: {
    
    details(productId) {
      this.$router.push(`/details/${productId}`);
    },
  },
};
</script>
<style scoped>
.card-text {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 1rem;
}

</style>
