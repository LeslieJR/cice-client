<template>
  <div class="ml-4 mr-4">
    <h2 class="pt-2 pb-2 text-center">{{ product.name }}</h2>
    <v-row class="justify-center">
      <v-col cols="6" sm="4" v-for="(image, i) in product.images" :key="i">
        <v-img cover :height="height" :src="image"></v-img>
      </v-col>
    </v-row>
    <div class="d-flex justify-center">
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>
<script>
import { getDetails } from "../../services";
export default {
  data() {
    return {};
  },
  async asyncData({ params }) {
    const product = await getDetails(params.id);
    return { product };
  },
  computed: {
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 200;
        case "sm":
          return 200;
        case "md":
          return 500;
        case "lg":
          return 600;
        case "xl":
          return 800;
      }
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');
h2 {
  font-family: 'Kanit', sans-serif;
}
</style> 
