<template>
  <v-dialog v-model="show" width="500" class="edit-form" :retain-focus="false">
    <v-card>
      <v-card-title class="headline">Edit Product</v-card-title>
      <v-row class="mx-0">
        <v-col cols="12" sm="6">
          <v-text-field
            solo
            label="Product Name"
            v-model="prodName"
            clearable
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-textarea
            solo
            label="Description"
            v-model="prodDescr"
            clearable
            hide-details
          ></v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            solo
            label="Price"
            v-model="prodPrice"
            clearable
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" outlined text> Save </v-btn>
        <v-btn color="red" text outlined @click="show = false"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    value: Boolean,
    product: Object,
  },
  data() {
    return {
      name: "",
      descr: "",
      price: "",
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    prodName() {
      if (this.product) {
        return this.name=this.product.name;
      }
    },
    prodDescr() {
      if (this.product) {
        return this.descr=this.product.description;
      }
    },
    prodPrice() {
      if (this.product) {
        return this.price=this.product.price;
      }
    },
  },
};
</script>
<style scoped>
.edit-form {
  z-index: 9999;
}
</style>
