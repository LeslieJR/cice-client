<template>
  <div class="mb-2">
    <h2>Create New Product</h2>
    <v-card>
      <v-list-item>
        <v-file-input
          id="file"
          ref="file"
          type="file"
          @change="upload"
          multiple
        >
        </v-file-input>
      </v-list-item>
      <v-list-item>
        <v-select
          hide-details="auto"
          :items="categories"
          item-text="name"
          item-value="_id"
          label="Select category"
          solo
          v-model="selected"
          @change="onSelect"
        ></v-select>
      </v-list-item>
      <v-list-item>
        <v-text-field
          solo
          dense
          clearable
          hide-details="auto"
          placeholder="Product's name"
          v-model="name"
        />
      </v-list-item>
      <v-list-item>
        <v-textarea
        clearable
        auto-grow
        solo
        rows="1"
        clear-icon="mdi-close-circle"
        label="Description"
        v-model="description"
        hide-details
        ></v-textarea>
      </v-list-item>
      <v-list-item>
        <v-text-field
          solo
          dense
          clearable
          hide-details="auto"
          placeholder="Price"
          v-model="price"
        />
      </v-list-item>
      <v-card-actions class="d-flex justify-center">
        <v-btn class="white--text" color="#45D47D" @click="onClick"
          >Submit</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>
<script>
import { getAllCategories, createProduct } from "../services";
export default {
  data() {
    return {
      images: [],
      name: "",
      description: "",
      price: "",
      categories: [],
      category: "",
      selected: "",
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
          };
          names.push(categoryObj);
        }
        this.categories = names;
      } catch (e) {
        console.log("error: ", e.message);
      }
    },
    async upload() {
      try {
        // Convert files into an array and iterate
        let files = Array.from(this.$refs.file.files);
        files.map((file) => {
          // iterate to read as data url
          let reader = new FileReader();
          reader.readAsDataURL(file);
          console.log(reader)
          reader.onloadend = () => {
            this.images.push(reader.result);
          };
        });
      } catch (e) {
        console.log("error: ", e.message);
      }
    },
    onSelect(obj) {
      this.category = obj;
    },
    async onClick() {
      try {
        const data = await createProduct(
          this.name,
          this.description,
          this.category,
          this.price,
          this.images
        );
        if (data.err) {
          alert(data.err);
        } else {
          this.name = "";
          this.description = "";
          this.category = "";
          this.price = "";
          this.images = [];
          this.$refs.file.value = null;
        }
      } catch (e) {
        console.log("error: ", e.message);
      }
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Courgette&display=swap");
.t-form {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 5px;
  background: #feca57;
  padding: 10px;
}
.v-card__actions {
  padding-right: 18px;
}
h2 {
  font-size: 2rem;
  font-family: "Courgette", cursive;
}
</style>