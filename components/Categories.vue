<template>
  <div>
    <h2>Categories</h2>
    <div>
      <v-row dense>
        <v-col
          cols="12"
          v-for="(category, index) in categories"
          :key="index"
          @click="browse(category._id)"
        >
          <v-card :style="{ 'border-top': `3px solid ${category.color}` }" >
            <v-img
            >
              <v-card-title class="text-h5"> {{ category.name }} </v-card-title>
              <v-card-subtitle>{{ category.description }}</v-card-subtitle>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import { getAllCategories } from "../services";
export default {
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    await this.getAllCategories();
  },
  methods: {
    //to get the list of categories to populate the select options
    async getAllCategories() {
      try {
        const data = await getAllCategories();
        this.categories = data;
      } catch (e) {
        alert("error: ", e.message);
      }
    },
    browse(categoryId) {
      this.$router.push(`/category/${categoryId}`);
    },
  },
};
</script> 
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');
h2 {
  font-size: 2rem;
  font-family: 'Kanit', sans-serif;
}

</style>