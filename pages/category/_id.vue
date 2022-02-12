<template>
  <div class="ml-4 mr-4">
    <h2 class="text-center">{{ data.name }}</h2>
    <p>{{ data.description }}</p>
    <v-row class="pt-1 pb-1">
      <v-col class="d-flex justify-center" v-for="(product, i) in data.products" :key="i">
        <v-card width="300"  class="mb-2">
          <v-card-title class="card-text">
            {{ product.name }}
          </v-card-title>
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
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { getProductsByCategory } from "../../services";
export default {
  data() {
    return {};
  },
  async asyncData({ params }) {
    const data = await getProductsByCategory(params.id);
    return { data };
  },
  
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');
h2 {
  font-family: 'Kanit', sans-serif;
}
</style> 