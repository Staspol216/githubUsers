<template>
  <div class="container">
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style>
@import "@/assets/styles/global.scss";
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

.container {
    max-width: 680px;
    padding: 0 80px;
    margin: 0 auto;
}
</style>