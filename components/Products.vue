<template>
  <div class="products" v-if="this.products.length > 0">
    <h2>Most Recent Products</h2>
    <v-row class="pt-1 pb-1">
      <v-col
        class="d-flex"
        :cols="cols"
        v-for="(product, index) in products"
        :key="index"
      >
        <!-- Product component -->
        <Product :product="product">
          <template v-slot:button>
            <v-btn
              v-if="isAuth"
              fab
              small
              color="red"
              class="white--text btn-delete"
              @click.stop="remove(product, index)"
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
              @click.stop="editProduct(product, index)"
            >
              <v-icon>
                {{ icons.mdiSquareEditOutline }}
              </v-icon>
            </v-btn>
          </template>
        </Product>
        <!-- End Product component -->
      </v-col>
    </v-row>
    <Dialog v-model="showDialog" :product="element" />
  </div>
</template>
<script>
import { getProducts, deleteProduct } from "../services";
import { mdiDelete, mdiSquareEditOutline } from "@mdi/js";
export default {
  data() {
    return {
      icons: { mdiDelete, mdiSquareEditOutline },
      products: [],
      onFetch: undefined,
      showDialog: false,
      element: null,
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
    isAuth() {
      return this.$store.getters["user/getToken"];
    },
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
    editProduct(product) {
      this.showDialog = true;
      this.element = product;
    },
    async remove(productId) {
      const token = localStorage.getItem("token");
      const data = await deleteProduct(productId, token);
      if (data.err) {
        alert(data.err);
      } else {
        alert("product deleted");
      }
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
.btn-delete {
  position: absolute;
  z-index: 999;
  right: 0;
  top: 0;
}
.btn-edit {
  position: absolute;
  z-index: 999;
  right: 0;
  top: 42px;
}
</style>
