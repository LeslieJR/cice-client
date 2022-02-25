<template>
    <v-card>
        <v-btn
        v-if="isAuth"
        fab
        small
        color="red"
        class="white--text btn-delete"
        @click="remove(product._id)"
        >
        <v-icon>
            {{ icons.mdiDelete }}
        </v-icon>
        </v-btn>
        <v-btn
        v-if="isAuth"
        fab
        small
        color="blue"
        class="white--text btn-edit"
        @click="editProduct(product)"
        >
        <v-icon>
            {{ icons.mdiSquareEditOutline }}
        </v-icon>
        </v-btn>
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
    </v-card>
</template>
<script>
import { deleteProduct } from "../services";
import { mdiDelete, mdiSquareEditOutline } from "@mdi/js";
export default {
    props:{
        product: Object,
    },
  data() {
    return {
      icons: { mdiDelete, mdiSquareEditOutline },
    };
  },
  //only users who are logged in (have token) can delete products
  computed: {
    isAuth() {
      return this.$store.getters["user/getToken"];
    },
  },
  methods: {
    async remove(productId) {
      const token = localStorage.getItem("token");
      const data = await deleteProduct(productId, token);
      if (data.err) {
        alert(data.err);
      } else {
        alert("product deleted");
      }
    },
    details(productId) {
      this.$router.push(`/details/${productId}`);
    }
  },
};
</script>
<style scoped>
.card-text {
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 1rem;
}
.btn-delete {
  position: absolute;
  z-index: 999;
  right: 0;
}
.btn-edit {
  position: absolute;
  z-index: 999;
  right: 0;
  top: 42px;
}
</style>
