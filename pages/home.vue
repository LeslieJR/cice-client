<template>
  <div class="home">
    <div>
      <h1 style="text-align: center">We are Ecos</h1>
      <v-img
        v-if="$vuetify.breakpoint.smAndDown"
        src="img/nature.jpg"
        alt="zero waste"
      />
    </div>
    <div class="container">
      <p style="background-color: white">
        The solid and essential foundation of this project is
        <strong>sustainability</strong> and more specifically the zero waste
        movement, minimalism, slow life, fashion, design, personal care, and
        care of our environment. We want to offer you a beautiful and quality
        alternative to beneficial products so that you can easily make the
        switch without additional effort, just enjoy the benefits, for and with
        nature. The products we offer are <strong>plastic-free</strong>,
        <strong>toxic-free</strong> , and <strong>cruelty-free</strong> .
      </p>
      <v-divider></v-divider>
      <Products class="mb-4 mt-4" />
      <v-divider></v-divider>
      <NewProduct v-if="isAuth" />
      <Categories />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    //only users who are logged in (have token) can add products
    isAuth() {
      return this.$store.getters["user/getToken"];
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Train+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap');

.home {
  background: url("~@/assets/patternpad.png");
  background-position: repeat;
  font-family: 'Kanit', sans-serif;
}
h1 {
  font-size: 4rem;
  text-align: center;
  font-family: 'Train One', cursive;
  padding: 10px 0;
}
@media (max-width: 425px){
  h1{
    font-size: 3.3rem;
    line-height: 1;
  }
}
img {
  max-width: 100%;
}
.container {
  max-width: 90%;
}
</style>