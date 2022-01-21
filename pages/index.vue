<template>
  <div>
    <h1>Index</h1>
  </div>
</template>
<script>
export default {
  asyncData(ctx) {
    ctx.redirect("/home");
  },
};
</script>
