<template>
  <v-app>
    <NavBar/>
    <v-main>
      <Nuxt />
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style>
.v-card__text{
  padding-bottom: 0;
}
</style>
