<template>
  <div class="products" v-if="this.products.length > 0">
    <h2>Most Recent Products</h2>
    <v-row class="pt-1 pb-1">
      <v-col :cols="cols" v-for="product in products" :key="product.id">
        <v-card @click="details(product._id)">
          <v-carousel
            height="200"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(img, i) in product.images"
              :key="i"
              :src="img"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
          <v-card-text class="card-text">
            {{ product.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { getProducts } from "../services";
export default {
  data() {
    return {
      products: [],
      onFetch: undefined,
    };
  },
  async beforeMount() {
    await this.loadProducts();
    this.onFetch = setInterval(async () => {
      await this.loadProducts();
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.onFetch);
  },
  computed: {
    cols() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 6;
        case "sm":
          return 4;
        case "md":
          return 4;
        case "lg":
          return 4;
      }
    },
  },
  methods: {
    async loadProducts() {
      try {
        const data = await getProducts();
        this.products = data;
      } catch (err) {

      }
    },
    details(productId) {
      this.$router.push(`/details/${productId}`)
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Courgette&display=swap');
.card-text{
    padding-top: 5px;
    padding-bottom: 5px;
    font-size: 1rem;
}
h2{
  font-size: 2rem;
  font-family: 'Courgette', cursive;
}
</style>