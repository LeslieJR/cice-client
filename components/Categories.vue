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
          <v-card>
            <!-- <v-img
              src="https://images.pexels.com/photos/7655830/pexels-photo-7655830.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            > -->
              <v-card-title class="text-h5"> {{ category.name }} </v-card-title>
              <v-card-subtitle>{{ category.description }}</v-card-subtitle>
            <!-- </v-img> -->
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
        const categories = data;
        const names = [];
        for (var i = 0; i < categories.length; i++) {
          const categoryObj = {
            name: categories[i].name,
            _id: categories[i]._id,
            description: categories[i].description,
          };
          names.push(categoryObj);
        }
        this.categories = names;
        console.log(this.categories);
      } catch (e) {
        console.log("error: ", e.message);
      }
    },
    browse(categoryId) {
      this.$router.push(`/category/${categoryId}`);
    },
  },
};
</script> 
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Courgette&display=swap");
h2 {
  font-size: 2rem;
  font-family: "Courgette", cursive;
}
</style>