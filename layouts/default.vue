<template>
  <v-app>
    <NavBar/>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
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
