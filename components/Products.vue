<template>
  <div class="products" v-if="this.products.length > 0">
    <v-row class="pt-1 pb-1">
      <v-col :cols="cols" v-for="product in products" :key="product.id">
        <v-card>
          <!--@click="details(product._id)"-->
          <v-img :src=product.image></v-img>
          <v-card-text>
            {{ product.name }}
          </v-card-text>
          <!-- <v-img :src="product.image"  aspect-ratio="1"/> -->
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
        console.log(data);
      } catch (err) {}
    },
    /*details(productId) {
      this.$router.push(`/details/${productId}`)
    },*/
  },
};
</script>
