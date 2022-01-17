<template>
  <v-card>
    <!-- <v-img :src="url" class="width-100"></v-img> -->
    <v-list-item>
      <input id="file" ref="file" type="file" @change="onChange" />
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
      <v-text-field
        solo
        dense
        clearable
        hide-details="auto"
        placeholder="Description"
        v-model="description"
      />
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
      <v-btn class="white--text" color="indigo" @click="onClick">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { getAllCategories, createProduct } from "../services";
export default {
  data() {
    return {
      image: "",
      name: "",
      description: "",
      price: "",
      categories: [],
      category:"",
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
    onChange() {
      const file = this.$refs.file.files[0];
      //para codificar el archivo:
      const reader = new FileReader();
      //si hay un archivo
      if (file) {
        reader.readAsDataURL(file);
      }
      reader.onloadend = () => {
        this.image = reader.result;
      };
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
          this.image
        );
        if (data.err) {
          alert(data.err);
        } else {
          this.name = "";
          this.description = "";
          this.category = "";
          this.price = "";
          this.image = "";
        }
      } catch (e) {
        console.log("error: ", e.message);
      }
    },
  },
};
</script>
<style scoped>
.t-form {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 5px;
  background: #feca57;
  padding: 10px;
}
</style>


<!--<template>
  <div class="create-product">
   
      <div class="create-container">
        <v-card-text>
           <v-file-input
            outlined
            prepend-icon=""
            label="Image"
            append-icon="mdi-file-upload"
            v-model="image"
          ></v-file-input> 

          <v-text-field
            outlined
            name="Name"
            placeholder="Product's name"
            v-model="name"
          ></v-text-field>

          <v-textarea
            outlined
            name="description"
            placeholder="Product Description"
            hide-details="auto"
            v-model="description"
          ></v-textarea>
        </v-card-text>
        <v-card-actions class="d-flex justify-end pr-4">
          <v-btn class="white--text" @click="onSubmit"
            >Submit</v-btn
          >
        </v-card-actions>
      </div>

  </div>
</template>
<script>
import {createProduct} from '../services'
export default {
  data() {
    return {
      image: undefined,
      name: "",
      description: "",
    };
  },
  methods: {
    async onSubmit() {
      try {
        if (!this.image || !this.name || !this.description) {
          alert("REQUIRED FIELD EMPTY");
          return;
        }
        //const token = localStorage.getItem("token");
        const data = await createProduct(this.image, this.name, this.description)      
        if (data.err) {
          alert(data.err);
        } else{
          this.image = undefined
          this.name=""
          this.description=""
        }
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
</script>
-->