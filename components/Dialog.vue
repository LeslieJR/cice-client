<template>
  <v-dialog v-model="show" width="500" class="edit-form" :retain-focus="false">
    <v-card>
      <v-card-title class="headline text-center">Edit Product</v-card-title>
      <v-col class="custom-padding">
        <v-text-field
          solo
          label="Product Name"
          clearable
          hide-details
          class="pb-2"
        ></v-text-field>
        <v-textarea
          solo
          label="Description"
          clearable
          hide-details
          class="pb-2"
        ></v-textarea>
        <v-text-field solo label="Price" clearable hide-details></v-text-field>
      </v-col>
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
  },
};
</script>
<style scoped>
.edit-form {
  z-index: 9999;
}
.custom-padding {
  padding: 0px 24px 10px;
}

</style>
