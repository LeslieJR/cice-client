<template>
  <div class="products" v-if="this.products.length > 0">
    <h2>Most Recent Products</h2>
    <v-row class="pt-1 pb-1">
      <v-col
        class="d-flex"
        :cols="cols"
        v-for="(product,index) in products"
        :key="index"
      >
        <!-- Product component -->
        <Product :product="product" />
        <!-- End Product component -->

      </v-col>
    </v-row>
    <Dialog v-model=showDialog :product="element" />
  </div>
</template>
<script>
import { getProducts } from "../services";

export default {
  data() {
    return {
      products: [],
      onFetch: undefined,
      showDialog: false,
      element:null
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
      } catch (err) {}
    },
    editProduct(product){
      console.log(product);
      this.showDialog = true
      this.element = product
    },

    
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap");
h2 {
  font-size: 2rem;
  font-family: "Kanit", sans-serif;
}

</style>
